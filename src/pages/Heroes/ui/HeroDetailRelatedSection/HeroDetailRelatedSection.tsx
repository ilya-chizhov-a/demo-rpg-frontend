import { Badge, Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { HeroDetailRelatedItemDescriptor } from '../../model/HeroDetailViewModel';

interface HeroDetailRelatedSectionProps {
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly items: readonly HeroDetailRelatedItemDescriptor[];
  readonly title: string;
}

export function HeroDetailRelatedSection({
  emptyDescription,
  emptyTitle,
  items,
  title,
}: HeroDetailRelatedSectionProps) {
  return (
    <Box as="section" borderTopColor="rgba(103, 232, 249, 0.16)" borderTopWidth="1px" pt="5">
      <Heading as="h2" fontSize="2xl" lineHeight="1.2" mb="4">
        {title}
      </Heading>
      {items.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="4">
          {items.map((item) => (
            <RelatedItem item={item} key={item.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Box
          bg="rgba(18, 24, 32, 0.72)"
          borderColor="rgba(103, 232, 249, 0.16)"
          borderRadius="md"
          borderWidth="1px"
          p="5"
        >
          <Heading as="h3" fontSize="lg">
            {emptyTitle}
          </Heading>
          <Text color="#9aa7b1" mt="2">
            {emptyDescription}
          </Text>
        </Box>
      )}
    </Box>
  );
}

interface RelatedItemProps {
  readonly item: HeroDetailRelatedItemDescriptor;
}

function RelatedItem({ item }: RelatedItemProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="3"
      p="5"
    >
      <Flex gap="2" wrap="wrap">
        {item.badges.map((badge, badgeIndex) => (
          <Badge colorPalette="cyan" key={`${item.id}:badge:${badgeIndex}`} variant="subtle">
            {badge}
          </Badge>
        ))}
      </Flex>
      <Box minW="0">
        {item.href ? (
          <Button
            asChild
            color="#67e8f9"
            fontSize="lg"
            fontWeight="bold"
            h="auto"
            justifyContent="flex-start"
            minH="44px"
            p="0"
            textAlign="left"
            variant="plain"
            whiteSpace="normal"
          >
            <RouterLink to={item.href}>{item.title}</RouterLink>
          </Button>
        ) : (
          <Heading as="h3" fontSize="lg" lineHeight="1.25" overflowWrap="anywhere">
            {item.title}
          </Heading>
        )}
        <Text color="#9aa7b1" fontSize="sm" mt="1">
          {item.subtitle}
        </Text>
      </Box>
      <Box as="dl">
        {item.facts.map((fact, factIndex) => (
          <Flex
            align="center"
            as="div"
            borderTopColor="rgba(103, 232, 249, 0.12)"
            borderTopWidth="1px"
            gap="3"
            justify="space-between"
            key={`${item.id}:fact:${factIndex}`}
            py="2"
          >
            <Text as="dt" color="#9aa7b1" fontSize="xs">
              {fact.label}
            </Text>
            <Text as="dd" fontSize="sm" fontWeight="bold">
              {fact.value}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}
