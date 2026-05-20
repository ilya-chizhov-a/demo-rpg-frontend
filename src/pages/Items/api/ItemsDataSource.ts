import {
  type Demo_Rpg_DataGetItemsesInput,
  type Demo_Rpg_DataGetItem_TypesesInput,
  type ItemsPageQuery,
  type ItemsQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type ItemNode = ItemsQuery['itemses']['edges'][number]['node'];
export type ItemTypeNode = ItemsQuery['item_typeses']['edges'][number]['node'];
export type ItemsRequestData = Demo_Rpg_DataGetItemsesInput;
export type ItemTypesRequestData = Demo_Rpg_DataGetItem_TypesesInput;

export interface ItemsRequest {
  readonly data: ItemsRequestData;
  readonly typesData?: ItemTypesRequestData;
}

export interface ItemsResult {
  readonly itemTypes: readonly ItemTypeNode[];
  readonly items: readonly ItemNode[];
  readonly pageInfo: ItemsQuery['itemses']['pageInfo'];
  readonly totalCount: number;
}

export class ItemsDataSource {
  public readonly request: ObservableRequest<ItemsResult, [ItemsRequest]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, request) => this.fetchItems(signal, request));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchItems(signal: AbortSignal, request: ItemsRequest): Promise<ItemsResult> {
    if (!request.typesData) {
      const response = await this.api.sdk.ItemsPage({ data: request.data }, undefined, signal);
      return this.mapPageResponse(response);
    }

    const response = await this.api.sdk.Items(
      {
        data: request.data,
        typesData: request.typesData,
      },
      undefined,
      signal,
    );
    return this.mapResponse(response);
  }

  private mapResponse(response: ItemsQuery): ItemsResult {
    const connection = response.itemses;
    return {
      itemTypes: response.item_typeses.edges.map(({ node }) => node),
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }

  private mapPageResponse(response: ItemsPageQuery): ItemsResult {
    const connection = response.itemses;
    return {
      itemTypes: [],
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  ItemsDataSource,
  () => new ItemsDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
