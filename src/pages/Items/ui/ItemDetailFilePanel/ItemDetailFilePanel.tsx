import { Box, Heading, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { DetailFactField } from 'src/shared/ui';
import type { ItemDetailViewModel } from '../../model/ItemDetailViewModel';
import { ItemDetailIconVisual } from '../ItemDetailIconVisual/ItemDetailIconVisual';

interface ItemDetailFilePanelProps {
  readonly vm: ItemDetailViewModel;
}

export const ItemDetailFilePanel = observer(({ vm }: ItemDetailFilePanelProps) => {
  const metadataItems = [
    { label: vm.copy.detail.fieldFileName, value: vm.iconFileName },
    { label: vm.copy.detail.fieldFileMimeType, value: vm.iconMimeType },
    { label: vm.copy.detail.fieldFileDimensions, value: vm.iconDimensionsLabel },
    { label: vm.copy.detail.fieldFileSize, value: vm.iconSizeLabel },
    { label: vm.copy.detail.fieldFileStatus, value: vm.iconStatus },
    { label: vm.copy.detail.fieldFileHash, value: vm.iconHashLabel },
  ] as const;

  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      minW="0"
      overflow="hidden"
    >
      <Box p="6" pb="4">
        <Heading as="h2" fontSize="xl">
          {vm.copy.detail.filePreviewTitle}
        </Heading>
      </Box>
      <ItemDetailIconVisual
        image={vm.iconImage}
        placeholderDescription={vm.iconPlaceholderDescription}
        placeholderTitle={vm.iconPlaceholderTitle}
      />
      <Stack gap="0" px="6" py="4">
        <Heading as="h3" fontSize="md" mb="2">
          {vm.copy.detail.fileMetadataTitle}
        </Heading>
        <Box as="dl">
          {metadataItems.map((item) => (
            <DetailFactField key={item.label} label={item.label} value={item.value} />
          ))}
        </Box>
      </Stack>
    </Box>
  );
});
