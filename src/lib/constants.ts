import type { PropertyType, PropertyPurpose } from "./types";

// ===== Company / brand information =====

export const COMPANY = {
  nameAr: "محمد الحبيشي العقارية",
  nameEn: "Alhubishi Real Estate",
  shortAr: "الحبيشي العقارية",
  tagline: "حلول عقارية احترافية للتأجير والبيع وإدارة الأملاك",
  taglineEn: "Professional real estate solutions for leasing, sales and property management",
  description:
    "محمد الحبيشي العقارية شركة سعودية متخصصة في التأجير والبيع والشراء وإدارة الأملاك والمقاولات في مدينة الرياض، نقدم حلولاً عقارية فاخرة تجمع بين الثقة والاحترافية.",
};

// ===== Contact information =====

export const CONTACT = {
  phones: ["0573888610", "0573888605", "0573888604", "0573888601"],
  /** Primary number used for WhatsApp deep links (international format) */
  whatsapp: "966573888610",
  email: "info@alhubishi.com",
  address: {
    cityAr: "الرياض",
    districtAr: "حي الفيحاء",
    streetAr: "شارع عبيد الله عامر بن الجراح",
    full: "الرياض، حي الفيحاء، شارع عبيد الله عامر بن الجراح",
    // Approximate coordinates for Al-Fayha district, Riyadh
    lat: 24.6469,
    lng: 46.7549,
  },
};

// ===== Social / external links =====

export const SOCIAL = {
  linktree: "https://linktr.ee/AlhubishiRE",
  whatsappChannel:
    "https://whatsapp.com/channel/0029VaPvG7pBfxo3NHfsoD0z",
};

// ===== External data sources for the import layer =====

export const DATA_SOURCES = [
  "https://tr.ee/vIOj5a",
  "https://tr.ee/cxZWr8",
];

// ===== Navigation =====

export const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/properties", label: "العقارات" },
  { href: "/map", label: "خريطة العقارات" },
  { href: "/services", label: "خدماتنا" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

// ===== Labels (Arabic) =====

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment: "شقة",
  villa: "فيلا",
  land: "أرض",
  building: "عمارة",
  office: "مكتب",
  shop: "محل تجاري",
  compound: "مجمع سكني",
};

export const PURPOSE_LABELS: Record<PropertyPurpose, string> = {
  rent: "للإيجار",
  sale: "للبيع",
};

// Common Riyadh districts used for filters / seed data
export const RIYADH_DISTRICTS = [
  "حي العليا",
  "حي الفيحاء",
  "حي الملقا",
  "حي النرجس",
  "حي الياسمين",
  "حي القيروان",
  "حي حطين",
  "حي الرحمانية",
  "حي السليمانية",
  "حي الورود",
  "حي المؤتمرات",
  "حي الصحافة",
];

/** Build a WhatsApp deep link with an optional pre-filled message */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Build a tel: link from a local Saudi number */
export function telLink(phone: string): string {
  const normalized = phone.replace(/[^0-9]/g, "");
  const intl = normalized.startsWith("0")
    ? `+966${normalized.slice(1)}`
    : `+${normalized}`;
  return `tel:${intl}`;
}
