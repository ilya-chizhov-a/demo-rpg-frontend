import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

interface DetailBackButtonProps {
  readonly ariaLabel: string;
  readonly fallbackHref: string;
  readonly label: string;
}

interface RouterHistoryState {
  readonly idx?: unknown;
}

export function DetailBackButton({ ariaLabel, fallbackHref, label }: DetailBackButtonProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (canNavigateBackWithinApp()) {
      const currentHref = globalThis.location.href;
      runNavigation(() => navigate(-1));
      globalThis.setTimeout(() => {
        if (globalThis.location.href === currentHref) {
          runNavigation(() => navigate(fallbackHref, { replace: true }));
        }
      }, 150);
      return;
    }

    runNavigation(() => navigate(fallbackHref));
  }, [fallbackHref, navigate]);

  return (
    <Button
      aria-label={ariaLabel}
      borderColor="rgba(103, 232, 249, 0.34)"
      color="#67e8f9"
      mb="4"
      minH="44px"
      onClick={handleClick}
      size="md"
      type="button"
      variant="outline"
      w="fit-content"
      _focusVisible={{
        bg: 'rgba(34, 211, 238, 0.12)',
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.18)',
      }}
      _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
    >
      {label}
    </Button>
  );
}

function canNavigateBackWithinApp(): boolean {
  if (typeof globalThis.window === 'undefined') return false;

  const state = globalThis.history.state as RouterHistoryState | null;
  return typeof state?.idx === 'number' && state.idx > 0;
}

function runNavigation(action: () => Promise<void> | void): void {
  Promise.resolve(action()).catch((error: unknown) => {
    console.error('[DetailBackButton] navigation failed', error);
  });
}
