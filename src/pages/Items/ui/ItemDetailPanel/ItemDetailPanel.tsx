import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { DetailFactPanel, type DetailFactPanelItem } from 'src/shared/ui';
import type { ItemDetailViewModel } from '../../model/ItemDetailViewModel';

interface ItemDetailPanelProps {
  readonly vm: ItemDetailViewModel;
}

export const ItemDetailPanel = observer(({ vm }: ItemDetailPanelProps) => {
  const factItems: readonly DetailFactPanelItem[] = [
    { label: vm.copy.detail.fieldType, value: vm.typeTitle },
    { label: vm.copy.detail.fieldTypeCode, value: vm.typeCode },
    { label: vm.copy.detail.fieldRarity, value: vm.rarityLabel },
    { label: vm.copy.detail.fieldBaseValue, value: vm.baseValueLabel },
    { label: vm.copy.detail.fieldWeight, value: vm.weightLabel },
    { label: vm.copy.detail.fieldLocale, value: vm.localeLabel },
    { label: vm.copy.detail.fieldPublished, value: vm.publishedLabel },
    { label: vm.copy.detail.fieldVersion, value: vm.versionLabel },
  ];
  const formulaItems: readonly DetailFactPanelItem[] = [
    {
      label: `${vm.copy.detail.fieldMarketValue} · ${vm.copy.detail.computedBadge}`,
      value: vm.marketValueLabel,
    },
    {
      label: `${vm.copy.detail.fieldRarityMultiplier} · ${vm.copy.detail.computedBadge}`,
      value: vm.rarityMultiplierLabel,
    },
    {
      label: `${vm.copy.detail.fieldRarityTag} · ${vm.copy.detail.computedBadge}`,
      value: vm.rarityTag,
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
      <DetailFactPanel items={factItems} title={vm.copy.detail.factsTitle} />
      <DetailFactPanel items={formulaItems} title={vm.copy.detail.formulasTitle} />
    </SimpleGrid>
  );
});
