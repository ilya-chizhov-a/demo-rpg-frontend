import type { ReactNode } from 'react';

import type { ActiveNavigationItem } from 'src/shared/config';
import { renderWhen, type CatalogViewState } from 'src/shared/lib';
import {
  CatalogEmptyState,
  CatalogHeader,
  CatalogPageLayout,
  CatalogSkeleton,
  SectionSubnav,
  StatePanel,
} from 'src/shared/ui';

interface ReferenceCatalogPageCopy {
  readonly capabilitiesAriaLabel: string;
  readonly emptyActionLabel: string;
  readonly emptyDescription: string;
  readonly emptyTitle: string;
  readonly errorDescription: string;
  readonly errorTitle: string;
  readonly headerBadges: readonly string[];
  readonly headerDescription: string;
  readonly headerEyebrow: string;
  readonly headerTitle: string;
  readonly itemsSectionAriaLabel: string;
  readonly loadingAriaLabel: string;
}

interface ReferenceCatalogPageViewModel {
  readonly copy: ReferenceCatalogPageCopy;
  readonly sectionNavItems: readonly ActiveNavigationItem[];
  readonly sharedCopy: {
    readonly retry: string;
  };
  readonly viewState: CatalogViewState;
  retry(): Promise<void> | void;
}

interface ReferenceCatalogPageProps<TViewModel extends ReferenceCatalogPageViewModel> {
  readonly descriptionMaxWidth: string;
  readonly explainer: ReactNode;
  readonly list: ReactNode;
  readonly skeletonItemCount?: number;
  readonly titleId: string;
  readonly toolbar: ReactNode;
  readonly vm: TViewModel;
}

export function ReferenceCatalogPage<TViewModel extends ReferenceCatalogPageViewModel>({
  descriptionMaxWidth,
  explainer,
  list,
  skeletonItemCount = 4,
  titleId,
  toolbar,
  vm,
}: ReferenceCatalogPageProps<TViewModel>) {
  const state = vm.viewState;

  return (
    <CatalogPageLayout
      empty={renderWhen(
        state.showEmpty,
        <CatalogEmptyState
          actionLabel={vm.copy.emptyActionLabel}
          actionTo="/items"
          description={vm.copy.emptyDescription}
          title={vm.copy.emptyTitle}
        />,
      )}
      error={renderWhen(
        state.showError,
        <StatePanel
          actionLabel={vm.sharedCopy.retry}
          description={vm.copy.errorDescription}
          onAction={() => void vm.retry()}
          title={vm.copy.errorTitle}
          tone="error"
        />,
      )}
      explainer={explainer}
      header={
        <CatalogHeader
          ariaLabel={vm.copy.capabilitiesAriaLabel}
          badges={vm.copy.headerBadges}
          description={vm.copy.headerDescription}
          descriptionMaxWidth={descriptionMaxWidth}
          eyebrow={vm.copy.headerEyebrow}
          title={vm.copy.headerTitle}
          titleId={titleId}
          titleSize={{ base: '4xl', md: '5xl' }}
        />
      }
      list={renderWhen(state.showList, list)}
      loading={renderWhen(
        state.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, lg: 2 }}
          itemCount={skeletonItemCount}
        />,
      )}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.itemsSectionAriaLabel} items={vm.sectionNavItems} />
      }
      toolbar={toolbar}
    />
  );
}
