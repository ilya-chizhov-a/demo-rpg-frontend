import { Badge, Box, Button, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import { useViewModel } from 'src/shared/lib';
import { PageShell, SectionSubnav } from 'src/shared/ui';
import { PlaceholderPageViewModel } from '../PlaceholderPageViewModel';
import type { PlaceholderRouteKey } from '../placeholderRoutes';

interface PlaceholderPageProps {
  readonly routeKey: PlaceholderRouteKey;
}

export const PlaceholderPage = observer(function PlaceholderPage({ routeKey }: PlaceholderPageProps) {
  const vm = useViewModel(PlaceholderPageViewModel, routeKey);

  return (
    <PageShell>
      <Stack gap="6">
        <Box>
          <Badge colorPalette={vm.colorPalette} mb="4" variant="subtle">
            {vm.statusLabel}
          </Badge>
          <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1.05">
            {vm.title}
          </Heading>
          <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" maxW="720px" mt="3">
            {vm.description}
          </Text>
        </Box>

        {vm.sectionNav ? (
          <SectionSubnav ariaLabel={vm.sectionAriaLabel} items={vm.sectionNav} />
        ) : null}

        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          <InfoPanel label={vm.pageCopy.routeLabel} value={vm.descriptor.route} />
          <InfoPanel label={vm.pageCopy.sourceLabel} value={vm.descriptor.source} />
          <InfoPanel label={vm.pageCopy.capabilityLabel} value={vm.capability} />
        </SimpleGrid>

        <Box
          bg="rgba(18, 24, 32, 0.9)"
          borderColor="rgba(103, 232, 249, 0.16)"
          borderRadius="md"
          borderWidth="1px"
          p="5"
        >
          <Heading as="h2" fontSize="xl">
            {vm.pageCopy.implementationTitle}
          </Heading>
          <Text color="#9aa7b1" lineHeight="1.6" mt="2">
            {vm.pageCopy.implementationNote}
          </Text>
          <Button
            asChild
            bg="#22d3ee"
            color="var(--color-text-on-accent)"
            mt="5"
            _hover={{ bg: '#67e8f9' }}
          >
            <RouterLink to="/regions">{vm.pageCopy.openImplementedCatalog}</RouterLink>
          </Button>
        </Box>
      </Stack>
    </PageShell>
  );
});

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
