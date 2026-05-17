import { makeAutoObservable } from 'mobx';

import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  hasRequestError,
  isInitialLoading,
  isRefreshing,
  replaceCatalogItems,
  resetCatalogState,
  shouldRequestInitialData,
  totalCatalogCount,
} from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  RegionsDataSource,
  type RegionNode,
  type RegionsRequestData,
} from '../api/RegionsDataSource';
import { RegionItemViewModel, type RegionLocale } from './RegionItemViewModel';
import { getRegionCoverImageMetadata } from './regionCoverImages';

const REGIONS_PAGE_SIZE = 24;

interface ClimateButtonDescriptor {
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

// Keep this display string in sync with api/Regions.graphql until the widget can import raw GraphQL.
const REGIONS_QUERY = `query Regions($data: Demo_rpg_dataGetRegionsesInput) {
  regionses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          climate
          cover_image {
            fileId
            fileName
            hash
            height
            mimeType
            url
            width
          }
          name { en ru zh }
          description { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class RegionsViewModel implements IViewModel {
  public activeClimate: string | null = null;
  private readonly itemCache = new Map<string, RegionItemViewModel>();
  private readonly loadedItems: RegionNode[] = [];

  constructor(
    public readonly dataSource: RegionsDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoObservable<this, 'itemCache' | 'localeService'>(
      this,
      {
        itemCache: false,
        localeService: false,
      },
      { autoBind: true },
    );
  }

  public setup(): void {
    // intentionally empty — RegionsPage has no per-route setup state
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    this.dataSource.reset();
    resetCatalogState(this.loadedItems, this.itemCache);
  }

  public get items(): readonly RegionItemViewModel[] {
    return this.visibleNodes.map((node) => this.getItemViewModel(node));
  }

  public get totalCount(): number {
    return totalCatalogCount(this.dataSource.request, this.loadedItems);
  }

  public get visibleCount(): number {
    return this.visibleNodes.length;
  }

  public get hasNextPage(): boolean {
    return this.dataSource.request.data?.pageInfo.hasNextPage ?? false;
  }

  public get canLoadMore(): boolean {
    return this.hasNextPage && !this.showLoading && !this.showRefreshing;
  }

  public get showLoading(): boolean {
    return isInitialLoading(this.dataSource.request);
  }

  public get showRefreshing(): boolean {
    return isRefreshing(this.dataSource.request);
  }

  public get showError(): boolean {
    return hasRequestError(this.dataSource.request);
  }

  public get showEmpty(): boolean {
    return this.dataSource.request.isLoaded && this.visibleNodes.length === 0 && !this.showError;
  }

  public get showList(): boolean {
    return this.visibleNodes.length > 0;
  }

  public get climates(): readonly string[] {
    return [...new Set(this.loadedItems.map((item) => item.data.climate))].sort((left, right) =>
      left.localeCompare(right),
    );
  }

  public get climateButtons(): readonly ClimateButtonDescriptor[] {
    return [
      this.createClimateButtonDescriptor(null, 'All', 'all'),
      ...this.climates.map((climate) =>
        this.createClimateButtonDescriptor(climate, climate, climate),
      ),
    ];
  }

  public get activeFilterLabel(): string {
    return this.activeClimate ?? 'All climates';
  }

  public get hasActiveFilter(): boolean {
    return this.activeClimate !== null;
  }

  public get explainer(): ExplainerDescriptor {
    return {
      summary:
        'Regions show how localized JSON fields become a typed GraphQL catalog with enum-like climate values and connection metadata.',
      surfaces: {
        graphql: {
          operationName: 'Regions',
          request: REGIONS_QUERY,
        },
      },
      variables: this.currentVariables,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      deepLinks: {
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/regions',
      },
      localeFallbacks: this.localeFallbacks,
      footerNote:
        'The browser calls the same-origin /graphql endpoint; Vite proxies it to the federated router during local development.',
    };
  }

  public get locale(): RegionLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('world', '/regions');
  }

  public setLocale(locale: RegionLocale): void {
    this.localeService.setLocale(locale);
  }

  public async setClimate(climate: string | null): Promise<void> {
    if (this.activeClimate === climate) return;
    this.activeClimate = climate;
    await this.loadInitial();
  }

  public async resetFilters(): Promise<void> {
    if (this.activeClimate === null) return;
    this.activeClimate = null;
    await this.loadInitial();
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    if (!this.canLoadMore) return;
    const result = await this.dataSource.request.fetch(this.nextPageRequestData);
    if (result.ok) {
      this.loadedItems.push(...result.value.items);
    }
  }

  private async loadInitial(): Promise<void> {
    const result = await this.dataSource.request.fetch(this.currentRequestData);
    if (result.ok) {
      replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
    }
  }

  private getItemViewModel(node: RegionNode): RegionItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new RegionItemViewModel(node, () => this.locale);
    this.itemCache.set(node.id, item);
    return item;
  }

  private get visibleNodes(): readonly RegionNode[] {
    if (this.activeClimate === null) return this.loadedItems;
    return this.loadedItems.filter((node) => node.data.climate === this.activeClimate);
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      locale: this.locale,
      climateFilter: this.activeClimate,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
    };
  }

  private get currentRequestData(): RegionsRequestData {
    const data: RegionsRequestData = {
      first: REGIONS_PAGE_SIZE,
    };
    if (this.activeClimate) {
      data.where = {
        data: {
          equals: this.activeClimate,
          path: ['climate'],
        },
      };
    }
    return data;
  }

  private get nextPageRequestData(): RegionsRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      totalCount: this.totalCount,
      visibleCount: this.visibleCount,
      pageInfo: this.dataSource.request.data.pageInfo,
      edges: this.visibleNodes.slice(0, 3).map((node) => ({
        id: node.id,
        climate: node.data.climate,
        coverImage: getRegionCoverImageMetadata(node.data.cover_image),
        name: node.data.name[this.locale],
      })),
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.visibleNodes.flatMap((node) => {
      const fallbacks: {
        readonly path: string;
        readonly requestedLocale: RegionLocale;
        readonly renderedLocale: RegionLocale;
      }[] = [];
      if (!node.data.name[this.locale]) {
        fallbacks.push({
          path: `regions.${node.id}.data.name`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      if (!node.data.description[this.locale]) {
        fallbacks.push({
          path: `regions.${node.id}.data.description`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      return fallbacks;
    });
  }

  private createClimateButtonDescriptor(
    climate: string | null,
    label: string,
    key: string,
  ): ClimateButtonDescriptor {
    const isSelected = this.activeClimate === climate;

    return {
      ariaPressed: isSelected,
      bg: isSelected ? '#22d3ee' : 'transparent',
      borderColor: isSelected ? '#67e8f9' : 'rgba(103, 232, 249, 0.24)',
      color: isSelected ? 'var(--color-text-on-accent)' : 'var(--color-text-supporting)',
      hoverStyle: {
        bg: isSelected ? '#67e8f9' : 'rgba(34, 211, 238, 0.12)',
      },
      key,
      label,
      onSelect: () => this.setClimate(climate),
      variant: isSelected ? 'solid' : 'outline',
    };
  }
}

container.register(
  RegionsViewModel,
  () => new RegionsViewModel(container.get(RegionsDataSource), container.get(LocaleService)),
  {
    scope: 'transient',
  },
);
