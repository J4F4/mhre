"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";
import { ArrowIcon } from "./icons";
import {
  HERO_POSTER_LOCAL,
  HERO_POSTER_FALLBACK,
  HERO_VIDEO,
} from "@/lib/assets";

/**
 * Full-screen hero.
 *
 * Background priority (الأعلى يغطّي ما تحته):
 *   1. فيديو الخلفية public/videos/hero.mp4 (مركز الملك عبدالله المالي ليلاً).
 *   2. صورتك المحلية public/hero.jpg (تظهر تلقائياً عند رفعها).
 *   3. صورة بديلة محايدة (ليست معلماً لمدينة أخرى).
 *
 * لتغيير خلفية الـ Hero: ضع صورتك في public/hero.jpg (أو فيديو في
 * public/videos/hero.mp4) ولا حاجة لأي تعديل في الكود.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background media — layered, top covers bottom */}
      <div className="absolute inset-0 -z-10">
        {/* 3) البديل المحايد في الأسفل */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_POSTER_FALLBACK})` }}
          aria-hidden
        />
        {/* 2) صورتك المحلية فوقه (تختفي تلقائياً إن لم يوجد الملف) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_POSTER_LOCAL})` }}
          aria-hidden
        />
        {/* 1) الفيديو في الأعلى (إن وُجد) */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      <div className="container-luxe pt-24 text-center sm:text-right">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block rounded-full border border-white/30 bg-white/5 px-5 py-2 text-xs font-medium tracking-[0.2em] text-turquoise-100 backdrop-blur-sm"
        >
          الرياض · المملكة العربية السعودية
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          {COMPANY.nameAr}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 text-lg font-medium uppercase tracking-[0.4em] text-turquoise-200 sm:text-xl"
        >
          {COMPANY.nameEn}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/90 sm:mx-0 sm:text-xl"
        >
          {COMPANY.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-start"
        >
          <Link href="/properties" className="btn-primary w-full sm:w-auto">
            تصفح العقارات
            <ArrowIcon width={18} height={18} />
          </Link>
          <Link href="/contact" className="btn-outline w-full sm:w-auto">
            تواصل معنا
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-x-0 bottom-8 flex justify-center"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1">
          <span className="h-2 w-1 animate-float rounded-full bg-white/80" />
        </span>
      </motion.div>
    </section>
  );
}
