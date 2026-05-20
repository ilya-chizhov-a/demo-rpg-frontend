import { SimpleGrid } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { DetailFactPanel, type DetailFactPanelItem } from 'src/shared/ui';
import type { MonsterDetailViewModel } from '../../model/MonsterDetailViewModel';

interface MonsterDetailPanelProps {
  readonly vm: MonsterDetailViewModel;
}

export const MonsterDetailPanel = observer(({ vm }: MonsterDetailPanelProps) => {
  const factItems: readonly DetailFactPanelItem[] = [
    { label: vm.copy.detail.fieldKind, value: vm.kindLabel },
    { label: vm.copy.detail.fieldFaction, value: vm.factionTitle },
    { label: vm.copy.detail.fieldLevel, value: vm.levelLabel },
    { label: vm.copy.detail.fieldHp, value: vm.hpLabel },
    { label: vm.copy.detail.fieldBaseDamage, value: vm.baseDamageLabel },
    { label: vm.copy.detail.fieldLocale, value: vm.localeLabel },
    { label: vm.copy.detail.fieldPublished, value: vm.publishedLabel },
    { label: vm.copy.detail.fieldVersion, value: vm.versionLabel },
  ];
  const formulaItems: readonly DetailFactPanelItem[] = [
    {
      label: `${vm.copy.avgDropChanceLabel} · ${vm.copy.detail.computedBadge}`,
      value: vm.avgDropChanceLabel,
    },
    {
      label: `${vm.copy.dropCountLabel} · ${vm.copy.detail.computedBadge}`,
      value: vm.dropCountLabel,
    },
  ];
  const imageItems: readonly DetailFactPanelItem[] = [
    { label: vm.copy.detail.fieldFileName, value: vm.imageFileName },
    { label: vm.copy.detail.fieldFileDimensions, value: vm.imageDimensionsLabel },
    { label: vm.copy.detail.fieldFileMimeType, value: vm.imageMimeType },
    { label: vm.copy.detail.fieldFileSize, value: vm.imageSizeLabel },
    { label: vm.copy.detail.fieldFileStatus, value: vm.imageStatus },
    { label: vm.copy.detail.fieldFileHash, value: vm.imageHashLabel },
  ];

  return (
    <SimpleGrid columns={{ base: 1, lg: 3 }} gap="4">
      <DetailFactPanel items={factItems} title={vm.copy.detail.factsTitle} />
      <DetailFactPanel items={formulaItems} title={vm.copy.detail.formulasTitle} />
      <DetailFactPanel items={imageItems} title={vm.copy.detail.fileMetadataTitle} />
    </SimpleGrid>
  );
});
