import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { BlogViewModel } from '../../model/BlogViewModel';
import { BlogCard } from '../BlogCard/BlogCard';

interface BlogListProps {
  readonly vm: BlogViewModel;
}

export const BlogList = observer(function BlogList({ vm }: BlogListProps) {
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
      {vm.items.map((item, index) => (
        <BlogCard
          copy={vm.copy}
          item={item}
          key={item.id}
          variant={index === 0 ? 'featured' : 'regular'}
        />
      ))}
    </SimpleGrid>
  );
});
