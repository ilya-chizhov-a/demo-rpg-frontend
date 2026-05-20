import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

interface CatalogEmptyStateProps {
  readonly actionLabel: string;
  readonly actionTo: string;
  readonly description: string;
  readonly title: string;
}

export function CatalogEmptyState({
  actionLabel,
  actionTo,
  description,
  title,
}: CatalogEmptyStateProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Heading as="h2" fontSize="xl">
        {title}
      </Heading>
      <Text color="#9aa7b1" mt="2">
        {description}
      </Text>
      <Button
        asChild
        bg="#22d3ee"
        color="var(--color-text-on-accent)"
        minH="44px"
        mt="4"
        _hover={{ bg: '#67e8f9' }}
      >
        <RouterLink to={actionTo}>{actionLabel}</RouterLink>
      </Button>
    </Box>
  );
}
