import { Box, Dialog, Flex, IconButton, Link, Portal, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { ActiveNavigationItem, PrimaryNavigationItem } from 'src/shared/config';
import { HeaderCloseIcon, HeaderMenuIcon, HeaderNavIcon } from './AppLayoutIcons';
import { HeaderBrandContent } from './HeaderBrand';

interface HeaderNavigationDialogProps {
  readonly isOpen: boolean;
  readonly items: readonly ActiveNavigationItem<PrimaryNavigationItem>[];
  readonly onOpenChange: (isOpen: boolean) => void;
  readonly onSelectItem: () => void;
}

export function HeaderNavigationDialog({
  isOpen,
  items,
  onOpenChange,
  onSelectItem,
}: HeaderNavigationDialogProps) {
  return (
    <Dialog.Root
      lazyMount
      onOpenChange={(details) => onOpenChange(details.open)}
      open={isOpen}
      placement="center"
    >
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Open primary navigation"
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
          <HeaderMenuIcon />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop bg="rgba(5, 10, 15, 0.84)" backdropFilter="blur(12px)" />
        <Dialog.Positioner alignItems="stretch" justifyContent="stretch">
          <Dialog.Content
            bg="#070b10"
            borderRadius="0"
            color="#f4f7f8"
            h="100dvh"
            maxH="100dvh"
            maxW="100vw"
            overflow="hidden"
            shadow="none"
            w="100vw"
            css={{
              '--dialog-shell-gutter': '16px',
              '@media (min-width: 481px)': {
                '--dialog-shell-gutter': '24px',
              },
              '@media (min-width: 1024px)': {
                '--dialog-shell-gutter': '32px',
              },
            }}
          >
            <Dialog.Header
              alignItems="center"
              borderBottomColor="#2a3038"
              borderBottomWidth="1px"
              display="flex"
              justifyContent="space-between"
              px="var(--dialog-shell-gutter)"
              py="4"
            >
              <Dialog.Title>
                <HeaderBrandContent variant="dialog" />
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <IconButton
                  aria-label="Close primary navigation"
                  color="#9aa7b1"
                  h="44px"
                  insetInlineEnd="var(--dialog-shell-gutter)"
                  minW="44px"
                  p={0}
                  top={{ base: '2', lg: '2.5' }}
                  variant="ghost"
                  _focus={{
                    boxShadow: 'none',
                    outline: 'none',
                  }}
                  _focusVisible={{
                    bg: 'rgba(34, 211, 238, 0.12)',
                    boxShadow: 'none',
                    color: '#67e8f9',
                    outline: 'none',
                  }}
                  _hover={{ bg: 'rgba(34, 211, 238, 0.12)', color: '#67e8f9' }}
                >
                  <HeaderCloseIcon />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body p="0">
              <Box as="nav" aria-label="Primary navigation dialog">
                {items.map((item) => (
                  <Link
                    asChild
                    bg={item.isActive ? 'rgba(34, 211, 238, 0.1)' : 'transparent'}
                    borderBottomColor="#2a3038"
                    borderBottomWidth="1px"
                    color={item.isActive ? '#67e8f9' : '#c9d2da'}
                    display="block"
                    key={item.id}
                    textDecoration="none"
                    _hover={{
                      bg: item.isActive
                        ? 'rgba(34, 211, 238, 0.14)'
                        : 'rgba(23, 33, 43, 0.72)',
                      color: item.isActive ? '#67e8f9' : '#f4f7f8',
                      textDecoration: 'none',
                    }}
                  >
                    <RouterLink
                      aria-current={item.isActive ? 'page' : undefined}
                      onClick={onSelectItem}
                      to={item.to}
                    >
                      <Flex align="center" gap="4" minH="72px" px={{ base: '5', md: '8' }}>
                        <HeaderNavIcon name={item.icon} />
                        <Text as="span" fontSize="lg" fontWeight="semibold">
                          {item.label}
                        </Text>
                      </Flex>
                    </RouterLink>
                  </Link>
                ))}
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
