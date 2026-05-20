import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { NpcsViewModel } from '../../model/NpcsViewModel';

const NPCS_SEARCH_INPUT_ID = 'npcs-search-input';

interface NpcsToolbarProps {
  readonly vm: NpcsViewModel;
}

export const NpcsToolbar = observer(({ vm }: NpcsToolbarProps) => {
  return (
    <Box mb="5">
      <Flex align="flex-end" gap="3" mb="4" wrap="wrap">
        <Box minW={{ base: '100%', md: '280px' }}>
          <Box asChild color="#9aa7b1" display="block" fontSize="xs" mb="1">
            <label htmlFor={NPCS_SEARCH_INPUT_ID}>{vm.copy.searchLabel}</label>
          </Box>
          <Input
            bg="rgba(15, 21, 29, 0.74)"
            borderColor="rgba(103, 232, 249, 0.24)"
            id={NPCS_SEARCH_INPUT_ID}
            minH="44px"
            onChange={(event) => vm.setSearchQuery(event.target.value)}
            placeholder={vm.copy.searchPlaceholder}
            value={vm.searchQuery}
          />
        </Box>

        {vm.hasActiveFilter ? (
          <Button minH="44px" onClick={() => void vm.resetFilters()} type="button" variant="ghost">
            {vm.copy.resetFiltersActionLabel}
          </Button>
        ) : null}
      </Flex>

      <Flex align="center" gap="4" justify="space-between" wrap="wrap">
        <Flex aria-label={vm.copy.locationButtonsAriaLabel} gap="2" role="group" wrap="wrap">
          {vm.locationButtons.map((button) => (
            <Button
              aria-pressed={button.ariaPressed}
              bg={button.bg}
              borderColor={button.borderColor}
              color={button.color}
              key={button.key}
              minH="44px"
              minW="44px"
              onClick={() => void button.onSelect()}
              size="sm"
              type="button"
              variant={button.variant}
              _hover={button.hoverStyle}
            >
              {button.label}
            </Button>
          ))}
        </Flex>

        <ResultSummary
          entityLabel={vm.copy.entityLabel}
          ofLabel={vm.sharedCopy.resultSummaryOf}
          showingLabel={vm.sharedCopy.resultSummaryShowing}
          totalCount={vm.catalogState.totalCount}
          visibleCount={vm.catalogState.visibleCount}
        />
      </Flex>
    </Box>
  );
});
