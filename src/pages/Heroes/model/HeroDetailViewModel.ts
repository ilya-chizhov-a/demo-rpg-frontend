import { makeAutoObservable } from 'mobx';

import type { IViewModel } from 'src/shared/config';
import { container, hasRequestError, isInitialLoading } from 'src/shared/lib';
import { getLocaleNativeLabel, LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import { HeroDetailDataSource, type HeroDetailNode } from '../api/HeroDetailDataSource';
import {
  getHeroPortraitMetadata,
  prepareHeroDetailPortraitImage,
  type HeroPortraitImageSlot,
} from './heroImages';
import { getHeroDisplayName } from './heroDisplayName';
import type { HeroLocale } from './HeroItemViewModel';
import { getHeroesPageCopy, type HeroDetailCopy, type HeroesPageCopy } from './heroUiCopy';

export interface HeroDetailFactDescriptor {
  readonly label: string;
  readonly value: string;
}

export interface HeroDetailRelatedFactDescriptor {
  readonly label: string;
  readonly value: string;
}

export interface HeroDetailRelatedItemDescriptor {
  readonly badges: readonly string[];
  readonly facts: readonly HeroDetailRelatedFactDescriptor[];
  readonly href?: string;
  readonly id: string;
  readonly subtitle: string;
  readonly title: string;
}

// Keep this explainer copy aligned with src/pages/Heroes/api/HeroDetail.graphql.
const HERO_DETAIL_QUERY = `query HeroDetail($id: String!) {
  heroes(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      ability_ids {
        id
        data {
          base_damage
          cooldown
          damage_scaling
          kind
          level_required
          name { en ru zh }
          school
        }
      }
      class_id {
        id
        data {
          base_hp
          hp_per_level
          mp_per_level
          name { en ru zh }
          primary_stat
        }
      }
      constitution
      display_name_en
      equipment {
        item_id {
          id
          data {
            market_value
            name { en ru zh }
            rarity
            rarity_tag
            weight
          }
        }
        modifier
        slot
      }
      equipped_count
      epithet { en ru zh }
      gold
      inventory_item_ids {
        id
        data {
          market_value
          name { en ru zh }
          rarity
          rarity_tag
          type_id { id data { name { en ru zh } } }
          weight
        }
      }
      is_veteran
      level
      name { en ru zh }
      portrait { fileId fileName hash height mimeType url width }
      total_equipment_modifier
    }
  }
}`;

export class HeroDetailViewModel implements IViewModel {
  private readonly cloudHeroesBaseHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/heroes';
  public id = '';

  constructor(
    public readonly dataSource: HeroDetailDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoObservable<this, 'localeService'>(
      this,
      {
        localeService: false,
      },
      { autoBind: true },
    );
  }

  public setup(id?: unknown): void {
    this.id = typeof id === 'string' ? id : '';
  }

  public async mount(): Promise<void> {
    const skipInitialLoad =
      !this.id || this.dataSource.request.isLoading || this.dataSource.request.isLoaded;
    if (skipInitialLoad) return;
    await this.load();
  }

  public unmount(): void {
    this.dataSource.reset();
  }

  public get item(): HeroDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return getHeroDisplayName({
      displayNameEn: this.item?.data.display_name_en,
      epithet: this.item?.data.epithet,
      fallbackId: this.id,
      locale: this.locale,
      name: this.item?.data.name,
    });
  }

  public get epithet(): string {
    return this.localized(this.item?.data.epithet) || this.copy.noEpithet;
  }

  public get classLabel(): string {
    return this.localized(this.item?.data.class_id.data.name) || this.copy.unknownClass;
  }

  public get levelLabel(): string {
    return this.copy.levelLabel(this.formatNumber(this.item?.data.level));
  }

  public get veteranBadgeLabel(): string | null {
    return this.item?.data.is_veteran ? this.copy.veteranLabel : null;
  }

  public get portraitImage(): HeroPortraitImageSlot | null {
    if (!this.item) return null;
    return prepareHeroDetailPortraitImage(this.item.data.portrait, this.title);
  }

  public get portraitPlaceholderDescription(): string {
    return this.copy.portraitPlaceholderDescription(this.title);
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }

  public get facts(): readonly HeroDetailFactDescriptor[] {
    return [
      { label: this.detailCopy.fieldDisplayName, value: this.title },
      {
        label: this.detailCopy.fieldLocalizedName,
        value: this.localized(this.item?.data.name) || this.unknownValue,
      },
      { label: this.detailCopy.fieldClass, value: this.classLabel },
      { label: this.detailCopy.fieldLevel, value: this.levelLabel },
      {
        label: this.detailCopy.fieldGold,
        value: this.copy.goldLabel(this.formatNumber(this.item?.data.gold)),
      },
      {
        label: this.detailCopy.fieldConstitution,
        value: this.copy.constitutionLabel(this.formatNumber(this.item?.data.constitution)),
      },
      { label: this.detailCopy.fieldPublished, value: this.publishedLabel },
      { label: this.detailCopy.fieldVersion, value: this.versionLabel },
      { label: this.detailCopy.fieldPortraitFile, value: this.portraitFileName },
      { label: this.detailCopy.fieldPortraitDimensions, value: this.portraitDimensionsLabel },
      { label: this.detailCopy.fieldPortraitMime, value: this.portraitMimeType },
    ];
  }

  public get formulaFacts(): readonly HeroDetailFactDescriptor[] {
    return [
      {
        label: this.copy.veteranLabel,
        value: this.item?.data.is_veteran ? this.detailCopy.yesLabel : this.detailCopy.noLabel,
      },
      {
        label: this.detailCopy.fieldEquippedCount,
        value: this.formatNumber(this.item?.data.equipped_count),
      },
      {
        label: this.detailCopy.fieldTotalEquipmentModifier,
        value: this.formatSignedNumber(this.item?.data.total_equipment_modifier),
      },
    ];
  }

  public get classFacts(): readonly HeroDetailFactDescriptor[] {
    const classData = this.item?.data.class_id.data;
    return [
      {
        label: this.detailCopy.primaryStatLabel,
        value: this.copy.statLabel(classData?.primary_stat ?? '') || this.unknownValue,
      },
      {
        label: this.detailCopy.classBaseHpLabel,
        value: this.formatNumber(classData?.base_hp),
      },
      {
        label: this.detailCopy.classHpGrowthLabel,
        value: this.formatSignedNumber(classData?.hp_per_level),
      },
      {
        label: this.detailCopy.classMpGrowthLabel,
        value: this.formatSignedNumber(classData?.mp_per_level),
      },
    ];
  }

  public get abilityItems(): readonly HeroDetailRelatedItemDescriptor[] {
    return (
      this.item?.data.ability_ids.map((ability) => ({
        badges: [ability.data.kind, ability.data.school],
        facts: [
          {
            label: this.detailCopy.abilityLevelLabel,
            value: this.formatNumber(ability.data.level_required),
          },
          {
            label: this.detailCopy.cooldownLabel,
            value: this.formatNumber(ability.data.cooldown),
          },
          {
            label: this.detailCopy.abilityDamageLabel,
            value: this.formatNumber(ability.data.base_damage),
          },
        ],
        id: ability.id,
        subtitle: this.detailCopy.abilitySchoolLabel,
        title: this.localized(ability.data.name) || ability.id,
      })) ?? []
    );
  }

  public get inventoryItems(): readonly HeroDetailRelatedItemDescriptor[] {
    return (
      this.item?.data.inventory_item_ids.map((item) => ({
        badges: [item.data.rarity, item.data.rarity_tag],
        facts: [
          {
            label: this.detailCopy.fieldClass,
            value: this.localized(item.data.type_id.data.name) || item.data.type_id.id,
          },
          {
            label: this.detailCopy.itemValueLabel,
            value: this.formatNumber(item.data.market_value),
          },
          {
            label: this.detailCopy.itemWeightLabel,
            value: this.formatNumber(item.data.weight),
          },
        ],
        href: `/items/${item.id}`,
        id: item.id,
        subtitle: this.detailCopy.inventoryTitle,
        title: this.localized(item.data.name) || item.id,
      })) ?? []
    );
  }

  public get equipmentItems(): readonly HeroDetailRelatedItemDescriptor[] {
    return (
      this.item?.data.equipment.map((equipment, index) => ({
        badges: [equipment.slot, equipment.item_id.data.rarity],
        facts: [
          {
            label: this.detailCopy.itemSlotLabel,
            value: equipment.slot,
          },
          {
            label: this.detailCopy.itemModifierLabel,
            value: this.formatSignedNumber(equipment.modifier),
          },
          {
            label: this.detailCopy.itemValueLabel,
            value: this.formatNumber(equipment.item_id.data.market_value),
          },
        ],
        href: `/items/${equipment.item_id.id}`,
        id: `${equipment.slot}-${equipment.item_id.id}-${index}`,
        subtitle: this.detailCopy.embeddedEquipmentTitle,
        title: this.localized(equipment.item_id.data.name) || equipment.item_id.id,
      })) ?? []
    );
  }

  public get explainer(): ExplainerDescriptor {
    return {
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'HeroDetail',
          request: HERO_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
        locale: this.locale,
      },
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      deepLinks: {
        cloudRow: `${this.cloudHeroesBaseHref}/${this.id}`,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/heroes',
        cloudTable: this.cloudHeroesBaseHref,
      },
      localeFallbacks: this.localeFallbacks,
      footerNote: this.copy.explainerFooterNote,
    };
  }

  public get locale(): HeroLocale {
    return this.localeService.locale;
  }

  public get copy(): HeroesPageCopy {
    return getHeroesPageCopy(this.locale);
  }

  public get detailCopy(): HeroDetailCopy {
    return this.copy.detail;
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public get showLoading(): boolean {
    return isInitialLoading(this.dataSource.request);
  }

  public get showError(): boolean {
    return hasRequestError(this.dataSource.request);
  }

  public get showDetail(): boolean {
    return this.dataSource.request.isLoaded && Boolean(this.item) && !this.showError;
  }

  public get showNotFound(): boolean {
    return this.dataSource.request.isLoaded && !this.item && !this.showError;
  }

  public async retry(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    if (!this.id) return;
    await this.dataSource.request.fetch(this.id);
  }

  private get publishedLabel(): string {
    if (!this.item) return this.unknownValue;
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(this.item.publishedAt));
  }

  private get versionLabel(): string {
    return this.item?.versionId.slice(0, 8) ?? this.unknownValue;
  }

  private get portraitFileName(): string {
    const fileName = this.item?.data.portrait?.fileName?.trim();
    if (!fileName) return this.unknownValue;
    return fileName;
  }

  private get portraitDimensionsLabel(): string {
    const portrait = this.item?.data.portrait;
    if (!portrait) return this.unknownValue;
    return `${this.formatNumber(portrait.width)} x ${this.formatNumber(portrait.height)}`;
  }

  private get portraitMimeType(): string {
    const mimeType = this.item?.data.portrait?.mimeType?.trim();
    if (!mimeType) return this.unknownValue;
    return mimeType;
  }

  private get unknownValue(): string {
    return this.detailCopy.unknownValue;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      id: this.item.id,
      classId: this.item.data.class_id.id,
      displayName: this.item.data.display_name_en,
      formulaFields: {
        equippedCount: this.item.data.equipped_count,
        isVeteran: this.item.data.is_veteran,
        totalEquipmentModifier: this.item.data.total_equipment_modifier,
      },
      relationCounts: {
        abilities: this.item.data.ability_ids.length,
        equipment: this.item.data.equipment.length,
        inventory: this.item.data.inventory_item_ids.length,
      },
      portrait: getHeroPortraitMetadata(this.item.data.portrait),
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    const fallbacks: {
      readonly path: string;
      readonly requestedLocale: HeroLocale;
      readonly renderedLocale: HeroLocale;
    }[] = [];
    this.addFallback(fallbacks, `heroes.${this.item.id}.data.name`, this.item.data.name);
    this.addFallback(fallbacks, `heroes.${this.item.id}.data.epithet`, this.item.data.epithet);
    this.addFallback(
      fallbacks,
      `heroes.${this.item.id}.data.class_id.data.name`,
      this.item.data.class_id.data.name,
    );
    for (const ability of this.item.data.ability_ids) {
      this.addFallback(fallbacks, `abilities.${ability.id}.data.name`, ability.data.name);
    }
    for (const item of this.item.data.inventory_item_ids) {
      this.addFallback(fallbacks, `items.${item.id}.data.name`, item.data.name);
    }
    for (const equipment of this.item.data.equipment) {
      this.addFallback(
        fallbacks,
        `items.${equipment.item_id.id}.data.name`,
        equipment.item_id.data.name,
      );
    }
    return fallbacks;
  }

  private addFallback(
    fallbacks: {
      readonly path: string;
      readonly requestedLocale: HeroLocale;
      readonly renderedLocale: HeroLocale;
    }[],
    path: string,
    value: Record<HeroLocale, string>,
  ): void {
    if (!value[this.locale]) {
      fallbacks.push({
        path,
        requestedLocale: this.locale,
        renderedLocale: 'en',
      });
    }
  }

  private localized(value: Record<HeroLocale, string> | null | undefined): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined) return this.unknownValue;
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
    }).format(value);
  }

  private formatSignedNumber(value: number | null | undefined): string {
    if (value === null || value === undefined) return this.unknownValue;
    const formatted = this.formatNumber(value);
    return value > 0 ? `+${formatted}` : formatted;
  }
}

container.register(
  HeroDetailViewModel,
  () => new HeroDetailViewModel(container.get(HeroDetailDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
