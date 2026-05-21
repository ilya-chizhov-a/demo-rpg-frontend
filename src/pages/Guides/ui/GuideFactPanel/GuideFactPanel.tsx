import { Box, Button, Heading, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';

interface GuideFactPanelProps {
  readonly actionHref?: string;
  readonly actionLabel?: string;
  readonly children?: ReactNode;
  readonly description?: string;
  readonly isExternal?: boolean;
  readonly title: string;
}

export function GuideFactPanel({
  actionHref,
  actionLabel,
  children,
  description,
  isExternal = false,
  title,
}: GuideFactPanelProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.86)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="3"
      minW="0"
      p="5"
    >
      <Heading as="h3" fontSize="lg" lineHeight="1.25">
        {title}
      </Heading>
      {description ? (
        <Text color="#9aa7b1" lineHeight="1.6">
          {description}
        </Text>
      ) : null}
      {children}
      {actionHref && actionLabel ? (
        <Button
          asChild
          alignSelf="end"
          borderColor="rgba(103, 232, 249, 0.28)"
          color="#67e8f9"
          justifySelf="start"
          minH="44px"
          variant="outline"
          _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
        >
          {isExternal ? (
            <a href={actionHref} rel="noreferrer" target="_blank">
              {actionLabel}
            </a>
          ) : (
            <RouterLink to={actionHref}>{actionLabel}</RouterLink>
          )}
        </Button>
      ) : null}
    </Box>
  );
}
