import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PropertiesBrowser } from "@/components/PropertiesBrowser";
import { getAvailableProperties } from "@/lib/store";

export const metadata: Metadata = {
  title: "العقارات",
  description:
    "تصفّح أحدث العقارات المتاحة للبيع والإيجار في الرياض من محمد الحبيشي العقارية: فلل، شقق، أراضٍ، مكاتب ومزيد.",
  alternates: { canonical: "/properties" },
};

export default function PropertiesPage() {
  const properties = getAvailableProperties();

  return (
    <>
      <PageHeader
        eyebrow="عقاراتنا"
        title="العقارات المتاحة"
        subtitle="اكتشف مجموعتنا المختارة من العقارات السكنية والتجارية في أرقى أحياء الرياض."
      />
      <section className="section">
        <PropertiesBrowser properties={properties} />
      </section>
    </>
  );
}
