import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { FactionsViewModel } from '../../model/FactionsViewModel';
import { FactionCard } from '../FactionCard/FactionCard';

interface FactionListProps {
  readonly vm: FactionsViewModel;
}

export const FactionList = observer(({ vm }: FactionListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.catalogState.showRefreshing}
      columns={{ base: 1, md: 2, xl: 4 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <FactionCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
