import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/types";
import { priceLabel, typeLabel, purposeLabel } from "@/lib/properties";
import { whatsappLink } from "@/lib/constants";
import { BedIcon, BathIcon, AreaIcon, MapPinIcon, WhatsAppIcon } from "./icons";

export function PropertyCard({ property }: { property: Property }) {
  const waMessage = `مرحباً، أرغب بالاستفسار عن العقار: ${property.title} (${property.reference ?? property.id}).`;

  return (
    <article className="card-luxe group flex flex-col hover:-translate-y-1.5 hover:shadow-luxe-lg">
      <Link
        href={`/properties/${property.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
      >
        <Image
          src={property.coverImage}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <span className="rounded-full bg-navy-900/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {purposeLabel(property)}
          </span>
          <span className="rounded-full bg-turquoise-500/90 px-3 py-1 text-xs font-semibold text-navy-950 backdrop-blur-sm">
            {typeLabel(property)}
          </span>
        </div>
        {!property.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-950/60">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-navy-900">
              غير متاح حالياً
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-1 text-lg font-bold text-navy-900 dark:text-turquoise-300">
          {priceLabel(property)}
        </p>
        <Link href={`/properties/${property.slug}`}>
          <h3 className="line-clamp-1 text-base font-bold text-navy-900 transition group-hover:text-navy-700 dark:text-white">
            {property.title}
          </h3>
        </Link>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-navy-500 dark:text-navy-400">
          <MapPinIcon width={15} height={15} />
          {property.location.district}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-navy-100 pt-4 text-sm text-navy-600 dark:border-navy-800 dark:text-navy-300">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedIcon width={17} height={17} />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BathIcon width={17} height={17} />
              {property.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <AreaIcon width={17} height={17} />
            {property.area} م²
          </span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link
            href={`/properties/${property.slug}`}
            className="flex-1 rounded-full bg-navy-800 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-navy-700 dark:bg-turquoise-500 dark:text-navy-950 dark:hover:bg-turquoise-400"
          >
            عرض التفاصيل
          </Link>
          <a
            href={whatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="واتساب"
            className="flex h-10 w-11 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:bg-[#1ebe5b]"
          >
            <WhatsAppIcon width={20} height={20} />
          </a>
        </div>
      </div>
    </article>
  );
}
