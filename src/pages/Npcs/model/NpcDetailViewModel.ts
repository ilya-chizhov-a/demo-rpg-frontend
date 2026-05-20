import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  createLocaleFallbacks,
  hasRequestError,
  isInitialLoading,
  isRefreshing,
  makeAutoBoundObservable,
  type PreparedImageSlot,
} from 'src/shared/lib';
import { getLocaleNativeLabel, LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import { NpcDetailDataSource, type NpcDetailNode } from '../api/NpcDetailDataSource';
import { getNpcPortraitMetadata, prepareNpcDetailPortraitImage } from './npcImages';
import { getNpcsPageCopy, type NpcsPageCopy } from './npcUiCopy';
import type { NpcLocale } from './NpcItemViewModel';

// Keep this explainer copy aligned with src/pages/Npcs/api/NpcDetail.graphql.
const NPC_DETAIL_QUERY = `query NpcDetail($id: String!) {
  npcs(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      description { en ru zh }
      display_label_en
      location_id {
        id
        data {
          kind
          name { en ru zh }
        }
      }
      name { en ru zh }
      portrait { fileId fileName hash height mimeType url width }
      role
      title { en ru zh }
    }
  }
}`;

export class NpcDetailViewModel implements IViewModel {
  private readonly cloudNpcsTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/npcs';
  private readonly cloudLocationsTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/locations';
  public id = '';

  constructor(
    public readonly dataSource: NpcDetailDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'localeService'>(this, {
      localeService: false,
    });
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

  public get item(): NpcDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return this.displayTitle || this.id || 'NPC';
  }

  public get description(): string {
    return this.localized(this.item?.data.description) || this.copy.detail.noDescription;
  }

  public get roleLabel(): string {
    return this.item ? this.copy.roleLabel(this.item.data.role) : this.unknownValue;
  }

  public get locationId(): string {
    return this.item?.data.location_id.id ?? '';
  }

  public get locationTitle(): string {
    return this.localized(this.item?.data.location_id.data.name) || this.locationId || this.unknownValue;
  }

  public get locationHref(): string {
    return `/locations/${this.locationId}`;
  }

  public get canOpenLocation(): boolean {
    return this.locationId.length > 0;
  }

  public get locationKind(): string {
    const kind = this.item?.data.location_id.data.kind;
    return kind ? this.copy.locationKindValueLabel(kind) : this.unknownValue;
  }

  public get portraitImage(): PreparedImageSlot | null {
    if (!this.item) return null;
    return prepareNpcDetailPortraitImage(this.item.data.portrait, this.title);
  }

  public get portraitPlaceholderTitle(): string {
    return this.copy.portraitPlaceholderTitle;
  }

  public get portraitPlaceholderDescription(): string {
    return this.copy.portraitPlaceholderDescription(this.title);
  }

  public get portraitFileName(): string {
    return this.item?.data.portrait.fileName ?? this.unknownValue;
  }

  public get portraitDimensionsLabel(): string {
    return this.item ? this.formatDimensions(this.item.data.portrait) : this.unknownValue;
  }

  public get portraitMimeType(): string {
    return this.item?.data.portrait.mimeType ?? this.unknownValue;
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
      'heroes',
      `/npcs/${this.id || ''}`,
      this.localeService.ui.navigation,
    );
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudRow: this.cloudRowHref,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/npcs',
        cloudTable: this.cloudNpcsTableHref,
      },
      fieldAttribution: [
        { path: 'npcs.data.title', owningSubgraph: 'data' },
        { path: 'npcs.data.name', owningSubgraph: 'data' },
        { path: 'npcs.data.description', owningSubgraph: 'data' },
        { path: 'npcs.data.display_label_en', owningSubgraph: 'data' },
        { path: 'npcs.data.role', owningSubgraph: 'data' },
        { path: 'npcs.data.portrait', owningSubgraph: 'data' },
        { path: 'npcs.data.location_id', owningSubgraph: 'data' },
      ],
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'NpcDetail',
          request: NPC_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
        locale: this.locale,
      },
    };
  }

  public get locale(): NpcLocale {
    return this.localeService.locale;
  }

  public get copy(): NpcsPageCopy {
    return getNpcsPageCopy(this.locale);
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

  private get displayTitle(): string {
    if (!this.item) return '';
    const displayLabelEn = this.item.data.display_label_en.trim();
    if (this.locale === 'en' && displayLabelEn) return displayLabelEn;

    const title = this.localized(this.item.data.title);
    const name = this.localized(this.item.data.name);
    if (this.locale === 'zh') return `${title}${name}`.trim();
    return [title, name].filter(Boolean).join(' ');
  }

  private get cloudRowHref(): string {
    return `${this.cloudNpcsTableHref}/${this.item?.id ?? this.id}`;
  }

  private get locationCloudRowHref(): string | null {
    if (!this.locationId) return null;
    return `${this.cloudLocationsTableHref}/${this.locationId}`;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      description: this.item.data.description,
      displayLabelEn: this.item.data.display_label_en,
      id: this.item.id,
      location: {
        cloudRow: this.locationCloudRowHref,
        id: this.item.data.location_id.id,
        name: this.item.data.location_id.data.name,
      },
      portrait: getNpcPortraitMetadata(this.item.data.portrait),
      role: this.item.data.role,
      title: this.item.data.title,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    return createLocaleFallbacks(
      this.locale,
      [
        { path: `npcs.${this.item.id}.data.title`, value: this.item.data.title },
        { path: `npcs.${this.item.id}.data.name`, value: this.item.data.name },
        { path: `npcs.${this.item.id}.data.description`, value: this.item.data.description },
        {
          path: `npcs.${this.item.id}.data.location_id.data.name`,
          value: this.item.data.location_id.data.name,
        },
      ],
      'en',
    );
  }

  private get unknownValue(): string {
    return this.copy.detail.unknownValue;
  }

  private localized(value?: Record<NpcLocale, string>): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }

  private formatDimensions(source: { readonly height: number; readonly width: number }): string {
    const width = new Intl.NumberFormat(this.locale).format(source.width);
    const height = new Intl.NumberFormat(this.locale).format(source.height);
    return `${width} x ${height} px`;
  }
}

container.register(
  NpcDetailViewModel,
  () => new NpcDetailViewModel(container.get(NpcDetailDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
