import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { FactionsViewModel } from '../../model/FactionsViewModel';
import { FactionList } from '../FactionList/FactionList';
import { FactionsHeader } from '../FactionsHeader/FactionsHeader';
import { FactionsToolbar } from '../FactionsToolbar/FactionsToolbar';

export const FactionsPage = observer(() => {
  const vm = useViewModel(FactionsViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderWhen(
        state.showEmpty,
        <StatePanel
          actionLabel={vm.hasActiveFilter ? vm.copy.emptyActionLabel : undefined}
          description={vm.copy.emptyDescription}
          onAction={vm.hasActiveFilter ? () => void vm.resetFilters() : undefined}
          title={vm.copy.emptyTitle}
        />,
      )}
      error={renderWhen(
        state.showError,
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
          headingId="factions-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderWhen(
        state.hasNextPage,
        <Box display="flex" justifyContent="center" mt="6">
          <Button
            colorPalette="green"
            disabled={!state.canLoadMore}
            onClick={() => void vm.loadMore()}
          >
            {state.showRefreshing ? vm.copy.loadingMoreLabel : vm.copy.showMoreActionLabel}
          </Button>
        </Box>,
      )}
      header={<FactionsHeader vm={vm} />}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.worldSectionAriaLabel} items={vm.sectionNavItems} />
      }
      list={renderWhen(state.showList, <FactionList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, md: 2, xl: 4 }}
          itemCount={6}
        />,
      )}
      toolbar={<FactionsToolbar vm={vm} />}
    />
  );
});
