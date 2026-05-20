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
import {
  ItemDetailDataSource,
  type ItemDetailModifierNode,
  type ItemDetailNode,
} from '../api/ItemDetailDataSource';
import { getItemIconMetadata, prepareItemDetailIconImage } from './itemImages';
import { getItemsPageCopy, type ItemsPageCopy } from './itemUiCopy';
import type { ItemLocale } from './ItemItemViewModel';

// Keep this explainer copy aligned with src/pages/Items/api/ItemDetail.graphql.
const ITEM_DETAIL_QUERY = `query ItemDetail($id: String!) {
  items(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      base_value
      description { en ru zh }
      icon { extension fileId fileName hash height mimeType size status url width }
      market_value
      modifiers {
        stat_id {
          id
          data {
            abbreviation
            code
            description { en ru zh }
            name { en ru zh }
          }
        }
        value
      }
      name { en ru zh }
      rarity
      rarity_multiplier
      rarity_tag
      type_id {
        id
        data {
          code
          description { en ru zh }
          name { en ru zh }
        }
      }
      weight
    }
  }
}`;

export interface ItemDetailModifierDescriptor {
  readonly codeLabel: string;
  readonly description: string;
  readonly id: string;
  readonly statHref: string;
  readonly title: string;
  readonly valueLabel: string;
}

export class ItemDetailViewModel implements IViewModel {
  private readonly cloudItemsTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/items';
  private readonly cloudItemTypesTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/item_types';
  private readonly cloudStatsTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/stats';
  public readonly backHref = '/items';
  public readonly itemTypesHref = '/item-types';
  public readonly statsHref = '/stats';
  public id = '';

  constructor(
    public readonly dataSource: ItemDetailDataSource,
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

  public get item(): ItemDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return this.localized(this.item?.data.name) || this.id || this.copy.detail.unknownValue;
  }

  public get description(): string {
    return this.localized(this.item?.data.description) || this.copy.detail.noDescription;
  }

  public get typeId(): string {
    return this.item?.data.type_id.id ?? '';
  }

  public get typeTitle(): string {
    return this.localized(this.item?.data.type_id.data.name) || this.typeId || this.unknownValue;
  }

  public get typeCode(): string {
    return this.fallbackText(this.item?.data.type_id.data.code);
  }

  public get typeDescription(): string {
    return this.localized(this.item?.data.type_id.data.description) || this.unknownValue;
  }

  public get rarityLabel(): string {
    return this.item ? this.copy.rarityLabel(this.item.data.rarity) : this.unknownValue;
  }

  public get rarityTag(): string {
    return this.fallbackText(this.item?.data.rarity_tag);
  }

  public get baseValueLabel(): string {
    return this.item ? this.formatNumber(this.item.data.base_value) : this.unknownValue;
  }

  public get marketValueLabel(): string {
    return this.item ? this.formatNumber(this.item.data.market_value) : this.unknownValue;
  }

  public get rarityMultiplierLabel(): string {
    return this.item ? this.formatMultiplier(this.item.data.rarity_multiplier) : this.unknownValue;
  }

  public get weightLabel(): string {
    return this.item ? this.formatNumber(this.item.data.weight) : this.unknownValue;
  }

  public get iconImage(): PreparedImageSlot | null {
    if (!this.item) return null;
    return prepareItemDetailIconImage(this.item.data.icon, this.title);
  }

  public get iconPlaceholderTitle(): string {
    return this.copy.detail.iconPlaceholderTitle;
  }

  public get iconPlaceholderDescription(): string {
    return this.copy.detail.iconPlaceholderDescription(this.title);
  }

  public get iconFileName(): string {
    return this.fallbackText(this.item?.data.icon.fileName);
  }

  public get iconDimensionsLabel(): string {
    return this.item ? this.formatDimensions(this.item.data.icon) : this.unknownValue;
  }

  public get iconMimeType(): string {
    return this.fallbackText(this.item?.data.icon.mimeType);
  }

  public get iconSizeLabel(): string {
    return this.item ? this.formatFileSize(this.item.data.icon.size) : this.unknownValue;
  }

  public get iconStatus(): string {
    return this.fallbackText(this.item?.data.icon.status);
  }

  public get iconHashLabel(): string {
    const hash = this.item?.data.icon.hash;
    if (!hash) return this.unknownValue;
    return hash.length > 14 ? `${hash.slice(0, 14)}...` : hash;
  }

  public get modifiers(): readonly ItemDetailModifierDescriptor[] {
    return this.item?.data.modifiers.map((modifier) => this.createModifierDescriptor(modifier)) ?? [];
  }

  public get hasModifiers(): boolean {
    return this.modifiers.length > 0;
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

  public get showNotFound(): boolean {
    return Boolean(this.id) && this.dataSource.request.isLoaded && !this.item && !this.showError;
  }

  public get showDetail(): boolean {
    return Boolean(this.item) && !this.showError && !this.showNotFound;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems(
      'items',
      `/items/${this.id || ''}`,
      this.localeService.ui.navigation,
    );
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudRow: this.cloudRowHref,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/items',
        cloudTable: this.cloudItemsTableHref,
      },
      fieldAttribution: [
        { path: 'items.data.name', owningSubgraph: 'data' },
        { path: 'items.data.description', owningSubgraph: 'data' },
        { path: 'items.data.icon', owningSubgraph: 'data' },
        { path: 'items.data.type_id', owningSubgraph: 'data' },
        { path: 'items.data.modifiers', owningSubgraph: 'data' },
        { path: 'items.data.market_value', owningSubgraph: 'data' },
        { path: 'items.data.rarity_multiplier', owningSubgraph: 'data' },
        { path: 'items.data.rarity_tag', owningSubgraph: 'data' },
      ],
      footerNote: this.copy.detail.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.detail.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'ItemDetail',
          request: ITEM_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
        locale: this.locale,
      },
    };
  }

  public get locale(): ItemLocale {
    return this.localeService.locale;
  }

  public get copy(): ItemsPageCopy {
    return getItemsPageCopy(this.locale);
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

  private createModifierDescriptor(
    modifier: ItemDetailModifierNode,
  ): ItemDetailModifierDescriptor {
    const stat = modifier.stat_id;
    return {
      codeLabel: stat.data.code || stat.data.abbreviation || this.unknownValue,
      description: this.localized(stat.data.description) || this.unknownValue,
      id: stat.id,
      statHref: this.statsHref,
      title:
        this.localized(stat.data.name) || stat.data.abbreviation || stat.data.code || stat.id,
      valueLabel: this.formatModifierValue(modifier.value),
    };
  }

  private get cloudRowHref(): string {
    return `${this.cloudItemsTableHref}/${this.item?.id ?? this.id}`;
  }

  private get typeCloudRowHref(): string | null {
    if (!this.typeId) return null;
    return `${this.cloudItemTypesTableHref}/${this.typeId}`;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      formulas: {
        marketValue: this.item.data.market_value,
        rarityMultiplier: this.item.data.rarity_multiplier,
        rarityTag: this.item.data.rarity_tag,
      },
      icon: getItemIconMetadata(this.item.data.icon),
      id: this.item.id,
      modifiers: this.item.data.modifiers.map((modifier) => ({
        stat: {
          cloudRow: this.getStatCloudRowHref(modifier.stat_id.id),
          code: modifier.stat_id.data.code,
          id: modifier.stat_id.id,
          name: modifier.stat_id.data.name,
        },
        value: modifier.value,
      })),
      name: this.item.data.name,
      rarity: this.item.data.rarity,
      type: {
        cloudRow: this.typeCloudRowHref,
        code: this.item.data.type_id.data.code,
        id: this.item.data.type_id.id,
        name: this.item.data.type_id.data.name,
      },
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    const fallbacks = createLocaleFallbacks(
      this.locale,
      [
        { path: `items.${this.item.id}.data.name`, value: this.item.data.name },
        { path: `items.${this.item.id}.data.description`, value: this.item.data.description },
        {
          path: `items.${this.item.id}.data.type_id.data.name`,
          value: this.item.data.type_id.data.name,
        },
        {
          path: `items.${this.item.id}.data.type_id.data.description`,
          value: this.item.data.type_id.data.description,
        },
      ],
      'en',
    );
    for (const modifier of this.item.data.modifiers) {
      fallbacks.push(
        ...createLocaleFallbacks(
          this.locale,
          [
            {
              path: `items.${this.item.id}.data.modifiers.${modifier.stat_id.id}.data.name`,
              value: modifier.stat_id.data.name,
            },
            {
              path: `items.${this.item.id}.data.modifiers.${modifier.stat_id.id}.data.description`,
              value: modifier.stat_id.data.description,
            },
          ],
          'en',
        ),
      );
    }
    return fallbacks;
  }

  private get unknownValue(): string {
    return this.copy.detail.unknownValue;
  }

  private localized(value?: Record<ItemLocale, string>): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private fallbackText(value?: string): string {
    if (!value?.trim()) return this.unknownValue;
    return value;
  }

  private getStatCloudRowHref(id: string): string {
    return `${this.cloudStatsTableHref}/${id}`;
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }

  private formatDimensions(source: { readonly height: number; readonly width: number }): string {
    if (source.width <= 0 || source.height <= 0) return this.unknownValue;
    const width = new Intl.NumberFormat(this.locale).format(source.width);
    const height = new Intl.NumberFormat(this.locale).format(source.height);
    return `${width} x ${height} px`;
  }

  private formatFileSize(value: number): string {
    if (value <= 0) return this.unknownValue;
    const formatter = new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
    });
    if (value < 1024) return `${formatter.format(value)} B`;
    if (value < 1024 * 1024) return `${formatter.format(value / 1024)} KB`;
    return `${formatter.format(value / 1024 / 1024)} MB`;
  }

  private formatModifierValue(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
      signDisplay: 'exceptZero',
    }).format(value);
  }

  private formatMultiplier(value: number): string {
    const formatted = new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 2,
    }).format(value);
    return `x${formatted}`;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
    }).format(value);
  }
}

container.register(
  ItemDetailViewModel,
  () =>
    new ItemDetailViewModel(container.get(ItemDetailDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
