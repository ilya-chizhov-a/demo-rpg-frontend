import { Box, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { PageShell, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { RegionDetailViewModel } from '../../model/RegionDetailViewModel';
import { RegionBackendPanel } from '../RegionBackendPanel/RegionBackendPanel';
import { RegionDetailHeader } from '../RegionDetailHeader/RegionDetailHeader';
import { RegionDetailPanel } from '../RegionDetailPanel/RegionDetailPanel';
import { RegionDetailSkeleton } from '../RegionDetailSkeleton/RegionDetailSkeleton';

export const RegionDetailPage = observer(() => {
  const params = useParams();
  const vm = useViewModel(RegionDetailViewModel, params.id ?? '');

  return (
    <PageShell>
      <RegionDetailHeader vm={vm} />
      <SectionSubnav ariaLabel={vm.copy.worldSectionAriaLabel} items={vm.sectionNavItems} />

      <Box minW="0">
        {renderWhen(vm.showLoading, <RegionDetailSkeleton />)}
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
            <RegionDetailPanel vm={vm} />
            <RegionBackendPanel copy={vm.copy.detail} />
          </Stack>,
        )}
      </Box>
      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="region-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});
