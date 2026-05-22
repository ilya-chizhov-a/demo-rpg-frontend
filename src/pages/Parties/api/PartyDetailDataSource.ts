import type { PartyDetailQuery } from 'src/__generated__/graphql-request';
import {
  container,
  createNullableGraphQLDetailRequest,
  type NullableGraphQLDetailResult,
  ObservableRequest,
} from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type PartyDetailNode = NonNullable<PartyDetailQuery['parties']>;
export type PartyDetailHeroNode = PartyDetailNode['data']['hero_ids'][number];
export type PartyDetailResult = NullableGraphQLDetailResult<PartyDetailNode>;

export class PartyDetailDataSource {
  public readonly request: ObservableRequest<PartyDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = createNullableGraphQLDetailRequest(
      (signal, id) => this.api.sdk.PartyDetail({ id }, undefined, signal),
      (response) => response.parties,
    );
  }

  public reset(): void {
    this.request.reset();
  }
}

container.register(
  PartyDetailDataSource,
  () => new PartyDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
