import { Badge, Box, Button, Container, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { getSectionNavigationItems, type SectionNavKey } from 'src/shared/config';
import { SectionSubnav } from 'src/shared/ui';

export interface PlaceholderPageProps {
  readonly title: string;
  readonly route: string;
  readonly status: 'Blocked' | 'Draft';
  readonly capability: string;
  readonly source: string;
  readonly sectionNavKey?: SectionNavKey;
}

export function PlaceholderPage({
  capability,
  route,
  sectionNavKey,
  source,
  status,
  title,
}: PlaceholderPageProps) {
  const colorPalette = status === 'Blocked' ? 'red' : 'orange';
  const sectionNav = sectionNavKey ? getSectionNavigationItems(sectionNavKey, route) : null;

  return (
    <Box as="main" minH="calc(100dvh - 145px)" px={{ base: '4', md: '6', lg: '8' }} py="8">
      <Container maxW="960px" px="0">
        <Stack gap="6">
          <Box>
            <Badge colorPalette={colorPalette} mb="4" variant="subtle">
              {status}
            </Badge>
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1.05">
              {title}
            </Heading>
            <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" maxW="720px" mt="3">
              {status === 'Blocked'
                ? 'This route is wired into the app shell, but its implementation is waiting on a documented dependency.'
                : 'This route is wired into the app shell and ready for implementation from its page spec.'}
            </Text>
          </Box>

          {sectionNav ? <SectionSubnav ariaLabel={`${title} section`} items={sectionNav} /> : null}

          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
            <InfoPanel label="Route" value={route} />
            <InfoPanel label="Source" value={source} />
            <InfoPanel label="Capability" value={capability} />
          </SimpleGrid>

          <Box
            bg="rgba(18, 24, 32, 0.9)"
            borderColor="rgba(103, 232, 249, 0.16)"
            borderRadius="md"
            borderWidth="1px"
            p="5"
          >
            <Heading as="h2" fontSize="xl">
              Implementation placeholder
            </Heading>
            <Text color="#9aa7b1" lineHeight="1.6" mt="2">
              The full page should follow its spec under docs/product/pages, the shared page
              patterns, and the MVVM/DataSource boundaries before this status moves toward Done.
            </Text>
            <Button
              asChild
              bg="#22d3ee"
              color="var(--color-text-on-accent)"
              mt="5"
              _hover={{ bg: '#67e8f9' }}
            >
              <RouterLink to="/regions">Open implemented catalog</RouterLink>
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

interface InfoPanelProps {
  readonly label: string;
  readonly value: string;
}

function InfoPanel({ label, value }: InfoPanelProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.82)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      minW="0"
      p="4"
    >
      <Text color="#9aa7b1" fontSize="sm">
        {label}
      </Text>
      <Text fontWeight="bold" mt="1" overflowWrap="anywhere">
        {value}
      </Text>
    </Box>
  );
}
