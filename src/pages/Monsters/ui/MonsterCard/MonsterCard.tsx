import { Badge, Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import { CatalogActionButton, CatalogCardText, CatalogFactRow } from 'src/shared/ui';
import type { MonsterItemViewModel } from '../../model/MonsterItemViewModel';
import type { MonstersPageCopy } from '../../model/monsterUiCopy';
import { MonsterImageVisual } from '../MonsterImageVisual/MonsterImageVisual';

interface MonsterCardProps {
  readonly copy: MonstersPageCopy;
  readonly item: MonsterItemViewModel;
}

export const MonsterCard = observer(({ copy, item }: MonsterCardProps) => {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      gridTemplateRows="auto auto auto 1fr auto"
      minH="590px"
      minW="0"
      overflow="hidden"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.22)"
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
      <MonsterImageVisual
        image={item.image}
        placeholderDescription={copy.imagePlaceholderDescription(item.title)}
        placeholderTitle={copy.imagePlaceholderTitle}
      />

      <Box px="5">
        <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
          <Badge colorPalette="teal" maxW="66%" overflow="hidden" textOverflow="ellipsis" variant="subtle" whiteSpace="nowrap">
            {copy.kindLabel(item.kind)}
          </Badge>
          <Text flexShrink="0">{item.localeLabel}</Text>
        </Flex>
      </Box>

      <CatalogCardText description={item.description} title={item.title} />

      <Box px="5">
        <Button
          asChild
          color="#67e8f9"
          minH={{ base: '44px', md: '36px' }}
          px="0"
          size="sm"
          variant="plain"
          _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
        >
          <RouterLink to={item.factionHref}>
            {copy.factionLabel}: {item.factionTitle}
          </RouterLink>
        </Button>
      </Box>

      <SimpleGrid
        as="dl"
        alignSelf="end"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 2 }}
        gapX="4"
        mx="5"
        pt="2"
      >
        <CatalogFactRow label={copy.levelLabel} value={item.levelLabel} />
        <CatalogFactRow label={copy.hpLabel} value={item.hpLabel} />
        <CatalogFactRow label={copy.dropCountLabel} value={item.dropCountLabel} />
        <CatalogFactRow label={copy.avgDropChanceLabel} value={item.avgDropChanceLabel} />
      </SimpleGrid>

      <Box alignSelf="end" px="5" pb="5">
        <CatalogActionButton to={item.detailHref}>{copy.cardOpenAction}</CatalogActionButton>
      </Box>
    </Box>
  );
});
