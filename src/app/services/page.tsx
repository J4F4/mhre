import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CheckIcon } from "@/components/icons";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "خدمات محمد الحبيشي العقارية: التأجير، البيع، الشراء، إدارة الأملاك، والمقاولات — حلول عقارية متكاملة في الرياض.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="خدماتنا"
        title="خدمات عقارية متكاملة"
        subtitle="نقدم باقة متكاملة من الخدمات العقارية المصممة لتلبية كافة احتياجاتك بأعلى معايير الجودة والاحترافية."
      />

      <section className="section">
        <div className="container-luxe space-y-20">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-luxe ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-800 text-turquoise-200 dark:bg-turquoise-500/15 dark:text-turquoise-300">
                    <ServiceIcon name={service.icon} width={26} height={26} />
                  </span>
                  <h2 className="text-3xl font-bold text-navy-900 dark:text-white">
                    {service.title}
                  </h2>
                  <p className="mt-4 leading-8 text-navy-600 dark:text-navy-300">
                    {service.description}
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-navy-700 dark:text-navy-200"
                      >
                        <CheckIcon
                          width={18}
                          height={18}
                          className="mt-0.5 shrink-0 text-turquoise-600 dark:text-turquoise-300"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
