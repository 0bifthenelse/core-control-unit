import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HudPanel } from "@/components/ui/HudPanel";
import { AccentLine } from "@/components/ui/AccentLine";
import { projectAssets } from "@/features/projects/data";

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
type ProjectItem = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
};

export async function ProjectsPage() {
  const t = await getTranslations("projects");
  const items = t.raw("items") as ProjectItem[];

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-block mb-10 text-[10px] uppercase tracking-widest text-text-muted hover:text-[#ff7d27] transition-colors font-mono"
        >
          {t("backToHome")}
        </Link>

        <div className="mb-20 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <AccentLine className="mt-3 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary uppercase tracking-tight mb-4">
            {t("heading")}
          </h1>
          <p className="text-sm text-text-muted leading-relaxed">{t("detailSubtitle")}</p>
        </div>

        <div className="space-y-24">
          {items.map(({ id, title, longDescription }) => {
            const asset = projectAssets.find((project) => project.id === id);
            const screenshots = asset?.screenshots ?? [];
            const liveUrl = asset?.liveUrl ?? null;
            const repoUrl = asset?.repoUrl ?? null;
            const isPrivate = asset?.private ?? false;

            return (
              <section key={id} id={id} className="scroll-mt-24">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary uppercase tracking-tight mb-4">
                    {title}
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed max-w-3xl">{longDescription}</p>
                </div>

                {screenshots[0] && (
                  <div className="relative mb-12 sm:mb-16">
                    <HudPanel className="overflow-hidden">
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                          src={screenshots[0]}
                          alt={`${title} preview 1`}
                          fill
                          priority
                          className="object-cover object-top"
                          style={{ filter: "saturate(0.9) contrast(1.05)" }}
                          sizes="(max-width: 640px) 100vw, 80vw"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(160deg, rgba(255,125,39,0.10) 0%, rgba(13,15,18,0.35) 70%)" }}
                        />
                        <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#ff7d27]/70 to-transparent" />
                      </div>
                    </HudPanel>

                    {screenshots[1] && (
                      <div className="hidden sm:block absolute -bottom-8 right-6 w-2/5 max-w-xs">
                        <HudPanel className="overflow-hidden border-[#ff7d27]/40 shadow-[0_0_30px_rgba(255,125,39,0.25)]">
                          <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <Image
                              src={screenshots[1]}
                              alt={`${title} preview 2`}
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
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        <Image
                          src={screenshots[1]}
                          alt={`${title} preview 2`}
                          fill
                          className="object-cover"
                          style={{ filter: "saturate(0.9) contrast(1.05)" }}
                          sizes="100vw"
                        />
                      </div>
                    </HudPanel>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {liveUrl ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors font-mono"
                    >
                      {t("visitProject")} →
                    </a>
                  ) : isPrivate ? null : (
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted font-mono">
                      {t("comingSoon")}
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
                        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 015 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.470-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z" />
                      </svg>
                      {t("viewSource")}
                    </a>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
