import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { StatsViewModel } from '../../model/StatsViewModel';
import { StatCard } from '../StatCard/StatCard';

interface StatListProps {
  readonly vm: StatsViewModel;
}

export const StatList = observer(({ vm }: StatListProps) => {
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
        <StatCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
