import { Box, Heading, Image, Text } from '@chakra-ui/react';

import { CatalogActionButton } from 'src/shared/ui';
import type { HomeCapabilityItemViewModel } from '../../model/HomeCapabilityItemViewModel';
import { HomeCapabilityArtwork } from '../HomeCapabilityArtwork/HomeCapabilityArtwork';

interface HomeCapabilityCardProps {
  readonly item: HomeCapabilityItemViewModel;
}

export function HomeCapabilityCard({ item }: HomeCapabilityCardProps) {
  return (
    <Box
      as="article"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gridTemplateRows="auto auto"
      h="full"
      overflow="hidden"
      role="group"
      shadow="0 14px 34px rgba(0, 0, 0, 0.22)"
      transition="transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease"
      _focusWithin={{
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.16), 0 18px 36px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-2px)',
      }}
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.58)',
        boxShadow: '0 18px 36px rgba(0, 0, 0, 0.3)',
        transform: 'translateY(-2px)',
      }}
    >
      <Box
        aspectRatio={{ base: '16 / 9', md: '16 / 8', xl: '2 / 1' }}
        bg="#0f151d"
        borderBottomColor="rgba(103, 232, 249, 0.14)"
        borderBottomWidth="1px"
        overflow="hidden"
        position="relative"
      >
        {item.artworkImageSrc ? (
          <Image
            alt=""
            aria-hidden="true"
            data-artwork-kind={item.artworkKind}
            h="full"
            objectFit="cover"
            src={item.artworkImageSrc}
            transition="filter 220ms ease, transform 220ms ease"
            w="full"
            _groupHover={{
              filter: 'saturate(1.12) brightness(1.06)',
              transform: 'scale(1.025)',
            }}
          />
        ) : (
          <HomeCapabilityArtwork kind={item.artworkKind} />
        )}
        <Box
          bgImage="linear-gradient(180deg, rgba(7, 11, 16, 0) 58%, rgba(7, 11, 16, 0.24) 100%)"
          inset="0"
          pointerEvents="none"
          position="absolute"
        />
      </Box>

      <Box
        alignItems="start"
        display="grid"
        gap={{ base: '2.5', md: '3' }}
        gridTemplateColumns={{ base: '1fr', md: 'minmax(0, 1fr) auto' }}
        minH={{ md: '88px' }}
        px={{ base: '3', md: '4' }}
        py="2.5"
      >
        <Box minW="0">
          <Heading as="h3" fontSize="lg" lineHeight="1.2">
            {item.title}
          </Heading>
          <Text color="#9aa7b1" fontSize="sm" lineClamp={2} lineHeight="1.45" mt="1.5">
            {item.description}
          </Text>
        </Box>

        <Box justifySelf={{ base: 'start', md: 'end' }} w="fit-content">
          <CatalogActionButton to={item.href}>{item.actionLabel}</CatalogActionButton>
        </Box>
      </Box>
    </Box>
  );
}
