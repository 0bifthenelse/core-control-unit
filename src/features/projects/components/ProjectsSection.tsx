import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HudPanel } from "@/components/ui/HudPanel";
import { AccentLine } from "@/components/ui/AccentLine";
import { projectAssets } from "@/features/projects/data";

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
type ProjectItem = { id: string; title: string; description: string };

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const items = t.raw("items") as ProjectItem[];

  return (
    <section id="projets" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
            <AccentLine className="mt-3 mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary uppercase tracking-tight">
              {t("heading")}
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors font-mono"
          >
            {t("viewAll")}
          </Link>
        </div>

        <div
          className={`grid gap-4 ${
            items.length === 1
              ? "grid-cols-1 sm:max-w-md"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {items.map(({ id, title, description }) => {
            const asset = projectAssets.find((project) => project.id === id);
            const cover = asset?.screenshots[0];
            return (
              <HudPanel key={id} className="flex flex-col h-full overflow-hidden group hover:border-[#ff7d27]/40 hover:-translate-y-1 transition-all duration-300">
                <div className={`relative w-full overflow-hidden ${asset?.portrait ? "aspect-video bg-[#0d0f12]" : "aspect-video"}`}>
                  {cover && (
                    <Image
                      src={cover}
                      alt={title}
                      fill
                      className={`group-hover:scale-105 transition-all duration-500 ${asset?.portrait ? "object-contain" : "object-cover"}`}
                      style={asset?.portrait ? undefined : { filter: "saturate(0.85) contrast(1.05)" }}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  )}
                  {!asset?.portrait && (
                    <div
                      className="absolute inset-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{ background: "linear-gradient(160deg, rgba(255,125,39,0.22) 0%, rgba(13,15,18,0.75) 65%)" }}
                    />
                  )}
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#ff7d27]/70 to-transparent" />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-primary mb-3">{title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">{description}</p>
                  <Link
                    href={`/projects/${id}`}
                    className="mt-auto pt-2 text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors font-mono"
                  >
                    {t("viewProject")}
                  </Link>
                </div>
              </HudPanel>
            );
          })}
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-widest text-text-muted font-mono">
          {t("moreSoon")}
        </p>
      </div>
    </section>
  );
}
