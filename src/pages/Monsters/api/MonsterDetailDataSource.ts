import type { MonsterDetailQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type MonsterDetailNode = MonsterDetailQuery['monsters'];
export type MonsterDetailAbilityNode = MonsterDetailNode['data']['ability_ids'][number];
export type MonsterDetailDropNode = MonsterDetailNode['data']['drops'][number];

export interface MonsterDetailResult {
  readonly item: MonsterDetailNode;
}

export class MonsterDetailDataSource {
  public readonly request: ObservableRequest<MonsterDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, id) => this.fetchMonster(signal, id));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchMonster(signal: AbortSignal, id: string): Promise<MonsterDetailResult> {
    const response = await this.api.sdk.MonsterDetail({ id }, undefined, signal);
    return { item: response.monsters };
  }
}

container.register(
  MonsterDetailDataSource,
  () => new MonsterDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
