import type { Demo_Rpg_DataGetStatsesInput, StatsQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type StatNode = StatsQuery['statses']['edges'][number]['node'];
export type StatsRequestData = Demo_Rpg_DataGetStatsesInput;

export interface StatsResult {
  readonly items: readonly StatNode[];
  readonly pageInfo: StatsQuery['statses']['pageInfo'];
  readonly totalCount: number;
}

export class StatsDataSource {
  public readonly request: ObservableRequest<StatsResult, [StatsRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchStats(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchStats(signal: AbortSignal, data: StatsRequestData): Promise<StatsResult> {
    const response = await this.api.sdk.Stats({ data }, undefined, signal);
    return this.mapResponse(response);
  }

  private mapResponse(response: StatsQuery): StatsResult {
    const connection = response.statses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  StatsDataSource,
  () => new StatsDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
