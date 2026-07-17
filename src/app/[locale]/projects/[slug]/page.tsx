import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { NavBarServer } from "@/components/ui/NavBarServer";
import { Footer } from "@/components/ui/Footer";
import { ProjectDetailPage } from "@/features/projects/components/ProjectDetailPage";
import { projectAssets } from "@/features/projects/data";
import { routing } from "@/i18n/routing";
import { SITE_URL, SITE_NAME, ogLocaleMap, localeAlternates } from "@/lib/seo";

export function generateStaticParams() {
  return projectAssets.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const items = t.raw("items") as Array<{ id: string; title: string; description: string }>;
  const item = items.find((entry) => entry.id === slug);
  const asset = projectAssets.find((project) => project.id === slug);

  if (!item) {
    return {
      title: t("heading"),
      alternates: {
        canonical: `${SITE_URL}/${locale}/projects/${slug}`,
        languages: localeAlternates(`/projects/${slug}`, routing.locales),
      },
    };
  }

  const url = `${SITE_URL}/${locale}/projects/${slug}`;
  const image = asset?.screenshots[0];

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      url,
      siteName: SITE_NAME,
      locale: ogLocaleMap[locale] ?? "fr_FR",
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: url,
      languages: localeAlternates(`/projects/${slug}`, routing.locales),
    },
  };
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <NavBarServer />
      <ProjectDetailPage slug={slug} />
      <Footer />
    </>
  );
}
