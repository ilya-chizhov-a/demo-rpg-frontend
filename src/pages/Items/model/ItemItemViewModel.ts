import type { PreparedImageSlot } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { ItemNode } from '../api/ItemsDataSource';
import { prepareItemIconImage } from './itemImages';
import type { ItemsPageCopy } from './itemUiCopy';

export type ItemLocale = SupportedLocale;

export interface ItemModifierDescriptor {
  readonly id: string;
  readonly label: string;
  readonly valueLabel: string;
}

export class ItemItemViewModel {
  constructor(
    private readonly node: ItemNode,
    private readonly getLocale: () => ItemLocale,
    private readonly getCopy: () => ItemsPageCopy,
  ) {}

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return `/items/${this.id}`;
  }

  public get title(): string {
    return this.localized(this.node.data.name) || this.node.id;
  }

  public get description(): string {
    return this.localized(this.node.data.description) || this.getCopy().noDescription;
  }

  public get typeTitle(): string {
    return this.localized(this.node.data.type_id.data.name) || this.getCopy().unknownTypeLabel;
  }

  public get rarity(): string {
    return this.node.data.rarity;
  }

  public get rarityLabel(): string {
    return this.getCopy().rarityLabel(this.node.data.rarity);
  }

  public get rarityTag(): string {
    return this.node.data.rarity_tag;
  }

  public get marketValueLabel(): string {
    return this.formatNumber(this.node.data.market_value);
  }

  public get baseValueLabel(): string {
    return this.formatNumber(this.node.data.base_value);
  }

  public get weightLabel(): string {
    return this.formatNumber(this.node.data.weight);
  }

  public get iconImage(): PreparedImageSlot | null {
    return prepareItemIconImage(this.node.data.icon, this.title);
  }

  public get modifierSummary(): string {
    const count = this.node.data.modifiers.length;
    if (count === 0) return this.getCopy().noModifiersLabel;
    return this.getCopy().modifierLabel(count);
  }

  public get modifierBadges(): readonly ItemModifierDescriptor[] {
    return this.node.data.modifiers.slice(0, 3).map((modifier) => ({
      id: modifier.stat_id.id,
      label:
        this.localized(modifier.stat_id.data.name) ||
        modifier.stat_id.data.abbreviation ||
        modifier.stat_id.data.code,
      valueLabel: this.formatModifierValue(modifier.value),
    }));
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.getLocale());
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.getLocale();
    return !this.node.data.name[locale] || !this.node.data.description[locale];
  }

  private localized(value: Record<ItemLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.getLocale(), {
      maximumFractionDigits: 1,
    }).format(value);
  }

  private formatModifierValue(value: number): string {
    return new Intl.NumberFormat(this.getLocale(), {
      maximumFractionDigits: 1,
      signDisplay: 'exceptZero',
    }).format(value);
  }
}
