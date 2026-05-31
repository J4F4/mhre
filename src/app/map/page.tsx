import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MapBrowser } from "@/components/MapBrowser";
import { getAvailableProperties } from "@/lib/store";

export const metadata: Metadata = {
  title: "خريطة العقارات",
  description:
    "استكشف جميع عقارات محمد الحبيشي العقارية المتاحة في الرياض على خريطة تفاعلية مع فلاتر للحي والسعر والنوع وعدد الغرف.",
  alternates: { canonical: "/map" },
};

export default function MapPage() {
  const properties = getAvailableProperties();

  return (
    <>
      <PageHeader
        eyebrow="خريطة العقارات"
        title="خريطة العقارات التفاعلية"
        subtitle="تصفّح الوحدات المتاحة على خريطة الرياض، واضغط على أي عقار لعرض تفاصيله السريعة والتواصل المباشر."
      />
      <section className="section">
        <div className="container-luxe">
          <MapBrowser properties={properties} />
        </div>
      </section>
    </>
  );
}
