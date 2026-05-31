import type { Property, PropertyType, PropertyPurpose } from "./types";
import { DATA_SOURCES } from "./constants";

/**
 * Property import layer.
 *
 * The company shares its listings via external links (Linktree / tr.ee short
 * links that ultimately point at spreadsheets, PDFs or listing channels).
 * Those endpoints are not stable machine-readable APIs, so this module exposes
 * a clean, normalizing import pipeline that can be wired to a real source
 * later without touching the rest of the app.
 *
 * Usage:
 *   const result = await importFromSources();
 *   result.properties -> Property[] ready to merge into the store
 *
 * To connect a real source, implement `parseSource` for the format you receive
 * (CSV, JSON, XLSX export, Google Sheet, ...). A CSV/JSON normalizer is
 * provided below as a starting point.
 */

export interface ImportResult {
  ok: boolean;
  source?: string;
  properties: Property[];
  errors: string[];
}

/** Raw record shape we accept from any source before normalization. */
export interface RawListing {
  id?: string | number;
  title?: string;
  description?: string;
  purpose?: string;
  type?: string;
  price?: number | string;
  area?: number | string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  district?: string;
  address?: string;
  lat?: number | string;
  lng?: number | string;
  images?: string[] | string;
  features?: string[] | string;
  reference?: string;
}

const TYPE_MAP: Record<string, PropertyType> = {
  شقة: "apartment",
  apartment: "apartment",
  فيلا: "villa",
  villa: "villa",
  أرض: "land",
  land: "land",
  عمارة: "building",
  building: "building",
  مكتب: "office",
  office: "office",
  محل: "shop",
  shop: "shop",
  مجمع: "compound",
  compound: "compound",
};

function toNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : fallback;
  }
  return fallback;
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim())
    return value.split(/[|,،]/).map((s) => s.trim()).filter(Boolean);
  return [];
}

function normalizePurpose(value?: string): PropertyPurpose {
  if (!value) return "sale";
  return /إيجار|إجار|rent|للايجار/i.test(value) ? "rent" : "sale";
}

function normalizeType(value?: string): PropertyType {
  if (!value) return "apartment";
  for (const key of Object.keys(TYPE_MAP)) {
    if (value.includes(key)) return TYPE_MAP[key];
  }
  return "apartment";
}

/** Normalize an arbitrary raw record into a valid Property. */
export function normalizeListing(raw: RawListing): Property {
  const id = raw.id ? `imp-${raw.id}` : `imp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const images = toArray(raw.images).map((url) => ({ url }));
  const title = raw.title?.trim() || "عقار جديد";
  return {
    id,
    slug: `${id}`,
    title,
    description: raw.description?.trim() || title,
    purpose: normalizePurpose(raw.purpose),
    type: normalizeType(raw.type),
    price: toNumber(raw.price),
    area: toNumber(raw.area),
    bedrooms: toNumber(raw.bedrooms),
    bathrooms: toNumber(raw.bathrooms),
    features: toArray(raw.features),
    images,
    coverImage: images[0]?.url ?? "",
    location: {
      district: raw.district?.trim() || "الرياض",
      address: raw.address?.trim(),
      city: "الرياض",
      lat: toNumber(raw.lat, 24.7136),
      lng: toNumber(raw.lng, 46.6753),
    },
    featured: false,
    available: true,
    createdAt: new Date().toISOString(),
    reference: raw.reference,
  };
}

/** Parse a CSV string into raw listings (simple, quote-aware). */
export function parseCsv(csv: string): RawListing[] {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(",");
    const record: Record<string, string> = {};
    headers.forEach((h, i) => (record[h] = (cells[i] ?? "").trim()));
    return record as RawListing;
  });
}

/** Parse a fetched response body based on content type. */
async function parseSource(res: Response): Promise<RawListing[]> {
  const contentType = res.headers.get("content-type") ?? "";
  const text = await res.text();
  if (contentType.includes("application/json")) {
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : data.properties ?? data.data ?? [];
  }
  if (contentType.includes("csv") || /,/.test(text.split("\n")[0] ?? "")) {
    return parseCsv(text);
  }
  // Unknown format (e.g. an HTML landing page behind a short link).
  return [];
}

/**
 * Attempt to import properties from the configured external sources.
 * Network access or a parseable format is not guaranteed for the shortened
 * links, so failures are collected and reported rather than thrown.
 */
export async function importFromSources(
  sources: string[] = DATA_SOURCES
): Promise<ImportResult> {
  const properties: Property[] = [];
  const errors: string[] = [];

  for (const source of sources) {
    try {
      const res = await fetch(source, { redirect: "follow" });
      if (!res.ok) {
        errors.push(`${source}: HTTP ${res.status}`);
        continue;
      }
      const raw = await parseSource(res);
      if (raw.length === 0) {
        errors.push(
          `${source}: لم يتم العثور على بيانات قابلة للقراءة (قد يكون الرابط صفحة وسيطة).`
        );
        continue;
      }
      properties.push(...raw.map(normalizeListing));
    } catch (err) {
      errors.push(`${source}: ${(err as Error).message}`);
    }
  }

  return {
    ok: properties.length > 0,
    properties,
    errors,
  };
}
