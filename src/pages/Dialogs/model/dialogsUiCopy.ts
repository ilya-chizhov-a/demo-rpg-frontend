import type { SupportedLocale } from 'src/shared/model';

export type DialogLocale = SupportedLocale;

type LocalizedText = Record<DialogLocale, string>;

export interface DialogLineDescriptor {
  readonly emotionLabel: string;
  readonly id: string;
  readonly speakerLabel: string;
  readonly text: string;
}

export interface DialogsPageCopy {
  readonly capabilitiesAriaLabel: string;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly entityLabel: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly explainerFooterNote: string;
  readonly explainerSummary: string;
  readonly fieldLineCount: string;
  readonly fieldNpc: string;
  readonly fieldPublished: string;
  readonly fieldSlug: string;
  readonly firstLineTitle: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly linePreviewTitle: string;
  readonly loadingAriaLabel: string;
  readonly loadingMoreLabel: string;
  readonly noLinesDescription: string;
  readonly noLinesTitle: string;
  readonly openNpcAction: string;
  readonly publishedLabel: string;
  readonly questsSectionAriaLabel: string;
  readonly retryActionLabel: string;
  readonly showMoreActionLabel: string;
  readonly toolbarDescription: string;
  readonly unknownValue: string;
  readonly versionLabel: string;
}

const fallbackLocale: DialogLocale = 'en';

const pageText = {
  capabilitiesAriaLabel: {
    en: 'Dialog catalog capabilities',
    ru: 'Возможности каталога диалогов',
    zh: '对话目录能力',
  },
  emptyActionLabel: { en: 'Open quests', ru: 'Открыть квесты', zh: '打开任务' },
  emptyDescription: {
    en: 'The dialog request completed, but no authored conversation rows are available yet.',
    ru: 'Запрос диалогов выполнен, но строк разговоров пока нет.',
    zh: '对话请求已完成，但暂时没有已编写的对话行。',
  },
  emptyTitle: { en: 'No dialogs found', ru: 'Диалоги не найдены', zh: '未找到对话' },
  entityLabel: { en: 'dialogs', ru: 'диалогов', zh: '个对话' },
  errorDescription: {
    en: 'The GraphQL router did not return the dialogs catalog.',
    ru: 'GraphQL-роутер не вернул каталог диалогов.',
    zh: 'GraphQL router 未返回对话目录。',
  },
  errorTitle: { en: 'Failed to load dialogs', ru: 'Не удалось загрузить диалоги', zh: '对话加载失败' },
  explainerFooterNote: {
    en: 'Dialog lines are inline rows on data.dialogs; speaker NPC data resolves through npc_id.',
    ru: 'Строки диалога лежат inline в data.dialogs; NPC говорящего раскрывается через npc_id.',
    zh: '对话行内嵌在 data.dialogs 中；说话 NPC 通过 npc_id 解析。',
  },
  explainerSummary: {
    en: 'Dialogs show localized conversation lines with the speaker NPC reference.',
    ru: 'Диалоги показывают локализованные реплики и ссылку на NPC говорящего.',
    zh: '对话展示本地化台词和说话 NPC 引用。',
  },
  fieldLineCount: { en: 'Lines', ru: 'Реплики', zh: '台词' },
  fieldNpc: { en: 'Speaker NPC', ru: 'NPC говорящий', zh: '说话 NPC' },
  fieldPublished: { en: 'Published', ru: 'Опубликовано', zh: '发布时间' },
  fieldSlug: { en: 'Slug', ru: 'Slug', zh: 'Slug' },
  firstLineTitle: { en: 'First line', ru: 'Первая реплика', zh: '第一句' },
  headerDescription: {
    en: 'Browse conversation rows that bind localized dialog lines to NPC speakers.',
    ru: 'Просматривайте строки разговоров, где локализованные реплики связаны с NPC.',
    zh: '浏览将本地化对话行绑定到 NPC 说话人的记录。',
  },
  headerEyebrow: { en: 'Quest codex', ru: 'Кодекс квестов', zh: '任务典籍' },
  headerTitle: { en: 'Dialogs', ru: 'Диалоги', zh: '对话' },
  linePreviewTitle: { en: 'Line preview', ru: 'Превью реплик', zh: '台词预览' },
  loadingAriaLabel: { en: 'Loading dialogs', ru: 'Загрузка диалогов', zh: '正在加载对话' },
  loadingMoreLabel: { en: 'Loading...', ru: 'Загрузка...', zh: '加载中...' },
  noLinesDescription: {
    en: 'This dialog row has no inline lines.',
    ru: 'У этой строки диалога нет inline-реплик.',
    zh: '此对话行没有内嵌台词。',
  },
  noLinesTitle: { en: 'No lines', ru: 'Нет реплик', zh: '没有台词' },
  openNpcAction: { en: 'Open NPC', ru: 'Открыть NPC', zh: '打开 NPC' },
  publishedLabel: { en: 'Published', ru: 'Опубликовано', zh: '发布时间' },
  questsSectionAriaLabel: { en: 'Quests section', ru: 'Раздел квестов', zh: '任务分区' },
  retryActionLabel: { en: 'Retry', ru: 'Повторить', zh: '重试' },
  showMoreActionLabel: { en: 'Load more', ru: 'Загрузить ещё', zh: '加载更多' },
  toolbarDescription: {
    en: 'Ordered by dialog slug so authored conversation chains stay easy to scan.',
    ru: 'Сортировка по slug помогает быстро просматривать цепочки разговоров.',
    zh: '按对话 slug 排序，便于浏览已编写的对话链。',
  },
  unknownValue: { en: 'Unknown', ru: 'Неизвестно', zh: '未知' },
  versionLabel: { en: 'Version', ru: 'Версия', zh: '版本' },
} satisfies Record<Exclude<keyof DialogsPageCopy, 'headerBadges'>, LocalizedText>;

const headerBadges = {
  en: ['data.dialogs', 'npc FK', 'localized lines', 'line_count'],
  ru: ['data.dialogs', 'FK NPC', 'локализованные реплики', 'line_count'],
  zh: ['data.dialogs', 'NPC FK', '本地化台词', 'line_count'],
} satisfies Record<DialogLocale, readonly string[]>;

export function getDialogsPageCopy(locale: DialogLocale): DialogsPageCopy {
  const text = (value: LocalizedText): string => value[locale] || value[fallbackLocale];

  return {
    capabilitiesAriaLabel: text(pageText.capabilitiesAriaLabel),
    emptyActionLabel: text(pageText.emptyActionLabel),
    emptyDescription: text(pageText.emptyDescription),
    emptyTitle: text(pageText.emptyTitle),
    entityLabel: text(pageText.entityLabel),
    errorDescription: text(pageText.errorDescription),
    errorTitle: text(pageText.errorTitle),
    explainerFooterNote: text(pageText.explainerFooterNote),
    explainerSummary: text(pageText.explainerSummary),
    fieldLineCount: text(pageText.fieldLineCount),
    fieldNpc: text(pageText.fieldNpc),
    fieldPublished: text(pageText.fieldPublished),
    fieldSlug: text(pageText.fieldSlug),
    firstLineTitle: text(pageText.firstLineTitle),
    headerBadges: headerBadges[locale] ?? headerBadges[fallbackLocale],
    headerDescription: text(pageText.headerDescription),
    headerEyebrow: text(pageText.headerEyebrow),
    headerTitle: text(pageText.headerTitle),
    linePreviewTitle: text(pageText.linePreviewTitle),
    loadingAriaLabel: text(pageText.loadingAriaLabel),
    loadingMoreLabel: text(pageText.loadingMoreLabel),
    noLinesDescription: text(pageText.noLinesDescription),
    noLinesTitle: text(pageText.noLinesTitle),
    openNpcAction: text(pageText.openNpcAction),
    publishedLabel: text(pageText.publishedLabel),
    questsSectionAriaLabel: text(pageText.questsSectionAriaLabel),
    retryActionLabel: text(pageText.retryActionLabel),
    showMoreActionLabel: text(pageText.showMoreActionLabel),
    toolbarDescription: text(pageText.toolbarDescription),
    unknownValue: text(pageText.unknownValue),
    versionLabel: text(pageText.versionLabel),
  };
}
