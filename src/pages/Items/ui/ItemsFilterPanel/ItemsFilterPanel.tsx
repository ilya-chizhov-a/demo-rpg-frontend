import { SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useId } from 'react';

import {
  CatalogFilterActions,
  CatalogFilterNumberField,
  CatalogFilterPanelFrame,
  CatalogFilterSelectField,
  CatalogFilterTextField,
} from 'src/shared/ui';
import type { ItemsViewModel } from '../../model/ItemsViewModel';

const ITEMS_MARKET_MAX_INPUT_ID = 'items-market-max-input';
const ITEMS_MARKET_MIN_INPUT_ID = 'items-market-min-input';
const ITEMS_NAME_INPUT_ID = 'items-name-input';
const ITEMS_RARITY_SELECT_ID = 'items-rarity-select';
const ITEMS_SORT_SELECT_ID = 'items-sort-select';
const ITEMS_TYPE_SELECT_ID = 'items-type-select';

interface ItemsFilterPanelProps {
  readonly showTitle?: boolean;
  readonly variant?: 'panel' | 'plain';
  readonly vm: ItemsViewModel;
}

export const ItemsFilterPanel = observer(function ItemsFilterPanel({
  showTitle = true,
  variant = 'panel',
  vm,
}: ItemsFilterPanelProps) {
  const fieldIdPrefix = useId();
  const fieldIds = {
    marketMax: `${fieldIdPrefix}-${ITEMS_MARKET_MAX_INPUT_ID}`,
    marketMin: `${fieldIdPrefix}-${ITEMS_MARKET_MIN_INPUT_ID}`,
    name: `${fieldIdPrefix}-${ITEMS_NAME_INPUT_ID}`,
    rarity: `${fieldIdPrefix}-${ITEMS_RARITY_SELECT_ID}`,
    sort: `${fieldIdPrefix}-${ITEMS_SORT_SELECT_ID}`,
    type: `${fieldIdPrefix}-${ITEMS_TYPE_SELECT_ID}`,
  } as const;

  return (
    <CatalogFilterPanelFrame
      showTitle={showTitle}
      title={vm.copy.filterPanelTitle}
      variant={variant}
    >
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="3">
        <CatalogFilterTextField
          id={fieldIds.name}
          label={vm.copy.nameSearchLabel}
          onChange={(value) => vm.setSearchQuery(value)}
          placeholder={vm.copy.nameSearchPlaceholder}
          value={vm.searchQuery}
        />
        <CatalogFilterSelectField
          id={fieldIds.rarity}
          label={vm.copy.raritySelectLabel}
          onChange={(value) => vm.setRarity(value)}
          value={vm.activeRarity ?? ''}
        >
          <option value="">{vm.copy.rarityAllLabel}</option>
          {vm.rarityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </CatalogFilterSelectField>
        <CatalogFilterSelectField
          id={fieldIds.type}
          label={vm.copy.typeSelectLabel}
          onChange={(value) => vm.setTypeId(value)}
          value={vm.activeTypeId ?? ''}
        >
          <option value="">{vm.copy.typeAllLabel}</option>
          {vm.itemTypeOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </CatalogFilterSelectField>
        <CatalogFilterNumberField
          id={fieldIds.marketMin}
          label={vm.copy.marketMinLabel}
          onChange={(value) => vm.setMarketMin(value)}
          value={vm.marketMinInputValue}
        />
        <CatalogFilterNumberField
          id={fieldIds.marketMax}
          label={vm.copy.marketMaxLabel}
          onChange={(value) => vm.setMarketMax(value)}
          value={vm.marketMaxInputValue}
        />
        <CatalogFilterSelectField
          id={fieldIds.sort}
          label={vm.copy.sortLabel}
          onChange={(value) => vm.setSortKey(value)}
          value={vm.sortKey}
        >
          {vm.copy.sortOptions.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </CatalogFilterSelectField>
      </SimpleGrid>

      {vm.isMarketRangeValid ? null : (
        <Text color="#fb7185" fontSize="sm" role="alert">
          {vm.copy.rangeValidationMessage}
        </Text>
      )}

      <CatalogFilterActions
        applyLabel={vm.copy.applyFiltersActionLabel}
        canApply={vm.canApplyFilters}
        canReset={vm.hasActiveFilter}
        onApply={() => {
          vm.applyFilters().catch(reportFilterActionError);
        }}
        onReset={() => {
          vm.resetFilters().catch(reportFilterActionError);
        }}
        resetLabel={vm.copy.resetFiltersActionLabel}
      />
    </CatalogFilterPanelFrame>
  );
});

function reportFilterActionError(error: unknown): void {
  console.error('[ItemsFilterPanel] filter action failed', error);
}
