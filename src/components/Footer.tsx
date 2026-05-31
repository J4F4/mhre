import Link from "next/link";
import {
  COMPANY,
  CONTACT,
  SOCIAL,
  NAV_LINKS,
  telLink,
  whatsappLink,
} from "@/lib/constants";
import { Logo } from "./Logo";
import { PhoneIcon, WhatsAppIcon, MapPinIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-800 bg-navy-950 text-navy-100">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Logo inverted />
          <p className="mt-5 max-w-xs text-sm leading-7 text-navy-300">
            {COMPANY.description}
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-5 text-base font-bold text-white">روابط سريعة</h3>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-navy-300 transition hover:text-turquoise-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-base font-bold text-white">تواصل معنا</h3>
          <ul className="space-y-3 text-sm">
            {CONTACT.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={telLink(phone)}
                  dir="ltr"
                  className="inline-flex items-center gap-2 text-navy-300 transition hover:text-turquoise-300"
                >
                  <PhoneIcon width={16} height={16} />
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-navy-300 transition hover:text-turquoise-300"
              >
                <WhatsAppIcon width={16} height={16} />
                واتساب
              </a>
            </li>
          </ul>
        </div>

        {/* Address + social */}
        <div>
          <h3 className="mb-5 text-base font-bold text-white">العنوان</h3>
          <p className="flex items-start gap-2 text-sm leading-7 text-navy-300">
            <MapPinIcon width={18} height={18} className="mt-1 shrink-0" />
            <span>
              {CONTACT.address.cityAr}
              <br />
              {CONTACT.address.districtAr}
              <br />
              {CONTACT.address.streetAr}
            </span>
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href={SOCIAL.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="قناة واتساب"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-700 transition hover:border-turquoise-400 hover:text-turquoise-300"
            >
              <WhatsAppIcon width={20} height={20} />
            </a>
            <a
              href={SOCIAL.linktree}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Linktree"
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-navy-700 px-4 text-sm transition hover:border-turquoise-400 hover:text-turquoise-300"
            >
              Linktree
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-400 sm:flex-row">
          <p>
            © {year} {COMPANY.nameAr} — {COMPANY.nameEn}. جميع الحقوق محفوظة.
          </p>
          <p>الرياض، المملكة العربية السعودية</p>
        </div>
      </div>
    </footer>
  );
}
