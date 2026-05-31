import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-heading text-7xl font-bold text-navy-800 dark:text-turquoise-300">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-navy-900 dark:text-white">
        الصفحة غير موجودة
      </h1>
      <p className="mt-2 max-w-md text-navy-500 dark:text-navy-400">
        عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          العودة للرئيسية
        </Link>
        <Link href="/properties" className="btn-ghost">
          تصفح العقارات
        </Link>
      </div>
    </div>
  );
}
