import {
  type Demo_Rpg_DataGetLocationsesInput,
  type Demo_Rpg_DataGetNpcsesInput,
  type NpcLocationOptionsQuery,
  type NpcsQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type NpcNode = NpcsQuery['npcses']['edges'][number]['node'];
export type NpcLocationOptionNode =
  NpcLocationOptionsQuery['locationses']['edges'][number]['node'];
export type NpcsRequestData = Demo_Rpg_DataGetNpcsesInput;
export type NpcLocationsRequestData = Demo_Rpg_DataGetLocationsesInput;

export interface NpcsResult {
  readonly items: readonly NpcNode[];
  readonly locations: readonly NpcLocationOptionNode[];
  readonly pageInfo: NpcsQuery['npcses']['pageInfo'];
  readonly totalCount: number;
}

export class NpcsDataSource {
  public readonly request: ObservableRequest<
    NpcsResult,
    [NpcsRequestData, NpcLocationsRequestData]
  >;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data, locationsData) =>
      this.fetchNpcs(signal, data, locationsData),
    );
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchNpcs(
    signal: AbortSignal,
    data: NpcsRequestData,
    locationsData: NpcLocationsRequestData,
  ): Promise<NpcsResult> {
    const [npcsResponse, locations] = await Promise.all([
      this.api.sdk.Npcs({ data }, undefined, signal),
      this.fetchAllLocations(signal, locationsData),
    ]);
    return this.mapResponse(npcsResponse, locations);
  }

  private async fetchAllLocations(
    signal: AbortSignal,
    data: NpcLocationsRequestData,
  ): Promise<readonly NpcLocationOptionNode[]> {
    const locations: NpcLocationOptionNode[] = [];
    let requestData: NpcLocationsRequestData = data;

    for (;;) {
      const response = await this.api.sdk.NpcLocationOptions(
        { data: requestData },
        undefined,
        signal,
      );
      locations.push(...response.locationses.edges.map(({ node }) => node));

      if (!response.locationses.pageInfo.hasNextPage) return locations;
      const nextCursor = response.locationses.pageInfo.endCursor;
      if (!nextCursor || nextCursor === requestData.after) return locations;
      requestData = {
        ...data,
        after: nextCursor,
      };
    }
  }

  private mapResponse(
    response: NpcsQuery,
    locations: readonly NpcLocationOptionNode[],
  ): NpcsResult {
    const connection = response.npcses;
    return {
      items: connection.edges.map(({ node }) => node),
      locations,
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  NpcsDataSource,
  () => new NpcsDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
