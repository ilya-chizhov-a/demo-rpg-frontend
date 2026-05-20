import { Button, SimpleGrid, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink, useParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { PageShell, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { HeroDetailViewModel } from '../../model/HeroDetailViewModel';
import { HeroDetailHeader } from '../HeroDetailHeader/HeroDetailHeader';
import { HeroDetailPanel } from '../HeroDetailPanel/HeroDetailPanel';
import { HeroDetailRelatedSection } from '../HeroDetailRelatedSection/HeroDetailRelatedSection';
import { HeroDetailSkeleton } from '../HeroDetailSkeleton/HeroDetailSkeleton';

export const HeroDetailPage = observer(() => {
  const params = useParams();
  const vm = useViewModel(HeroDetailViewModel, params.id ?? '');

  return (
    <PageShell>
      <Button
        aria-label={vm.detailCopy.backAriaLabel}
        asChild
        borderColor="rgba(103, 232, 249, 0.34)"
        color="#67e8f9"
        mb="4"
        minH="44px"
        size="md"
        variant="outline"
        w="fit-content"
        _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
      >
        <RouterLink to="/heroes">{vm.detailCopy.backLabel}</RouterLink>
      </Button>

      {renderWhen(vm.showLoading, <HeroDetailSkeleton />)}
      {renderWhen(
        vm.showError,
        <StatePanel
          actionLabel={vm.detailCopy.retryActionLabel}
          description={vm.detailCopy.errorDescription}
          onAction={() => void vm.retry()}
          title={vm.detailCopy.errorTitle}
          tone="error"
        />,
      )}
      {renderWhen(
        vm.showNotFound,
        <StatePanel
          description={vm.detailCopy.notFoundDescription}
          title={vm.detailCopy.notFoundTitle}
        />,
      )}
      {renderWhen(
        vm.showDetail,
        <Stack gap="5">
          <HeroDetailHeader vm={vm} />
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="4">
            <HeroDetailPanel facts={vm.facts} title={vm.detailCopy.factsTitle} />
            <HeroDetailPanel facts={vm.formulaFacts} title={vm.detailCopy.formulasTitle} />
            <HeroDetailPanel facts={vm.classFacts} title={vm.detailCopy.classStatsTitle} />
          </SimpleGrid>
          <HeroDetailRelatedSection
            emptyDescription={vm.detailCopy.abilityEmptyDescription}
            emptyTitle={vm.detailCopy.abilityEmptyTitle}
            items={vm.abilityItems}
            title={vm.detailCopy.abilitiesTitle}
          />
          <HeroDetailRelatedSection
            emptyDescription={vm.detailCopy.inventoryEmptyDescription}
            emptyTitle={vm.detailCopy.inventoryEmptyTitle}
            items={vm.inventoryItems}
            title={vm.detailCopy.inventoryTitle}
          />
          <HeroDetailRelatedSection
            emptyDescription={vm.detailCopy.equipmentEmptyDescription}
            emptyTitle={vm.detailCopy.equipmentEmptyTitle}
            items={vm.equipmentItems}
            title={vm.detailCopy.embeddedEquipmentTitle}
          />
        </Stack>,
      )}

      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="hero-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});
