import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { RegionsViewModel } from '../../model/RegionsViewModel';
import { RegionList } from '../RegionList/RegionList';
import { RegionsHeader } from '../RegionsHeader/RegionsHeader';
import { RegionsToolbar } from '../RegionsToolbar/RegionsToolbar';

export const RegionsPage = observer(() => {
  const vm = useViewModel(RegionsViewModel);

  return (
    <CatalogPageLayout
      empty={renderWhen(
        vm.showEmpty,
        <StatePanel
          actionLabel={vm.hasActiveFilter ? vm.copy.emptyActionLabel : undefined}
          description={vm.copy.emptyDescription}
          onAction={vm.hasActiveFilter ? () => void vm.resetFilters() : undefined}
          title={vm.copy.emptyTitle}
        />,
      )}
      error={renderWhen(
        vm.showError,
        <StatePanel
          actionLabel={vm.copy.retryActionLabel}
          description={vm.copy.errorDescription}
          onAction={() => void vm.retry()}
          title={vm.copy.errorTitle}
          tone="error"
        />,
      )}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="regions-explainer-title"
          isLoading={vm.showLoading}
        />
      }
      footerAction={renderWhen(
        vm.hasNextPage,
        <Box display="flex" justifyContent="center" mt="6">
          <Button
            colorPalette="green"
            disabled={!vm.canLoadMore}
            onClick={() => void vm.loadMore()}
          >
            {vm.showRefreshing ? vm.copy.loadingMoreLabel : vm.copy.showMoreActionLabel}
          </Button>
        </Box>,
      )}
      header={<RegionsHeader vm={vm} />}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.worldSectionAriaLabel} items={vm.sectionNavItems} />
      }
      list={renderWhen(vm.showList, <RegionList vm={vm} />)}
      loading={renderWhen(
        vm.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, md: 2, xl: 5 }}
          itemCount={6}
        />,
      )}
      toolbar={<RegionsToolbar vm={vm} />}
    />
  );
});
