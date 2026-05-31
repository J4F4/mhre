"use client";

import { whatsappLink } from "@/lib/constants";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("مرحباً، أرغب بالاستفسار عن عقاراتكم.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="group fixed bottom-6 left-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-4 text-white shadow-luxe-lg transition-transform hover:scale-105"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <WhatsAppIcon width={28} height={28} className="relative" />
      <span className="relative hidden pe-1 text-sm font-semibold sm:inline">
        واتساب
      </span>
    </a>
  );
}
