import { makeAutoObservable } from 'mobx';

import type { PreparedImageSlot } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { NpcNode } from '../api/NpcsDataSource';
import { prepareNpcPortraitImage } from './npcImages';

export type NpcLocale = SupportedLocale;

export class NpcItemViewModel {
  constructor(
    private readonly node: NpcNode,
    private readonly getLocale: () => NpcLocale,
    private readonly getNoDescriptionCopy: () => string,
  ) {
    makeAutoObservable<this, 'node' | 'getLocale' | 'getNoDescriptionCopy'>(
      this,
      {
        getLocale: false,
        getNoDescriptionCopy: false,
        node: false,
      },
      { autoBind: true },
    );
  }

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return `/npcs/${this.node.id}`;
  }

  public get title(): string {
    return this.displayTitle || this.node.id;
  }

  public get description(): string {
    return this.localized(this.node.data.description) || this.getNoDescriptionCopy();
  }

  public get role(): string {
    return this.node.data.role;
  }

  public get locationId(): string {
    return this.node.data.location_id.id;
  }

  public get locationTitle(): string {
    return this.localized(this.node.data.location_id.data.name) || this.locationId;
  }

  public get locationHref(): string {
    return `/locations/${this.locationId}`;
  }

  public get portraitImage(): PreparedImageSlot | null {
    return prepareNpcPortraitImage(this.node.data.portrait, this.title);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.getLocale());
  }

  public get searchText(): string {
    return [
      this.title,
      this.localized(this.node.data.name),
      this.localized(this.node.data.title),
      this.locationTitle,
      this.role,
    ]
      .join(' ')
      .toLocaleLowerCase(this.getLocale());
  }

  public get usesLocaleFallback(): boolean {
    const locale = this.getLocale();
    return (
      !this.node.data.name[locale] ||
      !this.node.data.title[locale] ||
      !this.node.data.description[locale] ||
      !this.node.data.location_id.data.name[locale]
    );
  }

  private get displayTitle(): string {
    const displayLabelEn = this.node.data.display_label_en.trim();
    if (this.getLocale() === 'en' && displayLabelEn) return displayLabelEn;

    const title = this.localized(this.node.data.title);
    const name = this.localized(this.node.data.name);
    if (this.getLocale() === 'zh') return `${title}${name}`.trim();
    return [title, name].filter(Boolean).join(' ');
  }

  private localized(value: Record<NpcLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }
}
