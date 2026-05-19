import { Button, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { FactionsViewModel } from '../../model/FactionsViewModel';

interface FactionsToolbarProps {
  readonly vm: FactionsViewModel;
}

export const FactionsToolbar = observer(({ vm }: FactionsToolbarProps) => {
  return (
    <Flex align="flex-start" gap="4" mb="5" wrap="wrap">
      {vm.alignmentButtons.length > 1 ? (
        <Flex
          aria-label={vm.copy.alignmentButtonsAriaLabel}
          gap="2"
          role="group"
          wrap="wrap"
        >
          {vm.alignmentButtons.map((button) => (
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
      ) : null}
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
    </Flex>
  );
});
