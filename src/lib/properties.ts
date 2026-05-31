import type { Property, PropertyFilters } from "./types";
import { PROPERTY_TYPE_LABELS, PURPOSE_LABELS } from "./constants";

/** Format a SAR price with Arabic thousands separators. */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-SA", {
    maximumFractionDigits: 0,
  }).format(price);
}

/** Full price label including currency and (for rentals) the period. */
export function priceLabel(property: Pick<Property, "price" | "purpose">): string {
  const value = `${formatPrice(property.price)} ريال`;
  return property.purpose === "rent" ? `${value} / سنوياً` : value;
}

export function typeLabel(property: Pick<Property, "type">): string {
  return PROPERTY_TYPE_LABELS[property.type] ?? property.type;
}

export function purposeLabel(property: Pick<Property, "purpose">): string {
  return PURPOSE_LABELS[property.purpose] ?? property.purpose;
}

/** Pure client-side filtering used by the properties & map pages. */
export function filterProperties(
  properties: Property[],
  filters: PropertyFilters
): Property[] {
  return properties.filter((p) => {
    if (filters.purpose && filters.purpose !== "all" && p.purpose !== filters.purpose)
      return false;
    if (filters.type && filters.type !== "all" && p.type !== filters.type)
      return false;
    if (
      filters.district &&
      filters.district !== "all" &&
      p.location.district !== filters.district
    )
      return false;
    if (typeof filters.minPrice === "number" && p.price < filters.minPrice)
      return false;
    if (typeof filters.maxPrice === "number" && p.price > filters.maxPrice)
      return false;
    if (
      filters.bedrooms &&
      filters.bedrooms !== "all" &&
      p.bedrooms < filters.bedrooms
    )
      return false;
    if (filters.search) {
      const q = filters.search.trim().toLowerCase();
      const haystack = `${p.title} ${p.description} ${p.location.district} ${p.reference ?? ""}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

/** Unique list of districts present in the dataset (for filter dropdowns). */
export function districtsFrom(properties: Property[]): string[] {
  return Array.from(new Set(properties.map((p) => p.location.district))).sort();
}

/** Build a JSON-LD RealEstateListing schema object for SEO. */
export function propertySchema(property: Property, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "RealEstateListing"],
    name: property.title,
    description: property.description,
    image: property.images.map((i) => i.url),
    url: `${siteUrl}/properties/${property.slug}`,
    category: typeLabel(property),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "SAR",
      availability: property.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      businessFunction:
        property.purpose === "rent"
          ? "http://purl.org/goodrelations/v1#LeaseOut"
          : "http://purl.org/goodrelations/v1#Sell",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location.city,
      addressRegion: property.location.district,
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.location.lat,
      longitude: property.location.lng,
    },
  };
}
