"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

const CONSENT_EVENT = "ccunit-cookie-consent";

function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

function getConsentSnapshot() {
  return window.localStorage.getItem("cookie-consent") === "true";
}

function getServerConsentSnapshot() {
  return true;
}

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
export function CookieBanner() {
  const t = useTranslations("cookies");
  const consented = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getServerConsentSnapshot);
  const visible = !consented;

  function dismiss() {
    localStorage.setItem("cookie-consent", "true");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 flex flex-col items-start gap-2 px-4 py-3 bg-panel border-l-2 border-[#ff7d27] border-t border-r border-b border-border sm:left-auto sm:right-4 sm:max-w-xs sm:flex-row sm:items-center sm:gap-4"
      style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}
      role="region"
      aria-label={t("notice")}
    >
      <p className="text-[10px] uppercase tracking-wider text-text-muted leading-relaxed flex-1">
        {t("notice")}
      </p>
      <button
        onClick={dismiss}
        className="min-h-11 px-1 text-[10px] uppercase tracking-widest text-[#ff7d27] hover:text-[#e06b1a] transition-colors whitespace-nowrap font-bold"
      >
        {t("accept")}
      </button>
    </div>
  );
}
