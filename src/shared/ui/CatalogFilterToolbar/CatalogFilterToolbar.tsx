import { Box, Button, Dialog, Flex, Portal } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { ResultSummary } from '../ResultSummary/ResultSummary';

interface CatalogFilterToolbarProps {
  readonly closeFiltersActionLabel: string;
  readonly desktopFilters: ReactNode;
  readonly desktopPreview: ReactNode;
  readonly entityLabel: string;
  readonly filterPanelTitle: string;
  readonly isFilterSheetOpen: boolean;
  readonly mobileFilters: ReactNode;
  readonly mobilePreview: ReactNode;
  readonly ofLabel: string;
  readonly onCloseFilterSheet: () => void;
  readonly onOpenFilterSheet: () => void;
  readonly openFiltersActionLabel: string;
  readonly showingLabel: string;
  readonly totalCount: number;
  readonly visibleCount: number;
}

export function CatalogFilterToolbar({
  closeFiltersActionLabel,
  desktopFilters,
  desktopPreview,
  entityLabel,
  filterPanelTitle,
  isFilterSheetOpen,
  mobileFilters,
  mobilePreview,
  ofLabel,
  onCloseFilterSheet,
  onOpenFilterSheet,
  openFiltersActionLabel,
  showingLabel,
  totalCount,
  visibleCount,
}: CatalogFilterToolbarProps) {
  return (
    <Box mb="5">
      <Flex align="center" gap="3" justify="space-between" mb="4" minH="44px" wrap="wrap">
        <ResultSummary
          entityLabel={entityLabel}
          ofLabel={ofLabel}
          showingLabel={showingLabel}
          totalCount={totalCount}
          visibleCount={visibleCount}
        />
        <Button
          display={{ base: 'inline-flex', md: 'none' }}
          minH="44px"
          onClick={onOpenFilterSheet}
          type="button"
          variant="outline"
        >
          {openFiltersActionLabel}
        </Button>
      </Flex>

      <Box
        display={{ base: 'none', md: 'grid' }}
        gap="4"
        gridTemplateColumns={{ md: '1fr', xl: 'minmax(0, 1.35fr) minmax(360px, 0.65fr)' }}
      >
        {desktopFilters}
        {desktopPreview}
      </Box>

      <Dialog.Root
        lazyMount
        onOpenChange={(details) => {
          if (details.open) {
            onOpenFilterSheet();
          } else {
            onCloseFilterSheet();
          }
        }}
        open={isFilterSheetOpen}
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
                  <Dialog.Title color="#f4f7f8">{filterPanelTitle}</Dialog.Title>
                  <Dialog.CloseTrigger asChild>
                    <Button
                      bg="rgba(15, 21, 29, 0.82)"
                      borderColor="rgba(103, 232, 249, 0.34)"
                      borderWidth="1px"
                      color="#f4f7f8"
                      minH="44px"
                      onClick={onCloseFilterSheet}
                      type="button"
                      variant="outline"
                    >
                      {closeFiltersActionLabel}
                    </Button>
                  </Dialog.CloseTrigger>
                </Flex>
              </Dialog.Header>
              <Dialog.Body display="grid" gap="4" p="0">
                {mobileFilters}
                {mobilePreview}
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
