import { MetadataRoute } from "next";

const locales = ["fr", "en", "es", "it"];
const base = "https://corecontrolunit.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "fr" ? 1 : 0.8,
  }));
}
