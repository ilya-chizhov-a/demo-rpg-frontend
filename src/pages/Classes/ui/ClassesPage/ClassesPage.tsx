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
          description="The query completed, but the classes table returned no rows."
          title="No classes found"
        />,
      )}
      error={renderWhen(
        vm.showError,
        <StatePanel
          actionLabel="Retry"
          description="The GraphQL router did not return the classes catalog."
          onAction={() => void vm.retry()}
          title="Failed to load classes"
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
      header={<ClassesHeader />}
      sectionSubnav={<SectionSubnav ariaLabel="Heroes section" items={vm.sectionNavItems} />}
      list={renderWhen(vm.showList, <ClassList vm={vm} />)}
      loading={renderWhen(
        vm.showLoading,
        <CatalogSkeleton ariaLabel="Loading classes" columns={{ base: 1, lg: 2 }} itemCount={4} />,
      )}
      toolbar={<ClassesToolbar vm={vm} />}
    />
  );
});
