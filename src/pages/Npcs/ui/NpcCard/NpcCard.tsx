import { Badge, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';
import { CatalogActionButton, CatalogFactRow } from 'src/shared/ui';

import type { NpcItemViewModel } from '../../model/NpcItemViewModel';
import type { NpcsPageCopy } from '../../model/npcUiCopy';
import { NpcPortraitVisual } from '../NpcPortraitVisual/NpcPortraitVisual';

interface NpcCardProps {
  readonly copy: NpcsPageCopy;
  readonly item: NpcItemViewModel;
}

export const NpcCard = observer(({ copy, item }: NpcCardProps) => {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      gridTemplateRows="auto auto auto 1fr"
      minH="560px"
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
      <NpcPortraitVisual
        image={item.portraitImage}
        placeholderDescription={copy.portraitPlaceholderDescription(item.title)}
        placeholderTitle={copy.portraitPlaceholderTitle}
      />

      <Box px="5">
        <Flex align="center" color="#9aa7b1" fontSize="sm" gap="3" justify="space-between">
          <Badge colorPalette="purple" maxW="66%" overflow="hidden" textOverflow="ellipsis" variant="subtle" whiteSpace="nowrap">
            {copy.roleLabel(item.role)}
          </Badge>
          <Text flexShrink="0">{item.localeLabel}</Text>
        </Flex>
        <Heading
          as="h2"
          fontSize="xl"
          h="2.4em"
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
        <Button
          asChild
          color="#67e8f9"
          minH={{ base: '44px', md: '36px' }}
          px="0"
          size="sm"
          variant="plain"
          _hover={{ color: '#a5f3fc', textDecoration: 'underline' }}
        >
          <RouterLink to={item.locationHref}>
            {copy.locationLabel}: {item.locationTitle}
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

      <Box as="dl" borderTopColor="rgba(103, 232, 249, 0.14)" borderTopWidth="1px" mx="5">
        <CatalogFactRow label={copy.locationLabel} value={item.locationTitle} />
      </Box>

      <Box alignSelf="end" px="5" pb="5">
        <CatalogActionButton to={item.detailHref}>{copy.cardOpenAction}</CatalogActionButton>
      </Box>
    </Box>
  );
});
