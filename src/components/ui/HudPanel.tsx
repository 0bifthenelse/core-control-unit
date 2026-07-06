import { ReactNode } from "react";

interface HudPanelProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  label?: string;
}

export function HudPanel({ children, className = "", wrapperClassName = "", label }: HudPanelProps) {
  return (
    <div className={`relative h-full ${wrapperClassName}`}>
      <div
        className={`relative border border-border bg-panel ${className}`}
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        {children}
      </div>
      {label && (
        <span className="absolute top-0 left-3 -translate-y-1/2 bg-panel px-2 text-[10px] uppercase tracking-widest text-[#ff7d27]">
          {label}
        </span>
      )}
    </div>
  );
}
