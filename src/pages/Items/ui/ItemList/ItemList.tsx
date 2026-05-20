import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { ItemsViewModel } from '../../model/ItemsViewModel';
import { ItemCard } from '../ItemCard/ItemCard';

interface ItemListProps {
  readonly vm: ItemsViewModel;
}

export const ItemList = observer(function ItemList({ vm }: ItemListProps) {
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
        <ItemCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
