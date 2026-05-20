import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { NpcsViewModel } from '../../model/NpcsViewModel';
import { NpcList } from '../NpcList/NpcList';
import { NpcsHeader } from '../NpcsHeader/NpcsHeader';
import { NpcsToolbar } from '../NpcsToolbar/NpcsToolbar';

export const NpcsPage = observer(() => {
  const vm = useViewModel(NpcsViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderEmptyState(vm, state.showEmpty)}
      error={renderErrorState(vm, state.showError)}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="npcs-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderFooterAction(vm, state)}
      header={<NpcsHeader vm={vm} />}
      list={renderWhen(state.showList, <NpcList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
          itemCount={8}
        />,
      )}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.npcsSectionAriaLabel} items={vm.sectionNavItems} />
      }
      toolbar={<NpcsToolbar vm={vm} />}
    />
  );
});

function renderEmptyState(vm: NpcsViewModel, isVisible: boolean): ReactElement {
  const canReset = vm.hasActiveFilter;
  return renderWhen(
    isVisible,
    <StatePanel
      actionLabel={canReset ? vm.copy.emptyActionLabel : undefined}
      description={vm.copy.emptyDescription}
      onAction={canReset ? () => void vm.resetFilters() : undefined}
      title={vm.copy.emptyTitle}
    />,
  );
}

function renderErrorState(vm: NpcsViewModel, isVisible: boolean): ReactElement {
  return renderWhen(
    isVisible,
    <StatePanel
      actionLabel={vm.copy.retryActionLabel}
      description={vm.copy.errorDescription}
      onAction={() => void vm.retry()}
      title={vm.copy.errorTitle}
      tone="error"
    />,
  );
}

function renderFooterAction(vm: NpcsViewModel, state: NpcsViewModel['catalogState']): ReactElement {
  return renderWhen(
    state.hasNextPage,
    <Box display="flex" justifyContent="center" mt="6">
      <Button colorPalette="green" disabled={!state.canLoadMore} onClick={() => void vm.loadMore()}>
        {state.showRefreshing ? vm.copy.loadingMoreLabel : vm.copy.showMoreActionLabel}
      </Button>
    </Box>,
  );
}
