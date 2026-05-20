import type { IViewModel } from 'src/shared/config';
import {
  appendCatalogItemsFromFetch,
  container,
  createCatalogViewStateFromRequest,
  createLocaleFallbacks,
  makeAutoBoundObservable,
  replaceCatalogItemsFromFetch,
  resetCatalogRequestState,
  shouldRequestInitialData,
  type CatalogViewState,
} from 'src/shared/lib';
import { LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  MonstersDataSource,
  type MonsterFactionOptionNode,
  type MonsterFactionsRequestData,
  type MonsterNode,
  type MonstersRequestData,
} from '../api/MonstersDataSource';
import { getMonsterImageMetadata } from './monsterImages';
import { MonsterItemViewModel, type MonsterLocale } from './MonsterItemViewModel';
import { getMonstersPageCopy, type MonstersPageCopy } from './monsterUiCopy';

const MONSTERS_PAGE_SIZE = 24;
const MONSTER_FACTION_FILTER_PAGE_SIZE = 50;
const MONSTER_CATALOG_ATTRIBUTED_FIELDS = [
  'name',
  'description',
  'image',
  'faction_id',
  'drops',
  'avg_drop_chance',
  'drop_count',
] as const;

interface FilterButtonDescriptor {
  readonly ariaPressed: boolean;
  readonly bg: string;
  readonly borderColor: string;
  readonly color: string;
  readonly hoverStyle: {
    readonly bg: string;
  };
  readonly key: string;
  readonly label: string;
  readonly onSelect: () => Promise<void>;
  readonly variant: 'solid' | 'outline';
}

// Keep this display string in sync with api/Monsters.graphql until the widget can import raw GraphQL.
const MONSTERS_QUERY = `query Monsters($data: Demo_rpg_dataGetMonstersesInput) {
  monsterses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          avg_drop_chance
          base_damage
          description { en ru zh }
          drop_count
          drops {
            chance
            item_id { id }
            quantity_max
            quantity_min
          }
          faction_id {
            id
            data {
              alignment
              name { en ru zh }
            }
          }
          hp
          image { extension fileId fileName hash height mimeType size status url width }
          kind
          level
          name { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class MonstersViewModel implements IViewModel {
  public activeFactionId: string | null = null;
  public searchQuery = '';
  private readonly itemCache = new Map<string, MonsterItemViewModel>();
  private readonly loadedItems: MonsterNode[] = [];

  constructor(
    public readonly dataSource: MonstersDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'itemCache' | 'localeService'>(this, {
      itemCache: false,
      localeService: false,
    });
  }

  public setup(): void {
    // Monsters has no route params.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    resetCatalogRequestState(this.dataSource, this.loadedItems, this.itemCache);
  }

  public get items(): readonly MonsterItemViewModel[] {
    const query = this.normalizedSearchQuery;
    const items = this.loadedItems.map((node) => this.getItemViewModel(node));
    if (!query) return items;
    return items.filter((item) => item.searchText.includes(query));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewStateFromRequest(
      this.dataSource.request,
      this.loadedItems,
      this.items.length,
    );
  }

  public get factionButtons(): readonly FilterButtonDescriptor[] {
    return [
      this.createFactionButtonDescriptor(null, this.copy.allFactionsButton, 'all'),
      ...this.factionOptions.map((faction) =>
        this.createFactionButtonDescriptor(
          faction.id,
          this.getFactionLabel(faction),
          faction.id,
        ),
      ),
    ];
  }

  public get hasActiveFilter(): boolean {
    return this.activeFactionId !== null || this.searchQuery.trim() !== '';
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/monsters',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/monsters',
      },
      fieldAttribution: this.catalogFieldAttribution,
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Monsters',
          request: MONSTERS_QUERY,
        },
      },
      variables: this.currentVariables,
    };
  }

  public get locale(): MonsterLocale {
    return this.localeService.locale;
  }

  public get copy(): MonstersPageCopy {
    return getMonstersPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async setFaction(factionId: string | null): Promise<void> {
    if (this.activeFactionId === factionId) return;
    this.activeFactionId = factionId;
    await this.loadInitial();
  }

  public setSearchQuery(value: string): void {
    this.searchQuery = value;
  }

  public async resetFilters(): Promise<void> {
    if (!this.hasActiveFilter) return;
    this.activeFactionId = null;
    this.searchQuery = '';
    await this.loadInitial();
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    await appendCatalogItemsFromFetch(this.loadedItems, this.catalogState.canLoadMore, () =>
      this.dataSource.request.fetch(this.nextPageRequestData, this.factionsRequestData),
    );
  }

  private async loadInitial(): Promise<void> {
    await replaceCatalogItemsFromFetch(this.loadedItems, this.itemCache, () =>
      this.dataSource.request.fetch(this.currentRequestData, this.factionsRequestData),
    );
  }

  private getItemViewModel(node: MonsterNode): MonsterItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new MonsterItemViewModel(
      node,
      () => this.locale,
      () => this.copy.noDescription,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get factionOptions(): readonly MonsterFactionOptionNode[] {
    const byId = new Map<string, MonsterFactionOptionNode>();
    for (const faction of this.dataSource.request.data?.factions ?? []) {
      byId.set(faction.id, faction);
    }
    for (const monster of this.loadedItems) {
      byId.set(monster.data.faction_id.id, monster.data.faction_id);
    }
    return [...byId.values()].sort((left, right) =>
      this.getFactionLabel(left).localeCompare(this.getFactionLabel(right), this.locale),
    );
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      factionFilter: this.activeFactionId,
      factionsData: this.factionsRequestData,
      locale: this.locale,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
      searchQuery: this.searchQuery.trim(),
    };
  }

  private get currentRequestData(): MonstersRequestData {
    const data: MonstersRequestData = {
      first: MONSTERS_PAGE_SIZE,
    };
    const where = this.currentWhere;
    if (where) {
      data.where = where;
    }
    return data;
  }

  private get nextPageRequestData(): MonstersRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get factionsRequestData(): MonsterFactionsRequestData {
    return {
      first: MONSTER_FACTION_FILTER_PAGE_SIZE,
    };
  }

  private get currentWhere(): MonstersRequestData['where'] | undefined {
    if (!this.activeFactionId) return undefined;
    return {
      data: {
        equals: this.activeFactionId,
        path: ['faction_id'],
      },
    };
  }

  private get normalizedSearchQuery(): string {
    return this.searchQuery.trim().toLocaleLowerCase(this.locale);
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        formulas: {
          avgDropChance: node.data.avg_drop_chance,
          dropCount: node.data.drop_count,
        },
        faction: {
          id: node.data.faction_id.id,
          name: node.data.faction_id.data.name,
        },
        id: node.id,
        image: getMonsterImageMetadata(node.data.image),
        kind: node.data.kind,
        level: node.data.level,
        name: node.data.name[this.locale],
        sampleDrops: node.data.drops.slice(0, 3).map((drop) => ({
          chance: drop.chance,
          itemId: drop.item_id.id,
          quantityMax: drop.quantity_max,
          quantityMin: drop.quantity_min,
        })),
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.catalogState.totalCount,
      visibleCount: this.catalogState.visibleCount,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) => this.createLocaleFallbackRecords(node));
  }

  private createFactionButtonDescriptor(
    factionId: string | null,
    label: string,
    key: string,
  ): FilterButtonDescriptor {
    const selected = this.activeFactionId === factionId;
    return {
      ariaPressed: selected,
      bg: selected ? '#22d3ee' : 'rgba(15, 21, 29, 0.74)',
      borderColor: selected ? '#67e8f9' : 'rgba(103, 232, 249, 0.24)',
      color: selected ? 'var(--color-text-on-accent)' : '#f4f7f8',
      hoverStyle: {
        bg: selected ? '#67e8f9' : 'rgba(34, 211, 238, 0.12)',
      },
      key,
      label,
      onSelect: () => this.setFaction(factionId),
      variant: selected ? 'solid' : 'outline',
    };
  }

  private getFactionLabel(faction: MonsterFactionOptionNode): string {
    return faction.data.name[this.locale] || faction.data.name.en || faction.id;
  }

  private get catalogFieldAttribution(): ExplainerDescriptor['fieldAttribution'] {
    return MONSTER_CATALOG_ATTRIBUTED_FIELDS.map((fieldName) => ({
      path: `monsters.data.${fieldName}`,
      owningSubgraph: 'data',
    }));
  }

  private createLocaleFallbackRecords(
    node: MonsterNode,
  ): NonNullable<ExplainerDescriptor['localeFallbacks']> {
    const pathPrefix = `monsters.${node.id}.data`;
    return createLocaleFallbacks(
      this.locale,
      [
        { path: `${pathPrefix}.name`, value: node.data.name },
        { path: `${pathPrefix}.description`, value: node.data.description },
        { path: `${pathPrefix}.faction_id.data.name`, value: node.data.faction_id.data.name },
      ],
      'en',
    );
  }
}

container.register(
  MonstersViewModel,
  () => new MonstersViewModel(container.get(MonstersDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
