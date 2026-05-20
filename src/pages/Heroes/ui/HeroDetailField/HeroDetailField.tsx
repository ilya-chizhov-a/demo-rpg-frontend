import { Flex, Text } from '@chakra-ui/react';

interface HeroDetailFieldProps {
  readonly label: string;
  readonly value: string;
}

export function HeroDetailField({ label, value }: HeroDetailFieldProps) {
  return (
    <Flex
      align="flex-start"
      as="div"
      borderBottomColor="rgba(103, 232, 249, 0.14)"
      borderBottomWidth="1px"
      gap="4"
      justify="space-between"
      py="3"
    >
      <Text as="dt" color="#9aa7b1" flexShrink="0" fontSize="sm" lineHeight="1.35">
        {label}
      </Text>
      <Text
        as="dd"
        fontWeight="bold"
        lineHeight="1.35"
        minW="0"
        overflowWrap="anywhere"
        textAlign="right"
      >
        {value}
      </Text>
    </Flex>
  );
}
