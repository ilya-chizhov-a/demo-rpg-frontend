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
        Region facts
      </Heading>
      <SimpleGrid as="dl" columns={{ base: 1, sm: 2 }} gap="5" mt="5">
        <RegionDetailField label="Region id" value={vm.id} />
        <RegionDetailField label="Climate" value={vm.climate} />
        <RegionDetailField label="Published" value={vm.publishedLabel} />
        <RegionDetailField label="Version" value={vm.versionLabel} />
      </SimpleGrid>
    </Box>
  );
});
