import { getTranslations } from "next-intl/server";
import { HudPanel } from "@/components/ui/HudPanel";
import { AccentLine } from "@/components/ui/AccentLine";

type ServiceItem = { code: string; title: string; description: string };

export async function ServicesSection() {
  const t = await getTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <AccentLine className="mt-3 mb-6" />
          <h2 className="text-4xl sm:text-5xl font-bold text-[#e8eaf0] uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-4 text-sm text-[#5a6070] max-w-md">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(({ code, title, description }) => (
            <HudPanel key={code} className="p-6 hover:border-[#ff7d27]/70 hover:shadow-[0_0_16px_rgba(255,125,39,0.08)] transition-all duration-300 group">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#ff7d27] tracking-widest">{code}</span>
                  <div className="w-2 h-2 rounded-full bg-[#ff7d27] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="w-8 h-0.5 bg-[#ff7d27] opacity-60" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#e8eaf0] mb-3">{title}</h3>
              <p className="text-xs text-[#5a6070] leading-relaxed">{description}</p>
            </HudPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
