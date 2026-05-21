import type { SearchDomain, SearchTableId } from '../api/SearchDataSource';

export interface SearchTableConfig {
  readonly appHref: (id: string, json: unknown) => string | null;
  readonly cloudTableHref: string;
  readonly sourceTable: string;
  readonly tableId: SearchTableId;
  readonly titlePaths: readonly string[];
}

const dataTableBaseHref = 'https://cloud.revisium.io/app/revisium/demo-rpg-data/master/draft';
const cmsTableBaseHref = 'https://cloud.revisium.io/app/revisium/demo-rpg-cms/master/draft';

export const searchTableConfigs: Record<SearchTableId, SearchTableConfig> = {
  abilities: createDataConfig('abilities', 'abilities', () => '/abilities', [
    'name',
    'school',
    'kind',
  ]),
  blogAuthors: createCmsConfig('blogAuthors', 'blog_authors', () => null, ['name', 'slug']),
  blogPosts: createCmsConfig('blogPosts', 'blog_posts', (_id, json) => {
    const slug = readStringPath(json, 'slug');
    return slug ? `/blog/${slug}` : null;
  }, ['title', 'slug', 'excerpt']),
  classes: createDataConfig('classes', 'classes', () => '/classes', [
    'name',
    'primary_stat',
    'description',
  ]),
  dialogs: createDataConfig('dialogs', 'dialogs', () => '/dialogs', ['slug', 'lines.0.text']),
  effects: createDataConfig('effects', 'effects', () => '/effects', ['name', 'code', 'kind']),
  factions: createDataConfig('factions', 'factions', (id) => `/factions/${id}`, [
    'name',
    'alignment',
    'description',
  ]),
  heroes: createDataConfig('heroes', 'heroes', (id) => `/heroes/${id}`, [
    'name',
    'epithet',
    'role',
  ]),
  itemTypes: createDataConfig('itemTypes', 'item_types', () => '/item-types', [
    'name',
    'code',
    'description',
  ]),
  items: createDataConfig('items', 'items', (id) => `/items/${id}`, [
    'name',
    'rarity',
    'description',
  ]),
  landingFeatures: createCmsConfig('landingFeatures', 'landing_features', () => '/', [
    'title',
    'body',
    'icon',
  ]),
  landingHero: createCmsConfig('landingHero', 'landing_hero', () => '/', [
    'title',
    'subtitle',
    'eyebrow',
  ]),
  landingTestimonials: createCmsConfig('landingTestimonials', 'landing_testimonials', () => '/', [
    'quote',
    'author',
    'role',
  ]),
  locations: createDataConfig('locations', 'locations', (id) => `/locations/${id}`, [
    'name',
    'kind',
    'description',
  ]),
  monsters: createDataConfig('monsters', 'monsters', (id) => `/monsters/${id}`, [
    'name',
    'kind',
    'description',
  ]),
  npcs: createDataConfig('npcs', 'npcs', (id) => `/npcs/${id}`, [
    'display_label_en',
    'name',
    'title',
  ]),
  parties: createDataConfig('parties', 'parties', (id) => `/parties/${id}`, [
    'name',
    'motto',
    'alignment',
  ]),
  quests: createDataConfig('quests', 'quests', (id) => `/quests/${id}`, [
    'title',
    'summary',
    'kind',
  ]),
  regions: createDataConfig('regions', 'regions', (id) => `/regions/${id}`, [
    'name',
    'climate',
    'description',
  ]),
  stats: createDataConfig('stats', 'stats', () => '/stats', ['name', 'code', 'abbreviation']),
};

export function getCloudRowHref(config: SearchTableConfig, id: string): string {
  return `${config.cloudTableHref}/${id}`;
}

export function getSearchTableConfig(tableId: SearchTableId): SearchTableConfig {
  return searchTableConfigs[tableId];
}

export function getCloudTableHref(domain: SearchDomain, sourceTable: string): string {
  const baseHref = domain === 'cms' ? cmsTableBaseHref : dataTableBaseHref;
  return `${baseHref}/${sourceTable}`;
}

function createDataConfig(
  tableId: SearchTableId,
  sourceTable: string,
  appHref: SearchTableConfig['appHref'],
  titlePaths: readonly string[],
): SearchTableConfig {
  return createConfig('data', tableId, sourceTable, appHref, titlePaths);
}

function createCmsConfig(
  tableId: SearchTableId,
  sourceTable: string,
  appHref: SearchTableConfig['appHref'],
  titlePaths: readonly string[],
): SearchTableConfig {
  return createConfig('cms', tableId, sourceTable, appHref, titlePaths);
}

function createConfig(
  domain: SearchDomain,
  tableId: SearchTableId,
  sourceTable: string,
  appHref: SearchTableConfig['appHref'],
  titlePaths: readonly string[],
): SearchTableConfig {
  return {
    appHref,
    cloudTableHref: getCloudTableHref(domain, sourceTable),
    sourceTable,
    tableId,
    titlePaths,
  };
}

function readStringPath(value: unknown, path: string): string | null {
  const result = path.split('.').reduce<unknown>((current, segment) => {
    if (!isRecord(current)) return null;
    return current[segment] ?? null;
  }, value);

  return typeof result === 'string' && result.trim() ? result.trim() : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
