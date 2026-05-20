import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
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
  NpcsDataSource,
  type NpcLocationOptionNode,
  type NpcLocationsRequestData,
  type NpcNode,
  type NpcsRequestData,
} from '../api/NpcsDataSource';
import { getNpcPortraitMetadata } from './npcImages';
import { NpcItemViewModel, type NpcLocale } from './NpcItemViewModel';
import { getNpcsPageCopy, type NpcsPageCopy } from './npcUiCopy';

const NPCS_PAGE_SIZE = 24;
const NPC_LOCATION_FILTER_PAGE_SIZE = 50;

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

// Keep this display string in sync with api/Npcs.graphql until the widget can import raw GraphQL.
const NPCS_QUERY = `query Npcs($data: Demo_rpg_dataGetNpcsesInput) {
  npcses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          description { en ru zh }
          display_label_en
          location_id {
            id
            data { name { en ru zh } }
          }
          name { en ru zh }
          portrait { fileId fileName hash height mimeType url width }
          role
          title { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class NpcsViewModel implements IViewModel {
  public activeLocationId: string | null = null;
  public searchQuery = '';
  private readonly itemCache = new Map<string, NpcItemViewModel>();
  private readonly loadedItems: NpcNode[] = [];

  constructor(
    public readonly dataSource: NpcsDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'itemCache' | 'localeService'>(this, {
      itemCache: false,
      localeService: false,
    });
  }

  public setup(): void {
    // NPCs has no route params yet.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    resetCatalogRequestState(this.dataSource, this.loadedItems, this.itemCache);
  }

  public get items(): readonly NpcItemViewModel[] {
    const query = this.normalizedSearchQuery;
    const items = this.loadedItems.map((node) => this.getItemViewModel(node));
    if (!query) return items;
    return items.filter((item) => item.searchText.includes(query));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewStateFromRequest(this.dataSource.request, this.loadedItems, this.items.length);
  }

  public get locationButtons(): readonly FilterButtonDescriptor[] {
    return [
      this.createLocationButtonDescriptor(null, this.copy.allLocationsButton, 'all'),
      ...this.locationOptions.map((location) =>
        this.createLocationButtonDescriptor(
          location.id,
          this.getLocationLabel(location),
          location.id,
        ),
      ),
    ];
  }

  public get hasActiveFilter(): boolean {
    return this.activeLocationId !== null || this.searchQuery.trim() !== '';
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/npcs',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/npcs',
      },
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Npcs',
          request: NPCS_QUERY,
        },
      },
      variables: this.currentVariables,
    };
  }

  public get locale(): NpcLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('heroes', '/npcs', this.localeService.ui.navigation);
  }

  public get copy(): NpcsPageCopy {
    return getNpcsPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async setLocation(locationId: string | null): Promise<void> {
    if (this.activeLocationId === locationId) return;
    this.activeLocationId = locationId;
    await this.loadInitial();
  }

  public setSearchQuery(value: string): void {
    this.searchQuery = value;
  }

  public async resetFilters(): Promise<void> {
    if (!this.hasActiveFilter) return;
    this.activeLocationId = null;
    this.searchQuery = '';
    await this.loadInitial();
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    await appendCatalogItemsFromFetch(this.loadedItems, this.catalogState.canLoadMore, () =>
      this.dataSource.request.fetch(this.nextPageRequestData, this.locationsRequestData),
    );
  }

  private async loadInitial(): Promise<void> {
    await replaceCatalogItemsFromFetch(this.loadedItems, this.itemCache, () =>
      this.dataSource.request.fetch(this.currentRequestData, this.locationsRequestData),
    );
  }

  private getItemViewModel(node: NpcNode): NpcItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new NpcItemViewModel(
      node,
      () => this.locale,
      () => this.copy.noDescription,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get locationOptions(): readonly NpcLocationOptionNode[] {
    const byId = new Map<string, NpcLocationOptionNode>();
    for (const location of this.dataSource.request.data?.locations ?? []) {
      byId.set(location.id, location);
    }
    for (const npc of this.loadedItems) {
      byId.set(npc.data.location_id.id, npc.data.location_id);
    }
    return [...byId.values()].sort((left, right) =>
      this.getLocationLabel(left).localeCompare(this.getLocationLabel(right), this.locale),
    );
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      locale: this.locale,
      locationFilter: this.activeLocationId,
      locationsData: this.locationsRequestData,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
      searchQuery: this.searchQuery.trim(),
    };
  }

  private get currentRequestData(): NpcsRequestData {
    const data: NpcsRequestData = {
      first: NPCS_PAGE_SIZE,
    };
    const where = this.currentWhere;
    if (where) {
      data.where = where;
    }
    return data;
  }

  private get nextPageRequestData(): NpcsRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get locationsRequestData(): NpcLocationsRequestData {
    return {
      first: NPC_LOCATION_FILTER_PAGE_SIZE,
    };
  }

  private get currentWhere(): NpcsRequestData['where'] | undefined {
    if (!this.activeLocationId) return undefined;
    return {
      data: {
        equals: this.activeLocationId,
        path: ['location_id'],
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
        displayLabelEn: node.data.display_label_en,
        id: node.id,
        location: {
          id: node.data.location_id.id,
          name: node.data.location_id.data.name[this.locale],
        },
        portrait: getNpcPortraitMetadata(node.data.portrait),
        role: node.data.role,
        title: node.data.title[this.locale],
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.catalogState.totalCount,
      visibleCount: this.catalogState.visibleCount,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) =>
      createLocaleFallbacks(
        this.locale,
        [
          { path: `npcs.${node.id}.data.name`, value: node.data.name },
          { path: `npcs.${node.id}.data.title`, value: node.data.title },
          { path: `npcs.${node.id}.data.description`, value: node.data.description },
          {
            path: `npcs.${node.id}.data.location_id.data.name`,
            value: node.data.location_id.data.name,
          },
        ],
        'en',
      ),
    );
  }

  private createLocationButtonDescriptor(
    locationId: string | null,
    label: string,
    key: string,
  ): FilterButtonDescriptor {
    const selected = this.activeLocationId === locationId;
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
      onSelect: () => this.setLocation(locationId),
      variant: selected ? 'solid' : 'outline',
    };
  }

  private getLocationLabel(location: NpcLocationOptionNode): string {
    return location.data.name[this.locale] || location.data.name.en || location.id;
  }
}

container.register(
  NpcsViewModel,
  () => new NpcsViewModel(container.get(NpcsDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
