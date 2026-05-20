import type { ItemDetailQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type ItemDetailNode = ItemDetailQuery['items'];
export type ItemDetailModifierNode = ItemDetailNode['data']['modifiers'][number];

export interface ItemDetailResult {
  readonly item: ItemDetailNode;
}

export class ItemDetailDataSource {
  public readonly request: ObservableRequest<ItemDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, id) => this.fetchItem(signal, id));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchItem(signal: AbortSignal, id: string): Promise<ItemDetailResult> {
    const response = await this.api.sdk.ItemDetail({ id }, undefined, signal);
    return { item: response.items };
  }
}

container.register(
  ItemDetailDataSource,
  () => new ItemDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
