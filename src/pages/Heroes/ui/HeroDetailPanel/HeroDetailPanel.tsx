import { Box, Heading } from '@chakra-ui/react';

import type { HeroDetailFactDescriptor } from '../../model/HeroDetailViewModel';
import { HeroDetailField } from '../HeroDetailField/HeroDetailField';

interface HeroDetailPanelProps {
  readonly facts: readonly HeroDetailFactDescriptor[];
  readonly title: string;
}

export function HeroDetailPanel({ facts, title }: HeroDetailPanelProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="5"
    >
      <Heading as="h2" fontSize="xl" lineHeight="1.2" mb="3">
        {title}
      </Heading>
      <Box as="dl">
        {facts.map((fact) => (
          <HeroDetailField key={fact.label} label={fact.label} value={fact.value} />
        ))}
      </Box>
    </Box>
  );
}
