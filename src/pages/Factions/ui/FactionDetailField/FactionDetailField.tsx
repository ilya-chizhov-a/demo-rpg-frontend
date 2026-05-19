import { Flex, Text } from '@chakra-ui/react';

interface FactionDetailFieldProps {
  readonly label: string;
  readonly value: string;
}

export function FactionDetailField({ label, value }: FactionDetailFieldProps) {
  return (
    <Flex
      align="flex-start"
      as="div"
      borderBottomColor="rgba(148, 163, 184, 0.2)"
      borderBottomWidth="1px"
      gap="4"
      justify="space-between"
      minH="44px"
      py="2"
      _last={{ borderBottomWidth: '0' }}
    >
      <Text as="dt" color="#9aa7b1" flexShrink="0" fontSize="sm" lineHeight="1.2">
        {label}
      </Text>
      <Text
        as="dd"
        fontSize="sm"
        fontWeight="bold"
        lineHeight="1.25"
        minW="0"
        overflow="hidden"
        overflowWrap="anywhere"
        textAlign="right"
        whiteSpace="normal"
        style={{
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          display: '-webkit-box',
        }}
      >
        {value}
      </Text>
    </Flex>
  );
}
