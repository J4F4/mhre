"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, whatsappLink } from "@/lib/constants";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const onHome = pathname === "/";
  // Transparent over the hero only at the top of the homepage.
  const transparent = onHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        transparent
          ? "bg-transparent"
          : "border-b border-navy-100 bg-white/90 shadow-sm backdrop-blur-md dark:border-navy-800 dark:bg-navy-950/90"
      }`}
    >
      <nav className="container-luxe flex h-20 items-center justify-between gap-4">
        <Logo inverted={transparent} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                    transparent
                      ? "text-white/90 hover:text-white"
                      : "text-navy-700 hover:text-navy-900 dark:text-navy-200 dark:hover:text-white"
                  } ${active ? "font-bold" : ""}`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-turquoise-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle
            className={transparent ? "border-white/40 text-white hover:bg-white/10" : ""}
          />
          <a
            href={whatsappLink("مرحباً، أرغب بالاستفسار عن خدماتكم العقارية.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden btn-primary sm:inline-flex"
          >
            تواصل معنا
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="القائمة"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
              transparent
                ? "border-white/40 text-white"
                : "border-navy-200 text-navy-800 dark:border-navy-700 dark:text-white"
            }`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-100 bg-white px-5 pb-6 pt-2 shadow-luxe dark:border-navy-800 dark:bg-navy-950 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-xl px-4 py-3 text-base transition ${
                      active
                        ? "bg-navy-50 font-bold text-navy-900 dark:bg-navy-800 dark:text-white"
                        : "text-navy-700 hover:bg-navy-50 dark:text-navy-200 dark:hover:bg-navy-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={whatsappLink("مرحباً، أرغب بالاستفسار عن خدماتكم العقارية.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4 w-full"
          >
            تواصل عبر واتساب
          </a>
        </div>
      )}
    </header>
  );
}
