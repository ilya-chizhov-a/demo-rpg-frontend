import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { HeroesViewModel } from '../../model/HeroesViewModel';
import { HeroCard } from '../HeroCard/HeroCard';

interface HeroListProps {
  readonly vm: HeroesViewModel;
}

export const HeroList = observer(({ vm }: HeroListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.catalogState.showRefreshing}
      columns={{ base: 1, md: 2, xl: 3 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <HeroCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
