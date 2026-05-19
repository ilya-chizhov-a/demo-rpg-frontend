import { makeAutoObservable } from 'mobx';

import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  createCatalogViewState,
  hasRequestError,
  replaceCatalogItems,
  resetCatalogState,
  shouldRequestInitialData,
  totalCatalogCount,
  type CatalogViewState,
} from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  LocationsDataSource,
  type LocationNode,
  type LocationRegionOptionNode,
  type LocationsRegionsRequestData,
  type LocationsRequestData,
} from '../api/LocationsDataSource';
import { getLocationFileMetadata } from './locationImages';
import { LocationItemViewModel, type LocationLocale } from './LocationItemViewModel';
import { getLocationsPageCopy, type LocationsPageCopy } from './locationUiCopy';

const LOCATIONS_PAGE_SIZE = 24;
const LOCATION_REGION_FILTER_PAGE_SIZE = 50;

interface RegionButtonDescriptor {
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

// Keep this display string in sync with api/Locations.graphql until the widget can import raw GraphQL.
const LOCATIONS_QUERY = `query Locations(
  $data: Demo_rpg_dataGetLocationsesInput
) {
  locationses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          coordinates { x y }
          description { en ru zh }
          gallery { fileId fileName hash height mimeType url width }
          kind
          map { fileId fileName hash height mimeType url width }
          name { en ru zh }
          region_id {
            id
            data {
              climate
              name { en ru zh }
            }
          }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class LocationsViewModel implements IViewModel {
  public activeRegionId: string | null = null;
  private readonly itemCache = new Map<string, LocationItemViewModel>();
  private readonly loadedItems: LocationNode[] = [];

  constructor(
    public readonly dataSource: LocationsDataSource,
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
    // Locations has no route params yet.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    this.dataSource.reset();
    resetCatalogState(this.loadedItems, this.itemCache);
  }

  public get items(): readonly LocationItemViewModel[] {
    return this.loadedItems.map((node) => this.getItemViewModel(node));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewState({
      hasError: hasRequestError(this.dataSource.request),
      hasNextPage: this.dataSource.request.data?.pageInfo.hasNextPage,
      isLoaded: this.dataSource.request.isLoaded,
      isLoading: this.dataSource.request.isLoading,
      totalCount: totalCatalogCount(this.dataSource.request, this.loadedItems),
      visibleCount: this.loadedItems.length,
    });
  }

  public get regionButtons(): readonly RegionButtonDescriptor[] {
    return [
      this.createRegionButtonDescriptor(null, this.copy.allRegionsButton, 'all'),
      ...this.regionOptions.map((region) =>
        this.createRegionButtonDescriptor(region.id, this.getRegionLabel(region), region.id),
      ),
    ];
  }

  public get hasActiveFilter(): boolean {
    return this.activeRegionId !== null;
  }

  public get explainer(): ExplainerDescriptor {
    return {
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Locations',
          request: LOCATIONS_QUERY,
        },
      },
      variables: this.currentVariables,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      deepLinks: {
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/locations',
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/locations',
      },
      localeFallbacks: this.localeFallbacks,
      footerNote: this.copy.explainerFooterNote,
    };
  }

  public get locale(): LocationLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('world', '/locations', this.localeService.ui.navigation);
  }

  public get copy(): LocationsPageCopy {
    return getLocationsPageCopy(this.locale);
  }

  public async setRegion(regionId: string | null): Promise<void> {
    if (this.activeRegionId === regionId) return;
    this.activeRegionId = regionId;
    await this.loadInitial();
  }

  public async resetFilters(): Promise<void> {
    if (!this.hasActiveFilter) return;
    this.activeRegionId = null;
    await this.loadInitial();
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    if (!this.catalogState.canLoadMore) return;
    const result = await this.dataSource.request.fetch(
      this.nextPageRequestData,
      this.regionsRequestData,
    );
    if (result.ok) {
      this.loadedItems.push(...result.value.items);
    }
  }

  private async loadInitial(): Promise<void> {
    const result = await this.dataSource.request.fetch(
      this.currentRequestData,
      this.regionsRequestData,
    );
    if (result.ok) {
      replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
    }
  }

  private getItemViewModel(node: LocationNode): LocationItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new LocationItemViewModel(
      node,
      () => this.locale,
      () => this.copy.noDescription,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get regionOptions(): readonly LocationRegionOptionNode[] {
    const byId = new Map<string, LocationRegionOptionNode>();
    for (const region of this.dataSource.request.data?.regions ?? []) {
      byId.set(region.id, region);
    }
    for (const location of this.loadedItems) {
      byId.set(location.data.region_id.id, location.data.region_id);
    }
    return [...byId.values()].sort((left, right) =>
      this.getRegionLabel(left).localeCompare(this.getRegionLabel(right), this.locale),
    );
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      regionsData: this.regionsRequestData,
      regionFilterPath: ['region_id'],
      locale: this.locale,
      regionFilter: this.activeRegionId,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
    };
  }

  private get currentRequestData(): LocationsRequestData {
    const data: LocationsRequestData = {
      first: LOCATIONS_PAGE_SIZE,
    };
    const where = this.currentWhere;
    if (where) {
      data.where = where;
    }
    return data;
  }

  private get nextPageRequestData(): LocationsRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get regionsRequestData(): LocationsRegionsRequestData {
    return {
      first: LOCATION_REGION_FILTER_PAGE_SIZE,
    };
  }

  private get currentWhere(): LocationsRequestData['where'] | undefined {
    if (!this.activeRegionId) return undefined;
    return {
      data: {
        equals: this.activeRegionId,
        path: ['region_id'],
      },
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      totalCount: this.catalogState.totalCount,
      visibleCount: this.catalogState.visibleCount,
      pageInfo: this.dataSource.request.data.pageInfo,
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        id: node.id,
        kind: node.data.kind,
        coordinates: node.data.coordinates,
        name: node.data.name[this.locale],
        region: {
          id: node.data.region_id.id,
          name: node.data.region_id.data.name[this.locale],
        },
        map: getLocationFileMetadata(node.data.map),
        galleryCount: node.data.gallery.length,
        gallery: node.data.gallery.slice(0, 3).map((file) => getLocationFileMetadata(file)),
      })),
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) => {
      const fallbacks: {
        readonly path: string;
        readonly requestedLocale: LocationLocale;
        readonly renderedLocale: LocationLocale;
      }[] = [];
      if (!node.data.name[this.locale]) {
        fallbacks.push({
          path: `locations.${node.id}.data.name`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      if (!node.data.description[this.locale]) {
        fallbacks.push({
          path: `locations.${node.id}.data.description`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      if (!node.data.region_id.data.name[this.locale]) {
        fallbacks.push({
          path: `locations.${node.id}.data.region_id.data.name`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      return fallbacks;
    });
  }

  private createRegionButtonDescriptor(
    regionId: string | null,
    label: string,
    key: string,
  ): RegionButtonDescriptor {
    const selected = this.activeRegionId === regionId;
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
      onSelect: () => this.setRegion(regionId),
      variant: selected ? 'solid' : 'outline',
    };
  }

  private getRegionLabel(region: LocationRegionOptionNode): string {
    return region.data.name[this.locale] || region.data.name.en || region.id;
  }
}

container.register(
  LocationsViewModel,
  () => new LocationsViewModel(container.get(LocationsDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
