import type { ItemDetailQuery } from 'src/__generated__/graphql-request';
import {
  container,
  createNullableGraphQLDetailRequest,
  type NullableGraphQLDetailResult,
  ObservableRequest,
} from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type ItemDetailNode = NonNullable<ItemDetailQuery['items']>;
export type ItemDetailModifierNode = ItemDetailNode['data']['modifiers'][number];
export type ItemDetailResult = NullableGraphQLDetailResult<ItemDetailNode>;

export class ItemDetailDataSource {
  public readonly request: ObservableRequest<ItemDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = createNullableGraphQLDetailRequest(
      (signal, id) => this.api.sdk.ItemDetail({ id }, undefined, signal),
      (response) => response.items,
    );
  }

  public reset(): void {
    this.request.reset();
  }
}

container.register(
  ItemDetailDataSource,
  () => new ItemDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
