import { getHeroDisplayName } from 'src/entities/Hero';
import type { PreparedImageSlot } from 'src/shared/lib';
import type { PartyDetailHeroNode } from '../api/PartyDetailDataSource';
import { preparePartyDetailHeroPortrait } from './partyImages';
import type { PartyLocale } from './PartyItemViewModel';

export class PartyDetailMemberViewModel {
  constructor(
    private readonly node: PartyDetailHeroNode,
    private readonly getLocale: () => PartyLocale,
    private readonly getUnknownHeroLabel: () => string,
  ) {}

  public get id(): string {
    return this.node.id;
  }

  public get href(): string {
    return `/heroes/${this.node.id}`;
  }

  public get title(): string {
    return this.displayName || this.getUnknownHeroLabel();
  }

  public get classTitle(): string {
    return this.localized(this.node.data.class_id.data.name) || this.node.data.class_id.id;
  }

  public get level(): number {
    return this.node.data.level;
  }

  public get isVeteran(): boolean {
    return this.node.data.is_veteran;
  }

  public get portraitImage(): PreparedImageSlot | null {
    return preparePartyDetailHeroPortrait(this.node.data.portrait, this.title);
  }

  private get displayName(): string {
    return getHeroDisplayName({
      displayNameEn: this.node.data.display_name_en,
      epithet: this.node.data.epithet,
      fallbackId: this.node.id,
      locale: this.getLocale(),
      name: this.node.data.name,
    });
  }

  private localized(value: Record<PartyLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }
}
