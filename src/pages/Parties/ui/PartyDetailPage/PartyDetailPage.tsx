import { Box, Button, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink, useParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { PageShell, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { PartyDetailViewModel } from '../../model/PartyDetailViewModel';
import { PartyDetailHeader } from '../PartyDetailHeader/PartyDetailHeader';
import { PartyDetailMemberGrid } from '../PartyDetailMemberGrid/PartyDetailMemberGrid';
import { PartyDetailPanel } from '../PartyDetailPanel/PartyDetailPanel';
import { PartyDetailSkeleton } from '../PartyDetailSkeleton/PartyDetailSkeleton';

export const PartyDetailPage = observer(() => {
  const params = useParams();
  const vm = useViewModel(PartyDetailViewModel, params.id ?? '');

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
      <Box mb="4">
        <SectionSubnav ariaLabel={vm.copy.heroesSectionAriaLabel} items={vm.sectionNavItems} />
      </Box>

      <Box minW="0">
        {renderWhen(vm.showLoading, <PartyDetailSkeleton />)}
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
          vm.showNotFound,
          <StatePanel
            description={vm.copy.detail.notFoundDescription}
            title={vm.copy.detail.notFoundTitle}
          />,
        )}
        {renderWhen(
          vm.showDetail,
          <Stack gap="4">
            <PartyDetailHeader vm={vm} />
            <PartyDetailPanel vm={vm} />
            <PartyDetailMemberGrid vm={vm} />
          </Stack>,
        )}
      </Box>
      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="party-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});
