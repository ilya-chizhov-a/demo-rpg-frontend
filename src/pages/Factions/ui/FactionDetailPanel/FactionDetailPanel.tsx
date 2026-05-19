import { Box, Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { FactionDetailViewModel } from '../../model/FactionDetailViewModel';
import { FactionDetailField } from '../FactionDetailField/FactionDetailField';

interface FactionDetailPanelProps {
  readonly vm: FactionDetailViewModel;
}

export const FactionDetailPanel = observer(({ vm }: FactionDetailPanelProps) => {
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
        <FactionDetailField label={vm.copy.detail.fieldFactionId} value={vm.id} />
        <FactionDetailField label={vm.copy.detail.fieldAlignment} value={vm.alignmentLabel} />
        <FactionDetailField label={vm.copy.detail.fieldCrestFile} value={vm.crestFileName} />
        <FactionDetailField
          label={vm.copy.detail.fieldCrestDimensions}
          value={vm.crestDimensionsLabel}
        />
        <FactionDetailField label={vm.copy.detail.fieldCrestMimeType} value={vm.crestMimeType} />
        <FactionDetailField label={vm.copy.detail.fieldPublished} value={vm.publishedLabel} />
        <FactionDetailField label={vm.copy.detail.fieldVersion} value={vm.versionLabel} />
      </Box>
    </Box>
  );
});
