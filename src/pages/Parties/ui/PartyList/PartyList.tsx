import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { PartiesViewModel } from '../../model/PartiesViewModel';
import { PartyCard } from '../PartyCard/PartyCard';

interface PartyListProps {
  readonly vm: PartiesViewModel;
}

export const PartyList = observer(({ vm }: PartyListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.catalogState.showRefreshing}
      columns={{ base: 1, lg: 2, xl: 3 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <PartyCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
