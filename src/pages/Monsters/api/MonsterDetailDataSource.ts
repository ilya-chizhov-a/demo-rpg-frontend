import type { MonsterDetailQuery } from 'src/__generated__/graphql-request';
import {
  container,
  createNullableGraphQLDetailRequest,
  type NullableGraphQLDetailResult,
  ObservableRequest,
} from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type MonsterDetailNode = NonNullable<MonsterDetailQuery['monsters']>;
export type MonsterDetailAbilityNode = MonsterDetailNode['data']['ability_ids'][number];
export type MonsterDetailDropNode = MonsterDetailNode['data']['drops'][number];
export type MonsterDetailResult = NullableGraphQLDetailResult<MonsterDetailNode>;

export class MonsterDetailDataSource {
  public readonly request: ObservableRequest<MonsterDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = createNullableGraphQLDetailRequest(
      (signal, id) => this.api.sdk.MonsterDetail({ id }, undefined, signal),
      (response) => response.monsters,
    );
  }

  public reset(): void {
    this.request.reset();
  }
}

container.register(
  MonsterDetailDataSource,
  () => new MonsterDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
