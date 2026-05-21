import type { DialogNode } from '../api/DialogsDataSource';
import type { DialogLineDescriptor, DialogLocale, DialogsPageCopy } from './dialogsUiCopy';

type LocalizedDialogText = Record<DialogLocale, string>;

const visibleLineLimit = 3;

export class DialogItemViewModel {
  constructor(
    private readonly node: DialogNode,
    private readonly getLocale: () => DialogLocale,
    private readonly getCopy: () => DialogsPageCopy,
  ) {}

  public get id(): string {
    return this.node.id;
  }

  public get slug(): string {
    return this.node.data.slug;
  }

  public get title(): string {
    return this.slug.replaceAll('-', ' ').replace(/^\w/, (letter) => letter.toUpperCase());
  }

  public get npcTitle(): string {
    const npc = this.node.data.npc_id;
    const title = this.localized(npc.data.title);
    const name = this.localized(npc.data.name) || npc.data.display_label_en || npc.id;
    return title ? `${title} ${name}` : name;
  }

  public get npcHref(): string {
    return `/npcs/${this.node.data.npc_id.id}`;
  }

  public get lineCountLabel(): string {
    return this.formatNumber(this.node.data.line_count);
  }

  public get publishedLabel(): string {
    return this.formatDate(this.node.publishedAt);
  }

  public get versionLabel(): string {
    return this.node.versionId.slice(0, 8);
  }

  public get firstLineText(): string {
    return this.localized(this.node.data.lines[0]?.text) || this.copy.noLinesDescription;
  }

  public get visibleLines(): readonly DialogLineDescriptor[] {
    return this.node.data.lines.slice(0, visibleLineLimit).map((line, index) => ({
      emotionLabel: rawLabel(line.emotion),
      id: `${this.id}-${index}`,
      speakerLabel: rawLabel(line.speaker),
      text: this.localized(line.text) || this.copy.unknownValue,
    }));
  }

  public get hiddenLineCount(): number {
    return Math.max(0, this.node.data.lines.length - visibleLineLimit);
  }

  public get hasLines(): boolean {
    return this.node.data.lines.length > 0;
  }

  public get usesLocaleFallback(): boolean {
    return this.node.data.lines.some((line) => !line.text[this.locale]);
  }

  private get locale(): DialogLocale {
    return this.getLocale();
  }

  private get copy(): DialogsPageCopy {
    return this.getCopy();
  }

  private localized(value?: LocalizedDialogText): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.locale).format(value);
  }

  private formatDate(value: string | number | Date): string {
    return new Intl.DateTimeFormat(this.locale, { dateStyle: 'medium' }).format(new Date(value));
  }
}

function rawLabel(value: string): string {
  return value.replaceAll('_', ' ').replace(/^\w/, (letter) => letter.toUpperCase());
}
