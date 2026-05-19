import { Box, Skeleton } from '@chakra-ui/react';

interface DetailSkeletonPanelProps {
  readonly lineWidths: readonly string[];
  readonly titleWidth: string;
}

export function DetailSkeletonPanel({ lineWidths, titleWidth }: DetailSkeletonPanelProps) {
  return (
    <Box
      bg="rgba(18, 24, 32, 0.82)"
      borderColor="rgba(103, 232, 249, 0.14)"
      borderRadius="md"
      borderWidth="1px"
      p="6"
    >
      <Skeleton h="6" mb="4" w={titleWidth} />
      {lineWidths.map((width, index) => (
        <Skeleton
          key={`${width}-${index}`}
          h="4"
          mb={index === lineWidths.length - 1 ? undefined : '3'}
          w={width}
        />
      ))}
    </Box>
  );
}
