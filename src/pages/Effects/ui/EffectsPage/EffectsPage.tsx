import { observer } from 'mobx-react-lite';

import { useViewModel } from 'src/shared/lib';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { ReferenceCatalogPage } from 'src/widgets/reference-catalog-page';
import { EffectsViewModel } from '../../model/EffectsViewModel';
import { EffectList } from '../EffectList/EffectList';
import { EffectsToolbar } from '../EffectsToolbar/EffectsToolbar';

export const EffectsPage = observer(() => {
  const vm = useViewModel(EffectsViewModel);

  return (
    <ReferenceCatalogPage
      descriptionMaxWidth="780px"
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="effects-explainer-title"
          isLoading={vm.viewState.showLoading}
        />
      }
      list={<EffectList vm={vm} />}
      titleId="effects-title"
      toolbar={<EffectsToolbar vm={vm} />}
      vm={vm}
    />
  );
});
