import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { NpcsViewModel } from '../../model/NpcsViewModel';
import { NpcCard } from '../NpcCard/NpcCard';

interface NpcListProps {
  readonly vm: NpcsViewModel;
}

export const NpcList = observer(({ vm }: NpcListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.catalogState.showRefreshing}
      columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <NpcCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
