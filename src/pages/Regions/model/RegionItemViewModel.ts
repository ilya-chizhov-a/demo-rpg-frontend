import { makeAutoObservable } from 'mobx';

import { applyImageFallback, hasAppliedImageFallback } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { RegionNode } from '../api/RegionsDataSource';
import { prepareRegionCardCoverImage, type RegionCoverImageSlot } from './regionCoverImages';
import {
  getRegionCoverPlaceholderDescription,
  getRegionCoverPlaceholderTitle,
} from './regionUiCopy';

export type RegionLocale = SupportedLocale;

export class RegionItemViewModel {
  private isCoverImageLoadedState = false;
  private isCoverImageUnavailableState = false;

  constructor(
    private readonly node: RegionNode,
    private readonly getLocale: () => RegionLocale,
    private readonly getNoDescriptionCopy: () => string,
    private readonly getClimateLabel: (climate: string) => string,
  ) {
    makeAutoObservable<
      this,
      'node' | 'getLocale' | 'getNoDescriptionCopy' | 'getClimateLabel'
    >(this, {
      node: false,
      getLocale: false,
      getNoDescriptionCopy: false,
      getClimateLabel: false,
    }, { autoBind: true });
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

  public get climateLabel(): string {
    return this.getClimateLabel(this.climate);
  }

  public get coverImage(): RegionCoverImageSlot | null {
    return prepareRegionCardCoverImage(this.node.data.cover_image, this.title);
  }

  public get coverPlaceholderTitle(): string {
    return getRegionCoverPlaceholderTitle(this.getLocale());
  }

  public get coverPlaceholderDescription(): string {
    return getRegionCoverPlaceholderDescription(this.getLocale(), this.title);
  }

  public get isCoverImageLoaded(): boolean {
    return this.isCoverImageLoadedState;
  }

  public get isCoverImageUnavailable(): boolean {
    return this.isCoverImageUnavailableState;
  }

  public get publishedLabel(): string {
    return this.formatDate(this.node.publishedAt);
  }

  public get versionLabel(): string {
    return this.node.versionId.slice(0, 8);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.getLocale());
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.getLocale();
    return !this.node.data.name[locale] || !this.node.data.description[locale];
  }

  public handleCoverImageLoad(): void {
    this.isCoverImageLoadedState = true;
  }

  public handleCoverImageError(image: HTMLImageElement): void {
    if (hasAppliedImageFallback(image)) {
      this.isCoverImageLoadedState = false;
      this.isCoverImageUnavailableState = true;
      return;
    }

    this.isCoverImageLoadedState = false;
    const fallbackApplied = applyImageFallback(image);
    if (fallbackApplied === false) {
      this.isCoverImageUnavailableState = true;
    }
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
