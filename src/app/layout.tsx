import type { Metadata, Viewport } from "next";
import { El_Messiri, Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { COMPANY, CONTACT, SOCIAL } from "@/lib/constants";

const heading = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alhubishi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.nameAr} | ${COMPANY.nameEn}`,
    template: `%s | ${COMPANY.nameAr}`,
  },
  description: COMPANY.description,
  keywords: [
    "عقارات الرياض",
    "تأجير عقارات",
    "بيع عقارات",
    "إدارة أملاك",
    "محمد الحبيشي العقارية",
    "Alhubishi Real Estate",
    "فلل للبيع الرياض",
    "شقق للإيجار الرياض",
  ],
  authors: [{ name: COMPANY.nameEn }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    title: `${COMPANY.nameAr} | ${COMPANY.nameEn}`,
    description: COMPANY.description,
    siteName: COMPANY.nameEn,
    images: [{ url: "/logo.svg", width: 160, height: 120, alt: COMPANY.nameAr }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.nameAr} | ${COMPANY.nameEn}`,
    description: COMPANY.description,
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#06122b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: COMPANY.nameEn,
    alternateName: COMPANY.nameAr,
    description: COMPANY.description,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    telephone: CONTACT.phones.map((p) => `+966${p.slice(1)}`),
    sameAs: [SOCIAL.linktree, SOCIAL.whatsappChannel],
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.streetAr,
      addressLocality: CONTACT.address.cityAr,
      addressRegion: CONTACT.address.districtAr,
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT.address.lat,
      longitude: CONTACT.address.lng,
    },
    areaServed: { "@type": "City", name: "الرياض" },
  };

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${heading.variable} ${body.variable} font-body`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
