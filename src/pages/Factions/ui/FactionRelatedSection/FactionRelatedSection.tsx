import { Badge, Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import type { FactionRelatedItemDescriptor } from '../../model/FactionDetailViewModel';
import { RelatedCard } from '../RelatedCard/RelatedCard';

interface FactionRelatedSectionProps {
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly items: readonly FactionRelatedItemDescriptor[];
  readonly isLoadingMore: boolean;
  readonly loadMoreLabel: string;
  readonly loadingMoreLabel: string;
  readonly onLoadMore: () => void;
  readonly showLoadMore: boolean;
  readonly title: string;
  readonly totalCount: number;
}

export function FactionRelatedSection({
  emptyDescription,
  emptyTitle,
  items,
  isLoadingMore,
  loadMoreLabel,
  loadingMoreLabel,
  onLoadMore,
  showLoadMore,
  title,
  totalCount,
}: FactionRelatedSectionProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.86)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="5"
    >
      <Flex align="center" gap="3" justify="space-between" mb="4">
        <Heading as="h2" fontSize="xl">
          {title}
        </Heading>
        <Badge colorPalette="cyan" variant="subtle">
          {totalCount}
        </Badge>
      </Flex>
      {items.length > 0 ? (
        <SimpleGrid as="ul" columns={{ base: 1, md: 2 }} gap="3" listStyleType="none" m="0" p="0">
          {items.map((item) => (
            <RelatedCard item={item} key={item.id} />
          ))}
        </SimpleGrid>
      ) : (
        <Box
          borderColor="rgba(103, 232, 249, 0.14)"
          borderRadius="md"
          borderWidth="1px"
          p="4"
        >
          <Text fontWeight="bold">{emptyTitle}</Text>
          <Text color="#9aa7b1" fontSize="sm" lineHeight="1.45" mt="2">
            {emptyDescription}
          </Text>
        </Box>
      )}
      {showLoadMore && (
        <Button
          colorPalette="cyan"
          loading={isLoadingMore}
          loadingText={loadingMoreLabel}
          mt="4"
          onClick={onLoadMore}
          variant="outline"
        >
          {loadMoreLabel}
        </Button>
      )}
    </Box>
  );
}
