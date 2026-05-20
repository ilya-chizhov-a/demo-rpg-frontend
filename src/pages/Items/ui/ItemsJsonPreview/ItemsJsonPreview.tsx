import { Box, Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { ItemsViewModel } from '../../model/ItemsViewModel';

interface ItemsJsonPreviewProps {
  readonly vm: ItemsViewModel;
}

export const ItemsJsonPreview = observer(function ItemsJsonPreview({ vm }: ItemsJsonPreviewProps) {
  return (
    <Box
      bg="rgba(3, 10, 18, 0.74)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      minW="0"
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
        {vm.copy.payloadPreviewTitle}
      </Heading>
      <Box
        as="pre"
        color="#c9d2da"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="xs"
        lineHeight="1.55"
        maxH={{ base: '220px', lg: '420px' }}
        m="0"
        overflow="auto"
        p="3"
        whiteSpace="pre"
      >
        {vm.payloadPreviewJson}
      </Box>
    </Box>
  );
});
