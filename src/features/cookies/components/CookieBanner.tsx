"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-4 px-4 py-3 bg-panel border-l-2 border-[#ff7d27] border-t border-r border-b border-border max-w-xs"
      style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
      role="region"
      aria-label="Cookie notice"
    >
      <p className="text-[10px] uppercase tracking-wider text-text-muted leading-relaxed flex-1">
        {t("notice")}
      </p>
      <button
        onClick={dismiss}
        className="text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors whitespace-nowrap font-bold"
      >
        {t("accept")}
      </button>
    </div>
  );
}
