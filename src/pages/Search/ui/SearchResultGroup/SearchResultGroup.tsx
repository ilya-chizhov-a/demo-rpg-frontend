import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { SearchResultGroupViewModel } from '../../model/SearchResultGroupViewModel';
import type { SearchPageCopy } from '../../model/searchUiCopy';
import { SearchResultCard } from '../SearchResultCard/SearchResultCard';

interface SearchResultGroupProps {
  readonly copy: SearchPageCopy;
  readonly group: SearchResultGroupViewModel;
}

export const SearchResultGroup = observer(({ copy, group }: SearchResultGroupProps) => {
  return (
    <Box
      as="section"
      aria-labelledby={`search-group-${group.id}`}
      borderTopColor="rgba(103, 232, 249, 0.18)"
      borderTopWidth="1px"
      pt="6"
    >
      <Flex align="flex-start" gap="4" justify="space-between" mb="4" wrap="wrap">
        <Box minW="0">
          <Flex align="center" gap="2" mb="2" wrap="wrap">
            <Badge colorPalette={group.domainBadgePalette}>{group.domainLabel}</Badge>
            <Badge borderColor="rgba(203, 213, 225, 0.4)" color="#d8e0e8" variant="outline">
              {group.sourceCode}
            </Badge>
          </Flex>
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} id={`search-group-${group.id}`}>
            {group.title}
          </Heading>
        </Box>
        <Text color="#9aa7b1" fontWeight="bold">
          {group.countLabel}
        </Text>
      </Flex>

      <SimpleGrid as="ul" columns={{ base: 1, xl: 2 }} gap="4" listStyleType="none" m="0" p="0">
        {group.items.map((item) => (
          <SearchResultCard copy={copy} item={item} key={item.id} />
        ))}
      </SimpleGrid>

      {group.overflowLabel ? (
        <Text color="#9aa7b1" fontSize="sm" mt="3">
          {group.overflowLabel}
        </Text>
      ) : null}
    </Box>
  );
});
