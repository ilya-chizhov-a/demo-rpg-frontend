import { Box, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';

import type { PreparedImageSlot } from 'src/shared/lib';

interface NpcPortraitVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function NpcPortraitVisual({
  image,
  placeholderDescription,
  placeholderTitle,
}: NpcPortraitVisualProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(image) && !imageError;

  return (
    <Box
      alignItems="center"
      aspectRatio="3 / 4"
      bg="rgba(3, 10, 18, 0.72)"
      borderBottomColor="rgba(103, 232, 249, 0.12)"
      borderBottomWidth="1px"
      display="flex"
      justifyContent="center"
      overflow="hidden"
      position="relative"
      w="full"
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
          src={image.src}
          srcSet={image.srcSet}
          w="full"
        />
      ) : (
        <Box px="5" textAlign="center">
          <Text color="#f4f7f8" fontWeight="bold">
            {placeholderTitle}
          </Text>
          <Text color="#9aa7b1" fontSize="sm" lineHeight="1.4" mt="2">
            {placeholderDescription}
          </Text>
        </Box>
      )}
    </Box>
  );
}
