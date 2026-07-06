import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { AccentLine } from "@/components/ui/AccentLine";

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
export async function HeroSection() {
  const t = await getTranslations("hero");
  const tf = await getTranslations("footer");
  const email = t("email");
  const phone = tf("phone");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,125,39,0.10) 0%, transparent 70%)",
            animationDuration: "6s",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,125,39,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(13,15,18,0.6) 100%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div
            className="absolute h-72 w-72 sm:h-[26rem] sm:w-[26rem] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,125,39,0.20) 0%, transparent 70%)" }}
          />
          <Image
            src="/favicon.svg"
            alt=""
            aria-hidden
            width={420}
            height={420}
            className="w-56 sm:w-[22rem] h-auto opacity-[0.10]"
          />
        </div>
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
          <div className="h-px w-12 bg-[#ff7d27]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#ff7d27]">
            {t("badge")}
          </span>
          <div className="h-px w-12 bg-[#ff7d27]" />
        </div>

        <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
          <span className="block text-text-primary">CORE</span>
          <span className="block text-[#ff7d27]" style={{ textShadow: "0 0 40px rgba(255,125,39,0.45), 0 0 80px rgba(255,125,39,0.2)" }}>CONTROL</span>
          <span className="block text-text-primary">UNIT</span>
        </h1>

        <AccentLine className="my-8 max-w-xs mx-auto" />

        <p className="max-w-2xl mx-auto leading-relaxed mb-10">
          <span className="block text-[11px] uppercase tracking-[0.25em] text-[#ff7d27] mb-4">{t("tagline")}</span>
          <span className="block text-text-primary text-lg sm:text-2xl font-semibold leading-snug">{t("taglineSub")}</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            className="inline-flex items-center gap-3 bg-[#ff7d27] px-8 py-4 text-xs uppercase tracking-widest text-black font-bold hover:bg-[#e06b1a] transition-colors duration-200 shadow-[0_0_20px_rgba(255,125,39,0.35)]"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            {t("ctaPrimary")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs uppercase tracking-widest text-text-muted hover:border-[#ff7d27] hover:text-[#ff7d27] transition-all duration-200"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest text-text-muted">
          <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-[#ff7d27] transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
            </svg>
            {email}
          </a>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-[#ff7d27] transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
            </svg>
            {phone}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[t("pill1"), t("pill2"), t("pill3"), t("pill4")].map((pill) => (
            <span
              key={pill}
              className="border border-border bg-panel/60 px-4 py-2 text-[10px] uppercase tracking-widest text-text-primary"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
