import { Box, Button, Dialog, Flex, Portal } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { ItemsViewModel } from '../../model/ItemsViewModel';
import { ItemsFilterPanel } from '../ItemsFilterPanel/ItemsFilterPanel';
import { ItemsJsonPreview } from '../ItemsJsonPreview/ItemsJsonPreview';

interface ItemsToolbarProps {
  readonly vm: ItemsViewModel;
}

export const ItemsToolbar = observer(function ItemsToolbar({ vm }: ItemsToolbarProps) {
  return (
    <Box mb="5">
      <Flex align="center" gap="3" justify="space-between" mb="4" minH="44px" wrap="wrap">
        <ResultSummary
          entityLabel={vm.copy.entityLabel}
          ofLabel={vm.sharedCopy.resultSummaryOf}
          showingLabel={vm.sharedCopy.resultSummaryShowing}
          totalCount={vm.catalogState.totalCount}
          visibleCount={vm.catalogState.visibleCount}
        />
        <Button
          display={{ base: 'inline-flex', md: 'none' }}
          minH="44px"
          onClick={() => vm.openFilterSheet()}
          type="button"
          variant="outline"
        >
          {vm.copy.openFiltersActionLabel}
        </Button>
      </Flex>

      <Box
        display={{ base: 'none', md: 'grid' }}
        gap="4"
        gridTemplateColumns={{ md: '1fr', xl: 'minmax(0, 1.35fr) minmax(360px, 0.65fr)' }}
      >
        <ItemsFilterPanel vm={vm} />
        <ItemsJsonPreview vm={vm} />
      </Box>

      <Dialog.Root
        lazyMount
        onOpenChange={(details) => {
          if (details.open) {
            vm.openFilterSheet();
          } else {
            vm.closeFilterSheet();
          }
        }}
        open={vm.isFilterSheetOpen}
      >
        <Portal>
          <Dialog.Backdrop bg="rgba(5, 10, 15, 0.78)" backdropFilter="blur(10px)" />
          <Dialog.Positioner alignItems="flex-end" justifyContent="center">
            <Dialog.Content
              bg="#17212b"
              borderColor="rgba(103, 232, 249, 0.28)"
              borderRadius="16px 16px 0 0"
              borderWidth="1px"
              color="#f4f7f8"
              display={{ base: 'grid', md: 'none' }}
              gap="4"
              maxH="88dvh"
              maxW="560px"
              overflowY="auto"
              p="4"
              w="100%"
            >
              <Dialog.Header p="0">
                <Flex align="center" justify="space-between">
                  <Dialog.Title color="#f4f7f8">{vm.copy.filterPanelTitle}</Dialog.Title>
                  <Dialog.CloseTrigger asChild>
                    <Button
                      bg="rgba(15, 21, 29, 0.82)"
                      borderColor="rgba(103, 232, 249, 0.34)"
                      borderWidth="1px"
                      color="#f4f7f8"
                      minH="44px"
                      onClick={() => vm.closeFilterSheet()}
                      type="button"
                      variant="outline"
                    >
                      {vm.copy.closeFiltersActionLabel}
                    </Button>
                  </Dialog.CloseTrigger>
                </Flex>
              </Dialog.Header>
              <Dialog.Body display="grid" gap="4" p="0">
                <ItemsFilterPanel showTitle={false} variant="plain" vm={vm} />
                <ItemsJsonPreview vm={vm} />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
});
