import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { QuestsViewModel } from '../../model/QuestsViewModel';
import { QuestList } from '../QuestList/QuestList';
import { QuestsHeader } from '../QuestsHeader/QuestsHeader';
import { QuestsToolbar } from '../QuestsToolbar/QuestsToolbar';

export const QuestsPage = observer(function QuestsPage() {
  const vm = useViewModel(QuestsViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderEmptyState(vm, state.showEmpty)}
      error={renderErrorState(vm, state.showError)}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="quests-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderFooterAction(vm, state)}
      header={<QuestsHeader vm={vm} />}
      list={renderWhen(state.showList, <QuestList vm={vm} />)}
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
      toolbar={<QuestsToolbar vm={vm} />}
    />
  );
});

function renderEmptyState(vm: QuestsViewModel, isVisible: boolean): ReactElement {
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

function renderErrorState(vm: QuestsViewModel, isVisible: boolean): ReactElement {
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
  vm: QuestsViewModel,
  state: QuestsViewModel['catalogState'],
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
