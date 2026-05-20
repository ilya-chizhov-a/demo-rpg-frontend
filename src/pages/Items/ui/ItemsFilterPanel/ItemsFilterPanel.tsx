import { Box, Button, Flex, Heading, Input, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useId } from 'react';
import type { ChangeEvent, ReactNode } from 'react';

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
  const isPanel = variant === 'panel';
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
    <Box
      bg={isPanel ? 'rgba(18, 24, 32, 0.9)' : 'transparent'}
      borderColor={isPanel ? 'rgba(103, 232, 249, 0.16)' : 'transparent'}
      borderRadius="md"
      borderWidth={isPanel ? '1px' : '0'}
      display="grid"
      gap="4"
      minW="0"
      p={isPanel ? '4' : '0'}
    >
      {showTitle ? (
        <Heading as="h2" color="var(--color-text)" fontSize="lg">
          {vm.copy.filterPanelTitle}
        </Heading>
      ) : null}

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="3">
        <TextField
          id={fieldIds.name}
          label={vm.copy.nameSearchLabel}
          onChange={(value) => vm.setSearchQuery(value)}
          placeholder={vm.copy.nameSearchPlaceholder}
          value={vm.searchQuery}
        />
        <SelectField
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
        </SelectField>
        <SelectField
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
        </SelectField>
        <NumberField
          id={fieldIds.marketMin}
          label={vm.copy.marketMinLabel}
          onChange={(value) => vm.setMarketMin(value)}
          value={vm.marketMinInputValue}
        />
        <NumberField
          id={fieldIds.marketMax}
          label={vm.copy.marketMaxLabel}
          onChange={(value) => vm.setMarketMax(value)}
          value={vm.marketMaxInputValue}
        />
        <SelectField
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
        </SelectField>
      </SimpleGrid>

      {vm.isMarketRangeValid ? null : (
        <Text color="#fb7185" fontSize="sm" role="alert">
          {vm.copy.rangeValidationMessage}
        </Text>
      )}

      <Flex gap="2" justify="flex-end" wrap="wrap">
        {vm.hasActiveFilter ? (
          <Button minH="44px" onClick={() => void vm.resetFilters()} type="button" variant="ghost">
            {vm.copy.resetFiltersActionLabel}
          </Button>
        ) : null}
        <Button
          bg="#22d3ee"
          color="var(--color-text-on-accent)"
          disabled={!vm.canApplyFilters}
          minH="44px"
          onClick={() => void vm.applyFilters()}
          type="button"
          _hover={{ bg: '#67e8f9' }}
        >
          {vm.copy.applyFiltersActionLabel}
        </Button>
      </Flex>
    </Box>
  );
});

interface FieldProps {
  readonly id: string;
  readonly label: string;
}

interface TextFieldProps extends FieldProps {
  readonly onChange: (value: string) => void;
  readonly placeholder: string;
  readonly value: string;
}

function TextField({ id, label, onChange, placeholder, value }: TextFieldProps) {
  return (
    <Box minW="0">
      <FieldLabel id={id} label={label} />
      <Input
        bg="rgba(15, 21, 29, 0.82)"
        borderColor="rgba(103, 232, 249, 0.24)"
        id={id}
        minH="44px"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </Box>
  );
}

interface NumberFieldProps extends FieldProps {
  readonly onChange: (value: string) => void;
  readonly value: string;
}

function NumberField({ id, label, onChange, value }: NumberFieldProps) {
  return (
    <Box minW="0">
      <FieldLabel id={id} label={label} />
      <Input
        bg="rgba(15, 21, 29, 0.82)"
        borderColor="rgba(103, 232, 249, 0.24)"
        id={id}
        min="0"
        minH="44px"
        onChange={(event) => onChange(event.target.value)}
        step="1"
        type="number"
        value={value}
      />
    </Box>
  );
}

interface SelectFieldProps extends FieldProps {
  readonly children: ReactNode;
  readonly onChange: (value: string) => void;
  readonly value: string;
}

function SelectField({ children, id, label, onChange, value }: SelectFieldProps) {
  return (
    <Box minW="0">
      <FieldLabel id={id} label={label} />
      <Box
        asChild
        bg="rgba(15, 21, 29, 0.82)"
        borderColor="rgba(103, 232, 249, 0.24)"
        borderRadius="md"
        borderWidth="1px"
        color="var(--color-text)"
        h="44px"
        px="3"
        w="full"
      >
        <select
          id={id}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
          value={value}
        >
          {children}
        </select>
      </Box>
    </Box>
  );
}

function FieldLabel({ id, label }: FieldProps) {
  return (
    <Box asChild color="#9aa7b1" display="block" fontSize="xs" mb="1">
      <label htmlFor={id}>{label}</label>
    </Box>
  );
}
