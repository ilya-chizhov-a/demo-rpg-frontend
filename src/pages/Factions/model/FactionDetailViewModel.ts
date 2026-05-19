import { makeAutoObservable } from 'mobx';

import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  hasRequestError,
  isInitialLoading,
  isRefreshing,
} from 'src/shared/lib';
import { getLocaleNativeLabel, LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  FactionDetailDataSource,
  type FactionDetailMonsterNode,
  type FactionDetailMonstersRequestData,
  type FactionDetailNode,
  type FactionDetailNpcNode,
  type FactionDetailNpcsRequestData,
  type FactionDetailPageInfo,
  type FactionDetailResult,
} from '../api/FactionDetailDataSource';
import {
  getFactionCrestMetadata,
  prepareFactionDetailCrestImage,
  type FactionCrestImageSlot,
  type FactionCrestSource,
} from './factionImages';
import type { FactionLocale } from './FactionItemViewModel';
import { getFactionsPageCopy, type FactionsPageCopy } from './factionUiCopy';

const RELATED_PAGE_SIZE = 12;
const fallbackLocale: FactionLocale = 'en';
type RelatedCollection = 'monsters' | 'npcs';

export interface FactionRelatedFactDescriptor {
  readonly label: string;
  readonly value: string;
}

export interface FactionRelatedItemDescriptor {
  readonly actionLabel: string;
  readonly badges: readonly string[];
  readonly facts: readonly FactionRelatedFactDescriptor[];
  readonly href: string;
  readonly id: string;
  readonly subtitle: string;
  readonly title: string;
}

// Keep this explainer copy aligned with src/pages/Factions/api/FactionDetail.graphql.
const FACTION_DETAIL_QUERY = `query FactionDetail(
  $id: String!
  $monstersData: Demo_rpg_dataGetMonstersesInput
  $npcsData: Demo_rpg_dataGetNpcsesInput
) {
  factions(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      alignment
      crest {
        extension
        fileId
        fileName
        hash
        height
        mimeType
        size
        status
        url
        width
      }
      name { en ru zh }
      description { en ru zh }
    }
  }
  monsterses(data: $monstersData) {
    edges {
      node {
        id
        data {
          faction_id { id }
          hp
          kind
          level
          name { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
  npcses(data: $npcsData) {
    edges {
      node {
        id
        data {
          faction_id { id }
          location_id {
            id
            data { name { en ru zh } }
          }
          name { en ru zh }
          role
          title { en ru zh }
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class FactionDetailViewModel implements IViewModel {
  private readonly cloudFactionsBaseHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/factions';
  private loadedMonsters: FactionDetailMonsterNode[] = [];
  private loadedNpcs: FactionDetailNpcNode[] = [];
  private loadingRelation: RelatedCollection | null = null;
  private monstersPageInfo: FactionDetailPageInfo | null = null;
  private monstersTotal = 0;
  private npcsPageInfo: FactionDetailPageInfo | null = null;
  private npcsTotal = 0;
  public id = '';

  constructor(
    public readonly dataSource: FactionDetailDataSource,
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
    this.resetRelations();
    this.dataSource.reset();
  }

  public get item(): FactionDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return this.localized(this.item?.data.name) || this.id || 'Faction';
  }

  public get description(): string {
    return this.localized(this.item?.data.description) || this.copy.detail.noDescription;
  }

  public get alignment(): string {
    return this.item?.data.alignment ?? 'unknown';
  }

  public get alignmentLabel(): string {
    return this.copy.alignmentLabel(this.alignment);
  }

  public get crestImage(): FactionCrestImageSlot | null {
    if (!this.item) return null;
    return prepareFactionDetailCrestImage(this.item.data.crest, this.title);
  }

  public get crestPlaceholderTitle(): string {
    return this.copy.crestPlaceholderTitle;
  }

  public get crestPlaceholderDescription(): string {
    return this.copy.crestPlaceholderDescription(this.title);
  }

  public get crestFileName(): string {
    const crest = this.item?.data.crest;
    if (!crest) return this.unknownValue;
    const fileName = crest.fileName.trim();
    return fileName ? crest.fileName : this.unknownValue;
  }

  public get crestDimensionsLabel(): string {
    const crest = this.item?.data.crest;
    return crest ? this.formatDimensions(crest) : this.unknownValue;
  }

  public get crestMimeType(): string {
    const crest = this.item?.data.crest;
    if (!crest) return this.unknownValue;
    const mimeType = crest.mimeType.trim();
    return mimeType ? crest.mimeType : this.unknownValue;
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

  public get monsterItems(): readonly FactionRelatedItemDescriptor[] {
    return this.loadedMonsters.map((monster) => this.createMonsterDescriptor(monster));
  }

  public get npcItems(): readonly FactionRelatedItemDescriptor[] {
    return this.loadedNpcs.map((npc) => this.createNpcDescriptor(npc));
  }

  public get monstersTotalCount(): number {
    return this.monstersTotal || this.loadedMonsters.length;
  }

  public get npcsTotalCount(): number {
    return this.npcsTotal || this.loadedNpcs.length;
  }

  public get canLoadMoreMonsters(): boolean {
    return Boolean(this.monstersPageInfo?.hasNextPage) && !this.dataSource.request.isLoading;
  }

  public get canLoadMoreNpcs(): boolean {
    return Boolean(this.npcsPageInfo?.hasNextPage) && !this.dataSource.request.isLoading;
  }

  public get isLoadingMoreMonsters(): boolean {
    return this.loadingRelation === 'monsters' && this.dataSource.request.isLoading;
  }

  public get isLoadingMoreNpcs(): boolean {
    return this.loadingRelation === 'npcs' && this.dataSource.request.isLoading;
  }

  public get showLoading(): boolean {
    return isInitialLoading(this.dataSource.request);
  }

  public get showRefreshing(): boolean {
    return isRefreshing(this.dataSource.request);
  }

  public get showError(): boolean {
    return this.hasBlockingError;
  }

  public get showDetail(): boolean {
    return Boolean(this.item) && !this.showError;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems(
      'world',
      `/factions/${this.id || ''}`,
      this.localeService.ui.navigation,
    );
  }

  public get explainer(): ExplainerDescriptor {
    return {
      summary: this.copy.detailExplainerSummary,
      surfaces: {
        graphql: {
          operationName: 'FactionDetail',
          request: FACTION_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
        locale: this.locale,
        monstersData: this.monstersRequestData,
        npcsData: this.npcsRequestData,
      },
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      deepLinks: {
        cloudTable: this.cloudFactionsBaseHref,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/factions',
        cloudRow: this.cloudRowHref,
      },
      fieldAttribution: [
        { path: 'factions.data.name', owningSubgraph: 'data' },
        { path: 'factions.data.description', owningSubgraph: 'data' },
        { path: 'factions.data.alignment', owningSubgraph: 'data' },
        { path: 'factions.data.crest', owningSubgraph: 'data' },
        { path: 'monsterses.data.faction_id', owningSubgraph: 'data' },
        { path: 'npcses.data.faction_id', owningSubgraph: 'data' },
      ],
      localeFallbacks: this.localeFallbacks,
      footerNote: this.copy.detailExplainerFooterNote,
    };
  }

  public get locale(): FactionLocale {
    return this.localeService.locale;
  }

  public get copy(): FactionsPageCopy {
    return getFactionsPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  private get hasBlockingError(): boolean {
    return hasRequestError(this.dataSource.request) || !this.id;
  }

  public async retry(): Promise<void> {
    await this.load();
  }

  public async loadMoreMonsters(): Promise<void> {
    if (!this.canLoadMoreMonsters) return;
    this.loadingRelation = 'monsters';
    try {
      const result = await this.dataSource.request.fetch(
        this.id,
        this.monstersRequestData,
        this.initialNpcsRequestData,
      );
      if (result.ok) {
        this.appendMonsters(result.value);
      }
    } finally {
      this.loadingRelation = null;
    }
  }

  public async loadMoreNpcs(): Promise<void> {
    if (!this.canLoadMoreNpcs) return;
    this.loadingRelation = 'npcs';
    try {
      const result = await this.dataSource.request.fetch(
        this.id,
        this.initialMonstersRequestData,
        this.npcsRequestData,
      );
      if (result.ok) {
        this.appendNpcs(result.value);
      }
    } finally {
      this.loadingRelation = null;
    }
  }

  private async load(): Promise<void> {
    if (!this.id) return;
    this.resetRelations();
    const result = await this.dataSource.request.fetch(
      this.id,
      this.initialMonstersRequestData,
      this.initialNpcsRequestData,
    );
    if (result.ok) {
      this.replaceRelations(result.value);
    }
  }

  private get monstersRequestData(): FactionDetailMonstersRequestData {
    return this.createRelationRequestData<FactionDetailMonstersRequestData>(
      this.monstersPageInfo?.endCursor ?? null,
    );
  }

  private get npcsRequestData(): FactionDetailNpcsRequestData {
    return this.createRelationRequestData<FactionDetailNpcsRequestData>(
      this.npcsPageInfo?.endCursor ?? null,
    );
  }

  private get initialMonstersRequestData(): FactionDetailMonstersRequestData {
    return this.createRelationRequestData<FactionDetailMonstersRequestData>(null);
  }

  private get initialNpcsRequestData(): FactionDetailNpcsRequestData {
    return this.createRelationRequestData<FactionDetailNpcsRequestData>(null);
  }

  private createRelationRequestData<
    TRequestData extends FactionDetailMonstersRequestData | FactionDetailNpcsRequestData,
  >(after: string | null): TRequestData {
    const data = {
      ...(after ? { after } : {}),
      first: RELATED_PAGE_SIZE,
      where: {
        data: {
          equals: this.id,
          path: ['faction_id'],
        },
      },
    };
    return data as TRequestData;
  }

  private replaceRelations(result: FactionDetailResult): void {
    this.loadedMonsters = [...result.monsters];
    this.loadedNpcs = [...result.npcs];
    this.monstersPageInfo = result.monstersPageInfo;
    this.monstersTotal = result.monstersTotalCount;
    this.npcsPageInfo = result.npcsPageInfo;
    this.npcsTotal = result.npcsTotalCount;
  }

  private appendMonsters(result: FactionDetailResult): void {
    this.loadedMonsters.push(...result.monsters);
    this.monstersPageInfo = result.monstersPageInfo;
    this.monstersTotal = result.monstersTotalCount;
  }

  private appendNpcs(result: FactionDetailResult): void {
    this.loadedNpcs.push(...result.npcs);
    this.npcsPageInfo = result.npcsPageInfo;
    this.npcsTotal = result.npcsTotalCount;
  }

  private resetRelations(): void {
    this.loadedMonsters = [];
    this.loadedNpcs = [];
    this.loadingRelation = null;
    this.monstersPageInfo = null;
    this.monstersTotal = 0;
    this.npcsPageInfo = null;
    this.npcsTotal = 0;
  }

  private get cloudRowHref(): string {
    return `${this.cloudFactionsBaseHref}/${this.item?.id ?? this.id}`;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item || !this.dataSource.request.data) return null;
    return {
      id: this.item.id,
      alignment: this.item.data.alignment,
      name: this.item.data.name,
      description: this.item.data.description,
      crest: getFactionCrestMetadata(this.item.data.crest),
      relatedMonsters: {
        totalCount: this.monstersTotalCount,
        pageInfo: this.monstersPageInfo,
        edges: this.loadedMonsters.map((monster) => ({
          id: monster.id,
          factionId: monster.data.faction_id.id,
          name: monster.data.name,
          kind: monster.data.kind,
          level: monster.data.level,
        })),
      },
      relatedNpcs: {
        totalCount: this.npcsTotalCount,
        pageInfo: this.npcsPageInfo,
        edges: this.loadedNpcs.map((npc) => ({
          id: npc.id,
          factionId: npc.data.faction_id.id,
          name: npc.data.name,
          role: npc.data.role,
          locationId: npc.data.location_id.id,
        })),
      },
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    const fallbacks: {
      readonly path: string;
      readonly requestedLocale: FactionLocale;
      readonly renderedLocale: FactionLocale;
    }[] = [];

    this.addLocalizedFallback(fallbacks, `factions.${this.item.id}.data.name`, this.item.data.name);
    this.addLocalizedFallback(
      fallbacks,
      `factions.${this.item.id}.data.description`,
      this.item.data.description,
    );
    for (const monster of this.loadedMonsters) {
      this.addLocalizedFallback(
        fallbacks,
        `monsters.${monster.id}.data.name`,
        monster.data.name,
      );
    }
    for (const npc of this.loadedNpcs) {
      this.addLocalizedFallback(fallbacks, `npcs.${npc.id}.data.name`, npc.data.name);
      this.addLocalizedFallback(fallbacks, `npcs.${npc.id}.data.title`, npc.data.title);
      this.addLocalizedFallback(
        fallbacks,
        `npcs.${npc.id}.data.location_id.data.name`,
        npc.data.location_id.data.name,
      );
    }
    return fallbacks;
  }

  private createMonsterDescriptor(monster: FactionDetailMonsterNode): FactionRelatedItemDescriptor {
    return {
      actionLabel: this.copy.detail.openMonsterAction,
      badges: [this.formatRawLabel(monster.data.kind)],
      facts: [
        {
          label: this.copy.detail.relatedLevelLabel,
          value: this.formatNumber(monster.data.level),
        },
        {
          label: this.copy.detail.relatedHpLabel,
          value: this.formatNumber(monster.data.hp),
        },
      ],
      href: `/monsters/${monster.id}`,
      id: monster.id,
      subtitle: monster.id,
      title: this.localized(monster.data.name) || monster.id,
    };
  }

  private createNpcDescriptor(npc: FactionDetailNpcNode): FactionRelatedItemDescriptor {
    const locationTitle = this.localized(npc.data.location_id.data.name) || npc.data.location_id.id;
    return {
      actionLabel: this.copy.detail.openNpcAction,
      badges: [this.formatRawLabel(npc.data.role)],
      facts: [
        {
          label: this.copy.detail.relatedRoleLabel,
          value: this.formatRawLabel(npc.data.role),
        },
        {
          label: this.copy.detail.relatedLocationLabel,
          value: locationTitle,
        },
      ],
      href: `/npcs/${npc.id}`,
      id: npc.id,
      subtitle: this.localized(npc.data.title) || this.copy.detail.noDescription,
      title: this.localized(npc.data.name) || npc.id,
    };
  }

  private addLocalizedFallback(
    fallbacks: {
      readonly path: string;
      readonly requestedLocale: FactionLocale;
      readonly renderedLocale: FactionLocale;
    }[],
    path: string,
    value: Record<FactionLocale, string>,
  ): void {
    if (value[this.locale]) return;
    fallbacks.push({
      path,
      requestedLocale: this.locale,
      renderedLocale: fallbackLocale,
    });
  }

  private get unknownValue(): string {
    return this.copy.detail.unknownValue;
  }

  private localized(value?: Record<FactionLocale, string>): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }

  private formatDimensions(source: FactionCrestSource): string {
    if (
      !Number.isFinite(source.width) ||
      !Number.isFinite(source.height) ||
      source.width <= 0 ||
      source.height <= 0
    ) {
      return this.unknownValue;
    }
    return `${this.formatNumber(source.width)} x ${this.formatNumber(source.height)} px`;
  }

  private formatNumber(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    }).format(value);
  }

  private formatRawLabel(value: string): string {
    return value
      .replaceAll(/[-_]+/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }
}

container.register(
  FactionDetailViewModel,
  () =>
    new FactionDetailViewModel(container.get(FactionDetailDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
