import {
  type Demo_Rpg_DataGetDialogsesInput,
  type DialogsQuery,
} from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type DialogNode = DialogsQuery['dialogses']['edges'][number]['node'];
export type DialogsRequestData = Demo_Rpg_DataGetDialogsesInput;

export interface DialogsResult {
  readonly items: readonly DialogNode[];
  readonly pageInfo: DialogsQuery['dialogses']['pageInfo'];
  readonly totalCount: number;
}

export class DialogsDataSource {
  public readonly request: ObservableRequest<DialogsResult, [DialogsRequestData]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, data) => this.fetchDialogs(signal, data));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchDialogs(
    signal: AbortSignal,
    data: DialogsRequestData,
  ): Promise<DialogsResult> {
    const response = await this.api.sdk.Dialogs({ data }, undefined, signal);
    return this.mapResponse(response);
  }

  private mapResponse(response: DialogsQuery): DialogsResult {
    const connection = response.dialogses;
    return {
      items: connection.edges.map(({ node }) => node),
      pageInfo: connection.pageInfo,
      totalCount: connection.totalCount,
    };
  }
}

container.register(
  DialogsDataSource,
  () => new DialogsDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
