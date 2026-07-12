"use client";

import { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

export function ImageLightbox({ className, style, ...imageProps }: ImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Image
        {...imageProps}
        className={`${className ?? ""} cursor-zoom-in`}
        onClick={(event) => {
          if (event.button === 0) setOpen(true);
        }}
        style={style}
      />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12 bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full h-full max-w-6xl border border-[#ff7d27]/40 shadow-[0_0_40px_rgba(255,125,39,0.2)] bg-panel cursor-zoom-out"
            onClick={() => setOpen(false)}
          >
            <Image
              {...imageProps}
              fill
              sizes="90vw"
              className="object-contain"
              style={undefined}
            />
          </div>
        </div>
      )}
    </>
  );
}
