"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "it", label: "IT" },
];

export function LanguageSelector({ locale }: { locale: string; }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  function selectLocale(code: string) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] hover:cursor-pointer transition-colors duration-200 px-2 py-1.5 border border-[#1e2330] hover:border-[#ff7d27]/40"
        style={{ clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))" }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="text-[#ff7d27]">{locale.toUpperCase()}</span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="currentColor"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 right-0 bg-[#111418] border border-[#1e2330] py-1 z-50 min-w-[60px]"
          style={{ clipPath: "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))" }}
          role="listbox"
        >
          {locales.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => selectLocale(code)}
              role="option"
              aria-selected={locale === code}
              className={`w-full text-left px-3 py-1.5 text-[10px] uppercase tracking-widest transition-colors hover:cursor-pointer duration-150 ${locale === code
                ? "text-[#ff7d27] bg-[#ff7d27]/5"
                : "text-[#5a6070] hover:text-[#ff7d27] hover:bg-[#ff7d27]/5"
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
