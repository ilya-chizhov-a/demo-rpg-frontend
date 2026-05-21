import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';

import { renderWhen, useViewModel } from 'src/shared/lib';
import {
  CatalogEmptyState,
  CatalogPageLayout,
  CatalogSkeleton,
  SectionSubnav,
  StatePanel,
} from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { DialogsViewModel } from '../../model/DialogsViewModel';
import { DialogList } from '../DialogList/DialogList';
import { DialogsHeader } from '../DialogsHeader/DialogsHeader';
import { DialogsToolbar } from '../DialogsToolbar/DialogsToolbar';

export const DialogsPage = observer(function DialogsPage() {
  const vm = useViewModel(DialogsViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderEmptyState(vm, state.showEmpty)}
      error={renderErrorState(vm, state.showError)}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="dialogs-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderFooterAction(vm, state)}
      header={<DialogsHeader vm={vm} />}
      list={renderWhen(state.showList, <DialogList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, lg: 2, xl: 3 }}
          itemCount={6}
        />,
      )}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.questsSectionAriaLabel} items={vm.sectionNavItems} />
      }
      toolbar={<DialogsToolbar vm={vm} />}
    />
  );
});

function renderEmptyState(vm: DialogsViewModel, isVisible: boolean): ReactElement {
  return renderWhen(
    isVisible,
    <CatalogEmptyState
      actionLabel={vm.copy.emptyActionLabel}
      actionTo="/quests"
      description={vm.copy.emptyDescription}
      title={vm.copy.emptyTitle}
    />,
  );
}

function renderErrorState(vm: DialogsViewModel, isVisible: boolean): ReactElement {
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
  vm: DialogsViewModel,
  state: DialogsViewModel['catalogState'],
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
