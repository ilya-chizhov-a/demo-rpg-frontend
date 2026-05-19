import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { LocationsViewModel } from '../../model/LocationsViewModel';
import { LocationList } from '../LocationList/LocationList';
import { LocationsHeader } from '../LocationsHeader/LocationsHeader';
import { LocationsToolbar } from '../LocationsToolbar/LocationsToolbar';

export const LocationsPage = observer(() => {
  const vm = useViewModel(LocationsViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderEmptyState(vm, state.showEmpty)}
      error={renderErrorState(vm, state.showError)}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="locations-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderFooterAction(vm, state)}
      header={<LocationsHeader vm={vm} />}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.worldSectionAriaLabel} items={vm.sectionNavItems} />
      }
      list={renderWhen(state.showList, <LocationList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, sm: 2, md: 3, xl: 5 }}
          itemCount={6}
        />,
      )}
      toolbar={<LocationsToolbar vm={vm} />}
    />
  );
});

function renderEmptyState(vm: LocationsViewModel, isVisible: boolean): ReactElement {
  const canReset = vm.hasActiveFilter;
  const panelProps = {
    actionLabel: canReset ? vm.copy.emptyActionLabel : undefined,
    description: vm.copy.emptyDescription,
    onAction: canReset ? () => void vm.resetFilters() : undefined,
    title: vm.copy.emptyTitle,
  };

  return renderWhen(isVisible, <StatePanel {...panelProps} />);
}

function renderErrorState(vm: LocationsViewModel, isVisible: boolean): ReactElement {
  const panelProps = {
    actionLabel: vm.copy.retryActionLabel,
    description: vm.copy.errorDescription,
    onAction: () => void vm.retry(),
    title: vm.copy.errorTitle,
    tone: 'error' as const,
  };

  return renderWhen(isVisible, <StatePanel {...panelProps} />);
}

function renderFooterAction(
  vm: LocationsViewModel,
  state: LocationsViewModel['catalogState'],
): ReactElement {
  return renderWhen(
    state.hasNextPage,
    <Box display="flex" justifyContent="center" mt="6">
      <Button colorPalette="green" disabled={!state.canLoadMore} onClick={() => void vm.loadMore()}>
        {state.showRefreshing ? vm.copy.loadingMoreLabel : vm.copy.showMoreActionLabel}
      </Button>
    </Box>,
  );
}
