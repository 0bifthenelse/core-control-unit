import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HudPanel } from "@/components/ui/HudPanel";
import { AccentLine } from "@/components/ui/AccentLine";
import { projectAssets } from "@/features/projects/data";

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
          className="inline-block mb-10 text-[10px] uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors font-mono"
        >
          {t("backToHome")}
        </Link>

        <div className="mb-20 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <AccentLine className="mt-3 mb-6" />
          <h1 className="text-3xl sm:text-4xl font-bold text-[#e8eaf0] uppercase tracking-tight mb-4">
            {t("heading")}
          </h1>
          <p className="text-sm text-[#5a6070] leading-relaxed">{t("detailSubtitle")}</p>
        </div>

        <div className="space-y-24">
          {items.map(({ id, title, longDescription }) => {
            const asset = projectAssets.find((project) => project.id === id);
            const screenshots = asset?.screenshots ?? [];
            const liveUrl = asset?.liveUrl ?? null;

            return (
              <section key={id} id={id} className="scroll-mt-24">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#e8eaf0] uppercase tracking-tight mb-4">
                    {title}
                  </h2>
                  <p className="text-sm text-[#5a6070] leading-relaxed max-w-3xl">{longDescription}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {screenshots.map((src, i) => (
                    <HudPanel key={src} className="overflow-hidden">
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                          src={src}
                          alt={`${title} screenshot ${i + 1}`}
                          fill
                          className="object-cover"
                          style={{ filter: "saturate(0.85) contrast(1.05)" }}
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(160deg, rgba(255,125,39,0.12) 0%, rgba(13,15,18,0.45) 65%)" }}
                        />
                      </div>
                    </HudPanel>
                  ))}
                </div>

                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors font-mono"
                  >
                    {t("visitProject")} →
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#5a6070] font-mono">
                    {t("comingSoon")}
                  </span>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
