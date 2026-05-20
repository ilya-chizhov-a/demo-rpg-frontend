import {
  Demo_Rpg_DataFilterJsonMode,
  Demo_Rpg_DataGetItem_TypesesOrderByField,
  Demo_Rpg_DataGetItemsesOrderByField,
  Demo_Rpg_DataOrderFieldType,
  Demo_Rpg_DataSortOrder,
} from 'src/__generated__/graphql-request';
import { runInAction } from 'mobx';
import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  createCatalogViewStateFromRequest,
  createLocaleFallbacks,
  makeAutoBoundObservable,
  replaceCatalogItems,
  resetCatalogRequestState,
  shouldRequestInitialData,
  type CatalogViewState,
} from 'src/shared/lib';
import { LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  ItemsDataSource,
  type ItemNode,
  type ItemsRequest,
  type ItemsRequestData,
  type ItemTypeNode,
  type ItemTypesRequestData,
} from '../api/ItemsDataSource';
import { getItemIconMetadata } from './itemImages';
import { ItemItemViewModel, type ItemLocale } from './ItemItemViewModel';
import {
  getItemsPageCopy,
  ITEM_SORT_KEYS,
  type ItemsPageCopy,
  type ItemSortKey,
} from './itemUiCopy';

const ITEMS_PAGE_SIZE = 24;
const ITEM_TYPES_PAGE_SIZE = 100;
const DEFAULT_SORT_KEY: ItemSortKey = 'rarity-value';
const DEFAULT_RARITY_VALUES = ['common', 'uncommon', 'rare', 'epic', 'legendary'] as const;

export interface ItemTypeFilterOption {
  readonly id: string;
  readonly label: string;
  readonly code: string;
}

export interface ItemRarityFilterOption {
  readonly label: string;
  readonly value: string;
}

// Keep this display string in sync with api/Items.graphql until the widget can import raw GraphQL.
const ITEMS_QUERY = `query Items($data: Demo_rpg_dataGetItemsesInput, $typesData: Demo_rpg_dataGetItem_typesesInput) {
  itemses(data: $data) {
    edges {
      cursor
      node {
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
            stat_id { id data { abbreviation code name { en ru zh } } }
            value
          }
          name { en ru zh }
          rarity
          rarity_tag
          type_id { id data { code name { en ru zh } } }
          weight
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
  item_typeses(data: $typesData) {
    edges { node { id data { code description { en ru zh } name { en ru zh } } } }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class ItemsViewModel implements IViewModel {
  public activeRarity: string | null = null;
  public activeTypeId: string | null = null;
  public isFilterSheetOpen = false;
  public marketMax: number | null = null;
  public marketMin: number | null = null;
  public searchQuery = '';
  public sortKey: ItemSortKey = DEFAULT_SORT_KEY;
  private readonly itemCache = new Map<string, ItemItemViewModel>();
  private readonly itemTypeOptionsCache: ItemTypeFilterOption[] = [];
  private readonly loadedItems: ItemNode[] = [];

  constructor(
    public readonly dataSource: ItemsDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<
      this,
      'itemCache' | 'itemTypeOptionsCache' | 'localeService'
    >(this, {
      itemCache: false,
      itemTypeOptionsCache: false,
      localeService: false,
    });
  }

  public setup(): void {
    // Items has no route params yet.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    resetCatalogRequestState(this.dataSource, this.loadedItems, this.itemCache);
    this.itemTypeOptionsCache.length = 0;
  }

  public get items(): readonly ItemItemViewModel[] {
    return this.loadedItems.map((node) => this.getItemViewModel(node));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewStateFromRequest(this.dataSource.request, this.loadedItems);
  }

  public get itemTypeOptions(): readonly ItemTypeFilterOption[] {
    const collator = new Intl.Collator(this.locale);
    return [...this.itemTypeOptionsCache].sort((left, right) =>
      collator.compare(left.label, right.label),
    );
  }

  public get rarityOptions(): readonly ItemRarityFilterOption[] {
    const values = new Set<string>(DEFAULT_RARITY_VALUES);
    for (const item of this.loadedItems) {
      const value = item.data.rarity.trim();
      if (value) values.add(value);
    }

    const collator = new Intl.Collator(this.locale);
    return [...values]
      .map((value) => ({
        label: this.copy.rarityLabel(value),
        value,
      }))
      .sort((left, right) => collator.compare(left.label, right.label));
  }

  public get marketMinInputValue(): string {
    return this.marketMin === null ? '' : String(this.marketMin);
  }

  public get marketMaxInputValue(): string {
    return this.marketMax === null ? '' : String(this.marketMax);
  }

  public get hasActiveFilter(): boolean {
    return (
      this.activeRarity !== null ||
      this.activeTypeId !== null ||
      this.marketMax !== null ||
      this.marketMin !== null ||
      this.searchQuery.trim().length > 0
    );
  }

  public get isMarketRangeValid(): boolean {
    if (this.marketMin === null || this.marketMax === null) return true;
    return this.marketMin <= this.marketMax;
  }

  public get canApplyFilters(): boolean {
    return this.isMarketRangeValid && !this.dataSource.request.isLoading;
  }

  public get payloadPreview(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      typesData: this.currentTypesRequestData,
      locale: this.locale,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
    };
  }

  public get payloadPreviewJson(): string {
    return JSON.stringify(this.payloadPreview, null, 2);
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/items',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/items',
      },
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Items',
          request: ITEMS_QUERY,
        },
      },
      variables: this.currentVariables,
    };
  }

  public get locale(): ItemLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('items', '/items', this.localeService.ui.navigation);
  }

  public get copy(): ItemsPageCopy {
    return getItemsPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public setSearchQuery(value: string): void {
    this.searchQuery = value;
  }

  public setRarity(value: string): void {
    this.activeRarity = value.trim() || null;
  }

  public setTypeId(value: string): void {
    this.activeTypeId = value.trim() || null;
  }

  public setMarketMin(value: string): void {
    this.marketMin = parseMarketValue(value);
  }

  public setMarketMax(value: string): void {
    this.marketMax = parseMarketValue(value);
  }

  public setSortKey(value: string): void {
    this.sortKey = isItemSortKey(value) ? value : DEFAULT_SORT_KEY;
  }

  public openFilterSheet(): void {
    this.isFilterSheetOpen = true;
  }

  public closeFilterSheet(): void {
    this.isFilterSheetOpen = false;
  }

  public async applyFilters(): Promise<void> {
    if (!this.canApplyFilters) return;
    await this.loadInitial();
    this.closeFilterSheet();
  }

  public async resetFilters(): Promise<void> {
    this.activeRarity = null;
    this.activeTypeId = null;
    this.marketMax = null;
    this.marketMin = null;
    this.searchQuery = '';
    this.sortKey = DEFAULT_SORT_KEY;
    await this.loadInitial();
    this.closeFilterSheet();
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    if (!this.catalogState.canLoadMore) return;
    const result = await this.dataSource.request.fetch(this.nextPageRequest);
    if (result.ok) {
      runInAction(() => {
        this.loadedItems.push(...result.value.items);
        this.mergeItemTypeOptions(result.value.itemTypes, result.value.items);
      });
    }
  }

  private async loadInitial(): Promise<void> {
    const result = await this.dataSource.request.fetch(this.currentRequest);
    if (result.ok) {
      runInAction(() => {
        this.mergeItemTypeOptions(result.value.itemTypes, result.value.items);
        replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
      });
    }
  }

  private getItemViewModel(node: ItemNode): ItemItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new ItemItemViewModel(
      node,
      () => this.locale,
      () => this.copy,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get currentRequest(): ItemsRequest {
    return {
      data: this.currentRequestData,
      typesData: this.currentTypesRequestData,
    };
  }

  private get nextPageRequest(): ItemsRequest {
    return {
      data: {
        ...this.currentRequestData,
        after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
      },
    };
  }

  private get currentRequestData(): ItemsRequestData {
    const data: ItemsRequestData = {
      first: ITEMS_PAGE_SIZE,
      orderBy: this.currentOrderBy,
    };
    const where = this.currentWhere;
    if (where) {
      data.where = where;
    }
    return data;
  }

  private get currentTypesRequestData(): ItemTypesRequestData {
    const localizedNamePath = `name.${this.locale}`;
    const orderBy: NonNullable<ItemTypesRequestData['orderBy']> = [
      this.createTypeDataOrderBy(
        localizedNamePath,
        Demo_Rpg_DataSortOrder.Asc,
        Demo_Rpg_DataOrderFieldType.Text,
      ),
    ];
    if (localizedNamePath !== 'name.en') {
      orderBy.push(
        this.createTypeDataOrderBy(
          'name.en',
          Demo_Rpg_DataSortOrder.Asc,
          Demo_Rpg_DataOrderFieldType.Text,
        ),
      );
    }

    return {
      first: ITEM_TYPES_PAGE_SIZE,
      orderBy,
    };
  }

  private get currentWhere(): ItemsRequestData['where'] | undefined {
    const clauses: NonNullable<ItemsRequestData['where']>[] = [];
    const query = this.searchQuery.trim();

    if (query) {
      clauses.push({
        OR: [
          this.createStringContainsWhere(['name', this.locale], query),
          this.createStringContainsWhere(['name', 'en'], query),
        ],
      });
    }
    if (this.activeRarity) {
      clauses.push({
        data: {
          equals: this.activeRarity,
          path: ['rarity'],
        },
      });
    }
    if (this.activeTypeId) {
      clauses.push({
        data: {
          equals: this.activeTypeId,
          path: ['type_id'],
        },
      });
    }
    if (this.marketMin !== null) {
      clauses.push({
        data: {
          gte: this.marketMin,
          path: ['market_value'],
        },
      });
    }
    if (this.marketMax !== null) {
      clauses.push({
        data: {
          lte: this.marketMax,
          path: ['market_value'],
        },
      });
    }

    if (clauses.length === 0) return undefined;
    if (clauses.length === 1) return clauses[0];
    return { AND: clauses };
  }

  private get currentOrderBy(): NonNullable<ItemsRequestData['orderBy']> {
    switch (this.sortKey) {
      case 'market-asc':
        return [
          this.createItemDataOrderBy(
            'market_value',
            Demo_Rpg_DataSortOrder.Asc,
            Demo_Rpg_DataOrderFieldType.Float,
          ),
          this.createItemDataOrderBy(
            'name.en',
            Demo_Rpg_DataSortOrder.Asc,
            Demo_Rpg_DataOrderFieldType.Text,
          ),
        ];
      case 'market-desc':
        return [
          this.createItemDataOrderBy(
            'market_value',
            Demo_Rpg_DataSortOrder.Desc,
            Demo_Rpg_DataOrderFieldType.Float,
          ),
          this.createItemDataOrderBy(
            'name.en',
            Demo_Rpg_DataSortOrder.Asc,
            Demo_Rpg_DataOrderFieldType.Text,
          ),
        ];
      case 'name-asc':
        return [
          this.createItemDataOrderBy(
            'name.en',
            Demo_Rpg_DataSortOrder.Asc,
            Demo_Rpg_DataOrderFieldType.Text,
          ),
          this.createItemDataOrderBy(
            'market_value',
            Demo_Rpg_DataSortOrder.Desc,
            Demo_Rpg_DataOrderFieldType.Float,
          ),
        ];
      case 'published-desc':
        return [
          {
            direction: Demo_Rpg_DataSortOrder.Desc,
            field: Demo_Rpg_DataGetItemsesOrderByField.PublishedAt,
          },
        ];
      case 'rarity-value':
      default:
        return [
          this.createItemDataOrderBy(
            'rarity',
            Demo_Rpg_DataSortOrder.Desc,
            Demo_Rpg_DataOrderFieldType.Text,
          ),
          this.createItemDataOrderBy(
            'market_value',
            Demo_Rpg_DataSortOrder.Desc,
            Demo_Rpg_DataOrderFieldType.Float,
          ),
          this.createItemDataOrderBy(
            'name.en',
            Demo_Rpg_DataSortOrder.Asc,
            Demo_Rpg_DataOrderFieldType.Text,
          ),
        ];
    }
  }

  private createItemDataOrderBy(
    path: string,
    direction: Demo_Rpg_DataSortOrder,
    type: Demo_Rpg_DataOrderFieldType,
  ): NonNullable<ItemsRequestData['orderBy']>[number] {
    return {
      direction,
      field: Demo_Rpg_DataGetItemsesOrderByField.Data,
      path,
      type,
    };
  }

  private createTypeDataOrderBy(
    path: string,
    direction: Demo_Rpg_DataSortOrder,
    type: Demo_Rpg_DataOrderFieldType,
  ): NonNullable<ItemTypesRequestData['orderBy']>[number] {
    return {
      direction,
      field: Demo_Rpg_DataGetItem_TypesesOrderByField.Data,
      path,
      type,
    };
  }

  private createStringContainsWhere(
    path: readonly string[],
    query: string,
  ): NonNullable<ItemsRequestData['where']> {
    return {
      data: {
        mode: Demo_Rpg_DataFilterJsonMode.Insensitive,
        path,
        string_contains: query,
      },
    };
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      ...this.payloadPreview,
      filters: {
        activeRarity: this.activeRarity,
        activeTypeId: this.activeTypeId,
        activeTypeLabel: this.activeTypeLabel,
        marketMax: this.marketMax,
        marketMin: this.marketMin,
        searchQuery: this.searchQuery.trim(),
      },
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        icon: getItemIconMetadata(node.data.icon),
        id: node.id,
        marketValue: node.data.market_value,
        modifiers: node.data.modifiers.map((modifier) => ({
          stat: this.localized(modifier.stat_id.data.name) || modifier.stat_id.data.code,
          value: modifier.value,
        })),
        name: this.localized(node.data.name),
        rarity: node.data.rarity,
        rarityTag: node.data.rarity_tag,
        type: this.localized(node.data.type_id.data.name),
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
          { path: `items.${node.id}.data.name`, value: node.data.name },
          { path: `items.${node.id}.data.description`, value: node.data.description },
          { path: `items.${node.id}.data.type_id.data.name`, value: node.data.type_id.data.name },
          ...node.data.modifiers.map((modifier) => ({
            path: `items.${node.id}.data.modifiers.${modifier.stat_id.id}.data.name`,
            value: modifier.stat_id.data.name,
          })),
        ],
        'en',
      ),
    );
  }

  private get activeTypeLabel(): string | null {
    if (!this.activeTypeId) return null;
    const option = this.itemTypeOptionsCache.find((candidate) => candidate.id === this.activeTypeId);
    return option?.label ?? this.activeTypeId;
  }

  private mergeItemTypeOptions(
    itemTypeNodes: readonly ItemTypeNode[],
    itemNodes: readonly ItemNode[],
  ): void {
    const values = new Map(this.itemTypeOptionsCache.map((option) => [option.id, option]));
    for (const typeNode of itemTypeNodes) {
      values.set(typeNode.id, this.createItemTypeOption(typeNode));
    }
    for (const itemNode of itemNodes) {
      values.set(itemNode.data.type_id.id, this.createItemTypeOption(itemNode.data.type_id));
    }
    this.itemTypeOptionsCache.splice(0, this.itemTypeOptionsCache.length, ...values.values());
  }

  private createItemTypeOption(node: ItemTypeNode | ItemNode['data']['type_id']): ItemTypeFilterOption {
    return {
      code: node.data.code,
      id: node.id,
      label: this.localized(node.data.name) || node.data.code || node.id,
    };
  }

  private localized(value: Record<ItemLocale, string>): string {
    return value[this.locale] || value.en;
  }
}

function parseMarketValue(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

function isItemSortKey(value: string): value is ItemSortKey {
  return ITEM_SORT_KEYS.includes(value as ItemSortKey);
}

container.register(
  ItemsViewModel,
  () => new ItemsViewModel(container.get(ItemsDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
