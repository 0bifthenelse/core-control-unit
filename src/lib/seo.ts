export const SITE_URL = "https://ccunit.net";
export const SITE_NAME = "Core Control Unit";

export const ogLocaleMap: Record<string, string> = {
  fr: "fr_FR",
  en: "en_GB",
  es: "es_ES",
  it: "it_IT",
  de: "de_DE",
  "de-CH": "de_CH",
  sv: "sv_SE",
  ru: "ru_RU",
  ja: "ja_JP",
  zh: "zh_CN",
  "zh-Hant": "zh_TW",
  he: "he_IL",
  fa: "fa_IR",
};

export function localeAlternates(path: string, locales: readonly string[]) {
  return Object.fromEntries(
    locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])
  );
}
