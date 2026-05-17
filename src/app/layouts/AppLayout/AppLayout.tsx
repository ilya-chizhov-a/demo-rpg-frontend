import { Badge, Box, Button, Container, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink, useLocation } from 'react-router';

import { useViewModel } from 'src/shared/lib';
import { AppLayoutViewModel } from './AppLayoutViewModel';
import { HeaderNavIcon } from './AppLayoutIcons';
import { HeaderBrandContent } from './HeaderBrand';
import { HeaderLanguageMenu } from './HeaderLanguageMenu';
import { HeaderNavigationDialog } from './HeaderNavigationDialog';
import { SourceSchemaMenu } from './SourceSchemaMenu';

interface AppLayoutProps {
  readonly children: React.ReactNode;
}

export const AppLayout = observer(function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const vm = useViewModel(AppLayoutViewModel);
  const primaryNavItems = vm.getPrimaryNavItems(location.pathname);

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
        bg="rgba(5, 10, 15, 0.94)"
        backdropFilter="blur(18px)"
        borderBottomColor="rgba(103, 232, 249, 0.16)"
        borderBottomWidth="1px"
        boxShadow="0 16px 44px rgba(0, 0, 0, 0.24)"
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <Container maxW="1440px" px={{ base: '4', md: '6', lg: '8' }} py="2">
          <Flex
            align="center"
            gap={{ base: '3', xl: '5' }}
            justify="space-between"
            wrap="nowrap"
          >
            <Link
              asChild
              color="#f4f7f8"
              flex="0 0 auto"
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="bold"
              letterSpacing="0"
              css={{
                '&:focus:not(:focus-visible)': {
                  boxShadow: 'none',
                  outline: 'none',
                },
              }}
              _focus={{
                boxShadow: 'none',
                outline: 'none',
              }}
              _focusVisible={{
                boxShadow: 'none',
                color: '#67e8f9',
                outline: 'none',
                textDecoration: 'underline',
                textUnderlineOffset: '5px',
              }}
              _hover={{ color: '#67e8f9', textDecoration: 'none' }}
            >
              <RouterLink aria-label="Branching Tales home" to="/">
                <HeaderBrandContent />
              </RouterLink>
            </Link>

            <Box
              as="nav"
              aria-label="Primary navigation"
              flex="1 1 auto"
              minW="0"
              overflowX="visible"
              css={{
                '@media (max-width: 1200px)': {
                  display: 'none',
                },
              }}
            >
              <HStack
                gap={{ base: '1', md: '2' }}
                justify="center"
                minW="max-content"
              >
                {primaryNavItems.map((item) => {
                  return (
                    <Button
                      asChild
                      bg={item.isActive ? 'rgba(34, 211, 238, 0.13)' : 'transparent'}
                      borderColor={item.isActive ? 'rgba(34, 211, 238, 0.55)' : 'transparent'}
                      borderWidth="1px"
                      boxShadow={
                        item.isActive
                          ? 'inset 0 -2px 0 #22d3ee, 0 0 22px rgba(34, 211, 238, 0.12)'
                          : 'none'
                      }
                      color={item.isActive ? '#67e8f9' : '#9aa7b1'}
                      h="44px"
                      key={item.id}
                      minW="0"
                      px={{ base: '3', md: '4' }}
                      size="sm"
                      variant="ghost"
                      _hover={{
                        bg: item.isActive ? 'rgba(34, 211, 238, 0.18)' : 'rgba(23, 33, 43, 0.72)',
                        borderColor: 'rgba(103, 232, 249, 0.4)',
                        color: '#f4f7f8',
                      }}
                    >
                      <RouterLink aria-current={item.isActive ? 'page' : undefined} to={item.to}>
                        <Flex align="center" as="span" gap="2">
                          <HeaderNavIcon name={item.icon} />
                          <Text as="span" fontWeight="semibold">
                            {item.label}
                          </Text>
                        </Flex>
                      </RouterLink>
                    </Button>
                  );
                })}
              </HStack>
            </Box>

            <HStack flex="0 0 auto" gap="2">
              <HeaderLanguageMenu
                currentLocale={vm.currentLocale}
                currentLocaleName={vm.currentLocaleName}
                isOpen={vm.isLanguageMenuOpen}
                onChange={(locale) => vm.setLocale(locale)}
                onOpenChange={(isOpen) => vm.setLanguageMenuOpen(isOpen)}
                options={vm.localeOptions}
              />
              <SourceSchemaMenu
                links={vm.sourceSchemaLinks}
                menuDescription={vm.sourceSchemaMenuDescription}
                menuTitle={vm.sourceSchemaMenuTitle}
                onOpen={() => vm.closeLanguageMenu()}
              />
              <Box
                css={{
                  '@media (min-width: 1201px)': {
                    display: 'none',
                  },
                }}
              >
                <HeaderNavigationDialog
                  isOpen={vm.isNavigationDialogOpen}
                  items={primaryNavItems}
                  onOpenChange={(isOpen) => vm.setNavigationDialogOpen(isOpen)}
                  onSelectItem={() => vm.closeNavigationDialog()}
                />
              </Box>
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
