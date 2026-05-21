import { Badge, Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { CatalogActionButton, CatalogCardText, CatalogFactRow } from 'src/shared/ui';
import type { QuestItemViewModel } from '../../model/QuestItemViewModel';
import type { QuestsPageCopy } from '../../model/questUiCopy';

interface QuestCardProps {
  readonly copy: QuestsPageCopy;
  readonly item: QuestItemViewModel;
}

export const QuestCard = observer(function QuestCard({ copy, item }: QuestCardProps) {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      minH="392px"
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
      <Box minW="0">
        <Flex align="center" color="#9aa7b1" fontSize="sm" gap="2" justify="space-between">
          <Flex gap="2" minW="0" wrap="wrap">
            <Badge colorPalette="cyan" variant="subtle">
              {item.kindLabel}
            </Badge>
            <Badge colorPalette={item.repeatableBadgePalette} variant="subtle">
              {item.repeatableLabel}
            </Badge>
          </Flex>
          <Text flexShrink="0">{item.localeLabel}</Text>
        </Flex>
        <CatalogCardText description={item.description} px="0" title={item.title} />
      </Box>

      <SimpleGrid
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 2 }}
        gapX="4"
        pt="2"
      >
        <CatalogFactRow label={copy.npcSelectLabel} value={item.giverTitle} wrapValue />
        <CatalogFactRow label={copy.primaryLocationLabel} value={item.primaryLocationTitle} wrapValue />
        <CatalogFactRow label={copy.levelRequiredLabel} value={item.levelLabel} />
        <CatalogFactRow label={copy.stepCountLabel} value={item.stepCountLabel} />
        <CatalogFactRow label={copy.detail.totalXpLabel} value={item.totalXpLabel} />
        <CatalogFactRow label={copy.repeatableLabel} value={item.repeatableLabel} />
      </SimpleGrid>

      <CatalogActionButton to={item.detailHref}>{copy.cardOpenAction}</CatalogActionButton>
    </Box>
  );
});
