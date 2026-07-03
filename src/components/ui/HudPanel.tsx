import { ReactNode } from "react";

interface HudPanelProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

export function HudPanel({ children, className = "", label }: HudPanelProps) {
  return (
    <div
      className={`relative border border-[#1e2330] bg-[#111418] ${className}`}
      style={{
        clipPath:
          "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
      }}
    >
      {label && (
        <span className="absolute top-0 left-3 -translate-y-1/2 bg-[#111418] px-2 text-[10px] uppercase tracking-widest text-[#ff7d27]">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
