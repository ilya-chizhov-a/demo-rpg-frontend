import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { HomeDemoPathItemViewModel } from '../../model/HomeDemoPathItemViewModel';

interface HomeDemoPathCardProps {
  readonly item: HomeDemoPathItemViewModel;
}

export function HomeDemoPathCard({ item }: HomeDemoPathCardProps) {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.82)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      p="5"
    >
      <Text color="#2dd4bf" fontSize="sm" fontWeight="bold">
        {item.stepLabel}
      </Text>
      <Heading as="h3" fontSize="lg" lineHeight="1.25" mt="2">
        {item.title}
      </Heading>
      <Text color="#9aa7b1" lineHeight="1.55" mt="2">
        {item.description}
      </Text>
      <Button
        asChild
        color="#67e8f9"
        minH="11"
        mt="4"
        size="md"
        variant="ghost"
        _hover={{ bg: 'rgba(34, 211, 238, 0.12)' }}
      >
        <RouterLink to={item.href}>{item.actionLabel}</RouterLink>
      </Button>
    </Box>
  );
}
