import { Box, Heading, Link } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { Link as RouterLink } from 'react-router';

import type { HeroItemViewModel } from '../../model/HeroItemViewModel';
import type { HeroesPageCopy } from '../../model/heroUiCopy';
import { HeroPortraitVisual } from '../HeroPortraitVisual/HeroPortraitVisual';

interface HeroCardProps {
  readonly copy: HeroesPageCopy;
  readonly item: HeroItemViewModel;
}

export const HeroCard = observer(({ copy, item }: HeroCardProps) => {
  return (
    <Box
      as="li"
      bg="rgba(18, 24, 32, 0.9)"
      borderColor="rgba(103, 232, 249, 0.16)"
      borderRadius="md"
      borderWidth="1px"
      minW="0"
      overflow="hidden"
      role="group"
      shadow="0 18px 42px rgba(0, 0, 0, 0.24)"
      transition="box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease"
      _focusWithin={{
        borderColor: '#67e8f9',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.16), 0 22px 44px rgba(0, 0, 0, 0.32)',
      }}
      _hover={{
        bg: '#17212b',
        borderColor: 'rgba(103, 232, 249, 0.58)',
        boxShadow: '0 22px 44px rgba(0, 0, 0, 0.32)',
      }}
    >
      <Link
        aria-label={item.openAriaLabel}
        asChild
        color="inherit"
        display="block"
        position="relative"
        textDecoration="none"
        _hover={{ textDecoration: 'none' }}
      >
        <RouterLink to={item.detailHref}>
          <HeroPortraitVisual
            image={item.portraitImage}
            placeholderTitle={copy.portraitPlaceholderTitle}
          />
          <Box
            bg="linear-gradient(180deg, rgba(7, 16, 24, 0), rgba(7, 16, 24, 0.94))"
            bottom="0"
            left="0"
            px="4"
            pb="4"
            pt="12"
            position="absolute"
            right="0"
          >
            <Heading
              as="h2"
              fontSize="lg"
              lineHeight="1.2"
              overflow="hidden"
              textAlign="left"
              textShadow="0 2px 12px rgba(0, 0, 0, 0.7)"
              style={{
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                display: '-webkit-box',
              }}
            >
              {item.title}
            </Heading>
          </Box>
        </RouterLink>
      </Link>
    </Box>
  );
});
