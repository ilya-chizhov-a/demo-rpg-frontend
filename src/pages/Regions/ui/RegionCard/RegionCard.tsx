import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { CatalogActionButton, CatalogFactRow } from 'src/shared/ui';

import type { RegionItemViewModel } from '../../model/RegionItemViewModel';
import type { RegionsPageCopy } from '../../model/regionUiCopy';
import { RegionCoverVisual } from '../RegionCoverVisual/RegionCoverVisual';

interface RegionCardProps {
  readonly copy: RegionsPageCopy;
  readonly item: RegionItemViewModel;
}

export const RegionCard = observer(({ copy, item }: RegionCardProps) => {
  return (
    <Box
      as="li"
      alignContent="space-between"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="3"
      gridTemplateRows="auto auto auto 1fr"
      minH="440px"
      minW="0"
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
      <RegionCoverVisual
        climate={item.climateLabel}
        image={item.coverImage}
        isImageLoaded={item.isCoverImageLoaded}
        isImageUnavailable={item.isCoverImageUnavailable}
        onImageError={(image) => item.handleCoverImageError(image)}
        onImageLoad={() => item.handleCoverImageLoad()}
        placeholderDescription={item.coverPlaceholderDescription}
        placeholderTitle={item.coverPlaceholderTitle}
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
            colorPalette="green"
            maxW="60%"
            overflow="hidden"
            textOverflow="ellipsis"
            variant="subtle"
            whiteSpace="nowrap"
          >
            {item.climateLabel}
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
        <CatalogFactRow label={copy.detail.fieldClimate} value={item.climateLabel} />
        <CatalogFactRow label={copy.publishedLabel} value={item.publishedLabel} />
        <CatalogFactRow label={copy.versionLabel} value={item.versionLabel} />
      </Box>

      <Box alignSelf="end" px="5" pb="5">
        <CatalogActionButton to={item.detailHref}>{copy.cardOpenAction}</CatalogActionButton>
      </Box>
    </Box>
  );
});
