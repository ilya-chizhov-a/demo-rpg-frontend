import { Box, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { DetailBackButton, PageShell, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { FactionDetailViewModel } from '../../model/FactionDetailViewModel';
import { FactionDetailOverview } from '../FactionDetailOverview/FactionDetailOverview';
import { FactionDetailRelations } from '../FactionDetailRelations/FactionDetailRelations';
import { FactionDetailSkeleton } from '../FactionDetailSkeleton/FactionDetailSkeleton';

export const FactionDetailPage = observer(() => {
  const params = useParams();
  const vm = useViewModel(FactionDetailViewModel, params.id ?? '');

  return (
    <PageShell>
      <DetailBackButton
        ariaLabel={vm.copy.detail.backAriaLabel}
        fallbackHref="/factions"
        label={vm.copy.detail.backLabel}
      />
      <Box mb="4">
        <SectionSubnav ariaLabel={vm.copy.worldSectionAriaLabel} items={vm.sectionNavItems} />
      </Box>

      <Box minW="0">
        {renderWhen(vm.showLoading, <FactionDetailSkeleton />)}
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
            <FactionDetailOverview vm={vm} />
            <FactionDetailRelations vm={vm} />
          </Stack>,
        )}
      </Box>
      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="faction-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});
