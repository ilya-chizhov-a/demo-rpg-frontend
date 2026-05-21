import { Box, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

import { useViewModel } from 'src/shared/lib';
import { DetailBackButton, PageShell, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { MonsterDetailViewModel } from '../../model/MonsterDetailViewModel';
import { MonsterDetailOverview } from '../MonsterDetailOverview/MonsterDetailOverview';
import { MonsterDetailSkeleton } from '../MonsterDetailSkeleton/MonsterDetailSkeleton';

export const MonsterDetailPage = observer(() => {
  const params = useParams();
  const vm = useViewModel(MonsterDetailViewModel, params.id ?? '');

  return (
    <PageShell>
      <DetailBackButton
        ariaLabel={vm.copy.detail.backAriaLabel}
        fallbackHref={vm.backHref}
        label={vm.copy.detail.backLabel}
      />

      <Box minW="0">{renderMonsterDetailBody(vm)}</Box>
      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="monster-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});

function renderMonsterDetailBody(vm: MonsterDetailViewModel) {
  if (vm.showLoading) return <MonsterDetailSkeleton />;

  if (vm.showError) {
    return (
      <StatePanel
        actionLabel={vm.sharedCopy.retry}
        description={vm.copy.detail.errorDescription}
        onAction={() => {
          void vm.retry();
        }}
        title={vm.copy.detail.errorTitle}
        tone="error"
      />
    );
  }

  if (vm.showNotFound) {
    return (
      <StatePanel
        description={vm.copy.detail.notFoundDescription}
        title={vm.copy.detail.notFoundTitle}
      />
    );
  }

  if (!vm.showDetail) return null;

  return (
    <Stack gap="4">
      <MonsterDetailOverview vm={vm} />
    </Stack>
  );
}
