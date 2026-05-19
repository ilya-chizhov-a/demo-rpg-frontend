import { Flex, Text } from '@chakra-ui/react';

interface CatalogFactRowProps {
  readonly label: string;
  readonly value: string;
  readonly wrapValue?: boolean;
}

export function CatalogFactRow({ label, value, wrapValue = false }: CatalogFactRowProps) {
  return (
    <Flex
      align={wrapValue ? 'flex-start' : 'center'}
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
        lineHeight={wrapValue ? '1.25' : '1.2'}
        minW="0"
        overflow="hidden"
        overflowWrap={wrapValue ? 'anywhere' : undefined}
        textAlign="right"
        textOverflow={wrapValue ? undefined : 'ellipsis'}
        whiteSpace={wrapValue ? 'normal' : 'nowrap'}
        style={
          wrapValue
            ? {
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                display: '-webkit-box',
              }
            : undefined
        }
      >
        {value}
      </Text>
    </Flex>
  );
}
