import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';

export function ClassesHeader() {
  return (
    <Box as="section" aria-labelledby="classes-title" mb="8">
      <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
        Hero codex
      </Text>
      <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} id="classes-title" lineHeight="1.05">
        Classes
      </Heading>
      <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" maxW="720px" mt="3">
        Compact class profiles for comparing hero roles, base stats, and growth paths.
      </Text>
      <Flex aria-label="Capabilities" gap="2" mt="5" wrap="wrap">
        <Badge colorPalette="blue" size="lg" variant="subtle">
          class list
        </Badge>
        <Badge size="lg" variant="outline">
          hero roles
        </Badge>
        <Badge size="lg" variant="outline">
          stat growth
        </Badge>
      </Flex>
    </Box>
  );
}
