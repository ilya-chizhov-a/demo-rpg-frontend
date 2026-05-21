import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { CatalogActionButton, CatalogCardText } from 'src/shared/ui';
import type { BlogPostItemViewModel } from '../../model/BlogPostItemViewModel';
import type { BlogPageCopy } from '../../model/guideCopy';
import { BlogImageVisual } from '../BlogImageVisual/BlogImageVisual';

interface BlogCardProps {
  readonly copy: BlogPageCopy;
  readonly item: BlogPostItemViewModel;
  readonly variant?: 'featured' | 'regular';
}

export const BlogCard = observer(function BlogCard({
  copy,
  item,
  variant = 'regular',
}: BlogCardProps) {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gridTemplateRows="auto 1fr"
      listStyleType="none"
      minH={variant === 'featured' ? '100%' : '420px'}
      overflow="hidden"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.2)"
      transition="box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease"
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.5)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.28)',
      }}
    >
      <BlogImageVisual
        image={item.heroImage}
        placeholderDescription={copy.imagePlaceholderDescription}
        placeholderTitle={copy.imagePlaceholderTitle}
      />

      <Box display="grid" gap="4" p="5">
        <Box minW="0">
          <Flex align="center" color="#9aa7b1" fontSize="sm" gap="2" justify="space-between">
            <Flex gap="2" minW="0" wrap="wrap">
              {variant === 'featured' ? (
                <Badge colorPalette="cyan" variant="subtle">
                  {copy.featuredLabel}
                </Badge>
              ) : null}
              <Badge colorPalette="green" variant="subtle">
                {item.localeLabel}
              </Badge>
            </Flex>
            <Text flexShrink="0">{item.publishedLabel}</Text>
          </Flex>

          <CatalogCardText description={item.excerpt} px="0" title={item.title} />
        </Box>

        <Box alignSelf="end" display="grid" gap="3">
          <Text color="#9aa7b1" fontSize="sm">
            {copy.authorLabel}:{' '}
            <Text as="span" color="#f4f7f8" fontWeight="bold">
              {item.authorName}
            </Text>
          </Text>
          <CatalogActionButton to={item.detailHref}>{copy.cardOpenAction}</CatalogActionButton>
        </Box>
      </Box>
    </Box>
  );
});
