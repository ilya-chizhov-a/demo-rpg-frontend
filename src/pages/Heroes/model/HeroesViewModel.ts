import { makeAutoObservable } from 'mobx';

import {
  Demo_Rpg_DataFilterJsonMode,
  Demo_Rpg_DataGetHeroesesOrderByField,
  Demo_Rpg_DataOrderFieldType,
  Demo_Rpg_DataSortOrder,
} from 'src/__generated__/graphql-request';
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
  HeroesDataSource,
  type HeroClassNode,
  type HeroLinkedClassNode,
  type HeroNode,
  type HeroesRequest,
  type HeroesRequestData,
} from '../api/HeroesDataSource';
import { getHeroPortraitMetadata } from './heroImages';
import { HeroItemViewModel, type HeroLocale } from './HeroItemViewModel';
import {
  getHeroesPageCopy,
  type HeroesPageCopy,
  type HeroSortKey,
} from './heroUiCopy';

const HEROES_PAGE_SIZE = 24;
const HEROES_CLASS_PAGE_SIZE = 100;
const DEFAULT_SORT_KEY: HeroSortKey = 'published-desc';

export interface HeroesRouteState {
  readonly activeClassId: string | null;
  readonly levelMax: number | null;
  readonly levelMin: number | null;
  readonly searchQuery: string;
  readonly sortKey: HeroSortKey;
  readonly veteranOnly: boolean;
}

export interface HeroClassButtonDescriptor {
  readonly classId: string | null;
  readonly key: string;
  readonly label: string;
  readonly selected: boolean;
  readonly subtitle?: string;
}

export interface HeroSortButtonDescriptor {
  readonly key: HeroSortKey;
  readonly label: string;
  readonly selected: boolean;
}

interface HeroClassOption {
  readonly id: string;
  readonly name: Record<HeroLocale, string>;
  readonly primaryStat: string;
}

// Keep this display string in sync with api/Heroes.graphql until the widget can import raw GraphQL.
const HEROES_QUERY = `query Heroes($data: Demo_rpg_dataGetHeroesesInput, $classesData: Demo_rpg_dataGetClassesesInput) {
  heroeses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          display_name_en
          is_veteran
          level
          name { en ru zh }
          class_id { id data { name { en ru zh } primary_stat } }
          portrait { fileId fileName hash height mimeType url width }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
  classeses(data: $classesData) {
    edges { node { id data { name { en ru zh } primary_stat } } }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class HeroesViewModel implements IViewModel {
  public activeClassId: string | null = null;
  public levelMax: number | null = null;
  public levelMin: number | null = null;
  public searchQuery = '';
  public sortKey: HeroSortKey = DEFAULT_SORT_KEY;
  public veteranOnly = false;
  private readonly classOptions: HeroClassOption[] = [];
  private readonly itemCache = new Map<string, HeroItemViewModel>();
  private readonly loadedItems: HeroNode[] = [];

  constructor(
    public readonly dataSource: HeroesDataSource,
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

  public setup(routeState?: unknown): void {
    this.applyRouteState(this.normalizeRouteState(routeState));
  }

  public async mount(routeState?: unknown): Promise<void> {
    this.applyRouteState(this.normalizeRouteState(routeState));
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    this.dataSource.reset();
    this.classOptions.length = 0;
    resetCatalogState(this.loadedItems, this.itemCache);
  }

  public get items(): readonly HeroItemViewModel[] {
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

  public get classButtons(): readonly HeroClassButtonDescriptor[] {
    return [
      {
        classId: null,
        key: 'all',
        label: this.copy.allClassesButton,
        selected: this.activeClassId === null,
      },
      ...this.sortedClassOptions.map((option) => ({
        classId: option.id,
        key: option.id,
        label: this.localized(option.name) || option.id,
        selected: this.activeClassId === option.id,
        subtitle: option.primaryStat,
      })),
    ];
  }

  public get sortButtons(): readonly HeroSortButtonDescriptor[] {
    return this.copy.sortOptions.map((option) => ({
      ...option,
      selected: option.key === this.sortKey,
    }));
  }

  public get levelMinInputValue(): string {
    return this.levelMin === null ? '' : String(this.levelMin);
  }

  public get levelMaxInputValue(): string {
    return this.levelMax === null ? '' : String(this.levelMax);
  }

  public get hasActiveFilter(): boolean {
    return (
      this.activeClassId !== null ||
      this.levelMin !== null ||
      this.levelMax !== null ||
      this.searchQuery.trim().length > 0 ||
      this.veteranOnly
    );
  }

  public get explainer(): ExplainerDescriptor {
    return {
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Heroes',
          request: HEROES_QUERY,
        },
      },
      variables: this.currentVariables,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      deepLinks: {
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/heroes',
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/heroes',
      },
      localeFallbacks: this.localeFallbacks,
      footerNote: this.copy.explainerFooterNote,
    };
  }

  public get locale(): HeroLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('heroes', '/heroes', this.localeService.ui.navigation);
  }

  public get copy(): HeroesPageCopy {
    return getHeroesPageCopy(this.locale);
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    if (!this.catalogState.canLoadMore) return;
    const result = await this.dataSource.request.fetch(this.nextPageRequest);
    if (result.ok) {
      this.loadedItems.push(...result.value.items);
      this.mergeClassOptions(result.value.classes, result.value.items);
    }
  }

  private async loadInitial(): Promise<void> {
    const result = await this.dataSource.request.fetch(this.currentRequest);
    if (result.ok) {
      replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
      this.mergeClassOptions(result.value.classes, result.value.items);
    }
  }

  private applyRouteState(routeState?: HeroesRouteState): void {
    this.activeClassId = routeState?.activeClassId ?? null;
    this.levelMax = routeState?.levelMax ?? null;
    this.levelMin = routeState?.levelMin ?? null;
    this.searchQuery = routeState?.searchQuery ?? '';
    this.sortKey = routeState?.sortKey ?? DEFAULT_SORT_KEY;
    this.veteranOnly = routeState?.veteranOnly ?? false;
  }

  private normalizeRouteState(routeState: unknown): HeroesRouteState | undefined {
    if (!routeState || typeof routeState !== 'object') return undefined;
    return routeState as HeroesRouteState;
  }

  private getItemViewModel(node: HeroNode): HeroItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new HeroItemViewModel(
      node,
      () => this.locale,
      () => this.copy,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get currentRequest(): HeroesRequest {
    return {
      classesData: {
        first: HEROES_CLASS_PAGE_SIZE,
      },
      data: this.currentRequestData,
    };
  }

  private get nextPageRequest(): HeroesRequest {
    return {
      ...this.currentRequest,
      data: {
        ...this.currentRequestData,
        after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
      },
    };
  }

  private get currentRequestData(): HeroesRequestData {
    const data: HeroesRequestData = {
      first: HEROES_PAGE_SIZE,
      orderBy: this.currentOrderBy,
    };
    const where = this.currentWhere;
    if (where) {
      data.where = where;
    }
    return data;
  }

  private get currentWhere(): HeroesRequestData['where'] | undefined {
    const clauses: NonNullable<HeroesRequestData['where']>[] = [];
    if (this.activeClassId) {
      clauses.push({
        data: {
          equals: this.activeClassId,
          path: ['class_id'],
        },
      });
    }
    if (this.veteranOnly) {
      clauses.push({
        data: {
          equals: true,
          path: ['is_veteran'],
        },
      });
    }
    if (this.levelMin !== null) {
      clauses.push({
        data: {
          gte: this.levelMin,
          path: ['level'],
        },
      });
    }
    if (this.levelMax !== null) {
      clauses.push({
        data: {
          lte: this.levelMax,
          path: ['level'],
        },
      });
    }
    const query = this.searchQuery.trim();
    if (query) {
      clauses.push({
        OR: [
          this.createStringContainsWhere(['display_name_en'], query),
          this.createStringContainsWhere(['name', this.locale], query),
          this.createStringContainsWhere(['name', 'en'], query),
          this.createStringContainsWhere(['epithet', this.locale], query),
        ],
      });
    }
    if (clauses.length === 0) return undefined;
    if (clauses.length === 1) return clauses[0];
    return { AND: clauses };
  }

  private get currentOrderBy(): NonNullable<HeroesRequestData['orderBy']> {
    switch (this.sortKey) {
      case 'level-asc':
        return [this.createDataOrderBy('level', Demo_Rpg_DataSortOrder.Asc, Demo_Rpg_DataOrderFieldType.Float)];
      case 'level-desc':
        return [this.createDataOrderBy('level', Demo_Rpg_DataSortOrder.Desc, Demo_Rpg_DataOrderFieldType.Float)];
      case 'name-asc':
        return [
          this.createDataOrderBy(
            'display_name_en',
            Demo_Rpg_DataSortOrder.Asc,
            Demo_Rpg_DataOrderFieldType.Text,
          ),
        ];
      case 'published-desc':
      default:
        return [
          {
            direction: Demo_Rpg_DataSortOrder.Desc,
            field: Demo_Rpg_DataGetHeroesesOrderByField.PublishedAt,
          },
        ];
    }
  }

  private createDataOrderBy(
    path: string,
    direction: Demo_Rpg_DataSortOrder,
    type: Demo_Rpg_DataOrderFieldType,
  ): NonNullable<HeroesRequestData['orderBy']>[number] {
    return {
      direction,
      field: Demo_Rpg_DataGetHeroesesOrderByField.Data,
      path,
      type,
    };
  }

  private createStringContainsWhere(
    path: readonly string[],
    query: string,
  ): NonNullable<HeroesRequestData['where']> {
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
      data: this.currentRequestData,
      classesData: this.currentRequest.classesData,
      locale: this.locale,
      filters: {
        activeClassId: this.activeClassId,
        activeClassLabel: this.activeClassLabel,
        levelMax: this.levelMax,
        levelMin: this.levelMin,
        searchQuery: this.searchQuery.trim(),
        veteranOnly: this.veteranOnly,
      },
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
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
        classId: node.data.class_id.id,
        classLabel: this.localized(node.data.class_id.data.name),
        displayName: node.data.display_name_en,
        level: node.data.level,
        portrait: getHeroPortraitMetadata(node.data.portrait),
      })),
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) => {
      const fallbacks: {
        readonly path: string;
        readonly requestedLocale: HeroLocale;
        readonly renderedLocale: HeroLocale;
      }[] = [];
      if (!node.data.name[this.locale]) {
        fallbacks.push({
          path: `heroes.${node.id}.data.name`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      if (!node.data.class_id.data.name[this.locale]) {
        fallbacks.push({
          path: `heroes.${node.id}.data.class_id.data.name`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      return fallbacks;
    });
  }

  private get sortedClassOptions(): readonly HeroClassOption[] {
    const collator = new Intl.Collator(this.locale);
    return [...this.classOptions].sort((left, right) =>
      collator.compare(this.localized(left.name) || left.id, this.localized(right.name) || right.id),
    );
  }

  private get activeClassLabel(): string | null {
    if (!this.activeClassId) return null;
    const option = this.classOptions.find((candidate) => candidate.id === this.activeClassId);
    if (!option) return this.activeClassId;
    return this.localized(option.name) || option.id;
  }

  private mergeClassOptions(
    classNodes: readonly HeroClassNode[],
    heroNodes: readonly HeroNode[],
  ): void {
    const values = new Map(this.classOptions.map((option) => [option.id, option]));
    for (const classNode of classNodes) {
      values.set(classNode.id, this.createClassOption(classNode));
    }
    for (const heroNode of heroNodes) {
      values.set(heroNode.data.class_id.id, this.createClassOption(heroNode.data.class_id));
    }
    this.classOptions.splice(0, this.classOptions.length, ...values.values());
  }

  private createClassOption(node: HeroClassNode | HeroLinkedClassNode): HeroClassOption {
    return {
      id: node.id,
      name: node.data.name,
      primaryStat: node.data.primary_stat,
    };
  }

  private localized(value: Record<HeroLocale, string>): string {
    return value[this.locale] || value.en;
  }
}

container.register(
  HeroesViewModel,
  () => new HeroesViewModel(container.get(HeroesDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
