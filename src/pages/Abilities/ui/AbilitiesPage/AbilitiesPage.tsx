import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { AbilitiesViewModel } from '../../model/AbilitiesViewModel';
import { AbilitiesHeader } from '../AbilitiesHeader/AbilitiesHeader';
import { AbilitiesToolbar } from '../AbilitiesToolbar/AbilitiesToolbar';
import { AbilityList } from '../AbilityList/AbilityList';

export const AbilitiesPage = observer(() => {
  const vm = useViewModel(AbilitiesViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderWhen(
        state.showEmpty,
        <StatePanel description={vm.copy.emptyDescription} title={vm.copy.emptyTitle} />,
      )}
      error={renderErrorState(vm, state.showError)}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="abilities-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderFooterAction(vm, state)}
      header={<AbilitiesHeader vm={vm} />}
      list={renderWhen(state.showList, <AbilityList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, md: 2, xl: 4 }}
          itemCount={8}
        />,
      )}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.abilitiesSectionAriaLabel} items={vm.sectionNavItems} />
      }
      toolbar={<AbilitiesToolbar vm={vm} />}
    />
  );
});

function renderErrorState(vm: AbilitiesViewModel, isVisible: boolean): ReactElement {
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
  vm: AbilitiesViewModel,
  state: AbilitiesViewModel['catalogState'],
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
