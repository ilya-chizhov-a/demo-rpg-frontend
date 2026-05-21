import { Box, Heading, Stack, Text } from '@chakra-ui/react';

import type { BlogMarkdownBlock } from '../../model/markdownBlocks';

interface BlogMarkdownProps {
  readonly blocks: readonly BlogMarkdownBlock[];
}

export function BlogMarkdown({ blocks }: BlogMarkdownProps) {
  return (
    <Stack gap="5">
      {blocks.map((block, index) => {
        if (block.kind === 'heading') {
          return (
            <Heading
              as={block.level === 2 ? 'h2' : 'h3'}
              color="#f4f7f8"
              fontSize={block.level === 2 ? '2xl' : 'xl'}
              key={`${block.kind}-${index}`}
              lineHeight="1.2"
              mt={index === 0 ? '0' : '4'}
            >
              {block.text}
            </Heading>
          );
        }

        if (block.kind === 'list') {
          return (
            <Box
              as="ul"
              color="#c9d2da"
              key={`${block.kind}-${index}`}
              lineHeight="1.75"
              pl="5"
            >
              {block.items.map((item) => (
                <Text as="li" key={item} mb="2">
                  <InlineMarkdown value={item} />
                </Text>
              ))}
            </Box>
          );
        }

        return (
          <Text color="#c9d2da" fontSize="lg" key={`${block.kind}-${index}`} lineHeight="1.8">
            <InlineMarkdown value={block.text} />
          </Text>
        );
      })}
    </Stack>
  );
}

interface InlineMarkdownProps {
  readonly value: string;
}

function InlineMarkdown({ value }: InlineMarkdownProps) {
  const parts = value.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <Text as="strong" color="#f4f7f8" fontWeight="bold" key={`${part}-${index}`}>
            {part.slice(2, -2)}
          </Text>
        ) : (
          <Text as="span" key={`${part}-${index}`}>
            {part}
          </Text>
        ),
      )}
    </>
  );
}
