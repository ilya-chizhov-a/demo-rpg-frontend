import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';

interface CatalogHeaderProps {
  readonly ariaLabel: string;
  readonly badges: readonly string[];
  readonly description: string;
  readonly descriptionMaxWidth: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly titleId: string;
  readonly titleSize: string | Record<string, string>;
}

export function CatalogHeader({
  ariaLabel,
  badges,
  description,
  descriptionMaxWidth,
  eyebrow,
  title,
  titleId,
  titleSize,
}: CatalogHeaderProps) {
  return (
    <Box as="section" aria-labelledby={titleId} mb="8">
      <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
        {eyebrow}
      </Text>
      <Heading as="h1" fontSize={titleSize} id={titleId} lineHeight="1.05">
        {title}
      </Heading>
      <Text color="#9aa7b1" fontSize="lg" lineHeight="1.6" maxW={descriptionMaxWidth} mt="3">
        {description}
      </Text>
      <Flex
        as="ul"
        aria-label={ariaLabel}
        gap="2"
        listStyleType="none"
        m="0"
        mt="5"
        p="0"
        wrap="wrap"
      >
        {badges.map((badge, index) => (
          <Badge
            as="li"
            colorPalette={index === 0 ? 'blue' : undefined}
            key={badge}
            size="lg"
            variant={index === 0 ? 'subtle' : 'outline'}
          >
            {badge}
          </Badge>
        ))}
      </Flex>
    </Box>
  );
}
