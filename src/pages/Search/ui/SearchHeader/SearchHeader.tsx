import { CatalogHeader } from 'src/shared/ui';

import type { SearchViewModel } from '../../model/SearchViewModel';

interface SearchHeaderProps {
  readonly vm: SearchViewModel;
}

export function SearchHeader({ vm }: SearchHeaderProps) {
  return (
    <CatalogHeader
      ariaLabel={vm.copy.resultGroupsAriaLabel}
      badges={vm.copy.headerBadges}
      description={vm.copy.headerDescription}
      descriptionMaxWidth="760px"
      eyebrow={vm.copy.headerEyebrow}
      title={vm.copy.headerTitle}
      titleId="search-page-title"
      titleSize={{ base: '4xl', md: '6xl' }}
    />
  );
}
