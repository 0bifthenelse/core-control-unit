import { getTranslations } from "next-intl/server";

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
export async function StickyContact() {
  const t = await getTranslations("contact");

  return (
    <a
      href="#contact"
      className="fixed bottom-32 left-6 right-auto sm:bottom-6 sm:left-auto sm:right-6 z-40 inline-flex items-center gap-2 border-2 border-surface bg-[#ff7d27] px-5 py-3 text-xs uppercase tracking-widest text-black font-bold hover:bg-[#e06b1a] transition-colors duration-200 shadow-[0_0_20px_rgba(255,125,39,0.35)] hover:shadow-[0_0_28px_rgba(255,125,39,0.5)]"
      style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
      {t("floating")}
    </a>
  );
}
