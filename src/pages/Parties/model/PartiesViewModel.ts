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
import { PartiesDataSource, type PartiesRequestData, type PartyNode } from '../api/PartiesDataSource';
import { getPartyHeroPortraitMetadata } from './partyImages';
import { PartyItemViewModel, type PartyLocale } from './PartyItemViewModel';
import {
  getPartiesPageCopy,
  getPartyFullFilterLabel,
  type PartiesPageCopy,
  type PartyFullFilter,
} from './partyUiCopy';

const PARTIES_PAGE_SIZE = 24;

interface FilterButtonDescriptor {
  readonly ariaPressed: boolean;
  readonly bg: string;
  readonly borderColor: string;
  readonly color: string;
  readonly hoverStyle: {
    readonly bg: string;
  };
  readonly key: PartyFullFilter;
  readonly label: string;
  readonly onSelect: () => Promise<void>;
  readonly variant: 'solid' | 'outline';
}

// Keep this display string in sync with api/Parties.graphql until the widget can import raw GraphQL.
const PARTIES_QUERY = `query Parties($data: Demo_rpg_dataGetPartiesesInput) {
  partieses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          formation
          hero_ids {
            id
            data {
              display_name_en
              epithet { en ru zh }
              name { en ru zh }
              portrait { fileId fileName hash height mimeType url width }
            }
          }
          is_full
          member_count
          motto { en ru zh }
          name { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class PartiesViewModel implements IViewModel {
  public activeFullFilter: PartyFullFilter = 'all';
  private readonly itemCache = new Map<string, PartyItemViewModel>();
  private readonly loadedItems: PartyNode[] = [];

  constructor(
    public readonly dataSource: PartiesDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'itemCache' | 'localeService'>(this, {
      itemCache: false,
      localeService: false,
    });
  }

  public setup(): void {
    // Parties has no route params yet.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    resetCatalogRequestState(this.dataSource, this.loadedItems, this.itemCache);
  }

  public get items(): readonly PartyItemViewModel[] {
    return this.loadedItems.map((node) => this.getItemViewModel(node));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewStateFromRequest(this.dataSource.request, this.loadedItems);
  }

  public get filterButtons(): readonly FilterButtonDescriptor[] {
    return (['all', 'open', 'full'] as const).map((filter) =>
      this.createFilterButtonDescriptor(filter),
    );
  }

  public get hasActiveFilter(): boolean {
    return this.activeFullFilter !== 'all';
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/parties',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/parties',
      },
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Parties',
          request: PARTIES_QUERY,
        },
      },
      variables: this.currentVariables,
    };
  }

  public get locale(): PartyLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('heroes', '/parties', this.localeService.ui.navigation);
  }

  public get copy(): PartiesPageCopy {
    return getPartiesPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async setFullFilter(filter: PartyFullFilter): Promise<void> {
    if (this.activeFullFilter === filter) return;
    this.activeFullFilter = filter;
    await this.loadInitial();
  }

  public async resetFilters(): Promise<void> {
    if (!this.hasActiveFilter) return;
    this.activeFullFilter = 'all';
    await this.loadInitial();
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    await appendCatalogItemsFromFetch(this.loadedItems, this.catalogState.canLoadMore, () =>
      this.dataSource.request.fetch(this.nextPageRequestData),
    );
  }

  private async loadInitial(): Promise<void> {
    await replaceCatalogItemsFromFetch(this.loadedItems, this.itemCache, () =>
      this.dataSource.request.fetch(this.currentRequestData),
    );
  }

  private getItemViewModel(node: PartyNode): PartyItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new PartyItemViewModel(
      node,
      () => this.locale,
      () => this.copy.noMotto,
      () => this.copy.unknownHeroLabel,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      fullFilter: this.activeFullFilter,
      locale: this.locale,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
    };
  }

  private get currentRequestData(): PartiesRequestData {
    const data: PartiesRequestData = {
      first: PARTIES_PAGE_SIZE,
    };
    const where = this.currentWhere;
    if (where) {
      data.where = where;
    }
    return data;
  }

  private get nextPageRequestData(): PartiesRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get currentWhere(): PartiesRequestData['where'] | undefined {
    if (this.activeFullFilter === 'all') return undefined;
    return {
      data: {
        equals: this.activeFullFilter === 'full',
        path: ['is_full'],
      },
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        formation: node.data.formation,
        heroes: node.data.hero_ids.map((hero) => ({
          displayNameEn: hero.data.display_name_en,
          id: hero.id,
          name: hero.data.name[this.locale],
          portrait: getPartyHeroPortraitMetadata(hero.data.portrait),
        })),
        id: node.id,
        isFull: node.data.is_full,
        memberCount: node.data.member_count,
        name: node.data.name[this.locale],
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.catalogState.totalCount,
      visibleCount: this.catalogState.visibleCount,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) => {
      const fallbacks = createLocaleFallbacks(
        this.locale,
        [
          { path: `parties.${node.id}.data.name`, value: node.data.name },
          { path: `parties.${node.id}.data.motto`, value: node.data.motto },
        ],
        'en',
      );
      for (const hero of node.data.hero_ids) {
        fallbacks.push(
          ...createLocaleFallbacks(
            this.locale,
            [
              {
                path: `parties.${node.id}.data.hero_ids.${hero.id}.data.name`,
                value: hero.data.name,
              },
              {
                path: `parties.${node.id}.data.hero_ids.${hero.id}.data.epithet`,
                value: hero.data.epithet,
              },
            ],
            'en',
          ),
        );
      }
      return fallbacks;
    });
  }

  private createFilterButtonDescriptor(filter: PartyFullFilter): FilterButtonDescriptor {
    const selected = this.activeFullFilter === filter;
    return {
      ariaPressed: selected,
      bg: selected ? '#22d3ee' : 'rgba(15, 21, 29, 0.74)',
      borderColor: selected ? '#67e8f9' : 'rgba(103, 232, 249, 0.24)',
      color: selected ? 'var(--color-text-on-accent)' : '#f4f7f8',
      hoverStyle: {
        bg: selected ? '#67e8f9' : 'rgba(34, 211, 238, 0.12)',
      },
      key: filter,
      label: getPartyFullFilterLabel(filter, this.locale),
      onSelect: () => this.setFullFilter(filter),
      variant: selected ? 'solid' : 'outline',
    };
  }
}

container.register(
  PartiesViewModel,
  () => new PartiesViewModel(container.get(PartiesDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
