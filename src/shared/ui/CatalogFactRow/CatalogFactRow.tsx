import { Flex, Text } from '@chakra-ui/react';

interface CatalogFactRowProps {
  readonly label: string;
  readonly value: string;
}

export function CatalogFactRow({ label, value }: CatalogFactRowProps) {
  return (
    <Flex
      align="center"
      as="div"
      borderBottomColor="rgba(103, 232, 249, 0.14)"
      borderBottomWidth="1px"
      gap="3"
      justify="space-between"
      py="3"
    >
      <Text as="dt" color="#9aa7b1" flexShrink="0" fontSize="xs" lineHeight="1.2">
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
