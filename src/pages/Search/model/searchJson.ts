import type { SearchLocale } from './searchUiCopy';

export interface SearchSnippetPart {
  readonly isMatch: boolean;
  readonly text: string;
}

export interface SearchSnippet {
  readonly parts: readonly SearchSnippetPart[];
  readonly path: string;
  readonly text: string;
}

interface ScalarCandidate {
  readonly path: string;
  readonly score: number;
  readonly text: string;
}

const FALLBACK_LOCALE: SearchLocale = 'en';
const MAX_HIGHLIGHT_TOKEN_COUNT = 12;
const MAX_HIGHLIGHT_TOKEN_LENGTH = 64;
const MAX_SNIPPET_LENGTH = 180;
const SEARCH_LOCALES: readonly SearchLocale[] = ['en', 'ru', 'zh'];

export function createSearchTitle(
  json: unknown,
  titlePaths: readonly string[],
  locale: SearchLocale,
  fallbackTitle: string,
): string {
  for (const path of titlePaths) {
    const value = readPathValue(json, path);
    const text = stringifyDisplayValue(value, locale);
    if (text) return text;
  }

  const firstText = collectScalarCandidates(json, '', [], locale)[0]?.text;
  return firstText ?? fallbackTitle;
}

export function createSearchSnippets(
  json: unknown,
  query: string,
  locale: SearchLocale,
  fallbackLabel: string,
): readonly SearchSnippet[] {
  const tokens = tokenizeQuery(query, locale);
  const candidates = collectScalarCandidates(json, '', tokens, locale)
    .filter((candidate) => doesTextMatchTokens(candidate.text, tokens, locale))
    .sort((left, right) => right.score - left.score || left.text.length - right.text.length)
    .slice(0, 2);

  if (candidates.length === 0) {
    return [
      {
        parts: [{ isMatch: false, text: fallbackLabel }],
        path: 'json',
        text: fallbackLabel,
      },
    ];
  }

  return candidates.map((candidate) => {
    const text = createSnippetText(candidate.text, tokens, locale);
    return {
      parts: createHighlightedParts(text, tokens, locale),
      path: candidate.path,
      text,
    };
  });
}

export function doesSearchJsonMatch(json: unknown, query: string, locale: SearchLocale): boolean {
  const tokens = tokenizeQuery(query, locale);
  if (tokens.length === 0) return false;

  return collectScalarCandidates(json, '', tokens, locale).some((candidate) =>
    doesTextMatchTokens(candidate.text, tokens, locale),
  );
}

export function formatSearchDate(value: number | string, locale: SearchLocale): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
  }).format(date);
}

function collectScalarCandidates(
  value: unknown,
  path: string,
  tokens: readonly string[],
  locale: SearchLocale,
): readonly ScalarCandidate[] {
  if (isLocalizedRecord(value)) {
    return collectLocalizedCandidates(value, path, tokens, locale);
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      collectScalarCandidates(item, joinPath(path, String(index)), tokens, locale),
    );
  }

  if (isRecord(value)) {
    return Object.entries(value).flatMap(([key, child]) =>
      collectScalarCandidates(child, joinPath(path, key), tokens, locale),
    );
  }

  const text = stringifyScalar(value);
  if (!text) return [];

  return [
    {
      path,
      score: scoreCandidate(path, text, tokens, locale),
      text,
    },
  ];
}

function readPathValue(value: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (Array.isArray(current)) {
      const index = Number(segment);
      return Number.isInteger(index) ? current[index] : null;
    }
    if (!isRecord(current)) return null;
    return current[segment] ?? null;
  }, value);
}

function stringifyDisplayValue(value: unknown, locale: SearchLocale): string | null {
  if (isLocalizedRecord(value)) return localizedValue(value, locale);
  return stringifyScalar(value);
}

function localizedValue(
  value: Partial<Record<SearchLocale, unknown>>,
  locale: SearchLocale,
): string | null {
  return stringifyScalar(value[locale]) ?? stringifyScalar(value[FALLBACK_LOCALE]);
}

function collectLocalizedCandidates(
  value: Partial<Record<SearchLocale, unknown>>,
  path: string,
  tokens: readonly string[],
  locale: SearchLocale,
): readonly ScalarCandidate[] {
  return SEARCH_LOCALES.flatMap((candidateLocale) => {
    const text = stringifyScalar(value[candidateLocale]);
    if (!text) return [];

    return [
      {
        path: `${path}.${candidateLocale}`.replace(/^\./, ''),
        score:
          scoreCandidate(`${path}.${candidateLocale}`, text, tokens, locale) +
          (candidateLocale === locale ? 8 : 0),
        text,
      },
    ];
  });
}

function stringifyScalar(value: unknown): string | null {
  if (typeof value === 'string') return value.trim() || null;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return null;
}

function scoreCandidate(
  path: string,
  text: string,
  tokens: readonly string[],
  locale: SearchLocale,
): number {
  const matchScore = doesTextMatchTokens(text, tokens, locale) ? 100 : 0;
  const localeScore = path.endsWith(`.${locale}`) ? 20 : 0;
  const titleScore = /(^|\.)(name|title|slug|summary|description|excerpt)(\.|$)/.test(path)
    ? 12
    : 0;

  return matchScore + localeScore + titleScore;
}

function createSnippetText(
  value: string,
  tokens: readonly string[],
  locale: SearchLocale,
): string {
  if (value.length <= MAX_SNIPPET_LENGTH) return value;

  const matchIndex = findBestMatchIndex(value, tokens, locale);
  const anchorIndex = Math.max(0, matchIndex);
  const start = Math.max(0, anchorIndex - 64);
  const end = Math.min(value.length, start + MAX_SNIPPET_LENGTH);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < value.length ? '...' : '';

  return `${prefix}${value.slice(start, end).trim()}${suffix}`;
}

function createHighlightedParts(
  text: string,
  tokens: readonly string[],
  locale: SearchLocale,
): readonly SearchSnippetPart[] {
  if (tokens.length === 0) return [{ isMatch: false, text }];

  const normalizedText = normalizeSearchText(text, locale);
  const highlightTokens = [...new Set(tokens)]
    .filter((token) => token.length <= MAX_HIGHLIGHT_TOKEN_LENGTH)
    .filter((token) => normalizedText.includes(token))
    .sort((left, right) => right.length - left.length)
    .slice(0, MAX_HIGHLIGHT_TOKEN_COUNT);

  if (highlightTokens.length === 0) return [{ isMatch: false, text }];

  const matcher = new RegExp(`(${highlightTokens.map(escapeRegExp).join('|')})`, 'gi');
  return text
    .split(matcher)
    .filter(Boolean)
    .map((part) => ({
      isMatch: highlightTokens.includes(lower(part, locale)),
      text: part,
    }));
}

function tokenizeQuery(query: string, locale: SearchLocale): readonly string[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tokens = trimmed
    .split(/\s+/)
    .map((token) => normalizeSearchText(token, locale))
    .filter((token) => token.length > 1);

  const fullQuery = normalizeSearchText(trimmed, locale);
  return [...new Set(fullQuery.length > 1 ? [fullQuery, ...tokens] : tokens)];
}

function lower(value: string, locale: SearchLocale): string {
  return value.toLocaleLowerCase(locale === 'zh' ? 'zh-CN' : locale);
}

function normalizeSearchText(value: string, locale: SearchLocale): string {
  return lower(value.normalize('NFKD'), locale).replace(/\p{Mark}/gu, '');
}

function doesTextMatchTokens(
  text: string,
  tokens: readonly string[],
  locale: SearchLocale,
): boolean {
  const normalizedText = normalizeSearchText(text, locale);
  return tokens.some((token) => doesTextMatchToken(normalizedText, token));
}

function doesTextMatchToken(normalizedText: string, token: string): boolean {
  if (normalizedText.includes(token)) return true;
  if (token.length < 4 || containsHanCharacters(token)) return false;

  return getSearchWords(normalizedText).some((word) => doesWordFuzzyMatchToken(word, token));
}

function doesWordFuzzyMatchToken(word: string, token: string): boolean {
  if (word.length < token.length - 1) return false;

  if (Math.abs(word.length - token.length) <= 1 && hasSmallEditDistance(word, token)) {
    return true;
  }

  for (let index = 0; index <= word.length - token.length; index += 1) {
    if (hasSmallEditDistance(word.slice(index, index + token.length), token)) {
      return true;
    }
  }

  return false;
}

function hasSmallEditDistance(left: string, right: string): boolean {
  if (left === right) return true;
  if (Math.abs(left.length - right.length) > 1) return false;

  let edits = 0;
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] === right[rightIndex]) {
      leftIndex += 1;
      rightIndex += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) return false;

    if (left.length > right.length) {
      leftIndex += 1;
    } else if (right.length > left.length) {
      rightIndex += 1;
    } else {
      leftIndex += 1;
      rightIndex += 1;
    }
  }

  return edits + (left.length - leftIndex) + (right.length - rightIndex) <= 1;
}

function findBestMatchIndex(
  text: string,
  tokens: readonly string[],
  locale: SearchLocale,
): number {
  const normalizedText = normalizeSearchText(text, locale);
  const exactIndex = tokens.reduce((bestIndex, token) => {
    const tokenIndex = normalizedText.indexOf(token);
    if (tokenIndex < 0) return bestIndex;
    return bestIndex < 0 ? tokenIndex : Math.min(bestIndex, tokenIndex);
  }, -1);
  if (exactIndex >= 0) return exactIndex;

  return tokens.reduce((bestIndex, token) => {
    if (token.length < 4 || containsHanCharacters(token)) return bestIndex;
    const tokenIndex = findFuzzyTokenIndex(normalizedText, token);
    if (tokenIndex < 0) return bestIndex;
    return bestIndex < 0 ? tokenIndex : Math.min(bestIndex, tokenIndex);
  }, -1);
}

function findFuzzyTokenIndex(normalizedText: string, token: string): number {
  const matcher = /\p{L}[\p{L}\p{N}_-]*/gu;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(normalizedText)) !== null) {
    const word = match[0];
    if (!doesWordFuzzyMatchToken(word, token)) continue;
    return match.index;
  }

  return -1;
}

function getSearchWords(normalizedText: string): readonly string[] {
  return normalizedText.match(/\p{L}[\p{L}\p{N}_-]*/gu) ?? [];
}

function containsHanCharacters(value: string): boolean {
  return /\p{Script=Han}/u.test(value);
}

function joinPath(path: string, segment: string): string {
  return path ? `${path}.${segment}` : segment;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function isLocalizedRecord(value: unknown): value is Partial<Record<SearchLocale, unknown>> {
  return isRecord(value) && ('en' in value || 'ru' in value || 'zh' in value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
