import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { FactionRelatedItemDescriptor } from '../../model/FactionDetailViewModel';

interface RelatedCardProps {
  readonly item: FactionRelatedItemDescriptor;
}

export function RelatedCard({ item }: RelatedCardProps) {
  return (
    <Box
      as="li"
      bg="rgba(7, 16, 24, 0.68)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="3"
      minW="0"
      p="4"
    >
      <Flex gap="2" wrap="wrap">
        {item.badges.map((badge) => (
          <Badge colorPalette="purple" key={badge} variant="subtle" whiteSpace="normal">
            {badge}
          </Badge>
        ))}
      </Flex>
      <Box minW="0">
        <Heading as="h3" fontSize="lg" lineHeight="1.2" overflow="hidden">
          <Text
            as="span"
            minW="0"
            overflow="hidden"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              display: '-webkit-box',
            }}
          >
            {item.title}
          </Text>
        </Heading>
        <Text
          color="#9aa7b1"
          fontSize="sm"
          lineHeight="1.35"
          mt="2"
          overflow="hidden"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            display: '-webkit-box',
          }}
        >
          {item.subtitle}
        </Text>
      </Box>
      <Box as="dl">
        {item.facts.map((fact) => (
          <Flex
            align="flex-start"
            borderBottomColor="rgba(103, 232, 249, 0.12)"
            borderBottomWidth="1px"
            gap="3"
            justify="space-between"
            key={fact.label}
            py="2"
            _last={{ borderBottomWidth: '0' }}
          >
            <Text as="dt" color="#9aa7b1" flexShrink="0" fontSize="xs">
              {fact.label}
            </Text>
            <Text
              as="dd"
              fontSize="xs"
              fontWeight="bold"
              lineHeight="1.25"
              minW="0"
              overflowWrap="anywhere"
              textAlign="right"
            >
              {fact.value}
            </Text>
          </Flex>
        ))}
      </Box>
      <Button
        asChild
        borderColor="rgba(103, 232, 249, 0.34)"
        color="#67e8f9"
        minH="44px"
        size="sm"
        variant="outline"
        _hover={{ bg: 'rgba(34, 211, 238, 0.12)' }}
      >
        <RouterLink to={item.href}>{item.actionLabel}</RouterLink>
      </Button>
    </Box>
  );
}
