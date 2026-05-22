import { Box } from '@chakra-ui/react';

import type { HomeCapabilityArtworkKind } from '../../model/HomeCapabilityItemViewModel';

interface HomeCapabilityArtworkProps {
  readonly kind: HomeCapabilityArtworkKind;
}

interface ArtworkPalette {
  readonly accent: string;
  readonly secondary: string;
  readonly dim: string;
}

const palettes: Record<HomeCapabilityArtworkKind, ArtworkPalette> = {
  guides: { accent: '#7dd3fc', dim: 'rgba(125, 211, 252, 0.18)', secondary: '#c4b5fd' },
  heroes: { accent: '#67e8f9', dim: 'rgba(103, 232, 249, 0.2)', secondary: '#86efac' },
  items: { accent: '#5eead4', dim: 'rgba(94, 234, 212, 0.18)', secondary: '#93c5fd' },
  monsters: { accent: '#a78bfa', dim: 'rgba(167, 139, 250, 0.18)', secondary: '#fb7185' },
  quests: { accent: '#38bdf8', dim: 'rgba(56, 189, 248, 0.18)', secondary: '#f97316' },
  world: { accent: '#22d3ee', dim: 'rgba(34, 211, 238, 0.2)', secondary: '#34d399' },
};

const starmapNodes = [
  { x: 84, y: 60, r: 1.6 },
  { x: 138, y: 96, r: 2.4 },
  { x: 196, y: 46, r: 1.8 },
  { x: 282, y: 86, r: 2.2 },
  { x: 362, y: 54, r: 1.5 },
  { x: 444, y: 92, r: 2 },
  { x: 556, y: 50, r: 1.7 },
  { x: 682, y: 82, r: 2.1 },
  { x: 730, y: 144, r: 1.6 },
];

export function HomeCapabilityArtwork({ kind }: HomeCapabilityArtworkProps) {
  const palette = palettes[kind];
  const idPrefix = `home-card-${kind}`;

  return (
    <Box
      aria-hidden="true"
      data-artwork-kind={kind}
      h="full"
      inset="0"
      position="absolute"
      transition="filter 220ms ease, transform 220ms ease"
      w="full"
      _groupHover={{
        filter: 'saturate(1.16) brightness(1.08)',
        transform: 'scale(1.025)',
      }}
    >
      <svg
        focusable="false"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 360"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient cx="76%" cy="20%" id={`${idPrefix}-glow`} r="70%">
            <stop offset="0%" stopColor={palette.dim} />
            <stop offset="48%" stopColor="rgba(15, 23, 42, 0.14)" />
            <stop offset="100%" stopColor="rgba(7, 11, 16, 0.96)" />
          </radialGradient>
          <linearGradient id={`${idPrefix}-horizon`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#101923" />
            <stop offset="58%" stopColor="#0b1118" />
            <stop offset="100%" stopColor="#070b10" />
          </linearGradient>
          <filter id={`${idPrefix}-soft-glow`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        <rect fill={`url(#${idPrefix}-horizon)`} height="360" width="800" />
        <rect fill={`url(#${idPrefix}-glow)`} height="360" width="800" />
        {renderCommonAtlas(palette)}
        {renderArtwork(kind, palette)}
      </svg>
    </Box>
  );
}

function renderCommonAtlas(palette: ArtworkPalette) {
  return (
    <g opacity="0.72">
      <path
        d="M-20 280 C100 230 170 300 296 250 S512 218 636 270 778 242 826 210"
        fill="none"
        stroke="#203443"
        strokeWidth="2"
      />
      <path
        d="M-8 318 C110 282 206 326 330 292 S542 260 664 304 770 288 830 264"
        fill="none"
        stroke="#172633"
        strokeWidth="3"
      />
      <path d="M72 58 L138 96 L196 46 L282 86 L362 54 L444 92 L556 50 L682 82 L730 144" fill="none" stroke={palette.dim} strokeWidth="1.2" />
      {starmapNodes.map((node) => (
        <circle
          cx={node.x}
          cy={node.y}
          fill={palette.accent}
          key={`${node.x}-${node.y}`}
          opacity="0.72"
          r={node.r}
        />
      ))}
      <g opacity="0.24" stroke="#7dd3fc" strokeWidth="0.8">
        <path d="M52 40 H760" />
        <path d="M80 126 H740" />
        <path d="M110 218 H710" />
        <path d="M148 12 V336" />
        <path d="M348 18 V342" />
        <path d="M586 8 V332" />
      </g>
    </g>
  );
}

function renderArtwork(kind: HomeCapabilityArtworkKind, palette: ArtworkPalette) {
  if (kind === 'world') return renderWorld(palette);
  if (kind === 'heroes') return renderHeroes(palette);
  if (kind === 'items') return renderItems(palette);
  if (kind === 'monsters') return renderMonsters(palette);
  if (kind === 'quests') return renderQuests(palette);
  return renderGuides(palette);
}

function renderWorld(palette: ArtworkPalette) {
  const routes = [
    'M70 278 C128 244 178 256 232 224 S340 178 410 206 506 160 626 174 730 110',
    'M106 306 C164 284 212 294 268 258 S382 228 452 250 552 206 620 238 704 214',
    'M154 230 C224 190 292 214 342 168 S452 108 520 132 606 96 688 126 760 76',
  ];
  const nodes = [
    [102, 272],
    [218, 226],
    [330, 184],
    [442, 206],
    [550, 162],
    [658, 132],
    [252, 266],
    [514, 218],
    [704, 214],
  ];

  return (
    <g>
      <g fill="rgba(34, 211, 238, 0.08)" stroke={palette.accent} strokeWidth="1.3">
        <path d="M68 268 C102 222 154 204 198 232 228 250 250 230 278 210 320 182 360 192 392 226 430 266 494 250 536 220 580 186 638 188 684 222 704 238 732 234 760 214 L760 314 68 314 Z" opacity="0.34" />
        <path d="M126 260 C156 230 190 244 220 260 M294 214 C334 196 358 218 388 236 M488 222 C526 194 574 204 604 236" fill="none" opacity="0.8" />
      </g>
      <g fill="none" strokeLinecap="round">
        {routes.map((route, index) => (
          <path
            d={route}
            key={route}
            opacity={index === 0 ? 0.92 : 0.62}
            stroke={index === 1 ? palette.secondary : palette.accent}
            strokeDasharray={index === 2 ? '6 8' : undefined}
            strokeWidth={index === 0 ? 2.6 : 1.7}
          />
        ))}
      </g>
      {nodes.map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} fill={palette.accent} filter="url(#home-card-world-soft-glow)" opacity="0.5" r="12" />
          <circle cx={x} cy={y} fill="#071018" r="7" stroke={index % 3 === 0 ? palette.secondary : palette.accent} strokeWidth="2" />
          <circle cx={x} cy={y} fill={index % 3 === 0 ? palette.secondary : palette.accent} r="2.6" />
        </g>
      ))}
      <g stroke={palette.secondary} strokeWidth="2" transform="translate(648 58)">
        <circle cx="48" cy="48" fill="rgba(52, 211, 153, 0.08)" r="42" />
        <path d="M48 12 L58 48 48 84 38 48 Z" fill="rgba(52, 211, 153, 0.24)" />
        <circle cx="48" cy="48" fill="#071018" r="9" />
      </g>
    </g>
  );
}

function renderHeroes(palette: ArtworkPalette) {
  return (
    <g>
      <path d="M82 296 C138 242 194 250 238 278 286 310 342 284 394 250 462 206 530 232 582 274 634 316 692 286 742 246" fill="none" opacity="0.56" stroke={palette.accent} strokeDasharray="7 8" strokeWidth="1.6" />
      <g transform="translate(92 104)">
        <path d="M78 180 L104 64 128 180 Z" fill="rgba(34, 211, 238, 0.14)" stroke={palette.accent} strokeWidth="1.4" />
        <circle cx="104" cy="44" fill="#0b1118" r="18" stroke={palette.accent} strokeWidth="2" />
        <path d="M104 60 L104 158 M64 94 H144 M82 132 L58 184 M126 132 L154 184" stroke="#d8e0e8" strokeLinecap="round" strokeWidth="8" />
        <path d="M104 72 C78 100 76 146 48 196 L160 196 C132 148 132 100 104 72 Z" fill="rgba(7, 11, 16, 0.78)" stroke="#203443" />
      </g>
      <g opacity="0.86" transform="translate(318 78)">
        <circle cx="68" cy="52" fill="#0b1118" r="17" stroke={palette.secondary} strokeWidth="2" />
        <path d="M68 70 L68 164 M38 100 L98 100 M44 164 L92 164" stroke="#d8e0e8" strokeLinecap="round" strokeWidth="7" />
        <path d="M112 44 L112 174" stroke={palette.secondary} strokeLinecap="round" strokeWidth="5" />
        <circle cx="112" cy="34" fill={palette.secondary} opacity="0.8" r="8" />
      </g>
      <g opacity="0.82" transform="translate(538 112)">
        <circle cx="48" cy="36" fill="#0b1118" r="15" stroke="#93c5fd" strokeWidth="2" />
        <path d="M48 52 L48 142 M24 86 C66 54 102 82 74 128" fill="none" stroke="#d8e0e8" strokeLinecap="round" strokeWidth="6" />
        <path d="M18 92 C64 54 118 88 78 150" fill="none" stroke={palette.accent} strokeWidth="2" />
      </g>
      {[
        [388, 48, 'M0 -14 L13 8 -13 8 Z'],
        [478, 106, 'M-12 -12 H12 V12 H-12 Z'],
        [584, 82, 'M0 -14 L14 0 0 14 -14 0 Z'],
        [292, 156, 'M0 -13 A13 13 0 1 0 1 -13'],
      ].map(([x, y, d]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path d={d as string} fill="rgba(34, 211, 238, 0.1)" stroke={palette.accent} strokeWidth="2" />
        </g>
      ))}
      <path d="M388 48 L478 106 L584 82 M478 106 L292 156" fill="none" opacity="0.72" stroke={palette.dim} strokeWidth="1.4" />
    </g>
  );
}

function renderItems(palette: ArtworkPalette) {
  return (
    <g>
      <g transform="translate(132 32)">
        <path d="M92 16 L112 36 82 204 60 226 48 214 68 192 Z" fill="rgba(147, 197, 253, 0.28)" stroke={palette.secondary} strokeWidth="2" />
        <path d="M34 214 H126 M52 236 H108" stroke="#d8e0e8" strokeLinecap="round" strokeWidth="9" />
        <circle cx="80" cy="214" fill="#071018" r="10" stroke={palette.accent} strokeWidth="2" />
      </g>
      <g transform="translate(356 92)">
        <path d="M88 0 C132 26 160 34 188 38 178 134 144 190 88 226 32 190 -2 134 -12 38 16 34 44 26 88 0 Z" fill="rgba(94, 234, 212, 0.12)" stroke={palette.accent} strokeWidth="2.4" />
        <path d="M88 28 V190 M28 64 C70 78 108 78 148 64 M42 120 C70 132 110 132 136 120" fill="none" opacity="0.65" stroke={palette.accent} strokeWidth="1.5" />
      </g>
      <g transform="translate(612 98)">
        <path d="M58 0 L104 38 84 112 58 148 32 112 12 38 Z" fill="rgba(125, 211, 252, 0.18)" stroke="#7dd3fc" strokeWidth="2" />
        <path d="M58 0 V148 M12 38 H104 M32 112 H84" opacity="0.7" stroke="#7dd3fc" strokeWidth="1.2" />
      </g>
      <g fill="none" stroke={palette.dim} strokeWidth="1.4">
        <circle cx="420" cy="206" r="104" />
        <circle cx="420" cy="206" r="72" />
        <path d="M316 206 H524 M420 102 V310 M348 134 L492 278 M492 134 L348 278" />
      </g>
      {[82, 142, 202, 614, 674, 734].map((x, index) => (
        <g key={x} opacity="0.82" transform={`translate(${x} ${index % 2 === 0 ? 280 : 252})`}>
          <rect fill="rgba(15, 23, 42, 0.72)" height="24" rx="4" stroke={palette.accent} width="50" />
          <path d="M8 12 H42" stroke={palette.secondary} strokeWidth="2" />
        </g>
      ))}
    </g>
  );
}

function renderMonsters(palette: ArtworkPalette) {
  return (
    <g>
      <g transform="translate(424 28)">
        <path d="M92 42 C56 18 28 20 14 42 40 44 54 58 60 82 32 104 14 138 22 188 34 262 92 300 154 282 218 264 246 206 224 142 216 118 198 96 174 82 182 58 196 44 222 42 208 20 180 18 144 42 130 34 108 34 92 42 Z" fill="rgba(7, 11, 16, 0.86)" stroke={palette.secondary} strokeWidth="2.4" />
        <path d="M86 118 L126 94 166 118 M82 176 C114 196 154 196 186 176" fill="none" stroke={palette.accent} strokeLinecap="round" strokeWidth="3" />
        <circle cx="104" cy="132" fill="#67e8f9" r="5" />
        <circle cx="148" cy="132" fill="#67e8f9" r="5" />
        <path d="M30 188 C-12 208 -16 250 32 266 M218 188 C262 208 266 250 218 266" fill="none" stroke="#d8e0e8" strokeLinecap="round" strokeWidth="10" />
      </g>
      <g opacity="0.72" stroke={palette.secondary} strokeLinecap="round" strokeWidth="8">
        <path d="M92 92 L180 188" />
        <path d="M122 74 L218 186" />
        <path d="M152 60 L250 178" />
      </g>
      <path d="M70 294 C158 246 240 276 318 230 380 194 468 232 534 260 612 294 698 254 760 218" fill="none" stroke={palette.accent} strokeDasharray="5 8" strokeWidth="1.7" />
      {(
        [
          [118, 286],
          [278, 238],
          [536, 262],
          [674, 238],
        ] satisfies readonly [number, number][]
      ).map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} fill={index === 1 ? palette.secondary : palette.accent} opacity="0.3" r="17" />
          <path d={`M${x} ${y - 14} L${x + 13} ${y} L${x} ${y + 14} L${x - 13} ${y} Z`} fill="#071018" stroke={index === 1 ? palette.secondary : palette.accent} strokeWidth="2" />
        </g>
      ))}
    </g>
  );
}

function renderQuests(palette: ArtworkPalette) {
  const nodes = [
    [140, 178],
    [260, 112],
    [260, 244],
    [404, 82],
    [404, 178],
    [404, 278],
    [566, 136],
    [566, 240],
    [700, 188],
  ] satisfies readonly [number, number][];

  return (
    <g>
      <g transform="translate(58 78)">
        <path d="M0 34 C34 4 76 0 114 24 V218 C70 192 32 196 0 222 Z" fill="rgba(125, 211, 252, 0.08)" stroke={palette.accent} strokeWidth="2" />
        <path d="M114 24 C154 0 196 4 228 34 V222 C194 196 156 192 114 218 Z" fill="rgba(249, 115, 22, 0.08)" stroke={palette.secondary} strokeWidth="2" />
        <path d="M34 62 H94 M34 96 H88 M34 130 H100 M146 66 H198 M144 104 H204 M146 144 H190" stroke="#d8e0e8" strokeLinecap="round" strokeWidth="3" opacity="0.52" />
      </g>
      <g fill="none" stroke={palette.dim} strokeWidth="2.3">
        <path d="M140 178 L260 112 L404 82 L566 136 L700 188" />
        <path d="M140 178 L260 244 L404 278 L566 240 L700 188" />
        <path d="M260 112 L404 178 L566 136" />
        <path d="M260 244 L404 178 L566 240" />
      </g>
      {nodes.map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} fill={index === 0 || index === nodes.length - 1 ? palette.secondary : palette.accent} filter="url(#home-card-quests-soft-glow)" opacity="0.34" r="18" />
          <circle cx={x} cy={y} fill="#071018" r="12" stroke={index % 2 === 0 ? palette.secondary : palette.accent} strokeWidth="2.2" />
          <path d={`M${x - 5} ${y} H${x + 5} M${x} ${y - 5} V${y + 5}`} stroke="#d8e0e8" strokeLinecap="round" strokeWidth="2" />
        </g>
      ))}
      <g transform="translate(640 76)">
        <path d="M34 0 L68 28 V82 H0 V28 Z" fill="rgba(249, 115, 22, 0.12)" stroke={palette.secondary} strokeWidth="2" />
        <path d="M0 28 H68 M22 52 H46" stroke={palette.secondary} strokeWidth="2" />
      </g>
    </g>
  );
}

function renderGuides(palette: ArtworkPalette) {
  return (
    <g>
      <g transform="translate(118 82)">
        <path d="M0 28 C56 2 112 6 160 34 V226 C112 198 56 198 0 226 Z" fill="rgba(125, 211, 252, 0.1)" stroke={palette.accent} strokeWidth="2.2" />
        <path d="M160 34 C210 6 266 2 320 28 V226 C266 198 210 198 160 226 Z" fill="rgba(196, 181, 253, 0.1)" stroke={palette.secondary} strokeWidth="2.2" />
        <path d="M42 66 H128 M34 100 H136 M46 134 H124 M198 66 H278 M190 102 H284 M202 140 H266" opacity="0.55" stroke="#d8e0e8" strokeLinecap="round" strokeWidth="3" />
        <path d="M160 34 V226" stroke="#203443" strokeWidth="2" />
      </g>
      <g transform="translate(560 72)">
        <circle cx="78" cy="78" fill="rgba(125, 211, 252, 0.08)" r="64" stroke={palette.accent} strokeWidth="2" />
        <path d="M78 20 L92 78 78 136 64 78 Z" fill="rgba(125, 211, 252, 0.2)" stroke={palette.accent} strokeWidth="2" />
        <path d="M20 78 H136 M78 20 V136 M38 38 L118 118 M118 38 L38 118" opacity="0.48" stroke={palette.secondary} strokeWidth="1.4" />
      </g>
      <g transform="translate(508 214)">
        <rect fill="rgba(7, 11, 16, 0.68)" height="70" rx="8" stroke={palette.secondary} strokeWidth="2" width="156" />
        <path d="M20 22 H120 M20 42 H98" stroke="#d8e0e8" strokeLinecap="round" strokeWidth="3" opacity="0.58" />
        <path d="M130 8 L144 22 L130 36 L116 22 Z" fill={palette.secondary} opacity="0.42" />
      </g>
      <path d="M92 286 C190 250 298 288 398 236 500 184 622 214 738 170" fill="none" stroke={palette.dim} strokeDasharray="6 9" strokeWidth="1.8" />
    </g>
  );
}
