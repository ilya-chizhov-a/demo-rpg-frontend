import { makeAutoObservable } from 'mobx';

import type { SupportedLocale } from 'src/shared/model';
import type { HeroNode } from '../api/HeroesDataSource';
import { getHeroDisplayName } from './heroDisplayName';
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
    return getHeroDisplayName({
      displayNameEn: this.node.data.display_name_en,
      epithet: this.node.data.epithet,
      fallbackId: this.node.id,
      locale: this.getLocale(),
      name: this.node.data.name,
    });
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
    return (
      !this.node.data.name[locale] ||
      (hasLocalizedValue(this.node.data.epithet) && !this.node.data.epithet[locale]) ||
      !this.node.data.class_id.data.name[locale]
    );
  }
}

function hasLocalizedValue(value: Record<HeroLocale, string>): boolean {
  return Object.values(value).some((candidate) => candidate.trim() !== '');
}
