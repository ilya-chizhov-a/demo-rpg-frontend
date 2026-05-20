import type { StatLocale } from './StatItemViewModel';

export interface StatsPageCopy {
  readonly abbreviationLabel: string;
  readonly cardActionLabel: string;
  readonly capabilitiesAriaLabel: string;
  readonly codeLabel: string;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly itemsSectionAriaLabel: string;
  readonly loadingAriaLabel: string;
  readonly noDescription: string;
  readonly valueFormatLabel: string;
  readonly valueFormatSignedModifierLabel: string;
}

const fallbackLocale: StatLocale = 'en';

const statsPageCopy: Record<StatLocale, StatsPageCopy> = {
  en: {
    abbreviationLabel: 'Abbreviation',
    cardActionLabel: 'Open items',
    capabilitiesAriaLabel: 'Stats catalog capabilities',
    codeLabel: 'Code',
    emptyActionLabel: 'Open items',
    emptyDescription: 'The query completed, but the stats table returned no rows.',
    emptyTitle: 'No stats found',
    entityLabel: 'stats',
    errorDescription: 'The GraphQL router did not return the stats catalog.',
    errorTitle: 'Failed to load stats',
    explainerFooterNote:
      'Stats provide reusable modifier vocabulary; the numeric modifier value lives on the referencing item row.',
    explainerSummary: 'Stats show a reusable Revisium reference table behind item modifiers.',
    headerBadges: ['modifier vocabulary', 'stat FK target', 'signed values'],
    headerDescription:
      'Browse the shared vocabulary behind item modifiers, hero attributes, and combat effects.',
    headerEyebrow: 'Items codex',
    headerTitle: 'Stats',
    itemsSectionAriaLabel: 'Items section',
    loadingAriaLabel: 'Loading stats',
    noDescription: 'No description available.',
    valueFormatLabel: 'Value format',
    valueFormatSignedModifierLabel: 'Signed modifier',
  },
  ru: {
    abbreviationLabel: 'Аббревиатура',
    cardActionLabel: 'Открыть предметы',
    capabilitiesAriaLabel: 'Возможности каталога характеристик',
    codeLabel: 'Код',
    emptyActionLabel: 'Открыть предметы',
    emptyDescription: 'Запрос выполнен, но таблица характеристик не вернула строк.',
    emptyTitle: 'Характеристики не найдены',
    entityLabel: 'характеристик',
    errorDescription: 'GraphQL-роутер не вернул каталог характеристик.',
    errorTitle: 'Не удалось загрузить характеристики',
    explainerFooterNote:
      'Характеристики задают общий словарь модификаторов; числовое значение модификатора хранится в строке предмета, которая на них ссылается.',
    explainerSummary:
      'Характеристики показывают справочную таблицу Revisium, стоящую за модификаторами предметов.',
    headerBadges: ['словарь модификаторов', 'FK-цель stat', 'знаковые значения'],
    headerDescription:
      'Смотрите общий словарь для модификаторов предметов, атрибутов героев и боевых эффектов.',
    headerEyebrow: 'Кодекс предметов',
    headerTitle: 'Характеристики',
    itemsSectionAriaLabel: 'Раздел предметов',
    loadingAriaLabel: 'Загрузка характеристик',
    noDescription: 'Описание недоступно.',
    valueFormatLabel: 'Формат значения',
    valueFormatSignedModifierLabel: 'Знаковый модификатор',
  },
  zh: {
    abbreviationLabel: '缩写',
    cardActionLabel: '打开物品',
    capabilitiesAriaLabel: '属性目录能力',
    codeLabel: '代码',
    emptyActionLabel: '打开物品',
    emptyDescription: '查询已完成，但属性表没有返回行。',
    emptyTitle: '未找到属性',
    entityLabel: '个属性',
    errorDescription: 'GraphQL router 未返回属性目录。',
    errorTitle: '属性加载失败',
    explainerFooterNote: '属性提供可复用的 modifier 词汇；数值保存在引用它的物品行中。',
    explainerSummary: '属性展示物品 modifier 背后的 Revisium 参考表。',
    headerBadges: ['modifier 词汇', '属性 FK 目标', '带符号数值'],
    headerDescription: '浏览物品 modifier、英雄属性和战斗效果背后的共享词汇。',
    headerEyebrow: '物品图鉴',
    headerTitle: '属性',
    itemsSectionAriaLabel: '物品分区',
    loadingAriaLabel: '正在加载属性',
    noDescription: '暂无描述。',
    valueFormatLabel: '数值格式',
    valueFormatSignedModifierLabel: '带符号 modifier',
  },
};

export function getStatsPageCopy(locale: StatLocale): StatsPageCopy {
  return statsPageCopy[locale] ?? statsPageCopy[fallbackLocale];
}
