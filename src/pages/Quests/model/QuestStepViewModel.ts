import type { PreparedImageSlot } from 'src/shared/lib';
import type { QuestDetailRewardNode, QuestDetailStepNode } from '../api/QuestDetailDataSource';
import { prepareQuestStepImage } from './questImages';
import type { QuestDetailCopy, QuestLocale } from './questUiCopy';

type LocalizedQuestText = Record<QuestLocale, string>;

export interface QuestRewardDescriptor {
  readonly bonusXpLabel: string;
  readonly href: string;
  readonly id: string;
  readonly itemTypeTitle: string;
  readonly marketValueLabel: string;
  readonly quantityLabel: string;
  readonly rarityLabel: string;
  readonly title: string;
}

export class QuestStepViewModel {
  constructor(
    private readonly step: QuestDetailStepNode,
    private readonly index: number,
    private readonly getLocale: () => QuestLocale,
    private readonly getCopy: () => QuestDetailCopy,
  ) {}

  public get id(): string {
    return `${this.step.step_number}-${this.index}`;
  }

  public get title(): string {
    return this.copy.stepTitle(this.formatNumber(this.step.step_number));
  }

  public get description(): string {
    return this.localized(this.step.description) || this.copy.unknownValue;
  }

  public get image(): PreparedImageSlot | null {
    return prepareQuestStepImage(this.step.image, this.title);
  }

  public get imagePlaceholderDescription(): string {
    return this.copy.imagePlaceholderDescription(this.title);
  }

  public get imageFileName(): string {
    return this.fallback(this.step.image.fileName);
  }

  public get imageDimensionsLabel(): string {
    const width = this.formatNumber(this.step.image.width);
    const height = this.formatNumber(this.step.image.height);
    return `${width} x ${height}`;
  }

  public get imageStatus(): string {
    return this.fallback(this.step.image.status);
  }

  public get locationTitle(): string {
    return this.localized(this.step.location_id.data.name) || this.step.location_id.id;
  }

  public get locationHref(): string {
    return `/locations/${this.step.location_id.id}`;
  }

  public get npcTitle(): string {
    return this.getNpcLabel(this.step.npc_id);
  }

  public get npcHref(): string {
    return `/npcs/${this.step.npc_id.id}`;
  }

  public get xpLabel(): string {
    return this.formatNumber(this.step.xp);
  }

  public get rewards(): readonly QuestRewardDescriptor[] {
    return this.step.rewards.map((reward, rewardIndex) =>
      this.createRewardDescriptor(reward, rewardIndex),
    );
  }

  public get hasRewards(): boolean {
    return this.rewards.length > 0;
  }

  private get locale(): QuestLocale {
    return this.getLocale();
  }

  private get copy(): QuestDetailCopy {
    return this.getCopy();
  }

  private createRewardDescriptor(
    reward: QuestDetailRewardNode,
    rewardIndex: number,
  ): QuestRewardDescriptor {
    return {
      bonusXpLabel: this.formatNumber(reward.bonus_xp),
      href: `/items/${reward.item_id.id}`,
      id: `${reward.item_id.id}-${rewardIndex}`,
      itemTypeTitle:
        this.localized(reward.item_id.data.type_id.data.name) ||
        reward.item_id.data.type_id.data.code,
      marketValueLabel: this.formatNumber(reward.item_id.data.market_value),
      quantityLabel: this.formatNumber(reward.quantity),
      rarityLabel: rawLabel(reward.item_id.data.rarity_tag || reward.item_id.data.rarity),
      title: this.localized(reward.item_id.data.name) || reward.item_id.id,
    };
  }

  private getNpcLabel(npc: QuestDetailStepNode['npc_id']): string {
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

  private fallback(value: string): string {
    return value.trim() || this.copy.unknownValue;
  }
}

function rawLabel(value: string): string {
  return value.replaceAll('_', ' ').replace(/^\w/, (letter) => letter.toUpperCase());
}
