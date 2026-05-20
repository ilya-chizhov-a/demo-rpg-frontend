import type {
  Demo_Rpg_DataGetItem_TypesesInput,
  ItemTypesQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type ItemTypeNode = ItemTypesQuery['item_typeses']['edges'][number]['node'];
export type ItemTypesRequestData = Demo_Rpg_DataGetItem_TypesesInput;

export interface ItemTypesResult {
  readonly items: readonly ItemTypeNode[];
  readonly pageInfo: ItemTypesQuery['item_typeses']['pageInfo'];
  readonly totalCount: number;
}

export class ItemTypesDataSource {
  public readonly request: ObservableRequest<ItemTypesResult, [ItemTypesRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchItemTypes(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchItemTypes(
    signal: AbortSignal,
    data: ItemTypesRequestData,
  ): Promise<ItemTypesResult> {
    const response = await this.api.sdk.ItemTypes({ data }, undefined, signal);
    return this.mapResponse(response);
  }

  private mapResponse(response: ItemTypesQuery): ItemTypesResult {
    const connection = response.item_typeses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  ItemTypesDataSource,
  () => new ItemTypesDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
