import type { LocationDetailQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type LocationDetailNode = LocationDetailQuery['locations'];

export interface LocationDetailResult {
  readonly item: LocationDetailNode;
}

export class LocationDetailDataSource {
  public readonly request: ObservableRequest<LocationDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, id) => this.fetchLocation(signal, id));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchLocation(signal: AbortSignal, id: string): Promise<LocationDetailResult> {
    const response = await this.api.sdk.LocationDetail({ id }, undefined, signal);
    return { item: response.locations };
  }
}

container.register(
  LocationDetailDataSource,
  () => new LocationDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
