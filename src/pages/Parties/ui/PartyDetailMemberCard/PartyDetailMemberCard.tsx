import { Badge, Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import type { PartyDetailMemberViewModel } from '../../model/PartyDetailMemberViewModel';
import type { PartiesPageCopy } from '../../model/partyUiCopy';

interface PartyDetailMemberCardProps {
  readonly copy: PartiesPageCopy;
  readonly formatLevel: (value: number) => string;
  readonly member: PartyDetailMemberViewModel;
}

export function PartyDetailMemberCard({ copy, formatLevel, member }: PartyDetailMemberCardProps) {
  const image = member.portraitImage;

  return (
    <Box
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      display="grid"
      gap="4"
      gridTemplateRows="auto 1fr auto"
      minH="360px"
      overflow="hidden"
      role="group"
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.58)',
      }}
    >
      <Box
        alignItems="center"
        aspectRatio="3 / 4"
        bg="rgba(3, 10, 18, 0.72)"
        borderBottomColor="rgba(103, 232, 249, 0.12)"
        borderBottomWidth="1px"
        display="flex"
        justifyContent="center"
        overflow="hidden"
      >
        {image ? (
          <Image
            alt={image.alt}
            draggable={false}
            h="full"
            htmlHeight={image.height}
            htmlWidth={image.width}
            loading={image.loading}
            objectFit="cover"
            objectPosition="center top"
            src={image.src}
            srcSet={image.srcSet}
            w="full"
          />
        ) : (
          <Text color="#67e8f9" fontSize="3xl" fontWeight="bold">
            {member.title.slice(0, 1)}
          </Text>
        )}
      </Box>

      <Box px="5">
        <Flex align="center" gap="2" justify="space-between">
          <Badge colorPalette="teal" variant="subtle">
            {copy.detail.levelLabel} {formatLevel(member.level)}
          </Badge>
          {member.isVeteran ? (
            <Badge colorPalette="orange" variant="subtle">
              {copy.detail.heroVeteranBadge}
            </Badge>
          ) : null}
        </Flex>
        <Heading
          as="h3"
          fontSize="lg"
          lineHeight="1.2"
          mt="4"
          overflow="hidden"
          style={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            display: '-webkit-box',
          }}
        >
          {member.title}
        </Heading>
        <Text color="#9aa7b1" fontSize="sm" mt="2">
          {copy.detail.classLabel}: {member.classTitle}
        </Text>
      </Box>

      <Box px="5" pb="5">
        <Button
          asChild
          borderColor="rgba(103, 232, 249, 0.34)"
          color="#67e8f9"
          minH="44px"
          variant="outline"
          w="full"
          _hover={{ bg: 'rgba(34, 211, 238, 0.12)', borderColor: '#67e8f9' }}
        >
          <RouterLink to={member.href}>{copy.detail.openHeroAction}</RouterLink>
        </Button>
      </Box>
    </Box>
  );
}
