import { Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { AbilitiesViewModel } from '../../model/AbilitiesViewModel';

interface AbilitiesToolbarProps {
  readonly vm: AbilitiesViewModel;
}

export const AbilitiesToolbar = observer(({ vm }: AbilitiesToolbarProps) => {
  return (
    <Flex align="center" justify="space-between" mb="5" minH="44px" wrap="wrap">
      <ResultSummary
        entityLabel={vm.copy.entityLabel}
        ofLabel={vm.sharedCopy.resultSummaryOf}
        showingLabel={vm.sharedCopy.resultSummaryShowing}
        totalCount={vm.catalogState.totalCount}
        visibleCount={vm.catalogState.visibleCount}
      />
    </Flex>
  );
});
