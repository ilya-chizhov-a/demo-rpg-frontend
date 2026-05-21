import type { SearchDomain, SearchTableId } from '../api/SearchDataSource';

export type SearchLocale = 'en' | 'ru' | 'zh';

interface SearchGroupCopy {
  readonly title: string;
  readonly resultLabel: string;
}

export interface SearchPageCopy {
  readonly clearActionLabel: string;
  readonly cmsDomainLabel: string;
  readonly dataDomainLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly loadingAriaLabel: string;
  readonly metadataLabel: string;
  readonly noResultsActionLabel: string;
  readonly noResultsDescription: string;
  readonly noResultsTitle: string;
  readonly openResultActionLabel: string;
  readonly openSourceActionLabel: string;
  readonly retryActionLabel: string;
  readonly resultGroupsAriaLabel: string;
  readonly resultOverflowLabel: (count: number) => string;
  readonly resultSummaryLabel: (visibleCount: number, totalCount: number) => string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly searchSubmitLabel: string;
  readonly snippetFallbackLabel: string;
  readonly sourceLabel: string;
  readonly tableLabel: (tableId: SearchTableId) => SearchGroupCopy;
  readonly domainLabel: (domain: SearchDomain) => string;
}

const tableLabels: Record<SearchTableId, Record<SearchLocale, SearchGroupCopy>> = {
  abilities: {
    en: { resultLabel: 'abilities', title: 'Abilities' },
    ru: { resultLabel: 'умений', title: 'Умения' },
    zh: { resultLabel: '能力', title: '能力' },
  },
  blogAuthors: {
    en: { resultLabel: 'authors', title: 'CMS authors' },
    ru: { resultLabel: 'авторов', title: 'CMS-авторы' },
    zh: { resultLabel: '作者', title: 'CMS 作者' },
  },
  blogPosts: {
    en: { resultLabel: 'guides', title: 'Guides' },
    ru: { resultLabel: 'гайдов', title: 'Гайды' },
    zh: { resultLabel: '指南', title: '指南' },
  },
  classes: {
    en: { resultLabel: 'classes', title: 'Classes' },
    ru: { resultLabel: 'классов', title: 'Классы' },
    zh: { resultLabel: '职业', title: '职业' },
  },
  dialogs: {
    en: { resultLabel: 'dialogs', title: 'Dialogs' },
    ru: { resultLabel: 'диалогов', title: 'Диалоги' },
    zh: { resultLabel: '对话', title: '对话' },
  },
  effects: {
    en: { resultLabel: 'effects', title: 'Effects' },
    ru: { resultLabel: 'эффектов', title: 'Эффекты' },
    zh: { resultLabel: '效果', title: '效果' },
  },
  factions: {
    en: { resultLabel: 'factions', title: 'Factions' },
    ru: { resultLabel: 'фракций', title: 'Фракции' },
    zh: { resultLabel: '阵营', title: '阵营' },
  },
  heroes: {
    en: { resultLabel: 'heroes', title: 'Heroes' },
    ru: { resultLabel: 'героев', title: 'Герои' },
    zh: { resultLabel: '英雄', title: '英雄' },
  },
  itemTypes: {
    en: { resultLabel: 'item types', title: 'Item types' },
    ru: { resultLabel: 'типов предметов', title: 'Типы предметов' },
    zh: { resultLabel: '物品类型', title: '物品类型' },
  },
  items: {
    en: { resultLabel: 'items', title: 'Items' },
    ru: { resultLabel: 'предметов', title: 'Предметы' },
    zh: { resultLabel: '物品', title: '物品' },
  },
  landingFeatures: {
    en: { resultLabel: 'home features', title: 'Home features' },
    ru: { resultLabel: 'блоков главной', title: 'Блоки главной' },
    zh: { resultLabel: '首页功能', title: '首页功能' },
  },
  landingHero: {
    en: { resultLabel: 'home heroes', title: 'Home hero' },
    ru: { resultLabel: 'hero-блоков', title: 'Hero главной' },
    zh: { resultLabel: '首页主视觉', title: '首页主视觉' },
  },
  landingTestimonials: {
    en: { resultLabel: 'testimonials', title: 'Testimonials' },
    ru: { resultLabel: 'отзывов', title: 'Отзывы' },
    zh: { resultLabel: '评价', title: '评价' },
  },
  locations: {
    en: { resultLabel: 'locations', title: 'Locations' },
    ru: { resultLabel: 'локаций', title: 'Локации' },
    zh: { resultLabel: '地点', title: '地点' },
  },
  monsters: {
    en: { resultLabel: 'monsters', title: 'Monsters' },
    ru: { resultLabel: 'монстров', title: 'Монстры' },
    zh: { resultLabel: '怪物', title: '怪物' },
  },
  npcs: {
    en: { resultLabel: 'NPCs', title: 'NPCs' },
    ru: { resultLabel: 'NPC', title: 'NPC' },
    zh: { resultLabel: 'NPC', title: 'NPC' },
  },
  parties: {
    en: { resultLabel: 'parties', title: 'Parties' },
    ru: { resultLabel: 'отрядов', title: 'Отряды' },
    zh: { resultLabel: '队伍', title: '队伍' },
  },
  quests: {
    en: { resultLabel: 'quests', title: 'Quests' },
    ru: { resultLabel: 'квестов', title: 'Квесты' },
    zh: { resultLabel: '任务', title: '任务' },
  },
  regions: {
    en: { resultLabel: 'regions', title: 'Regions' },
    ru: { resultLabel: 'регионов', title: 'Регионы' },
    zh: { resultLabel: '区域', title: '区域' },
  },
  stats: {
    en: { resultLabel: 'stats', title: 'Stats' },
    ru: { resultLabel: 'характеристик', title: 'Характеристики' },
    zh: { resultLabel: '属性', title: '属性' },
  },
};

const copyByLocale: Record<SearchLocale, Omit<SearchPageCopy, 'domainLabel' | 'tableLabel'>> = {
  en: {
    clearActionLabel: 'Clear',
    cmsDomainLabel: 'CMS',
    dataDomainLabel: 'Data',
    emptyDescription: 'Enter a query to search data rows and CMS content. No fake examples here.',
    emptyTitle: 'Search the codex',
    errorDescription: 'The GraphQL router did not return the grouped search response.',
    errorTitle: 'Search failed',
    explainerFooterNote:
      'GraphQL returns matching rows; the frontend derives snippets until a compact search payload exists.',
    explainerSummary: 'Search shows lookup across data and CMS JSON fields.',
    headerBadges: ['data + cms', 'client JSON scan', 'grouped results'],
    headerDescription:
      'Search heroes, items, monsters, quests, world rows, and CMS guide content from one route.',
    headerEyebrow: 'Global discovery',
    headerTitle: 'Search',
    loadingAriaLabel: 'Loading search results',
    metadataLabel: 'Updated',
    noResultsActionLabel: 'Clear search',
    noResultsDescription: 'The search completed, but no data or CMS table returned matches.',
    noResultsTitle: 'No matches',
    openResultActionLabel: 'Open result',
    openSourceActionLabel: 'Open source row',
    retryActionLabel: 'Retry',
    resultGroupsAriaLabel: 'Search result groups',
    resultOverflowLabel: (count) => `${count} more in source table`,
    resultSummaryLabel: (visibleCount, totalCount) =>
      `Showing ${visibleCount} of ${totalCount} matched rows`,
    searchLabel: 'Search query',
    searchPlaceholder: 'Hero, item, quest, guide...',
    searchSubmitLabel: 'Search',
    snippetFallbackLabel: 'Returned by full-text JSON search.',
    sourceLabel: 'Source',
  },
  ru: {
    clearActionLabel: 'Сбросить',
    cmsDomainLabel: 'CMS',
    dataDomainLabel: 'Data',
    emptyDescription:
      'Введите запрос, чтобы искать по строкам данных и CMS-контенту. Без фейковых примеров.',
    emptyTitle: 'Поиск по кодексу',
    errorDescription: 'GraphQL-роутер не вернул сгруппированный ответ поиска.',
    errorTitle: 'Поиск не удался',
    explainerFooterNote:
      'GraphQL возвращает найденные строки; frontend выводит сниппеты, пока нет компактного search payload.',
    explainerSummary: 'Поиск показывает lookup по JSON-полям data и CMS.',
    headerBadges: ['data + cms', 'client JSON scan', 'группы результатов'],
    headerDescription:
      'Ищите героев, предметы, монстров, квесты, строки мира и CMS-гайды из одного маршрута.',
    headerEyebrow: 'Глобальное обнаружение',
    headerTitle: 'Поиск',
    loadingAriaLabel: 'Загрузка результатов поиска',
    metadataLabel: 'Обновлено',
    noResultsActionLabel: 'Сбросить поиск',
    noResultsDescription: 'Поиск выполнен, но ни одна data или CMS-таблица не вернула совпадений.',
    noResultsTitle: 'Совпадений нет',
    openResultActionLabel: 'Открыть результат',
    openSourceActionLabel: 'Открыть строку',
    retryActionLabel: 'Повторить',
    resultGroupsAriaLabel: 'Группы результатов поиска',
    resultOverflowLabel: (count) => `Ещё в исходной таблице: ${count}`,
    resultSummaryLabel: (visibleCount, totalCount) =>
      `Показано ${visibleCount} из ${totalCount} найденных строк`,
    searchLabel: 'Поисковый запрос',
    searchPlaceholder: 'Герой, предмет, квест, гайд...',
    searchSubmitLabel: 'Искать',
    snippetFallbackLabel: 'Строка найдена full-text поиском по JSON.',
    sourceLabel: 'Источник',
  },
  zh: {
    clearActionLabel: '清除',
    cmsDomainLabel: 'CMS',
    dataDomainLabel: 'Data',
    emptyDescription: '输入查询以搜索数据行和 CMS 内容。这里不放虚构示例。',
    emptyTitle: '搜索 codex',
    errorDescription: 'GraphQL router 没有返回分组搜索响应。',
    errorTitle: '搜索失败',
    explainerFooterNote:
      'GraphQL 返回匹配行；在紧凑搜索 payload 可用前，frontend 会派生摘要片段。',
    explainerSummary: '搜索展示 data 和 CMS JSON 字段查询。',
    headerBadges: ['data + cms', 'client JSON scan', '分组结果'],
    headerDescription: '从一个路线搜索英雄、物品、怪物、任务、世界行和 CMS 指南内容。',
    headerEyebrow: '全局发现',
    headerTitle: '搜索',
    loadingAriaLabel: '正在加载搜索结果',
    metadataLabel: '更新于',
    noResultsActionLabel: '清除搜索',
    noResultsDescription: '搜索已完成，但 data 和 CMS 表都没有返回匹配项。',
    noResultsTitle: '没有匹配',
    openResultActionLabel: '打开结果',
    openSourceActionLabel: '打开源行',
    retryActionLabel: '重试',
    resultGroupsAriaLabel: '搜索结果分组',
    resultOverflowLabel: (count) => `源表中还有 ${count} 条`,
    resultSummaryLabel: (visibleCount, totalCount) =>
      `显示 ${visibleCount} / ${totalCount} 条匹配行`,
    searchLabel: '搜索查询',
    searchPlaceholder: '英雄、物品、任务、指南...',
    searchSubmitLabel: '搜索',
    snippetFallbackLabel: '由 JSON 全文搜索返回。',
    sourceLabel: '来源',
  },
};

export function getSearchPageCopy(locale: SearchLocale): SearchPageCopy {
  const copy = copyByLocale[locale];
  return {
    ...copy,
    domainLabel: (domain) => (domain === 'cms' ? copy.cmsDomainLabel : copy.dataDomainLabel),
    tableLabel: (tableId) => tableLabels[tableId][locale],
  };
}
