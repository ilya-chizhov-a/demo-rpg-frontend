import { observer } from 'mobx-react-lite';

import { CatalogFilterToolbar } from 'src/shared/ui';
import type { QuestsViewModel } from '../../model/QuestsViewModel';
import { QuestFilterPanel } from '../QuestFilterPanel/QuestFilterPanel';
import { QuestsJsonPreview } from '../QuestsJsonPreview/QuestsJsonPreview';

interface QuestsToolbarProps {
  readonly vm: QuestsViewModel;
}

export const QuestsToolbar = observer(function QuestsToolbar({ vm }: QuestsToolbarProps) {
  return (
    <CatalogFilterToolbar
      closeFiltersActionLabel={vm.copy.closeFiltersActionLabel}
      desktopFilters={<QuestFilterPanel vm={vm} />}
      desktopPreview={<QuestsJsonPreview vm={vm} />}
      entityLabel={vm.copy.entityLabel}
      filterPanelTitle={vm.copy.filterPanelTitle}
      isFilterSheetOpen={vm.isFilterSheetOpen}
      mobileFilters={<QuestFilterPanel showTitle={false} variant="plain" vm={vm} />}
      mobilePreview={<QuestsJsonPreview vm={vm} />}
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
