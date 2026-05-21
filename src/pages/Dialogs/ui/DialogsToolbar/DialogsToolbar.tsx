import { Box, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { DialogsViewModel } from '../../model/DialogsViewModel';

interface DialogsToolbarProps {
  readonly vm: DialogsViewModel;
}

export const DialogsToolbar = observer(function DialogsToolbar({ vm }: DialogsToolbarProps) {
  return (
    <Box
      alignItems={{ base: 'flex-start', md: 'center' }}
      bg="rgba(18, 24, 32, 0.72)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      gap="3"
      justifyContent="space-between"
      mb="4"
      p="4"
    >
      <ResultSummary
        entityLabel={vm.copy.entityLabel}
        ofLabel={vm.sharedCopy.resultSummaryOf}
        showingLabel={vm.sharedCopy.resultSummaryShowing}
        totalCount={vm.catalogState.totalCount}
        visibleCount={vm.catalogState.visibleCount}
      />
      <Text color="#9aa7b1" fontSize="sm" lineHeight="1.4" maxW="520px">
        {vm.copy.toolbarDescription}
      </Text>
    </Box>
  );
});
