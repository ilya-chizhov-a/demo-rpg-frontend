import { Badge, Box, Button, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { MonsterDetailViewModel } from '../../model/MonsterDetailViewModel';

interface MonsterDropListProps {
  readonly vm: MonsterDetailViewModel;
}

export const MonsterDropList = observer(({ vm }: MonsterDropListProps) => {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Flex align="center" gap="3" justify="space-between" mb="4" wrap="wrap">
        <Heading as="h2" fontSize="xl">
          {vm.copy.detail.dropsTitle}
        </Heading>
        <Badge colorPalette="cyan" variant="subtle">
          {vm.dropCountLabel}
        </Badge>
      </Flex>

      {vm.hasDrops ? (
        <Stack as="ul" gap="0" listStyleType="none">
          {vm.drops.map((drop) => (
            <Box
              as="li"
              borderBottomColor="rgba(148, 163, 184, 0.18)"
              borderBottomWidth="1px"
              key={drop.id}
              py="4"
              _first={{ pt: '0' }}
              _last={{ borderBottomWidth: '0', pb: '0' }}
            >
              <Flex align="flex-start" gap="4" justify="space-between" wrap="wrap">
                <Box flex="1" minW={{ base: '100%', md: '280px' }}>
                  <Button
                    asChild
                    color="#67e8f9"
                    minH="36px"
                    px="0"
                    variant="plain"
                    _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
                  >
                    <RouterLink to={drop.href}>{drop.title}</RouterLink>
                  </Button>
                  <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="1">
                    {vm.copy.detail.dropItemTypeLabel}: {drop.itemTypeTitle}
                  </Text>
                </Box>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2" minW={{ base: '100%', md: '280px' }}>
                  <Badge colorPalette="cyan" variant="subtle">
                    {vm.copy.detail.dropChanceLabel}: {drop.chanceLabel}
                  </Badge>
                  <Badge colorPalette="green" variant="subtle">
                    {vm.copy.detail.dropQuantityLabel}: {drop.quantityLabel}
                  </Badge>
                  <Badge colorPalette="purple" variant="subtle">
                    {drop.rarityLabel}
                  </Badge>
                  <Badge colorPalette="teal" variant="subtle">
                    {vm.copy.detail.dropMarketValueLabel}: {drop.marketValueLabel}
                  </Badge>
                </SimpleGrid>
              </Flex>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box borderTopColor="rgba(148, 163, 184, 0.18)" borderTopWidth="1px" pt="4">
          <Heading as="h3" fontSize="md">
            {vm.copy.detail.dropsEmptyTitle}
          </Heading>
          <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2">
            {vm.copy.detail.dropsEmptyDescription}
          </Text>
        </Box>
      )}
    </Box>
  );
});
