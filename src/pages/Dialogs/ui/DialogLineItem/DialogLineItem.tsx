import { Badge, Box, Flex, Text } from '@chakra-ui/react';

import type { DialogLineDescriptor } from '../../model/dialogsUiCopy';

interface DialogLineItemProps {
  readonly line: DialogLineDescriptor;
}

export function DialogLineItem({ line }: DialogLineItemProps) {
  return (
    <Box
      as="li"
      bg="rgba(15, 21, 29, 0.72)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      p="3"
    >
      <Flex align="center" color="#9aa7b1" fontSize="xs" gap="2" justify="space-between">
        <Text fontWeight="bold" overflowWrap="anywhere">
          {line.speakerLabel}
        </Text>
        <Badge colorPalette="gray" variant="subtle">
          {line.emotionLabel}
        </Badge>
      </Flex>
      <Text color="#d8e0e8" fontSize="sm" lineHeight="1.45" mt="2">
        {line.text}
      </Text>
    </Box>
  );
}
