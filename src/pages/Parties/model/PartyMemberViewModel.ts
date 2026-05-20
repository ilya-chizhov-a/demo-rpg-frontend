import { getHeroDisplayName } from 'src/entities/Hero';
import type { PreparedImageSlot } from 'src/shared/lib';
import type { PartyHeroNode } from '../api/PartiesDataSource';
import { preparePartyHeroAvatar } from './partyImages';
import type { PartyLocale } from './PartyItemViewModel';

export class PartyMemberViewModel {
  constructor(
    private readonly node: PartyHeroNode,
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

  public get avatarImage(): PreparedImageSlot | null {
    return preparePartyHeroAvatar(this.node.data.portrait, this.title);
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
}
