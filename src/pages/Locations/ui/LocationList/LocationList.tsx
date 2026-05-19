import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { LocationsViewModel } from '../../model/LocationsViewModel';
import { LocationCard } from '../LocationCard/LocationCard';

interface LocationListProps {
  readonly vm: LocationsViewModel;
}

export const LocationList = observer(({ vm }: LocationListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.catalogState.showRefreshing}
      columns={{ base: 1, sm: 2, md: 3, xl: 5 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <LocationCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
