import { type SearchPageQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type SearchDomain = 'cms' | 'data';

export type SearchTableId =
  | 'abilities'
  | 'blogAuthors'
  | 'blogPosts'
  | 'classes'
  | 'dialogs'
  | 'effects'
  | 'factions'
  | 'heroes'
  | 'itemTypes'
  | 'items'
  | 'landingFeatures'
  | 'landingHero'
  | 'landingTestimonials'
  | 'locations'
  | 'monsters'
  | 'npcs'
  | 'parties'
  | 'quests'
  | 'regions'
  | 'stats';

export interface SearchRequestData {
  readonly first: number;
}

export interface SearchRowNode {
  readonly id: string;
  readonly json: unknown;
  readonly publishedAt: number | string;
  readonly updatedAt: number | string;
}

export interface SearchGroupResult {
  readonly domain: SearchDomain;
  readonly rows: readonly SearchRowNode[];
  readonly tableId: SearchTableId;
  readonly totalCount: number;
}

export interface SearchResult {
  readonly groups: readonly SearchGroupResult[];
  readonly totalCount: number;
  readonly variables: SearchRequestData;
}

type SearchConnection = SearchPageQuery['abilities'];

const DEFAULT_SEARCH_FIRST = 20;
const MAX_SEARCH_FIRST = 100;

export class SearchDataSource {
  public readonly request: ObservableRequest<SearchResult, [SearchRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchSearch(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchSearch(signal: AbortSignal, data: SearchRequestData): Promise<SearchResult> {
    const variables = {
      ...data,
      first: normalizeSearchFirst(data.first),
    };
    const response = await this.api.sdk.SearchPage({ first: variables.first }, undefined, signal);
    return this.mapResponse(response, variables);
  }

  private mapResponse(response: SearchPageQuery, variables: SearchRequestData): SearchResult {
    const groups: SearchGroupResult[] = [
      this.mapConnection('heroes', 'data', response.heroes),
      this.mapConnection('items', 'data', response.items),
      this.mapConnection('monsters', 'data', response.monsters),
      this.mapConnection('quests', 'data', response.quests),
      this.mapConnection('regions', 'data', response.regions),
      this.mapConnection('locations', 'data', response.locations),
      this.mapConnection('factions', 'data', response.factions),
      this.mapConnection('npcs', 'data', response.npcs),
      this.mapConnection('parties', 'data', response.parties),
      this.mapConnection('classes', 'data', response.classes),
      this.mapConnection('abilities', 'data', response.abilities),
      this.mapConnection('itemTypes', 'data', response.itemTypes),
      this.mapConnection('stats', 'data', response.stats),
      this.mapConnection('effects', 'data', response.effects),
      this.mapConnection('dialogs', 'data', response.dialogs),
      this.mapConnection('blogPosts', 'cms', response.blogPosts),
      this.mapConnection('blogAuthors', 'cms', response.blogAuthors),
      this.mapConnection('landingHero', 'cms', response.landingHero),
      this.mapConnection('landingFeatures', 'cms', response.landingFeatures),
      this.mapConnection('landingTestimonials', 'cms', response.landingTestimonials),
    ];

    return {
      groups,
      totalCount: groups.reduce((sum, group) => sum + group.totalCount, 0),
      variables,
    };
  }

  private mapConnection(
    tableId: SearchTableId,
    domain: SearchDomain,
    connection: SearchConnection,
  ): SearchGroupResult {
    return {
      domain,
      rows: connection.edges.map(({ node }) => node),
      tableId,
      totalCount: connection.totalCount,
    };
  }
}

function normalizeSearchFirst(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_SEARCH_FIRST;
  return Math.min(MAX_SEARCH_FIRST, Math.max(1, Math.floor(value)));
}

container.register(SearchDataSource, () => new SearchDataSource(container.get(ApiService)), {
  scope: 'transient',
});
