import Link from "next/link";
import { whatsappLink, CONTACT, telLink } from "@/lib/constants";
import { WhatsAppIcon, PhoneIcon } from "./icons";
import { Reveal } from "./Reveal";

export function CTASection() {
  return (
    <section className="section">
      <div className="container-luxe">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-gradient px-8 py-14 text-center text-white shadow-luxe-lg sm:px-16 sm:py-20">
            <svg
              className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 text-white/5"
              viewBox="0 0 160 120"
              fill="none"
              aria-hidden
            >
              <g stroke="currentColor" strokeWidth="3">
                <path d="M14 64 L132 16" />
                <path d="M22 78 L140 30" />
                <path d="M132 16 L132 72" />
              </g>
            </svg>

            <h2 className="relative font-heading text-3xl font-bold sm:text-4xl">
              هل تبحث عن عقارك المثالي؟
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-navy-200">
              فريقنا جاهز لمساعدتك في التأجير أو البيع أو الشراء أو إدارة أملاكك.
              تواصل معنا الآن واحصل على استشارة عقارية مجانية.
            </p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={whatsappLink("مرحباً، أرغب باستشارة عقارية.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full sm:w-auto"
              >
                <WhatsAppIcon width={20} height={20} />
                تواصل عبر واتساب
              </a>
              <a
                href={telLink(CONTACT.phones[0])}
                className="btn-outline w-full sm:w-auto"
              >
                <PhoneIcon width={18} height={18} />
                اتصل بنا
              </a>
              <Link href="/properties" className="btn-ghost w-full border-white/40 text-white hover:bg-white hover:text-navy-900 sm:w-auto">
                تصفح العقارات
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
