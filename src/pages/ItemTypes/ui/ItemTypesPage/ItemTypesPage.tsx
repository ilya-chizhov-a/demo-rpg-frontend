import { observer } from 'mobx-react-lite';

import { useViewModel } from 'src/shared/lib';
import { ExplainerWidget } from 'src/widgets/explainer-widget';
import { ReferenceCatalogPage } from 'src/widgets/reference-catalog-page';
import { ItemTypesViewModel } from '../../model/ItemTypesViewModel';
import { ItemTypeList } from '../ItemTypeList/ItemTypeList';
import { ItemTypesToolbar } from '../ItemTypesToolbar/ItemTypesToolbar';

export const ItemTypesPage = observer(() => {
  const vm = useViewModel(ItemTypesViewModel);

  return (
    <ReferenceCatalogPage
      descriptionMaxWidth="760px"
      explainer={
        <ExplainerWidget
          descriptor={vm.explainer}
          headingId="item-types-explainer-title"
          isLoading={vm.viewState.showLoading}
        />
      }
      list={<ItemTypeList vm={vm} />}
      titleId="item-types-title"
      toolbar={<ItemTypesToolbar vm={vm} />}
      vm={vm}
    />
  );
});
