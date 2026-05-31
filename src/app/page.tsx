import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { PropertyCard } from "@/components/PropertyCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon, MapPinIcon } from "@/components/icons";
import { getFeaturedProperties } from "@/lib/store";
import { COMPANY } from "@/lib/constants";

export default function HomePage() {
  const featured = getFeaturedProperties(6);

  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="section">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">من نحن</span>
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
              شريكك العقاري الموثوق في الرياض
            </h2>
            <p className="mt-5 leading-8 text-navy-600 dark:text-navy-300">
              {COMPANY.description}
            </p>
            <p className="mt-4 leading-8 text-navy-600 dark:text-navy-300">
              نؤمن بأن العقار قرار مصيري، لذلك نقدم خدماتنا بأعلى معايير الشفافية
              والاحترافية، مع فريق متخصص يرافقك في كل خطوة لتحقيق أفضل النتائج.
            </p>
            <Link href="/about" className="btn-ghost mt-8">
              تعرف علينا أكثر
              <ArrowIcon width={18} height={18} />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="col-span-2 aspect-[16/10] rounded-3xl bg-cover bg-center shadow-luxe"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80)",
                }}
              />
              <div
                className="aspect-square rounded-3xl bg-cover bg-center shadow-card"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80)",
                }}
              />
              <div
                className="aspect-square rounded-3xl bg-cover bg-center shadow-card"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80)",
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured properties */}
      <section className="section bg-navy-50/60 dark:bg-navy-950">
        <div className="container-luxe">
          <Reveal className="mb-12 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">
            <div>
              <span className="eyebrow">عقارات مختارة</span>
              <h2 className="text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
                أحدث العقارات المميزة
              </h2>
            </div>
            <Link href="/properties" className="btn-ghost shrink-0">
              عرض كل العقارات
              <ArrowIcon width={18} height={18} />
            </Link>
          </Reveal>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <PropertyCard property={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Map teaser */}
      <section className="section">
        <div className="container-luxe">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-luxe dark:border-navy-800 dark:bg-navy-900">
              <div className="grid items-center gap-0 lg:grid-cols-2">
                <div className="p-8 sm:p-12">
                  <span className="eyebrow">
                    <MapPinIcon width={16} height={16} className="ms-1 inline" />
                    خريطة العقارات
                  </span>
                  <h2 className="text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
                    استكشف عقاراتنا على الخريطة
                  </h2>
                  <p className="mt-5 leading-8 text-navy-600 dark:text-navy-300">
                    تصفّح جميع الوحدات المتاحة في الرياض على خريطة تفاعلية، وفلتر
                    حسب الحي والسعر ونوع العقار وعدد الغرف للوصول إلى ما يناسبك
                    بسهولة.
                  </p>
                  <Link href="/map" className="btn-primary mt-8">
                    افتح الخريطة التفاعلية
                    <ArrowIcon width={18} height={18} />
                  </Link>
                </div>
                <div
                  className="h-64 w-full bg-cover bg-center lg:h-full lg:min-h-[380px]"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80)",
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
