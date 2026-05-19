import { Box, Flex, Text, type BoxProps } from '@chakra-ui/react';

interface RegionMediaPlaceholderProps {
  readonly title: string;
  readonly descriptionMaxW?: BoxProps['maxW'];
  readonly description?: string;
  readonly eyebrow?: string;
  readonly height?: BoxProps['h'];
  readonly titleFontSize?: BoxProps['fontSize'];
}

export function RegionMediaPlaceholder({
  title,
  descriptionMaxW = '320px',
  description,
  eyebrow,
  height,
  titleFontSize = { base: 'md', md: 'lg' },
}: RegionMediaPlaceholderProps) {
  return (
    <Box
      h={height}
      minW="0"
      overflow="hidden"
      position="relative"
      w="full"
      _before={{
        bgImage:
          'linear-gradient(rgba(103, 232, 249, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(103, 232, 249, 0.08) 1px, transparent 1px)',
        bgSize: '28px 28px',
        content: '""',
        inset: 0,
        opacity: 0.44,
        position: 'absolute',
      }}
      _after={{
        bg: 'linear-gradient(135deg, rgba(34, 211, 238, 0.14), rgba(45, 212, 191, 0.08) 44%, rgba(167, 139, 250, 0.14))',
        content: '""',
        inset: 0,
        position: 'absolute',
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
        {eyebrow ? (
          <Text color="#67e8f9" fontSize="xs" fontWeight="bold" textTransform="uppercase">
            {eyebrow}
          </Text>
        ) : null}
        <Text fontSize={titleFontSize} fontWeight="bold" mt={eyebrow ? '2' : '0'}>
          {title}
        </Text>
        {description ? (
          <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="2" maxW={descriptionMaxW}>
            {description}
          </Text>
        ) : null}
      </Flex>
    </Box>
  );
}
