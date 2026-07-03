import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-[#1e2330] py-8 px-6">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[#ff7d27] font-bold text-xs tracking-widest">CCU</span>
          <span className="text-[#1e2330]">|</span>
          <span className="text-[10px] uppercase tracking-widest text-[#5a6070]">
            © {new Date().getFullYear()} Core Control Unit
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[10px] uppercase tracking-widest text-[#5a6070]">{t("country")}</span>
          <a
            href="mailto:contact@corecontrolunit.fr"
            className="text-[10px] uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors"
          >
            contact@corecontrolunit.fr
          </a>
        </div>
      </div>
    </footer>
  );
}
