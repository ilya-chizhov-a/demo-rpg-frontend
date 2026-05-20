import type { ItemTypeLocale } from './ItemTypeItemViewModel';

export interface ItemTypesPageCopy {
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
  readonly itemsCountLabel: string;
  readonly itemsCountUnavailableLabel: string;
  readonly itemsSectionAriaLabel: string;
  readonly loadingAriaLabel: string;
  readonly noDescription: string;
}

const fallbackLocale: ItemTypeLocale = 'en';

const itemTypesPageCopy: Record<ItemTypeLocale, ItemTypesPageCopy> = {
  en: {
    cardActionLabel: 'Open items',
    capabilitiesAriaLabel: 'Item type catalog capabilities',
    codeLabel: 'Code',
    emptyActionLabel: 'Open items',
    emptyDescription: 'The query completed, but the item types table returned no rows.',
    emptyTitle: 'No item types found',
    entityLabel: 'item types',
    errorDescription: 'The GraphQL router did not return the item types catalog.',
    errorTitle: 'Failed to load item types',
    explainerFooterNote:
      'Item type rows are the taxonomy behind the item catalog and item detail type links.',
    explainerSummary:
      'Item Types show the Revisium taxonomy used by item cards and detail pages.',
    headerBadges: ['taxonomy', 'type FK target', 'localized labels'],
    headerDescription:
      'Browse the item taxonomy used to group weapons, armor, consumables, and quest objects.',
    headerEyebrow: 'Items codex',
    headerTitle: 'Item Types',
    itemsCountLabel: 'Items count',
    itemsCountUnavailableLabel: 'Not exposed by API',
    itemsSectionAriaLabel: 'Items section',
    loadingAriaLabel: 'Loading item types',
    noDescription: 'No description available.',
  },
  ru: {
    cardActionLabel: 'Открыть предметы',
    capabilitiesAriaLabel: 'Возможности каталога типов предметов',
    codeLabel: 'Код',
    emptyActionLabel: 'Открыть предметы',
    emptyDescription: 'Запрос выполнен, но таблица типов предметов не вернула строк.',
    emptyTitle: 'Типы предметов не найдены',
    entityLabel: 'типов предметов',
    errorDescription: 'GraphQL-роутер не вернул каталог типов предметов.',
    errorTitle: 'Не удалось загрузить типы предметов',
    explainerFooterNote:
      'Строки типов предметов задают таксономию, которую используют каталог предметов и ссылки типа в detail.',
    explainerSummary:
      'Типы предметов показывают таксономию Revisium, которую используют карточки и детальные страницы предметов.',
    headerBadges: ['таксономия', 'FK-цель типа', 'локализованные labels'],
    headerDescription:
      'Смотрите таксономию предметов для группировки оружия, брони, расходников и квестовых объектов.',
    headerEyebrow: 'Кодекс предметов',
    headerTitle: 'Типы предметов',
    itemsCountLabel: 'Количество предметов',
    itemsCountUnavailableLabel: 'API не отдаёт поле',
    itemsSectionAriaLabel: 'Раздел предметов',
    loadingAriaLabel: 'Загрузка типов предметов',
    noDescription: 'Описание недоступно.',
  },
  zh: {
    cardActionLabel: '打开物品',
    capabilitiesAriaLabel: '物品类型目录能力',
    codeLabel: '代码',
    emptyActionLabel: '打开物品',
    emptyDescription: '查询已完成，但物品类型表没有返回行。',
    emptyTitle: '未找到物品类型',
    entityLabel: '个物品类型',
    errorDescription: 'GraphQL router 未返回物品类型目录。',
    errorTitle: '物品类型加载失败',
    explainerFooterNote: '物品类型行是物品目录和详情页类型链接背后的分类体系。',
    explainerSummary: '物品类型展示物品卡片和详情页使用的 Revisium 分类体系。',
    headerBadges: ['分类', '类型 FK 目标', '本地化标签'],
    headerDescription: '浏览用于组织武器、护甲、消耗品和任务物品的物品分类。',
    headerEyebrow: '物品图鉴',
    headerTitle: '物品类型',
    itemsCountLabel: '物品数量',
    itemsCountUnavailableLabel: 'API 未公开字段',
    itemsSectionAriaLabel: '物品分区',
    loadingAriaLabel: '正在加载物品类型',
    noDescription: '暂无描述。',
  },
};

export function getItemTypesPageCopy(locale: ItemTypeLocale): ItemTypesPageCopy {
  return itemTypesPageCopy[locale] ?? itemTypesPageCopy[fallbackLocale];
}
