import { Box, Button, Menu, Portal, Text } from '@chakra-ui/react';

import type { SourceSchemaLink } from './AppLayoutViewModel';
import { RevisiumSourceIcon } from './AppLayoutIcons';
import { SourceSchemaMenuItem } from './SourceSchemaMenuItem';

interface SourceSchemaMenuProps {
  readonly links: readonly SourceSchemaLink[];
  readonly menuDescription: string;
  readonly menuTitle: string;
  readonly onOpen?: () => void;
}

export function SourceSchemaMenu({
  links,
  menuDescription,
  menuTitle,
  onOpen,
}: SourceSchemaMenuProps) {
  return (
    <Menu.Root
      onOpenChange={(details) => {
        if (details.open) {
          onOpen?.();
        }
      }}
      positioning={{ placement: 'bottom-end' }}
    >
      <Menu.Trigger asChild>
        <Button
          aria-label="Open Revisium source schemas"
          bg="transparent"
          borderColor="transparent"
          borderWidth="0"
          color="#f4f7f8"
          h="44px"
          minW="44px"
          p={0}
          px="0"
          size="sm"
          variant="outline"
          w="44px"
          css={{
            '--revisium-logo-bg': '#ffffff',
            '--revisium-logo-primary': '#000000',
            '--revisium-logo-secondary': '#d9d9d9',
          }}
          _focus={{
            boxShadow: 'none',
            outline: 'none',
          }}
          _focusVisible={{
            bg: 'transparent',
            boxShadow: '0 0 0 2px rgba(103, 232, 249, 0.65)',
            outline: 'none',
          }}
          _hover={{ bg: 'transparent', borderColor: 'transparent' }}
        >
          <RevisiumSourceIcon />
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content
            bg="#0f151d"
            borderColor="rgba(103, 232, 249, 0.24)"
            borderWidth="1px"
            minW="300px"
            overflow="hidden"
            p="0"
            shadow="0 22px 58px rgba(0, 0, 0, 0.38)"
          >
            <Box
              borderBottomColor="rgba(103, 232, 249, 0.16)"
              borderBottomWidth="1px"
              px="4"
              py="3"
            >
              <Text color="#f4f7f8" fontSize="sm" fontWeight="bold">
                {menuTitle}
              </Text>
              <Text color="#9aa7b1" fontSize="xs" mt="1">
                {menuDescription}
              </Text>
            </Box>
            {links.map((link) => (
              <SourceSchemaMenuItem key={link.href} link={link} />
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
