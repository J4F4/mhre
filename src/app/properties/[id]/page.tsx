import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPropertyBySlug, getAvailableProperties } from "@/lib/store";
import {
  priceLabel,
  typeLabel,
  purposeLabel,
  propertySchema,
} from "@/lib/properties";
import { whatsappLink, telLink, CONTACT } from "@/lib/constants";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyCard } from "@/components/PropertyCard";
import { MapClient } from "@/components/MapClient";
import {
  BedIcon,
  BathIcon,
  AreaIcon,
  MapPinIcon,
  WhatsAppIcon,
  PhoneIcon,
  CheckIcon,
  TagIcon,
} from "@/components/icons";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alhubishi.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyBySlug(id);
  if (!property) return { title: "عقار غير موجود" };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images.map((i) => ({ url: i.url })),
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyBySlug(id);
  if (!property) notFound();

  const waMessage = `مرحباً، أرغب بالاستفسار عن العقار: ${property.title} (${property.reference ?? property.id}).`;

  const related = getAvailableProperties()
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.location.district === property.location.district ||
          p.type === property.type)
    )
    .slice(0, 3);

  const stats = [
    property.bedrooms > 0 && {
      icon: <BedIcon width={22} height={22} />,
      label: "غرف النوم",
      value: property.bedrooms,
    },
    property.bathrooms > 0 && {
      icon: <BathIcon width={22} height={22} />,
      label: "دورات المياه",
      value: property.bathrooms,
    },
    {
      icon: <AreaIcon width={22} height={22} />,
      label: "المساحة",
      value: `${property.area} م²`,
    },
    {
      icon: <TagIcon width={22} height={22} />,
      label: "النوع",
      value: typeLabel(property),
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: React.ReactNode }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertySchema(property, siteUrl)),
        }}
      />

      <div className="pt-28 sm:pt-32">
        <div className="container-luxe">
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-navy-500 dark:text-navy-400">
            <Link href="/" className="hover:text-navy-800 dark:hover:text-white">
              الرئيسية
            </Link>
            <span>/</span>
            <Link
              href="/properties"
              className="hover:text-navy-800 dark:hover:text-white"
            >
              العقارات
            </Link>
            <span>/</span>
            <span className="text-navy-800 dark:text-navy-200">
              {property.title}
            </span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            {/* Left: gallery + details */}
            <div>
              <PropertyGallery images={property.images} title={property.title} />

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-navy-800 px-4 py-1.5 text-sm font-semibold text-white">
                  {purposeLabel(property)}
                </span>
                <span className="rounded-full bg-turquoise-500/90 px-4 py-1.5 text-sm font-semibold text-navy-950">
                  {typeLabel(property)}
                </span>
                {property.reference && (
                  <span className="chip">المرجع: {property.reference}</span>
                )}
              </div>

              <h1 className="mt-4 font-heading text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
                {property.title}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-navy-500 dark:text-navy-400">
                <MapPinIcon width={18} height={18} />
                {property.location.address ?? property.location.district}،{" "}
                {property.location.city}
              </p>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-navy-100 bg-white p-4 text-center dark:border-navy-800 dark:bg-navy-900"
                  >
                    <span className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 dark:bg-navy-800 dark:text-turquoise-300">
                      {s.icon}
                    </span>
                    <p className="text-lg font-bold text-navy-900 dark:text-white">
                      {s.value}
                    </p>
                    <p className="text-xs text-navy-500 dark:text-navy-400">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mt-10">
                <h2 className="mb-3 text-2xl font-bold text-navy-900 dark:text-white">
                  الوصف
                </h2>
                <p className="leading-9 text-navy-600 dark:text-navy-300">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              {property.features.length > 0 && (
                <div className="mt-10">
                  <h2 className="mb-4 text-2xl font-bold text-navy-900 dark:text-white">
                    المميزات
                  </h2>
                  <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {property.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 rounded-xl bg-navy-50 px-4 py-3 text-sm text-navy-700 dark:bg-navy-800 dark:text-navy-100"
                      >
                        <CheckIcon
                          width={16}
                          height={16}
                          className="text-turquoise-600 dark:text-turquoise-300"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Map */}
              <div className="mt-10">
                <h2 className="mb-4 text-2xl font-bold text-navy-900 dark:text-white">
                  الموقع على الخريطة
                </h2>
                <div className="h-[360px] overflow-hidden rounded-3xl border border-navy-100 dark:border-navy-800">
                  <MapClient properties={[property]} />
                </div>
              </div>
            </div>

            {/* Right: sticky contact card */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-luxe dark:border-navy-800 dark:bg-navy-900">
                <p className="text-sm text-navy-500 dark:text-navy-400">
                  {purposeLabel(property)}
                </p>
                <p className="mt-1 text-3xl font-bold text-navy-900 dark:text-turquoise-300">
                  {priceLabel(property)}
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={whatsappLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full"
                  >
                    <WhatsAppIcon width={20} height={20} />
                    تواصل عبر واتساب
                  </a>
                  {CONTACT.phones.slice(0, 2).map((phone) => (
                    <a
                      key={phone}
                      href={telLink(phone)}
                      dir="ltr"
                      className="btn-ghost w-full"
                    >
                      <PhoneIcon width={18} height={18} />
                      {phone}
                    </a>
                  ))}
                </div>

                <p className="mt-6 border-t border-navy-100 pt-5 text-center text-xs leading-6 text-navy-500 dark:border-navy-800 dark:text-navy-400">
                  محمد الحبيشي العقارية
                  <br />
                  {CONTACT.address.full}
                </p>
              </div>
            </aside>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="section">
              <h2 className="mb-8 text-2xl font-bold text-navy-900 dark:text-white sm:text-3xl">
                عقارات مشابهة
              </h2>
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
