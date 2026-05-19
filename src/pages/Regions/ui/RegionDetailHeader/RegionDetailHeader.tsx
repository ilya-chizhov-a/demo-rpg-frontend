import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { RegionDetailViewModel } from '../../model/RegionDetailViewModel';

interface RegionDetailHeaderProps {
  readonly vm: RegionDetailViewModel;
}

export const RegionDetailHeader = observer(({ vm }: RegionDetailHeaderProps) => {
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
        <Badge colorPalette="green" size="lg" variant="subtle">
          {vm.climateLabel}
        </Badge>
        <Badge colorPalette="blue" size="lg" variant="subtle">
          {vm.copy.headerBadges[0] ?? 'data.regions'}
        </Badge>
        <Badge colorPalette="gray" size="lg" variant="subtle">
          {vm.copy.detail.backendPending}
        </Badge>
      </Flex>
      <Heading as="h1" fontSize={{ base: '3xl', md: '3xl' }} lineHeight="1.12">
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
