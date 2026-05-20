import { makeAutoObservable } from 'mobx';

import type { PreparedImageSlot } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { AbilityNode } from '../api/AbilitiesDataSource';
import { prepareAbilityIconImage } from './abilityImages';

export type AbilityLocale = SupportedLocale;

export class AbilityItemViewModel {
  constructor(
    private readonly node: AbilityNode,
    private readonly getLocale: () => AbilityLocale,
    private readonly getNoDescriptionCopy: () => string,
    private readonly getZeroCooldownCopy: () => string,
  ) {
    makeAutoObservable<
      this,
      'node' | 'getLocale' | 'getNoDescriptionCopy' | 'getZeroCooldownCopy'
    >(
      this,
      {
        getLocale: false,
        getNoDescriptionCopy: false,
        getZeroCooldownCopy: false,
        node: false,
      },
      { autoBind: true },
    );
  }

  public get id(): string {
    return this.node.id;
  }

  public get title(): string {
    return this.localized(this.node.data.name) || this.node.id;
  }

  public get description(): string {
    return this.localized(this.node.data.description) || this.getNoDescriptionCopy();
  }

  public get iconImage(): PreparedImageSlot | null {
    return prepareAbilityIconImage(this.node.data.icon, this.title);
  }

  public get kind(): string {
    return this.node.data.kind;
  }

  public get school(): string {
    return this.node.data.school;
  }

  public get levelLabel(): string {
    return new Intl.NumberFormat(this.getLocale()).format(this.node.data.level_required);
  }

  public get damageLabel(): string {
    const value = this.node.data.base_damage;
    const formatted = new Intl.NumberFormat(this.getLocale(), {
      maximumFractionDigits: 0,
      signDisplay: value < 0 ? 'always' : 'auto',
    }).format(value);
    return formatted;
  }

  public get cooldownLabel(): string {
    if (this.node.data.cooldown === 0) return this.getZeroCooldownCopy();
    return new Intl.NumberFormat(this.getLocale()).format(this.node.data.cooldown);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.getLocale());
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.getLocale();
    return !this.node.data.name[locale] || !this.node.data.description[locale];
  }

  private localized(value: Record<AbilityLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }
}
