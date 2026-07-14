"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { caseStudies, caseStudiesUi } from "@/lib/content/case-studies";
import { localePath, type Locale } from "@/lib/i18n";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function Eyebrow({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
      <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
      {label}
    </p>
  );
}

export function CaseStudiesContent({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";
  const ui = caseStudiesUi[locale];

  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      {/* HERO BAND */}
      <section className="relative overflow-hidden border-b border-border bg-card/40 py-14 md:py-20">
        <div className="absolute top-0 start-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
        <div className="container relative z-10 max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={ui.indexEyebrow} />
            <h1 className="mt-5 max-w-3xl font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground text-start">
              {ui.indexTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65 text-start">
              {ui.indexIntro}
            </p>
          </m.div>
        </div>
      </section>

      {/* CASE STUDY CARDS */}
      <section className="py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <m.article
                key={cs.slug}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.06 }}
                className="group relative rounded-lg border border-border bg-card/40 p-7 md:p-8 transition-colors hover:border-primary/40"
              >
                <Eyebrow label={String(i + 1).padStart(2, "0")} />
                <h2 className="mt-4 font-headline font-bold tracking-tight text-xl md:text-2xl text-foreground text-start">
                  <Link
                    href={localePath(locale, `/case-studies/${cs.slug}`)}
                    className="after:absolute after:inset-0"
                  >
                    {cs.title[locale]}
                  </Link>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground/70 text-start">
                  {cs.summary[locale]}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 group-hover:decoration-primary">
                  {ui.readCta}
                  <ArrowRight
                    className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 rtl:group-hover:-translate-x-1" : ""}`}
                  />
                </span>
              </m.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
