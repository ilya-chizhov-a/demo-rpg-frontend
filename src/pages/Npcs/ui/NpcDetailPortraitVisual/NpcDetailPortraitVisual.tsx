import { Box, Image, Text } from '@chakra-ui/react';
import type { SyntheticEvent } from 'react';

import type { PreparedImageSlot } from 'src/shared/lib';

interface NpcDetailPortraitVisualProps {
  readonly image: PreparedImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function NpcDetailPortraitVisual({
  image,
  placeholderDescription,
  placeholderTitle,
}: NpcDetailPortraitVisualProps) {
  return (
    <Box
      alignItems="center"
      aspectRatio="3 / 4"
      bg="rgba(3, 10, 18, 0.72)"
      borderColor="rgba(103, 232, 249, 0.28)"
      borderRadius="md"
      borderWidth="1px"
      display="flex"
      justifyContent="center"
      maxH={{ base: '640px', xl: '760px' }}
      minW="0"
      overflow="hidden"
      position="relative"
      w="full"
    >
      {image ? (
        <Image
          alt={image.alt}
          draggable={false}
          h="full"
          htmlHeight={image.height}
          htmlWidth={image.width}
          loading={image.loading}
          objectFit="contain"
          onError={handlePortraitError}
          src={image.src}
          srcSet={image.srcSet}
          w="full"
        />
      ) : (
        <Box maxW="360px" px="6" textAlign="center">
          <Text color="#f4f7f8" fontSize="xl" fontWeight="bold">
            {placeholderTitle}
          </Text>
          <Text color="#9aa7b1" lineHeight="1.5" mt="2">
            {placeholderDescription}
          </Text>
        </Box>
      )}
    </Box>
  );
}

function handlePortraitError(event: SyntheticEvent<HTMLImageElement>): void {
  event.currentTarget.style.opacity = '0';
}
