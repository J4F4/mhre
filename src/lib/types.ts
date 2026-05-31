// ===== Core domain types for Alhubishi Real Estate =====

export type PropertyPurpose = "rent" | "sale";

export type PropertyType =
  | "apartment" // شقة
  | "villa" // فيلا
  | "land" // أرض
  | "building" // عمارة
  | "office" // مكتب
  | "shop" // محل تجاري
  | "compound"; // مجمع سكني

export interface PropertyImage {
  url: string;
  alt?: string;
}

export interface PropertyLocation {
  /** Riyadh district name in Arabic, e.g. "حي العليا" */
  district: string;
  /** Free-form address line in Arabic */
  address?: string;
  city: string; // الرياض
  lat: number;
  lng: number;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  /** Price in SAR. For rent this is the yearly price. */
  price: number;
  /** Built-up area in square meters */
  area: number;
  bedrooms: number;
  bathrooms: number;
  /** Optional amenities list in Arabic */
  features: string[];
  images: PropertyImage[];
  coverImage: string;
  location: PropertyLocation;
  /** Featured properties appear on the homepage */
  featured: boolean;
  /** Currently available for the chosen purpose */
  available: boolean;
  createdAt: string; // ISO date
  reference?: string; // internal reference code
}

export interface PropertyFilters {
  purpose?: PropertyPurpose | "all";
  type?: PropertyType | "all";
  district?: string | "all";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | "all";
  search?: string;
}
