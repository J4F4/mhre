/**
 * Central media/asset configuration.
 *
 * كل الصور والوسائط المهمة في مكان واحد ليسهل استبدالها بصور الشركة الحقيقية.
 *
 * أفضل نتيجة: ضع ملفاتك داخل مجلد public/ بالأسماء التالية وستظهر تلقائياً:
 *   - public/logo.png            ← شعار الشركة (PNG شفاف يُفضّل)
 *   - public/hero.jpg            ← صورة الخلفية الرئيسية (مركز الملك عبدالله المالي ليلاً)
 *   - public/videos/hero.mp4     ← فيديو الخلفية (اختياري — أولوية على الصورة)
 *
 * إن لم تتوفر، يستخدم الموقع البدائل المعرّفة أدناه.
 */

// خلفية الـ Hero: يحاول استخدام الملف المحلي أولاً (صورة الرياض / KAFD).
// البديل صورة معمارية حديثة محايدة (ليست معلماً لمدينة أخرى).
export const HERO_POSTER_LOCAL = "/hero.jpg";
export const HERO_POSTER_FALLBACK =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80";

export const HERO_VIDEO = "/videos/hero.mp4";

// شعار الشركة المحلي (إن رُفع) — يظهر تلقائياً ويتراجع لرمز SVG النظيف إن لم يوجد.
export const LOGO_IMAGE = "/logo.png";
