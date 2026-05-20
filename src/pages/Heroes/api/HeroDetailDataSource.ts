import type { HeroDetailQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';
import { createHeroDataSourceError } from './heroDataSourceError';

export type HeroDetailNode = HeroDetailQuery['heroes'];

export interface HeroDetailResult {
  readonly item: HeroDetailNode;
}

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
      const response = await this.api.sdk.HeroDetail({ id }, undefined, signal);
      return {
        item: response.heroes,
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
