import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { MonstersViewModel } from '../../model/MonstersViewModel';
import { MonsterCard } from '../MonsterCard/MonsterCard';

interface MonsterListProps {
  readonly vm: MonstersViewModel;
}

export const MonsterList = observer(({ vm }: MonsterListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.catalogState.showRefreshing}
      columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <MonsterCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
