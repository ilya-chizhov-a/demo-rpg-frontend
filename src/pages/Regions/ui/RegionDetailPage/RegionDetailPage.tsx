import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { DetailBackButton, PageShell, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { RegionDetailViewModel } from '../../model/RegionDetailViewModel';
import { RegionDetailOverview } from '../RegionDetailOverview/RegionDetailOverview';
import { RegionDetailSkeleton } from '../RegionDetailSkeleton/RegionDetailSkeleton';

export const RegionDetailPage = observer(() => {
  const params = useParams();
  const vm = useViewModel(RegionDetailViewModel, params.id ?? '');

  return (
    <PageShell>
      <DetailBackButton
        ariaLabel={vm.copy.detail.backAriaLabel}
        fallbackHref="/regions"
        label={vm.copy.detail.backLabel}
      />
      <Box mb="4">
        <SectionSubnav ariaLabel={vm.copy.worldSectionAriaLabel} items={vm.sectionNavItems} />
      </Box>

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
        {renderWhen(vm.showDetail, <RegionDetailOverview vm={vm} />)}
      </Box>
      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="region-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});
