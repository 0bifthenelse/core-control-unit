import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CookieBanner } from "@/features/cookies/components/CookieBanner";

const ogLocaleMap: Record<string, string> = {
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: ["software engineering", "system architecture", "web development", "France", "Core Control Unit"],
    authors: [{ name: "Core Control Unit" }],
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://ccunit.net/${locale}`,
      siteName: "Core Control Unit",
      locale: ogLocaleMap[locale] ?? "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://ccunit.net/${locale}`,
      languages: {
        fr: "https://ccunit.net/fr",
        en: "https://ccunit.net/en",
        es: "https://ccunit.net/es",
        it: "https://ccunit.net/it",
        de: "https://ccunit.net/de",
        "de-CH": "https://ccunit.net/de-CH",
        sv: "https://ccunit.net/sv",
        ru: "https://ccunit.net/ru",
        ja: "https://ccunit.net/ja",
        zh: "https://ccunit.net/zh",
        "zh-Hant": "https://ccunit.net/zh-Hant",
        he: "https://ccunit.net/he",
        fa: "https://ccunit.net/fa",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
