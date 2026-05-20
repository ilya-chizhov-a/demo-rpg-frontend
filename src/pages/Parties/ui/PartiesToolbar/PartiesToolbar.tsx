import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { ResultSummary } from 'src/shared/ui';
import type { PartiesViewModel } from '../../model/PartiesViewModel';

interface PartiesToolbarProps {
  readonly vm: PartiesViewModel;
}

export const PartiesToolbar = observer(({ vm }: PartiesToolbarProps) => {
  return (
    <Box mb="5">
      <Flex align="center" gap="4" justify="space-between" wrap="wrap">
        <Box>
          <Text color="#9aa7b1" fontSize="xs" mb="2">
            {vm.copy.filterLabel}
          </Text>
          <Flex aria-label={vm.copy.filterButtonsAriaLabel} gap="2" role="group" wrap="wrap">
            {vm.filterButtons.map((button) => (
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
        </Box>

        <Flex align="center" gap="3" wrap="wrap">
          {vm.hasActiveFilter ? (
            <Button
              minH="44px"
              onClick={() => void vm.resetFilters()}
              size="sm"
              type="button"
              variant="ghost"
            >
              {vm.copy.resetFiltersActionLabel}
            </Button>
          ) : null}
          <ResultSummary
            entityLabel={vm.copy.entityLabel}
            ofLabel={vm.sharedCopy.resultSummaryOf}
            showingLabel={vm.sharedCopy.resultSummaryShowing}
            totalCount={vm.catalogState.totalCount}
            visibleCount={vm.catalogState.visibleCount}
          />
        </Flex>
      </Flex>
    </Box>
  );
});
