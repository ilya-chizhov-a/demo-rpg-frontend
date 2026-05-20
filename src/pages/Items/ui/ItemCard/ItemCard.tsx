import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { CatalogActionButton, CatalogFactRow } from 'src/shared/ui';
import type { ItemItemViewModel } from '../../model/ItemItemViewModel';
import type { ItemsPageCopy } from '../../model/itemUiCopy';
import { ItemIconVisual } from '../ItemIconVisual/ItemIconVisual';

interface ItemCardProps {
  readonly copy: ItemsPageCopy;
  readonly item: ItemItemViewModel;
}

export const ItemCard = observer(function ItemCard({ copy, item }: ItemCardProps) {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      minH="388px"
      p="5"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.2)"
      transition="box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease"
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.5)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.28)',
      }}
    >
      <Flex align="flex-start" gap="4">
        <ItemIconVisual image={item.iconImage} placeholderLabel={copy.iconPlaceholderLabel} />

        <Box flex="1" minW="0">
          <Flex align="center" color="#9aa7b1" fontSize="sm" gap="2" justify="space-between">
            <Flex gap="2" minW="0" wrap="wrap">
              <Badge colorPalette="teal" variant="subtle">
                {item.rarityLabel}
              </Badge>
              <Badge colorPalette="green" variant="subtle">
                {item.rarityTag}
              </Badge>
            </Flex>
            <Text flexShrink="0">{item.localeLabel}</Text>
          </Flex>
          <Heading
            as="h2"
            fontSize="xl"
            lineHeight="1.2"
            mt="4"
            overflow="hidden"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              display: '-webkit-box',
            }}
          >
            {item.title}
          </Heading>
          <Text
            color="#9aa7b1"
            h="4.2em"
            lineHeight="1.4"
            mt="2"
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
      </Flex>

      <SimpleGrid
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 2 }}
        gapX="4"
        pt="2"
      >
        <CatalogFactRow label={copy.typeSelectLabel} value={item.typeTitle} wrapValue />
        <CatalogFactRow label={copy.marketValueLabel} value={item.marketValueLabel} />
        <CatalogFactRow label={copy.baseValueLabel} value={item.baseValueLabel} />
        <CatalogFactRow label={copy.weightLabel} value={item.weightLabel} />
        <CatalogFactRow label={copy.raritySelectLabel} value={item.rarityLabel} wrapValue />
        <CatalogFactRow label={copy.rarityTagLabel} value={item.rarityTag} wrapValue />
      </SimpleGrid>

      <ModifierPreview item={item} />

      <CatalogActionButton to={item.detailHref}>{copy.cardOpenAction}</CatalogActionButton>
    </Box>
  );
});

interface ModifierPreviewProps {
  readonly item: ItemItemViewModel;
}

function ModifierPreview({ item }: ModifierPreviewProps) {
  return (
    <Box>
      <Text color="#9aa7b1" fontSize="xs" mb="2">
        {item.modifierSummary}
      </Text>
      {item.modifierBadges.length > 0 ? (
        <Flex gap="2" minH="28px" wrap="wrap">
          {item.modifierBadges.map((modifier) => (
            <Badge
              bg="rgba(56, 189, 248, 0.12)"
              borderColor="rgba(56, 189, 248, 0.34)"
              borderWidth="1px"
              color="#7dd3fc"
              key={modifier.id}
              variant="outline"
            >
              {modifier.valueLabel} {modifier.label}
            </Badge>
          ))}
        </Flex>
      ) : null}
    </Box>
  );
}
