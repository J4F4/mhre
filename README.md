# محمد الحبيشي العقارية — Alhubishi Real Estate

موقع عقاري فاخر وجاهز للنشر (Production Ready) مبني بـ **Next.js 15** و **TypeScript** و **Tailwind CSS** و **Framer Motion**، بدعم كامل للغة العربية (RTL) ووضع ليلي/نهاري وتحسين SEO وSchema Markup للعقارات.

A premium, production-ready real estate website for **Alhubishi Real Estate** in Riyadh.

---

## ✨ المميزات الرئيسية

- **تصميم فاخر** بألوان الهوية: كحلي فاخر، أبيض، تركواز خفيف، وأسود.
- **دعم RTL كامل** وخطوط عربية راقية (El Messiri للعناوين، Tajawal للنصوص).
- **Responsive** للجوال والتابلت والكمبيوتر.
- **Hero** بفيديو خلفية كامل الشاشة مع صورة ليلية احترافية كبديل.
- **خريطة عقارات تفاعلية** للرياض مع Pins مخصصة بهوية الشركة وفلاتر (الحي، السعر، النوع، الغرف).
- **صفحات العقارات**: بطاقات احترافية، معرض صور، وصف، الموقع على الخريطة، أزرار اتصال وواتساب مباشرة.
- **صفحة الخدمات**: التأجير، البيع، الشراء، إدارة الأملاك، المقاولات.
- **لوحة تحكم** (`/admin`) لإضافة وتعديل وحذف العقارات.
- **طبقة استيراد** قابلة للربط بمصادر البيانات الخارجية.
- **زر واتساب عائم** + روابط السوشال في الفوتر.
- **SEO كامل**: Metadata, OpenGraph, Sitemap, Robots, JSON-LD Schema.
- **Dark & Light Mode**.

---

## 🛠️ المتطلبات التقنية

- Node.js **18.18+** (يُفضّل 20+)
- npm / pnpm / yarn

---

## 🚀 التشغيل محلياً

```bash
# 1. تثبيت الحزم
npm install

# 2. إعداد متغيرات البيئة (انسخ المثال ثم عدّل القيم)
cp .env.example .env.local

# 3. تشغيل بيئة التطوير
npm run dev
```

ثم افتح: <http://localhost:3000>

أوامر إضافية:

```bash
npm run build      # بناء الإنتاج
npm run start      # تشغيل نسخة الإنتاج
npm run lint       # فحص الكود
npm run type-check # فحص الأنواع (TypeScript)
```

---

## 🔐 متغيرات البيئة

انظر ملف [`.env.example`](./.env.example). أهم المتغيرات:

| المتغير | الوصف |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع (للـ SEO والـ sitemap والـ schema). |
| `NEXT_PUBLIC_MAP_PROVIDER` | `osm` (افتراضي، بدون مفتاح) أو `mapbox`. |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | توكن Mapbox (عند اختيار mapbox). |
| `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY` | مفتاح Google Maps Embed (اختياري — يوجد بديل بدون مفتاح). |
| `ADMIN_PASSWORD` | كلمة مرور لوحة التحكم. **غيّرها قبل النشر.** |

> **الخريطة تعمل افتراضياً بدون أي مفتاح** باستخدام بلاطات OpenStreetMap المجانية. خريطة المكتب في صفحة "تواصل معنا" تستخدم تضمين Google Maps بدون مفتاح افتراضياً.

---

## 🗂️ هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx              # التخطيط الجذر + الخطوط + Schema للشركة
│   ├── page.tsx                # الصفحة الرئيسية
│   ├── properties/             # قائمة العقارات + صفحة التفاصيل [id]
│   ├── map/                    # خريطة العقارات التفاعلية
│   ├── services/               # صفحة الخدمات
│   ├── about/                  # من نحن
│   ├── contact/                # تواصل معنا + خريطة المكتب
│   ├── admin/                  # لوحة التحكم
│   ├── api/properties/         # REST API (CRUD)
│   ├── api/import/             # استيراد من المصادر الخارجية
│   ├── sitemap.ts / robots.ts  # SEO
│   └── globals.css
├── components/                 # مكوّنات الواجهة (Navbar, Hero, PropertyCard, MapClient...)
└── lib/
    ├── types.ts                # الأنواع
    ├── constants.ts            # بيانات الشركة والتواصل والروابط
    ├── store.ts                # مخزن العقارات (في الذاكرة، مبدئياً من JSON)
    ├── properties.ts           # دوال مساعدة (تنسيق السعر، الفلترة، Schema)
    ├── services.ts             # بيانات الخدمات
    ├── import.ts               # طبقة الاستيراد
    └── data/properties.json    # بيانات العقارات الأولية (Seed)
```

---

## 🧩 إدارة العقارات (لوحة التحكم)

1. افتح `/admin`.
2. أدخل كلمة المرور (`ADMIN_PASSWORD`).
3. أضف/عدّل/احذف العقارات، أو اضغط **"استيراد من المصادر"** لمحاولة جلب البيانات من الروابط المهيّأة.

### ملاحظة حول التخزين (مهمة للإنتاج)

المشروع يستخدم **مخزناً في الذاكرة** (`src/lib/store.ts`) مهيّأ من ملف JSON ليعمل فوراً دون أي قاعدة بيانات. هذا مناسب للعرض والتطوير، لكن في بيئة Vercel (Serverless) التعديلات لا تكون دائمة عبر النسخ المتعددة.

**للإنتاج التجاري الكامل**، استبدل تنفيذ الدوال في `store.ts` بقاعدة بيانات حقيقية (الواجهة جاهزة ولا يحتاج باقي المشروع لأي تعديل):

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## 🔌 استيراد البيانات

الروابط المزوّدة (`https://tr.ee/vIOj5a` و `https://tr.ee/cxZWr8`) هي روابط مختصرة قد تؤدي إلى صفحات وسيطة وليست واجهات بيانات قياسية. لذلك تم بناء **طبقة استيراد** مرنة في `src/lib/import.ts`:

- تدعم تنسيقات **JSON** و **CSV**.
- تُطبّع البيانات تلقائياً إلى نموذج العقار (`normalizeListing`).
- عند توفّر مصدر بيانات حقيقي (Google Sheet مُصدّر كـ CSV، أو API)، ضع رابطه في `DATA_SOURCE_URL_1/2` بملف البيئة، أو مرّره مباشرة إلى `importFromSources(sources)`.

---

## ▶️ النشر على Vercel

1. ادفع الكود إلى مستودع GitHub.
2. ادخل إلى [vercel.com](https://vercel.com) → **Add New → Project** واختر المستودع.
3. Vercel سيكتشف Next.js تلقائياً (لا حاجة لإعدادات بناء خاصة).
4. أضف متغيرات البيئة في **Settings → Environment Variables** (على الأقل `ADMIN_PASSWORD` و `NEXT_PUBLIC_SITE_URL`).
5. اضغط **Deploy**.

### ربط الدومين

1. في مشروع Vercel: **Settings → Domains → Add**.
2. أدخل الدومين (مثل `alhubishi.com`).
3. أضف سجلات DNS لدى مزوّد الدومين:
   - للدومين الجذر: سجل `A` يشير إلى `76.76.21.21`.
   - للنطاق الفرعي `www`: سجل `CNAME` يشير إلى `cname.vercel-dns.com`.
4. انتظر تفعيل الشهادة (SSL تلقائي).
5. حدّث `NEXT_PUBLIC_SITE_URL` إلى الدومين النهائي ثم أعد النشر.

---

## 🎨 تخصيص الهوية

- **الشعار**: استبدل `public/logo.svg` بشعار الشركة (يُفضّل SVG أو PNG شفاف). الشعار يظهر في الـ Navbar والفوتر عبر `components/Logo.tsx`.
- **فيديو الـ Hero**: ضع ملف الفيديو في `public/videos/hero.mp4` (مشهد KAFD أو أبراج العليا ليلاً). حتى ذلك الحين تُعرض صورة ليلية عالية الجودة تلقائياً.
- **الألوان**: معرّفة في `tailwind.config.ts` (`navy`, `turquoise`, `luxe`).
- **بيانات التواصل والروابط**: في `src/lib/constants.ts`.

---

## 📄 الترخيص

جميع الحقوق محفوظة © محمد الحبيشي العقارية.
