import type { HeroLocale } from './HeroItemViewModel';

export const HERO_SORT_KEYS = ['published-desc', 'level-desc', 'level-asc', 'name-asc'] as const;

export type HeroSortKey = (typeof HERO_SORT_KEYS)[number];

export interface HeroSortCopy {
  readonly key: HeroSortKey;
  readonly label: string;
}

export interface HeroesPageCopy {
  readonly allClassesButton: string;
  readonly capabilitiesAriaLabel: string;
  readonly cardOpenAction: string;
  readonly classButtonsAriaLabel: string;
  readonly classFilterLabel: string;
  readonly constitutionLabel: (value: string) => string;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly equipmentLabel: (value: string) => string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly fieldClass: string;
  readonly fieldConstitution: string;
  readonly fieldEquipment: string;
  readonly fieldGold: string;
  readonly fieldLevel: string;
  readonly goldLabel: (value: string) => string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly heroesSectionAriaLabel: string;
  readonly levelLabel: (value: string) => string;
  readonly levelMaxLabel: string;
  readonly levelMinLabel: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly noEpithet: string;
  readonly openHeroAriaLabel: (heroTitle: string) => string;
  readonly portraitPlaceholderDescription: (heroTitle: string) => string;
  readonly portraitPlaceholderTitle: string;
  readonly resetFiltersActionLabel: string;
  readonly retryActionLabel: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly showMoreActionLabel: string;
  readonly sortButtonsAriaLabel: string;
  readonly sortLabel: string;
  readonly sortOptions: readonly HeroSortCopy[];
  readonly statLabel: (value: string) => string;
  readonly unknownClass: string;
  readonly veteranLabel: string;
  readonly veteranOnlyButton: string;
  readonly detail: HeroDetailCopy;
}

const fallbackLocale: HeroLocale = 'en';

export interface HeroDetailCopy {
  readonly abilitiesTitle: string;
  readonly abilityDamageLabel: string;
  readonly abilityEmptyDescription: string;
  readonly abilityEmptyTitle: string;
  readonly abilityLevelLabel: string;
  readonly abilitySchoolLabel: string;
  readonly backAriaLabel: string;
  readonly backLabel: string;
  readonly classStatsTitle: string;
  readonly classBaseHpLabel: string;
  readonly classHpGrowthLabel: string;
  readonly classMpGrowthLabel: string;
  readonly cooldownLabel: string;
  readonly embeddedEquipmentTitle: string;
  readonly equipmentEmptyDescription: string;
  readonly equipmentEmptyTitle: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly factsTitle: string;
  readonly fieldClass: string;
  readonly fieldConstitution: string;
  readonly fieldDisplayName: string;
  readonly fieldEquippedCount: string;
  readonly fieldGold: string;
  readonly fieldLevel: string;
  readonly fieldLocalizedName: string;
  readonly fieldPortraitDimensions: string;
  readonly fieldPortraitFile: string;
  readonly fieldPortraitMime: string;
  readonly fieldPublished: string;
  readonly fieldTotalEquipmentModifier: string;
  readonly fieldVersion: string;
  readonly formulasTitle: string;
  readonly inventoryEmptyDescription: string;
  readonly inventoryEmptyTitle: string;
  readonly inventoryTitle: string;
  readonly itemModifierLabel: string;
  readonly itemRarityLabel: string;
  readonly itemSlotLabel: string;
  readonly itemValueLabel: string;
  readonly itemWeightLabel: string;
  readonly loadingAriaLabel: string;
  readonly noLabel: string;
  readonly notFoundDescription: string;
  readonly notFoundTitle: string;
  readonly primaryStatLabel: string;
  readonly retryActionLabel: string;
  readonly unknownValue: string;
  readonly yesLabel: string;
}

type HeroesPageFormatterKey =
  | 'constitutionLabel'
  | 'equipmentLabel'
  | 'goldLabel'
  | 'levelLabel'
  | 'openHeroAriaLabel'
  | 'portraitPlaceholderDescription'
  | 'statLabel';

type HeroesPageTextKey = Exclude<
  keyof HeroesPageCopy,
  HeroesPageFormatterKey | 'detail' | 'headerBadges' | 'sortOptions'
>;

type LocalizedFormatterRecord<Key extends string> = Record<
  Key,
  Record<HeroLocale, (value: string) => string>
>;
type LocalizedTextRecord<Key extends string> = Record<Key, Record<HeroLocale, string>>;

const pageText = {
  allClassesButton: { en: 'All classes', ru: 'Все классы', zh: '全部职业' },
  capabilitiesAriaLabel: { en: 'Capabilities', ru: 'Возможности', zh: '能力' },
  cardOpenAction: { en: 'Open hero', ru: 'Открыть героя', zh: '打开英雄' },
  classButtonsAriaLabel: { en: 'Class filters', ru: 'Фильтры классов', zh: '职业筛选' },
  classFilterLabel: { en: 'Class', ru: 'Класс', zh: '职业' },
  emptyActionLabel: { en: 'Clear filters', ru: 'Сбросить фильтры', zh: '清除筛选' },
  emptyDescription: {
    en: 'The heroes query returned no rows for the current filters.',
    ru: 'Запрос героев не вернул строк для текущих фильтров.',
    zh: '当前筛选下英雄查询没有返回行。',
  },
  emptyTitle: { en: 'No heroes found', ru: 'Герои не найдены', zh: '未找到英雄' },
  errorDescription: {
    en: 'The GraphQL router did not return the heroes catalog.',
    ru: 'GraphQL-роутер не вернул каталог героев.',
    zh: 'GraphQL router 未返回英雄目录。',
  },
  errorTitle: {
    en: 'Failed to load heroes',
    ru: 'Не удалось загрузить героев',
    zh: '英雄加载失败',
  },
  explainerFooterNote: {
    en: 'This first version follows the current schema: class FK, formula display name, and portrait file metadata.',
    ru: 'Первая версия следует текущей схеме: FK класса, формульное имя и метаданные портрета.',
    zh: '第一版跟随当前 schema：职业 FK、公式显示名和头像文件元数据。',
  },
  explainerSummary: {
    en: 'Heroes demonstrate class FK filters, computed display labels, localized content, and portrait file fields.',
    ru: 'Герои показывают FK-фильтр по классу, вычисленное имя, локализованный контент и портретный file field.',
    zh: '英雄展示职业 FK 筛选、计算显示名、本地化内容和头像文件字段。',
  },
  fieldClass: { en: 'Class', ru: 'Класс', zh: '职业' },
  fieldConstitution: { en: 'Constitution', ru: 'Выносливость', zh: '体质' },
  fieldEquipment: { en: 'Equipment', ru: 'Снаряжение', zh: '装备' },
  fieldGold: { en: 'Gold', ru: 'Золото', zh: '金币' },
  fieldLevel: { en: 'Level', ru: 'Уровень', zh: '等级' },
  headerDescription: {
    en: 'Playable hero profiles with class relations, portrait media, levels, and veteran status.',
    ru: 'Профили игровых героев с привязкой к классу, портретами, уровнями и ветеранским статусом.',
    zh: '包含职业关系、头像媒体、等级和老兵状态的可玩英雄档案。',
  },
  headerEyebrow: { en: 'Hero codex', ru: 'Кодекс героев', zh: '英雄图鉴' },
  headerTitle: { en: 'Heroes', ru: 'Герои', zh: '英雄' },
  heroesSectionAriaLabel: { en: 'Heroes section', ru: 'Раздел героев', zh: '英雄分区' },
  levelMaxLabel: { en: 'Max level', ru: 'Макс. уровень', zh: '最高等级' },
  levelMinLabel: { en: 'Min level', ru: 'Мин. уровень', zh: '最低等级' },
  loadingAriaLabel: { en: 'Loading heroes', ru: 'Загрузка героев', zh: '正在加载英雄' },
  loadingMoreLabel: {
    en: 'Loading more heroes...',
    ru: 'Загружаем еще героев...',
    zh: '正在加载更多英雄...',
  },
  noEpithet: { en: 'No epithet available.', ru: 'Эпитет недоступен.', zh: '暂无称号。' },
  portraitPlaceholderTitle: { en: 'No portrait', ru: 'Нет портрета', zh: '无头像' },
  resetFiltersActionLabel: { en: 'Reset filters', ru: 'Сбросить фильтры', zh: '重置筛选' },
  retryActionLabel: { en: 'Retry', ru: 'Повторить', zh: '重试' },
  searchLabel: { en: 'Search', ru: 'Поиск', zh: '搜索' },
  searchPlaceholder: { en: 'Name or epithet', ru: 'Имя или эпитет', zh: '姓名或称号' },
  showMoreActionLabel: { en: 'Show more heroes', ru: 'Показать еще героев', zh: '显示更多英雄' },
  sortButtonsAriaLabel: { en: 'Hero sort order', ru: 'Сортировка героев', zh: '英雄排序' },
  sortLabel: { en: 'Sort', ru: 'Сортировка', zh: '排序' },
  unknownClass: { en: 'Unknown class', ru: 'Класс неизвестен', zh: '未知职业' },
  veteranLabel: { en: 'Veteran', ru: 'Ветеран', zh: '老兵' },
  veteranOnlyButton: { en: 'Veterans only', ru: 'Только ветераны', zh: '仅老兵' },
} satisfies LocalizedTextRecord<HeroesPageTextKey>;

const pageFormatters = {
  constitutionLabel: {
    en: (value) => `${value} CON`,
    ru: (value) => `${value} ВЫН`,
    zh: (value) => `${value} 体质`,
  },
  equipmentLabel: {
    en: (value) => `${value} equipped`,
    ru: (value) => `${value} надето`,
    zh: (value) => `${value} 已装备`,
  },
  goldLabel: {
    en: (value) => `${value} gold`,
    ru: (value) => `${value} золота`,
    zh: (value) => `${value} 金币`,
  },
  levelLabel: {
    en: (value) => `Level ${value}`,
    ru: (value) => `${value} ур.`,
    zh: (value) => `${value} 级`,
  },
  openHeroAriaLabel: {
    en: (heroTitle) => `Open ${heroTitle}`,
    ru: (heroTitle) => `Открыть героя ${heroTitle}`,
    zh: (heroTitle) => `打开英雄 ${heroTitle}`,
  },
  portraitPlaceholderDescription: {
    en: (heroTitle) => `Portrait for ${heroTitle} is not available.`,
    ru: (heroTitle) => `Портрет для ${heroTitle} недоступен.`,
    zh: (heroTitle) => `${heroTitle} 的头像不可用。`,
  },
  statLabel: {
    en: (value) => getPrimaryStatLabel(value, 'en'),
    ru: (value) => getPrimaryStatLabel(value, 'ru'),
    zh: (value) => getPrimaryStatLabel(value, 'zh'),
  },
} satisfies LocalizedFormatterRecord<HeroesPageFormatterKey>;

const headerBadges = {
  en: ['class FK', 'formula label', 'portrait file'],
  ru: ['FK класса', 'формульное имя', 'портрет'],
  zh: ['职业 FK', '公式名称', '头像文件'],
} satisfies Record<HeroLocale, readonly string[]>;

const sortOptions = {
  en: [
    { key: 'published-desc', label: 'Newest' },
    { key: 'level-desc', label: 'Level high' },
    { key: 'level-asc', label: 'Level low' },
    { key: 'name-asc', label: 'Name' },
  ],
  ru: [
    { key: 'published-desc', label: 'Новые' },
    { key: 'level-desc', label: 'Уровень выше' },
    { key: 'level-asc', label: 'Уровень ниже' },
    { key: 'name-asc', label: 'Имя' },
  ],
  zh: [
    { key: 'published-desc', label: '最新' },
    { key: 'level-desc', label: '等级高' },
    { key: 'level-asc', label: '等级低' },
    { key: 'name-asc', label: '姓名' },
  ],
} satisfies Record<HeroLocale, readonly HeroSortCopy[]>;

const detailText = {
  abilitiesTitle: { en: 'Abilities', ru: 'Умения', zh: '能力' },
  abilityDamageLabel: { en: 'Damage', ru: 'Урон', zh: '伤害' },
  abilityEmptyDescription: {
    en: 'This hero has no linked abilities.',
    ru: 'У героя нет связанных умений.',
    zh: '此英雄没有关联能力。',
  },
  abilityEmptyTitle: { en: 'No abilities', ru: 'Нет умений', zh: '无能力' },
  abilityLevelLabel: { en: 'Required level', ru: 'Требуемый уровень', zh: '需求等级' },
  abilitySchoolLabel: { en: 'School', ru: 'Школа', zh: '学派' },
  backAriaLabel: {
    en: 'Go back',
    ru: 'Вернуться назад',
    zh: '返回上一页',
  },
  backLabel: { en: 'Back', ru: 'Назад', zh: '返回' },
  classStatsTitle: { en: 'Class growth', ru: 'Рост класса', zh: '职业成长' },
  classBaseHpLabel: { en: 'Base HP', ru: 'Базовое HP', zh: '基础 HP' },
  classHpGrowthLabel: { en: 'HP / level', ru: 'HP / уровень', zh: 'HP / 等级' },
  classMpGrowthLabel: { en: 'MP / level', ru: 'MP / уровень', zh: 'MP / 等级' },
  cooldownLabel: { en: 'Cooldown', ru: 'Восстановление', zh: '冷却' },
  embeddedEquipmentTitle: { en: 'Equipped items', ru: 'Надетые предметы', zh: '已装备物品' },
  equipmentEmptyDescription: {
    en: 'No embedded equipment rows were returned.',
    ru: 'Embedded-строки снаряжения не вернулись.',
    zh: '未返回嵌入装备行。',
  },
  equipmentEmptyTitle: { en: 'No equipment', ru: 'Нет снаряжения', zh: '无装备' },
  errorDescription: {
    en: 'The GraphQL router did not return this hero profile.',
    ru: 'GraphQL-роутер не вернул профиль героя.',
    zh: 'GraphQL router 未返回此英雄档案。',
  },
  errorTitle: { en: 'Failed to load hero', ru: 'Не удалось загрузить героя', zh: '英雄加载失败' },
  factsTitle: { en: 'Hero facts', ru: 'Данные героя', zh: '英雄信息' },
  fieldClass: { en: 'Class', ru: 'Класс', zh: '职业' },
  fieldConstitution: { en: 'Constitution', ru: 'Выносливость', zh: '体质' },
  fieldDisplayName: { en: 'Display name', ru: 'Формульное имя', zh: '显示名' },
  fieldEquippedCount: { en: 'Equipped count', ru: 'Надето', zh: '已装备数量' },
  fieldGold: { en: 'Gold', ru: 'Золото', zh: '金币' },
  fieldLevel: { en: 'Level', ru: 'Уровень', zh: '等级' },
  fieldLocalizedName: { en: 'Localized name', ru: 'Локализованное имя', zh: '本地化姓名' },
  fieldPortraitDimensions: { en: 'Portrait size', ru: 'Размер портрета', zh: '头像尺寸' },
  fieldPortraitFile: { en: 'Portrait file', ru: 'Файл портрета', zh: '头像文件' },
  fieldPortraitMime: { en: 'Portrait MIME', ru: 'MIME портрета', zh: '头像 MIME' },
  fieldPublished: { en: 'Published', ru: 'Опубликовано', zh: '发布时间' },
  fieldTotalEquipmentModifier: {
    en: 'Equipment modifier',
    ru: 'Модификатор снаряжения',
    zh: '装备修正',
  },
  fieldVersion: { en: 'Version', ru: 'Версия', zh: '版本' },
  formulasTitle: { en: 'Formula outputs', ru: 'Формульные поля', zh: '公式输出' },
  inventoryEmptyDescription: {
    en: 'This hero has no linked inventory items.',
    ru: 'У героя нет связанных предметов инвентаря.',
    zh: '此英雄没有关联库存物品。',
  },
  inventoryEmptyTitle: { en: 'No inventory', ru: 'Инвентарь пуст', zh: '无库存' },
  inventoryTitle: { en: 'Inventory', ru: 'Инвентарь', zh: '库存' },
  itemModifierLabel: { en: 'Modifier', ru: 'Модификатор', zh: '修正' },
  itemRarityLabel: { en: 'Rarity', ru: 'Редкость', zh: '稀有度' },
  itemSlotLabel: { en: 'Slot', ru: 'Слот', zh: '槽位' },
  itemValueLabel: { en: 'Value', ru: 'Цена', zh: '价值' },
  itemWeightLabel: { en: 'Weight', ru: 'Вес', zh: '重量' },
  loadingAriaLabel: { en: 'Loading hero detail', ru: 'Загрузка героя', zh: '正在加载英雄详情' },
  noLabel: { en: 'No', ru: 'Нет', zh: '否' },
  notFoundDescription: {
    en: 'The hero row was not returned for this id.',
    ru: 'Строка героя не вернулась для этого id.',
    zh: '此 id 未返回英雄行。',
  },
  notFoundTitle: { en: 'Hero not found', ru: 'Герой не найден', zh: '未找到英雄' },
  primaryStatLabel: { en: 'Primary stat', ru: 'Главная характеристика', zh: '主要属性' },
  retryActionLabel: { en: 'Retry', ru: 'Повторить', zh: '重试' },
  unknownValue: { en: 'Unknown', ru: 'Неизвестно', zh: '未知' },
  yesLabel: { en: 'Yes', ru: 'Да', zh: '是' },
} satisfies LocalizedTextRecord<keyof HeroDetailCopy>;

export function getHeroesPageCopy(locale: HeroLocale): HeroesPageCopy {
  return {
    allClassesButton: getLocalizedText(pageText, 'allClassesButton', locale),
    capabilitiesAriaLabel: getLocalizedText(pageText, 'capabilitiesAriaLabel', locale),
    cardOpenAction: getLocalizedText(pageText, 'cardOpenAction', locale),
    classButtonsAriaLabel: getLocalizedText(pageText, 'classButtonsAriaLabel', locale),
    classFilterLabel: getLocalizedText(pageText, 'classFilterLabel', locale),
    constitutionLabel: getLocalizedFormatter(pageFormatters, 'constitutionLabel', locale),
    emptyActionLabel: getLocalizedText(pageText, 'emptyActionLabel', locale),
    emptyDescription: getLocalizedText(pageText, 'emptyDescription', locale),
    emptyTitle: getLocalizedText(pageText, 'emptyTitle', locale),
    equipmentLabel: getLocalizedFormatter(pageFormatters, 'equipmentLabel', locale),
    errorDescription: getLocalizedText(pageText, 'errorDescription', locale),
    errorTitle: getLocalizedText(pageText, 'errorTitle', locale),
    explainerFooterNote: getLocalizedText(pageText, 'explainerFooterNote', locale),
    explainerSummary: getLocalizedText(pageText, 'explainerSummary', locale),
    fieldClass: getLocalizedText(pageText, 'fieldClass', locale),
    fieldConstitution: getLocalizedText(pageText, 'fieldConstitution', locale),
    fieldEquipment: getLocalizedText(pageText, 'fieldEquipment', locale),
    fieldGold: getLocalizedText(pageText, 'fieldGold', locale),
    fieldLevel: getLocalizedText(pageText, 'fieldLevel', locale),
    goldLabel: getLocalizedFormatter(pageFormatters, 'goldLabel', locale),
    headerBadges: headerBadges[locale] ?? headerBadges[fallbackLocale],
    headerDescription: getLocalizedText(pageText, 'headerDescription', locale),
    headerEyebrow: getLocalizedText(pageText, 'headerEyebrow', locale),
    headerTitle: getLocalizedText(pageText, 'headerTitle', locale),
    heroesSectionAriaLabel: getLocalizedText(pageText, 'heroesSectionAriaLabel', locale),
    levelLabel: getLocalizedFormatter(pageFormatters, 'levelLabel', locale),
    levelMaxLabel: getLocalizedText(pageText, 'levelMaxLabel', locale),
    levelMinLabel: getLocalizedText(pageText, 'levelMinLabel', locale),
    loadingAriaLabel: getLocalizedText(pageText, 'loadingAriaLabel', locale),
    loadingMoreLabel: getLocalizedText(pageText, 'loadingMoreLabel', locale),
    noEpithet: getLocalizedText(pageText, 'noEpithet', locale),
    openHeroAriaLabel: getLocalizedFormatter(pageFormatters, 'openHeroAriaLabel', locale),
    portraitPlaceholderDescription: getLocalizedFormatter(
      pageFormatters,
      'portraitPlaceholderDescription',
      locale,
    ),
    portraitPlaceholderTitle: getLocalizedText(pageText, 'portraitPlaceholderTitle', locale),
    resetFiltersActionLabel: getLocalizedText(pageText, 'resetFiltersActionLabel', locale),
    retryActionLabel: getLocalizedText(pageText, 'retryActionLabel', locale),
    searchLabel: getLocalizedText(pageText, 'searchLabel', locale),
    searchPlaceholder: getLocalizedText(pageText, 'searchPlaceholder', locale),
    showMoreActionLabel: getLocalizedText(pageText, 'showMoreActionLabel', locale),
    sortButtonsAriaLabel: getLocalizedText(pageText, 'sortButtonsAriaLabel', locale),
    sortLabel: getLocalizedText(pageText, 'sortLabel', locale),
    sortOptions: sortOptions[locale] ?? sortOptions[fallbackLocale],
    statLabel: getLocalizedFormatter(pageFormatters, 'statLabel', locale),
    unknownClass: getLocalizedText(pageText, 'unknownClass', locale),
    veteranLabel: getLocalizedText(pageText, 'veteranLabel', locale),
    veteranOnlyButton: getLocalizedText(pageText, 'veteranOnlyButton', locale),
    detail: getHeroDetailCopy(locale),
  };
}

function getHeroDetailCopy(locale: HeroLocale): HeroDetailCopy {
  return {
    abilitiesTitle: getLocalizedText(detailText, 'abilitiesTitle', locale),
    abilityDamageLabel: getLocalizedText(detailText, 'abilityDamageLabel', locale),
    abilityEmptyDescription: getLocalizedText(detailText, 'abilityEmptyDescription', locale),
    abilityEmptyTitle: getLocalizedText(detailText, 'abilityEmptyTitle', locale),
    abilityLevelLabel: getLocalizedText(detailText, 'abilityLevelLabel', locale),
    abilitySchoolLabel: getLocalizedText(detailText, 'abilitySchoolLabel', locale),
    backAriaLabel: getLocalizedText(detailText, 'backAriaLabel', locale),
    backLabel: getLocalizedText(detailText, 'backLabel', locale),
    classStatsTitle: getLocalizedText(detailText, 'classStatsTitle', locale),
    classBaseHpLabel: getLocalizedText(detailText, 'classBaseHpLabel', locale),
    classHpGrowthLabel: getLocalizedText(detailText, 'classHpGrowthLabel', locale),
    classMpGrowthLabel: getLocalizedText(detailText, 'classMpGrowthLabel', locale),
    cooldownLabel: getLocalizedText(detailText, 'cooldownLabel', locale),
    embeddedEquipmentTitle: getLocalizedText(detailText, 'embeddedEquipmentTitle', locale),
    equipmentEmptyDescription: getLocalizedText(detailText, 'equipmentEmptyDescription', locale),
    equipmentEmptyTitle: getLocalizedText(detailText, 'equipmentEmptyTitle', locale),
    errorDescription: getLocalizedText(detailText, 'errorDescription', locale),
    errorTitle: getLocalizedText(detailText, 'errorTitle', locale),
    factsTitle: getLocalizedText(detailText, 'factsTitle', locale),
    fieldClass: getLocalizedText(detailText, 'fieldClass', locale),
    fieldConstitution: getLocalizedText(detailText, 'fieldConstitution', locale),
    fieldDisplayName: getLocalizedText(detailText, 'fieldDisplayName', locale),
    fieldEquippedCount: getLocalizedText(detailText, 'fieldEquippedCount', locale),
    fieldGold: getLocalizedText(detailText, 'fieldGold', locale),
    fieldLevel: getLocalizedText(detailText, 'fieldLevel', locale),
    fieldLocalizedName: getLocalizedText(detailText, 'fieldLocalizedName', locale),
    fieldPortraitDimensions: getLocalizedText(detailText, 'fieldPortraitDimensions', locale),
    fieldPortraitFile: getLocalizedText(detailText, 'fieldPortraitFile', locale),
    fieldPortraitMime: getLocalizedText(detailText, 'fieldPortraitMime', locale),
    fieldPublished: getLocalizedText(detailText, 'fieldPublished', locale),
    fieldTotalEquipmentModifier: getLocalizedText(
      detailText,
      'fieldTotalEquipmentModifier',
      locale,
    ),
    fieldVersion: getLocalizedText(detailText, 'fieldVersion', locale),
    formulasTitle: getLocalizedText(detailText, 'formulasTitle', locale),
    inventoryEmptyDescription: getLocalizedText(detailText, 'inventoryEmptyDescription', locale),
    inventoryEmptyTitle: getLocalizedText(detailText, 'inventoryEmptyTitle', locale),
    inventoryTitle: getLocalizedText(detailText, 'inventoryTitle', locale),
    itemModifierLabel: getLocalizedText(detailText, 'itemModifierLabel', locale),
    itemRarityLabel: getLocalizedText(detailText, 'itemRarityLabel', locale),
    itemSlotLabel: getLocalizedText(detailText, 'itemSlotLabel', locale),
    itemValueLabel: getLocalizedText(detailText, 'itemValueLabel', locale),
    itemWeightLabel: getLocalizedText(detailText, 'itemWeightLabel', locale),
    loadingAriaLabel: getLocalizedText(detailText, 'loadingAriaLabel', locale),
    noLabel: getLocalizedText(detailText, 'noLabel', locale),
    notFoundDescription: getLocalizedText(detailText, 'notFoundDescription', locale),
    notFoundTitle: getLocalizedText(detailText, 'notFoundTitle', locale),
    primaryStatLabel: getLocalizedText(detailText, 'primaryStatLabel', locale),
    retryActionLabel: getLocalizedText(detailText, 'retryActionLabel', locale),
    unknownValue: getLocalizedText(detailText, 'unknownValue', locale),
    yesLabel: getLocalizedText(detailText, 'yesLabel', locale),
  };
}

function getLocalizedFormatter<Key extends string>(
  source: LocalizedFormatterRecord<Key>,
  key: Key,
  locale: HeroLocale,
): (value: string) => string {
  return source[key][locale] ?? source[key][fallbackLocale];
}

function getLocalizedText<Key extends string>(
  source: LocalizedTextRecord<Key>,
  key: Key,
  locale: HeroLocale,
): string {
  return source[key][locale] ?? source[key][fallbackLocale];
}

function getPrimaryStatLabel(value: string, locale: HeroLocale): string {
  const labels = primaryStatLabels[value];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? value;
}

const primaryStatLabels: Record<string, Record<HeroLocale, string>> = {
  constitution: { en: 'Constitution', ru: 'Выносливость', zh: '体质' },
  dexterity: { en: 'Dexterity', ru: 'Ловкость', zh: '敏捷' },
  intelligence: { en: 'Intelligence', ru: 'Интеллект', zh: '智力' },
  strength: { en: 'Strength', ru: 'Сила', zh: '力量' },
  wisdom: { en: 'Wisdom', ru: 'Мудрость', zh: '感知' },
};
