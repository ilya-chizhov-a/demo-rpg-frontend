import { Box, Image, Text } from '@chakra-ui/react';

import type { PreparedImageSlot } from 'src/shared/lib';

interface ClassIconVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderLabel: string;
}

export function ClassIconVisual({ image, placeholderLabel }: ClassIconVisualProps) {
  return (
    <Box
      alignItems="center"
      aspectRatio="1"
      bg="#071018"
      borderColor="rgba(103, 232, 249, 0.2)"
      borderRadius="md"
      borderWidth="1px"
      display="flex"
      flex="0 0 auto"
      h="96px"
      justifyContent="center"
      overflow="hidden"
      p="2"
      shadow="inset 0 0 24px rgba(34, 211, 238, 0.08)"
      w="96px"
    >
      {image ? (
        <Image
          alt={image.alt}
          draggable={false}
          h="full"
          loading={image.loading}
          objectFit="contain"
          src={image.src}
          srcSet={image.srcSet}
          w="full"
        />
      ) : (
        <Text
          color="#9aa7b1"
          fontSize="xs"
          lineHeight="1.1"
          overflowWrap="anywhere"
          textAlign="center"
        >
          {placeholderLabel}
        </Text>
      )}
    </Box>
  );
}
