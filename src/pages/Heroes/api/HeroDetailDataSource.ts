import type { HeroDetailQuery } from 'src/__generated__/graphql-request';
import {
  container,
  type NullableGraphQLDetailResult,
  ObservableRequest,
  readNullableGraphQLResult,
} from 'src/shared/lib';
import { ApiService } from 'src/shared/model';
import { createHeroDataSourceError } from './heroDataSourceError';

export type HeroDetailNode = NonNullable<HeroDetailQuery['heroes']>;
export type HeroDetailResult = NullableGraphQLDetailResult<HeroDetailNode>;

export class HeroDetailDataSource {
  public readonly request: ObservableRequest<HeroDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, id) => this.fetchHero(signal, id));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchHero(signal: AbortSignal, id: string): Promise<HeroDetailResult> {
    try {
      const response = await readNullableGraphQLResult(() =>
        this.api.sdk.HeroDetail({ id }, undefined, signal),
      );
      return {
        item: response?.heroes ?? null,
      };
    } catch (error) {
      throw createHeroDataSourceError('Failed to load hero detail', error);
    }
  }
}

container.register(
  HeroDetailDataSource,
  () => new HeroDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
