import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-[#1e2330]">
      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[#ff7d27] font-bold text-sm tracking-widest">CCU</span>
            <span className="text-[#1e2330]">|</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e8eaf0]">Core Control Unit</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-[#5a6070]">{t("tagline")}</p>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">Contact</span>
          <a
            href="mailto:contact@corecontrolunit.fr"
            className="block text-[10px] uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors"
          >
            contact@corecontrolunit.fr
          </a>
          <a
            href={`tel:${t("phone").replace(/\s/g, "")}`}
            className="block text-[10px] uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors"
          >
            {t("phone")}
          </a>
          <span className="block text-[10px] uppercase tracking-widest text-[#5a6070]">{t("country")}</span>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <span className="block text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">{t("linksLabel")}</span>
          <a
            href="https://github.com/corecontrolunit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <Link
            href="/mentions-legales"
            className="block text-[10px] uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors"
          >
            {t("legal")}
          </Link>
          <Link
            href="/mentions-legales#rgpd"
            className="block text-[10px] uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors"
          >
            {t("rgpd")}
          </Link>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-[#1e2330] px-6 py-5">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-widest text-[#5a6070]">
            {t("siretLabel")} : {t("siretValue")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#5a6070]">
            © {new Date().getFullYear()} Core Control Unit — {t("rights")}
          </span>
        </div>
      </div>
    </footer>
  );
}
