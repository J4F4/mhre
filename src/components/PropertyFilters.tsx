"use client";

import type { PropertyFilters as Filters } from "@/lib/types";
import { PROPERTY_TYPE_LABELS, PURPOSE_LABELS } from "@/lib/constants";

const TYPE_ENTRIES = Object.entries(PROPERTY_TYPE_LABELS) as [
  keyof typeof PROPERTY_TYPE_LABELS,
  string
][];

export function PropertyFilters({
  filters,
  districts,
  onChange,
  onReset,
  resultsCount,
}: {
  filters: Filters;
  districts: string[];
  onChange: (next: Filters) => void;
  onReset: () => void;
  resultsCount: number;
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="rounded-3xl border border-navy-100 bg-white p-5 shadow-card dark:border-navy-800 dark:bg-navy-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-navy-900 dark:text-white">
          تصفية النتائج
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-turquoise-600 hover:underline dark:text-turquoise-300"
        >
          إعادة تعيين
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {/* Search */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
            بحث
          </label>
          <input
            type="search"
            value={filters.search ?? ""}
            onChange={(e) => set({ search: e.target.value })}
            placeholder="ابحث بالعنوان أو الحي..."
            className="input-luxe"
          />
        </div>

        {/* Purpose */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
            الغرض
          </label>
          <select
            value={filters.purpose ?? "all"}
            onChange={(e) =>
              set({ purpose: e.target.value as Filters["purpose"] })
            }
            className="input-luxe"
          >
            <option value="all">الكل</option>
            <option value="sale">{PURPOSE_LABELS.sale}</option>
            <option value="rent">{PURPOSE_LABELS.rent}</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
            نوع العقار
          </label>
          <select
            value={filters.type ?? "all"}
            onChange={(e) => set({ type: e.target.value as Filters["type"] })}
            className="input-luxe"
          >
            <option value="all">الكل</option>
            {TYPE_ENTRIES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
            الحي
          </label>
          <select
            value={filters.district ?? "all"}
            onChange={(e) => set({ district: e.target.value })}
            className="input-luxe"
          >
            <option value="all">كل الأحياء</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
            عدد الغرف (الأدنى)
          </label>
          <select
            value={filters.bedrooms ?? "all"}
            onChange={(e) =>
              set({
                bedrooms:
                  e.target.value === "all" ? "all" : Number(e.target.value),
              })
            }
            className="input-luxe"
          >
            <option value="all">الكل</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>

        {/* Price range */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
            نطاق السعر (ريال)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                set({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="من"
              className="input-luxe"
            />
            <input
              type="number"
              min={0}
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                set({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="إلى"
              className="input-luxe"
            />
          </div>
        </div>
      </div>

      <p className="mt-5 rounded-xl bg-navy-50 px-4 py-3 text-center text-sm font-semibold text-navy-800 dark:bg-navy-800 dark:text-navy-100">
        {resultsCount} عقار متاح
      </p>
    </div>
  );
}
