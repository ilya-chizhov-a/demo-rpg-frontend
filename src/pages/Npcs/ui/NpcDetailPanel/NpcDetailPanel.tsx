import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { DetailFactPanel, type DetailFactPanelItem } from 'src/shared/ui';
import type { NpcDetailViewModel } from '../../model/NpcDetailViewModel';

interface NpcDetailPanelProps {
  readonly vm: NpcDetailViewModel;
}

export const NpcDetailPanel = observer(({ vm }: NpcDetailPanelProps) => {
  const factItems: readonly DetailFactPanelItem[] = [
    { label: vm.copy.detail.fieldRole, value: vm.roleLabel },
    { label: vm.copy.detail.fieldLocation, value: vm.locationTitle },
    { label: vm.copy.detail.locationKindLabel, value: vm.locationKind },
    { label: vm.copy.detail.fieldLocale, value: vm.localeLabel },
    { label: vm.copy.detail.fieldPublished, value: vm.publishedLabel },
    { label: vm.copy.detail.fieldVersion, value: vm.versionLabel },
  ];
  const portraitItems: readonly DetailFactPanelItem[] = [
    { label: vm.copy.detail.fieldPortraitFile, value: vm.portraitFileName },
    { label: vm.copy.detail.fieldPortraitDimensions, value: vm.portraitDimensionsLabel },
    { label: vm.copy.detail.fieldPortraitMimeType, value: vm.portraitMimeType },
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
      <DetailFactPanel items={factItems} title={vm.copy.detail.factsTitle} />
      <DetailFactPanel items={portraitItems} title={vm.copy.detail.portraitMetadataTitle} />
    </SimpleGrid>
  );
});
