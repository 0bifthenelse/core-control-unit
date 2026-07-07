"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const TYPE_INTERVAL_MS = 18;
const ERASE_INTERVAL_MS = 9;
const DWELL_MS = 4000;

type Phase = "typing" | "dwelling" | "erasing";

function TypewriterLine({ line, onDone }: { line: string; onDone: () => void }) {
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (phase === "typing") {
      if (charCount >= line.length) {
        const id = setTimeout(() => setPhase("dwelling"), 0);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setCharCount((c) => c + 1), TYPE_INTERVAL_MS);
      return () => clearTimeout(id);
    }

    if (phase === "dwelling") {
      const id = setTimeout(() => setPhase("erasing"), DWELL_MS);
      return () => clearTimeout(id);
    }

    if (charCount <= 0) {
      const id = setTimeout(onDone, 0);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setCharCount((c) => c - 1), ERASE_INTERVAL_MS);
    return () => clearTimeout(id);
  }, [phase, charCount, line, onDone]);

  return (
    <>
      {line.slice(0, charCount)}
      <span className="animate-pulse text-[#ff7d27]">▋</span>
    </>
  );
}

// 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01100001 01101100 01101100 00100000 01101100 01100001 01101110 01100111 01110101 01100001 01100111 01100101 01110011
export function ShowroomHud() {
  const t = useTranslations("showroom.hud");
  const lines = t.raw("lines") as string[];
  const [index, setIndex] = useState(0);

  const pickNextLine = useCallback(() => {
    setIndex((prev) => {
      if (lines.length <= 1) return prev;
      let next = Math.floor(Math.random() * lines.length);
      while (next === prev) next = Math.floor(Math.random() * lines.length);
      return next;
    });
  }, [lines.length]);

  return (
    <div className="pointer-events-none absolute bottom-24 left-1/2 w-full max-w-md -translate-x-1/2 px-4 sm:bottom-6">
      <div className="relative overflow-hidden border border-[color:var(--color-border)] bg-[color:rgba(13,15,18,0.7)] px-4 py-3 backdrop-blur-sm animate-[hud-glow_3s_ease-in-out_infinite]">
        <span key={index} className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff7d27] to-transparent animate-[hud-scan_1s_ease-out]" />
        <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-[#ff7d27]" />
        <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-[#ff7d27]" />
        <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-[#ff7d27]" />
        <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-[#ff7d27]" />
        <div className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff7d27]">
          {t("label")}
        </div>
        <p className="mt-1 min-h-8 text-left font-mono text-xs text-white/80">
          <TypewriterLine key={index} line={lines[index]} onDone={pickNextLine} />
        </p>
      </div>
    </div>
  );
}
