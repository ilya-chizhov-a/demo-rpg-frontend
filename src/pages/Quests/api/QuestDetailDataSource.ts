import type { QuestDetailQuery } from 'src/__generated__/graphql-request';
import {
  container,
  createNullableGraphQLDetailRequest,
  type NullableGraphQLDetailResult,
  ObservableRequest,
} from 'src/shared/lib';
import { ApiService } from 'src/shared/model';

export type QuestDetailNode = NonNullable<QuestDetailQuery['quests']>;
export type QuestDetailStepNode = QuestDetailNode['data']['steps'][number];
export type QuestDetailRewardNode = QuestDetailStepNode['rewards'][number];
export type QuestDetailResult = NullableGraphQLDetailResult<QuestDetailNode>;

export class QuestDetailDataSource {
  public readonly request: ObservableRequest<QuestDetailResult, [string]>;

  constructor(private readonly api: ApiService) {
    this.request = createNullableGraphQLDetailRequest(
      (signal, id) => this.api.sdk.QuestDetail({ id }, undefined, signal),
      (response) => response.quests,
    );
  }

  public reset(): void {
    this.request.reset();
  }
}

container.register(
  QuestDetailDataSource,
  () => new QuestDetailDataSource(container.get(ApiService)),
  { scope: 'transient' },
);
