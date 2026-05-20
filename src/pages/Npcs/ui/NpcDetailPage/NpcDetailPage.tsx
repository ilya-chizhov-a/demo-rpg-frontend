import { Box, Button, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink, useParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { PageShell, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { NpcDetailViewModel } from '../../model/NpcDetailViewModel';
import { NpcDetailOverview } from '../NpcDetailOverview/NpcDetailOverview';
import { NpcDetailSkeleton } from '../NpcDetailSkeleton/NpcDetailSkeleton';

export const NpcDetailPage = observer(() => {
  const params = useParams();
  const vm = useViewModel(NpcDetailViewModel, params.id ?? '');

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
        <RouterLink to="/npcs">{vm.copy.detail.backLabel}</RouterLink>
      </Button>
      <Box mb="4">
        <SectionSubnav ariaLabel={vm.copy.npcsSectionAriaLabel} items={vm.sectionNavItems} />
      </Box>

      <Box minW="0">
        {renderWhen(vm.showLoading, <NpcDetailSkeleton />)}
        {renderWhen(
          vm.showError,
          <StatePanel
            actionLabel={vm.sharedCopy.retry}
            description={vm.copy.detail.errorDescription}
            onAction={() => void vm.retry()}
            title={vm.copy.detail.errorTitle}
            tone="error"
          />,
        )}
        {renderWhen(
          vm.showDetail,
          <Stack gap="4">
            <NpcDetailOverview vm={vm} />
          </Stack>,
        )}
      </Box>
      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="npc-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});
