import { Badge, Box, Heading, Text } from '@chakra-ui/react';

export function RegionBackendPanel() {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.82)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Heading as="h2" fontSize="xl">
        Community notes
      </Heading>
      <Text color="#9aa7b1" lineHeight="1.55" mt="2">
        Likes, views, comments, and activity notes are planned for this region detail page.
      </Text>
      <Badge colorPalette="gray" mt="4" size="lg" variant="subtle">
        coming later
      </Badge>
    </Box>
  );
}
