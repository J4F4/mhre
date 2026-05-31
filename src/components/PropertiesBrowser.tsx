"use client";

import { useMemo, useState } from "react";
import type { Property, PropertyFilters as Filters } from "@/lib/types";
import { filterProperties, districtsFrom } from "@/lib/properties";
import { PropertyFilters } from "./PropertyFilters";
import { PropertyCard } from "./PropertyCard";

const EMPTY: Filters = {
  purpose: "all",
  type: "all",
  district: "all",
  bedrooms: "all",
  search: "",
};

export function PropertiesBrowser({
  properties,
  initialPurpose,
}: {
  properties: Property[];
  initialPurpose?: Filters["purpose"];
}) {
  const [filters, setFilters] = useState<Filters>({
    ...EMPTY,
    purpose: initialPurpose ?? "all",
  });

  const districts = useMemo(() => districtsFrom(properties), [properties]);
  const results = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters]
  );

  return (
    <div className="container-luxe grid gap-8 lg:grid-cols-[320px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <PropertyFilters
          filters={filters}
          districts={districts}
          onChange={setFilters}
          onReset={() => setFilters(EMPTY)}
          resultsCount={results.length}
        />
      </aside>

      <div>
        {results.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-navy-200 p-12 text-center dark:border-navy-700">
            <p className="text-lg font-bold text-navy-900 dark:text-white">
              لا توجد عقارات مطابقة
            </p>
            <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
              جرّب تعديل خيارات التصفية للحصول على نتائج أكثر.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
