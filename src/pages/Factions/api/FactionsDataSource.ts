import {
  type Demo_Rpg_DataGetFactionsesInput,
  type FactionsQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';
import { createFactionDataSourceError } from './factionDataSourceError';

export type FactionNode = FactionsQuery['factionses']['edges'][number]['node'];
export type FactionsRequestData = Demo_Rpg_DataGetFactionsesInput;

export interface FactionsResult {
  readonly items: readonly FactionNode[];
  readonly pageInfo: FactionsQuery['factionses']['pageInfo'];
  readonly totalCount: number;
}

export class FactionsDataSource {
  public readonly request: ObservableRequest<FactionsResult, [FactionsRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchFactions(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchFactions(
    signal: AbortSignal,
    data: FactionsRequestData,
  ): Promise<FactionsResult> {
    try {
      const response = await this.api.sdk.Factions({ data }, undefined, signal);
      return this.mapResponse(response);
    } catch (error) {
      throw createFactionDataSourceError('Failed to load factions', error);
    }
  }

  private mapResponse(response: FactionsQuery): FactionsResult {
    const connection = response.factionses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  FactionsDataSource,
  () => new FactionsDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
