import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NavBarServer } from "@/components/ui/NavBarServer";
import { Footer } from "@/components/ui/Footer";
import { ShowroomPage } from "@/features/showroom/components/ShowroomPage";
import { routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, ogLocaleMap, localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  const title = `${t("showroom")} | ${SITE_NAME}`;
  const description = "Live WebGPU showroom demo: real-time GPU-instanced scenes built by Core Control Unit.";
  const url = `${SITE_URL}/${locale}/showroom`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocaleMap[locale] ?? "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: localeAlternates("/showroom", routing.locales),
    },
  };
}

export default function Showroom() {
  return (
    <>
      <NavBarServer />
      <ShowroomPage />
      <Footer />
    </>
  );
}
