import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export function Logo({
  className = "",
  showText = true,
  inverted = false,
}: {
  className?: string;
  showText?: boolean;
  inverted?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={COMPANY.nameAr}
      className={`group flex items-center gap-3 ${className}`}
    >
      <span
        className={`shrink-0 ${
          inverted ? "text-white" : "text-navy-800 dark:text-white"
        }`}
      >
        {/* Brand mark — rooflines + diamond motif */}
        <svg width="46" height="40" viewBox="0 0 160 120" fill="none" aria-hidden>
          <g stroke="currentColor" strokeWidth="6" strokeLinecap="round">
            <path d="M14 64 L132 16" />
            <path d="M22 78 L140 30" />
            <path d="M132 16 L132 72" />
            <path d="M140 30 L140 72" />
          </g>
          <g fill="currentColor">
            <rect x="40" y="86" width="11" height="11" transform="rotate(45 45.5 91.5)" />
            <rect x="66" y="86" width="11" height="11" transform="rotate(45 71.5 91.5)" />
            <rect x="92" y="86" width="11" height="11" transform="rotate(45 97.5 91.5)" />
          </g>
        </svg>
      </span>
      {showText && (
        <span className="flex flex-col leading-tight">
          <span
            className={`font-heading text-lg font-bold sm:text-xl ${
              inverted ? "text-white" : "text-navy-800 dark:text-white"
            }`}
          >
            {COMPANY.nameAr}
          </span>
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.3em] ${
              inverted ? "text-turquoise-200" : "text-turquoise-600 dark:text-turquoise-300"
            }`}
          >
            {COMPANY.nameEn}
          </span>
        </span>
      )}
    </Link>
  );
}
