import { makeAutoObservable } from 'mobx';

import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { ClassNode } from '../api/ClassesDataSource';

export type ClassLocale = SupportedLocale;

export class ClassItemViewModel {
  constructor(
    private readonly node: ClassNode,
    private readonly getLocale: () => ClassLocale,
    private readonly getLevelUnitCopy: () => string,
    private readonly getNoDescriptionCopy: () => string,
  ) {
    makeAutoObservable<
      this,
      'node' | 'getLocale' | 'getLevelUnitCopy' | 'getNoDescriptionCopy'
    >(this, {
      node: false,
      getLocale: false,
      getLevelUnitCopy: false,
      getNoDescriptionCopy: false,
    });
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

  public get primaryStat(): string {
    return this.node.data.primary_stat;
  }

  public get baseHpLabel(): string {
    return String(this.node.data.base_hp);
  }

  public get hpPerLevelLabel(): string {
    return `+${this.node.data.hp_per_level}/${this.getLevelUnitCopy()}`;
  }

  public get mpPerLevelLabel(): string {
    return `+${this.node.data.mp_per_level}/${this.getLevelUnitCopy()}`;
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.getLocale());
  }

  public get heroesHref(): string {
    return `/heroes?class=${encodeURIComponent(this.node.id)}`;
  }

  private localized(value: Record<ClassLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }
}
