"use client";

import { usePathname, useRouter } from "@/i18n/navigation";

const locales = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "it", label: "IT" },
];

export function LanguageSelector({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => router.replace(pathname, { locale: code })}
          className={`text-[10px] uppercase tracking-widest px-2 py-1 transition-colors duration-200 ${
            locale === code
              ? "text-[#ff7d27] border border-[#ff7d27]"
              : "text-[#5a6070] hover:text-[#ff7d27]"
          }`}
          style={
            locale === code
              ? { clipPath: "polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))" }
              : undefined
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}
