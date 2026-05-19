import { makeAutoObservable } from 'mobx';

import type { PreparedImageSlot } from 'src/shared/lib';
import { getLocaleNativeLabel, type SupportedLocale } from 'src/shared/model';
import type { LocationNode } from '../api/LocationsDataSource';
import {
  prepareLocationCardMapImage,
  prepareLocationGalleryThumbnail,
  type LocationImageSlot,
} from './locationImages';

export type LocationLocale = SupportedLocale;

export class LocationItemViewModel {
  constructor(
    private readonly node: LocationNode,
    private readonly getLocale: () => LocationLocale,
    private readonly getNoDescriptionCopy: () => string,
  ) {
    makeAutoObservable<this, 'node' | 'getLocale' | 'getNoDescriptionCopy'>(
      this,
      {
        node: false,
        getLocale: false,
        getNoDescriptionCopy: false,
      },
      { autoBind: true },
    );
  }

  public get id(): string {
    return this.node.id;
  }

  public get detailHref(): string {
    return `/locations/${this.node.id}`;
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

  public get regionId(): string {
    return this.node.data.region_id.id;
  }

  public get regionTitle(): string {
    return this.localized(this.node.data.region_id.data.name) || this.regionId;
  }

  public get regionClimate(): string {
    return this.node.data.region_id.data.climate;
  }

  public get regionHref(): string {
    return `/regions/${this.regionId}`;
  }

  public get mapImage(): LocationImageSlot | null {
    return prepareLocationCardMapImage(this.node.data.map, this.title);
  }

  public get galleryPreviewImages(): readonly PreparedImageSlot[] {
    return this.node.data.gallery
      .slice(0, 3)
      .map((image, index) => prepareLocationGalleryThumbnail(image, this.title, index))
      .filter((image): image is PreparedImageSlot => image !== null);
  }

  public get galleryCount(): number {
    return this.node.data.gallery.length;
  }

  public get coordinatesLabel(): string {
    const { x, y } = this.node.data.coordinates;
    return `${this.formatCoordinate(x)}, ${this.formatCoordinate(y)}`;
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
    return (
      !this.node.data.name[locale] ||
      !this.node.data.description[locale] ||
      !this.node.data.region_id.data.name[locale]
    );
  }

  private localized(value: Record<LocationLocale, string>): string {
    return value[this.getLocale()] || value.en;
  }

  private formatCoordinate(value: number): string {
    return new Intl.NumberFormat(this.getLocale(), {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    }).format(value);
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.getLocale(), {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }
}
