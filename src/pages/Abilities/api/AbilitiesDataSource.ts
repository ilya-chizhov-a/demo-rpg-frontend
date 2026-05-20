import {
  type AbilitiesQuery,
  type Demo_Rpg_DataGetAbilitiesesInput,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type AbilityNode = AbilitiesQuery['abilitieses']['edges'][number]['node'];
export type AbilitiesRequestData = Demo_Rpg_DataGetAbilitiesesInput;

export interface AbilitiesResult {
  readonly items: readonly AbilityNode[];
  readonly pageInfo: AbilitiesQuery['abilitieses']['pageInfo'];
  readonly totalCount: number;
}

export class AbilitiesDataSource {
  public readonly request: ObservableRequest<AbilitiesResult, [AbilitiesRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchAbilities(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchAbilities(
    signal: AbortSignal,
    data: AbilitiesRequestData,
  ): Promise<AbilitiesResult> {
    const response = await this.api.sdk.Abilities({ data }, undefined, signal);
    return this.mapResponse(response);
  }

  private mapResponse(response: AbilitiesQuery): AbilitiesResult {
    const connection = response.abilitieses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  AbilitiesDataSource,
  () => new AbilitiesDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
