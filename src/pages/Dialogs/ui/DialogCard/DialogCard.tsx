import { Badge, Box, Button, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import { CatalogFactRow } from 'src/shared/ui';
import type { DialogItemViewModel } from '../../model/DialogItemViewModel';
import type { DialogsPageCopy } from '../../model/dialogsUiCopy';
import { DialogLineItem } from '../DialogLineItem/DialogLineItem';

interface DialogCardProps {
  readonly copy: DialogsPageCopy;
  readonly item: DialogItemViewModel;
}

export const DialogCard = observer(function DialogCard({ copy, item }: DialogCardProps) {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      minH="420px"
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
        <Flex align="center" color="#9aa7b1" gap="2" justify="space-between">
          <Badge colorPalette="cyan" variant="subtle">
            {copy.fieldSlug}
          </Badge>
          <Text fontSize="sm" fontWeight="bold">
            {item.lineCountLabel} {copy.fieldLineCount}
          </Text>
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
        <Text color="#9aa7b1" fontSize="sm" mt="2" overflowWrap="anywhere">
          {item.slug}
        </Text>
      </Box>

      <SimpleGrid
        as="dl"
        borderTopColor="rgba(103, 232, 249, 0.14)"
        borderTopWidth="1px"
        columns={{ base: 1, sm: 2 }}
        gapX="4"
        pt="2"
      >
        <CatalogFactRow label={copy.fieldNpc} value={item.npcTitle} wrapValue />
        <CatalogFactRow label={copy.fieldPublished} value={item.publishedLabel} />
        <CatalogFactRow label={copy.versionLabel} value={item.versionLabel} />
        <CatalogFactRow label={copy.fieldLineCount} value={item.lineCountLabel} />
      </SimpleGrid>

      <Box>
        <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
          {copy.firstLineTitle}
        </Text>
        <Text
          color="#d8e0e8"
          lineHeight="1.5"
          overflow="hidden"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            display: '-webkit-box',
          }}
        >
          {item.firstLineText}
        </Text>
      </Box>

      <Box>
        <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
          {copy.linePreviewTitle}
        </Text>
        {item.hasLines ? (
          <Stack as="ol" gap="2" listStyleType="none" m="0" p="0">
            {item.visibleLines.map((line) => (
              <DialogLineItem line={line} key={line.id} />
            ))}
          </Stack>
        ) : (
          <Box
            bg="rgba(15, 21, 29, 0.72)"
            borderColor="rgba(103, 232, 249, 0.14)"
            borderRadius="md"
            borderWidth="1px"
            p="3"
          >
            <Text fontWeight="bold">{copy.noLinesTitle}</Text>
            <Text color="#9aa7b1" fontSize="sm" mt="1">
              {copy.noLinesDescription}
            </Text>
          </Box>
        )}
      </Box>

      <Button
        asChild
        bg="rgba(18, 24, 32, 0.76)"
        borderColor="rgba(103, 232, 249, 0.24)"
        borderWidth="1px"
        color="var(--color-text-supporting)"
        minH="44px"
        size="sm"
        variant="outline"
        _groupHover={{
          bg: '#22d3ee',
          borderColor: '#67e8f9',
          color: 'var(--color-text-on-accent)',
        }}
        _hover={{
          bg: '#22d3ee',
          borderColor: '#67e8f9',
          color: 'var(--color-text-on-accent)',
        }}
      >
        <RouterLink to={item.npcHref}>{copy.openNpcAction}</RouterLink>
      </Button>
    </Box>
  );
});
