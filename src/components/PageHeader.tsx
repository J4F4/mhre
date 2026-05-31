export function PageHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient pt-32 pb-16 text-white sm:pt-40 sm:pb-20">
      {/* Decorative rooflines */}
      <svg
        className="pointer-events-none absolute -left-10 top-10 h-64 w-64 text-white/5"
        viewBox="0 0 160 120"
        fill="none"
        aria-hidden
      >
        <g stroke="currentColor" strokeWidth="3">
          <path d="M14 64 L132 16" />
          <path d="M22 78 L140 30" />
        </g>
      </svg>

      <div className="container-luxe relative text-center">
        {eyebrow && (
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.3em] text-turquoise-300">
            {eyebrow}
          </span>
        )}
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-navy-200 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
