import { Box, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

import type { PreparedImageSlot } from 'src/shared/lib';

interface AbilityIconVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderLabel: string;
}

export function AbilityIconVisual({ image, placeholderLabel }: AbilityIconVisualProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(image) && !imageError;

  return (
    <Box
      alignItems="center"
      bg="rgba(3, 10, 18, 0.72)"
      borderColor="rgba(103, 232, 249, 0.18)"
      borderRadius="md"
      borderWidth="1px"
      display="flex"
      flex="0 0 72px"
      h="72px"
      justifyContent="center"
      overflow="hidden"
      w="72px"
    >
      {showImage && image ? (
        <Image
          alt={image.alt}
          draggable={false}
          h="full"
          htmlHeight={image.height}
          htmlWidth={image.width}
          loading={image.loading}
          objectFit="contain"
          onError={() => setImageError(true)}
          p="2"
          src={image.src}
          srcSet={image.srcSet}
          w="full"
        />
      ) : (
        <Text color="#9aa7b1" fontSize="xs" lineHeight="1.2" px="2" textAlign="center">
          {placeholderLabel}
        </Text>
      )}
    </Box>
  );
}
