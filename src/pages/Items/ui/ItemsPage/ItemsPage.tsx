import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { ItemsViewModel } from '../../model/ItemsViewModel';
import { ItemList } from '../ItemList/ItemList';
import { ItemsEmptyState } from '../ItemsEmptyState/ItemsEmptyState';
import { ItemsHeader } from '../ItemsHeader/ItemsHeader';
import { ItemsToolbar } from '../ItemsToolbar/ItemsToolbar';

export const ItemsPage = observer(function ItemsPage() {
  const vm = useViewModel(ItemsViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderWhen(state.showEmpty, <ItemsEmptyState vm={vm} />)}
      error={renderErrorState(vm, state.showError)}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="items-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderFooterAction(vm, state)}
      header={<ItemsHeader vm={vm} />}
      list={renderWhen(state.showList, <ItemList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, lg: 2, xl: 3 }}
          itemCount={6}
        />,
      )}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.itemsSectionAriaLabel} items={vm.sectionNavItems} />
      }
      toolbar={<ItemsToolbar vm={vm} />}
    />
  );
});

function renderErrorState(vm: ItemsViewModel, isVisible: boolean): ReactElement {
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

function renderFooterAction(vm: ItemsViewModel, state: ItemsViewModel['catalogState']): ReactElement {
  return renderWhen(
    state.hasNextPage,
    <Box display="flex" justifyContent="center" mt="6">
      <Button colorPalette="green" disabled={!state.canLoadMore} onClick={() => void vm.loadMore()}>
        {state.showRefreshing ? vm.copy.loadingMoreLabel : vm.copy.showMoreActionLabel}
      </Button>
    </Box>,
  );
}
