import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { CatalogActionButton } from '../CatalogActionButton/CatalogActionButton';
import { CatalogFactRow } from '../CatalogFactRow/CatalogFactRow';

export interface ReferenceCatalogFact {
  readonly label: string;
  readonly value: string;
}

interface ReferenceCatalogCardProps {
  readonly actionLabel: string;
  readonly actionTo: string;
  readonly badge: string;
  readonly description: string;
  readonly facts: readonly ReferenceCatalogFact[];
  readonly localeLabel: string;
  readonly mark: ReactNode;
  readonly title: string;
}

export function ReferenceCatalogCard({
  actionLabel,
  actionTo,
  badge,
  description,
  facts,
  localeLabel,
  mark,
  title,
}: ReferenceCatalogCardProps) {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="5"
      minH="312px"
      p="5"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.2)"
      transition="box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease"
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.5)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.28)',
      }}
    >
      <Flex align="flex-start" gap="4">
        {mark}
        <Box flex="1" minW="0">
          <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
            <Badge colorPalette="teal" variant="subtle">
              {badge}
            </Badge>
            <Text flexShrink="0">{localeLabel}</Text>
          </Flex>
          <Heading as="h2" fontSize="xl" lineHeight="1.2" mt="4">
            {title}
          </Heading>
          <Text color="#9aa7b1" lineHeight="1.55" mt="2">
            {description}
          </Text>
        </Box>
      </Flex>

      <SimpleGrid
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: facts.length }}
        gapX="4"
        pt="2"
      >
        {facts.map((fact) => (
          <CatalogFactRow
            key={`${fact.label}:${fact.value}`}
            label={fact.label}
            value={fact.value}
            wrapValue
          />
        ))}
      </SimpleGrid>

      <CatalogActionButton to={actionTo}>{actionLabel}</CatalogActionButton>
    </Box>
  );
}
