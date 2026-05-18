import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { RegionsViewModel } from '../../model/RegionsViewModel';
import { RegionCard } from '../RegionCard/RegionCard';

interface RegionListProps {
  readonly vm: RegionsViewModel;
}

export const RegionList = observer(({ vm }: RegionListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.showRefreshing}
      columns={{ base: 1, md: 2, xl: 5 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <RegionCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
