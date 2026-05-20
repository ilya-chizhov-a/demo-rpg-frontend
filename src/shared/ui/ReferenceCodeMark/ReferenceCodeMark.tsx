import { Box, Text } from '@chakra-ui/react';

interface ReferenceCodeMarkProps {
  readonly accentColor?: string;
  readonly bg?: string;
  readonly borderColor?: string;
  readonly label: string;
}

export function ReferenceCodeMark({
  accentColor = '#67e8f9',
  bg = 'rgba(34, 211, 238, 0.12)',
  borderColor = 'rgba(103, 232, 249, 0.34)',
  label,
}: ReferenceCodeMarkProps) {
  return (
    <Box
      alignItems="center"
      bg={bg}
      borderColor={borderColor}
      borderRadius="md"
      borderWidth="1px"
      display="flex"
      flex="0 0 72px"
      h="72px"
      justifyContent="center"
      overflow="hidden"
      w="72px"
    >
      <Text color={accentColor} fontSize="xl" fontWeight="bold" lineHeight="1">
        {label}
      </Text>
    </Box>
  );
}
