import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  createDetailViewStateFromRequest,
  createLocaleFallbacks,
  makeAutoBoundObservable,
  type DetailViewState,
} from 'src/shared/lib';
import { getLocaleNativeLabel, LocaleService, type UiCopy } from 'src/shared/model';
import type { DetailFactPanelItem } from 'src/shared/ui';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  QuestDetailDataSource,
  type QuestDetailNode,
  type QuestDetailStepNode,
} from '../api/QuestDetailDataSource';
import { getQuestStepImageMetadata } from './questImages';
import {
  getQuestsPageCopy,
  type QuestFormulaDescriptor,
  type QuestLocale,
  type QuestsPageCopy,
} from './questUiCopy';
import { QuestStepViewModel } from './QuestStepViewModel';

type LocalizedQuestText = Record<QuestLocale, string>;

// Keep this explainer copy aligned with src/pages/Quests/api/QuestDetail.graphql.
const QUEST_DETAIL_QUERY = `query QuestDetail($id: String!) {
  quests(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      description { en ru zh }
      giver_npc_id { id data { display_label_en name { en ru zh } role title { en ru zh } } }
      is_repeatable
      kind
      level_required
      map { extension fileId fileName hash height mimeType size status url width }
      name { en ru zh }
      step_count
      steps {
        description { en ru zh }
        image { extension fileId fileName hash height mimeType size status url width }
        location_id { id data { kind name { en ru zh } } }
        npc_id { id data { display_label_en name { en ru zh } role title { en ru zh } } }
        rewards {
          bonus_xp
          item_id {
            id
            data {
              base_value
              market_value
              name { en ru zh }
              rarity
              rarity_tag
              type_id { id data { code name { en ru zh } } }
            }
          }
          quantity
        }
        step_number
        xp
      }
      total_loot_xp
      total_xp
    }
  }
}`;

const QUEST_DETAIL_ATTRIBUTED_FIELDS = [
  'name',
  'description',
  'giver_npc_id',
  'kind',
  'level_required',
  'is_repeatable',
  'steps',
  'steps.image',
  'steps.rewards',
  'step_count',
  'total_xp',
  'total_loot_xp',
] as const;

export class QuestDetailViewModel implements IViewModel {
  private readonly cloudQuestsTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/quests';
  public readonly backHref = '/quests';
  public id = '';
  private readonly stepCache = new Map<string, QuestStepViewModel>();

  constructor(
    public readonly dataSource: QuestDetailDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'localeService' | 'stepCache'>(this, {
      localeService: false,
      stepCache: false,
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
    this.stepCache.clear();
  }

  public get item(): QuestDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return this.localized(this.item?.data.name) || this.id || this.unknownValue;
  }

  public get description(): string {
    return this.localized(this.item?.data.description) || this.copy.noDescription;
  }

  public get giverTitle(): string {
    if (!this.item) return this.unknownValue;
    return this.getNpcLabel(this.item.data.giver_npc_id);
  }

  public get giverHref(): string {
    return `/npcs/${this.item?.data.giver_npc_id.id ?? ''}`;
  }

  public get primaryLocationTitle(): string {
    const location = this.primaryStep?.location_id;
    if (!location) return this.copy.noLocationLabel;
    return this.localized(location.data.name) || location.id;
  }

  public get primaryLocationHref(): string {
    return `/locations/${this.primaryStep?.location_id.id ?? ''}`;
  }

  public get canOpenPrimaryLocation(): boolean {
    return Boolean(this.primaryStep?.location_id.id);
  }

  public get kindLabel(): string {
    return this.item ? this.copy.kindLabel(this.item.data.kind) : this.unknownValue;
  }

  public get levelLabel(): string {
    return this.item ? this.formatNumber(this.item.data.level_required) : this.unknownValue;
  }

  public get repeatableLabel(): string {
    if (!this.item) return this.unknownValue;
    return this.item.data.is_repeatable ? this.copy.repeatableYesLabel : this.copy.repeatableNoLabel;
  }

  public get stepCountLabel(): string {
    return this.item ? this.formatNumber(this.item.data.step_count) : this.unknownValue;
  }

  public get totalXpLabel(): string {
    return this.item ? this.formatNumber(this.item.data.total_xp) : this.unknownValue;
  }

  public get totalLootXpLabel(): string {
    return this.item ? this.formatNumber(this.item.data.total_loot_xp) : this.unknownValue;
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

  public get formulaItems(): readonly QuestFormulaDescriptor[] {
    return [
      {
        label: this.copy.stepCountLabel,
        source: this.copy.detail.formulaSourceStepCount,
        value: this.stepCountLabel,
      },
      {
        label: this.copy.detail.totalXpLabel,
        source: this.copy.detail.formulaSourceTotalXp,
        value: this.totalXpLabel,
      },
      {
        label: this.copy.detail.totalLootXpLabel,
        source: this.copy.detail.formulaSourceTotalLootXp,
        value: this.totalLootXpLabel,
      },
    ];
  }

  public get factItems(): readonly DetailFactPanelItem[] {
    return [
      { label: this.copy.detail.fieldGiver, value: this.giverTitle },
      { label: this.copy.detail.fieldPrimaryLocation, value: this.primaryLocationTitle },
      { label: this.copy.detail.fieldKind, value: this.kindLabel },
      { label: this.copy.detail.fieldRepeatable, value: this.repeatableLabel },
      { label: this.copy.detail.fieldLocale, value: this.localeLabel },
      { label: this.copy.detail.fieldPublished, value: this.publishedLabel },
      { label: this.copy.detail.fieldVersion, value: this.versionLabel },
    ];
  }

  public get steps(): readonly QuestStepViewModel[] {
    return this.sortedSteps.map((step, index) => this.getStepViewModel(step, index));
  }

  public get hasSteps(): boolean {
    return this.steps.length > 0;
  }

  public get viewState(): DetailViewState {
    return createDetailViewStateFromRequest(this.dataSource.request, {
      hasId: Boolean(this.id),
      hasItem: Boolean(this.item),
    });
  }

  public get showLoading(): boolean {
    return this.viewState.showLoading;
  }

  public get showError(): boolean {
    return this.viewState.showError;
  }

  public get showNotFound(): boolean {
    return this.viewState.showNotFound;
  }

  public get showDetail(): boolean {
    return this.viewState.showDetail;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems(
      'quests',
      `/quests/${this.id || ''}`,
      this.localeService.ui.navigation,
    );
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudRow: this.cloudRowHref,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/quests',
        cloudTable: this.cloudQuestsTableHref,
      },
      fieldAttribution: QUEST_DETAIL_ATTRIBUTED_FIELDS.map((field) => ({
        owningSubgraph: 'data',
        path: `quests.data.${field}`,
      })),
      footerNote: this.copy.detail.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.detail.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'QuestDetail',
          request: QUEST_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
        locale: this.locale,
      },
    };
  }

  public get locale(): QuestLocale {
    return this.localeService.locale;
  }

  public get copy(): QuestsPageCopy {
    return getQuestsPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async retry(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    if (!this.id) return;
    this.stepCache.clear();
    await this.dataSource.request.fetch(this.id);
  }

  private get sortedSteps(): readonly QuestDetailStepNode[] {
    return [...(this.item?.data.steps ?? [])].sort(
      (left, right) => left.step_number - right.step_number,
    );
  }

  private get primaryStep(): QuestDetailStepNode | null {
    return this.sortedSteps[0] ?? null;
  }

  private getStepViewModel(step: QuestDetailStepNode, index: number): QuestStepViewModel {
    const key = `${step.step_number}-${index}`;
    const cached = this.stepCache.get(key);
    if (cached) return cached;

    const item = new QuestStepViewModel(
      step,
      index,
      () => this.locale,
      () => this.copy.detail,
    );
    this.stepCache.set(key, item);
    return item;
  }

  private get cloudRowHref(): string {
    return `${this.cloudQuestsTableHref}/${this.item?.id ?? this.id}`;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      formulas: {
        stepCount: this.item.data.step_count,
        totalLootXp: this.item.data.total_loot_xp,
        totalXp: this.item.data.total_xp,
      },
      giver: {
        id: this.item.data.giver_npc_id.id,
        name: this.item.data.giver_npc_id.data.name,
      },
      id: this.item.id,
      map: getQuestStepImageMetadata(this.item.data.map),
      name: this.item.data.name,
      steps: this.sortedSteps.slice(0, 4).map((step) => ({
        description: step.description,
        image: getQuestStepImageMetadata(step.image),
        location: {
          id: step.location_id.id,
          name: step.location_id.data.name,
        },
        rewards: step.rewards.slice(0, 4).map((reward) => ({
          bonusXp: reward.bonus_xp,
          item: {
            id: reward.item_id.id,
            name: reward.item_id.data.name,
            rarity: reward.item_id.data.rarity,
          },
          quantity: reward.quantity,
        })),
        stepNumber: step.step_number,
        xp: step.xp,
      })),
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    const fallbacks = createLocaleFallbacks(
      this.locale,
      [
        { path: `quests.${this.item.id}.data.name`, value: this.item.data.name },
        { path: `quests.${this.item.id}.data.description`, value: this.item.data.description },
        {
          path: `quests.${this.item.id}.data.giver_npc_id.data.name`,
          value: this.item.data.giver_npc_id.data.name,
        },
      ],
      'en',
    );

    for (const step of this.sortedSteps) {
      fallbacks.push(
        ...createLocaleFallbacks(
          this.locale,
          [
            {
              path: `quests.${this.item.id}.data.steps.${step.step_number}.description`,
              value: step.description,
            },
            {
              path: `quests.${this.item.id}.data.steps.${step.step_number}.location_id.data.name`,
              value: step.location_id.data.name,
            },
            {
              path: `quests.${this.item.id}.data.steps.${step.step_number}.npc_id.data.name`,
              value: step.npc_id.data.name,
            },
            ...step.rewards.map((reward) => ({
              path: `quests.${this.item?.id}.data.steps.${step.step_number}.rewards.${reward.item_id.id}.data.name`,
              value: reward.item_id.data.name,
            })),
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

  private getNpcLabel(npc: QuestDetailNode['data']['giver_npc_id']): string {
    const title = this.localized(npc.data.title);
    const name = this.localized(npc.data.name) || npc.data.display_label_en || npc.id;
    return title ? `${title} ${name}` : name;
  }

  private localized(value?: LocalizedQuestText): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.locale).format(value);
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }
}

container.register(
  QuestDetailViewModel,
  () => new QuestDetailViewModel(container.get(QuestDetailDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
