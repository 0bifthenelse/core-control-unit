"use client";

import { useEffect, useRef, useState } from "react";
import Image, { ImageProps } from "next/image";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

export function ImageLightbox({ className, style, ...imageProps }: ImageProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${t("openImage")}: ${imageProps.alt}`}
        className="relative block h-full w-full cursor-zoom-in rounded-inherit outline-none focus-visible:ring-2 focus-visible:ring-[#ff7d27] focus-visible:ring-offset-2 focus-visible:ring-offset-panel"
        onClick={(event) => {
          if (event.button === 0) setOpen(true);
        }}
      >
        <Image {...imageProps} alt={imageProps.alt} className={className} style={style} />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${imageProps.alt}: ${t("imagePreview")}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm motion-reduce:backdrop-blur-none sm:p-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) close();
            }}
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                event.preventDefault();
                closeRef.current?.focus();
              }
            }}
          >
            <div className="relative flex h-full w-full items-center justify-center border border-[#ff7d27]/40 bg-panel p-3 shadow-[0_0_40px_rgba(255,125,39,0.2)] sm:p-6">
              <button
                ref={closeRef}
                type="button"
                aria-label={t("close")}
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center border border-[#ff7d27]/50 bg-black/70 text-2xl leading-none text-white outline-none transition-colors hover:bg-[#ff7d27] focus-visible:ring-2 focus-visible:ring-[#ff7d27] motion-reduce:transition-none"
                onClick={close}
              >
                <span aria-hidden="true">×</span>
              </button>
              <div className="relative h-full w-full">
                <Image
                  {...imageProps}
                  alt={imageProps.alt}
                  fill
                  sizes="90vw"
                  className="object-contain motion-reduce:transition-none"
                  style={undefined}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
