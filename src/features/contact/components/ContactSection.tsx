import { getTranslations } from "next-intl/server";
import { AccentLine } from "@/components/ui/AccentLine";
import { ContactForm } from "./ContactForm";

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("sectionLabel")}</span>
          <AccentLine className="mt-3 mb-6 max-w-xs mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-4 text-sm text-text-muted max-w-sm mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <ContactForm
            panelLabel={t("panelLabel")}
            labelName={t("labelName")}
            placeholderName={t("placeholderName")}
            labelEmail={t("labelEmail")}
            placeholderEmail={t("placeholderEmail")}
            labelProject={t("labelProject")}
            placeholderProject={t("placeholderProject")}
            submit={t("submit")}
            emailSubject={t("emailSubject")}
          />
        </div>
      </div>
    </section>
  );
}
