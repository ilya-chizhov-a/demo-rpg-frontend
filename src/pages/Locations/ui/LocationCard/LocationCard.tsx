import { Badge, Box, Button, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { PreparedImageSlot } from 'src/shared/lib';
import type { LocationItemViewModel } from '../../model/LocationItemViewModel';
import type { LocationsPageCopy } from '../../model/locationUiCopy';
import { LocationMapVisual } from '../LocationMapVisual/LocationMapVisual';

interface LocationCardProps {
  readonly copy: LocationsPageCopy;
  readonly item: LocationItemViewModel;
}

export const LocationCard = observer(({ copy, item }: LocationCardProps) => {
  return (
    <Box
      as="li"
      alignContent="space-between"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="5"
      minH="440px"
      outline="none"
      overflow="hidden"
      position="relative"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.24)"
      transition="box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease"
      _focusWithin={{
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.16), 0 22px 44px rgba(0, 0, 0, 0.32)',
      }}
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.58)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.32)',
      }}
    >
      <LocationMapVisual
        image={item.mapImage}
        kind={item.kind}
        placeholderDescription={copy.mapPlaceholderDescription(item.title)}
        placeholderTitle={copy.mapPlaceholderTitle}
      />

      <Box px="5">
        <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
          <Badge colorPalette="teal" variant="subtle">
            {item.kind}
          </Badge>
          <Text>{item.localeLabel}</Text>
        </Flex>
        <Heading as="h2" fontSize="xl" lineHeight="1.2" mt="4">
          {item.title}
        </Heading>
        <Button
          asChild
          color="#67e8f9"
          minH="44px"
          px="0"
          size="sm"
          variant="plain"
          _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
        >
          <RouterLink to={item.regionHref}>
            {copy.regionLabel}: {item.regionTitle}
          </RouterLink>
        </Button>
        <Text color="#9aa7b1" lineHeight="1.55" mt="2">
          {item.description}
        </Text>
      </Box>

      <SimpleGrid
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 2 }}
        gap="3"
        mx="5"
        pt="4"
      >
        <LocationFact label={copy.coordinateLabel} value={item.coordinatesLabel} />
        <LocationFact label={copy.galleryLabel} value={copy.galleryCountLabel(item.galleryCount)} />
        <LocationFact label={copy.publishedLabel} value={item.publishedLabel} />
        <LocationFact label={copy.versionLabel} value={item.versionLabel} />
      </SimpleGrid>

      <Box px="5">
        <GalleryPreview images={item.galleryPreviewImages} />
      </Box>

      <Box px="5" pb="5">
        <Button
          asChild
          borderColor="rgba(103, 232, 249, 0.34)"
          color="#67e8f9"
          size="sm"
          transition="background-color 160ms ease, color 160ms ease"
          variant="outline"
          _groupHover={{
            bg: '#22d3ee',
            color: 'var(--color-text-on-accent)',
          }}
        >
          <RouterLink to={item.detailHref}>{copy.cardOpenAction}</RouterLink>
        </Button>
      </Box>
    </Box>
  );
});

interface LocationFactProps {
  readonly label: string;
  readonly value: string;
}

function LocationFact({ label, value }: LocationFactProps) {
  return (
    <Box>
      <Text as="dt" color="#9aa7b1" fontSize="xs">
        {label}
      </Text>
      <Text as="dd" fontWeight="bold" mt="1">
        {value}
      </Text>
    </Box>
  );
}

interface GalleryPreviewProps {
  readonly images: readonly PreparedImageSlot[];
}

function GalleryPreview({ images }: GalleryPreviewProps) {
  return (
    <Flex gap="2" minH="48px">
      {images.map((image) => (
        <Box
          bg="#071018"
          borderColor="rgba(103, 232, 249, 0.2)"
          borderRadius="sm"
          borderWidth="1px"
          h="48px"
          key={image.src}
          overflow="hidden"
          w="48px"
        >
          <Image
            alt={image.alt}
            draggable={false}
            h="full"
            height={image.height}
            loading={image.loading}
            objectFit="cover"
            src={image.src}
            srcSet={image.srcSet}
            w="full"
            width={image.width}
          />
        </Box>
      ))}
    </Flex>
  );
}
