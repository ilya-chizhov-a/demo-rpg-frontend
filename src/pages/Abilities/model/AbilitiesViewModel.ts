import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  appendCatalogItemsFromFetch,
  container,
  createCatalogViewStateFromRequest,
  createLocaleFallbacks,
  makeAutoBoundObservable,
  replaceCatalogItemsFromFetch,
  resetCatalogRequestState,
  shouldRequestInitialData,
  type CatalogViewState,
} from 'src/shared/lib';
import { LocaleService, type UiCopy } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import { AbilitiesDataSource, type AbilitiesRequestData, type AbilityNode } from '../api/AbilitiesDataSource';
import { getAbilityIconMetadata } from './abilityImages';
import { AbilityItemViewModel, type AbilityLocale } from './AbilityItemViewModel';
import { getAbilitiesPageCopy, type AbilitiesPageCopy } from './abilityUiCopy';

const ABILITIES_PAGE_SIZE = 24;

// Keep this display string in sync with api/Abilities.graphql until the widget can import raw GraphQL.
const ABILITIES_QUERY = `query Abilities($data: Demo_rpg_dataGetAbilitiesesInput) {
  abilitieses(data: $data) {
    edges {
      cursor
      node {
        id
        versionId
        createdAt
        publishedAt
        data {
          base_damage
          cooldown
          description { en ru zh }
          icon { fileId fileName hash height mimeType url width }
          kind
          level_required
          name { en ru zh }
          school
        }
      }
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class AbilitiesViewModel implements IViewModel {
  private readonly itemCache = new Map<string, AbilityItemViewModel>();
  private readonly loadedItems: AbilityNode[] = [];

  constructor(
    public readonly dataSource: AbilitiesDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'itemCache' | 'localeService'>(this, {
      itemCache: false,
      localeService: false,
    });
  }

  public setup(): void {
    // Abilities has no route params yet.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    resetCatalogRequestState(this.dataSource, this.loadedItems, this.itemCache);
  }

  public get items(): readonly AbilityItemViewModel[] {
    return this.loadedItems.map((node) => this.getItemViewModel(node));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewStateFromRequest(this.dataSource.request, this.loadedItems);
  }

  public get explainer(): ExplainerDescriptor {
    return {
      deepLinks: {
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/abilities',
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/abilities',
      },
      footerNote: this.copy.explainerFooterNote,
      localeFallbacks: this.localeFallbacks,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Abilities',
          request: ABILITIES_QUERY,
        },
      },
      variables: this.currentVariables,
    };
  }

  public get locale(): AbilityLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('heroes', '/abilities', this.localeService.ui.navigation);
  }

  public get copy(): AbilitiesPageCopy {
    return getAbilitiesPageCopy(this.locale);
  }

  public get sharedCopy(): UiCopy['shared'] {
    return this.localeService.ui.shared;
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    await appendCatalogItemsFromFetch(this.loadedItems, this.catalogState.canLoadMore, () =>
      this.dataSource.request.fetch(this.nextPageRequestData),
    );
  }

  private async loadInitial(): Promise<void> {
    await replaceCatalogItemsFromFetch(this.loadedItems, this.itemCache, () =>
      this.dataSource.request.fetch(this.currentRequestData),
    );
  }

  private getItemViewModel(node: AbilityNode): AbilityItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new AbilityItemViewModel(
      node,
      () => this.locale,
      () => this.copy.noDescription,
      () => this.copy.zeroCooldownLabel,
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      locale: this.locale,
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
    };
  }

  private get currentRequestData(): AbilitiesRequestData {
    return {
      first: ABILITIES_PAGE_SIZE,
    };
  }

  private get nextPageRequestData(): AbilitiesRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        baseDamage: node.data.base_damage,
        cooldown: node.data.cooldown,
        icon: getAbilityIconMetadata(node.data.icon),
        id: node.id,
        kind: node.data.kind,
        name: node.data.name[this.locale],
        school: node.data.school,
      })),
      pageInfo: this.dataSource.request.data.pageInfo,
      totalCount: this.catalogState.totalCount,
      visibleCount: this.catalogState.visibleCount,
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) =>
      createLocaleFallbacks(
        this.locale,
        [
          { path: `abilities.${node.id}.data.name`, value: node.data.name },
          { path: `abilities.${node.id}.data.description`, value: node.data.description },
        ],
        'en',
      ),
    );
  }
}

container.register(
  AbilitiesViewModel,
  () => new AbilitiesViewModel(container.get(AbilitiesDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
