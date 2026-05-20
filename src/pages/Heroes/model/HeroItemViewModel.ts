import { makeAutoObservable } from 'mobx';

import type { SupportedLocale } from 'src/shared/model';
import type { HeroNode } from '../api/HeroesDataSource';
import { prepareHeroPortraitImage, type HeroPortraitImageSlot } from './heroImages';
import type { HeroesPageCopy } from './heroUiCopy';

export type HeroLocale = SupportedLocale;

export class HeroItemViewModel {
  constructor(
    private readonly node: HeroNode,
    private readonly getLocale: () => HeroLocale,
    private readonly getCopy: () => HeroesPageCopy,
  ) {
    makeAutoObservable<this, 'node' | 'getLocale' | 'getCopy'>(this, {
      node: false,
      getLocale: false,
      getCopy: false,
    });
  }

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return `/heroes/${this.node.id}`;
  }

  public get title(): string {
    return this.node.data.display_name_en || this.localized(this.node.data.name) || this.node.id;
  }

  public get description(): string {
    return this.getCopy().portraitPlaceholderDescription(this.title);
  }

  public get portraitImage(): HeroPortraitImageSlot | null {
    return prepareHeroPortraitImage(this.node.data.portrait, this.title);
  }

  public get openAriaLabel(): string {
    return this.getCopy().openHeroAriaLabel(this.title);
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.getLocale();
    return !this.node.data.name[locale] || !this.node.data.class_id.data.name[locale];
  }

  private localized(value: Record<HeroLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }

}
