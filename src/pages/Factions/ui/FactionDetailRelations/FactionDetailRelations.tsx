import { Grid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { FactionDetailViewModel } from '../../model/FactionDetailViewModel';
import { FactionRelatedSection } from '../FactionRelatedSection/FactionRelatedSection';

interface FactionDetailRelationsProps {
  readonly vm: FactionDetailViewModel;
}

export const FactionDetailRelations = observer(({ vm }: FactionDetailRelationsProps) => {
  return (
    <Grid gap="4" templateColumns={{ base: 'minmax(0, 1fr)', xl: 'repeat(2, minmax(0, 1fr))' }}>
      <FactionRelatedSection
        isLoadingMore={vm.isLoadingMoreMonsters}
        emptyDescription={vm.copy.detail.noRelatedMonstersDescription}
        emptyTitle={vm.copy.detail.noRelatedMonstersTitle}
        items={vm.monsterItems}
        loadMoreLabel={vm.copy.showMoreActionLabel}
        loadingMoreLabel={vm.copy.loadingMoreLabel}
        onLoadMore={() => void vm.loadMoreMonsters()}
        showLoadMore={vm.canLoadMoreMonsters}
        title={vm.copy.detail.relatedMonstersTitle}
        totalCount={vm.monstersTotalCount}
      />
      <FactionRelatedSection
        isLoadingMore={vm.isLoadingMoreNpcs}
        emptyDescription={vm.copy.detail.noRelatedNpcsDescription}
        emptyTitle={vm.copy.detail.noRelatedNpcsTitle}
        items={vm.npcItems}
        loadMoreLabel={vm.copy.showMoreActionLabel}
        loadingMoreLabel={vm.copy.loadingMoreLabel}
        onLoadMore={() => void vm.loadMoreNpcs()}
        showLoadMore={vm.canLoadMoreNpcs}
        title={vm.copy.detail.relatedNpcsTitle}
        totalCount={vm.npcsTotalCount}
      />
    </Grid>
  );
});
