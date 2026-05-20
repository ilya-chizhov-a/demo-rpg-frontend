import type { Demo_Rpg_DataGetEffectsesInput, EffectsQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type EffectNode = EffectsQuery['effectses']['edges'][number]['node'];
export type EffectsRequestData = Demo_Rpg_DataGetEffectsesInput;

export interface EffectsResult {
  readonly items: readonly EffectNode[];
  readonly pageInfo: EffectsQuery['effectses']['pageInfo'];
  readonly totalCount: number;
}

export class EffectsDataSource {
  public readonly request: ObservableRequest<EffectsResult, [EffectsRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchEffects(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchEffects(signal: AbortSignal, data: EffectsRequestData): Promise<EffectsResult> {
    const response = await this.api.sdk.Effects({ data }, undefined, signal);
    return this.mapResponse(response);
  }

  private mapResponse(response: EffectsQuery): EffectsResult {
    const connection = response.effectses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  EffectsDataSource,
  () => new EffectsDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
