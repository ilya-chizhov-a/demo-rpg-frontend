import { Box, Flex, Text } from '@chakra-ui/react';

import { BrandCompassIcon } from './AppLayoutIcons';

interface HeaderBrandContentProps {
  readonly variant?: 'dialog' | 'header';
}

export function HeaderBrandContent({ variant = 'header' }: HeaderBrandContentProps) {
  const isDialog = variant === 'dialog';

  return (
    <Flex align="center" gap={isDialog ? '3' : { base: '2', md: '3' }}>
      <Box
        alignItems="center"
        bg="rgba(34, 211, 238, 0.1)"
        borderColor="rgba(103, 232, 249, 0.46)"
        borderRadius="sm"
        borderWidth="1px"
        boxShadow="inset 0 0 18px rgba(34, 211, 238, 0.16), 0 0 22px rgba(34, 211, 238, 0.08)"
        boxSize={isDialog ? '11' : { base: '10', md: '12' }}
        color="#67e8f9"
        display="inline-flex"
        justifyContent="center"
      >
        <BrandCompassIcon />
      </Box>
      <Text
        as="span"
        fontSize={isDialog ? 'lg' : undefined}
        fontWeight={isDialog ? 'bold' : undefined}
        whiteSpace="nowrap"
      >
        Branching Tales
      </Text>
    </Flex>
  );
}
