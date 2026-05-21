import { Box, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';
import { useParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { DetailBackButton, PageShell, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { QuestDetailViewModel } from '../../model/QuestDetailViewModel';
import { QuestDetailHeader } from '../QuestDetailHeader/QuestDetailHeader';
import { QuestDetailPanel } from '../QuestDetailPanel/QuestDetailPanel';
import { QuestDetailSkeleton } from '../QuestDetailSkeleton/QuestDetailSkeleton';
import { QuestTimeline } from '../QuestTimeline/QuestTimeline';

export const QuestDetailPage = observer(function QuestDetailPage() {
  const params = useParams();
  const vm = useViewModel(QuestDetailViewModel, params.id ?? '');

  return (
    <PageShell>
      <DetailBackButton
        ariaLabel={vm.copy.detail.backAriaLabel}
        fallbackHref={vm.backHref}
        label={vm.copy.detail.backLabel}
      />
      <Box mb="4">
        <SectionSubnav ariaLabel={vm.copy.questsSectionAriaLabel} items={vm.sectionNavItems} />
      </Box>

      <Box minW="0">
        {renderDetailContent(vm)}
      </Box>
      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="quest-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});

function renderDetailContent(vm: QuestDetailViewModel): ReactElement {
  return (
    <>
      {renderWhen(vm.showLoading, <QuestDetailSkeleton />)}
      {renderWhen(vm.showError, renderErrorState(vm))}
      {renderWhen(vm.showNotFound, renderNotFoundState(vm))}
      {renderWhen(vm.showDetail, renderLoadedDetail(vm))}
    </>
  );
}

function renderErrorState(vm: QuestDetailViewModel): ReactElement {
  return (
    <StatePanel
      actionLabel={vm.sharedCopy.retry}
      description={vm.copy.detail.errorDescription}
      onAction={() => {
        vm.retry().catch(reportQuestDetailActionError);
      }}
      title={vm.copy.detail.errorTitle}
      tone="error"
    />
  );
}

function renderNotFoundState(vm: QuestDetailViewModel): ReactElement {
  return (
    <StatePanel
      description={vm.copy.detail.notFoundDescription}
      title={vm.copy.detail.notFoundTitle}
    />
  );
}

function renderLoadedDetail(vm: QuestDetailViewModel): ReactElement {
  return (
    <Stack gap="4">
      <QuestDetailHeader vm={vm} />
      <QuestDetailPanel vm={vm} />
      <QuestTimeline vm={vm} />
    </Stack>
  );
}

function reportQuestDetailActionError(error: unknown): void {
  console.error('[QuestDetailPage] action failed', error);
}
