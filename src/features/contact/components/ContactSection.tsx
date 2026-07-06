import { getTranslations } from "next-intl/server";
import { AccentLine } from "@/components/ui/AccentLine";
import { HudPanel } from "@/components/ui/HudPanel";
import { LABEL_STYLE, INPUT_STYLE, CLIP_INPUT, BUTTON_STYLE, CLIP_BUTTON } from "@/components/ui/formStyles";

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="py-24 px-6 border-t border-[#1e2330]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <AccentLine className="mt-3 mb-6 max-w-xs mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e8eaf0] uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-4 text-sm text-[#5a6070] max-w-sm mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <HudPanel label={t("panelLabel")} className="p-8">
            <form
              action="mailto:contact@ccunit.net"
              method="post"
              encType="text/plain"
              className="space-y-5"
            >
              <div>
                <label className={LABEL_STYLE}>
                  {t("labelName")}
                </label>
                <input
                  type="text"
                  name="nom"
                  required
                  className={INPUT_STYLE}
                  placeholder={t("placeholderName")}
                  style={CLIP_INPUT}
                />
              </div>
              <div>
                <label className={LABEL_STYLE}>
                  {t("labelEmail")}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className={INPUT_STYLE}
                  placeholder={t("placeholderEmail")}
                  style={CLIP_INPUT}
                />
              </div>
              <div>
                <label className={LABEL_STYLE}>
                  {t("labelProject")}
                </label>
                <textarea
                  name="projet"
                  required
                  rows={5}
                  className={`${INPUT_STYLE} resize-none`}
                  placeholder={t("placeholderProject")}
                  style={CLIP_INPUT}
                />
              </div>
              <button type="submit" className={BUTTON_STYLE} style={CLIP_BUTTON}>
                {t("submit")}
              </button>
            </form>
          </HudPanel>
        </div>
      </div>
    </section>
  );
}
