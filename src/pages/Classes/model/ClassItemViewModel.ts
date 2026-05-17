import { makeAutoObservable } from 'mobx';

import type { SupportedLocale } from 'src/shared/model';
import type { ClassNode } from '../api/ClassesDataSource';

export type ClassLocale = SupportedLocale;

const localeNames: Record<ClassLocale, string> = {
  en: 'English',
  ru: 'Русский',
  zh: '中文',
};

export class ClassItemViewModel {
  constructor(
    private readonly node: ClassNode,
    private readonly getLocale: () => ClassLocale,
  ) {
    makeAutoObservable<this, 'node' | 'getLocale'>(this, {
      node: false,
      getLocale: false,
    });
  }

  public get id(): string {
    return this.node.id;
  }

  public get title(): string {
    return this.localized(this.node.data.name) || this.node.id;
  }

  public get description(): string {
    return this.localized(this.node.data.description) || 'No description available.';
  }

  public get primaryStat(): string {
    return this.node.data.primary_stat;
  }

  public get baseHpLabel(): string {
    return String(this.node.data.base_hp);
  }

  public get hpPerLevelLabel(): string {
    return `+${this.node.data.hp_per_level}/level`;
  }

  public get mpPerLevelLabel(): string {
    return `+${this.node.data.mp_per_level}/level`;
  }

  public get localeLabel(): string {
    return localeNames[this.getLocale()];
  }

  public get heroesHref(): string {
    return `/heroes?class=${encodeURIComponent(this.node.id)}`;
  }

  private localized(value: Record<ClassLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }
}
