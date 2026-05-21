import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import type { SyntheticEvent } from 'react';

import { CatalogFilterFieldLabel } from 'src/shared/ui';

import type { SearchViewModel } from '../../model/SearchViewModel';

const SEARCH_INPUT_ID = 'global-search-input';

interface SearchToolbarProps {
  readonly onClear: () => void;
  readonly onSubmit: (query: string) => void;
  readonly vm: SearchViewModel;
}

export const SearchToolbar = observer(({ onClear, onSubmit, vm }: SearchToolbarProps) => {
  const handleSubmit = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    onSubmit(vm.queryInput);
  };

  return (
    <Box
      as="form"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.18)"
      borderRadius="md"
      borderWidth="1px"
      mb="6"
      onSubmit={handleSubmit}
      p={{ base: '4', md: '5' }}
      shadow="0 18px 42px rgba(0, 0, 0, 0.2)"
    >
      <CatalogFilterFieldLabel id={SEARCH_INPUT_ID} label={vm.copy.searchLabel} />
      <Flex direction={{ base: 'column', md: 'row' }} gap="3">
        <Input
          bg="rgba(15, 21, 29, 0.82)"
          borderColor="rgba(103, 232, 249, 0.24)"
          id={SEARCH_INPUT_ID}
          minH="48px"
          onChange={(event) => vm.setQueryInput(event.target.value)}
          placeholder={vm.copy.searchPlaceholder}
          value={vm.queryInput}
        />
        <Flex gap="3">
          <Button
            bg="#22d3ee"
            color="var(--color-text-on-accent)"
            disabled={vm.queryInput.trim().length === 0}
            minH="48px"
            minW={{ base: '0', md: '132px' }}
            type="submit"
            _hover={{ bg: '#67e8f9' }}
          >
            {vm.showRefreshing ? vm.copy.loadingAriaLabel : vm.copy.searchSubmitLabel}
          </Button>
          <Button
            borderColor="rgba(203, 213, 225, 0.28)"
            borderWidth="1px"
            color="#d8e0e8"
            disabled={!vm.hasSubmittedQuery && vm.queryInput.length === 0}
            minH="48px"
            onClick={onClear}
            type="button"
            variant="outline"
            _hover={{ bg: 'rgba(103, 232, 249, 0.08)', borderColor: '#67e8f9' }}
          >
            {vm.copy.clearActionLabel}
          </Button>
        </Flex>
      </Flex>
      {vm.showResults ? (
        <Text color="#9aa7b1" mt="4">
          {vm.resultSummaryLabel}
        </Text>
      ) : null}
    </Box>
  );
});
