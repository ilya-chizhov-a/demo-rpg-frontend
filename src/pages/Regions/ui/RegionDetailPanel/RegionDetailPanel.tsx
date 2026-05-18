import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
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
      p="6"
    >
      <Heading as="h2" fontSize="xl">
        {vm.copy.detail.factsTitle}
      </Heading>
      <SimpleGrid as="dl" columns={{ base: 1, sm: 2 }} gap="5" mt="5">
        <RegionDetailField label={vm.copy.detail.fieldRegionId} value={vm.id} />
        <RegionDetailField label={vm.copy.detail.fieldClimate} value={vm.climate} />
        <RegionDetailField label={vm.copy.detail.fieldPublished} value={vm.publishedLabel} />
        <RegionDetailField label={vm.copy.detail.fieldVersion} value={vm.versionLabel} />
      </SimpleGrid>
    </Box>
  );
});
