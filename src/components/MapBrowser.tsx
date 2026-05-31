"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Property, PropertyFilters as Filters } from "@/lib/types";
import { filterProperties, districtsFrom, priceLabel } from "@/lib/properties";
import { PropertyFilters } from "./PropertyFilters";
import { MapClient } from "./MapClient";
import { MapPinIcon } from "./icons";

const EMPTY: Filters = {
  purpose: "all",
  type: "all",
  district: "all",
  bedrooms: "all",
  search: "",
};

export function MapBrowser({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY);

  const districts = useMemo(() => districtsFrom(properties), [properties]);
  const results = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      {/* Sidebar: filters + list */}
      <aside className="flex max-h-[80vh] flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
        <PropertyFilters
          filters={filters}
          districts={districts}
          onChange={setFilters}
          onReset={() => setFilters(EMPTY)}
          resultsCount={results.length}
        />

        <div className="flex-1 space-y-3 overflow-y-auto rounded-3xl border border-navy-100 bg-white p-3 dark:border-navy-800 dark:bg-navy-900">
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/properties/${p.slug}`}
              className="flex gap-3 rounded-2xl p-2 transition hover:bg-navy-50 dark:hover:bg-navy-800"
            >
              <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-navy-100">
                {p.coverImage && (
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-navy-700 dark:text-turquoise-300">
                  {priceLabel(p)}
                </span>
                <span className="line-clamp-1 block text-sm font-semibold text-navy-900 dark:text-white">
                  {p.title}
                </span>
                <span className="mt-1 flex items-center gap-1 text-xs text-navy-500 dark:text-navy-400">
                  <MapPinIcon width={13} height={13} />
                  {p.location.district}
                </span>
              </span>
            </Link>
          ))}
          {results.length === 0 && (
            <p className="py-10 text-center text-sm text-navy-500 dark:text-navy-400">
              لا توجد عقارات مطابقة للفلاتر المختارة.
            </p>
          )}
        </div>
      </aside>

      {/* Map */}
      <div className="h-[60vh] overflow-hidden rounded-3xl border border-navy-100 shadow-card dark:border-navy-800 lg:h-[80vh]">
        <MapClient properties={results} />
      </div>
    </div>
  );
}
