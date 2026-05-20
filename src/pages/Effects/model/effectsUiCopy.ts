import type { EffectLocale } from './EffectItemViewModel';

export interface EffectsPageCopy {
  readonly cardActionLabel: string;
  readonly capabilitiesAriaLabel: string;
  readonly codeLabel: string;
  readonly defaultDurationLabel: string;
  readonly durationUnavailableLabel: string;
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
  readonly kindFieldLabel: string;
  readonly kindLabel: (value: string) => string;
  readonly loadingAriaLabel: string;
  readonly noDescription: string;
}

const fallbackLocale: EffectLocale = 'en';

type EffectsPageCopyData = Omit<EffectsPageCopy, 'kindLabel'>;

const effectsPageCopyData: Record<EffectLocale, EffectsPageCopyData> = {
  en: {
    cardActionLabel: 'Open items',
    capabilitiesAriaLabel: 'Effects catalog capabilities',
    codeLabel: 'Code',
    defaultDurationLabel: 'Default duration',
    durationUnavailableLabel: 'Not specified',
    emptyActionLabel: 'Open items',
    emptyDescription:
      'The effects seed data is not populated yet. Return to items while the reusable effect rows are prepared.',
    emptyTitle: 'No effects found',
    entityLabel: 'effects',
    errorDescription: 'The GraphQL router did not return the effects catalog.',
    errorTitle: 'Failed to load effects',
    explainerFooterNote:
      'Effects are reusable rows; consumer relationships will appear after the API exposes reverse links.',
    explainerSummary:
      'Effects show reusable modifier rows that other game entities can reference.',
    headerBadges: ['reusable modifiers', 'combat hooks', 'duration defaults'],
    headerDescription:
      'Browse reusable gameplay effects that can be attached to items, abilities, monsters, and quest rewards.',
    headerEyebrow: 'Items codex',
    headerTitle: 'Effects',
    itemsSectionAriaLabel: 'Items section',
    kindFieldLabel: 'Kind',
    loadingAriaLabel: 'Loading effects',
    noDescription: 'No description available.',
  },
  ru: {
    cardActionLabel: 'Открыть предметы',
    capabilitiesAriaLabel: 'Возможности каталога эффектов',
    codeLabel: 'Код',
    defaultDurationLabel: 'Длительность по умолчанию',
    durationUnavailableLabel: 'Не указано',
    emptyActionLabel: 'Открыть предметы',
    emptyDescription:
      'Сидовые данные эффектов пока не заполнены. Вернитесь к предметам, пока переиспользуемые строки эффектов готовятся.',
    emptyTitle: 'Эффекты не найдены',
    entityLabel: 'эффектов',
    errorDescription: 'GraphQL-роутер не вернул каталог эффектов.',
    errorTitle: 'Не удалось загрузить эффекты',
    explainerFooterNote:
      'Эффекты являются переиспользуемыми строками; связи с потребителями появятся, когда API отдаст обратные ссылки.',
    explainerSummary:
      'Эффекты показывают переиспользуемые строки модификаторов, на которые могут ссылаться игровые сущности.',
    headerBadges: ['переиспользуемые модификаторы', 'боевые зацепки', 'длительность по умолчанию'],
    headerDescription:
      'Смотрите переиспользуемые игровые эффекты для предметов, умений, монстров и наград квестов.',
    headerEyebrow: 'Кодекс предметов',
    headerTitle: 'Эффекты',
    itemsSectionAriaLabel: 'Раздел предметов',
    kindFieldLabel: 'Тип',
    loadingAriaLabel: 'Загрузка эффектов',
    noDescription: 'Описание недоступно.',
  },
  zh: {
    cardActionLabel: '打开物品',
    capabilitiesAriaLabel: '效果目录能力',
    codeLabel: '代码',
    defaultDurationLabel: '默认持续时间',
    durationUnavailableLabel: '未指定',
    emptyActionLabel: '打开物品',
    emptyDescription: '效果种子数据尚未填充。可先返回物品页，等待可复用效果行准备完成。',
    emptyTitle: '未找到效果',
    entityLabel: '个效果',
    errorDescription: 'GraphQL router 未返回效果目录。',
    errorTitle: '效果加载失败',
    explainerFooterNote: '效果是可复用行；API 暴露反向链接后会显示使用它们的实体。',
    explainerSummary: '效果展示其他游戏实体可以引用的可复用 modifier 行。',
    headerBadges: ['可复用 modifier', '战斗钩子', '默认持续时间'],
    headerDescription: '浏览可附加到物品、能力、怪物和任务奖励的可复用游戏效果。',
    headerEyebrow: '物品图鉴',
    headerTitle: '效果',
    itemsSectionAriaLabel: '物品分区',
    kindFieldLabel: '类型',
    loadingAriaLabel: '正在加载效果',
    noDescription: '暂无描述。',
  },
};

const effectKindLabels: Record<string, Record<EffectLocale, string>> = {
  aura: { en: 'Aura', ru: 'Аура', zh: '光环' },
  buff: { en: 'Buff', ru: 'Усиление', zh: '增益' },
  combat: { en: 'Combat', ru: 'Боевой', zh: '战斗' },
  crowd_control: { en: 'Crowd control', ru: 'Контроль', zh: '控制' },
  damage_over_time: { en: 'Damage over time', ru: 'Урон со временем', zh: '持续伤害' },
  debuff: { en: 'Debuff', ru: 'Ослабление', zh: '减益' },
  dot: { en: 'Damage over time', ru: 'Урон со временем', zh: '持续伤害' },
  heal: { en: 'Healing', ru: 'Лечение', zh: '治疗' },
  passive: { en: 'Passive', ru: 'Пассивный', zh: '被动' },
  stat_modifier: { en: 'Stat modifier', ru: 'Модификатор характеристики', zh: '属性 modifier' },
  utility: { en: 'Utility', ru: 'Утилитарный', zh: '功能' },
};

const effectsPageCopy = Object.fromEntries(
  Object.entries(effectsPageCopyData).map(([locale, copy]) => {
    const copyLocale = locale as EffectLocale;

    return [
      locale,
      {
        ...copy,
        kindLabel: (value: string) => getEffectKindLabel(value, copyLocale),
      },
    ];
  }),
) as Record<EffectLocale, EffectsPageCopy>;

export function getEffectsPageCopy(locale: EffectLocale): EffectsPageCopy {
  return effectsPageCopy[locale] ?? effectsPageCopy[fallbackLocale];
}

function getEffectKindLabel(value: string, locale: EffectLocale): string {
  const labels = effectKindLabels[value];
  return labels?.[locale] ?? labels?.[fallbackLocale] ?? formatRawKind(value);
}

function formatRawKind(value: string): string {
  return value
    .split(/[_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
