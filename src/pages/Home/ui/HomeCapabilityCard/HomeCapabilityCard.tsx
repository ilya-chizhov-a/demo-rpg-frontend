import { Badge, Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { HomeCapabilityItemViewModel } from '../../model/HomeCapabilityItemViewModel';

interface HomeCapabilityCardProps {
  readonly item: HomeCapabilityItemViewModel;
}

export function HomeCapabilityCard({ item }: HomeCapabilityCardProps) {
  return (
    <Box
      as="article"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="5"
      minH="230px"
      p="5"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.24)"
      transition="transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease"
      _focusWithin={{
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.16), 0 22px 44px rgba(0, 0, 0, 0.32)',
        transform: 'translateY(-2px)',
      }}
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.58)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.32)',
        transform: 'translateY(-2px)',
      }}
    >
      <Box>
        <Badge colorPalette={item.statusPalette} variant="subtle">
          {item.statusLabel}
        </Badge>
        <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mt="4">
          {item.label}
        </Text>
        <Heading as="h3" fontSize="xl" lineHeight="1.2" mt="2">
          {item.title}
        </Heading>
        <Text color="#9aa7b1" lineHeight="1.55" mt="3">
          {item.description}
        </Text>
      </Box>

      <Button
        asChild
        alignSelf="end"
        borderColor="rgba(103, 232, 249, 0.34)"
        color="#67e8f9"
        minH="11"
        size="md"
        variant="outline"
        w="fit-content"
        _groupHover={{
          bg: '#22d3ee',
          color: 'var(--color-text-on-accent)',
          transform: 'translateX(2px)',
        }}
      >
        <RouterLink to={item.href}>{item.actionLabel}</RouterLink>
      </Button>
    </Box>
  );
}
