import { Badge, Box, Flex, IconButton, Menu, Portal, Text } from '@chakra-ui/react';

import type { LocaleOption, SupportedLocale } from 'src/shared/model';
import { LanguageIcon } from './AppLayoutIcons';

interface HeaderLanguageMenuProps {
  readonly ariaLabel: string;
  readonly currentLocale: SupportedLocale;
  readonly currentLabel: string;
  readonly isOpen: boolean;
  readonly options: readonly LocaleOption[];
  readonly onChange: (locale: SupportedLocale) => void;
  readonly onOpenChange: (isOpen: boolean) => void;
}

export function HeaderLanguageMenu({
  ariaLabel,
  currentLocale,
  currentLabel,
  isOpen,
  onChange,
  onOpenChange,
  options,
}: HeaderLanguageMenuProps) {
  return (
    <Box>
      <Menu.Root
        closeOnSelect
        onOpenChange={(details) => onOpenChange(details.open)}
        open={isOpen}
        positioning={{ placement: 'bottom-end' }}
      >
        <Menu.Trigger asChild>
          <IconButton
            aria-label={ariaLabel}
            bg="rgba(18, 24, 32, 0.86)"
            borderColor="rgba(103, 232, 249, 0.3)"
            borderWidth="1px"
            color="#9aa7b1"
            h="44px"
            minW="44px"
            p={0}
            size="sm"
            transition="background 0.16s ease, border-color 0.16s ease, color 0.16s ease"
            variant="outline"
            _focus={{
              boxShadow: 'none',
              outline: 'none',
            }}
            _focusVisible={{
              bg: 'rgba(34, 211, 238, 0.12)',
              borderColor: '#67e8f9',
              boxShadow: 'none',
              color: '#67e8f9',
              outline: 'none',
            }}
            _hover={{
              bg: 'rgba(34, 211, 238, 0.12)',
              borderColor: '#67e8f9',
              color: '#67e8f9',
            }}
          >
            <LanguageIcon />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content
              bg="#0f151d"
              borderColor="rgba(103, 232, 249, 0.24)"
              borderWidth="1px"
              minW="180px"
              overflow="hidden"
              p="1"
              shadow="0 22px 58px rgba(0, 0, 0, 0.38)"
            >
              {options.map((option) => {
                const isSelected = currentLocale === option.value;

                return (
                  <Menu.Item
                    aria-checked={isSelected}
                    bg={isSelected ? 'rgba(34, 211, 238, 0.16)' : 'transparent'}
                    color="#f4f7f8"
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      onOpenChange(false);
                    }}
                    role="menuitemradio"
                    value={option.value}
                    _highlighted={{ bg: 'rgba(34, 211, 238, 0.12)' }}
                  >
                    <Flex align="center" gap="3" justify="space-between" w="100%">
                      <Box>
                        <Text as="span" fontSize="sm" fontWeight="bold">
                          {option.label}
                        </Text>
                        <Text color="#9aa7b1" fontSize="xs">
                          {option.nativeLabel}
                        </Text>
                      </Box>
                      {isSelected ? (
                        <Badge
                          bg="rgba(34, 211, 238, 0.18)"
                          color="#67e8f9"
                          size="sm"
                          variant="solid"
                        >
                          {currentLabel}
                        </Badge>
                      ) : null}
                    </Flex>
                  </Menu.Item>
                );
              })}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
}
