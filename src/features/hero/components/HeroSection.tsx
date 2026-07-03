import { getTranslations } from "next-intl/server";
import { AccentLine } from "@/components/ui/AccentLine";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#1e2330 1px, transparent 1px), linear-gradient(90deg, #1e2330 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,125,39,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-[#ff7d27]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">
            {t("badge")}
          </span>
          <div className="h-px w-12 bg-[#ff7d27]" />
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
          <span className="block text-[#e8eaf0]">CORE</span>
          <span className="block text-[#ff7d27]">CONTROL</span>
          <span className="block text-[#e8eaf0]">UNIT</span>
        </h1>

        <AccentLine className="my-8 max-w-xs mx-auto" />

        <p className="text-sm sm:text-base text-[#5a6070] max-w-xl mx-auto leading-relaxed mb-12 uppercase tracking-widest">
          {t("tagline")}
          <br />
          <span className="text-[#e8eaf0]">{t("taglineSub")}</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            className="inline-flex items-center gap-3 bg-[#ff7d27] px-8 py-4 text-xs uppercase tracking-widest text-black font-bold hover:bg-[#e06b1a] transition-colors duration-200"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            {t("ctaPrimary")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-[#1e2330] px-8 py-4 text-xs uppercase tracking-widest text-[#5a6070] hover:border-[#ff7d27] hover:text-[#ff7d27] transition-all duration-200"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <div className="mt-24 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: "12+", label: t("stat1Label") },
            { value: "80+", label: t("stat2Label") },
            { value: "100%", label: t("stat3Label") },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-[#ff7d27]">{value}</div>
              <div className="text-[10px] uppercase tracking-widest text-[#5a6070] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#5a6070]">
        <span className="text-[10px] uppercase tracking-widest">{t("scroll")}</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#5a6070] to-transparent" />
      </div>
    </section>
  );
}
