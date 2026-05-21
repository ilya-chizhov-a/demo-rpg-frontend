import { getLocaleNativeLabel } from 'src/shared/model';
import type { QuestNode } from '../api/QuestsDataSource';
import type { QuestLocale, QuestsPageCopy } from './questUiCopy';

type QuestCatalogStep = QuestNode['data']['steps'][number];
type LocalizedQuestText = Record<QuestLocale, string>;

export class QuestItemViewModel {
  constructor(
    private readonly node: QuestNode,
    private readonly getLocale: () => QuestLocale,
    private readonly getCopy: () => QuestsPageCopy,
  ) {}

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return `/quests/${this.id}`;
  }

  public get title(): string {
    return this.localized(this.node.data.name) || this.id;
  }

  public get description(): string {
    return this.localized(this.node.data.description) || this.copy.noDescription;
  }

  public get giverTitle(): string {
    const npc = this.node.data.giver_npc_id;
    return this.getNpcLabel(npc);
  }

  public get primaryLocationTitle(): string {
    const location = this.primaryStep?.location_id;
    if (!location) return this.copy.noLocationLabel;
    return this.localized(location.data.name) || location.id;
  }

  public get kindLabel(): string {
    return this.copy.kindLabel(this.node.data.kind);
  }

  public get levelLabel(): string {
    return this.formatNumber(this.node.data.level_required);
  }

  public get stepCountLabel(): string {
    return this.formatNumber(this.node.data.step_count);
  }

  public get totalXpLabel(): string {
    return this.formatNumber(this.node.data.total_xp);
  }

  public get repeatableLabel(): string {
    return this.node.data.is_repeatable ? this.copy.repeatableYesLabel : this.copy.repeatableNoLabel;
  }

  public get repeatableBadgePalette(): 'green' | 'gray' {
    return this.node.data.is_repeatable ? 'green' : 'gray';
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }

  private get primaryStep(): QuestCatalogStep | null {
    return [...this.node.data.steps].sort((left, right) => left.step_number - right.step_number)[0] ?? null;
  }

  private get locale(): QuestLocale {
    return this.getLocale();
  }

  private get copy(): QuestsPageCopy {
    return this.getCopy();
  }

  private getNpcLabel(npc: QuestNode['data']['giver_npc_id']): string {
    const title = this.localized(npc.data.title);
    const name = this.localized(npc.data.name) || npc.data.display_label_en || npc.id;
    return title ? `${title} ${name}` : name;
  }

  private localized(value: LocalizedQuestText): string {
    return value[this.locale] || value.en;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.locale).format(value);
  }
}
