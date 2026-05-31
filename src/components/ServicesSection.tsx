import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { Reveal } from "./Reveal";
import { ServiceIcon } from "./ServiceIcon";
import { ArrowIcon } from "./icons";

export function ServicesSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section bg-navy-50/60 dark:bg-navy-950">
      <div className="container-luxe">
        <Reveal className="mb-12 text-center">
          <span className="eyebrow">خدماتنا</span>
          <h2 className="text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
            حلول عقارية متكاملة
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-600 dark:text-navy-300">
            نقدم باقة من الخدمات العقارية الاحترافية تغطي كافة احتياجاتك العقارية
            في الرياض.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.07}>
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-navy-100 bg-white p-8 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxe-lg dark:border-navy-800 dark:bg-navy-900"
              >
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-800 text-turquoise-200 transition-colors group-hover:bg-turquoise-500 group-hover:text-navy-950 dark:bg-turquoise-500/15 dark:text-turquoise-300">
                  <ServiceIcon name={service.icon} width={26} height={26} />
                </span>
                <h3 className="mb-3 text-xl font-bold text-navy-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm leading-7 text-navy-600 dark:text-navy-300">
                  {service.short}
                </p>
                {!compact && (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 transition group-hover:gap-3 dark:text-turquoise-300">
                    اعرف المزيد
                    <ArrowIcon width={16} height={16} />
                  </span>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
