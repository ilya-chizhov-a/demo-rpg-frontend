import { Badge, Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { ItemDetailViewModel } from '../../model/ItemDetailViewModel';

interface ItemModifierListProps {
  readonly vm: ItemDetailViewModel;
}

export const ItemModifierList = observer(({ vm }: ItemModifierListProps) => {
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
          {vm.copy.detail.modifiersTitle}
        </Heading>
        <Button
          asChild
          color="#67e8f9"
          minH="36px"
          size="sm"
          variant="outline"
          _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
        >
          <RouterLink to={vm.statsHref}>{vm.copy.detail.openStatsAction}</RouterLink>
        </Button>
      </Flex>

      {vm.hasModifiers ? (
        <Stack as="ul" gap="0" listStyleType="none">
          {vm.modifiers.map((modifier) => (
            <Box
              as="li"
              borderBottomColor="rgba(148, 163, 184, 0.18)"
              borderBottomWidth="1px"
              key={modifier.id}
              py="4"
              _last={{ borderBottomWidth: '0', pb: '0' }}
              _first={{ pt: '0' }}
            >
              <Flex align="flex-start" gap="4" justify="space-between" wrap="wrap">
                <Box flex="1" minW={{ base: '100%', sm: '240px' }}>
                  <Heading as="h3" fontSize="md">
                    {modifier.title}
                  </Heading>
                  <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2">
                    {modifier.description}
                  </Text>
                </Box>
                <Flex gap="2" wrap="wrap">
                  <Badge colorPalette="cyan" variant="subtle">
                    {vm.copy.detail.modifierValueLabel}: {modifier.valueLabel}
                  </Badge>
                  <Badge colorPalette="purple" variant="subtle">
                    {vm.copy.detail.modifierStatCodeLabel}: {modifier.codeLabel}
                  </Badge>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Stack>
      ) : (
        <Box borderTopColor="rgba(148, 163, 184, 0.18)" borderTopWidth="1px" pt="4">
          <Heading as="h3" fontSize="md">
            {vm.copy.detail.modifiersEmptyTitle}
          </Heading>
          <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2">
            {vm.copy.detail.modifiersEmptyDescription}
          </Text>
        </Box>
      )}
    </Box>
  );
});
