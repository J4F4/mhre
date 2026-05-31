"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "@/lib/constants";
import { ArrowIcon } from "./icons";

/**
 * Full-screen hero.
 *
 * Background priority:
 *   1. A looping night video at /videos/hero.mp4 (KAFD / Olaya towers at night).
 *   2. The poster image (also shown while the video loads, or if it is absent).
 *
 * Drop your video file at public/videos/hero.mp4 to enable the video; until
 * then the high-quality night poster is used automatically.
 */
const POSTER =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background media */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={POSTER}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
        </video>
        {/* Fallback image layer (covered by video when it plays) */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${POSTER})` }}
          aria-hidden
        />
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
