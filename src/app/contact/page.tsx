import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import {
  PhoneIcon,
  WhatsAppIcon,
  MapPinIcon,
} from "@/components/icons";
import {
  CONTACT,
  SOCIAL,
  telLink,
  whatsappLink,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع محمد الحبيشي العقارية في الرياض — أرقام التواصل، واتساب، وموقع المكتب في حي الفيحاء.",
  alternates: { canonical: "/contact" },
};

const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY ?? "";
const { lat, lng } = CONTACT.address;
const mapSrc = mapsKey
  ? `https://www.google.com/maps/embed/v1/place?key=${mapsKey}&q=${lat},${lng}&zoom=15&language=ar`
  : `https://maps.google.com/maps?q=${lat},${lng}&z=15&hl=ar&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="تواصل معنا"
        title="نسعد بتواصلك"
        subtitle="فريقنا جاهز للإجابة على استفساراتك ومساعدتك في كل ما يتعلق بالعقارات."
      />

      <section className="section">
        <div className="container-luxe grid gap-10 lg:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-6">
            {/* Phones */}
            <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-card dark:border-navy-800 dark:bg-navy-900">
              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-navy-900 dark:text-white">
                <PhoneIcon width={22} height={22} />
                أرقام التواصل
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {CONTACT.phones.map((phone) => (
                  <a
                    key={phone}
                    href={telLink(phone)}
                    dir="ltr"
                    className="flex items-center justify-center gap-2 rounded-xl bg-navy-50 px-4 py-3 text-sm font-semibold text-navy-800 transition hover:bg-navy-100 dark:bg-navy-800 dark:text-navy-100 dark:hover:bg-navy-700"
                  >
                    <PhoneIcon width={16} height={16} />
                    {phone}
                  </a>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-card dark:border-navy-800 dark:bg-navy-900">
              <h2 className="mb-5 text-xl font-bold text-navy-900 dark:text-white">
                قنوات التواصل
              </h2>
              <div className="space-y-3">
                <a
                  href={whatsappLink("مرحباً، أرغب بالاستفسار عن خدماتكم.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <WhatsAppIcon width={20} height={20} />
                  محادثة واتساب مباشرة
                </a>
                <a
                  href={SOCIAL.whatsappChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full"
                >
                  <WhatsAppIcon width={18} height={18} />
                  قناة واتساب الرسمية
                </a>
                <a
                  href={SOCIAL.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full"
                >
                  جميع روابطنا (Linktree)
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-3xl border border-navy-100 bg-white p-7 shadow-card dark:border-navy-800 dark:bg-navy-900">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-navy-900 dark:text-white">
                <MapPinIcon width={22} height={22} />
                موقع المكتب
              </h2>
              <p className="leading-8 text-navy-600 dark:text-navy-300">
                {CONTACT.address.cityAr}، {CONTACT.address.districtAr}
                <br />
                {CONTACT.address.streetAr}
              </p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>

        {/* Map */}
        <div className="container-luxe mt-12">
          <div className="overflow-hidden rounded-3xl border border-navy-100 shadow-card dark:border-navy-800">
            <iframe
              title="موقع مكتب محمد الحبيشي العقارية"
              src={mapSrc}
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
