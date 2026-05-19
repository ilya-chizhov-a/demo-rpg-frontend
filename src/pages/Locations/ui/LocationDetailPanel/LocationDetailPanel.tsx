import { Box, Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { LocationDetailViewModel } from '../../model/LocationDetailViewModel';
import { LocationDetailField } from '../LocationDetailField/LocationDetailField';

interface LocationDetailPanelProps {
  readonly vm: LocationDetailViewModel;
}

export const LocationDetailPanel = observer(({ vm }: LocationDetailPanelProps) => {
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
        <LocationDetailField label={vm.copy.detail.fieldCoordinates} value={vm.coordinatesLabel} />
        <LocationDetailField label={vm.copy.detail.fieldKind} value={vm.kindLabel} />
        <LocationDetailField label={vm.copy.detail.fieldRegion} value={vm.regionTitle} />
        <LocationDetailField label={vm.copy.detail.fieldGalleryCount} value={vm.galleryCountLabel} />
        <LocationDetailField label={vm.copy.detail.fieldMapFile} value={vm.mapFileName} />
        <LocationDetailField label={vm.copy.detail.fieldMapDimensions} value={vm.mapDimensionsLabel} />
        <LocationDetailField label={vm.copy.detail.fieldMapMimeType} value={vm.mapMimeType} />
        <LocationDetailField label={vm.copy.detail.fieldPublished} value={vm.publishedLabel} />
        <LocationDetailField label={vm.copy.detail.fieldVersion} value={vm.versionLabel} />
      </Box>
    </Box>
  );
});
