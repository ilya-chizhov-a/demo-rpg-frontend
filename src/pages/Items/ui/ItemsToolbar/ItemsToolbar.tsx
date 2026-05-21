import { observer } from 'mobx-react-lite';

import { CatalogFilterToolbar } from 'src/shared/ui';
import type { ItemsViewModel } from '../../model/ItemsViewModel';
import { ItemsFilterPanel } from '../ItemsFilterPanel/ItemsFilterPanel';
import { ItemsJsonPreview } from '../ItemsJsonPreview/ItemsJsonPreview';

interface ItemsToolbarProps {
  readonly vm: ItemsViewModel;
}

export const ItemsToolbar = observer(function ItemsToolbar({ vm }: ItemsToolbarProps) {
  return (
    <CatalogFilterToolbar
      closeFiltersActionLabel={vm.copy.closeFiltersActionLabel}
      desktopFilters={<ItemsFilterPanel vm={vm} />}
      desktopPreview={<ItemsJsonPreview vm={vm} />}
      entityLabel={vm.copy.entityLabel}
      filterPanelTitle={vm.copy.filterPanelTitle}
      isFilterSheetOpen={vm.isFilterSheetOpen}
      mobileFilters={<ItemsFilterPanel showTitle={false} variant="plain" vm={vm} />}
      mobilePreview={<ItemsJsonPreview vm={vm} />}
      ofLabel={vm.sharedCopy.resultSummaryOf}
      onCloseFilterSheet={() => vm.closeFilterSheet()}
      onOpenFilterSheet={() => vm.openFilterSheet()}
      openFiltersActionLabel={vm.copy.openFiltersActionLabel}
      showingLabel={vm.sharedCopy.resultSummaryShowing}
      totalCount={vm.catalogState.totalCount}
      visibleCount={vm.catalogState.visibleCount}
    />
  );
});
