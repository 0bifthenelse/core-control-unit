import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NavBarServer } from "@/components/ui/NavBarServer";
import { Footer } from "@/components/ui/Footer";
import { ProjectsPage } from "@/features/projects/components/ProjectsPage";
import { routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, ogLocaleMap, localeAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const title = t("heading");
  const description = t("detailSubtitle");
  const url = `${SITE_URL}/${locale}/projects`;

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
      languages: localeAlternates("/projects", routing.locales),
    },
  };
}

export default function Projects() {
  return (
    <>
      <NavBarServer />
      <ProjectsPage />
      <Footer />
    </>
  );
}
