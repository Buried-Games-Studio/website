"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { designWorks, designWorksUi } from "@/lib/content/design-works";
import { DesignWorkCard } from "@/components/ui/design-work-card";
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

export function DesignWorksContent({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";
  const ui = designWorksUi[locale];

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
            <Link
              href={localePath(locale, "/services/game-art-design")}
              className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
            >
              {ui.serviceCtaLabel}
              <ArrowRight
                className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 rtl:group-hover:-translate-x-1" : ""}`}
              />
            </Link>
          </m.div>
        </div>
      </section>

      {/* WORK GRID */}
      <section className="py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {designWorks.map((work, i) => (
              <DesignWorkCard key={work.slug} work={work} language={locale} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
