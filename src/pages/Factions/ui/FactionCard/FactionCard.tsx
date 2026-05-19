import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { CatalogActionButton, CatalogCardText, CatalogFactRow } from 'src/shared/ui';

import type { FactionItemViewModel } from '../../model/FactionItemViewModel';
import type { FactionsPageCopy } from '../../model/factionUiCopy';
import { FactionCrestVisual } from '../FactionCrestVisual/FactionCrestVisual';

interface FactionCardProps {
  readonly copy: FactionsPageCopy;
  readonly item: FactionItemViewModel;
}

export const FactionCard = observer(({ copy, item }: FactionCardProps) => {
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
      minH="470px"
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
      <FactionCrestVisual
        alignmentLabel={item.alignmentLabel}
        image={item.crestImage}
        placeholderDescription={copy.crestPlaceholderDescription(item.title)}
        placeholderTitle={copy.crestPlaceholderTitle}
      />

      <Box px="5">
        <Flex
          align="flex-start"
          color="#9aa7b1"
          fontSize="sm"
          gap="2"
          justify="space-between"
          minH="11"
          wrap="wrap"
        >
          <Badge
            colorPalette="cyan"
            maxW="full"
            minH="7"
            minW="0"
            overflow="hidden"
            overflowWrap="anywhere"
            py="1"
            variant="subtle"
            whiteSpace="normal"
            wordBreak="normal"
            style={{
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              display: '-webkit-box',
            }}
          >
            {item.alignmentLabel}
          </Badge>
          <Text flexShrink="0" whiteSpace="nowrap">
            {item.localeLabel}
          </Text>
        </Flex>
      </Box>

      <CatalogCardText description={item.description} title={item.title} />

      <Box
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        mx="5"
      >
        <CatalogFactRow label={copy.fieldAlignment} value={item.alignmentLabel} wrapValue />
        <CatalogFactRow label={copy.publishedLabel} value={item.publishedLabel} />
        <CatalogFactRow label={copy.versionLabel} value={item.versionLabel} />
      </Box>

      <Box alignSelf="end" px="5" pb="5">
        <CatalogActionButton to={item.detailHref}>{copy.cardOpenAction}</CatalogActionButton>
      </Box>
    </Box>
  );
});
