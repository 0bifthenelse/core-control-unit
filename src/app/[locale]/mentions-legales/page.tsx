import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NavBarServer } from "@/components/ui/NavBarServer";
import { Footer } from "@/components/ui/Footer";
import { LegalPage } from "@/features/legal/components/LegalPage";
import { routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const title = `${t("title")} | ${SITE_NAME}`;
  const url = `${SITE_URL}/${locale}/mentions-legales`;

  return {
    title,
    robots: { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: localeAlternates("/mentions-legales", routing.locales),
    },
  };
}

export default function MentionsLegales() {
  return (
    <>
      <NavBarServer />
      <LegalPage />
      <Footer />
    </>
  );
}
