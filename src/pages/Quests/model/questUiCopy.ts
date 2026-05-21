import type { SupportedLocale } from 'src/shared/model';

export type QuestLocale = SupportedLocale;
export type QuestRepeatableFilter = 'all' | 'repeatable';

export interface QuestOption {
  readonly displayLabel: string;
  readonly id: string;
  readonly label: string;
  readonly meta?: string;
}

export interface QuestFormulaDescriptor {
  readonly label: string;
  readonly source: string;
  readonly value: string;
}

export interface QuestDetailCopy {
  readonly backAriaLabel: string;
  readonly backLabel: string;
  readonly contextTitle: string;
  readonly emptyStepsDescription: string;
  readonly emptyStepsTitle: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly factsTitle: string;
  readonly fieldGiver: string;
  readonly fieldKind: string;
  readonly fieldLevel: string;
  readonly fieldLocale: string;
  readonly fieldPrimaryLocation: string;
  readonly fieldPublished: string;
  readonly fieldRepeatable: string;
  readonly fieldVersion: string;
  readonly formulaSourceStepCount: string;
  readonly formulaSourceTotalLootXp: string;
  readonly formulaSourceTotalXp: string;
  readonly formulasTitle: string;
  readonly imageMetadataTitle: string;
  readonly imagePlaceholderDescription: (stepLabel: string) => string;
  readonly imagePlaceholderTitle: string;
  readonly notFoundDescription: string;
  readonly notFoundTitle: string;
  readonly rewardBonusXpLabel: string;
  readonly rewardItemTypeLabel: string;
  readonly rewardMarketValueLabel: string;
  readonly rewardQuantityLabel: string;
  readonly rewardsEmptyDescription: string;
  readonly rewardsTitle: string;
  readonly stepFileDimensionsLabel: string;
  readonly stepFileNameLabel: string;
  readonly stepFileStatusLabel: string;
  readonly stepLocationLabel: string;
  readonly stepNpcLabel: string;
  readonly stepTitle: (stepNumber: string) => string;
  readonly stepXpLabel: string;
  readonly timelineTitle: string;
  readonly totalLootXpLabel: string;
  readonly totalXpLabel: string;
  readonly unknownValue: string;
}

export interface QuestsPageCopy {
  readonly allLocationsOption: string;
  readonly allNpcsOption: string;
  readonly applyFiltersActionLabel: string;
  readonly capabilitiesAriaLabel: string;
  readonly cardOpenAction: string;
  readonly closeFiltersActionLabel: string;
  readonly detail: QuestDetailCopy;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly filterPanelTitle: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly kindLabel: (value: string) => string;
  readonly levelMaxLabel: string;
  readonly levelMinLabel: string;
  readonly levelRangeValidationMessage: string;
  readonly levelRequiredLabel: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly locationSelectLabel: string;
  readonly noDescription: string;
  readonly noLocationLabel: string;
  readonly npcSelectLabel: string;
  readonly openFiltersActionLabel: string;
  readonly payloadPreviewTitle: string;
  readonly primaryLocationLabel: string;
  readonly questsSectionAriaLabel: string;
  readonly repeatableLabel: string;
  readonly repeatableNoLabel: string;
  readonly repeatableOnlyLabel: string;
  readonly repeatableYesLabel: string;
  readonly resetFiltersActionLabel: string;
  readonly retryActionLabel: string;
  readonly showMoreActionLabel: string;
  readonly stepCountLabel: string;
}

const fallbackLocale: QuestLocale = 'en';
type LocalizedText = Record<QuestLocale, string>;

const headerBadges = {
  en: ['giver FK', 'step location FK', 'level filter', 'repeatable flag'],
  ru: ['FK выдающего', 'FK локации шага', 'фильтр уровня', 'флаг повторяемости'],
  zh: ['发布者 FK', '步骤地点 FK', '等级筛选', '可重复标记'],
} satisfies Record<QuestLocale, readonly string[]>;

const pageText = {
  allLocationsOption: {
    en: 'All primary locations',
    ru: 'Все основные локации',
    zh: '全部主要地点',
  },
  allNpcsOption: { en: 'All quest givers', ru: 'Все выдающие NPC', zh: '全部任务发布者' },
  applyFiltersActionLabel: { en: 'Apply filters', ru: 'Применить фильтры', zh: '应用筛选' },
  capabilitiesAriaLabel: { en: 'Capabilities', ru: 'Возможности', zh: '能力' },
  cardOpenAction: { en: 'Open quest', ru: 'Открыть квест', zh: '打开任务' },
  closeFiltersActionLabel: { en: 'Close', ru: 'Закрыть', zh: '关闭' },
  emptyActionLabel: { en: 'Reset filters', ru: 'Сбросить фильтры', zh: '重置筛选' },
  emptyDescription: {
    en: 'The quests query returned no rows for the current FK and level filters.',
    ru: 'Запрос квестов не вернул строк для текущих FK и фильтров уровня.',
    zh: '当前 FK 和等级筛选下任务查询没有返回行。',
  },
  emptyTitle: { en: 'No quests found', ru: 'Квесты не найдены', zh: '未找到任务' },
  entityLabel: { en: 'quests', ru: 'квестов', zh: '个任务' },
  errorDescription: {
    en: 'The GraphQL router did not return the quests catalog.',
    ru: 'GraphQL-роутер не вернул каталог квестов.',
    zh: 'GraphQL router 未返回任务目录。',
  },
  errorTitle: { en: 'Failed to load quests', ru: 'Не удалось загрузить квесты', zh: '任务加载失败' },
  explainerFooterNote: {
    en: 'The location filter targets the first authored step because quests do not expose a top-level location_id.',
    ru: 'Фильтр локации смотрит на первый authored step, потому что у квеста нет верхнего location_id.',
    zh: '地点筛选使用第一个编写的步骤，因为任务没有顶层 location_id。',
  },
  explainerSummary: {
    en: 'Quests show FK-backed catalog columns, boolean filtering, level ranges, and a computed step count.',
    ru: 'Квесты показывают FK-колонки каталога, boolean-фильтр, диапазон уровня и вычисленный step_count.',
    zh: '任务展示 FK 目录列、布尔筛选、等级范围和计算出的步骤数。',
  },
  filterPanelTitle: { en: 'Quest filters', ru: 'Фильтры квестов', zh: '任务筛选' },
  headerDescription: {
    en: 'Compare quest chains by giver, primary step location, required level, repeatability, and authored step count.',
    ru: 'Сравнивайте цепочки по выдающему NPC, основной локации шага, уровню, повторяемости и числу шагов.',
    zh: '按发布者、主要步骤地点、需求等级、可重复性和步骤数量比较任务链。',
  },
  headerEyebrow: { en: 'Quest log', ru: 'Журнал квестов', zh: '任务日志' },
  headerTitle: { en: 'Quests', ru: 'Квесты', zh: '任务' },
  levelMaxLabel: { en: 'Max level', ru: 'Макс. уровень', zh: '最高等级' },
  levelMinLabel: { en: 'Min level', ru: 'Мин. уровень', zh: '最低等级' },
  levelRangeValidationMessage: {
    en: 'Minimum level must be less than or equal to maximum level.',
    ru: 'Минимальный уровень должен быть не больше максимального.',
    zh: '最低等级必须小于或等于最高等级。',
  },
  levelRequiredLabel: { en: 'Required level', ru: 'Требуемый уровень', zh: '需求等级' },
  loadingAriaLabel: { en: 'Loading quests', ru: 'Загрузка квестов', zh: '正在加载任务' },
  loadingMoreLabel: { en: 'Loading...', ru: 'Загрузка...', zh: '加载中...' },
  locationSelectLabel: { en: 'Primary step location', ru: 'Основная локация шага', zh: '主要步骤地点' },
  noDescription: { en: 'No quest summary available.', ru: 'Краткое описание недоступно.', zh: '暂无任务简介。' },
  noLocationLabel: { en: 'No authored step location', ru: 'Локация шага не задана', zh: '没有步骤地点' },
  npcSelectLabel: { en: 'Quest giver', ru: 'Выдающий NPC', zh: '任务发布者' },
  openFiltersActionLabel: { en: 'Filters', ru: 'Фильтры', zh: '筛选' },
  payloadPreviewTitle: { en: 'Query payload preview', ru: 'Предпросмотр query payload', zh: '查询 payload 预览' },
  primaryLocationLabel: { en: 'Primary location', ru: 'Основная локация', zh: '主要地点' },
  questsSectionAriaLabel: { en: 'Quests section', ru: 'Раздел квестов', zh: '任务分区' },
  repeatableLabel: { en: 'Repeatable', ru: 'Повторяемый', zh: '可重复' },
  repeatableNoLabel: { en: 'One-shot', ru: 'Однократный', zh: '一次性' },
  repeatableOnlyLabel: { en: 'Repeatable only', ru: 'Только повторяемые', zh: '仅可重复' },
  repeatableYesLabel: { en: 'Repeatable', ru: 'Повторяемый', zh: '可重复' },
  resetFiltersActionLabel: { en: 'Reset', ru: 'Сбросить', zh: '重置' },
  retryActionLabel: { en: 'Retry', ru: 'Повторить', zh: '重试' },
  showMoreActionLabel: { en: 'Load more', ru: 'Загрузить ещё', zh: '加载更多' },
  stepCountLabel: { en: 'Steps', ru: 'Шаги', zh: '步骤' },
} satisfies Record<
  Exclude<keyof QuestsPageCopy, 'detail' | 'headerBadges' | 'kindLabel'>,
  LocalizedText
>;

const detailText = {
  backAriaLabel: { en: 'Go back', ru: 'Вернуться назад', zh: '返回上一页' },
  backLabel: { en: 'Back', ru: 'Назад', zh: '返回' },
  contextTitle: { en: 'Quest context', ru: 'Контекст квеста', zh: '任务背景' },
  emptyStepsDescription: {
    en: 'This quest row exists, but no authored steps or rewards are present in the current data.',
    ru: 'Строка квеста существует, но в текущих данных нет authored steps или наград.',
    zh: '此任务行存在，但当前数据中没有编写的步骤或奖励。',
  },
  emptyStepsTitle: { en: 'No steps authored', ru: 'Шаги не заведены', zh: '暂无步骤' },
  errorDescription: {
    en: 'The GraphQL router did not return this quest. Check the URL or return to the catalog.',
    ru: 'GraphQL-роутер не вернул этот квест. Проверьте URL или вернитесь в каталог.',
    zh: 'GraphQL router 未返回此任务。请检查 URL 或返回目录。',
  },
  errorTitle: { en: 'Quest unavailable', ru: 'Квест недоступен', zh: '任务不可用' },
  explainerFooterNote: {
    en: 'Steps keep their nested image and rewards shape visible instead of flattening the response.',
    ru: 'Шаги сохраняют вложенную форму image и rewards, а не разворачивают ответ в плоский список.',
    zh: '步骤保留嵌套的图片和奖励结构，而不是把响应拍平成列表。',
  },
  explainerSummary: {
    en: 'Quest detail shows required file fields inside object arrays, nested rewards, and formulas over both levels.',
    ru: 'Detail квеста показывает обязательные file fields внутри object arrays, вложенные награды и формулы по двум уровням.',
    zh: '任务详情展示对象数组中的必需文件字段、嵌套奖励以及跨两层的公式。',
  },
  factsTitle: { en: 'Quest facts', ru: 'Факты квеста', zh: '任务信息' },
  fieldGiver: { en: 'Giver', ru: 'Выдаёт', zh: '发布者' },
  fieldKind: { en: 'Kind', ru: 'Тип', zh: '类型' },
  fieldLevel: { en: 'Required level', ru: 'Требуемый уровень', zh: '需求等级' },
  fieldLocale: { en: 'Locale', ru: 'Язык', zh: '语言' },
  fieldPrimaryLocation: { en: 'Primary location', ru: 'Основная локация', zh: '主要地点' },
  fieldPublished: { en: 'Published', ru: 'Опубликовано', zh: '发布时间' },
  fieldRepeatable: { en: 'Repeatable', ru: 'Повторяемый', zh: '可重复' },
  fieldVersion: { en: 'Version', ru: 'Версия', zh: '版本' },
  formulaSourceStepCount: { en: 'steps.length', ru: 'steps.length', zh: 'steps.length' },
  formulaSourceTotalLootXp: {
    en: 'sum(steps[].rewards[].bonus_xp)',
    ru: 'sum(steps[].rewards[].bonus_xp)',
    zh: 'sum(steps[].rewards[].bonus_xp)',
  },
  formulaSourceTotalXp: { en: 'sum(steps[].xp)', ru: 'sum(steps[].xp)', zh: 'sum(steps[].xp)' },
  formulasTitle: { en: 'Quest formulas', ru: 'Формулы квеста', zh: '任务公式' },
  imageMetadataTitle: { en: 'Step image file', ru: 'Файл изображения шага', zh: '步骤图片文件' },
  imagePlaceholderTitle: { en: 'Step image unavailable', ru: 'Изображение шага недоступно', zh: '步骤图片不可用' },
  notFoundDescription: {
    en: 'No quest row matched this route id.',
    ru: 'По этому route id не нашлось строки квеста.',
    zh: '没有任务行匹配此路线 id。',
  },
  notFoundTitle: { en: 'Quest not found', ru: 'Квест не найден', zh: '未找到任务' },
  rewardBonusXpLabel: { en: 'Bonus XP', ru: 'Бонус XP', zh: '奖励 XP' },
  rewardItemTypeLabel: { en: 'Type', ru: 'Тип', zh: '类型' },
  rewardMarketValueLabel: { en: 'Market value', ru: 'Рыночная цена', zh: '市场价值' },
  rewardQuantityLabel: { en: 'Quantity', ru: 'Количество', zh: '数量' },
  rewardsEmptyDescription: {
    en: 'No nested reward rows are present for this step.',
    ru: 'Для этого шага нет вложенных строк наград.',
    zh: '此步骤没有嵌套奖励行。',
  },
  rewardsTitle: { en: 'Rewards', ru: 'Награды', zh: '奖励' },
  stepFileDimensionsLabel: { en: 'Dimensions', ru: 'Размер', zh: '尺寸' },
  stepFileNameLabel: { en: 'File', ru: 'Файл', zh: '文件' },
  stepFileStatusLabel: { en: 'Status', ru: 'Статус', zh: '状态' },
  stepLocationLabel: { en: 'Location', ru: 'Локация', zh: '地点' },
  stepNpcLabel: { en: 'NPC', ru: 'NPC', zh: 'NPC' },
  stepXpLabel: { en: 'Step XP', ru: 'XP шага', zh: '步骤 XP' },
  timelineTitle: { en: 'Steps timeline', ru: 'Таймлайн шагов', zh: '步骤时间线' },
  totalLootXpLabel: { en: 'Total loot XP', ru: 'XP наград', zh: '总奖励 XP' },
  totalXpLabel: { en: 'Total XP', ru: 'Всего XP', zh: '总 XP' },
  unknownValue: { en: 'Unknown', ru: 'Неизвестно', zh: '未知' },
} satisfies Record<
  Exclude<keyof QuestDetailCopy, 'imagePlaceholderDescription' | 'stepTitle'>,
  LocalizedText
>;

const imagePlaceholderDescription = {
  en: (stepLabel: string) => `No required image file can be rendered for ${stepLabel}.`,
  ru: (stepLabel: string) => `Для ${stepLabel} не удалось отобразить обязательный image file.`,
  zh: (stepLabel: string) => `${stepLabel} 的必需图片文件无法渲染。`,
} satisfies Record<QuestLocale, (stepLabel: string) => string>;

const stepTitle = {
  en: (stepNumber: string) => `Step ${stepNumber}`,
  ru: (stepNumber: string) => `Шаг ${stepNumber}`,
  zh: (stepNumber: string) => `步骤 ${stepNumber}`,
} satisfies Record<QuestLocale, (stepNumber: string) => string>;

const kindLabels: Record<string, LocalizedText> = {
  bounty: { en: 'Bounty', ru: 'Заказ', zh: '悬赏' },
  campaign: { en: 'Campaign', ru: 'Кампания', zh: '战役' },
  exploration: { en: 'Exploration', ru: 'Исследование', zh: '探索' },
  side: { en: 'Side quest', ru: 'Побочный квест', zh: '支线任务' },
  tutorial: { en: 'Tutorial', ru: 'Обучение', zh: '教程' },
};

export function getQuestsPageCopy(locale: QuestLocale): QuestsPageCopy {
  const text = (value: LocalizedText): string => value[locale] || value[fallbackLocale];
  return {
    allLocationsOption: text(pageText.allLocationsOption),
    allNpcsOption: text(pageText.allNpcsOption),
    applyFiltersActionLabel: text(pageText.applyFiltersActionLabel),
    capabilitiesAriaLabel: text(pageText.capabilitiesAriaLabel),
    cardOpenAction: text(pageText.cardOpenAction),
    closeFiltersActionLabel: text(pageText.closeFiltersActionLabel),
    detail: {
      backAriaLabel: text(detailText.backAriaLabel),
      backLabel: text(detailText.backLabel),
      contextTitle: text(detailText.contextTitle),
      emptyStepsDescription: text(detailText.emptyStepsDescription),
      emptyStepsTitle: text(detailText.emptyStepsTitle),
      errorDescription: text(detailText.errorDescription),
      errorTitle: text(detailText.errorTitle),
      explainerFooterNote: text(detailText.explainerFooterNote),
      explainerSummary: text(detailText.explainerSummary),
      factsTitle: text(detailText.factsTitle),
      fieldGiver: text(detailText.fieldGiver),
      fieldKind: text(detailText.fieldKind),
      fieldLevel: text(detailText.fieldLevel),
      fieldLocale: text(detailText.fieldLocale),
      fieldPrimaryLocation: text(detailText.fieldPrimaryLocation),
      fieldPublished: text(detailText.fieldPublished),
      fieldRepeatable: text(detailText.fieldRepeatable),
      fieldVersion: text(detailText.fieldVersion),
      formulaSourceStepCount: text(detailText.formulaSourceStepCount),
      formulaSourceTotalLootXp: text(detailText.formulaSourceTotalLootXp),
      formulaSourceTotalXp: text(detailText.formulaSourceTotalXp),
      formulasTitle: text(detailText.formulasTitle),
      imageMetadataTitle: text(detailText.imageMetadataTitle),
      imagePlaceholderDescription: imagePlaceholderDescription[locale],
      imagePlaceholderTitle: text(detailText.imagePlaceholderTitle),
      notFoundDescription: text(detailText.notFoundDescription),
      notFoundTitle: text(detailText.notFoundTitle),
      rewardBonusXpLabel: text(detailText.rewardBonusXpLabel),
      rewardItemTypeLabel: text(detailText.rewardItemTypeLabel),
      rewardMarketValueLabel: text(detailText.rewardMarketValueLabel),
      rewardQuantityLabel: text(detailText.rewardQuantityLabel),
      rewardsEmptyDescription: text(detailText.rewardsEmptyDescription),
      rewardsTitle: text(detailText.rewardsTitle),
      stepFileDimensionsLabel: text(detailText.stepFileDimensionsLabel),
      stepFileNameLabel: text(detailText.stepFileNameLabel),
      stepFileStatusLabel: text(detailText.stepFileStatusLabel),
      stepLocationLabel: text(detailText.stepLocationLabel),
      stepNpcLabel: text(detailText.stepNpcLabel),
      stepTitle: stepTitle[locale],
      stepXpLabel: text(detailText.stepXpLabel),
      timelineTitle: text(detailText.timelineTitle),
      totalLootXpLabel: text(detailText.totalLootXpLabel),
      totalXpLabel: text(detailText.totalXpLabel),
      unknownValue: text(detailText.unknownValue),
    },
    emptyActionLabel: text(pageText.emptyActionLabel),
    emptyDescription: text(pageText.emptyDescription),
    emptyTitle: text(pageText.emptyTitle),
    entityLabel: text(pageText.entityLabel),
    errorDescription: text(pageText.errorDescription),
    errorTitle: text(pageText.errorTitle),
    explainerFooterNote: text(pageText.explainerFooterNote),
    explainerSummary: text(pageText.explainerSummary),
    filterPanelTitle: text(pageText.filterPanelTitle),
    headerBadges: headerBadges[locale],
    headerDescription: text(pageText.headerDescription),
    headerEyebrow: text(pageText.headerEyebrow),
    headerTitle: text(pageText.headerTitle),
    kindLabel: (value) => text(kindLabels[value] ?? { en: rawLabel(value), ru: rawLabel(value), zh: rawLabel(value) }),
    levelMaxLabel: text(pageText.levelMaxLabel),
    levelMinLabel: text(pageText.levelMinLabel),
    levelRangeValidationMessage: text(pageText.levelRangeValidationMessage),
    levelRequiredLabel: text(pageText.levelRequiredLabel),
    loadingAriaLabel: text(pageText.loadingAriaLabel),
    loadingMoreLabel: text(pageText.loadingMoreLabel),
    locationSelectLabel: text(pageText.locationSelectLabel),
    noDescription: text(pageText.noDescription),
    noLocationLabel: text(pageText.noLocationLabel),
    npcSelectLabel: text(pageText.npcSelectLabel),
    openFiltersActionLabel: text(pageText.openFiltersActionLabel),
    payloadPreviewTitle: text(pageText.payloadPreviewTitle),
    primaryLocationLabel: text(pageText.primaryLocationLabel),
    questsSectionAriaLabel: text(pageText.questsSectionAriaLabel),
    repeatableLabel: text(pageText.repeatableLabel),
    repeatableNoLabel: text(pageText.repeatableNoLabel),
    repeatableOnlyLabel: text(pageText.repeatableOnlyLabel),
    repeatableYesLabel: text(pageText.repeatableYesLabel),
    resetFiltersActionLabel: text(pageText.resetFiltersActionLabel),
    retryActionLabel: text(pageText.retryActionLabel),
    showMoreActionLabel: text(pageText.showMoreActionLabel),
    stepCountLabel: text(pageText.stepCountLabel),
  };
}

function rawLabel(value: string): string {
  return value.replaceAll('_', ' ').replace(/^\w/, (letter) => letter.toUpperCase());
}
