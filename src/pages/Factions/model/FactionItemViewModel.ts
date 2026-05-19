import { makeAutoObservable } from 'mobx';

import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { FactionNode } from '../api/FactionsDataSource';
import { prepareFactionCrestImage, type FactionCrestImageSlot } from './factionImages';

export type FactionLocale = SupportedLocale;

export class FactionItemViewModel {
  constructor(
    private readonly node: FactionNode,
    private readonly getLocale: () => FactionLocale,
    private readonly getNoDescriptionCopy: () => string,
    private readonly getAlignmentLabel: (alignment: string) => string,
  ) {
    makeAutoObservable<
      this,
      'node' | 'getLocale' | 'getNoDescriptionCopy' | 'getAlignmentLabel'
    >(this, {
      node: false,
      getLocale: false,
      getNoDescriptionCopy: false,
      getAlignmentLabel: false,
    });
  }

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return `/factions/${this.node.id}`;
  }

  public get title(): string {
    return this.localized(this.node.data.name) || this.node.id;
  }

  public get description(): string {
    return this.localized(this.node.data.description) || this.getNoDescriptionCopy();
  }

  public get alignment(): string {
    return this.node.data.alignment;
  }

  public get alignmentLabel(): string {
    return this.getAlignmentLabel(this.alignment);
  }

  public get crestImage(): FactionCrestImageSlot | null {
    return prepareFactionCrestImage(this.node.data.crest, this.title);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.getLocale());
  }

  public get publishedLabel(): string {
    return this.formatDate(this.node.publishedAt);
  }

  public get versionLabel(): string {
    return this.node.versionId.slice(0, 8);
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.getLocale();
    return !this.node.data.name[locale] || !this.node.data.description[locale];
  }

  private localized(value: Record<FactionLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.getLocale(), {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }
}
