import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { FactionDetailViewModel } from '../../model/FactionDetailViewModel';

interface FactionDetailHeaderProps {
  readonly vm: FactionDetailViewModel;
}

export const FactionDetailHeader = observer(({ vm }: FactionDetailHeaderProps) => {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      minW="0"
      p="6"
    >
      <Flex gap="2" mb="4" wrap="wrap">
        <Badge colorPalette="cyan" maxW="full" size="lg" variant="subtle" whiteSpace="normal">
          {vm.alignmentLabel}
        </Badge>
        <Badge colorPalette="blue" size="lg" variant="subtle">
          {vm.copy.detail.datasetLabel}
        </Badge>
      </Flex>
      <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} lineHeight="1.1">
        {vm.title}
      </Heading>
      <Text color="var(--color-text-supporting)" fontSize="md" lineHeight="1.55" mt="4">
        {vm.description}
      </Text>
      <Flex align="center" color="#9aa7b1" gap="3" mt="3" wrap="wrap">
        <Text fontSize="sm">
          {vm.copy.detail.localeLabel}:{' '}
          <Text as="span" fontWeight="bold">
            {vm.localeLabel}
          </Text>
        </Text>
      </Flex>
    </Box>
  );
});
