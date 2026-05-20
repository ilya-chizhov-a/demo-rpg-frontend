import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { ItemTypesViewModel } from '../../model/ItemTypesViewModel';

interface ItemTypesToolbarProps {
  readonly vm: ItemTypesViewModel;
}

export const ItemTypesToolbar = observer(({ vm }: ItemTypesToolbarProps) => {
  return (
    <Box mb="5">
      <ResultSummary
        entityLabel={vm.copy.entityLabel}
        ofLabel={vm.sharedCopy.resultSummaryOf}
        showingLabel={vm.sharedCopy.resultSummaryShowing}
        totalCount={vm.viewState.totalCount}
        visibleCount={vm.viewState.visibleCount}
      />
    </Box>
  );
});
