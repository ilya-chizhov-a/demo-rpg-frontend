import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { ItemTypesViewModel } from '../../model/ItemTypesViewModel';
import { ItemTypeCard } from '../ItemTypeCard/ItemTypeCard';

interface ItemTypeListProps {
  readonly vm: ItemTypesViewModel;
}

export const ItemTypeList = observer(({ vm }: ItemTypeListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.viewState.showRefreshing}
      columns={{ base: 1, lg: 2 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <ItemTypeCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
