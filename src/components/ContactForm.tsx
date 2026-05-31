"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/constants";
import { WhatsAppIcon } from "./icons";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    interest: "استفسار عام",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `مرحباً، أنا ${form.name || "—"}.
رقم التواصل: ${form.phone || "—"}
نوع الطلب: ${form.interest}
الرسالة: ${form.message || "—"}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-navy-100 bg-white p-7 shadow-card dark:border-navy-800 dark:bg-navy-900"
    >
      <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
        أرسل لنا رسالة
      </h2>
      <p className="mt-2 text-sm text-navy-500 dark:text-navy-400">
        املأ النموذج وسيتم تحويلك مباشرة إلى واتساب لإكمال المحادثة.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
              الاسم
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input-luxe"
              placeholder="الاسم الكامل"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
              رقم الجوال
            </label>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="input-luxe"
              placeholder="05xxxxxxxx"
              dir="ltr"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
            نوع الطلب
          </label>
          <select
            value={form.interest}
            onChange={(e) => update("interest", e.target.value)}
            className="input-luxe"
          >
            <option>استفسار عام</option>
            <option>التأجير</option>
            <option>البيع</option>
            <option>الشراء</option>
            <option>إدارة الأملاك</option>
            <option>المقاولات</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-navy-600 dark:text-navy-300">
            الرسالة
          </label>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={4}
            className="input-luxe resize-none"
            placeholder="اكتب رسالتك هنا..."
          />
        </div>

        <button type="submit" className="btn-whatsapp w-full">
          <WhatsAppIcon width={20} height={20} />
          إرسال عبر واتساب
        </button>
      </div>
    </form>
  );
}
