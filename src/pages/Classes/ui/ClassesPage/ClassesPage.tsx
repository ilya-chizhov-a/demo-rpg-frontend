import { observer } from 'mobx-react-lite';

import { renderWhen, useViewModel } from 'src/shared/lib';
import { CatalogPageLayout, CatalogSkeleton, SectionSubnav, StatePanel } from 'src/shared/ui';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { ClassesViewModel } from '../../model/ClassesViewModel';
import { ClassList } from '../ClassList/ClassList';
import { ClassesHeader } from '../ClassesHeader/ClassesHeader';
import { ClassesToolbar } from '../ClassesToolbar/ClassesToolbar';

export const ClassesPage = observer(() => {
  const vm = useViewModel(ClassesViewModel);

  return (
    <CatalogPageLayout
      empty={renderWhen(
        vm.showEmpty,
        <StatePanel
          description={vm.copy.emptyDescription}
          title={vm.copy.emptyTitle}
        />,
      )}
      error={renderWhen(
        vm.showError,
        <StatePanel
          actionLabel={vm.sharedCopy.retry}
          description={vm.copy.errorDescription}
          onAction={() => void vm.retry()}
          title={vm.copy.errorTitle}
          tone="error"
        />,
      )}
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="classes-explainer-title"
          isLoading={vm.showLoading}
        />
      }
      header={<ClassesHeader vm={vm} />}
      sectionSubnav={
        <SectionSubnav ariaLabel={vm.copy.heroesSectionAriaLabel} items={vm.sectionNavItems} />
      }
      list={renderWhen(vm.showList, <ClassList vm={vm} />)}
      loading={renderWhen(
        vm.showLoading,
        <CatalogSkeleton
          ariaLabel={vm.copy.loadingAriaLabel}
          columns={{ base: 1, lg: 2 }}
          itemCount={4}
        />,
      )}
      toolbar={<ClassesToolbar vm={vm} />}
    />
  );
});
