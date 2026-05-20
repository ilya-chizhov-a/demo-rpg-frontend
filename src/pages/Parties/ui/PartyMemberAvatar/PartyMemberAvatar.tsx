import { Box, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';

import type { PartyMemberViewModel } from '../../model/PartyMemberViewModel';

interface PartyMemberAvatarProps {
  readonly member: PartyMemberViewModel;
}

export function PartyMemberAvatar({ member }: PartyMemberAvatarProps) {
  const image = member.avatarImage;
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(image) && !imageError;

  return (
    <Box
      asChild
      bg="rgba(3, 10, 18, 0.66)"
      borderColor="rgba(103, 232, 249, 0.18)"
      borderRadius="md"
      borderWidth="1px"
      color="#f4f7f8"
      display="grid"
      gap="2"
      gridTemplateColumns="44px minmax(0, 1fr)"
      minH="56px"
      overflow="hidden"
      p="1.5"
      textDecoration="none"
      transition="border-color 160ms ease, background-color 160ms ease"
      _hover={{
        bg: 'rgba(34, 211, 238, 0.1)',
        borderColor: 'rgba(103, 232, 249, 0.5)',
      }}
    >
      <RouterLink to={member.href}>
        <Box
          alignItems="center"
          bg="rgba(15, 21, 29, 0.9)"
          borderColor="rgba(103, 232, 249, 0.14)"
          borderRadius="sm"
          borderWidth="1px"
          display="flex"
          h="44px"
          justifyContent="center"
          overflow="hidden"
          w="44px"
        >
          {showImage && image ? (
            <Image
              alt={image.alt}
              draggable={false}
              h="full"
              htmlHeight={image.height}
              htmlWidth={image.width}
              loading={image.loading}
              objectFit="cover"
              objectPosition="center top"
              onError={() => setImageError(true)}
              src={image.src}
              srcSet={image.srcSet}
              w="full"
            />
          ) : (
            <Text color="#67e8f9" fontSize="sm" fontWeight="bold">
              {member.title.slice(0, 1)}
            </Text>
          )}
        </Box>
        <Text
          alignSelf="center"
          fontSize="sm"
          fontWeight="medium"
          lineHeight="1.25"
          minW="0"
          overflow="hidden"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            display: '-webkit-box',
          }}
        >
          {member.title}
        </Text>
      </RouterLink>
    </Box>
  );
}
