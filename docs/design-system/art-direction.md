# Art Direction And Image Prompts

This document defines the Branching Tales visual world for generated or
commissioned entity imagery. Use it before creating portraits, icons, crests,
maps, monster illustrations, or marketing images.

## World Premise

Branching Tales is a fantasy adventurer's guild simulator built to demonstrate
structured content. The world should feel practical and lived-in: guild records,
regional maps, field notes, item cards, faction crests, and bestiary entries.

The tone is not grimdark and not cartoon comedy. It is calm, readable, and
slightly storybook-like, with enough detail to make file fields useful in a data
demo.

## Global Style

| Aspect | Direction |
|---|---|
| Rendering | Clean painterly realism with crisp silhouettes. |
| Detail | Medium detail; readable at catalog thumbnail size. |
| Lighting | Natural soft light, clear subject separation. |
| Palette | Earth neutrals plus distinct accent colors per entity; avoid all-purple or all-brown sets. |
| Composition | Centered subject, predictable crop, no extreme perspective. |
| Background | Simple contextual background or transparent/flat background for icons. |
| Text | No text inside generated images. UI renders labels separately. |
| Consistency | Same camera distance and rendering family within each asset type. |

## Negative Prompt Baseline

Use this negative prompt for generated bitmap assets unless the tool requires a
different format:

```text
text, logo, watermark, signature, blurry, low resolution, overexposed, dark
muddy scene, extreme fisheye, cropped face, extra limbs, malformed hands,
duplicate subject, gore, horror, modern firearms, sci-fi machinery, anime style,
chibi style, flat clipart, UI frame, border, label
```

## Asset Types

### Hero Portraits

Use for `heroes.portrait`.

```text
Portrait of a fantasy adventurer for a guild record, {class} from {region},
{short personality cue}, clean painterly realism, three-quarter bust,
clear face, practical adventuring clothes, subtle class-specific gear,
soft natural light, simple neutral background, consistent catalog portrait,
high detail, no text, no frame
```

### NPC Portraits

Use for `npcs.portrait`.

```text
Portrait of a fantasy non-player character, {title or occupation} from
{location}, practical clothing, expressive but restrained face, clean painterly
realism, three-quarter bust, simple background, readable at small thumbnail
size, no text, no frame
```

### Monster Illustrations

Use for `monsters.image`.

```text
Bestiary illustration of {monster_name}, fantasy creature from {region},
full body visible, clear silhouette, natural pose, clean painterly realism,
simple environmental ground plane, readable anatomy, medium detail, no gore,
no text, no frame
```

### Item Icons

Use for `items.icon`.

For SVG/vector icons, prefer hand-authored or vector pipeline assets. If
bitmap generation is used as a reference:

```text
Single fantasy item icon, {item_name}, isolated object, centered, orthographic
view, crisp silhouette, simple studio lighting, transparent or plain light
background, high readability at 64px, no text, no border, no UI frame
```

### Ability Icons

Use for `abilities.icon`.

```text
Fantasy ability icon concept, {ability_name}, symbolic single object or effect,
centered composition, crisp silhouette, limited color palette, readable at 64px,
no text, no border, no UI frame
```

### Faction Crests

Use for `factions.crest`.

Prefer SVG/vector. Bitmap reference prompt:

```text
Heraldic faction crest for {faction_name}, symbol based on {faction_theme},
simple strong silhouette, two or three colors, symmetrical emblem, transparent
background, no text, no motto, no border frame
```

### Location Maps

Use for `locations.map`.

```text
Readable fantasy regional map of {location_name}, parchment-inspired but clean,
top-down cartographic view, clear terrain shapes, roads and landmarks, no text
labels, balanced neutral palette with distinct terrain accents, high resolution,
no decorative border
```

### Location Gallery Images

Use for `locations.gallery[]`.

Create one image per gallery role when content is available: establishing
shot, key landmark, playable area, lore detail, and optional activity shot.
Gallery images should feel like views inside the location rather than a second
map.

```text
Fantasy location scene for {location_name}, {gallery_role}, based on
{location_description}, set in {region_name}, cinematic but readable
environment art, clear focal point, grounded RPG exploration tone, consistent
with the location map palette, no text labels, no UI, no logo, no watermark,
no decorative border
```

Recommended role-specific direction:

- establishing shot: wide exterior or interior view that identifies the place;
- key landmark: the one structure or feature players would remember;
- playable area: route, room, plaza, tunnel, or camp usable for encounters;
- lore detail: close but recognizable object, marking, relic, or material cue;
- activity shot: lived-in moment only when the location is a settlement.

### Landing Hero Image

Use for `landing_hero.bg_image`.

```text
Wide cinematic scene of a fantasy adventurer's guild archive, maps, item
records, monster sketches, and schema-like ledgers on tables, warm natural
light, clean painterly realism, spacious composition for overlaid text on the
left, no text in image, no UI, no logo
```

## Prompt Data Inputs

Entity prompts should use row data when available:

- name;
- class/type/category;
- region/location;
- faction;
- rarity/alignment;
- short description;
- file target size/aspect ratio.

Do not invent lore in the prompt if the row has enough content. If the prompt
needs extra detail, add it to source data first or record the assumption in the
asset task.

## Review Rules For Generated Assets

- Subject is recognizable at catalog thumbnail size.
- Crop matches the target component.
- No embedded text, watermark, border, or UI frame.
- Style matches other assets in the same type.
- Color palette does not fight subgraph/status chips.
- File metadata in Revisium is meaningful: file name, mime type, dimensions, hash.
