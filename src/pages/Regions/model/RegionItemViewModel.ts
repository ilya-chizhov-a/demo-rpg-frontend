import { makeAutoObservable } from 'mobx';

import type { PreparedImageSlot } from 'src/shared/lib';
import type { SupportedLocale } from 'src/shared/model';
import type { RegionNode } from '../api/RegionsDataSource';
import { prepareRegionCardCoverImage } from './regionCoverImages';
import {
  getRegionCoverPlaceholderDescription,
  getRegionCoverPlaceholderTitle,
} from './regionUiCopy';

export type RegionLocale = SupportedLocale;

const localeNames: Record<RegionLocale, string> = {
  en: 'English',
  ru: 'Русский',
  zh: '中文',
};

export class RegionItemViewModel {
  constructor(
    private readonly node: RegionNode,
    private readonly getLocale: () => RegionLocale,
    private readonly getNoDescriptionCopy: () => string,
  ) {
    makeAutoObservable<this, 'node' | 'getLocale' | 'getNoDescriptionCopy'>(this, {
      node: false,
      getLocale: false,
      getNoDescriptionCopy: false,
    });
  }

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return `/regions/${this.node.id}`;
  }

  public get title(): string {
    return this.localized(this.node.data.name) || this.node.id;
  }

  public get description(): string {
    return this.localized(this.node.data.description) || this.getNoDescriptionCopy();
  }

  public get climate(): string {
    return this.node.data.climate;
  }

  public get coverImage(): PreparedImageSlot | null {
    return prepareRegionCardCoverImage(this.node.data.cover_image, this.title);
  }

  public get coverPlaceholderTitle(): string {
    return getRegionCoverPlaceholderTitle(this.getLocale());
  }

  public get coverPlaceholderDescription(): string {
    return getRegionCoverPlaceholderDescription(this.getLocale(), this.title);
  }

  public get publishedLabel(): string {
    return this.formatDate(this.node.publishedAt);
  }

  public get versionLabel(): string {
    return this.node.versionId.slice(0, 8);
  }

  public get localeLabel(): string {
    return localeNames[this.getLocale()];
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.getLocale();
    return !this.node.data.name[locale] || !this.node.data.description[locale];
  }

  private localized(value: Record<RegionLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.getLocale(), {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }
}
