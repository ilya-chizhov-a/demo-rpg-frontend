import { Box, Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import {
  CatalogFilterPanelFrame,
  CatalogFilterTextField,
  CatalogFilterToolbar,
} from 'src/shared/ui';
import type { BlogViewModel } from '../../model/BlogViewModel';

interface BlogToolbarProps {
  readonly vm: BlogViewModel;
}

export const BlogToolbar = observer(function BlogToolbar({ vm }: BlogToolbarProps) {
  return (
    <CatalogFilterToolbar
      closeFiltersActionLabel={vm.copy.closeFiltersActionLabel}
      desktopFilters={
        <Box alignSelf="start">
          <BlogSearchPanel vm={vm} />
        </Box>
      }
      desktopPreview={<BlogPayloadPreview vm={vm} />}
      entityLabel={vm.copy.entityLabel}
      filterPanelTitle={vm.copy.filterPanelTitle}
      isFilterSheetOpen={vm.isFilterSheetOpen}
      mobileFilters={<BlogSearchPanel showTitle={false} variant="plain" vm={vm} />}
      mobilePreview={<BlogPayloadPreview vm={vm} />}
      ofLabel={vm.sharedCopy.resultSummaryOf}
      onCloseFilterSheet={() => vm.closeFilterSheet()}
      onOpenFilterSheet={() => vm.openFilterSheet()}
      openFiltersActionLabel={vm.copy.openFiltersActionLabel}
      showingLabel={vm.sharedCopy.resultSummaryShowing}
      totalCount={vm.catalogState.totalCount}
      visibleCount={vm.catalogState.visibleCount}
    />
  );
});

interface BlogSearchPanelProps {
  readonly vm: BlogViewModel;
  readonly showTitle?: boolean;
  readonly variant?: 'panel' | 'plain';
}

const BlogSearchPanel = observer(function BlogSearchPanel({
  showTitle = true,
  variant = 'panel',
  vm,
}: BlogSearchPanelProps) {
  return (
    <CatalogFilterPanelFrame
      showTitle={showTitle}
      title={vm.copy.filterPanelTitle}
      variant={variant}
    >
      <CatalogFilterTextField
        id="guide-search"
        label={vm.copy.searchLabel}
        onChange={(value) => vm.setSearchTerm(value)}
        placeholder={vm.copy.searchPlaceholder}
        value={vm.searchTerm}
      />
    </CatalogFilterPanelFrame>
  );
});

interface BlogPayloadPreviewProps {
  readonly vm: BlogViewModel;
}

const BlogPayloadPreview = observer(function BlogPayloadPreview({ vm }: BlogPayloadPreviewProps) {
  return (
    <Box
      bg="rgba(3, 10, 18, 0.74)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      minW="0"
      overflow="hidden"
    >
      <Heading
        as="h3"
        borderBottomColor="rgba(103, 232, 249, 0.14)"
        borderBottomWidth="1px"
        color="var(--color-text-supporting)"
        fontSize="sm"
        p="3"
      >
        {vm.copy.payloadPreviewTitle}
      </Heading>
      <Box
        as="pre"
        color="#c9d2da"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontSize="xs"
        lineHeight="1.55"
        m="0"
        maxH={{ base: '220px', lg: '420px' }}
        overflow="auto"
        p="3"
        whiteSpace="pre"
      >
        {vm.payloadPreviewJson}
      </Box>
    </Box>
  );
});
