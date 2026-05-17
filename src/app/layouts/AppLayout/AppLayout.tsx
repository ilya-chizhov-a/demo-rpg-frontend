import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link,
  Menu,
  Portal,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink, useLocation } from 'react-router';

import { useViewModel } from 'src/shared/lib';
import { AppLayoutViewModel } from './AppLayoutViewModel';

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export const AppLayout = observer(function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const vm = useViewModel(AppLayoutViewModel);

  return (
    <Box
      bg="#0b1118"
      color="#f4f7f8"
      minH="100dvh"
      overflowX="clip"
      position="relative"
      _before={{
        bgImage:
          'radial-gradient(circle at 12% 18%, rgba(103, 232, 249, 0.24) 0 1px, transparent 1.5px), radial-gradient(circle at 78% 12%, rgba(154, 167, 177, 0.26) 0 1px, transparent 1.5px), radial-gradient(circle at 88% 72%, rgba(52, 211, 153, 0.16) 0 1px, transparent 1.5px), linear-gradient(115deg, transparent 0 42%, rgba(34, 211, 238, 0.08) 42.2%, transparent 43%), linear-gradient(16deg, transparent 0 62%, rgba(45, 212, 191, 0.06) 62.2%, transparent 63%)',
        bgSize: '180px 180px, 260px 260px, 220px 220px, 520px 520px, 620px 620px',
        content: '""',
        inset: '0',
        opacity: 0.72,
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 0,
      }}
      _after={{
        bgImage:
          'radial-gradient(circle at 50% 0%, rgba(16, 25, 35, 0.78), rgba(7, 11, 16, 0.36) 42%, rgba(7, 11, 16, 0.84) 100%)',
        content: '""',
        inset: '0',
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 0,
      }}
      css={{
        '--color-text-on-accent': '#071018',
        '--color-text-supporting': '#c9d2da',
      }}
    >
      <Link
        _focusVisible={{ outlineColor: '#67e8f9', outlineOffset: '3px', outlineWidth: '2px' }}
        bg="#17212b"
        borderColor="#22d3ee"
        borderRadius="md"
        borderWidth="1px"
        color="#f4f7f8"
        href="#app-content"
        left="4"
        p="2"
        position="absolute"
        top="-100px"
        zIndex="banner"
        _focus={{ top: '4' }}
      >
        Skip to content
      </Link>

      <Box
        as="header"
        bg="rgba(7, 11, 16, 0.9)"
        backdropFilter="blur(14px)"
        borderBottomColor="rgba(103, 232, 249, 0.16)"
        borderBottomWidth="1px"
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <Container maxW="1440px" px={{ base: '4', md: '6', lg: '8' }} py="3">
          <Flex align="center" gap="4" justify="space-between" wrap="wrap">
            <Link
              asChild
              color="#f4f7f8"
              fontSize="lg"
              fontWeight="bold"
              letterSpacing="0"
              _hover={{ textDecoration: 'none' }}
            >
              <RouterLink to="/">
                <Flex align="center" gap="3">
                  <Box
                    alignItems="center"
                    bg="#22d3ee"
                    borderColor="rgba(244, 247, 248, 0.24)"
                    borderRadius="sm"
                    borderWidth="1px"
                    boxSize="9"
                    color="var(--color-text-on-accent)"
                    display="inline-flex"
                    fontSize="sm"
                    fontWeight="black"
                    justifyContent="center"
                  >
                    BT
                  </Box>
                  <Text as="span">Branching Tales</Text>
                </Flex>
              </RouterLink>
            </Link>

            <HStack gap="3" wrap="wrap">
              <HStack as="nav" gap="2" aria-label="Primary navigation" wrap="wrap">
                {vm.getPrimaryNavItems(location.pathname).map((item) => {
                  return (
                    <Button
                      asChild
                      bg={item.isActive ? 'rgba(34, 211, 238, 0.16)' : 'transparent'}
                      borderColor={item.isActive ? 'rgba(103, 232, 249, 0.65)' : 'transparent'}
                      borderWidth="1px"
                      color={item.isActive ? '#f4f7f8' : '#9aa7b1'}
                      key={item.to}
                      size="sm"
                      variant="ghost"
                      _hover={{
                        bg: item.isActive ? 'rgba(34, 211, 238, 0.2)' : 'rgba(23, 33, 43, 0.78)',
                        color: '#f4f7f8',
                      }}
                    >
                      <RouterLink aria-current={item.isActive ? 'page' : undefined} to={item.to}>
                        {item.label}
                      </RouterLink>
                    </Button>
                  );
                })}
              </HStack>
              <Menu.Root positioning={{ placement: 'bottom-end' }}>
                <Menu.Trigger asChild>
                  <Button
                    aria-label={`Language: ${vm.currentLocaleName}`}
                    bg="rgba(18, 24, 32, 0.86)"
                    borderColor="rgba(103, 232, 249, 0.32)"
                    borderWidth="1px"
                    color="#f4f7f8"
                    minH="44px"
                    minW="52px"
                    size="sm"
                    variant="outline"
                    _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
                  >
                    {vm.currentLocaleLabel}
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content
                      bg="#121820"
                      borderColor="rgba(103, 232, 249, 0.24)"
                      borderWidth="1px"
                      minW="140px"
                      shadow="0 18px 42px rgba(0, 0, 0, 0.32)"
                    >
                      {vm.localeOptions.map((option) => {
                        const isSelected = vm.isLocaleSelected(option.value);

                        return (
                          <Menu.Item
                            aria-checked={isSelected}
                            bg={isSelected ? 'rgba(34, 211, 238, 0.16)' : 'transparent'}
                            color="#f4f7f8"
                            key={option.value}
                            onClick={() => vm.setLocale(option.value)}
                            role="menuitemradio"
                            value={option.value}
                            _highlighted={{ bg: 'rgba(34, 211, 238, 0.12)' }}
                          >
                            <Flex align="center" gap="3" justify="space-between" w="100%">
                              <Text as="span">
                                {option.label} - {option.nativeLabel}
                              </Text>
                              {isSelected ? (
                                <Badge colorPalette="cyan" size="sm" variant="subtle">
                                  Current
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
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box id="app-content" position="relative" zIndex="1">
        {children}
      </Box>

      <Box
        as="footer"
        bg="rgba(7, 11, 16, 0.86)"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        position="relative"
        zIndex="1"
      >
        <Container maxW="1440px" px={{ base: '4', md: '6', lg: '8' }} py="4">
          <Flex align="center" gap="3" justify="space-between" wrap="wrap">
            <Badge bg="rgba(167, 139, 250, 0.16)" color="#c4b5fd" variant="solid">
              React Router SSR + GraphQL
            </Badge>
            <Text color="#9aa7b1" fontSize="sm">
              data + cms + backend subgraphs.{' '}
              <Link asChild color="#67e8f9" fontWeight="medium">
                <RouterLink to="/about">Architecture</RouterLink>
              </Link>
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
});
