"use client";

import Link from "next/link";
import { useState } from "react";
import { LanguageSelector } from "./LanguageSelector";

type NavLink = { href: string; label: string };

interface NavBarProps {
  links: NavLink[];
  cta: string;
  locale: string;
}

export function NavBar({ links, cta, locale }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2330] bg-[#0d0f12]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-[#ff7d27] font-bold text-sm tracking-widest uppercase">CCU</span>
          <span className="text-[#5a6070] text-xs tracking-widest uppercase hidden sm:inline">
            Core Control Unit
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-xs uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector locale={locale} />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-[#ff7d27] px-4 py-2 text-xs uppercase tracking-widest text-[#ff7d27] hover:bg-[#ff7d27] hover:text-black transition-all duration-200 shadow-[0_0_12px_rgba(255,125,39,0.25)] hover:shadow-[0_0_20px_rgba(255,125,39,0.4)]"
            style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
          >
            {cta}
          </a>
        </div>

        <button
          className="md:hidden text-[#5a6070] hover:text-[#ff7d27]"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {open ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[#1e2330] bg-[#0d0f12] px-6 py-4">
          <ul className="flex flex-col gap-4 mb-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-xs uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#1e2330] pt-4">
            <LanguageSelector locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
