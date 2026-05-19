import { makeAutoObservable } from 'mobx';

import {
  getSectionNavigationItems,
  type ActiveNavigationItem,
  type IViewModel,
} from 'src/shared/config';
import {
  container,
  createCatalogViewState,
  hasRequestError,
  replaceCatalogItems,
  resetCatalogState,
  shouldRequestInitialData,
  totalCatalogCount,
  type CatalogViewState,
} from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  FactionsDataSource,
  type FactionNode,
  type FactionsRequestData,
} from '../api/FactionsDataSource';
import { getFactionCrestMetadata } from './factionImages';
import { FactionItemViewModel, type FactionLocale } from './FactionItemViewModel';
import { getFactionsPageCopy, type FactionsPageCopy } from './factionUiCopy';

const FACTIONS_PAGE_SIZE = 24;

interface AlignmentButtonDescriptor {
  readonly ariaPressed: boolean;
  readonly bg: string;
  readonly borderColor: string;
  readonly color: string;
  readonly hoverStyle: {
    readonly bg: string;
  };
  readonly key: string;
  readonly label: string;
  readonly onSelect: () => Promise<void>;
  readonly variant: 'solid' | 'outline';
}

// Keep this display string in sync with api/Factions.graphql until the widget can import raw GraphQL.
const FACTIONS_QUERY = `query Factions($data: Demo_rpg_dataGetFactionsesInput) {
  factionses(data: $data) {
    edges {
      cursor
      node {
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
    }
    pageInfo { endCursor hasNextPage }
    totalCount
  }
}`;

export class FactionsViewModel implements IViewModel {
  public activeAlignment: string | null = null;
  private readonly alignmentOptions: string[] = [];
  private readonly itemCache = new Map<string, FactionItemViewModel>();
  private readonly loadedItems: FactionNode[] = [];

  constructor(
    public readonly dataSource: FactionsDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoObservable<this, 'itemCache' | 'localeService'>(
      this,
      {
        itemCache: false,
        localeService: false,
      },
      { autoBind: true },
    );
  }

  public setup(): void {
    // Factions has no route params yet.
  }

  public async mount(): Promise<void> {
    if (!shouldRequestInitialData(this.dataSource.request)) return;
    await this.loadInitial();
  }

  public unmount(): void {
    this.dataSource.reset();
    this.alignmentOptions.length = 0;
    resetCatalogState(this.loadedItems, this.itemCache);
  }

  public get items(): readonly FactionItemViewModel[] {
    return this.loadedItems.map((node) => this.getItemViewModel(node));
  }

  public get catalogState(): CatalogViewState {
    return createCatalogViewState({
      hasError: hasRequestError(this.dataSource.request),
      hasNextPage: this.dataSource.request.data?.pageInfo.hasNextPage,
      isLoaded: this.dataSource.request.isLoaded,
      isLoading: this.dataSource.request.isLoading,
      totalCount: totalCatalogCount(this.dataSource.request, this.loadedItems),
      visibleCount: this.loadedItems.length,
    });
  }

  public get alignmentButtons(): readonly AlignmentButtonDescriptor[] {
    return [
      this.createAlignmentButtonDescriptor(null, this.copy.allAlignmentsButton, 'all'),
      ...this.sortedAlignmentOptions.map((alignment) =>
        this.createAlignmentButtonDescriptor(
          alignment,
          this.copy.alignmentLabel(alignment),
          alignment,
        ),
      ),
    ];
  }

  public get hasActiveFilter(): boolean {
    return this.activeAlignment !== null;
  }

  public get explainer(): ExplainerDescriptor {
    return {
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'Factions',
          request: FACTIONS_QUERY,
        },
      },
      variables: this.currentVariables,
      responseSample: this.responseSample,
      subgraphsInUse: ['data'],
      deepLinks: {
        cloudTable: 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/factions',
        cloudSchema: 'https://cloud.revisium.io/demo-rpg-data/schema/factions',
      },
      localeFallbacks: this.localeFallbacks,
      footerNote: this.copy.explainerFooterNote,
    };
  }

  public get locale(): FactionLocale {
    return this.localeService.locale;
  }

  public get sectionNavItems(): readonly ActiveNavigationItem[] {
    return getSectionNavigationItems('world', '/factions', this.localeService.ui.navigation);
  }

  public get copy(): FactionsPageCopy {
    return getFactionsPageCopy(this.locale);
  }

  public async setAlignment(alignment: string | null): Promise<void> {
    if (this.activeAlignment === alignment) return;
    this.activeAlignment = alignment;
    await this.loadInitial();
  }

  public async resetFilters(): Promise<void> {
    if (!this.hasActiveFilter) return;
    this.activeAlignment = null;
    await this.loadInitial();
  }

  public async retry(): Promise<void> {
    await this.loadInitial();
  }

  public async loadMore(): Promise<void> {
    if (!this.catalogState.canLoadMore) return;
    const result = await this.dataSource.request.fetch(this.nextPageRequestData);
    if (result.ok) {
      this.loadedItems.push(...result.value.items);
      this.mergeAlignmentOptions(result.value.items);
    }
  }

  private async loadInitial(): Promise<void> {
    const result = await this.dataSource.request.fetch(this.currentRequestData);
    if (result.ok) {
      replaceCatalogItems(this.loadedItems, this.itemCache, result.value.items);
      this.mergeAlignmentOptions(result.value.items);
    }
  }

  private getItemViewModel(node: FactionNode): FactionItemViewModel {
    const cached = this.itemCache.get(node.id);
    if (cached) return cached;

    const item = new FactionItemViewModel(
      node,
      () => this.locale,
      () => this.copy.noDescription,
      (alignment) => this.copy.alignmentLabel(alignment),
    );
    this.itemCache.set(node.id, item);
    return item;
  }

  private get currentVariables(): Record<string, unknown> {
    return {
      data: this.currentRequestData,
      locale: this.locale,
      alignmentFilter: this.activeAlignment,
      alignmentFilterPath: ['alignment'],
      pageInfo: this.dataSource.request.data?.pageInfo ?? null,
    };
  }

  private get currentRequestData(): FactionsRequestData {
    const data: FactionsRequestData = {
      first: FACTIONS_PAGE_SIZE,
    };
    const where = this.currentWhere;
    if (where) {
      data.where = where;
    }
    return data;
  }

  private get nextPageRequestData(): FactionsRequestData {
    return {
      ...this.currentRequestData,
      after: this.dataSource.request.data?.pageInfo.endCursor ?? undefined,
    };
  }

  private get currentWhere(): FactionsRequestData['where'] | undefined {
    if (!this.activeAlignment) return undefined;
    return {
      data: {
        equals: this.activeAlignment,
        path: ['alignment'],
      },
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;
    return {
      totalCount: this.catalogState.totalCount,
      visibleCount: this.catalogState.visibleCount,
      pageInfo: this.dataSource.request.data.pageInfo,
      edges: this.loadedItems.slice(0, 3).map((node) => ({
        id: node.id,
        alignment: node.data.alignment,
        name: node.data.name[this.locale],
        crest: getFactionCrestMetadata(node.data.crest),
      })),
    };
  }

  private get localeFallbacks(): ExplainerDescriptor['localeFallbacks'] {
    return this.loadedItems.flatMap((node) => {
      const fallbacks: {
        readonly path: string;
        readonly requestedLocale: FactionLocale;
        readonly renderedLocale: FactionLocale;
      }[] = [];
      if (!node.data.name[this.locale]) {
        fallbacks.push({
          path: `factions.${node.id}.data.name`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      if (!node.data.description[this.locale]) {
        fallbacks.push({
          path: `factions.${node.id}.data.description`,
          requestedLocale: this.locale,
          renderedLocale: 'en',
        });
      }
      return fallbacks;
    });
  }

  private get sortedAlignmentOptions(): readonly string[] {
    const collator = new Intl.Collator(this.locale);
    return [...this.alignmentOptions].sort((left, right) =>
      collator.compare(this.copy.alignmentLabel(left), this.copy.alignmentLabel(right)),
    );
  }

  private mergeAlignmentOptions(nodes: readonly FactionNode[]): void {
    const values = new Set(this.alignmentOptions);
    if (this.activeAlignment) values.add(this.activeAlignment);
    for (const node of nodes) {
      values.add(node.data.alignment);
    }
    this.alignmentOptions.splice(0, this.alignmentOptions.length, ...values);
  }

  private createAlignmentButtonDescriptor(
    alignment: string | null,
    label: string,
    key: string,
  ): AlignmentButtonDescriptor {
    const selected = this.activeAlignment === alignment;
    return {
      ariaPressed: selected,
      bg: selected ? '#22d3ee' : 'rgba(15, 21, 29, 0.74)',
      borderColor: selected ? '#67e8f9' : 'rgba(103, 232, 249, 0.24)',
      color: selected ? 'var(--color-text-on-accent)' : '#f4f7f8',
      hoverStyle: {
        bg: selected ? '#67e8f9' : 'rgba(34, 211, 238, 0.12)',
      },
      key,
      label,
      onSelect: () => this.setAlignment(alignment),
      variant: selected ? 'solid' : 'outline',
    };
  }
}

container.register(
  FactionsViewModel,
  () => new FactionsViewModel(container.get(FactionsDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);
