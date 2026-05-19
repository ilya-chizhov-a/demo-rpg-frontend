import {
  type Demo_Rpg_DataGetLocationsesInput,
  type Demo_Rpg_DataGetRegionsesInput,
  type LocationRegionOptionsQuery,
  type LocationsQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type LocationNode = LocationsQuery['locationses']['edges'][number]['node'];
export type LocationRegionOptionNode =
  LocationRegionOptionsQuery['regionses']['edges'][number]['node'];
export type LocationsRequestData = Demo_Rpg_DataGetLocationsesInput;
export type LocationsRegionsRequestData = Demo_Rpg_DataGetRegionsesInput;

export interface LocationsResult {
  readonly items: readonly LocationNode[];
  readonly pageInfo: LocationsQuery['locationses']['pageInfo'];
  readonly regions: readonly LocationRegionOptionNode[];
  readonly totalCount: number;
}

export class LocationsDataSource {
  public readonly request: ObservableRequest<
    LocationsResult,
    [LocationsRequestData, LocationsRegionsRequestData]
  >;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data, regionsData) =>
      this.fetchLocations(signal, data, regionsData),
    );
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchLocations(
    signal: AbortSignal,
    data: LocationsRequestData,
    regionsData: LocationsRegionsRequestData,
  ): Promise<LocationsResult> {
    const [locationsResponse, regions] = await Promise.all([
      this.api.sdk.Locations({ data }, undefined, signal),
      this.fetchAllRegions(signal, regionsData),
    ]);
    return this.mapResponse(locationsResponse, regions);
  }

  private async fetchAllRegions(
    signal: AbortSignal,
    data: LocationsRegionsRequestData,
  ): Promise<readonly LocationRegionOptionNode[]> {
    const regions: LocationRegionOptionNode[] = [];
    let requestData: LocationsRegionsRequestData = data;

    for (;;) {
      const response = await this.api.sdk.LocationRegionOptions(
        { data: requestData },
        undefined,
        signal,
      );
      regions.push(...response.regionses.edges.map(({ node }) => node));

      if (!response.regionses.pageInfo.hasNextPage) return regions;
      requestData = {
        ...data,
        after: response.regionses.pageInfo.endCursor ?? undefined,
      };
    }
  }

  private mapResponse(
    response: LocationsQuery,
    regions: readonly LocationRegionOptionNode[],
  ): LocationsResult {
    const connection = response.locationses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      regions,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  LocationsDataSource,
  () => new LocationsDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
