import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { ClassesViewModel } from '../../model/ClassesViewModel';

interface ClassesToolbarProps {
  readonly vm: ClassesViewModel;
}

export const ClassesToolbar = observer(({ vm }: ClassesToolbarProps) => {
  return (
    <Box mb="5">
      <ResultSummary
        entityLabel={vm.copy.entityLabel}
        ofLabel={vm.sharedCopy.resultSummaryOf}
        showingLabel={vm.sharedCopy.resultSummaryShowing}
        totalCount={vm.totalCount}
        visibleCount={vm.visibleCount}
      />
    </Box>
  );
});
