import { Badge, Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
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
      alignContent="start"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="3"
      gridTemplateRows="auto auto auto auto 1fr"
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
        kindLabel={item.kindLabel}
        placeholderDescription={copy.mapPlaceholderDescription(item.title)}
        placeholderTitle={copy.mapPlaceholderTitle}
      />

      <Box px="5">
        <Flex
          align="center"
          color="#9aa7b1"
          fontSize="sm"
          gap="3"
          justify="space-between"
          minH="8"
        >
          <Badge
            colorPalette="teal"
            maxW="60%"
            overflow="hidden"
            textOverflow="ellipsis"
            variant="subtle"
            whiteSpace="nowrap"
          >
            {item.kindLabel}
          </Badge>
          <Text flexShrink="0" whiteSpace="nowrap">
            {item.localeLabel}
          </Text>
        </Flex>
        <Heading
          alignItems="flex-start"
          as="h2"
          display="flex"
          fontSize="xl"
          h="2.4em"
          lineHeight="1.2"
          mt="4"
          overflow="hidden"
        >
          <Text
            as="span"
            minW="0"
            overflow="hidden"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              display: '-webkit-box',
            }}
          >
            {item.title}
          </Text>
        </Heading>
        <Button
          asChild
          color="#67e8f9"
          minH={{ base: '44px', md: '36px' }}
          px="0"
          size="sm"
          variant="plain"
          _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
        >
          <RouterLink to={item.regionHref}>
            {copy.regionLabel}: {item.regionTitle}
          </RouterLink>
        </Button>
        <Text
          color="#9aa7b1"
          h="4.2em"
          lineHeight="1.4"
          mt="1"
          overflow="hidden"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            display: '-webkit-box',
          }}
        >
          {item.description}
        </Text>
      </Box>

      <Box
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        mx="5"
      >
        <LocationFact label={copy.coordinateLabel} value={item.coordinatesLabel} />
        <LocationFact label={copy.galleryLabel} value={copy.galleryCountLabel(item.galleryCount)} />
        <LocationFact label={copy.publishedLabel} value={item.publishedLabel} />
        <LocationFact label={copy.versionLabel} value={item.versionLabel} />
      </Box>

      <Box px="5">
        <GalleryPreview
          emptyLabel={copy.galleryEmptyPreviewLabel}
          images={item.galleryPreviewImages}
        />
      </Box>

      <Box alignSelf="end" px="5" pb="5">
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
    <Flex
      align="center"
      as="div"
      borderBottomColor="rgba(103, 232, 249, 0.14)"
      borderBottomWidth="1px"
      gap="3"
      justify="space-between"
      py="3"
    >
      <Text as="dt" color="#9aa7b1" flexShrink="0" fontSize="xs" lineHeight="1.2">
        {label}
      </Text>
      <Text
        as="dd"
        fontSize="sm"
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

interface GalleryPreviewProps {
  readonly emptyLabel: string;
  readonly images: readonly PreparedImageSlot[];
}

function GalleryPreview({ emptyLabel, images }: GalleryPreviewProps) {
  if (images.length === 0) {
    return (
      <Flex
        align="center"
        borderColor="rgba(103, 232, 249, 0.16)"
        borderRadius="sm"
        borderWidth="1px"
        color="#9aa7b1"
        h="48px"
        justify="center"
        px="3"
      >
        <Text fontSize="xs" lineHeight="1.2" textAlign="center">
          {emptyLabel}
        </Text>
      </Flex>
    );
  }

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
            loading={image.loading}
            objectFit="cover"
            src={image.src}
            srcSet={image.srcSet}
            w="full"
          />
        </Box>
      ))}
    </Flex>
  );
}
