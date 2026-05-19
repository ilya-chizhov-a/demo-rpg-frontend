import { Box, Image, Text } from '@chakra-ui/react';
import type { SyntheticEvent } from 'react';

import { applyImageFallback } from 'src/shared/lib';
import type { FactionCrestImageSlot } from '../../model/factionImages';

interface FactionCrestVisualProps {
  readonly alignmentLabel: string;
  readonly image: FactionCrestImageSlot | null;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
}

export function FactionCrestVisual({
  alignmentLabel,
  image,
  placeholderDescription,
  placeholderTitle,
}: FactionCrestVisualProps) {
  return (
    <Box
      alignItems="center"
      aria-label={image ? undefined : placeholderTitle}
      aspectRatio="1"
      bg="#071018"
      borderBottomColor="rgba(103, 232, 249, 0.14)"
      borderBottomWidth="1px"
      display="flex"
      justifyContent="center"
      minW="0"
      overflow="hidden"
      p="5"
      position="relative"
      role={image ? undefined : 'img'}
      shadow="inset 0 0 34px rgba(34, 211, 238, 0.08)"
      w="full"
    >
      {image ? (
        <Image
          alt={image.alt}
          data-fallback-src={image.fallbackSrc}
          draggable={false}
          h="full"
          htmlHeight={image.height}
          htmlWidth={image.width}
          loading={image.loading}
          objectFit="contain"
          onError={handleCrestImageError}
          src={image.src}
          srcSet={image.srcSet}
          w="full"
        />
      ) : (
        <Box maxW="240px" minW="0" textAlign="center" w="full">
          <Text
            color="#67e8f9"
            fontSize="xs"
            fontWeight="bold"
            lineHeight="1.2"
            mb="2"
            minW="0"
            overflow="hidden"
            overflowWrap="anywhere"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              display: '-webkit-box',
            }}
          >
            {alignmentLabel}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            lineHeight="1.2"
            overflow="hidden"
            overflowWrap="anywhere"
          >
            {placeholderTitle}
          </Text>
          <Text
            color="#9aa7b1"
            fontSize="xs"
            lineHeight="1.35"
            mt="2"
            overflow="hidden"
            overflowWrap="anywhere"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              display: '-webkit-box',
            }}
          >
            {placeholderDescription}
          </Text>
        </Box>
      )}
    </Box>
  );
}

function handleCrestImageError(event: SyntheticEvent<HTMLImageElement>): void {
  applyImageFallback(event.currentTarget);
}
