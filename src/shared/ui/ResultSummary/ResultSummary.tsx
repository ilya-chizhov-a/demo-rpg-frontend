import { Text } from '@chakra-ui/react';

interface ResultSummaryProps {
  readonly entityLabel: string;
  readonly ofLabel: string;
  readonly showingLabel: string;
  readonly totalCount: number;
  readonly visibleCount: number;
}

export function ResultSummary({
  entityLabel,
  ofLabel,
  showingLabel,
  totalCount,
  visibleCount,
}: ResultSummaryProps) {
  return (
    <Text color="#9aa7b1">
      {showingLabel}{' '}
      <Text as="span" fontWeight="bold">
        {visibleCount}
      </Text>{' '}
      {ofLabel}{' '}
      <Text as="span" fontWeight="bold">
        {totalCount}
      </Text>{' '}
      {entityLabel}
    </Text>
  );
}
