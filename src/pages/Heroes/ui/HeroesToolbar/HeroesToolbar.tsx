import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import type { HeroesViewModel } from '../../model/HeroesViewModel';
import type { HeroSortKey } from '../../model/heroUiCopy';

const HEROES_LEVEL_MAX_INPUT_ID = 'heroes-level-max-input';
const HEROES_LEVEL_MIN_INPUT_ID = 'heroes-level-min-input';
const HEROES_SEARCH_INPUT_ID = 'heroes-search-input';

interface HeroesToolbarProps {
  readonly onClassFilterChange: (classId: string | null) => void;
  readonly onLevelMaxChange: (value: string) => void;
  readonly onLevelMinChange: (value: string) => void;
  readonly onResetFilters: () => void;
  readonly onSearchQueryChange: (value: string) => void;
  readonly onSortChange: (sortKey: HeroSortKey) => void;
  readonly onVeteranOnlyChange: (value: boolean) => void;
  readonly vm: HeroesViewModel;
}

export const HeroesToolbar = observer(
  ({
    onClassFilterChange,
    onLevelMaxChange,
    onLevelMinChange,
    onResetFilters,
    onSearchQueryChange,
    onSortChange,
    onVeteranOnlyChange,
    vm,
  }: HeroesToolbarProps) => {
    return (
      <Box mb="5">
        <Flex align="flex-end" gap="3" mb="4" wrap="wrap">
          <Box minW={{ base: '100%', md: '240px' }}>
            <Box
              asChild
              color="#9aa7b1"
              display="block"
              fontSize="xs"
              mb="1"
            >
              <label htmlFor={HEROES_SEARCH_INPUT_ID}>{vm.copy.searchLabel}</label>
            </Box>
            <Input
              bg="rgba(15, 21, 29, 0.74)"
              borderColor="rgba(103, 232, 249, 0.24)"
              id={HEROES_SEARCH_INPUT_ID}
              minH="44px"
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder={vm.copy.searchPlaceholder}
              value={vm.searchQuery}
            />
          </Box>

          <LevelInput
            id={HEROES_LEVEL_MIN_INPUT_ID}
            label={vm.copy.levelMinLabel}
            onChange={onLevelMinChange}
            value={vm.levelMinInputValue}
          />
          <LevelInput
            id={HEROES_LEVEL_MAX_INPUT_ID}
            label={vm.copy.levelMaxLabel}
            onChange={onLevelMaxChange}
            value={vm.levelMaxInputValue}
          />

          <Button
            aria-pressed={vm.veteranOnly}
            bg={vm.veteranOnly ? '#22d3ee' : 'rgba(15, 21, 29, 0.74)'}
            borderColor={vm.veteranOnly ? '#67e8f9' : 'rgba(103, 232, 249, 0.24)'}
            color={vm.veteranOnly ? 'var(--color-text-on-accent)' : '#f4f7f8'}
            minH="44px"
            onClick={() => onVeteranOnlyChange(!vm.veteranOnly)}
            type="button"
            variant={vm.veteranOnly ? 'solid' : 'outline'}
            _hover={{
              bg: vm.veteranOnly ? '#67e8f9' : 'rgba(34, 211, 238, 0.12)',
            }}
          >
            {vm.copy.veteranOnlyButton}
          </Button>

          {vm.hasActiveFilter ? (
            <Button minH="44px" onClick={onResetFilters} type="button" variant="ghost">
              {vm.copy.resetFiltersActionLabel}
            </Button>
          ) : null}
        </Flex>

        <FilterButtonGroup
          ariaLabel={vm.copy.sortButtonsAriaLabel}
          label={vm.copy.sortLabel}
        >
          {vm.sortButtons.map((button) => (
            <Button
              aria-pressed={button.selected}
              bg={button.selected ? '#22d3ee' : 'rgba(15, 21, 29, 0.74)'}
              borderColor={button.selected ? '#67e8f9' : 'rgba(103, 232, 249, 0.24)'}
              color={button.selected ? 'var(--color-text-on-accent)' : '#f4f7f8'}
              key={button.key}
              minH="44px"
              minW="44px"
              onClick={() => onSortChange(button.key)}
              size="sm"
              type="button"
              variant={button.selected ? 'solid' : 'outline'}
              _hover={{
                bg: button.selected ? '#67e8f9' : 'rgba(34, 211, 238, 0.12)',
              }}
            >
              {button.label}
            </Button>
          ))}
        </FilterButtonGroup>

        {vm.classButtons.length > 1 ? (
          <FilterButtonGroup
            ariaLabel={vm.copy.classButtonsAriaLabel}
            label={vm.copy.classFilterLabel}
          >
            {vm.classButtons.map((button) => (
              <Button
                aria-pressed={button.selected}
                bg={button.selected ? '#22d3ee' : 'rgba(15, 21, 29, 0.74)'}
                borderColor={button.selected ? '#67e8f9' : 'rgba(103, 232, 249, 0.24)'}
                color={button.selected ? 'var(--color-text-on-accent)' : '#f4f7f8'}
                key={button.key}
                minH="44px"
                minW="44px"
                onClick={() => onClassFilterChange(button.classId)}
                size="sm"
                type="button"
                variant={button.selected ? 'solid' : 'outline'}
                _hover={{
                  bg: button.selected ? '#67e8f9' : 'rgba(34, 211, 238, 0.12)',
                }}
              >
                <Box minW="0" textAlign="left">
                  <Text
                    as="span"
                    display="block"
                    overflow="hidden"
                    overflowWrap="anywhere"
                    whiteSpace="normal"
                  >
                    {button.label}
                  </Text>
                  {button.subtitle ? (
                    <Text as="span" display="block" fontSize="2xs" opacity="0.72">
                      {button.subtitle}
                    </Text>
                  ) : null}
                </Box>
              </Button>
            ))}
          </FilterButtonGroup>
        ) : null}
      </Box>
    );
  },
);

interface LevelInputProps {
  readonly id: string;
  readonly label: string;
  readonly onChange: (value: string) => void;
  readonly value: string;
}

function LevelInput({ id, label, onChange, value }: LevelInputProps) {
  return (
    <Box minW="120px">
      <Box asChild color="#9aa7b1" display="block" fontSize="xs" mb="1">
        <label htmlFor={id}>{label}</label>
      </Box>
      <Input
        bg="rgba(15, 21, 29, 0.74)"
        borderColor="rgba(103, 232, 249, 0.24)"
        id={id}
        min="1"
        minH="44px"
        onChange={(event) => onChange(event.target.value)}
        type="number"
        value={value}
      />
    </Box>
  );
}

interface FilterButtonGroupProps {
  readonly ariaLabel: string;
  readonly children: React.ReactNode;
  readonly label: string;
}

function FilterButtonGroup({ ariaLabel, children, label }: FilterButtonGroupProps) {
  return (
    <Box mb="4">
      <Text color="#9aa7b1" fontSize="xs" mb="2">
        {label}
      </Text>
      <Flex aria-label={ariaLabel} gap="2" role="group" wrap="wrap">
        {children}
      </Flex>
    </Box>
  );
}
