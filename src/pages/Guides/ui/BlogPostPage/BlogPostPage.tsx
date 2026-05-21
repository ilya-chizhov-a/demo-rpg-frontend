import { Avatar, Badge, Box, Grid, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { DetailBackButton, PageShell, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { BlogPostViewModel } from '../../model/BlogPostViewModel';
import { BlogImageVisual } from '../BlogImageVisual/BlogImageVisual';
import { BlogMarkdown } from '../BlogMarkdown/BlogMarkdown';
import { BlogPostSkeleton } from '../BlogPostSkeleton/BlogPostSkeleton';
import { GuideFactPanel } from '../GuideFactPanel/GuideFactPanel';

export const BlogPostPage = observer(function BlogPostPage() {
  const params = useParams();
  const vm = useViewModel(BlogPostViewModel, params.slug ?? '');

  return (
    <PageShell>
      <DetailBackButton
        ariaLabel={vm.copy.backAriaLabel}
        fallbackHref={vm.backHref}
        label={vm.copy.backLabel}
      />
      <Box mb="4">
        <SectionSubnav ariaLabel={vm.copy.guideSectionAriaLabel} items={vm.sectionNavItems} />
      </Box>

      <Box minW="0">
        {renderWhen(vm.showLoading, <BlogPostSkeleton />)}
        {renderWhen(
          vm.showError,
          <StatePanel
            actionLabel={vm.sharedCopy.retry}
            description={vm.copy.errorDescription}
            onAction={() => void vm.retry()}
            title={vm.copy.errorTitle}
            tone="error"
          />,
        )}
        {renderWhen(
          vm.showNotFound,
          <StatePanel
            description={vm.copy.notFoundDescription}
            title={vm.copy.notFoundTitle}
          />,
        )}
        {renderWhen(vm.showDetail, <BlogPostArticle vm={vm} />)}
      </Box>

      <ExplainerWidget
        descriptor={vm.explainer}
        headingId="guide-detail-explainer-title"
        isLoading={vm.showLoading}
      />
    </PageShell>
  );
});

interface BlogPostArticleProps {
  readonly vm: BlogPostViewModel;
}

const BlogPostArticle = observer(function BlogPostArticle({ vm }: BlogPostArticleProps) {
  return (
    <Stack gap="6">
      <Box as="article" maxW="1040px">
        <Stack gap="5">
          <Box>
            <Text color="#67e8f9" fontSize="sm" fontWeight="bold" mb="2">
              {vm.copy.publishedLabel}: {vm.publishedLabel}
            </Text>
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1.05">
              {vm.title}
            </Heading>
            <Text color="#9aa7b1" fontSize="lg" lineHeight="1.65" maxW="820px" mt="4">
              {vm.excerpt}
            </Text>
            <Stack direction="row" gap="2" mt="5" wrap="wrap">
              <Badge colorPalette="cyan" variant="subtle">
                {vm.localeLabel}
              </Badge>
              <Badge colorPalette="green" variant="subtle">
                {vm.versionLabel}
              </Badge>
            </Stack>
          </Box>

          <BlogImageVisual
            image={vm.heroImage}
            placeholderDescription={vm.copy.imagePlaceholderDescription}
            placeholderTitle={vm.copy.imagePlaceholderTitle}
            size="hero"
          />

          <Grid gap="5" templateColumns={{ base: '1fr', xl: 'minmax(0, 1fr) 320px' }}>
            <Box
              bg="rgba(18, 24, 32, 0.72)"
              borderColor="rgba(103, 232, 249, 0.12)"
              borderRadius="md"
              borderWidth="1px"
              p={{ base: '5', md: '7' }}
            >
              <BlogMarkdown blocks={vm.bodyBlocks} />
            </Box>

            <Stack gap="4">
              <GuideFactPanel title={vm.copy.authorBioTitle}>
                <Stack align="center" direction="row" gap="3">
                  {vm.authorAvatar ? (
                    <Image
                      alt={vm.authorAvatar.alt}
                      borderRadius="full"
                      boxSize="56px"
                      htmlHeight={vm.authorAvatar.height}
                      htmlWidth={vm.authorAvatar.width}
                      objectFit="cover"
                      src={vm.authorAvatar.src}
                      srcSet={vm.authorAvatar.srcSet}
                    />
                  ) : (
                    <Avatar.Root size="lg">
                      <Avatar.Fallback name={vm.authorName} />
                    </Avatar.Root>
                  )}
                  <Box minW="0">
                    <Text color="#f4f7f8" fontWeight="bold">
                      {vm.authorName}
                    </Text>
                    <Text color="#9aa7b1" fontSize="sm" lineHeight="1.5" mt="1">
                      {vm.authorBio}
                    </Text>
                  </Box>
                </Stack>
              </GuideFactPanel>

              <GuideFactPanel title={vm.copy.imageMetadataTitle}>
                <MetadataList metadata={vm.coverMetadata} unknownValue={vm.copy.unknownValue} />
              </GuideFactPanel>
            </Stack>
          </Grid>
        </Stack>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" maxW="1040px">
        {vm.copy.relatedLinks.map((link) => (
          <GuideFactPanel
            actionHref={link.href}
            actionLabel={link.label}
            description={link.description}
            key={link.href}
            title={link.title}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
});

interface MetadataListProps {
  readonly metadata: Record<string, unknown> | null;
  readonly unknownValue: string;
}

function MetadataList({ metadata, unknownValue }: MetadataListProps) {
  const entries = Object.entries(metadata ?? {}).filter(([key]) =>
    ['fileName', 'height', 'mimeType', 'status', 'width'].includes(key),
  );
  if (entries.length === 0) {
    return <Text color="#9aa7b1">{unknownValue}</Text>;
  }

  return (
    <Stack as="dl" gap="2">
      {entries.map(([key, value]) => (
        <Box key={key}>
          <Text as="dt" color="#9aa7b1" fontSize="xs" textTransform="uppercase">
            {key}
          </Text>
          <Text as="dd" color="#f4f7f8" fontSize="sm" mt="1" overflowWrap="anywhere">
            {formatMetadataValue(value, unknownValue)}
          </Text>
        </Box>
      ))}
    </Stack>
  );
}

function formatMetadataValue(value: unknown, unknownValue: string): string {
  if (typeof value === 'string') return value || unknownValue;
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : unknownValue;
  if (typeof value === 'boolean') return String(value);
  return unknownValue;
}
