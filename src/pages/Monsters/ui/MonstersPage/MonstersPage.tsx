import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { MonstersViewModel } from '../../model/MonstersViewModel';
import { MonsterList } from '../MonsterList/MonsterList';
import { MonstersHeader } from '../MonstersHeader/MonstersHeader';
import { MonstersToolbar } from '../MonstersToolbar/MonstersToolbar';

export const MonstersPage = observer(() => {
  const vm = useViewModel(MonstersViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderEmptyState(vm, state.showEmpty)}
      error={renderErrorState(vm, state.showError)}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="monsters-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderFooterAction(vm, state)}
      header={<MonstersHeader vm={vm} />}
      list={renderWhen(state.showList, <MonsterList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          itemCount={8}
        />,
      )}
      toolbar={<MonstersToolbar vm={vm} />}
    />
  );
});

function renderEmptyState(vm: MonstersViewModel, isVisible: boolean): ReactElement {
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

function renderErrorState(vm: MonstersViewModel, isVisible: boolean): ReactElement {
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

function renderFooterAction(
  vm: MonstersViewModel,
  state: MonstersViewModel['catalogState'],
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
