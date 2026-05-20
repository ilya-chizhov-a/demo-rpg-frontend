import { Box, Button, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink, useParams } from 'react-router';

import { useViewModel } from 'src/shared/lib';
import { PageShell, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { MonsterDetailViewModel } from '../../model/MonsterDetailViewModel';
import { MonsterDetailOverview } from '../MonsterDetailOverview/MonsterDetailOverview';
import { MonsterDetailSkeleton } from '../MonsterDetailSkeleton/MonsterDetailSkeleton';

export const MonsterDetailPage = observer(() => {
  const params = useParams();
  const vm = useViewModel(MonsterDetailViewModel, params.id ?? '');

  return (
    <PageShell>
      <Button
        aria-label={vm.copy.detail.backAriaLabel}
        asChild
        borderColor="rgba(103, 232, 249, 0.34)"
        color="#67e8f9"
        mb="4"
        minH="44px"
        size="md"
        variant="outline"
        w="fit-content"
        _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
      >
        <RouterLink to={vm.backHref}>{vm.copy.detail.backLabel}</RouterLink>
      </Button>

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
