import { Box, Image, Text, type BoxProps, type TextProps } from '@chakra-ui/react';
import { useEffect, useState, type ReactNode } from 'react';

import type { PreparedImageSlot } from 'src/shared/lib';

interface CatalogMediaVisualProps {
  readonly containerProps: BoxProps;
  readonly image: PreparedImageSlot | null;
  readonly imageProps?: BoxProps;
  readonly placeholder: ReactNode;
}

export function CatalogMediaVisual({
  containerProps,
  image,
  imageProps,
  placeholder,
}: CatalogMediaVisualProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const currentSrc = image?.src ?? null;
  const canShowImage = currentSrc !== null && currentSrc !== failedSrc;

  useEffect(() => {
    setFailedSrc(null);
  }, [image?.src]);

  return (
    <Box {...containerProps}>
      {canShowImage && image ? (
        <Image
          alt={image.alt}
          draggable={false}
          h="full"
          htmlHeight={image.height}
          htmlWidth={image.width}
          loading={image.loading}
          objectFit="contain"
          onError={() => setFailedSrc(image.src)}
          src={image.src}
          srcSet={image.srcSet}
          w="full"
          {...imageProps}
        />
      ) : (
        placeholder
      )}
    </Box>
  );
}

interface CatalogMediaPlaceholderProps {
  readonly description: string;
  readonly title: string;
  readonly boxProps?: BoxProps;
  readonly descriptionProps?: TextProps;
  readonly titleProps?: TextProps;
}

export function CatalogMediaPlaceholder({
  boxProps,
  description,
  descriptionProps,
  title,
  titleProps,
}: CatalogMediaPlaceholderProps) {
  return (
    <Box textAlign="center" {...boxProps}>
      <Text color="#f4f7f8" fontWeight="bold" {...titleProps}>
        {title}
      </Text>
      <Text color="#9aa7b1" mt="2" {...descriptionProps}>
        {description}
      </Text>
    </Box>
  );
}
