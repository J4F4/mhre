"use client";

import { useState } from "react";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { LOGO_IMAGE } from "@/lib/assets";

export function Logo({
  className = "",
  showText = true,
  inverted = false,
}: {
  className?: string;
  showText?: boolean;
  inverted?: boolean;
}) {
  // يحاول عرض شعار الشركة الحقيقي (public/logo.png) وإن لم يوجد يعرض الرمز البديل.
  const [imgOk, setImgOk] = useState(true);

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
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={LOGO_IMAGE}
            alt={COMPANY.nameAr}
            width={52}
            height={44}
            onError={() => setImgOk(false)}
            className={`h-11 w-auto object-contain ${
              inverted ? "brightness-0 invert" : "dark:brightness-0 dark:invert"
            }`}
          />
        ) : (
          // الرمز البديل — خطوط أسطح + معينات (يحاكي روح شعار الشركة)
          <svg width="52" height="44" viewBox="0 0 160 120" fill="none" aria-hidden>
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
        )}
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
