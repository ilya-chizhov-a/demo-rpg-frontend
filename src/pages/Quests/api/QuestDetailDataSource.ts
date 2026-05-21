import type { QuestDetailQuery } from 'src/__generated__/graphql-request';
import { container, ObservableRequest } from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type QuestDetailNode = QuestDetailQuery['quests'];
export type QuestDetailStepNode = QuestDetailNode['data']['steps'][number];
export type QuestDetailRewardNode = QuestDetailStepNode['rewards'][number];

export interface QuestDetailResult {
  readonly item: QuestDetailNode;
}

export class QuestDetailDataSource {
  public readonly request: ObservableRequest<QuestDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = ObservableRequest.of((signal, id) => this.fetchQuest(signal, id));
  }

  public reset(): void {
    this.request.reset();
  }

  private async fetchQuest(signal: AbortSignal, id: string): Promise<QuestDetailResult> {
    const response = await this.api.sdk.QuestDetail({ id }, undefined, signal);
    return { item: response.quests };
  }
}

container.register(
  QuestDetailDataSource,
  () => new QuestDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
