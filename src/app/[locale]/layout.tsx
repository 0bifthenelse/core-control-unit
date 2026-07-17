import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CookieBanner } from "@/features/cookies/components/CookieBanner";
import { SITE_URL, SITE_NAME, ogLocaleMap, localeAlternates } from "@/lib/seo";

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
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
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
      canonical: `${SITE_URL}/${locale}`,
      languages: localeAlternates("", routing.locales),
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
