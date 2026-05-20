import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { HERO_SORT_KEYS, type HeroSortKey } from '../../model/heroUiCopy';
import { HeroesViewModel, type HeroesRouteState } from '../../model/HeroesViewModel';
import { HeroList } from '../HeroList/HeroList';
import { HeroesHeader } from '../HeroesHeader/HeroesHeader';
import { HeroesToolbar } from '../HeroesToolbar/HeroesToolbar';

export const HeroesPage = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const routeState = useMemo(() => parseHeroesRouteState(searchParams), [searchParams]);
  const vm = useViewModel(HeroesViewModel, routeState);
  const state = vm.catalogState;

  const patchRouteState = (patch: Partial<HeroesRouteState>) => {
    const next = new URLSearchParams(searchParams);
    applyRouteStatePatch(next, patch);
    setSearchParams(next);
  };

  return (
    <CatalogPageLayout
      empty={renderWhen(
        state.showEmpty,
        <StatePanel
          actionLabel={vm.hasActiveFilter ? vm.copy.emptyActionLabel : undefined}
          description={vm.copy.emptyDescription}
          onAction={vm.hasActiveFilter ? () => setSearchParams(new URLSearchParams()) : undefined}
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
          headingId="heroes-explainer-title"
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
      header={<HeroesHeader vm={vm} />}
      list={renderWhen(state.showList, <HeroList vm={vm} />)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, md: 2, xl: 3 }}
          itemCount={6}
        />,
      )}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.heroesSectionAriaLabel} items={vm.sectionNavItems} />
      }
      toolbar={
        <HeroesToolbar
          onClassFilterChange={(activeClassId) => patchRouteState({ activeClassId })}
          onLevelMaxChange={(value) => patchRouteState({ levelMax: parseLevelParam(value) })}
          onLevelMinChange={(value) => patchRouteState({ levelMin: parseLevelParam(value) })}
          onResetFilters={() => setSearchParams(new URLSearchParams())}
          onSearchQueryChange={(searchQuery) => patchRouteState({ searchQuery })}
          onSortChange={(sortKey) => patchRouteState({ sortKey })}
          onVeteranOnlyChange={(veteranOnly) => patchRouteState({ veteranOnly })}
          vm={vm}
        />
      }
    />
  );
});

function parseHeroesRouteState(searchParams: URLSearchParams): HeroesRouteState {
  return {
    activeClassId: readNullableParam(searchParams, 'class'),
    levelMax: parseLevelParam(searchParams.get('maxLevel')),
    levelMin: parseLevelParam(searchParams.get('minLevel')),
    searchQuery: searchParams.get('q')?.trim() ?? '',
    sortKey: parseSortKey(searchParams.get('sort')),
    veteranOnly: searchParams.get('veteran') === '1',
  };
}

function applyRouteStatePatch(
  searchParams: URLSearchParams,
  patch: Partial<HeroesRouteState>,
): void {
  if ('activeClassId' in patch) {
    writeNullableParam(searchParams, 'class', patch.activeClassId);
  }
  if ('levelMax' in patch) {
    writeNullableParam(searchParams, 'maxLevel', patch.levelMax);
  }
  if ('levelMin' in patch) {
    writeNullableParam(searchParams, 'minLevel', patch.levelMin);
  }
  if ('searchQuery' in patch) {
    const searchQuery = patch.searchQuery?.trim();
    writeNullableParam(searchParams, 'q', searchQuery === '' ? null : searchQuery);
  }
  if ('sortKey' in patch) {
    const sortKey = patch.sortKey ?? 'published-desc';
    if (sortKey === 'published-desc') {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', sortKey);
    }
  }
  if ('veteranOnly' in patch) {
    if (patch.veteranOnly) {
      searchParams.set('veteran', '1');
    } else {
      searchParams.delete('veteran');
    }
  }
}

function readNullableParam(searchParams: URLSearchParams, key: string): string | null {
  const value = searchParams.get(key)?.trim();
  if (value === '') return null;
  return value ?? null;
}

function writeNullableParam(
  searchParams: URLSearchParams,
  key: string,
  value: number | string | null | undefined,
): void {
  if (value === null || value === undefined || value === '') {
    searchParams.delete(key);
    return;
  }
  searchParams.set(key, String(value));
}

function parseLevelParam(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 1) return null;
  return parsed;
}

function parseSortKey(value: string | null): HeroSortKey {
  if (HERO_SORT_KEYS.includes(value as HeroSortKey)) {
    return value as HeroSortKey;
  }
  return 'published-desc';
}
