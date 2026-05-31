"use client";

import { useCallback, useEffect, useState } from "react";
import type { Property, PropertyPurpose, PropertyType } from "@/lib/types";
import { PROPERTY_TYPE_LABELS, PURPOSE_LABELS, RIYADH_DISTRICTS } from "@/lib/constants";
import { priceLabel, typeLabel } from "@/lib/properties";

const TOKEN_KEY = "alhubishi_admin_token";

type FormState = {
  id?: string;
  title: string;
  description: string;
  purpose: PropertyPurpose;
  type: PropertyType;
  price: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  district: string;
  address: string;
  lat: string;
  lng: string;
  coverImage: string;
  images: string;
  features: string;
  reference: string;
  featured: boolean;
  available: boolean;
};

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  purpose: "sale",
  type: "apartment",
  price: "",
  area: "",
  bedrooms: "0",
  bathrooms: "0",
  district: RIYADH_DISTRICTS[0],
  address: "",
  lat: "24.7136",
  lng: "46.6753",
  coverImage: "",
  images: "",
  features: "",
  reference: "",
  featured: false,
  available: true,
};

function propertyToForm(p: Property): FormState {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    purpose: p.purpose,
    type: p.type,
    price: String(p.price),
    area: String(p.area),
    bedrooms: String(p.bedrooms),
    bathrooms: String(p.bathrooms),
    district: p.location.district,
    address: p.location.address ?? "",
    lat: String(p.location.lat),
    lng: String(p.location.lng),
    coverImage: p.coverImage,
    images: p.images.map((i) => i.url).join("\n"),
    features: p.features.join("، "),
    reference: p.reference ?? "",
    featured: p.featured,
    available: p.available,
  };
}

function formToBody(form: FormState) {
  const imageUrls = form.images
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const cover = form.coverImage.trim() || imageUrls[0] || "";
  return {
    ...(form.id ? { id: form.id } : {}),
    title: form.title.trim(),
    description: form.description.trim(),
    purpose: form.purpose,
    type: form.type,
    price: Number(form.price) || 0,
    area: Number(form.area) || 0,
    bedrooms: Number(form.bedrooms) || 0,
    bathrooms: Number(form.bathrooms) || 0,
    coverImage: cover,
    images: imageUrls.map((url) => ({ url })),
    features: form.features
      .split(/[،,]/)
      .map((s) => s.trim())
      .filter(Boolean),
    location: {
      district: form.district,
      address: form.address.trim(),
      city: "الرياض",
      lat: Number(form.lat) || 24.7136,
      lng: Number(form.lng) || 46.6753,
    },
    featured: form.featured,
    available: form.available,
    reference: form.reference.trim() || undefined,
  };
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) setToken(saved);
  }, []);

  const loadProperties = useCallback(async () => {
    const res = await fetch("/api/properties");
    const data = await res.json();
    setProperties(data.properties ?? []);
  }, []);

  useEffect(() => {
    if (token) loadProperties();
  }, [token, loadProperties]);

  const flash = (type: "ok" | "err", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(TOKEN_KEY, passwordInput);
    setToken(passwordInput);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setProperties([]);
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditing(false);
  };

  const handleEdit = (p: Property) => {
    setForm(propertyToForm(p));
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    const body = formToBody(form);
    const url = editing && form.id ? `/api/properties/${form.id}` : "/api/properties";
    const method = editing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) handleLogout();
        flash("err", data.error ?? "حدث خطأ.");
      } else {
        flash("ok", editing ? "تم تحديث العقار بنجاح." : "تمت إضافة العقار بنجاح.");
        resetForm();
        loadProperties();
      }
    } catch {
      flash("err", "تعذّر الاتصال بالخادم.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm("هل أنت متأكد من حذف هذا العقار؟")) return;
    const res = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      flash("ok", "تم حذف العقار.");
      loadProperties();
    } else {
      if (res.status === 401) handleLogout();
      flash("err", "تعذّر حذف العقار.");
    }
  };

  const handleImport = async () => {
    if (!token) return;
    setLoading(true);
    flash("ok", "جارٍ محاولة استيراد البيانات من المصادر...");
    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ persist: true }),
      });
      const data = await res.json();
      if (data.imported > 0) {
        flash("ok", `تم استيراد ${data.imported} عقار.`);
        loadProperties();
      } else {
        flash(
          "err",
          `تعذّر استيراد بيانات قابلة للقراءة. ${data.errors?.[0] ?? ""}`
        );
      }
    } catch {
      flash("err", "فشل الاستيراد.");
    } finally {
      setLoading(false);
    }
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  // ===== Login screen =====
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-50 px-5 pt-20 dark:bg-navy-950">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-navy-100 bg-white p-8 shadow-luxe dark:border-navy-800 dark:bg-navy-900"
        >
          <h1 className="mb-2 text-2xl font-bold text-navy-900 dark:text-white">
            لوحة التحكم
          </h1>
          <p className="mb-6 text-sm text-navy-500 dark:text-navy-400">
            أدخل كلمة المرور للوصول إلى إدارة العقارات.
          </p>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="كلمة المرور"
            className="input-luxe mb-4"
            autoFocus
          />
          <button type="submit" className="btn-primary w-full">
            دخول
          </button>
        </form>
      </div>
    );
  }

  // ===== Dashboard =====
  return (
    <div className="min-h-screen bg-navy-50 pt-24 pb-20 dark:bg-navy-950">
      <div className="container-luxe">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white">
              لوحة التحكم
            </h1>
            <p className="mt-1 text-sm text-navy-500 dark:text-navy-400">
              إدارة عقارات محمد الحبيشي العقارية
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleImport}
              disabled={loading}
              className="btn-ghost"
            >
              استيراد من المصادر
            </button>
            <button onClick={handleLogout} className="btn-ghost">
              تسجيل الخروج
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 rounded-xl px-5 py-3 text-sm font-medium ${
              message.type === "ok"
                ? "bg-turquoise-100 text-turquoise-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-navy-100 bg-white p-6 shadow-card dark:border-navy-800 dark:bg-navy-900"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-navy-900 dark:text-white">
                  {editing ? "تعديل عقار" : "إضافة عقار جديد"}
                </h2>
                {editing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs font-semibold text-turquoise-600 hover:underline"
                  >
                    إلغاء التعديل
                  </button>
                )}
              </div>

              <Field label="العنوان">
                <input
                  required
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className="input-luxe"
                />
              </Field>

              <Field label="الوصف">
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={3}
                  className="input-luxe resize-none"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="الغرض">
                  <select
                    value={form.purpose}
                    onChange={(e) =>
                      update("purpose", e.target.value as PropertyPurpose)
                    }
                    className="input-luxe"
                  >
                    {(Object.keys(PURPOSE_LABELS) as PropertyPurpose[]).map((k) => (
                      <option key={k} value={k}>
                        {PURPOSE_LABELS[k]}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="النوع">
                  <select
                    value={form.type}
                    onChange={(e) =>
                      update("type", e.target.value as PropertyType)
                    }
                    className="input-luxe"
                  >
                    {(Object.keys(PROPERTY_TYPE_LABELS) as PropertyType[]).map(
                      (k) => (
                        <option key={k} value={k}>
                          {PROPERTY_TYPE_LABELS[k]}
                        </option>
                      )
                    )}
                  </select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="السعر (ريال)">
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    className="input-luxe"
                  />
                </Field>
                <Field label="المساحة (م²)">
                  <input
                    type="number"
                    value={form.area}
                    onChange={(e) => update("area", e.target.value)}
                    className="input-luxe"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Field label="غرف النوم">
                  <input
                    type="number"
                    value={form.bedrooms}
                    onChange={(e) => update("bedrooms", e.target.value)}
                    className="input-luxe"
                  />
                </Field>
                <Field label="دورات المياه">
                  <input
                    type="number"
                    value={form.bathrooms}
                    onChange={(e) => update("bathrooms", e.target.value)}
                    className="input-luxe"
                  />
                </Field>
              </div>

              <Field label="الحي">
                <input
                  list="districts"
                  value={form.district}
                  onChange={(e) => update("district", e.target.value)}
                  className="input-luxe"
                />
                <datalist id="districts">
                  {RIYADH_DISTRICTS.map((d) => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </Field>

              <Field label="العنوان التفصيلي">
                <input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className="input-luxe"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="خط العرض (lat)">
                  <input
                    value={form.lat}
                    onChange={(e) => update("lat", e.target.value)}
                    className="input-luxe"
                    dir="ltr"
                  />
                </Field>
                <Field label="خط الطول (lng)">
                  <input
                    value={form.lng}
                    onChange={(e) => update("lng", e.target.value)}
                    className="input-luxe"
                    dir="ltr"
                  />
                </Field>
              </div>

              <Field label="صورة الغلاف (رابط)">
                <input
                  value={form.coverImage}
                  onChange={(e) => update("coverImage", e.target.value)}
                  className="input-luxe"
                  dir="ltr"
                  placeholder="https://..."
                />
              </Field>

              <Field label="روابط الصور (رابط في كل سطر)">
                <textarea
                  value={form.images}
                  onChange={(e) => update("images", e.target.value)}
                  rows={3}
                  className="input-luxe resize-none"
                  dir="ltr"
                  placeholder="https://...\nhttps://..."
                />
              </Field>

              <Field label="المميزات (مفصولة بفاصلة)">
                <input
                  value={form.features}
                  onChange={(e) => update("features", e.target.value)}
                  className="input-luxe"
                  placeholder="مسبح، مصعد، حديقة"
                />
              </Field>

              <Field label="الرقم المرجعي">
                <input
                  value={form.reference}
                  onChange={(e) => update("reference", e.target.value)}
                  className="input-luxe"
                  dir="ltr"
                />
              </Field>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-navy-700 dark:text-navy-200">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => update("featured", e.target.checked)}
                    className="h-4 w-4 accent-navy-800"
                  />
                  عقار مميز
                </label>
                <label className="flex items-center gap-2 text-sm text-navy-700 dark:text-navy-200">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(e) => update("available", e.target.checked)}
                    className="h-4 w-4 accent-navy-800"
                  />
                  متاح
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading
                  ? "جارٍ الحفظ..."
                  : editing
                    ? "حفظ التعديلات"
                    : "إضافة العقار"}
              </button>
            </form>
          </div>

          {/* List */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-navy-900 dark:text-white">
              العقارات ({properties.length})
            </h2>
            <div className="space-y-3">
              {properties.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900"
                >
                  <div
                    className="h-16 w-20 shrink-0 rounded-xl bg-navy-100 bg-cover bg-center dark:bg-navy-800"
                    style={
                      p.coverImage
                        ? { backgroundImage: `url(${p.coverImage})` }
                        : undefined
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 font-bold text-navy-900 dark:text-white">
                      {p.title}
                    </p>
                    <p className="text-xs text-navy-500 dark:text-navy-400">
                      {typeLabel(p)} · {p.location.district} · {priceLabel(p)}
                    </p>
                    <div className="mt-1 flex gap-2">
                      {p.featured && (
                        <span className="rounded bg-turquoise-100 px-2 py-0.5 text-[10px] font-semibold text-turquoise-800">
                          مميز
                        </span>
                      )}
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                          p.available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.available ? "متاح" : "غير متاح"}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="rounded-lg bg-navy-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy-700"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
        {label}
      </label>
      {children}
    </div>
  );
}
