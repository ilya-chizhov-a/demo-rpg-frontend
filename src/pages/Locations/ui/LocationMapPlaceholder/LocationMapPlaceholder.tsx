import { Box, type BoxProps, Flex, Text } from '@chakra-ui/react';

interface LocationMapPlaceholderProps extends Omit<BoxProps, 'children'> {
  readonly descriptionMaxW?: BoxProps['maxW'];
  readonly gridSize?: string;
  readonly kindLabel: string;
  readonly placeholderDescription: string;
  readonly placeholderTitle: string;
  readonly titleFontSize?: BoxProps['fontSize'];
}

export function LocationMapPlaceholder({
  descriptionMaxW = '320px',
  gridSize = '24px 24px',
  kindLabel,
  placeholderDescription,
  placeholderTitle,
  titleFontSize = 'lg',
  _after,
  _before,
  ...boxProps
}: Readonly<LocationMapPlaceholderProps>) {
  return (
    <Box
      bg="#071018"
      overflow="hidden"
      position="relative"
      {...boxProps}
      _before={{
        bgImage:
          'linear-gradient(rgba(103, 232, 249, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(103, 232, 249, 0.08) 1px, transparent 1px)',
        bgSize: gridSize,
        content: '""',
        inset: 0,
        opacity: 0.5,
        position: 'absolute',
        ..._before,
      }}
      _after={{
        bg: 'linear-gradient(135deg, rgba(34, 211, 238, 0.12), rgba(45, 212, 191, 0.08) 48%, rgba(167, 139, 250, 0.12))',
        content: '""',
        inset: 0,
        position: 'absolute',
        ..._after,
      }}
    >
      <Flex
        align="center"
        color="var(--color-text-supporting)"
        direction="column"
        h="full"
        justify="center"
        px="5"
        position="relative"
        textAlign="center"
        zIndex="1"
      >
        <Text color="#67e8f9" fontSize="xs" fontWeight="bold" textTransform="uppercase">
          {kindLabel}
        </Text>
        <Text fontSize={titleFontSize} fontWeight="bold" mt="2">
          {placeholderTitle}
        </Text>
        <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2" maxW={descriptionMaxW}>
          {placeholderDescription}
        </Text>
      </Flex>
    </Box>
  );
}
