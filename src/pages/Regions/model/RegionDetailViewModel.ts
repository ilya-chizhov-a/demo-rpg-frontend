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
  type PreparedImageSlot,
} from 'src/shared/lib';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import { RegionDetailDataSource, type RegionDetailNode } from '../api/RegionDetailDataSource';
import type { RegionLocale } from './RegionItemViewModel';
import { getRegionCoverImageMetadata, prepareRegionHeroCoverImage } from './regionCoverImages';

// Keep this explainer copy aligned with src/pages/Regions/api/RegionDetail.graphql.
const REGION_DETAIL_QUERY = `query RegionDetail($id: String!) {
  regions(id: $id) {
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
}`;

const localeNames: Record<RegionLocale, string> = {
  en: 'English',
  ru: 'Русский',
  zh: '中文',
};

export class RegionDetailViewModel implements IViewModel {
  private readonly cloudRegionsBaseHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/regions';
  public id = '';
  public locale: RegionLocale = 'en';

  constructor(public readonly dataSource: RegionDetailDataSource) {
    makeAutoObservable(this, {}, { autoBind: true });
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

  public get item(): RegionDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return this.localized(this.item?.data.name) || this.id || 'Region';
  }

  public get description(): string {
    return this.localized(this.item?.data.description) || 'No description available.';
  }

  public get climate(): string {
    return this.item?.data.climate ?? 'unknown';
  }

  public get coverImage(): PreparedImageSlot | null {
    if (!this.item) return null;
    return prepareRegionHeroCoverImage(this.item.data.cover_image, this.item.id, this.title);
  }

  public get localeLabel(): string {
    return localeNames[this.locale];
  }

  public get publishedLabel(): string {
    if (!this.item) return 'Unknown';
    return this.formatDate(this.item.publishedAt);
  }

  public get versionLabel(): string {
    return this.item?.versionId.slice(0, 8) ?? 'Unknown';
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

  public get cloudRowHref(): string {
    return `${this.cloudRegionsBaseHref}/${this.item?.id ?? this.id}`;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('world', `/regions/${this.id || ''}`);
  }

  public get explainer(): ExplainerDescriptor {
    return {
      summary:
        'Region detail shows a Revisium-owned row now and marks where backend federation fields will attach.',
      surfaces: {
        graphql: {
          operationName: 'RegionDetail',
          request: REGION_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
      },
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      deepLinks: {
        cloudTable: this.cloudRowHref,
      },
      fieldAttribution: [
        { path: 'regions.data.name', owningSubgraph: 'data' },
        { path: 'regions.data.description', owningSubgraph: 'data' },
        { path: 'regions.data.climate', owningSubgraph: 'data' },
        { path: 'regions.data.cover_image', owningSubgraph: 'data' },
      ],
      localeFallbacks: this.localeFallbacks,
      footerNote:
        'Backend-owned federation fields are intentionally shown as unavailable until the composed schema exposes them.',
    };
  }

  public setLocale(locale: RegionLocale): void {
    this.locale = locale;
  }

  public async retry(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    if (!this.id) return;
    await this.dataSource.request.fetch(this.id);
  }

  private localized(value?: Record<RegionLocale, string>): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      id: this.item.id,
      climate: this.item.data.climate,
      coverImage: getRegionCoverImageMetadata(this.item.data.cover_image),
      name: this.item.data.name,
      publishedAt: this.item.publishedAt,
      backendFields: 'unavailable until backend RegionsNode fields are composed',
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    const fallbacks: {
      readonly path: string;
      readonly requestedLocale: RegionLocale;
      readonly renderedLocale: RegionLocale;
    }[] = [];
    if (!this.item.data.name[this.locale]) {
      fallbacks.push({
        path: `regions.${this.item.id}.data.name`,
        requestedLocale: this.locale,
        renderedLocale: 'en',
      });
    }
    if (!this.item.data.description[this.locale]) {
      fallbacks.push({
        path: `regions.${this.item.id}.data.description`,
        requestedLocale: this.locale,
        renderedLocale: 'en',
      });
    }
    return fallbacks;
  }
}

container.register(
  RegionDetailViewModel,
  () => new RegionDetailViewModel(container.get(RegionDetailDataSource)),
  { scope: 'transient' },
);
