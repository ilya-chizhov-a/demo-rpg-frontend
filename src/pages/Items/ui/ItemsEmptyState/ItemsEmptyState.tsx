import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { ItemsViewModel } from '../../model/ItemsViewModel';

interface ItemsEmptyStateProps {
  readonly vm: ItemsViewModel;
}

export const ItemsEmptyState = observer(function ItemsEmptyState({ vm }: ItemsEmptyStateProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      p="6"
    >
      <Box>
        <Heading as="h2" fontSize="xl">
          {vm.copy.emptyTitle}
        </Heading>
        <Text color="#9aa7b1" mt="2">
          {vm.copy.emptyDescription}
        </Text>
      </Box>

      <Box
        bg="rgba(3, 10, 18, 0.74)"
        borderColor="rgba(103, 232, 249, 0.16)"
        borderRadius="md"
        borderWidth="1px"
        overflow="hidden"
      >
        <Heading
          as="h3"
          borderBottomColor="rgba(103, 232, 249, 0.14)"
          borderBottomWidth="1px"
          color="var(--color-text-supporting)"
          fontSize="sm"
          p="3"
        >
          {vm.copy.emptyPayloadTitle}
        </Heading>
        <Box
          as="pre"
          color="#c9d2da"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          fontSize="xs"
          lineHeight="1.55"
          maxH="260px"
          m="0"
          overflow="auto"
          p="3"
          whiteSpace="pre"
        >
          {vm.payloadPreviewJson}
        </Box>
      </Box>

      {vm.hasActiveFilter ? (
        <Button
          bg="#22d3ee"
          color="var(--color-text-on-accent)"
          justifySelf="flex-start"
          minH="44px"
          onClick={() => void vm.resetFilters()}
          _hover={{ bg: '#67e8f9' }}
        >
          {vm.copy.emptyActionLabel}
        </Button>
      ) : null}
    </Box>
  );
});
