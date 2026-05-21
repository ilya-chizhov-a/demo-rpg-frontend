import { Button, Flex } from '@chakra-ui/react';

interface CatalogFilterActionsProps {
  readonly applyLabel: string;
  readonly canApply: boolean;
  readonly canReset: boolean;
  readonly onApply: () => void;
  readonly onReset: () => void;
  readonly resetLabel: string;
}

export function CatalogFilterActions({
  applyLabel,
  canApply,
  canReset,
  onApply,
  onReset,
  resetLabel,
}: CatalogFilterActionsProps) {
  return (
    <Flex gap="2" justify="flex-end" wrap="wrap">
      {canReset ? (
        <Button minH="44px" onClick={onReset} type="button" variant="ghost">
          {resetLabel}
        </Button>
      ) : null}
      <Button
        bg="#22d3ee"
        color="var(--color-text-on-accent)"
        disabled={!canApply}
        minH="44px"
        onClick={onApply}
        type="button"
        _hover={{ bg: '#67e8f9' }}
      >
        {applyLabel}
      </Button>
    </Flex>
  );
}
