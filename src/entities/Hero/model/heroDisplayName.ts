import type { SupportedLocale } from 'src/shared/model';

type LocalizedHeroText = Record<SupportedLocale, string>;

interface HeroDisplayNameRequest {
  readonly displayNameEn?: string | null;
  readonly epithet?: LocalizedHeroText | null;
  readonly fallbackId: string;
  readonly locale: SupportedLocale;
  readonly name?: LocalizedHeroText | null;
}

export function getHeroDisplayName({
  displayNameEn,
  epithet,
  fallbackId,
  locale,
  name,
}: HeroDisplayNameRequest): string {
  const displayNameEnCandidate = displayNameEn?.trim();
  const trimmedDisplayNameEn =
    displayNameEnCandidate === '' ? undefined : displayNameEnCandidate;
  if (locale === 'en' && trimmedDisplayNameEn) return trimmedDisplayNameEn;

  const localizedName = localized(name, locale);
  const localizedEpithet = localized(epithet, locale);
  const localizedDisplayName = joinHeroName(localizedName, localizedEpithet, locale);
  if (localizedDisplayName) return localizedDisplayName;

  return trimmedDisplayNameEn ?? fallbackId;
}

function localized(value: LocalizedHeroText | null | undefined, locale: SupportedLocale): string {
  const localizedValue = value?.[locale]?.trim();
  if (localizedValue) return localizedValue;
  return value?.en?.trim() ?? '';
}

function joinHeroName(name: string, epithet: string, locale: SupportedLocale): string {
  if (!name) return epithet;
  if (!epithet) return name;
  if (locale === 'zh') return `${name}${epithet}`;
  return `${name} ${epithet}`;
}
