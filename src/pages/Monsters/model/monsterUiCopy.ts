import type { MonsterLocale } from './MonsterItemViewModel';

export interface MonsterDetailCopy {
  readonly abilitiesEmptyDescription: string;
  readonly abilitiesEmptyTitle: string;
  readonly abilitiesTitle: string;
  readonly abilityCatalogAction: string;
  readonly abilityCooldownLabel: string;
  readonly abilityDamageLabel: string;
  readonly abilityKindLabel: string;
  readonly abilityLevelLabel: string;
  readonly abilitySchoolLabel: string;
  readonly backAriaLabel: string;
  readonly backLabel: string;
  readonly computedBadge: string;
  readonly dropsEmptyDescription: string;
  readonly dropsEmptyTitle: string;
  readonly dropsTitle: string;
  readonly dropChanceLabel: string;
  readonly dropItemTypeLabel: string;
  readonly dropMarketValueLabel: string;
  readonly dropQuantityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly factsTitle: string;
  readonly fieldBaseDamage: string;
  readonly fieldFaction: string;
  readonly fieldFileDimensions: string;
  readonly fieldFileHash: string;
  readonly fieldFileMimeType: string;
  readonly fieldFileName: string;
  readonly fieldFileSize: string;
  readonly fieldFileStatus: string;
  readonly fieldHp: string;
  readonly fieldKind: string;
  readonly fieldLevel: string;
  readonly fieldLocale: string;
  readonly fieldPublished: string;
  readonly fieldVersion: string;
  readonly fileMetadataTitle: string;
  readonly formulasTitle: string;
  readonly imagePlaceholderDescription: (monsterTitle: string) => string;
  readonly imagePlaceholderTitle: string;
  readonly notFoundDescription: string;
  readonly notFoundTitle: string;
  readonly openFactionAction: string;
  readonly unknownValue: string;
}

export interface MonstersPageCopy {
  readonly allFactionsButton: string;
  readonly avgDropChanceLabel: string;
  readonly baseDamageLabel: string;
  readonly capabilitiesAriaLabel: string;
  readonly cardOpenAction: string;
  readonly detail: MonsterDetailCopy;
  readonly dropCountLabel: string;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly factionButtonsAriaLabel: string;
  readonly factionLabel: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly hpLabel: string;
  readonly imagePlaceholderDescription: (monsterTitle: string) => string;
  readonly imagePlaceholderTitle: string;
  readonly kindLabel: (value: string) => string;
  readonly levelLabel: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly noDescription: string;
  readonly rarityLabel: (value: string) => string;
  readonly rawLabel: (value: string) => string;
  readonly resetFiltersActionLabel: string;
  readonly retryActionLabel: string;
  readonly searchLabel: string;
  readonly searchPlaceholder: string;
  readonly showMoreActionLabel: string;
}

const fallbackLocale: MonsterLocale = 'en';

type LocalizedText = Record<MonsterLocale, string>;

const headerBadges = {
  en: ['faction FK', 'embedded drops', 'formula counters', 'image file'],
  ru: ['FK фракции', 'вложенная добыча', 'формулы', 'изображение'],
  zh: ['阵营 FK', '内嵌掉落', '公式计数', '图片文件'],
} satisfies Record<MonsterLocale, readonly string[]>;

const pageText = {
  allFactionsButton: { en: 'All factions', ru: 'Все фракции', zh: '全部阵营' },
  avgDropChanceLabel: { en: 'Avg. drop chance', ru: 'Средний шанс', zh: '平均掉率' },
  baseDamageLabel: { en: 'Damage', ru: 'Урон', zh: '伤害' },
  capabilitiesAriaLabel: { en: 'Capabilities', ru: 'Возможности', zh: '能力' },
  cardOpenAction: { en: 'Open monster', ru: 'Открыть монстра', zh: '打开怪物' },
  dropCountLabel: { en: 'Drops', ru: 'Добыча', zh: '掉落' },
  emptyActionLabel: { en: 'Reset filters', ru: 'Сбросить фильтры', zh: '重置筛选' },
  emptyDescription: {
    en: 'The monster query returned no rows for the current filters.',
    ru: 'Запрос монстров не вернул строк для текущих фильтров.',
    zh: '当前筛选下怪物查询没有返回行。',
  },
  emptyTitle: { en: 'No monsters found', ru: 'Монстры не найдены', zh: '未找到怪物' },
  entityLabel: { en: 'monsters', ru: 'монстров', zh: '个怪物' },
  errorDescription: {
    en: 'The GraphQL router did not return the monsters catalog.',
    ru: 'GraphQL-роутер не вернул каталог монстров.',
    zh: 'GraphQL router 未返回怪物目录。',
  },
  errorTitle: {
    en: 'Failed to load monsters',
    ru: 'Не удалось загрузить монстров',
    zh: '怪物加载失败',
  },
  explainerFooterNote: {
    en: 'The catalog filters by faction FK on the server and searches localized text in the ViewModel.',
    ru: 'Каталог фильтруется по FK фракции на сервере, а локализованный поиск живёт во ViewModel.',
    zh: '目录在服务端按阵营 FK 筛选，并在 ViewModel 中搜索本地化文本。',
  },
  explainerSummary: {
    en: 'Monsters show embedded drop arrays, formulas over arrays, faction foreign keys, and image file fields.',
    ru: 'Монстры показывают вложенные массивы добычи, формулы по массивам, FK фракций и image file fields.',
    zh: '怪物展示内嵌掉落数组、数组公式、阵营外键和图片文件字段。',
  },
  factionButtonsAriaLabel: {
    en: 'Filter monsters by faction',
    ru: 'Фильтровать монстров по фракции',
    zh: '按阵营筛选怪物',
  },
  factionLabel: { en: 'Faction', ru: 'Фракция', zh: '阵营' },
  headerDescription: {
    en: 'Track enemies by faction, combat profile, illustration, and computed drop metrics.',
    ru: 'Отслеживайте врагов по фракциям, боевому профилю, иллюстрациям и вычисленным метрикам добычи.',
    zh: '按阵营、战斗资料、插图和计算掉落指标追踪敌人。',
  },
  headerEyebrow: { en: 'Bestiary', ru: 'Бестиарий', zh: '怪物图鉴' },
  headerTitle: { en: 'Monsters', ru: 'Монстры', zh: '怪物' },
  hpLabel: { en: 'HP', ru: 'HP', zh: '生命' },
  imagePlaceholderTitle: { en: 'Image unavailable', ru: 'Изображение недоступно', zh: '图片不可用' },
  levelLabel: { en: 'Level', ru: 'Уровень', zh: '等级' },
  loadingAriaLabel: { en: 'Loading monsters', ru: 'Загрузка монстров', zh: '正在加载怪物' },
  loadingMoreLabel: { en: 'Loading...', ru: 'Загрузка...', zh: '加载中...' },
  noDescription: { en: 'No description available.', ru: 'Описание недоступно.', zh: '暂无描述。' },
  resetFiltersActionLabel: { en: 'Reset', ru: 'Сбросить', zh: '重置' },
  retryActionLabel: { en: 'Retry', ru: 'Повторить', zh: '重试' },
  searchLabel: { en: 'Search', ru: 'Поиск', zh: '搜索' },
  searchPlaceholder: {
    en: 'Name, kind, faction, or description',
    ru: 'Имя, тип, фракция или описание',
    zh: '名称、类型、阵营或描述',
  },
  showMoreActionLabel: { en: 'Load more', ru: 'Загрузить ещё', zh: '加载更多' },
} satisfies Record<Exclude<keyof MonstersPageCopy, FunctionKeys<MonstersPageCopy> | 'detail' | 'headerBadges'>, LocalizedText>;

const detailText = {
  abilitiesEmptyDescription: {
    en: 'This monster has no resolved abilities in the current row.',
    ru: 'В текущей строке монстра нет разрешённых умений.',
    zh: '当前怪物行没有解析出的能力。',
  },
  abilitiesEmptyTitle: { en: 'No abilities', ru: 'Умений нет', zh: '暂无能力' },
  abilitiesTitle: { en: 'Abilities', ru: 'Умения', zh: '能力' },
  abilityCatalogAction: { en: 'Open abilities', ru: 'Открыть умения', zh: '打开能力' },
  abilityCooldownLabel: { en: 'Cooldown', ru: 'Откат', zh: '冷却' },
  abilityDamageLabel: { en: 'Damage', ru: 'Урон', zh: '伤害' },
  abilityKindLabel: { en: 'Kind', ru: 'Тип', zh: '类型' },
  abilityLevelLabel: { en: 'Required level', ru: 'Уровень', zh: '需求等级' },
  abilitySchoolLabel: { en: 'School', ru: 'Школа', zh: '学派' },
  backAriaLabel: { en: 'Back to monsters catalog', ru: 'Вернуться к каталогу монстров', zh: '返回怪物目录' },
  backLabel: { en: 'Back to monsters', ru: 'Назад к монстрам', zh: '返回怪物' },
  computedBadge: { en: 'computed', ru: 'вычислено', zh: '计算值' },
  dropsEmptyDescription: {
    en: 'No embedded drop rows are present for this monster.',
    ru: 'У этого монстра нет вложенных строк добычи.',
    zh: '此怪物没有内嵌掉落行。',
  },
  dropsEmptyTitle: { en: 'No drops', ru: 'Добычи нет', zh: '暂无掉落' },
  dropsTitle: { en: 'Drops', ru: 'Добыча', zh: '掉落' },
  dropChanceLabel: { en: 'Chance', ru: 'Шанс', zh: '几率' },
  dropItemTypeLabel: { en: 'Type', ru: 'Тип', zh: '类型' },
  dropMarketValueLabel: { en: 'Market value', ru: 'Рыночная цена', zh: '市场价值' },
  dropQuantityLabel: { en: 'Quantity', ru: 'Количество', zh: '数量' },
  errorDescription: {
    en: 'The GraphQL router did not return this monster. Check the URL or return to the catalog.',
    ru: 'GraphQL-роутер не вернул этого монстра. Проверьте URL или вернитесь в каталог.',
    zh: 'GraphQL router 未返回此怪物。请检查 URL 或返回目录。',
  },
  errorTitle: { en: 'Monster unavailable', ru: 'Монстр недоступен', zh: '怪物不可用' },
  explainerFooterNote: {
    en: 'Ability detail routes are not in the inventory yet, so resolved ability rows link back to the abilities catalog.',
    ru: 'Detail-маршрутов умений пока нет в inventory, поэтому разрешённые умения ведут в каталог умений.',
    zh: '能力详情路线尚未进入清单，因此解析出的能力行会回到能力目录。',
  },
  explainerSummary: {
    en: 'Monster detail combines array FKs, embedded drops, formulas over arrays, and a PNG illustration file.',
    ru: 'Detail монстра объединяет массив FK, вложенную добычу, формулы по массивам и PNG-иллюстрацию.',
    zh: '怪物详情组合了数组 FK、内嵌掉落、数组公式和 PNG 插图文件。',
  },
  factsTitle: { en: 'Monster facts', ru: 'Факты монстра', zh: '怪物信息' },
  fieldBaseDamage: { en: 'Base damage', ru: 'Базовый урон', zh: '基础伤害' },
  fieldFaction: { en: 'Faction', ru: 'Фракция', zh: '阵营' },
  fieldFileDimensions: { en: 'Image dimensions', ru: 'Размер изображения', zh: '图片尺寸' },
  fieldFileHash: { en: 'Image hash', ru: 'Хэш изображения', zh: '图片哈希' },
  fieldFileMimeType: { en: 'Image MIME type', ru: 'MIME-тип изображения', zh: '图片 MIME 类型' },
  fieldFileName: { en: 'Image file', ru: 'Файл изображения', zh: '图片文件' },
  fieldFileSize: { en: 'Image size', ru: 'Размер файла', zh: '图片大小' },
  fieldFileStatus: { en: 'Image status', ru: 'Статус файла', zh: '图片状态' },
  fieldHp: { en: 'HP', ru: 'HP', zh: '生命' },
  fieldKind: { en: 'Kind', ru: 'Тип', zh: '类型' },
  fieldLevel: { en: 'Level', ru: 'Уровень', zh: '等级' },
  fieldLocale: { en: 'Locale', ru: 'Язык', zh: '语言' },
  fieldPublished: { en: 'Published', ru: 'Опубликовано', zh: '发布时间' },
  fieldVersion: { en: 'Version', ru: 'Версия', zh: '版本' },
  fileMetadataTitle: { en: 'Image metadata', ru: 'Метаданные изображения', zh: '图片元数据' },
  formulasTitle: { en: 'Drop formulas', ru: 'Формулы добычи', zh: '掉落公式' },
  imagePlaceholderTitle: { en: 'Image unavailable', ru: 'Изображение недоступно', zh: '图片不可用' },
  notFoundDescription: {
    en: 'No monster row matched this route id.',
    ru: 'По этому route id не нашлось строки монстра.',
    zh: '没有怪物行匹配此路线 id。',
  },
  notFoundTitle: { en: 'Monster not found', ru: 'Монстр не найден', zh: '未找到怪物' },
  openFactionAction: { en: 'Open faction', ru: 'Открыть фракцию', zh: '打开阵营' },
  unknownValue: { en: 'Unknown', ru: 'Неизвестно', zh: '未知' },
} satisfies Record<Exclude<keyof MonsterDetailCopy, FunctionKeys<MonsterDetailCopy>>, LocalizedText>;

const imagePlaceholderDescription = {
  en: (monsterTitle: string) => `No illustration is available for ${monsterTitle}.`,
  ru: (monsterTitle: string) => `Для ${monsterTitle} нет иллюстрации.`,
  zh: (monsterTitle: string) => `${monsterTitle} 暂无插图。`,
} satisfies Record<MonsterLocale, (monsterTitle: string) => string>;

const kindLabels = {
  aberration: { en: 'Aberration', ru: 'Аберрация', zh: '异怪' },
  beast: { en: 'Beast', ru: 'Зверь', zh: '野兽' },
  construct: { en: 'Construct', ru: 'Конструкт', zh: '构装体' },
  demon: { en: 'Demon', ru: 'Демон', zh: '恶魔' },
  dragon: { en: 'Dragon', ru: 'Дракон', zh: '龙' },
  elemental: { en: 'Elemental', ru: 'Элементаль', zh: '元素' },
  humanoid: { en: 'Humanoid', ru: 'Гуманоид', zh: '类人生物' },
  plant: { en: 'Plant', ru: 'Растение', zh: '植物' },
  undead: { en: 'Undead', ru: 'Нежить', zh: '亡灵' },
} satisfies Record<string, LocalizedText>;

const rarityLabels = {
  common: { en: 'Common', ru: 'Обычный', zh: '普通' },
  epic: { en: 'Epic', ru: 'Эпический', zh: '史诗' },
  legendary: { en: 'Legendary', ru: 'Легендарный', zh: '传奇' },
  rare: { en: 'Rare', ru: 'Редкий', zh: '稀有' },
  uncommon: { en: 'Uncommon', ru: 'Необычный', zh: '优秀' },
} satisfies Record<string, LocalizedText>;

type FunctionKeys<T> = {
  [Key in keyof T]: T[Key] extends (...args: infer _Args) => unknown ? Key : never;
}[keyof T];

const pageCopy = Object.fromEntries(
  (Object.keys(pageText.allFactionsButton) as MonsterLocale[]).map((locale) => [
    locale,
    {
      ...localizedRecord(pageText, locale),
      detail: {
        ...localizedRecord(detailText, locale),
        imagePlaceholderDescription: imagePlaceholderDescription[locale],
      },
      headerBadges: headerBadges[locale],
      imagePlaceholderDescription: imagePlaceholderDescription[locale],
      kindLabel: (value: string) => getLocalizedDictionaryLabel(kindLabels, value, locale),
      rarityLabel: (value: string) => getLocalizedDictionaryLabel(rarityLabels, value, locale),
      rawLabel: (value: string) => formatRawLabel(value),
    },
  ]),
) as unknown as Record<MonsterLocale, MonstersPageCopy>;

export function getMonstersPageCopy(locale: MonsterLocale): MonstersPageCopy {
  return pageCopy[locale] ?? pageCopy[fallbackLocale];
}

function localizedRecord<TRecord extends Record<string, LocalizedText>>(
  source: TRecord,
  locale: MonsterLocale,
): { readonly [Key in keyof TRecord]: string } {
  return Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key, value[locale] ?? value[fallbackLocale]]),
  ) as { readonly [Key in keyof TRecord]: string };
}

function getLocalizedDictionaryLabel(
  source: Record<string, LocalizedText>,
  value: string,
  locale: MonsterLocale,
): string {
  const normalized = value.trim().toLowerCase().replaceAll(/[-\s]+/g, '_');
  const labels = source[normalized];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? formatRawLabel(value);
}

function formatRawLabel(value: string): string {
  return value
    .replaceAll(/[-_]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
