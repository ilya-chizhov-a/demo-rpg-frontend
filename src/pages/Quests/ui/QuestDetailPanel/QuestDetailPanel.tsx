import { Badge, Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

import { DetailFactPanel } from 'src/shared/ui';
import type { QuestDetailViewModel } from '../../model/QuestDetailViewModel';
import type { QuestFormulaDescriptor } from '../../model/questUiCopy';

interface QuestDetailPanelProps {
  readonly vm: QuestDetailViewModel;
}

export const QuestDetailPanel = observer(function QuestDetailPanel({ vm }: QuestDetailPanelProps) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
      <DetailFactPanel items={vm.factItems} title={vm.copy.detail.factsTitle} />
      <FormulaPanel formulas={vm.formulaItems} title={vm.copy.detail.formulasTitle} />
    </SimpleGrid>
  );
});

interface FormulaPanelProps {
  readonly formulas: readonly QuestFormulaDescriptor[];
  readonly title: string;
}

function FormulaPanel({ formulas, title }: FormulaPanelProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Heading as="h2" fontSize="xl">
        {title}
      </Heading>
      <Stack as="dl" gap="3" mt="4">
        {formulas.map((formula) => (
          <Box
            borderBottomColor="rgba(103, 232, 249, 0.14)"
            borderBottomWidth="1px"
            key={formula.label}
            pb="3"
            _last={{ borderBottomWidth: '0', pb: '0' }}
          >
            <Text as="dt" color="#9aa7b1" fontSize="xs">
              {formula.label}
            </Text>
            <Text as="dd" color="#f4f7f8" fontSize="2xl" fontWeight="bold" lineHeight="1.1" mt="1">
              {formula.value}
            </Text>
            <Badge
              bg="rgba(56, 189, 248, 0.12)"
              borderColor="rgba(56, 189, 248, 0.34)"
              borderWidth="1px"
              color="#7dd3fc"
              mt="2"
              variant="outline"
            >
              {formula.source}
            </Badge>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
