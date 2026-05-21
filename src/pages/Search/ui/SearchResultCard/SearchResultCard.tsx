import { Badge, Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { SearchResultItemViewModel } from '../../model/SearchResultItemViewModel';
import type { SearchPageCopy } from '../../model/searchUiCopy';
import { SnippetBlock } from '../SnippetBlock/SnippetBlock';

interface SearchResultCardProps {
  readonly copy: SearchPageCopy;
  readonly item: SearchResultItemViewModel;
}

export const SearchResultCard = observer(({ copy, item }: SearchResultCardProps) => {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      minW="0"
      p="5"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.2)"
      transition="box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease"
      _focusWithin={{
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.16), 0 22px 44px rgba(0, 0, 0, 0.3)',
      }}
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.52)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.28)',
      }}
    >
      <Box minW="0">
        <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
          <Badge colorPalette="teal" overflow="hidden" textOverflow="ellipsis" variant="subtle">
            {item.sourceCode}
          </Badge>
          <Text flexShrink="0" whiteSpace="nowrap">
            {item.metadataLabel}
          </Text>
        </Flex>

        <Heading as="h3" fontSize="xl" lineHeight="1.2" mt="3">
          {item.title}
        </Heading>
      </Box>

      <Box as="dl" display="grid" gap="3">
        {item.snippets.map((snippet) => (
          <SnippetBlock key={`${item.id}-${snippet.path}`} snippet={snippet} />
        ))}
      </Box>

      <Flex align="center" gap="3" wrap="wrap">
        <Button
          asChild
          bg="#22d3ee"
          color="var(--color-text-on-accent)"
          minH="44px"
          size="sm"
          _groupHover={{ bg: '#67e8f9' }}
          _hover={{ bg: '#67e8f9' }}
        >
          {item.isExternalResult ? (
            <a href={item.resultHref} rel="noreferrer" target="_blank">
              {item.resultActionLabel}
            </a>
          ) : (
            <RouterLink to={item.resultHref}>{item.resultActionLabel}</RouterLink>
          )}
        </Button>

        {item.isExternalResult ? null : (
          <Link color="#67e8f9" href={item.sourceHref} rel="noreferrer" target="_blank">
            {copy.openSourceActionLabel}
          </Link>
        )}
      </Flex>
    </Box>
  );
});
