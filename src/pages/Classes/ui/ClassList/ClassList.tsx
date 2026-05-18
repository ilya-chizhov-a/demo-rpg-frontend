import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { ClassesViewModel } from '../../model/ClassesViewModel';
import { ClassCard } from '../ClassCard/ClassCard';

interface ClassListProps {
  readonly vm: ClassesViewModel;
}

export const ClassList = observer(({ vm }: ClassListProps) => {
  return (
    <SimpleGrid
      as="ul"
      aria-busy={vm.showRefreshing}
      columns={{ base: 1, lg: 2 }}
      gap="4"
      listStyleType="none"
      m="0"
      p="0"
    >
      {vm.items.map((item) => (
        <ClassCard copy={vm.copy} item={item} key={item.id} />
      ))}
    </SimpleGrid>
  );
});
