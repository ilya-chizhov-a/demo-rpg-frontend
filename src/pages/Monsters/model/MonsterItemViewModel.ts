import { makeAutoObservable } from 'mobx';

import type { PreparedImageSlot } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { MonsterNode } from '../api/MonstersDataSource';
import { prepareMonsterCardImage } from './monsterImages';

export type MonsterLocale = SupportedLocale;

const MONSTER_ITEM_OBSERVABLES = {
  getLocale: false,
  getNoDescriptionCopy: false,
  node: false,
} as const;

export class MonsterItemViewModel {
  constructor(
    private readonly node: MonsterNode,
    private readonly getLocale: () => MonsterLocale,
    private readonly getNoDescriptionCopy: () => string,
  ) {
    makeAutoObservable<this, keyof typeof MONSTER_ITEM_OBSERVABLES>(
      this,
      MONSTER_ITEM_OBSERVABLES,
      { autoBind: true },
    );
  }

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return this.createDetailHref(this.node.id);
  }

  public get title(): string {
    return this.localized(this.node.data.name) || this.node.id;
  }

  public get description(): string {
    return this.localized(this.node.data.description) || this.getNoDescriptionCopy();
  }

  public get kind(): string {
    return this.node.data.kind;
  }

  public get factionId(): string {
    return this.node.data.faction_id.id;
  }

  public get factionTitle(): string {
    return this.localized(this.node.data.faction_id.data.name) || this.factionId;
  }

  public get factionHref(): string {
    return `/factions/${this.factionId}`;
  }

  public get image(): PreparedImageSlot | null {
    return prepareMonsterCardImage(this.node.data.image, this.title);
  }

  public get levelLabel(): string {
    return this.formatNumber(this.node.data.level);
  }

  public get hpLabel(): string {
    return this.formatNumber(this.node.data.hp);
  }

  public get baseDamageLabel(): string {
    return this.formatNumber(this.node.data.base_damage);
  }

  public get dropCountLabel(): string {
    return this.formatNumber(this.node.data.drop_count);
  }

  public get avgDropChanceLabel(): string {
    return this.formatChance(this.node.data.avg_drop_chance);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }

  public get searchText(): string {
    return [
      this.title,
      this.description,
      this.kind,
      this.factionTitle,
      this.node.data.faction_id.data.alignment,
    ]
      .join(' ')
      .toLocaleLowerCase(this.locale);
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.locale;
    return (
      !this.node.data.name[locale] ||
      !this.node.data.description[locale] ||
      !this.node.data.faction_id.data.name[locale]
    );
  }

  private get locale(): MonsterLocale {
    return this.getLocale();
  }

  private createDetailHref(id: string): string {
    return `/monsters/${id}`;
  }

  private localized(value: Record<MonsterLocale, string>): string {
    return value[this.locale] || value.en;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
    }).format(value);
  }

  private formatChance(value: number): string {
    const normalized = Math.abs(value) > 1 ? value / 100 : value;
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
      style: 'percent',
    }).format(normalized);
  }
}
