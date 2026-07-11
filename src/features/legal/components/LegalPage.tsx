import { getLocale, getTranslations } from "next-intl/server";
import { AccentLine } from "@/components/ui/AccentLine";
import { RgpdForm } from "./RgpdForm";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{title}</span>
      <AccentLine className="mt-3 mb-4" />
      <div className="space-y-2 text-xs text-text-muted leading-relaxed">{children}</div>
    </div>
  );
}

export async function LegalPage() {
  const t = await getTranslations("legal");
  const locale = await getLocale();
  const formLocale = locale === "fr" ? "fr" : "en";
  const tForm = await getTranslations({ locale: formLocale, namespace: "legal" });
  const dataRights = t.raw("dataRights") as string[];

  const rgpdTypes = [
    { value: "access", label: tForm("rgpdTypeAccess") },
    { value: "rectification", label: tForm("rgpdTypeRectification") },
    { value: "deletion", label: tForm("rgpdTypeDeletion") },
    { value: "portability", label: tForm("rgpdTypePortability") },
    { value: "opposition", label: tForm("rgpdTypeOpposition") },
    { value: "limitation", label: tForm("rgpdTypeLimitation") },
  ];

  return (
    <main className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary uppercase tracking-tight mb-16">
          {t("title")}
        </h1>

        <Section title={t("editorTitle")}>
          <p className="text-text-primary font-bold">{t("editorName")}</p>
          <p>{t("editorType")}</p>
          <p>{t("editorActivity")}</p>
          <p>{t("editorSiret")}</p>
          <p>{t("editorAddress")}</p>
          <p>{t("editorEmail")}</p>
          <p>{t("editorDirector")}</p>
        </Section>

        <Section title={t("hostingTitle")}>
          <p>{t("hostingName")}</p>
          <p>{t("hostingAddress")}</p>
          <p>{t("hostingContact")}</p>
        </Section>

        <Section title={t("ipTitle")}>
          <p>{t("ipText")}</p>
        </Section>

        <Section title={t("dataTitle")}>
          <p>{t("dataText")}</p>
          <ul className="mt-3 space-y-1 pl-4">
            {dataRights.map((right, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#ff7d27] font-mono mt-0.5">›</span>
                <span>{right}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3">{t("dataContact")}</p>
          <p className="mt-2 italic">{t("dataLegal")}</p>
        </Section>

        <Section title={t("cookiesTitle")}>
          <p>{t("cookiesText")}</p>
        </Section>

        <div id="rgpd" className="mt-16">
          <div className="mb-10 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{tForm("rgpdTitle")}</span>
            <AccentLine className="mt-3 mb-4 max-w-xs mx-auto" />
            <p className="text-xs text-text-muted max-w-sm mx-auto">{tForm("rgpdSubtitle")}</p>
          </div>
          <RgpdForm
            panelLabel={tForm("rgpdPanelLabel")}
            labelName={tForm("rgpdLabelName")}
            placeholderName={tForm("rgpdPlaceholderName")}
            labelEmail={tForm("rgpdLabelEmail")}
            placeholderEmail={tForm("rgpdPlaceholderEmail")}
            labelType={tForm("rgpdLabelType")}
            types={rgpdTypes}
            labelMessage={tForm("rgpdLabelMessage")}
            placeholderMessage={tForm("rgpdPlaceholderMessage")}
            submit={tForm("rgpdSubmit")}
            emailSubject={tForm("rgpdEmailSubject")}
          />
        </div>
      </div>
    </main>
  );
}
