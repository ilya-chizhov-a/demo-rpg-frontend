import type { IViewModel } from 'src/shared/config';
import {
  container,
  hasRequestError,
  isInitialLoading,
  isRefreshing,
  makeAutoBoundObservable,
  shouldRequestInitialData,
} from 'src/shared/lib';
import { LocaleService } from 'src/shared/model';
import type { ExplainerDescriptor } from 'src/widgets/explainer-widget';
import {
  SearchDataSource,
  type SearchGroupResult,
  type SearchRequestData,
} from '../api/SearchDataSource';
import searchPageQuery from '../api/Search.graphql?raw';
import { SearchResultGroupViewModel } from './SearchResultGroupViewModel';
import { doesSearchJsonMatch } from './searchJson';
import { getSearchTableConfig } from './searchResultConfig';
import { getSearchPageCopy, type SearchLocale, type SearchPageCopy } from './searchUiCopy';

export interface SearchRouteState {
  readonly query: string;
}

const SEARCH_PAGE_SIZE = 100;

export class SearchViewModel implements IViewModel {
  public queryInput = '';
  private submittedQuery = '';

  constructor(
    public readonly dataSource: SearchDataSource,
    private readonly localeService: LocaleService,
  ) {
    makeAutoBoundObservable<this, 'localeService'>(this, {
      localeService: false,
    });
  }

  public setup(routeState?: unknown): void {
    const query = isSearchRouteState(routeState) ? routeState.query : '';
    this.queryInput = query;
    this.submittedQuery = query.trim();
  }

  public async mount(): Promise<void> {
    if (!this.hasSubmittedQuery || !shouldRequestInitialData(this.dataSource.request)) return;
    await this.search();
  }

  public unmount(): void {
    this.dataSource.reset();
  }

  public get locale(): SearchLocale {
    return this.localeService.locale;
  }

  public get copy(): SearchPageCopy {
    return getSearchPageCopy(this.locale);
  }

  public get hasSubmittedQuery(): boolean {
    return this.submittedQuery.length > 0;
  }

  public get showEmptyPrompt(): boolean {
    return !this.hasSubmittedQuery && !this.showLoading && !this.showError;
  }

  public get showLoading(): boolean {
    return isInitialLoading(this.dataSource.request);
  }

  public get showRefreshing(): boolean {
    return isRefreshing(this.dataSource.request);
  }

  public get showError(): boolean {
    return hasRequestError(this.dataSource.request);
  }

  public get showNoResults(): boolean {
    return (
      this.hasSubmittedQuery &&
      this.dataSource.request.isLoaded &&
      this.totalCount === 0 &&
      !this.showError
    );
  }

  public get showResults(): boolean {
    return this.groups.length > 0 && !this.showError;
  }

  public get groups(): readonly SearchResultGroupViewModel[] {
    return this.resultGroups
      .filter((group) => group.totalCount > 0)
      .map(
        (group) =>
          new SearchResultGroupViewModel(
            group,
            () => this.locale,
            () => this.copy,
            () => this.submittedQuery,
          ),
      );
  }

  public get totalCount(): number {
    return this.resultGroups.reduce((sum, group) => sum + group.totalCount, 0);
  }

  public get visibleCount(): number {
    return this.resultGroups.reduce((sum, group) => sum + group.rows.length, 0);
  }

  public get resultSummaryLabel(): string {
    return this.copy.resultSummaryLabel(this.visibleCount, this.totalCount);
  }

  public get explainer(): ExplainerDescriptor {
    const firstMatchedGroup = this.resultGroups.find((group) => group.totalCount > 0);
    const cloudTable = firstMatchedGroup
      ? getSearchTableConfig(firstMatchedGroup.tableId).cloudTableHref
      : 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft/heroes';

    return {
      deepLinks: {
        cloudTable,
      },
      fieldAttribution: [
        { owningSubgraph: 'data', path: 'data.*.json' },
        { owningSubgraph: 'cms', path: 'cms.*.json' },
      ],
      footerNote: this.copy.explainerFooterNote,
      responseSample: this.responseSample,
      subgraphsInUse: ['data', 'cms'],
      summary: this.copy.explainerSummary,
      surfaces: {
        graphql: {
          operationName: 'SearchPage',
          request: searchPageQuery,
        },
      },
      variables: {
        data: this.hasSubmittedQuery
          ? {
              ...this.currentRequestData,
              mode: 'client-json-scan',
              query: this.submittedQuery,
            }
          : null,
        locale: this.locale,
      },
    };
  }

  public setQueryInput(value: string): void {
    this.queryInput = value;
  }

  public async retry(): Promise<void> {
    if (!this.hasSubmittedQuery) return;
    await this.search();
  }

  private async search(): Promise<void> {
    await this.dataSource.request.fetch(this.currentRequestData);
  }

  private get resultGroups(): readonly SearchGroupResult[] {
    const groups = this.dataSource.request.data?.groups ?? [];
    if (!this.hasSubmittedQuery) return [];

    return groups
      .map((group) => {
        const rows = group.rows.filter((row) =>
          doesSearchJsonMatch(row.json, this.submittedQuery, this.locale),
        );
        return {
          ...group,
          rows,
          totalCount: rows.length,
        };
      })
      .filter((group) => group.totalCount > 0);
  }

  private get currentRequestData(): SearchRequestData {
    return {
      first: SEARCH_PAGE_SIZE,
    };
  }

  private get responseSample(): Record<string, unknown> | null {
    if (!this.dataSource.request.data) return null;

    return {
      groups: this.groups.slice(0, 5).map((group) => ({
        count: group.countLabel,
        items: group.items.slice(0, 2).map((item) => ({
          id: item.id,
          snippets: item.snippets.map((snippet) => ({
            path: snippet.path,
            text: snippet.text,
          })),
          source: item.sourceCode,
          title: item.title,
        })),
        source: group.sourceCode,
        title: group.title,
      })),
      totalCount: this.totalCount,
      visibleCount: this.visibleCount,
    };
  }
}

container.register(
  SearchViewModel,
  () => new SearchViewModel(container.get(SearchDataSource), container.get(LocaleService)),
  { scope: 'transient' },
);

function isSearchRouteState(value: unknown): value is SearchRouteState {
  return (
    typeof value === 'object' &&
    value !== null &&
    'query' in value &&
    typeof value.query === 'string'
  );
}
