import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  createLocaleFallbacks,
  hasRequestError,
  isInitialLoading,
  isRefreshing,
  makeAutoBoundObservable,
} from 'src/shared/lib';
import { getLocaleNativeLabel, LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import { PartyDetailDataSource, type PartyDetailNode } from '../api/PartyDetailDataSource';
import { getPartyHeroPortraitMetadata } from './partyImages';
import { PartyDetailMemberViewModel } from './PartyDetailMemberViewModel';
import { getPartiesPageCopy, type PartiesPageCopy } from './partyUiCopy';
import type { PartyLocale } from './PartyItemViewModel';

// Keep this explainer copy aligned with src/pages/Parties/api/PartyDetail.graphql.
const PARTY_DETAIL_QUERY = `query PartyDetail($id: String!) {
  parties(id: $id) {
    id
    versionId
    createdAt
    publishedAt
    data {
      formation
      hero_ids {
        id
        data {
          class_id {
            id
            data {
              name { en ru zh }
              primary_stat
            }
          }
          display_name_en
          epithet { en ru zh }
          is_veteran
          level
          name { en ru zh }
          portrait { fileId fileName hash height mimeType url width }
        }
      }
      is_full
      member_count
      motto { en ru zh }
      name { en ru zh }
    }
  }
}`;

export class PartyDetailViewModel implements IViewModel {
  private readonly cloudPartiesTableHref =
    'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/parties';
  public readonly backHref = '/parties';
  public id = '';
  private readonly memberCache = new Map<string, PartyDetailMemberViewModel>();

  constructor(
    public readonly dataSource: PartyDetailDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'localeService' | 'memberCache'>(this, {
      localeService: false,
      memberCache: false,
    });
  }

  public setup(id?: unknown): void {
    this.id = typeof id === 'string' ? id : '';
  }

  public async mount(): Promise<void> {
    if (!this.id || this.dataSource.request.isLoading || this.dataSource.request.isLoaded) return;
    await this.load();
  }

  public unmount(): void {
    this.dataSource.reset();
    this.memberCache.clear();
  }

  public get item(): PartyDetailNode | null {
    return this.dataSource.request.data?.item ?? null;
  }

  public get title(): string {
    return this.localized(this.item?.data.name) || this.id || 'Party';
  }

  public get motto(): string {
    return this.localized(this.item?.data.motto) || this.copy.noMotto;
  }

  public get formationLabel(): string {
    return this.item ? this.copy.formationLabel(this.item.data.formation) : this.unknownValue;
  }

  public get memberCountLabel(): string {
    return this.copy.memberCountLabel(this.item?.data.member_count ?? 0);
  }

  public get fullStateLabel(): string {
    return this.copy.fullStateLabel(this.item?.data.is_full ?? false);
  }

  public get members(): readonly PartyDetailMemberViewModel[] {
    return this.item?.data.hero_ids.map((hero) => this.getMemberViewModel(hero)) ?? [];
  }

  public get hasMembers(): boolean {
    return this.members.length > 0;
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
    return isInitialLoading(this.dataSource.request);
  }

  public get showRefreshing(): boolean {
    return isRefreshing(this.dataSource.request);
  }

  public get showError(): boolean {
    return hasRequestError(this.dataSource.request) || !this.id;
  }

  public get showNotFound(): boolean {
    return Boolean(this.id) && this.dataSource.request.isLoaded && !this.item && !this.showError;
  }

  public get showDetail(): boolean {
    return Boolean(this.item) && !this.showError && !this.showNotFound;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems(
      'heroes',
      `/parties/${this.id || ''}`,
      this.localeService.ui.navigation,
    );
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudRow: this.cloudRowHref,
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/parties',
        cloudTable: this.cloudPartiesTableHref,
      },
      fieldAttribution: [
        { path: 'parties.data.name', owningSubgraph: 'data' },
        { path: 'parties.data.motto', owningSubgraph: 'data' },
        { path: 'parties.data.formation', owningSubgraph: 'data' },
        { path: 'parties.data.hero_ids', owningSubgraph: 'data' },
        { path: 'parties.data.member_count', owningSubgraph: 'data' },
        { path: 'parties.data.is_full', owningSubgraph: 'data' },
      ],
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'PartyDetail',
          request: PARTY_DETAIL_QUERY,
        },
      },
      variables: {
        id: this.id,
        locale: this.locale,
      },
    };
  }

  public get locale(): PartyLocale {
    return this.localeService.locale;
  }

  public get copy(): PartiesPageCopy {
    return getPartiesPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async retry(): Promise<void> {
    await this.load();
  }

  public readonly formatLevel = (value: number): string => {
    return new Intl.NumberFormat(this.locale).format(value);
  };

  private async load(): Promise<void> {
    if (!this.id) return;
    await this.dataSource.request.fetch(this.id);
  }

  private getMemberViewModel(
    hero: PartyDetailNode['data']['hero_ids'][number],
  ): PartyDetailMemberViewModel {
    const cached = this.memberCache.get(hero.id);
    if (cached) return cached;

    const item = new PartyDetailMemberViewModel(
      hero,
      () => this.locale,
      () => this.copy.unknownHeroLabel,
    );
    this.memberCache.set(hero.id, item);
    return item;
  }

  private get cloudRowHref(): string {
    return `${this.cloudPartiesTableHref}/${this.item?.id ?? this.id}`;
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.item) return null;
    return {
      formation: this.item.data.formation,
      heroes: this.item.data.hero_ids.map((hero) => ({
        class: hero.data.class_id.data.name,
        displayNameEn: hero.data.display_name_en,
        id: hero.id,
        level: hero.data.level,
        name: hero.data.name,
        portrait: getPartyHeroPortraitMetadata(hero.data.portrait),
      })),
      id: this.item.id,
      isFull: this.item.data.is_full,
      memberCount: this.item.data.member_count,
      motto: this.item.data.motto,
      name: this.item.data.name,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    if (!this.item) return [];
    const fallbacks = createLocaleFallbacks(
      this.locale,
      [
        { path: `parties.${this.item.id}.data.name`, value: this.item.data.name },
        { path: `parties.${this.item.id}.data.motto`, value: this.item.data.motto },
      ],
      'en',
    );
    for (const hero of this.item.data.hero_ids) {
      fallbacks.push(
        ...createLocaleFallbacks(
          this.locale,
          [
            {
              path: `parties.${this.item.id}.data.hero_ids.${hero.id}.data.name`,
              value: hero.data.name,
            },
            {
              path: `parties.${this.item.id}.data.hero_ids.${hero.id}.data.epithet`,
              value: hero.data.epithet,
            },
            {
              path: `parties.${this.item.id}.data.hero_ids.${hero.id}.data.class_id.data.name`,
              value: hero.data.class_id.data.name,
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

  private localized(value?: Record<PartyLocale, string>): string {
    if (!value) return '';
    return value[this.locale] || value.en;
  }

  private formatDate(value: string | number): string {
    return new Intl.DateTimeFormat(this.locale, {
      dateStyle: 'medium',
      timeZone: 'UTC',
    }).format(new Date(value));
  }
}

container.register(
  PartyDetailViewModel,
  () =>
    new PartyDetailViewModel(container.get(PartyDetailDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
