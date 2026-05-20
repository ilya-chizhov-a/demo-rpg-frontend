import type { IViewModel } from 'src/shared/config';
import {
  container,
  createDetailViewStateFromRequest,
  createLocaleFallbacks,
  makeAutoBoundObservable,
  type DetailViewState,
  type PreparedImageSlot,
} from 'src/shared/lib';
import { getLocaleNativeLabel, LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  MonsterDetailDataSource,
  type MonsterDetailAbilityNode,
  type MonsterDetailDropNode,
  type MonsterDetailNode,
} from '../api/MonsterDetailDataSource';
import { getMonsterImageMetadata, prepareMonsterDetailImage } from './monsterImages';
import type { MonsterLocale } from './MonsterItemViewModel';
import { getMonstersPageCopy, type MonstersPageCopy } from './monsterUiCopy';

// Keep this explainer copy aligned with src/pages/Monsters/api/MonsterDetail.graphql.
const MONSTER_DETAIL_QUERY = `query MonsterDetail($id: String!) {
  monsters(id: $id) {
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
          description { en ru zh }
          kind
          level_required
          name { en ru zh }
          school
        }
      }
      avg_drop_chance
      base_damage
      description { en ru zh }
      drop_count
      drops {
        chance
        item_id {
          id
          data {
            market_value
            name { en ru zh }
            rarity
            rarity_tag
            type_id {
              id
              data { name { en ru zh } }
            }
          }
        }
        quantity_max
        quantity_min
      }
      faction_id {
        id
        data {
          alignment
          description { en ru zh }
          name { en ru zh }
        }
      }
      hp
      image { extension fileId fileName hash height mimeType size status url width }
      kind
      level
      name { en ru zh }
    }
  }
}`;

const MONSTER_DETAIL_ATTRIBUTED_FIELDS = [
  'name',
  'description',
  'image',
  'kind',
  'level',
  'hp',
  'base_damage',
  'faction_id',
  'ability_ids',
  'drops',
  'avg_drop_chance',
  'drop_count',
] as const;

export interface MonsterAbilityDescriptor {
  readonly cooldownLabel: string;
  readonly damageLabel: string;
  readonly description: string;
  readonly href: string;
  readonly id: string;
  readonly kindLabel: string;
  readonly levelLabel: string;
  readonly schoolLabel: string;
  readonly title: string;
}

export interface MonsterDropDescriptor {
  readonly chanceLabel: string;
  readonly href: string;
  readonly id: string;
  readonly itemTypeTitle: string;
  readonly marketValueLabel: string;
  readonly quantityLabel: string;
  readonly rarityLabel: string;
  readonly title: string;
}

export class MonsterDetailViewModel implements IViewModel {
  private readonly cloudMonstersTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/monsters';
  public readonly abilitiesHref = '/abilities';
  public readonly backHref = '/monsters';
  public id = '';

  constructor(
    public readonly dataSource: MonsterDetailDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'localeService'>(this, {
      localeService: false,
    });
  }

  public setup(id?: unknown): void {
    this.id = typeof id === 'string' ? id : '';
  }

  public async mount(): Promise<void> {
    const request = this.dataSource.request;
    if (this.id && !request.isLoading && !request.isLoaded) {
      await this.load();
    }
  }

  public unmount(): void {
    this.dataSource.reset();
  }

  public get item(): MonsterDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return this.localized(this.item?.data.name) || this.id || this.unknownValue;
  }

  public get description(): string {
    return this.localized(this.item?.data.description) || this.copy.noDescription;
  }

  public get kindLabel(): string {
    return this.item ? this.copy.kindLabel(this.item.data.kind) : this.unknownValue;
  }

  public get factionId(): string {
    return this.item?.data.faction_id.id ?? '';
  }

  public get factionTitle(): string {
    return this.localized(this.item?.data.faction_id.data.name) || this.factionId || this.unknownValue;
  }

  public get factionHref(): string {
    return `/factions/${this.factionId}`;
  }

  public get canOpenFaction(): boolean {
    return this.factionId.length > 0;
  }

  public get factionAlignmentLabel(): string {
    return this.item
      ? this.copy.rawLabel(this.item.data.faction_id.data.alignment)
      : this.unknownValue;
  }

  public get levelLabel(): string {
    return this.item ? this.formatNumber(this.item.data.level) : this.unknownValue;
  }

  public get hpLabel(): string {
    return this.item ? this.formatNumber(this.item.data.hp) : this.unknownValue;
  }

  public get baseDamageLabel(): string {
    return this.item ? this.formatNumber(this.item.data.base_damage) : this.unknownValue;
  }

  public get avgDropChanceLabel(): string {
    return this.item ? this.formatChance(this.item.data.avg_drop_chance) : this.unknownValue;
  }

  public get dropCountLabel(): string {
    return this.item ? this.formatNumber(this.item.data.drop_count) : this.unknownValue;
  }

  public get image(): PreparedImageSlot | null {
    if (!this.item) return null;
    return prepareMonsterDetailImage(this.item.data.image, this.title);
  }

  public get imagePlaceholderTitle(): string {
    return this.copy.detail.imagePlaceholderTitle;
  }

  public get imagePlaceholderDescription(): string {
    return this.copy.detail.imagePlaceholderDescription(this.title);
  }

  public get imageFileName(): string {
    return this.fallbackText(this.item?.data.image.fileName);
  }

  public get imageDimensionsLabel(): string {
    return this.item ? this.formatDimensions(this.item.data.image) : this.unknownValue;
  }

  public get imageMimeType(): string {
    return this.fallbackText(this.item?.data.image.mimeType);
  }

  public get imageSizeLabel(): string {
    return this.item ? this.formatFileSize(this.item.data.image.size) : this.unknownValue;
  }

  public get imageStatus(): string {
    return this.fallbackText(this.item?.data.image.status);
  }

  public get imageHashLabel(): string {
    const hash = this.item?.data.image.hash;
    if (!hash) return this.unknownValue;
    return hash.length > 14 ? `${hash.slice(0, 14)}...` : hash;
  }

  public get abilities(): readonly MonsterAbilityDescriptor[] {
    return this.item?.data.ability_ids.map((ability) => this.createAbilityDescriptor(ability)) ?? [];
  }

  public get hasAbilities(): boolean {
    return this.abilities.length > 0;
  }

  public get drops(): readonly MonsterDropDescriptor[] {
    return this.item?.data.drops.map((drop) => this.createDropDescriptor(drop)) ?? [];
  }

  public get hasDrops(): boolean {
    return this.drops.length > 0;
  }

  public get localeLabel(): string {
    return getLocaleNativeLabel(this.locale);
  }

  public get publishedLabel(): string {
    if (!this.item) return this.unknownValue;
    return this.formatDate(this.item.publishedAt);
  }

  public get versionLabel(): string {
    return this.item?.versionId.slice(0, 8) ?? this.unknownValue;
  }

  public get showLoading(): boolean {
    return this.viewState.showLoading;
  }

  public get showRefreshing(): boolean {
    return this.viewState.showRefreshing;
  }

  public get showError(): boolean {
    return this.viewState.showError;
  }

  public get showNotFound(): boolean {
    return this.viewState.showNotFound;
  }

  public get showDetail(): boolean {
    return this.viewState.showDetail;
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudRow: this.cloudRowHref,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/monsters',
        cloudTable: this.cloudMonstersTableHref,
      },
      fieldAttribution: this.detailFieldAttribution,
      footerNote: this.copy.detail.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.detail.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'MonsterDetail',
          request: MONSTER_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
        locale: this.locale,
      },
    };
  }

  public get locale(): MonsterLocale {
    return this.localeService.locale;
  }

  public get copy(): MonstersPageCopy {
    return getMonstersPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async retry(): Promise<void> {
    await this.load();
  }

  private async load(): Promise<void> {
    if (!this.id) return;
    await this.dataSource.request.fetch(this.id);
  }

  private get viewState(): DetailViewState {
    return createDetailViewStateFromRequest(this.dataSource.request, {
      hasId: Boolean(this.id),
      hasItem: Boolean(this.item),
    });
  }

  private get detailFieldAttribution(): ExplainerDescriptor['fieldAttribution'] {
    return MONSTER_DETAIL_ATTRIBUTED_FIELDS.map((fieldName) => ({
      path: `monsters.data.${fieldName}`,
      owningSubgraph: 'data',
    }));
  }

  private createAbilityDescriptor(
    ability: MonsterDetailAbilityNode,
  ): MonsterAbilityDescriptor {
    return {
      cooldownLabel: this.formatNumber(ability.data.cooldown),
      damageLabel: this.formatNumber(ability.data.base_damage),
      description: this.localized(ability.data.description) || this.unknownValue,
      href: this.abilitiesHref,
      id: ability.id,
      kindLabel: this.copy.rawLabel(ability.data.kind),
      levelLabel: this.formatNumber(ability.data.level_required),
      schoolLabel: this.copy.rawLabel(ability.data.school),
      title: this.localized(ability.data.name) || ability.id,
    };
  }

  private createDropDescriptor(drop: MonsterDetailDropNode): MonsterDropDescriptor {
    const item = drop.item_id;
    return {
      chanceLabel: this.formatChance(drop.chance),
      href: `/items/${item.id}`,
      id: item.id,
      itemTypeTitle: this.localized(item.data.type_id.data.name) || item.data.type_id.id,
      marketValueLabel: this.formatNumber(item.data.market_value),
      quantityLabel: this.formatQuantityRange(drop.quantity_min, drop.quantity_max),
      rarityLabel: this.copy.rarityLabel(item.data.rarity),
      title: this.localized(item.data.name) || item.id,
    };
  }

  private get cloudRowHref(): string {
    return `${this.cloudMonstersTableHref}/${this.item?.id ?? this.id}`;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      abilities: this.item.data.ability_ids.map((ability) => ({
        id: ability.id,
        kind: ability.data.kind,
        name: ability.data.name,
        school: ability.data.school,
      })),
      drops: this.item.data.drops.map((drop) => ({
        chance: drop.chance,
        item: {
          id: drop.item_id.id,
          name: drop.item_id.data.name,
          rarity: drop.item_id.data.rarity,
        },
        quantityMax: drop.quantity_max,
        quantityMin: drop.quantity_min,
      })),
      faction: {
        id: this.item.data.faction_id.id,
        name: this.item.data.faction_id.data.name,
      },
      formulas: {
        avgDropChance: this.item.data.avg_drop_chance,
        dropCount: this.item.data.drop_count,
      },
      id: this.item.id,
      image: getMonsterImageMetadata(this.item.data.image),
      kind: this.item.data.kind,
      level: this.item.data.level,
      name: this.item.data.name,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    const fallbacks = createLocaleFallbacks(
      this.locale,
      [
        { path: `monsters.${this.item.id}.data.name`, value: this.item.data.name },
        {
          path: `monsters.${this.item.id}.data.description`,
          value: this.item.data.description,
        },
        {
          path: `monsters.${this.item.id}.data.faction_id.data.name`,
          value: this.item.data.faction_id.data.name,
        },
        {
          path: `monsters.${this.item.id}.data.faction_id.data.description`,
          value: this.item.data.faction_id.data.description,
        },
      ],
      'en',
    );
    for (const ability of this.item.data.ability_ids) {
      fallbacks.push(
        ...createLocaleFallbacks(
          this.locale,
          [
            {
              path: `monsters.${this.item.id}.data.ability_ids.${ability.id}.data.name`,
              value: ability.data.name,
            },
            {
              path: `monsters.${this.item.id}.data.ability_ids.${ability.id}.data.description`,
              value: ability.data.description,
            },
          ],
          'en',
        ),
      );
    }
    for (const drop of this.item.data.drops) {
      fallbacks.push(
        ...createLocaleFallbacks(
          this.locale,
          [
            {
              path: `monsters.${this.item.id}.data.drops.${drop.item_id.id}.data.name`,
              value: drop.item_id.data.name,
            },
            {
              path: `monsters.${this.item.id}.data.drops.${drop.item_id.id}.data.type_id.data.name`,
              value: drop.item_id.data.type_id.data.name,
            },
          ],
          'en',
        ),
      );
    }
    return fallbacks;
  }

  private get unknownValue(): string {
    return this.copy.detail.unknownValue;
  }

  private localized(value?: Record<MonsterLocale, string>): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private fallbackText(value?: string): string {
    if (!value?.trim()) return this.unknownValue;
    return value;
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }

  private formatDimensions(source: { readonly height: number; readonly width: number }): string {
    if (source.width <= 0 || source.height <= 0) return this.unknownValue;
    return `${this.formatNumber(source.width)} x ${this.formatNumber(source.height)} px`;
  }

  private formatFileSize(value: number): string {
    if (value <= 0) return this.unknownValue;
    const formatter = new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
    });
    if (value < 1024) return `${formatter.format(value)} B`;
    if (value < 1024 * 1024) return `${formatter.format(value / 1024)} KB`;
    return `${formatter.format(value / 1024 / 1024)} MB`;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
    }).format(value);
  }

  private formatChance(value: number): string {
    const normalized = Math.abs(value) > 1 ? value / 100 : value;
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
      style: 'percent',
    }).format(normalized);
  }

  private formatQuantityRange(min: number, max: number): string {
    if (min === max) return this.formatNumber(min);
    return `${this.formatNumber(min)}-${this.formatNumber(max)}`;
  }
}

container.register(
  MonsterDetailViewModel,
  () =>
    new MonsterDetailViewModel(container.get(MonsterDetailDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
