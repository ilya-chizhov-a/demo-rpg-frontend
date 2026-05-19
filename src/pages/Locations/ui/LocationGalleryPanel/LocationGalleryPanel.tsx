import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type {
  LocationDetailViewModel,
  LocationGalleryImageDescriptor,
} from '../../model/LocationDetailViewModel';
import { LocationGalleryImage } from '../LocationGalleryImage/LocationGalleryImage';

interface LocationGalleryPanelProps {
  readonly vm: LocationDetailViewModel;
}

export const LocationGalleryPanel = observer(({ vm }: LocationGalleryPanelProps) => {
  const items = vm.galleryItems;
  const galleryTitle = vm.copy.detail.galleryTitle;
  const emptyState = {
    description: vm.copy.detail.galleryEmptyDescription,
    title: vm.copy.detail.galleryEmptyTitle,
  };
  const metaLabels = {
    dimensions: vm.copy.detail.dimensionsLabel,
    fileName: vm.copy.detail.fileNameLabel,
    hash: vm.copy.detail.hashLabel,
    mimeType: vm.copy.detail.mimeTypeLabel,
  };

  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Heading as="h2" fontSize="xl">
        {galleryTitle}
      </Heading>
      {items.length === 0 ? (
        <GalleryEmptyState state={emptyState} />
      ) : (
        <GalleryGrid items={items} metaLabels={metaLabels} placeholderLabel={galleryTitle} />
      )}
    </Box>
  );
});

interface GalleryMetaLabels {
  readonly dimensions: string;
  readonly fileName: string;
  readonly hash: string;
  readonly mimeType: string;
}

interface GalleryGridProps {
  readonly items: readonly LocationGalleryImageDescriptor[];
  readonly metaLabels: GalleryMetaLabels;
  readonly placeholderLabel: string;
}

function GalleryGrid({ items, metaLabels, placeholderLabel }: GalleryGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="4" mt="5">
      {items.map((item) => (
        <Box
          bg="rgba(7, 16, 24, 0.76)"
          borderColor="rgba(103, 232, 249, 0.18)"
          borderRadius="md"
          borderWidth="1px"
          key={`${item.fileName}-${item.image.src}`}
          overflow="hidden"
        >
          <LocationGalleryImage image={item.image} placeholderLabel={placeholderLabel} />
          <Box px="4" py="3">
            <Text color="#f4f7f8" fontSize="sm" fontWeight="bold" lineHeight="1.2" mb="1">
              {item.title}
            </Text>
          </Box>
          <Box as="dl" px="4" pb="3">
            <GalleryMeta label={metaLabels.fileName} value={item.fileName} />
            <GalleryMeta label={metaLabels.dimensions} value={item.dimensionsLabel} />
            <GalleryMeta label={metaLabels.mimeType} value={item.mimeType} />
            <GalleryMeta label={metaLabels.hash} value={item.hashLabel} />
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
}

interface GalleryMetaProps {
  readonly label: string;
  readonly value: string;
}

function GalleryMeta({ label, value }: GalleryMetaProps) {
  return (
    <Flex
      align="center"
      as="div"
      borderBottomColor="rgba(148, 163, 184, 0.16)"
      borderBottomWidth="1px"
      gap="3"
      justify="space-between"
      py="2"
    >
      <Text as="dt" color="#9aa7b1" flexShrink="0" fontSize="xs" lineHeight="1.2">
        {label}
      </Text>
      <Text
        as="dd"
        fontSize="xs"
        fontWeight="bold"
        lineHeight="1.2"
        minW="0"
        overflow="hidden"
        textAlign="right"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {value}
      </Text>
    </Flex>
  );
}

interface GalleryEmptyStateCopy {
  readonly description: string;
  readonly title: string;
}

interface GalleryEmptyStateProps {
  readonly state: GalleryEmptyStateCopy;
}

function GalleryEmptyState({ state }: GalleryEmptyStateProps) {
  return (
    <Flex
      align="center"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      color="#9aa7b1"
      direction="column"
      justify="center"
      minH="180px"
      mt="5"
      px="6"
      textAlign="center"
    >
      <Text color="#f4f7f8" fontSize="lg" fontWeight="bold">
        {state.title}
      </Text>
      <Text fontSize="sm" lineHeight="1.5" mt="2" maxW="360px">
        {state.description}
      </Text>
    </Flex>
  );
}
