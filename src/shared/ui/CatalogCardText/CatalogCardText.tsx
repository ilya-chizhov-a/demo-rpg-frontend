import { Box, Heading, Text } from '@chakra-ui/react';

interface CatalogCardTextProps {
  readonly description: string;
  readonly px?: string;
  readonly title: string;
}

export function CatalogCardText({ description, px = '5', title }: CatalogCardTextProps) {
  return (
    <Box px={px}>
      <Heading
        alignItems="flex-start"
        as="h2"
        display="flex"
        fontSize="xl"
        h="2.4em"
        lineHeight="1.2"
        mt="4"
        overflow="hidden"
      >
        <Text
          as="span"
          minW="0"
          overflow="hidden"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            display: '-webkit-box',
          }}
        >
          {title}
        </Text>
      </Heading>
      <Text
        color="#9aa7b1"
        h="4.2em"
        lineHeight="1.4"
        mt="1"
        overflow="hidden"
        style={{
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
          display: '-webkit-box',
        }}
      >
        {description}
      </Text>
    </Box>
  );
}
