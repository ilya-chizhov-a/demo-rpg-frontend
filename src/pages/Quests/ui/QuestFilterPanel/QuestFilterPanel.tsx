import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useId } from 'react';
import type { ChangeEvent } from 'react';

import {
  CatalogFilterActions,
  CatalogFilterNumberField,
  CatalogFilterPanelFrame,
  CatalogFilterSelectField,
} from 'src/shared/ui';
import type { QuestsViewModel } from '../../model/QuestsViewModel';

const QUESTS_LEVEL_MAX_INPUT_ID = 'quests-level-max-input';
const QUESTS_LEVEL_MIN_INPUT_ID = 'quests-level-min-input';
const QUESTS_LOCATION_SELECT_ID = 'quests-location-select';
const QUESTS_NPC_SELECT_ID = 'quests-npc-select';
const QUESTS_REPEATABLE_INPUT_ID = 'quests-repeatable-input';

interface QuestFilterPanelProps {
  readonly showTitle?: boolean;
  readonly variant?: 'panel' | 'plain';
  readonly vm: QuestsViewModel;
}

export const QuestFilterPanel = observer(function QuestFilterPanel({
  showTitle = true,
  variant = 'panel',
  vm,
}: QuestFilterPanelProps) {
  const fieldIdPrefix = useId();
  const fieldIds = {
    levelMax: `${fieldIdPrefix}-${QUESTS_LEVEL_MAX_INPUT_ID}`,
    levelMin: `${fieldIdPrefix}-${QUESTS_LEVEL_MIN_INPUT_ID}`,
    location: `${fieldIdPrefix}-${QUESTS_LOCATION_SELECT_ID}`,
    npc: `${fieldIdPrefix}-${QUESTS_NPC_SELECT_ID}`,
    repeatable: `${fieldIdPrefix}-${QUESTS_REPEATABLE_INPUT_ID}`,
  } as const;

  return (
    <CatalogFilterPanelFrame
      showTitle={showTitle}
      title={vm.copy.filterPanelTitle}
      variant={variant}
    >
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="3">
        <CatalogFilterNumberField
          id={fieldIds.levelMin}
          label={vm.copy.levelMinLabel}
          onChange={(value) => vm.setLevelMin(value)}
          value={vm.levelMinInputValue}
        />
        <CatalogFilterNumberField
          id={fieldIds.levelMax}
          label={vm.copy.levelMaxLabel}
          onChange={(value) => vm.setLevelMax(value)}
          value={vm.levelMaxInputValue}
        />
        <CatalogFilterSelectField
          id={fieldIds.npc}
          label={vm.copy.npcSelectLabel}
          onChange={(value) => vm.setNpcId(value)}
          value={vm.activeNpcId ?? ''}
        >
          <option value="">{vm.copy.allNpcsOption}</option>
          {vm.npcOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </CatalogFilterSelectField>
        <CatalogFilterSelectField
          id={fieldIds.location}
          label={vm.copy.locationSelectLabel}
          onChange={(value) => vm.setLocationId(value)}
          value={vm.activeLocationId ?? ''}
        >
          <option value="">{vm.copy.allLocationsOption}</option>
          {vm.locationOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.displayLabel}
            </option>
          ))}
        </CatalogFilterSelectField>
      </SimpleGrid>

      <RepeatableCheckbox id={fieldIds.repeatable} vm={vm} />

      {vm.isLevelRangeValid ? null : (
        <Text color="#fb7185" fontSize="sm" role="alert">
          {vm.copy.levelRangeValidationMessage}
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

interface RepeatableCheckboxProps {
  readonly id: string;
  readonly vm: QuestsViewModel;
}

function RepeatableCheckbox({ id, vm }: RepeatableCheckboxProps) {
  return (
    <Flex
      align="center"
      bg="rgba(15, 21, 29, 0.62)"
      borderColor="rgba(103, 232, 249, 0.18)"
      borderRadius="md"
      borderWidth="1px"
      gap="3"
      minH="44px"
      px="3"
    >
      <Box asChild accentColor="#22d3ee" flexShrink="0" h="5" w="5">
        <input
          checked={vm.repeatableOnly}
          id={id}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            vm.setRepeatableOnly(event.target.checked)
          }
          type="checkbox"
        />
      </Box>
      <Box asChild color="#f4f7f8" fontSize="sm">
        <label htmlFor={id}>{vm.copy.repeatableOnlyLabel}</label>
      </Box>
    </Flex>
  );
}

function reportFilterActionError(error: unknown): void {
  console.error('[QuestFilterPanel] filter action failed', error);
}
