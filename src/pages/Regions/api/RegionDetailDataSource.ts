import type { RegionDetailQuery } from 'src/__generated__/graphql-request';
import {
  container,
  createNullableGraphQLDetailRequest,
  type NullableGraphQLDetailResult,
  ObservableRequest,
} from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type RegionDetailNode = NonNullable<RegionDetailQuery['regions']>;
export type RegionDetailResult = NullableGraphQLDetailResult<RegionDetailNode>;

export class RegionDetailDataSource {
  public readonly request: ObservableRequest<RegionDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = createNullableGraphQLDetailRequest(
      (signal, id) => this.api.sdk.RegionDetail({ id }, undefined, signal),
      (response) => response.regions,
    );
  }

  public reset(): void {
    this.request.reset();
  }
}

container.register(
  RegionDetailDataSource,
  () => new RegionDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
