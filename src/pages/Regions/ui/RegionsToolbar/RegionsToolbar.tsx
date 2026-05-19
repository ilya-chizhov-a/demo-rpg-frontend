import { Box, Button, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { RegionsViewModel } from '../../model/RegionsViewModel';

interface RegionsToolbarProps {
  readonly vm: RegionsViewModel;
}

export const RegionsToolbar = observer(({ vm }: RegionsToolbarProps) => {
  return (
    <Flex align="flex-start" gap="4" mb="5" wrap="wrap">
      <Box>
        {vm.climateButtons.length > 1 ? (
          <Flex
            aria-label={vm.copy.climateButtonsAriaLabel}
            gap="2"
            role="group"
            wrap="wrap"
          >
            {vm.climateButtons.map((button) => (
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
      </Box>
    </Flex>
  );
});
