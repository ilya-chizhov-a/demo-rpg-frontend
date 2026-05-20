import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { DetailFactPanel, type DetailFactPanelItem } from 'src/shared/ui';
import type { PartyDetailViewModel } from '../../model/PartyDetailViewModel';

interface PartyDetailPanelProps {
  readonly vm: PartyDetailViewModel;
}

export const PartyDetailPanel = observer(({ vm }: PartyDetailPanelProps) => {
  const factItems: readonly DetailFactPanelItem[] = [
    { label: vm.copy.detail.fieldFormation, value: vm.formationLabel },
    { label: vm.copy.detail.fieldLocale, value: vm.localeLabel },
    { label: vm.copy.detail.fieldPublished, value: vm.publishedLabel },
    { label: vm.copy.detail.fieldVersion, value: vm.versionLabel },
  ];
  const formulaItems: readonly DetailFactPanelItem[] = [
    { label: vm.copy.detail.fieldMemberCount, value: vm.memberCountLabel },
    { label: vm.copy.detail.fieldStatus, value: vm.fullStateLabel },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
      <DetailFactPanel items={factItems} title={vm.copy.detail.factsTitle} />
      <DetailFactPanel items={formulaItems} title={vm.copy.detail.formulasTitle} />
    </SimpleGrid>
  );
});
