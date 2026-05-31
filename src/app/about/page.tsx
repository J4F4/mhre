import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { ShieldIcon, KeyIcon, BuildingIcon, CheckIcon } from "@/components/icons";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرّف على محمد الحبيشي العقارية، شركة سعودية متخصصة في التأجير والبيع والشراء وإدارة الأملاك والمقاولات في الرياض.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    icon: <ShieldIcon width={26} height={26} />,
    title: "الثقة والشفافية",
    desc: "نلتزم بأعلى معايير المصداقية في كل تعامل، ونضع مصلحة عملائنا في المقدمة.",
  },
  {
    icon: <KeyIcon width={26} height={26} />,
    title: "الاحترافية",
    desc: "فريق متخصص يمتلك خبرة واسعة في السوق العقاري بالرياض لتقديم أفضل الحلول.",
  },
  {
    icon: <BuildingIcon width={26} height={26} />,
    title: "حلول متكاملة",
    desc: "من التأجير والبيع إلى إدارة الأملاك والمقاولات، نغطي كافة احتياجاتك العقارية.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="من نحن"
        title={COMPANY.nameAr}
        subtitle={COMPANY.taglineEn}
      />

      <section className="section">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">قصتنا</span>
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
              خبرة عقارية تجمع الفخامة والثقة
            </h2>
            <p className="mt-5 leading-9 text-navy-600 dark:text-navy-300">
              {COMPANY.description}
            </p>
            <p className="mt-4 leading-9 text-navy-600 dark:text-navy-300">
              نسعى لأن نكون الخيار الأول لكل من يبحث عن حلول عقارية موثوقة في
              مدينة الرياض، من خلال فهم عميق لاحتياجات عملائنا وتقديم خدمة شخصية
              تتجاوز التوقعات.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "تغطية واسعة لأرقى أحياء الرياض",
                "عقود موثقة وإجراءات نظامية",
                "فريق استشاري متخصص",
                "متابعة دقيقة لما بعد التعاقد",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-navy-700 dark:text-navy-200"
                >
                  <CheckIcon
                    width={18}
                    height={18}
                    className="text-turquoise-600 dark:text-turquoise-300"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="aspect-[4/5] rounded-[2rem] bg-cover bg-center shadow-luxe-lg"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80)",
              }}
            />
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-navy-50/60 dark:bg-navy-950">
        <div className="container-luxe grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-navy-100 bg-white p-9 shadow-card dark:border-navy-800 dark:bg-navy-900">
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white">
                رؤيتنا
              </h3>
              <p className="mt-4 leading-8 text-navy-600 dark:text-navy-300">
                أن نكون العلامة العقارية الرائدة في الرياض، نُحدث فارقاً حقيقياً
                في تجربة العملاء العقارية عبر الجمع بين الفخامة والاحترافية
                والابتكار.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-navy-100 bg-white p-9 shadow-card dark:border-navy-800 dark:bg-navy-900">
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white">
                رسالتنا
              </h3>
              <p className="mt-4 leading-8 text-navy-600 dark:text-navy-300">
                تقديم حلول عقارية متكاملة وموثوقة تلبي تطلعات عملائنا، مع الالتزام
                بأعلى معايير الجودة والشفافية في كل مرحلة من مراحل التعامل.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-luxe">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">قيمنا</span>
            <h2 className="text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">
              ما يميزنا
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-navy-100 bg-white p-8 text-center shadow-card dark:border-navy-800 dark:bg-navy-900">
                  <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-800 text-turquoise-200 dark:bg-turquoise-500/15 dark:text-turquoise-300">
                    {v.icon}
                  </span>
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-navy-600 dark:text-navy-300">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
