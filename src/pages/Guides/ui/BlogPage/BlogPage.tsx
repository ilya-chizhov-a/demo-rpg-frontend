import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { ReactElement } from 'react';

import { renderWhen, useViewModel } from 'src/shared/lib';
import {
  CatalogHeader,
  CatalogPageLayout,
  CatalogSkeleton,
  SectionSubnav,
  StatePanel,
} from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { BlogViewModel } from '../../model/BlogViewModel';
import { BlogList } from '../BlogList/BlogList';
import { BlogToolbar } from '../BlogToolbar/BlogToolbar';

export const BlogPage = observer(function BlogPage() {
  const vm = useViewModel(BlogViewModel);
  const state = vm.catalogState;

  return (
    <CatalogPageLayout
      empty={renderEmptyState(vm, state.showEmpty)}
      error={renderErrorState(vm, state.showError)}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="guides-explainer-title"
          isLoading={state.showLoading}
        />
      }
      footerAction={renderFooterAction(vm, state)}
      header={
        <CatalogHeader
          ariaLabel={vm.copy.guideSectionAriaLabel}
          badges={vm.copy.headerBadges}
          description={vm.copy.headerDescription}
          descriptionMaxWidth="820px"
          eyebrow={vm.copy.headerEyebrow}
          title={vm.copy.headerTitle}
          titleId="guides-title"
          titleSize={{ base: '3xl', md: '5xl' }}
        />
      }
      list={renderWhen(state.showList, <BlogList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, lg: 2, xl: 3 }}
          itemCount={6}
        />,
      )}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.guideSectionAriaLabel} items={vm.sectionNavItems} />
      }
      toolbar={<BlogToolbar vm={vm} />}
    />
  );
});

function renderEmptyState(vm: BlogViewModel, isVisible: boolean): ReactElement {
  const canReset = Boolean(vm.searchTerm.trim());
  return renderWhen(
    isVisible,
    <StatePanel
      actionLabel={canReset ? vm.copy.emptyActionLabel : undefined}
      description={vm.copy.emptyDescription}
      onAction={canReset ? () => void vm.clearSearch() : undefined}
      title={vm.copy.emptyTitle}
    />,
  );
}

function renderErrorState(vm: BlogViewModel, isVisible: boolean): ReactElement {
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
  vm: BlogViewModel,
  state: BlogViewModel['catalogState'],
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
