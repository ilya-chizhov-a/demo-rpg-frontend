import {
  Badge,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import { useViewModel } from 'src/shared/lib';
import { CatalogHeader, PageShell, SectionSubnav } from 'src/shared/ui';
import type { GuideBlockedPageKind } from '../../model/guideCopy';
import { GuideBlockedViewModel } from '../../model/GuideBlockedViewModel';

interface GuideBlockedPageProps {
  readonly kind: GuideBlockedPageKind;
  readonly pathname: string;
}

export const GuideBlockedPage = observer(function GuideBlockedPage({
  kind,
  pathname,
}: GuideBlockedPageProps) {
  const vm = useViewModel(GuideBlockedViewModel, kind, pathname);

  return (
    <PageShell>
      <CatalogHeader
        ariaLabel={vm.copy.guideSectionAriaLabel}
        badges={vm.copy.badges}
        description={vm.copy.description}
        descriptionMaxWidth="840px"
        eyebrow={vm.copy.eyebrow}
        title={vm.copy.title}
        titleId={`${kind}-title`}
        titleSize={{ base: '3xl', md: '5xl' }}
      />
      <SectionSubnav ariaLabel={vm.copy.guideSectionAriaLabel} items={vm.sectionNavItems} />

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="4">
        <Box
          bg="rgba(18, 24, 32, 0.9)"
          borderColor="rgba(248, 113, 113, 0.26)"
          borderRadius="md"
          borderWidth="1px"
          p={{ base: '5', md: '6' }}
        >
          <Badge colorPalette="red" mb="4" variant="subtle">
            {vm.copy.statusLabel}
          </Badge>
          <Heading as="h2" fontSize="2xl">
            {vm.copy.capabilityLabel}
          </Heading>
          <Text color="#c9d2da" lineHeight="1.7" mt="3">
            {vm.copy.blockedReason}
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="3" mt="5">
            <InfoTile label={vm.copy.sourceLabel} value={vm.copy.sourceValue} />
            <InfoTile label={vm.copy.routeLabel} value={pathname} />
          </SimpleGrid>
          <Button
            asChild
            bg="#22d3ee"
            color="var(--color-text-on-accent)"
            mt="6"
            _hover={{ bg: '#67e8f9' }}
          >
            <RouterLink to={vm.copy.actionHref}>{vm.copy.actionLabel}</RouterLink>
          </Button>
        </Box>

        <Box
          bg="rgba(18, 24, 32, 0.72)"
          borderColor="rgba(103, 232, 249, 0.16)"
          borderRadius="md"
          borderWidth="1px"
          p={{ base: '5', md: '6' }}
        >
          <Heading as="h2" fontSize="2xl">
            {vm.copy.previewTitle}
          </Heading>
          <Stack as="ul" gap="3" listStyleType="none" m="0" mt="5" p="0">
            {vm.copy.plannedBlocks.map((block, index) => (
              <Box
                as="li"
                bg="rgba(3, 10, 18, 0.52)"
                borderColor="rgba(103, 232, 249, 0.14)"
                borderRadius="md"
                borderWidth="1px"
                key={block}
                p="4"
              >
                <Text color="#67e8f9" fontSize="xs" fontWeight="bold" textTransform="uppercase">
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text color="#f4f7f8" fontWeight="bold" mt="1">
                  {block}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </SimpleGrid>
    </PageShell>
  );
});

interface InfoTileProps {
  readonly label: string;
  readonly value: string;
}

function InfoTile({ label, value }: InfoTileProps) {
  return (
    <Box
      bg="rgba(3, 10, 18, 0.52)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      p="4"
    >
      <Text color="#9aa7b1" fontSize="sm">
        {label}
      </Text>
      <Text color="#f4f7f8" fontWeight="bold" mt="1" overflowWrap="anywhere">
        {value}
      </Text>
    </Box>
  );
}
