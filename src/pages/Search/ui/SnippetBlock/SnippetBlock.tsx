import { Box, Text } from '@chakra-ui/react';

import type { SearchSnippet } from '../../model/searchJson';

interface SnippetBlockProps {
  readonly snippet: SearchSnippet;
}

export function SnippetBlock({ snippet }: SnippetBlockProps) {
  return (
    <Box>
      <Text as="dt" color="#67e8f9" fontSize="xs" fontWeight="bold" mb="1">
        {snippet.path}
      </Text>
      <Text as="dd" color="#d8e0e8" lineHeight="1.55">
        {snippet.parts.map((part, index) => (
          <Text
            as={part.isMatch ? 'mark' : 'span'}
            bg={part.isMatch ? 'rgba(34, 211, 238, 0.22)' : undefined}
            borderRadius={part.isMatch ? 'sm' : undefined}
            color={part.isMatch ? '#ecfeff' : undefined}
            key={`${snippet.path}-${index}-${part.text}`}
            px={part.isMatch ? '1' : undefined}
          >
            {part.text}
          </Text>
        ))}
      </Text>
    </Box>
  );
}
