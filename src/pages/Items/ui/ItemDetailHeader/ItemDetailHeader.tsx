import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { ItemDetailViewModel } from '../../model/ItemDetailViewModel';

interface ItemDetailHeaderProps {
  readonly vm: ItemDetailViewModel;
}

export const ItemDetailHeader = observer(({ vm }: ItemDetailHeaderProps) => {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between" wrap="wrap">
        <Flex gap="2" minW="0" wrap="wrap">
          <Badge colorPalette="teal" variant="subtle">
            {vm.rarityLabel}
          </Badge>
          <Badge colorPalette="green" variant="subtle">
            {vm.rarityTag}
          </Badge>
        </Flex>
        <Text>{vm.localeLabel}</Text>
      </Flex>
      <Heading as="h1" fontSize={{ base: '4xl', md: '5xl' }} lineHeight="1.05" mt="4">
        {vm.title}
      </Heading>
      <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" mt="4">
        {vm.description}
      </Text>
      <Button
        asChild
        color="#67e8f9"
        mt="5"
        px="0"
        variant="plain"
        whiteSpace="normal"
        _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
      >
        <RouterLink to={vm.itemTypesHref}>
          {vm.copy.detail.fieldType}: {vm.typeTitle}
        </RouterLink>
      </Button>
      <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2">
        {vm.typeDescription}
      </Text>
    </Box>
  );
});
