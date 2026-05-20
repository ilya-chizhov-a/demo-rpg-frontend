import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { MonstersViewModel } from '../../model/MonstersViewModel';

const MONSTERS_SEARCH_INPUT_ID = 'monsters-search-input';

interface MonstersToolbarProps {
  readonly vm: MonstersViewModel;
}

export const MonstersToolbar = observer(({ vm }: MonstersToolbarProps) => {
  const summary = vm.catalogState;

  return (
    <Box mb="5">
      <Flex align="flex-end" gap="3" mb="4" wrap="wrap">
        <Box flex={{ base: '1 1 100%', md: '0 0 320px' }}>
          <Box asChild color="#9aa7b1" display="block" fontSize="xs" mb="1">
            <label htmlFor={MONSTERS_SEARCH_INPUT_ID}>{vm.copy.searchLabel}</label>
          </Box>
          <Input
            bg="rgba(15, 21, 29, 0.74)"
            borderColor="rgba(103, 232, 249, 0.24)"
            id={MONSTERS_SEARCH_INPUT_ID}
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
        <Flex aria-label={vm.copy.factionButtonsAriaLabel} gap="2" role="group" wrap="wrap">
          {vm.factionButtons.map(renderFactionButton)}
        </Flex>

        <ResultSummary
          entityLabel={vm.copy.entityLabel}
          ofLabel={vm.sharedCopy.resultSummaryOf}
          showingLabel={vm.sharedCopy.resultSummaryShowing}
          totalCount={summary.totalCount}
          visibleCount={summary.visibleCount}
        />
      </Flex>
    </Box>
  );
});

type FactionButtonView = MonstersViewModel['factionButtons'][number];

function renderFactionButton(button: FactionButtonView) {
  return (
    <Button
      key={button.key}
      type="button"
      size="sm"
      variant={button.variant}
      minH="44px"
      minW="44px"
      color={button.color}
      bg={button.bg}
      borderColor={button.borderColor}
      aria-pressed={button.ariaPressed}
      onClick={() => {
        void button.onSelect();
      }}
      _hover={button.hoverStyle}
    >
      {button.label}
    </Button>
  );
}
