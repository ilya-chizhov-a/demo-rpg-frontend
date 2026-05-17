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
          actionLabel={vm.hasActiveFilter ? 'Reset filter' : undefined}
          description="The query completed, but no loaded regions match the current filter."
          onAction={vm.hasActiveFilter ? () => void vm.resetFilters() : undefined}
          title="No regions found"
        />,
      )}
      error={renderWhen(
        vm.showError,
        <StatePanel
          actionLabel="Retry"
          description="The GraphQL router did not return the regions catalog."
          onAction={() => void vm.retry()}
          title="Failed to load regions"
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
            {vm.showRefreshing ? 'Loading...' : 'Load more'}
          </Button>
        </Box>,
      )}
      header={<RegionsHeader />}
      sectionSubnav={<SectionSubnav ariaLabel="World section" items={vm.sectionNavItems} />}
      list={renderWhen(vm.showList, <RegionList vm={vm} />)}
      loading={renderWhen(
        vm.showLoading,
        <CatalogSkeleton
          ariaLabel="Loading regions"
          columns={{ base: 1, md: 2, xl: 5 }}
          itemCount={6}
        />,
      )}
      toolbar={<RegionsToolbar vm={vm} />}
    />
  );
});
