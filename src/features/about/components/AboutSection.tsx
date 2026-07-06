import { getTranslations } from "next-intl/server";
import { AccentLine } from "@/components/ui/AccentLine";

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
export async function AboutSection() {
  const t = await getTranslations("about");

  return (
    <section id="apropos" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-3xl">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
        <AccentLine className="mt-3 mb-6" />
        <h2 className="text-3xl sm:text-4xl font-bold text-text-primary uppercase tracking-tight mb-6">
          {t("heading")}
        </h2>
        <div className="space-y-4 text-sm text-text-muted leading-relaxed">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
      </div>
    </section>
  );
}
