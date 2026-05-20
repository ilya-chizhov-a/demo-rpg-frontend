import {
  type Demo_Rpg_DataGetPartiesesInput,
  type PartiesQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type PartyNode = PartiesQuery['partieses']['edges'][number]['node'];
export type PartyHeroNode = PartyNode['data']['hero_ids'][number];
export type PartiesRequestData = Demo_Rpg_DataGetPartiesesInput;

export interface PartiesResult {
  readonly items: readonly PartyNode[];
  readonly pageInfo: PartiesQuery['partieses']['pageInfo'];
  readonly totalCount: number;
}

export class PartiesDataSource {
  public readonly request: ObservableRequest<PartiesResult, [PartiesRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchParties(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchParties(
    signal: AbortSignal,
    data: PartiesRequestData,
  ): Promise<PartiesResult> {
    const response = await this.api.sdk.Parties({ data }, undefined, signal);
    return this.mapResponse(response);
  }

  private mapResponse(response: PartiesQuery): PartiesResult {
    const connection = response.partieses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  PartiesDataSource,
  () => new PartiesDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
