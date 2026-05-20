import {
  type Demo_Rpg_DataGetClassesesInput,
  type Demo_Rpg_DataGetHeroesesInput,
  type HeroesQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';
import { createHeroDataSourceError } from './heroDataSourceError';

export type HeroNode = HeroesQuery['heroeses']['edges'][number]['node'];
export type HeroClassNode = HeroesQuery['classeses']['edges'][number]['node'];
export type HeroLinkedClassNode = HeroNode['data']['class_id'];
export type HeroesRequestData = Demo_Rpg_DataGetHeroesesInput;
export type HeroClassesRequestData = Demo_Rpg_DataGetClassesesInput;

export interface HeroesRequest {
  readonly classesData: HeroClassesRequestData;
  readonly data: HeroesRequestData;
}

export interface HeroesResult {
  readonly classes: readonly HeroClassNode[];
  readonly items: readonly HeroNode[];
  readonly pageInfo: HeroesQuery['heroeses']['pageInfo'];
  readonly totalCount: number;
}

export class HeroesDataSource {
  public readonly request: ObservableRequest<HeroesResult, [HeroesRequest]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, request) => this.fetchHeroes(signal, request));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchHeroes(
    signal: AbortSignal,
    request: HeroesRequest,
  ): Promise<HeroesResult> {
    try {
      const response = await this.api.sdk.Heroes(
        {
          classesData: request.classesData,
          data: request.data,
        },
        undefined,
        signal,
      );
      return this.mapResponse(response);
    } catch (error) {
      throw createHeroDataSourceError('Failed to load heroes', error);
    }
  }

  private mapResponse(response: HeroesQuery): HeroesResult {
    return {
      classes: response.classeses.edges.map(({ node }) => node),
      items: response.heroeses.edges.map(({ node }) => node),
      pageInfo: response.heroeses.pageInfo,
      totalCount: response.heroeses.totalCount,
    };
  }
}

container.register(
  HeroesDataSource,
  () => new HeroesDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
