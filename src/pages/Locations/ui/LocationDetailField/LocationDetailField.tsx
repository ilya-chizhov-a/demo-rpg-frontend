import { Flex, Text } from '@chakra-ui/react';

interface LocationDetailFieldProps {
  readonly label: string;
  readonly value: string;
}

export function LocationDetailField({ label, value }: LocationDetailFieldProps) {
  return (
    <Flex
      align="center"
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
        lineHeight="1.2"
        minW="0"
        overflow="hidden"
        textAlign="right"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {value}
      </Text>
    </Flex>
  );
}
