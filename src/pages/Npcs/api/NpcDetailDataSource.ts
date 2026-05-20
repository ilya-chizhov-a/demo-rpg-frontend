import type { NpcDetailQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type NpcDetailNode = NpcDetailQuery['npcs'];

export interface NpcDetailResult {
  readonly item: NpcDetailNode;
}

export class NpcDetailDataSource {
  public readonly request: ObservableRequest<NpcDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, id) => this.fetchNpc(signal, id));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchNpc(signal: AbortSignal, id: string): Promise<NpcDetailResult> {
    const response = await this.api.sdk.NpcDetail({ id }, undefined, signal);
    return { item: response.npcs };
  }
}

container.register(
  NpcDetailDataSource,
  () => new NpcDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
