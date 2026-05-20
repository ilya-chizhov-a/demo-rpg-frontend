import { Box, Image, Text } from '@chakra-ui/react';
import type { SyntheticEvent } from 'react';

import { applyImageFallback } from 'src/shared/lib';
import type { HeroPortraitImageSlot } from '../../model/heroImages';

const PORTRAIT_SURFACE_BG = '#071018';
const PORTRAIT_ACCENT_COLOR = '#67e8f9';
const PORTRAIT_MUTED_TEXT_COLOR = '#9aa7b1';
const PORTRAIT_BORDER_COLOR = 'rgba(103, 232, 249, 0.14)';
const CATALOG_PORTRAIT_ASPECT_RATIO = '2 / 3';
const PORTRAIT_HEIGHTS = {
  detail: { base: '520px', md: '620px' },
} as const;
const PLACEHOLDER_CONTENT_MAX_WIDTH = '260px';

interface HeroPortraitVisualProps {
  readonly eyebrow?: string;
  readonly image: HeroPortraitImageSlot | null;
  readonly placeholderDescription?: string;
  readonly placeholderTitle: string;
  readonly size?: 'catalog' | 'detail';
}

export function HeroPortraitVisual({
  eyebrow,
  image,
  placeholderDescription,
  placeholderTitle,
  size = 'catalog',
}: HeroPortraitVisualProps) {
  return (
    <Box
      alignItems="center"
      aria-label={image ? undefined : placeholderTitle}
      aspectRatio={size === 'catalog' ? CATALOG_PORTRAIT_ASPECT_RATIO : undefined}
      bg={PORTRAIT_SURFACE_BG}
      borderBottomColor={PORTRAIT_BORDER_COLOR}
      borderBottomWidth="1px"
      display="flex"
      h={size === 'detail' ? PORTRAIT_HEIGHTS.detail : undefined}
      justifyContent="center"
      minW="0"
      overflow="hidden"
      position="relative"
      role={image ? undefined : 'img'}
      shadow="inset 0 -40px 80px rgba(34, 211, 238, 0.08)"
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
          objectPosition="center center"
          onError={handlePortraitImageError}
          src={image.src}
          srcSet={image.srcSet}
          w="full"
        />
      ) : (
        <Box maxW={PLACEHOLDER_CONTENT_MAX_WIDTH} minW="0" px="5" textAlign="center" w="full">
          {eyebrow ? (
            <Text
              color={PORTRAIT_ACCENT_COLOR}
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
              {eyebrow}
            </Text>
          ) : null}
          <Text
            fontSize="lg"
            fontWeight="bold"
            lineHeight="1.2"
            overflow="hidden"
            overflowWrap="anywhere"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              display: '-webkit-box',
            }}
          >
            {placeholderTitle}
          </Text>
          {placeholderDescription ? (
            <Text
              color={PORTRAIT_MUTED_TEXT_COLOR}
              fontSize="sm"
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
          ) : null}
        </Box>
      )}
    </Box>
  );
}

function handlePortraitImageError(event: SyntheticEvent<HTMLImageElement>): void {
  applyImageFallback(event.currentTarget);
}
