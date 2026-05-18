import { Badge, Box, Button, Container, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink, useLocation } from 'react-router';

import { useViewModel } from 'src/shared/lib';
import { pageShellGutters, pageShellMaxWidth } from 'src/shared/ui';
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
      _after={{
        bgImage:
          'linear-gradient(180deg, rgba(7, 11, 16, 0.12), rgba(7, 11, 16, 0.38) 42%, rgba(7, 11, 16, 0.82) 100%)',
        bottom: '0',
        content: '""',
        left: '0',
        pointerEvents: 'none',
        position: 'fixed',
        right: '0',
        top: 'var(--app-header-height)',
        zIndex: 0,
      }}
      css={{
        '--app-header-height': '61px',
        '--page-shell-gutter': '16px',
        '--color-text-on-accent': '#071018',
        '--color-text-supporting': '#c9d2da',
        '@media (min-width: 481px)': {
          '--page-shell-gutter': '24px',
        },
        '@media (min-width: 48rem)': {
          '--app-header-height': '65px',
        },
        '@media (min-width: 1024px)': {
          '--page-shell-gutter': '32px',
        },
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
        {vm.skipToContentLabel}
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
        <Container maxW={pageShellMaxWidth} px={pageShellGutters} py="2">
          <Flex
            align="center"
            gap={{ base: '2', '2xl': '4' }}
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
              <RouterLink aria-label={vm.brandHomeAriaLabel} to="/">
                <HeaderBrandContent />
              </RouterLink>
            </Link>

            <Box
              as="nav"
              aria-label={vm.primaryNavigationAriaLabel}
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
                gap="1"
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
                      h="40px"
                      key={item.id}
                      minW="0"
                      px={{ base: '2', '2xl': '3' }}
                      size="sm"
                      variant="ghost"
                      _hover={{
                        bg: item.isActive ? 'rgba(34, 211, 238, 0.18)' : 'rgba(23, 33, 43, 0.72)',
                        borderColor: 'rgba(103, 232, 249, 0.4)',
                        color: '#f4f7f8',
                      }}
                    >
                      <RouterLink aria-current={item.isActive ? 'page' : undefined} to={item.to}>
                        <Flex align="center" as="span" gap="1.5">
                          <HeaderNavIcon name={item.icon} size={22} />
                          <Text as="span" fontSize="sm" fontWeight="semibold">
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
                ariaLabel={vm.languageAriaLabel}
                currentLocale={vm.currentLocale}
                currentLabel={vm.currentLanguageBadgeLabel}
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
                triggerAriaLabel={vm.sourceSchemaTriggerAriaLabel}
              />
              <Box
                css={{
                  '@media (min-width: 1201px)': {
                    display: 'none',
                  },
                }}
              >
                <HeaderNavigationDialog
                  closeLabel={vm.closePrimaryNavigationLabel}
                  isOpen={vm.isNavigationDialogOpen}
                  items={primaryNavItems}
                  navAriaLabel={vm.primaryNavigationDialogAriaLabel}
                  openLabel={vm.openPrimaryNavigationLabel}
                  onOpenChange={(isOpen) => vm.setNavigationDialogOpen(isOpen)}
                  onSelectItem={() => vm.closeNavigationDialog()}
                />
              </Box>
            </HStack>
          </Flex>
        </Container>
      </Box>

      <Box
        aria-hidden="true"
        bottom="0"
        left="0"
        opacity="0.82"
        pointerEvents="none"
        position="fixed"
        right="0"
        top="var(--app-header-height)"
        zIndex="0"
        css={{
          backgroundImage: 'url("/assets/star-map.png")',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
        }}
      />

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
        <Container maxW={pageShellMaxWidth} px={pageShellGutters} py="4">
          <Flex align="center" gap="3" justify="space-between" wrap="wrap">
            <Badge bg="rgba(167, 139, 250, 0.16)" color="#c4b5fd" variant="solid">
              {vm.footerBadgeLabel}
            </Badge>
            <Text color="#9aa7b1" fontSize="sm">
              {vm.footerText}{' '}
              <Link asChild color="#67e8f9" fontWeight="medium">
                <RouterLink to="/about">{vm.footerLinkLabel}</RouterLink>
              </Link>
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
});
