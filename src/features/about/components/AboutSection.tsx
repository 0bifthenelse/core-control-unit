import { getTranslations } from "next-intl/server";
import { AccentLine } from "@/components/ui/AccentLine";

type ValueItem = { label: string; desc: string };

export async function AboutSection() {
  const t = await getTranslations("about");
  const values = t.raw("values") as ValueItem[];

  return (
    <section id="apropos" className="py-24 px-6 border-t border-[#1e2330]">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <AccentLine className="mt-3 mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8eaf0] uppercase tracking-tight mb-6">
            {t("heading")}
          </h2>
          <div className="space-y-4 text-sm text-[#5a6070] leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map(({ label, desc }) => (
            <div key={label} className="border-l-2 border-[#ff7d27] pl-4 py-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#e8eaf0] mb-1">{label}</div>
              <div className="text-xs text-[#5a6070]">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
