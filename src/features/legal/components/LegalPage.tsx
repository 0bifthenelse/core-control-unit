import { getTranslations } from "next-intl/server";
import { AccentLine } from "@/components/ui/AccentLine";
import { HudPanel } from "@/components/ui/HudPanel";
import { RgpdForm } from "./RgpdForm";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{title}</span>
      <AccentLine className="mt-3 mb-4" />
      <div className="space-y-2 text-xs text-[#5a6070] leading-relaxed">{children}</div>
    </div>
  );
}

export async function LegalPage() {
  const t = await getTranslations("legal");
  const dataRights = t.raw("dataRights") as string[];

  const rgpdTypes = [
    { value: "access", label: t("rgpdTypeAccess") },
    { value: "rectification", label: t("rgpdTypeRectification") },
    { value: "deletion", label: t("rgpdTypeDeletion") },
    { value: "portability", label: t("rgpdTypePortability") },
    { value: "opposition", label: t("rgpdTypeOpposition") },
    { value: "limitation", label: t("rgpdTypeLimitation") },
  ];

  return (
    <main className="py-24 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#e8eaf0] uppercase tracking-tight mb-16">
          {t("title")}
        </h1>

        <Section title={t("editorTitle")}>
          <p className="text-[#e8eaf0] font-bold">{t("editorName")}</p>
          <p>{t("editorType")}</p>
          <p>{t("editorActivity")}</p>
          <p>{t("editorSiret")}</p>
          <p>{t("editorAddress")}</p>
          <p>{t("editorEmail")}</p>
          <p>{t("editorPhone")}</p>
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("rgpdTitle")}</span>
            <AccentLine className="mt-3 mb-4 max-w-xs mx-auto" />
            <p className="text-xs text-[#5a6070] max-w-sm mx-auto">{t("rgpdSubtitle")}</p>
          </div>
          <HudPanel className="p-0">
            <RgpdForm
              panelLabel={t("rgpdPanelLabel")}
              labelName={t("rgpdLabelName")}
              placeholderName={t("rgpdPlaceholderName")}
              labelEmail={t("rgpdLabelEmail")}
              placeholderEmail={t("rgpdPlaceholderEmail")}
              labelType={t("rgpdLabelType")}
              types={rgpdTypes}
              labelMessage={t("rgpdLabelMessage")}
              placeholderMessage={t("rgpdPlaceholderMessage")}
              submit={t("rgpdSubmit")}
            />
          </HudPanel>
        </div>
      </div>
    </main>
  );
}
