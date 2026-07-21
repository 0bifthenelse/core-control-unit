"use client";

import { Link as LocaleLink } from "@/i18n/navigation";
import { useState } from "react";
import Image from "next/image";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

function NavLinkItem({ href, className, onClick, children }: {
  href: string;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.startsWith("#")) {
    return (
      <LocaleLink href={`/${href}`} className={className} onClick={onClick}>
        {children}
      </LocaleLink>
    );
  }
  return (
    <LocaleLink href={href} className={className} onClick={onClick}>
      {children}
    </LocaleLink>
  );
}

type NavLink = { href: string; label: string };

interface NavBarProps {
  links: NavLink[];
  cta: string;
  menuLabel: string;
  homeLabel: string;
  locale: string;
}

export function NavBar({ links, cta, menuLabel, homeLabel, locale }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2330] bg-[#0d0f12]/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <LocaleLink href="/" className="flex items-center" aria-label={homeLabel}>
          <Image
            src="/ccunit_logo_dark.svg"
            alt="Core Control Unit"
            width={105}
            height={28}
            priority
            className="h-8 sm:h-10 w-auto"
          />
        </LocaleLink>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <NavLinkItem
                href={href}
                className="text-xs uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors duration-200"
              >
                {label}
              </NavLinkItem>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <LanguageSelector locale={locale} />
          <LocaleLink
            href="/#contact"
            className="inline-flex items-center gap-2 border border-[#ff7d27] px-4 py-2 text-xs uppercase tracking-widest text-[#ff7d27] hover:bg-[#ff7d27] hover:text-black transition-all duration-200 shadow-[0_0_12px_rgba(255,125,39,0.25)] hover:shadow-[0_0_20px_rgba(255,125,39,0.4)]"
            style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
          >
            {cta}
          </LocaleLink>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-11 w-11 items-center justify-center text-[#5a6070] hover:text-[#ff7d27] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7d27]"
          onClick={() => setOpen(!open)}
          aria-label={menuLabel}
          aria-controls="mobile-navigation"
          aria-expanded={open}
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
        <div id="mobile-navigation" className="md:hidden border-t border-[#1e2330] bg-[#0d0f12] px-4 py-4 sm:px-6">
          <ul className="flex flex-col gap-4 mb-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <NavLinkItem
                  href={href}
                  className="text-xs uppercase tracking-widest text-[#5a6070] hover:text-[#ff7d27] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </NavLinkItem>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#1e2330] pt-4 flex items-center gap-4">
            <ThemeToggle />
            <LanguageSelector locale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
