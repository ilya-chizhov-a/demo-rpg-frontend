import { Badge, Box, Heading, Text } from '@chakra-ui/react';

import type { RegionsPageCopy } from '../../model/regionUiCopy';

interface RegionBackendPanelProps {
  readonly copy: RegionsPageCopy['detail'];
}

export function RegionBackendPanel({ copy }: RegionBackendPanelProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.82)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Heading as="h2" fontSize="xl">
        {copy.communityTitle}
      </Heading>
      <Text color="#9aa7b1" lineHeight="1.55" mt="2">
        {copy.communityDescription}
      </Text>
      <Badge colorPalette="gray" mt="4" size="lg" variant="subtle">
        {copy.communityBadge}
      </Badge>
    </Box>
  );
}
