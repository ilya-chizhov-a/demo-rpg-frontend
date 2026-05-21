import {
  Demo_Rpg_DataGetQuestsesOrderByField,
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
  QuestsDataSource,
  type QuestLocationOptionNode,
  type QuestNode,
  type QuestNpcsRequestData,
  type QuestNpcOptionNode,
  type QuestsRequestData,
  type QuestLocationsRequestData,
} from '../api/QuestsDataSource';
import { QuestItemViewModel } from './QuestItemViewModel';
import { getQuestsPageCopy, type QuestLocale, type QuestOption, type QuestsPageCopy } from './questUiCopy';

const QUESTS_PAGE_SIZE = 24;
const QUEST_FILTER_OPTIONS_PAGE_SIZE = 50;

// Keep this display string in sync with api/Quests.graphql until the widget can import raw GraphQL.
const QUESTS_QUERY = `query Quests($data: Demo_rpg_dataGetQuestsesInput) {
  questses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          description { en ru zh }
          giver_npc_id { id data { display_label_en name { en ru zh } title { en ru zh } } }
          is_repeatable
          kind
          level_required
          name { en ru zh }
          step_count
          steps {
            location_id { id data { kind name { en ru zh } } }
            npc_id { id data { display_label_en name { en ru zh } title { en ru zh } } }
            step_number
            xp
          }
          total_loot_xp
          total_xp
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class QuestsViewModel implements IViewModel {
  public activeLocationId: string | null = null;
  public activeNpcId: string | null = null;
  public isFilterSheetOpen = false;
  public levelMax: number | null = null;
  public levelMin: number | null = null;
  public repeatableOnly = false;
  private readonly itemCache = new Map<string, QuestItemViewModel>();
  private readonly loadedItems: QuestNode[] = [];

  constructor(
    public readonly dataSource: QuestsDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'itemCache' | 'localeService'>(this, {
      itemCache: false,
      localeService: false,
    });
  }

  public setup(): void {
    // Quests has no route params yet.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    resetCatalogRequestState(this.dataSource, this.loadedItems, this.itemCache);
  }

  public get items(): readonly QuestItemViewModel[] {
    return this.loadedItems.map((node) => this.getItemViewModel(node));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewStateFromRequest(this.dataSource.request, this.loadedItems);
  }

  public get npcOptions(): readonly QuestOption[] {
    const values = new Map<string, QuestOption>();
    for (const npc of this.dataSource.request.data?.npcs ?? []) {
      values.set(npc.id, this.createNpcOption(npc));
    }
    for (const quest of this.loadedItems) {
      const npc = quest.data.giver_npc_id;
      values.set(npc.id, this.createNpcOption(npc));
    }
    return this.sortOptions([...values.values()]);
  }

  public get locationOptions(): readonly QuestOption[] {
    const values = new Map<string, QuestOption>();
    for (const location of this.dataSource.request.data?.locations ?? []) {
      values.set(location.id, this.createLocationOption(location));
    }
    for (const quest of this.loadedItems) {
      for (const step of quest.data.steps) {
        const location = step.location_id;
        values.set(location.id, this.createLocationOption(location));
      }
    }
    return this.sortOptions([...values.values()]);
  }

  public get levelMinInputValue(): string {
    return this.levelMin === null ? '' : String(this.levelMin);
  }

  public get levelMaxInputValue(): string {
    return this.levelMax === null ? '' : String(this.levelMax);
  }

  public get hasActiveFilter(): boolean {
    return (
      this.activeLocationId !== null ||
      this.activeNpcId !== null ||
      this.levelMax !== null ||
      this.levelMin !== null ||
      this.repeatableOnly
    );
  }

  public get isLevelRangeValid(): boolean {
    if (this.levelMin === null || this.levelMax === null) return true;
    return this.levelMin <= this.levelMax;
  }

  public get canApplyFilters(): boolean {
    return this.isLevelRangeValid && !this.dataSource.request.isLoading;
  }

  public get payloadPreview(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      locale: this.locale,
      locationsData: this.filterOptionsRequestData,
      npcsData: this.filterOptionsRequestData,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
    };
  }

  public get payloadPreviewJson(): string {
    return JSON.stringify(this.payloadPreview, null, 2);
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/quests',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/quests',
      },
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Quests',
          request: QUESTS_QUERY,
        },
      },
      variables: this.currentVariables,
    };
  }

  public get locale(): QuestLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('quests', '/quests', this.localeService.ui.navigation);
  }

  public get copy(): QuestsPageCopy {
    return getQuestsPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public setNpcId(value: string): void {
    this.activeNpcId = value.trim() || null;
  }

  public setLocationId(value: string): void {
    this.activeLocationId = value.trim() || null;
  }

  public setLevelMin(value: string): void {
    this.levelMin = parseLevelValue(value);
  }

  public setLevelMax(value: string): void {
    this.levelMax = parseLevelValue(value);
  }

  public setRepeatableOnly(value: boolean): void {
    this.repeatableOnly = value;
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
    this.activeLocationId = null;
    this.activeNpcId = null;
    this.levelMax = null;
    this.levelMin = null;
    this.repeatableOnly = false;
    await this.loadInitial();
    this.closeFilterSheet();
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    if (!this.catalogState.canLoadMore) return;
    const result = await this.dataSource.request.fetch(
      this.nextPageRequestData,
      this.filterOptionsRequestData,
      this.filterOptionsRequestData,
    );
    if (result.ok) {
      runInAction(() => {
        this.loadedItems.push(...result.value.items);
      });
    }
  }

  private async loadInitial(): Promise<void> {
    const result = await this.dataSource.request.fetch(
      this.currentRequestData,
      this.filterOptionsRequestData,
      this.filterOptionsRequestData,
    );
    if (result.ok) {
      runInAction(() => {
        replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
      });
    }
  }

  private getItemViewModel(node: QuestNode): QuestItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new QuestItemViewModel(
      node,
      () => this.locale,
      () => this.copy,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      ...this.payloadPreview,
      filters: {
        activeLocationId: this.activeLocationId,
        activeNpcId: this.activeNpcId,
        levelMax: this.levelMax,
        levelMin: this.levelMin,
        repeatableOnly: this.repeatableOnly,
      },
    };
  }

  private get currentRequestData(): QuestsRequestData {
    const data: QuestsRequestData = {
      first: QUESTS_PAGE_SIZE,
      orderBy: this.currentOrderBy,
    };
    const where = this.currentWhere;
    if (where) {
      data.where = where;
    }
    return data;
  }

  private get nextPageRequestData(): QuestsRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get filterOptionsRequestData(): QuestLocationsRequestData & QuestNpcsRequestData {
    return {
      first: QUEST_FILTER_OPTIONS_PAGE_SIZE,
    };
  }

  private get currentWhere(): QuestsRequestData['where'] | undefined {
    const clauses: NonNullable<QuestsRequestData['where']>[] = [];

    if (this.levelMin !== null) {
      clauses.push({
        data: {
          gte: this.levelMin,
          path: ['level_required'],
        },
      });
    }
    if (this.levelMax !== null) {
      clauses.push({
        data: {
          lte: this.levelMax,
          path: ['level_required'],
        },
      });
    }
    if (this.repeatableOnly) {
      clauses.push({
        data: {
          equals: true,
          path: ['is_repeatable'],
        },
      });
    }
    if (this.activeNpcId) {
      clauses.push({
        data: {
          equals: this.activeNpcId,
          path: ['giver_npc_id'],
        },
      });
    }
    if (this.activeLocationId) {
      clauses.push({
        data: {
          equals: this.activeLocationId,
          path: ['steps', '0', 'location_id'],
        },
      });
    }

    if (clauses.length === 0) return undefined;
    if (clauses.length === 1) return clauses[0];
    return { AND: clauses };
  }

  private get currentOrderBy(): NonNullable<QuestsRequestData['orderBy']> {
    return [
      this.createDataOrderBy(
        'level_required',
        Demo_Rpg_DataSortOrder.Asc,
        Demo_Rpg_DataOrderFieldType.Float,
      ),
      this.createDataOrderBy(
        `name.${this.locale}`,
        Demo_Rpg_DataSortOrder.Asc,
        Demo_Rpg_DataOrderFieldType.Text,
      ),
    ];
  }

  private createDataOrderBy(
    path: string,
    direction: Demo_Rpg_DataSortOrder,
    type: Demo_Rpg_DataOrderFieldType,
  ): NonNullable<QuestsRequestData['orderBy']>[number] {
    return {
      direction,
      field: Demo_Rpg_DataGetQuestsesOrderByField.Data,
      path,
      type,
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        giver: {
          id: node.data.giver_npc_id.id,
          name: node.data.giver_npc_id.data.name[this.locale],
        },
        id: node.id,
        isRepeatable: node.data.is_repeatable,
        levelRequired: node.data.level_required,
        name: node.data.name[this.locale],
        primaryLocation: node.data.steps[0]
          ? {
              id: node.data.steps[0].location_id.id,
              name: node.data.steps[0].location_id.data.name[this.locale],
            }
          : null,
        stepCount: node.data.step_count,
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
          { path: `quests.${node.id}.data.name`, value: node.data.name },
          { path: `quests.${node.id}.data.description`, value: node.data.description },
          {
            path: `quests.${node.id}.data.giver_npc_id.data.name`,
            value: node.data.giver_npc_id.data.name,
          },
          ...node.data.steps.map((step) => ({
            path: `quests.${node.id}.data.steps.${step.step_number}.location_id.data.name`,
            value: step.location_id.data.name,
          })),
        ],
        'en',
      ),
    );
  }

  private createNpcOption(node: QuestNpcOptionNode | QuestNode['data']['giver_npc_id']): QuestOption {
    const title = this.localized(node.data.title);
    const name = this.localized(node.data.name) || node.data.display_label_en || node.id;
    const label = title ? `${title} ${name}` : name;
    return {
      displayLabel: label,
      id: node.id,
      label,
    };
  }

  private createLocationOption(
    node: QuestLocationOptionNode | QuestNode['data']['steps'][number]['location_id'],
  ): QuestOption {
    const label = this.localized(node.data.name) || node.id;
    const meta = this.copy.kindLabel(node.data.kind);
    return {
      displayLabel: `${label} - ${meta}`,
      id: node.id,
      label,
      meta,
    };
  }

  private sortOptions(options: readonly QuestOption[]): readonly QuestOption[] {
    const collator = new Intl.Collator(this.locale);
    return [...options].sort((left, right) => collator.compare(left.label, right.label));
  }

  private localized(value: Record<QuestLocale, string>): string {
    return value[this.locale] || value.en;
  }
}

function parseLevelValue(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}

container.register(
  QuestsViewModel,
  () => new QuestsViewModel(container.get(QuestsDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
