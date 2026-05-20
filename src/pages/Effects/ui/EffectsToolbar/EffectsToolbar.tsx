import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { EffectsViewModel } from '../../model/EffectsViewModel';

interface EffectsToolbarProps {
  readonly vm: EffectsViewModel;
}

export const EffectsToolbar = observer(({ vm }: EffectsToolbarProps) => {
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
