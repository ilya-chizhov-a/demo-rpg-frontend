import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogSkeleton, PageShell, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { SearchViewModel, type SearchRouteState } from '../../model/SearchViewModel';
import { SearchHeader } from '../SearchHeader/SearchHeader';
import { SearchResults } from '../SearchResults/SearchResults';
import { SearchToolbar } from '../SearchToolbar/SearchToolbar';

export const SearchPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeState = useMemo(() => parseSearchRouteState(searchParams), [searchParams]);
  const vm = useViewModel(SearchViewModel, routeState);

  const submitQuery = (query: string) => {
    const next = new URLSearchParams(searchParams);
    const normalizedQuery = query.trim();
    if (normalizedQuery) {
      next.set('q', normalizedQuery);
    } else {
      next.delete('q');
    }
    setSearchParams(next);
  };

  const clearQuery = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <PageShell>
      <SearchHeader vm={vm} />
      <SearchToolbar onClear={clearQuery} onSubmit={submitQuery} vm={vm} />

      {renderWhen(
        vm.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, xl: 2 }}
          itemCount={6}
        />,
      )}
      {renderErrorState(vm)}
      {renderWhen(
        vm.showEmptyPrompt,
        <StatePanel description={vm.copy.emptyDescription} title={vm.copy.emptyTitle} />,
      )}
      {renderWhen(
        vm.showNoResults,
        <StatePanel
          actionLabel={vm.copy.noResultsActionLabel}
          description={vm.copy.noResultsDescription}
          onAction={clearQuery}
          title={vm.copy.noResultsTitle}
        />,
      )}
      {renderWhen(vm.showResults, <SearchResults vm={vm} />)}

      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="search-explainer-title"
        isLoading={vm.showLoading || vm.showRefreshing}
      />
    </PageShell>
  );
});

function parseSearchRouteState(searchParams: URLSearchParams): SearchRouteState {
  return {
    query: searchParams.get('q')?.trim() ?? '',
  };
}

function renderErrorState(vm: SearchViewModel) {
  return renderWhen(
    vm.showError,
    <StatePanel
      actionLabel={vm.copy.retryActionLabel}
      description={vm.copy.errorDescription}
      onAction={() => void vm.retry()}
      title={vm.copy.errorTitle}
      tone="error"
    />,
  );
}
