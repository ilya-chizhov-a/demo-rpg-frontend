import { Button, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { LocationsViewModel } from '../../model/LocationsViewModel';

interface LocationsToolbarProps {
  readonly vm: LocationsViewModel;
}

export const LocationsToolbar = observer(({ vm }: LocationsToolbarProps) => {
  return (
    <Flex align="flex-start" gap="4" mb="5" wrap="wrap">
      <Flex align="flex-end" flex="1" gap="2" justify="flex-start" wrap="wrap">
        <Flex
          aria-label={vm.copy.regionButtonsAriaLabel}
          gap="2"
          role="group"
          wrap="wrap"
        >
          {vm.regionButtons.map((button) => (
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
    </Flex>
  );
});
