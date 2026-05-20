import { Box, Heading } from '@chakra-ui/react';

import { DetailFactField } from '../DetailFactField/DetailFactField';

export interface DetailFactPanelItem {
  readonly label: string;
  readonly value: string;
}

interface DetailFactPanelProps {
  readonly items: readonly DetailFactPanelItem[];
  readonly title: string;
}

export function DetailFactPanel({ items, title }: DetailFactPanelProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      px="6"
      pt="6"
      pb="3"
    >
      <Heading as="h2" fontSize="xl">
        {title}
      </Heading>
      <Box as="dl" mt="4">
        {items.map((item) => (
          <DetailFactField key={item.label} label={item.label} value={item.value} />
        ))}
      </Box>
    </Box>
  );
}
