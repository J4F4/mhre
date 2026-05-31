import seed from "./data/properties.json";
import type { Property } from "./types";

/**
 * In-memory property store, seeded from the bundled JSON file.
 *
 * This keeps the project runnable with zero external services. Within a single
 * server instance, admin create/update/delete operations persist for the
 * lifetime of that instance. For durable, multi-instance persistence in
 * production, swap the implementation below for a database (Vercel Postgres,
 * Supabase, MongoDB, ...) — the function signatures are the contract the rest
 * of the app depends on, so nothing else needs to change.
 */

// Use a global so the store survives Next.js hot-reloads in development.
const globalForStore = globalThis as unknown as {
  __alhubishiProperties?: Property[];
};

function initStore(): Property[] {
  if (!globalForStore.__alhubishiProperties) {
    globalForStore.__alhubishiProperties = JSON.parse(
      JSON.stringify(seed)
    ) as Property[];
  }
  return globalForStore.__alhubishiProperties;
}

export function getAllProperties(): Property[] {
  return [...initStore()].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getFeaturedProperties(limit = 6): Property[] {
  return getAllProperties()
    .filter((p) => p.featured && p.available)
    .slice(0, limit);
}

export function getAvailableProperties(): Property[] {
  return getAllProperties().filter((p) => p.available);
}

export function getPropertyById(id: string): Property | undefined {
  return initStore().find((p) => p.id === id);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return initStore().find((p) => p.slug === slug);
}

function slugify(input: string): string {
  return (
    input
      .toString()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^؀-ۿa-zA-Z0-9-]/g, "")
      .slice(0, 60) || "property"
  );
}

export function createProperty(
  input: Omit<Property, "id" | "slug" | "createdAt"> & Partial<Property>
): Property {
  const store = initStore();
  const id = input.id ?? `p-${Date.now()}`;
  const property: Property = {
    ...input,
    id,
    slug: input.slug ?? `${slugify(input.title)}-${id}`,
    createdAt: input.createdAt ?? new Date().toISOString(),
    images: input.images ?? [],
    features: input.features ?? [],
  } as Property;
  store.unshift(property);
  return property;
}

export function updateProperty(
  id: string,
  patch: Partial<Property>
): Property | undefined {
  const store = initStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index], ...patch, id };
  return store[index];
}

export function deleteProperty(id: string): boolean {
  const store = initStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
