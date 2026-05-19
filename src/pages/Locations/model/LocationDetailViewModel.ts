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
} from 'src/shared/lib';
import { getLocaleNativeLabel, LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import { LocationDetailDataSource, type LocationDetailNode } from '../api/LocationDetailDataSource';
import type { LocationLocale } from './LocationItemViewModel';
import {
  getLocationFileMetadata,
  prepareLocationDetailGalleryImage,
  prepareLocationDetailMapImage,
  type LocationFileSource,
  type LocationImageSlot,
} from './locationImages';
import {
  fallbackLocale,
  getLocationKindLabel,
  getLocationsPageCopy,
  type LocationsPageCopy,
} from './locationUiCopy';

export interface LocationGalleryImageDescriptor {
  readonly dimensionsLabel: string;
  readonly fileName: string;
  readonly hashLabel: string;
  readonly image: LocationImageSlot;
  readonly mimeType: string;
  readonly title: string;
}

// Keep this explainer copy aligned with src/pages/Locations/api/LocationDetail.graphql.
const LOCATION_DETAIL_QUERY = `query LocationDetail($id: String!) {
  locations(id: $id) {
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
}`;

export class LocationDetailViewModel implements IViewModel {
  private readonly cloudLocationsTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/locations';
  private readonly cloudRegionsTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/regions';
  public id = '';

  constructor(
    public readonly dataSource: LocationDetailDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoObservable<this, 'localeService'>(
      this,
      {
        localeService: false,
      },
      { autoBind: true },
    );
  }

  public setup(id?: unknown): void {
    this.id = typeof id === 'string' ? id : '';
  }

  public async mount(): Promise<void> {
    if (!this.id || this.dataSource.request.isLoading || this.dataSource.request.isLoaded) return;
    await this.load();
  }

  public unmount(): void {
    this.dataSource.reset();
  }

  public get item(): LocationDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return this.localized(this.item?.data.name) || this.id || 'Location';
  }

  public get description(): string {
    return this.localized(this.item?.data.description) || this.copy.detail.noDescription;
  }

  public get kind(): string {
    return this.item?.data.kind ?? 'unknown';
  }

  public get kindLabel(): string {
    return getLocationKindLabel(this.locale, this.kind);
  }

  public get regionId(): string {
    return this.item?.data.region_id.id ?? '';
  }

  public get regionTitle(): string {
    return this.localized(this.item?.data.region_id.data.name) || this.regionId || this.unknownValue;
  }

  public get regionHref(): string {
    return `/regions/${this.regionId}`;
  }

  public get canOpenRegion(): boolean {
    return this.regionId.length > 0;
  }

  public get mapImage(): LocationImageSlot | null {
    if (!this.item) return null;
    return prepareLocationDetailMapImage(this.item.data.map, this.title);
  }

  public get mapPlaceholderTitle(): string {
    return this.copy.mapPlaceholderTitle;
  }

  public get mapPlaceholderDescription(): string {
    return this.copy.mapPlaceholderDescription(this.title);
  }

  public get galleryItems(): readonly LocationGalleryImageDescriptor[] {
    if (!this.item) return [];

    return this.item.data.gallery
      .map((source, index) => {
        const image = prepareLocationDetailGalleryImage(source, this.title, index);
        if (!image) return null;

        return {
          dimensionsLabel: this.formatDimensions(source),
          fileName: source.fileName || this.unknownValue,
          hashLabel: this.shortHash(source.hash),
          image,
          mimeType: source.mimeType || this.unknownValue,
          title: this.copy.detail.galleryItemLabel(index),
        };
      })
      .filter((item): item is LocationGalleryImageDescriptor => item !== null);
  }

  public get galleryCountLabel(): string {
    return this.copy.galleryCountLabel(this.galleryItems.length);
  }

  public get coordinatesLabel(): string {
    if (!this.item) return this.unknownValue;
    const { x, y } = this.item.data.coordinates;
    return `${this.formatCoordinate(x)}, ${this.formatCoordinate(y)}`;
  }

  public get mapFileName(): string {
    return this.item?.data.map.fileName ?? this.unknownValue;
  }

  public get mapDimensionsLabel(): string {
    return this.item ? this.formatDimensions(this.item.data.map) : this.unknownValue;
  }

  public get mapMimeType(): string {
    return this.item?.data.map.mimeType ?? this.unknownValue;
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }

  public get publishedLabel(): string {
    if (!this.item) return this.unknownValue;
    return this.formatDate(this.item.publishedAt);
  }

  public get versionLabel(): string {
    return this.item?.versionId.slice(0, 8) ?? this.unknownValue;
  }

  public get showLoading(): boolean {
    return isInitialLoading(this.dataSource.request);
  }

  public get showRefreshing(): boolean {
    return isRefreshing(this.dataSource.request);
  }

  public get showError(): boolean {
    return hasRequestError(this.dataSource.request) || !this.id;
  }

  public get showDetail(): boolean {
    return Boolean(this.item) && !this.showError;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems(
      'world',
      `/locations/${this.id || ''}`,
      this.localeService.ui.navigation,
    );
  }

  public get explainer(): ExplainerDescriptor {
    return {
      summary: this.copy.detailExplainerSummary,
      surfaces: {
        graphql: {
          operationName: 'LocationDetail',
          request: LOCATION_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
        locale: this.locale,
      },
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      deepLinks: {
        cloudTable: this.cloudLocationsTableHref,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/locations',
        cloudRow: this.cloudRowHref,
      },
      fieldAttribution: [
        { path: 'locations.data.name', owningSubgraph: 'data' },
        { path: 'locations.data.description', owningSubgraph: 'data' },
        { path: 'locations.data.kind', owningSubgraph: 'data' },
        { path: 'locations.data.coordinates', owningSubgraph: 'data' },
        { path: 'locations.data.map', owningSubgraph: 'data' },
        { path: 'locations.data.gallery', owningSubgraph: 'data' },
        { path: 'locations.data.region_id', owningSubgraph: 'data' },
      ],
      localeFallbacks: this.localeFallbacks,
      footerNote: this.copy.detailExplainerFooterNote,
    };
  }

  public get locale(): LocationLocale {
    return this.localeService.locale;
  }

  public get copy(): LocationsPageCopy {
    return getLocationsPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async retry(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    if (!this.id) return;
    await this.dataSource.request.fetch(this.id);
  }

  private get cloudRowHref(): string {
    return `${this.cloudLocationsTableHref}/${this.item?.id ?? this.id}`;
  }

  private get regionCloudRowHref(): string | null {
    if (!this.regionId) return null;
    return `${this.cloudRegionsTableHref}/${this.regionId}`;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      id: this.item.id,
      kind: this.item.data.kind,
      coordinates: this.item.data.coordinates,
      name: this.item.data.name,
      description: this.item.data.description,
      region: {
        id: this.item.data.region_id.id,
        name: this.item.data.region_id.data.name,
        cloudRow: this.regionCloudRowHref,
      },
      map: getLocationFileMetadata(this.item.data.map),
      galleryCount: this.item.data.gallery.length,
      gallery: this.item.data.gallery.map((file) => getLocationFileMetadata(file)),
      publishedAt: this.item.publishedAt,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    const fallbacks: {
      readonly path: string;
      readonly requestedLocale: LocationLocale;
      readonly renderedLocale: LocationLocale;
    }[] = [];
    if (!this.item.data.name[this.locale]) {
      fallbacks.push({
        path: `locations.${this.item.id}.data.name`,
        requestedLocale: this.locale,
        renderedLocale: fallbackLocale,
      });
    }
    if (!this.item.data.description[this.locale]) {
      fallbacks.push({
        path: `locations.${this.item.id}.data.description`,
        requestedLocale: this.locale,
        renderedLocale: fallbackLocale,
      });
    }
    if (!this.item.data.region_id.data.name[this.locale]) {
      fallbacks.push({
        path: `locations.${this.item.id}.data.region_id.data.name`,
        requestedLocale: this.locale,
        renderedLocale: fallbackLocale,
      });
    }
    return fallbacks;
  }

  private get unknownValue(): string {
    return this.copy.detail.unknownValue;
  }

  private localized(value?: Record<LocationLocale, string>): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private formatCoordinate(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    }).format(value);
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }

  private formatDimensions(source: LocationFileSource): string {
    const width = this.formatCoordinate(source.width);
    const height = this.formatCoordinate(source.height);
    return `${width} x ${height} px`;
  }

  private shortHash(value: string): string {
    return value ? value.slice(0, 10) : this.unknownValue;
  }
}

container.register(
  LocationDetailViewModel,
  () =>
    new LocationDetailViewModel(container.get(LocationDetailDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
