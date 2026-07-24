import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { HudPanel } from "@/components/ui/HudPanel";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { projectAssets } from "@/features/projects/data";

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
type ProjectItem = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
};

export async function ProjectDetailPage({ slug }: { slug: string }) {
  const t = await getTranslations("projects");
  const items = t.raw("items") as ProjectItem[];
  const item = items.find((project) => project.id === slug);

  if (!item) {
    notFound();
  }

  const asset = projectAssets.find((project) => project.id === slug);
  const screenshots = asset?.screenshots ?? [];
  const liveUrl = asset?.liveUrl ?? null;
  const repoUrl = asset?.repoUrl ?? null;
  const buyUrl = asset?.buyUrl ?? null;
  const buyUrlIt = asset?.buyUrlIt ?? null;
  const isPrivate = asset?.private ?? false;

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/projects"
          className="inline-block mb-10 text-[10px] uppercase tracking-widest text-text-muted hover:text-[#ff7d27] transition-colors font-mono"
        >
          {t("backToProjects")}
        </Link>

        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-text-primary uppercase tracking-tight mb-4">
            {item.title}
          </h1>
          <p className="text-sm text-text-muted leading-relaxed max-w-3xl">{item.longDescription}</p>
        </div>

        {asset?.portrait ? (
          screenshots.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
              {screenshots.map((src, i) => (
                <HudPanel key={src} className="overflow-hidden">
                  <div className="relative w-full aspect-[1924/1079] overflow-hidden bg-[#0d0f12]">
                    <ImageLightbox
                      src={src}
                      alt={`${item.title} preview ${i + 1}`}
                      fill
                      priority={i === 0}
                      className="object-contain"
                      sizes="(max-width: 640px) 50vw, 40vw"
                    />
                    <div className="pointer-events-none absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#ff7d27]/70 to-transparent" />
                  </div>
                </HudPanel>
              ))}
            </div>
          )
        ) : (
          <>
            {screenshots[0] && (
              <div className="relative mb-12 sm:mb-16">
                <HudPanel className="overflow-hidden">
                  <div className="relative w-full aspect-[1924/1079] overflow-hidden">
                    <ImageLightbox
                      src={screenshots[0]}
                      alt={`${item.title} preview 1`}
                      fill
                      priority
                      className="object-cover object-top"
                      style={{ filter: "saturate(0.9) contrast(1.05)" }}
                      sizes="(max-width: 640px) 100vw, 80vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "linear-gradient(160deg, rgba(255,125,39,0.10) 0%, rgba(13,15,18,0.35) 70%)" }}
                    />
                    <div className="pointer-events-none absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#ff7d27]/70 to-transparent" />
                  </div>
                </HudPanel>

                {screenshots[1] && (
                  <div className="hidden sm:block absolute -bottom-8 right-6 w-2/5 max-w-xs">
                    <HudPanel className="overflow-hidden border-[#ff7d27]/40 shadow-[0_0_30px_rgba(255,125,39,0.25)]">
                      <div className="relative w-full aspect-[1340/722] overflow-hidden">
                        <ImageLightbox
                          src={screenshots[1]}
                          alt={`${item.title} preview 2`}
                          fill
                          className="object-cover"
                          style={{ filter: "saturate(0.9) contrast(1.05)" }}
                          sizes="40vw"
                        />
                      </div>
                    </HudPanel>
                  </div>
                )}
              </div>
            )}

            {screenshots[1] && (
              <div className="sm:hidden mb-6">
                <HudPanel className="overflow-hidden">
                  <div className="relative w-full aspect-[1340/722] overflow-hidden">
                    <ImageLightbox
                      src={screenshots[1]}
                      alt={`${item.title} preview 2`}
                      fill
                      className="object-cover"
                      style={{ filter: "saturate(0.9) contrast(1.05)" }}
                      sizes="100vw"
                    />
                  </div>
                </HudPanel>
              </div>
            )}
          </>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {buyUrl ? (
            <a
              href={buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors font-mono"
            >
              {t("buyOnAmazon")} →
            </a>
          ) : liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors font-mono"
            >
              {t("visitProject")} →
            </a>
          ) : isPrivate ? null : repoUrl ? null : (
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted font-mono">
              {t("comingSoon")}
            </span>
          )}
          {buyUrlIt && (
            <a
              href={buyUrlIt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors font-mono"
            >
              {t("buyOnAmazonIt")} →
            </a>
          )}
          {asset?.usEditionInReview && (
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted font-mono">
              {t("usEditionInReview")}
            </span>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted hover:text-[#ff7d27] transition-colors font-mono"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z" />
              </svg>
              {t("viewSource")}
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
