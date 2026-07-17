import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { projectAssets } from "@/features/projects/data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const isDefault = locale === routing.defaultLocale;

    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: "monthly",
      priority: isDefault ? 1 : 0.8,
    });

    entries.push({
      url: `${SITE_URL}/${locale}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    });

    for (const project of projectAssets) {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${project.id}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    entries.push({
      url: `${SITE_URL}/${locale}/showroom`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });

    entries.push({
      url: `${SITE_URL}/${locale}/mentions-legales`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    });
  }

  return entries;
}
