import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { SearchViewModel } from '../../model/SearchViewModel';
import { SearchResultGroup } from '../SearchResultGroup/SearchResultGroup';

interface SearchResultsProps {
  readonly vm: SearchViewModel;
}

export const SearchResults = observer(({ vm }: SearchResultsProps) => {
  return (
    <Box
      aria-label={vm.copy.resultGroupsAriaLabel}
      display="grid"
      gap="8"
    >
      {vm.groups.map((group) => (
        <SearchResultGroup copy={vm.copy} group={group} key={group.id} />
      ))}
    </Box>
  );
});
