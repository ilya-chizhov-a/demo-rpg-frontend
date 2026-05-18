import type { ClassLocale } from './ClassItemViewModel';

export interface ClassesPageCopy {
  readonly capabilitiesAriaLabel: string;
  readonly cardActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly fieldBaseHp: string;
  readonly fieldHpGrowth: string;
  readonly fieldMpGrowth: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly heroesSectionAriaLabel: string;
  readonly levelUnit: string;
  readonly loadingAriaLabel: string;
  readonly noDescription: string;
}

const fallbackLocale: ClassLocale = 'en';

const classesPageCopy: Record<ClassLocale, ClassesPageCopy> = {
  en: {
    capabilitiesAriaLabel: 'Capabilities',
    cardActionLabel: 'Filter heroes',
    emptyDescription: 'The query completed, but the classes table returned no rows.',
    emptyTitle: 'No classes found',
    entityLabel: 'classes',
    errorDescription: 'The GraphQL router did not return the classes catalog.',
    errorTitle: 'Failed to load classes',
    explainerFooterNote:
      'This page reads the generated GraphQL connection and shows a small FK target table used by heroes.',
    explainerSummary:
      'Classes show a small Revisium reference table used as a foreign-key target by heroes.',
    fieldBaseHp: 'Base HP',
    fieldHpGrowth: 'HP growth',
    fieldMpGrowth: 'MP growth',
    headerBadges: ['class list', 'hero roles', 'stat growth'],
    headerDescription: 'Compact class profiles for comparing hero roles, base stats, and growth paths.',
    headerEyebrow: 'Hero codex',
    headerTitle: 'Classes',
    heroesSectionAriaLabel: 'Heroes section',
    levelUnit: 'level',
    loadingAriaLabel: 'Loading classes',
    noDescription: 'No description available.',
  },
  ru: {
    capabilitiesAriaLabel: 'Возможности',
    cardActionLabel: 'Фильтровать героев',
    emptyDescription: 'Запрос выполнен, но таблица классов не вернула строк.',
    emptyTitle: 'Классы не найдены',
    entityLabel: 'классов',
    errorDescription: 'GraphQL-роутер не вернул каталог классов.',
    errorTitle: 'Не удалось загрузить классы',
    explainerFooterNote:
      'Страница читает сгенерированный GraphQL connection и показывает небольшую FK-таблицу, которую используют герои.',
    explainerSummary:
      'Классы показывают небольшую справочную таблицу Revisium, используемую героями как FK-цель.',
    fieldBaseHp: 'Базовое HP',
    fieldHpGrowth: 'Рост HP',
    fieldMpGrowth: 'Рост MP',
    headerBadges: ['список классов', 'роли героев', 'рост характеристик'],
    headerDescription:
      'Компактные профили классов для сравнения ролей героев, базовых статов и роста.',
    headerEyebrow: 'Кодекс героев',
    headerTitle: 'Классы',
    heroesSectionAriaLabel: 'Раздел героев',
    levelUnit: 'уровень',
    loadingAriaLabel: 'Загрузка классов',
    noDescription: 'Описание недоступно.',
  },
  zh: {
    capabilitiesAriaLabel: '能力',
    cardActionLabel: '筛选英雄',
    emptyDescription: '查询已完成，但职业表没有返回行。',
    emptyTitle: '未找到职业',
    entityLabel: '个职业',
    errorDescription: 'GraphQL router 未返回职业目录。',
    errorTitle: '职业加载失败',
    explainerFooterNote: '此页面读取生成的 GraphQL connection，并展示英雄使用的小型 FK 目标表。',
    explainerSummary: '职业展示英雄作为外键目标使用的小型 Revisium 参考表。',
    fieldBaseHp: '基础 HP',
    fieldHpGrowth: 'HP 成长',
    fieldMpGrowth: 'MP 成长',
    headerBadges: ['职业列表', '英雄定位', '属性成长'],
    headerDescription: '用于比较英雄定位、基础属性和成长路径的紧凑职业档案。',
    headerEyebrow: '英雄 codex',
    headerTitle: '职业',
    heroesSectionAriaLabel: '英雄分区',
    levelUnit: '等级',
    loadingAriaLabel: '正在加载职业',
    noDescription: '暂无描述。',
  },
};

export function getClassesPageCopy(locale: ClassLocale): ClassesPageCopy {
  return classesPageCopy[locale] ?? classesPageCopy[fallbackLocale];
}
