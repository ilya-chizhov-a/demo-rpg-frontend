import { observer } from 'mobx-react-lite';

import { useViewModel } from 'src/shared/lib';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { ReferenceCatalogPage } from 'src/widgets/reference-catalog-page';
import { StatsViewModel } from '../../model/StatsViewModel';
import { StatList } from '../StatList/StatList';
import { StatsToolbar } from '../StatsToolbar/StatsToolbar';

export const StatsPage = observer(() => {
  const vm = useViewModel(StatsViewModel);

  return (
    <ReferenceCatalogPage
      descriptionMaxWidth="760px"
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="stats-explainer-title"
          isLoading={vm.viewState.showLoading}
        />
      }
      list={<StatList vm={vm} />}
      titleId="stats-title"
      toolbar={<StatsToolbar vm={vm} />}
      vm={vm}
    />
  );
});
