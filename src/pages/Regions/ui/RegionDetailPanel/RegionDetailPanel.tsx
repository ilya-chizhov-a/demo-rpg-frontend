import { Box, Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { RegionDetailViewModel } from '../../model/RegionDetailViewModel';
import { RegionDetailField } from '../RegionDetailField/RegionDetailField';

interface RegionDetailPanelProps {
  readonly vm: RegionDetailViewModel;
}

export const RegionDetailPanel = observer(({ vm }: RegionDetailPanelProps) => {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      px="6"
      pt="6"
      pb="3"
    >
      <Heading as="h2" fontSize="xl">
        {vm.copy.detail.factsTitle}
      </Heading>
      <Box as="dl" mt="4">
        <RegionDetailField label={vm.copy.detail.fieldRegionId} value={vm.id} />
        <RegionDetailField label={vm.copy.detail.fieldClimate} value={vm.climateLabel} />
        <RegionDetailField label={vm.copy.detail.fieldCoverFile} value={vm.coverFileName} />
        <RegionDetailField
          label={vm.copy.detail.fieldCoverDimensions}
          value={vm.coverDimensionsLabel}
        />
        <RegionDetailField label={vm.copy.detail.fieldCoverMimeType} value={vm.coverMimeType} />
        <RegionDetailField label={vm.copy.detail.fieldPublished} value={vm.publishedLabel} />
        <RegionDetailField label={vm.copy.detail.fieldVersion} value={vm.versionLabel} />
      </Box>
    </Box>
  );
});
