import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { HudPanel } from "@/components/ui/HudPanel";
import { AccentLine } from "@/components/ui/AccentLine";

type ProjectItem = { code: string; title: string; description: string };

const PICSUM_SEEDS = ["proj1", "proj2", "proj3"];

export async function ProjectsSection() {
  const t = await getTranslations("projects");
  const items = t.raw("items") as ProjectItem[];

  return (
    <section id="projets" className="py-24 px-6 border-t border-[#1e2330]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <AccentLine className="mt-3 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8eaf0] uppercase tracking-tight">
            {t("heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {items.map(({ code, title, description }, i) => (
            <HudPanel key={code} className="overflow-hidden group hover:border-[#ff7d27]/40 transition-colors duration-300">
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${PICSUM_SEEDS[i]}/800/500`}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-500"
                  style={{ filter: "grayscale(50%)" }}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#0d0f12]/40 group-hover:bg-[#0d0f12]/20 transition-colors duration-500" />
                <span className="absolute top-3 left-3 text-[10px] font-mono text-[#ff7d27] tracking-widest bg-[#0d0f12]/80 px-2 py-1">
                  {code}
                </span>
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[#ff7d27]/70 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8eaf0] mb-3">{title}</h3>
                <p className="text-xs text-[#5a6070] leading-relaxed mb-4">{description}</p>
                <a
                  href="#"
                  className="text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors font-mono"
                >
                  {t("viewProject")} →
                </a>
              </div>
            </HudPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
