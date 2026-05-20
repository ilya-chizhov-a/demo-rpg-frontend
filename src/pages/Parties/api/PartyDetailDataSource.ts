import type { PartyDetailQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type PartyDetailNode = PartyDetailQuery['parties'];
export type PartyDetailHeroNode = PartyDetailNode['data']['hero_ids'][number];

export interface PartyDetailResult {
  readonly item: PartyDetailNode;
}

export class PartyDetailDataSource {
  public readonly request: ObservableRequest<PartyDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, id) => this.fetchParty(signal, id));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchParty(signal: AbortSignal, id: string): Promise<PartyDetailResult> {
    const response = await this.api.sdk.PartyDetail({ id }, undefined, signal);
    return { item: response.parties };
  }
}

container.register(
  PartyDetailDataSource,
  () => new PartyDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
