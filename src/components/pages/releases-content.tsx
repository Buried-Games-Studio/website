"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { releasesContent, releaseTimeline, type ReleaseEntry } from "@/lib/content/releases";
import { m } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

import { WhatsAppLink } from "@/components/whatsapp-link";

const ui = {
  en: { home: "Home", releases: "Releases", contactCta: "Start your project", whatsapp: "Chat on WhatsApp" },
  ar: { home: "الرئيسية", releases: "الإصدارات", contactCta: "ابدأ مشروعك", whatsapp: "تحدث معنا على واتساب" },
} as const;

// Subtle color coding: red (primary) reserved for actual releases; everything
// else is a neutral or muted badge so the timeline does not read as all-red.
const kindStyles: Record<ReleaseEntry["kind"], string> = {
  release: "bg-primary/15 text-primary",
  milestone: "bg-foreground/10 text-foreground/80",
  devlog: "bg-foreground/[0.06] text-foreground/65",
  development: "bg-foreground/[0.06] text-foreground/55",
};

// The marker dot on the connector line: only releases get the crimson dot.
const dotStyles: Record<ReleaseEntry["kind"], string> = {
  release: "bg-primary",
  milestone: "bg-foreground/40",
  devlog: "bg-foreground/25",
  development: "bg-foreground/25",
};

function formatDate(date: string, locale: Locale): string {
  return new Date(date + "T00:00:00Z").toLocaleDateString(locale === "ar" ? "ar" : "en", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function Eyebrow({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
      <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
      {label}
    </p>
  );
}

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function ReleasesContent({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";
  const t = ui[locale];
  const c = releasesContent;

  const Arrow = (
    <ArrowRight className={cn("h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1", isRTL && "rotate-180 rtl:group-hover:-translate-x-1")} aria-hidden />
  );

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-card/40 py-14 md:py-20">
        <div className="absolute top-0 start-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
        <div className="container relative z-10 max-w-screen-xl">
          <nav aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"} className="mb-6 flex flex-wrap items-center gap-2 text-xs text-foreground/55">
            <Link href={localePath(locale, "/")} className="transition-colors hover:text-foreground">{t.home}</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{t.releases}</span>
          </nav>
          <m.div {...reveal}>
            <Eyebrow label={c.hero.eyebrow[locale]} />
            <h1 className="mt-5 max-w-3xl font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground text-start">{c.hero.title[locale]}</h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65 text-start">{c.hero.subtitle[locale]}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/50 text-start">{c.intro[locale]}</p>
          </m.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <ol className="relative mx-auto max-w-3xl border-s border-border ps-6 md:ps-8">
            {releaseTimeline.map((entry, i) => (
              <m.li
                key={`${entry.title.en}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: Math.min(i, 6) * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-6 last:mb-0"
              >
                <span
                  className={cn(
                    "absolute -start-[31px] top-2 h-3 w-3 rounded-full ring-4 ring-background md:-start-[39px]",
                    dotStyles[entry.kind],
                  )}
                  aria-hidden
                />
                <div className="rounded-xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className={cn("rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider", kindStyles[entry.kind])}>
                      {c.legendLabels[entry.kind][locale]}
                    </span>
                    <time className="text-sm font-medium text-foreground/60" dateTime={entry.date ?? undefined}>
                      {entry.date ? formatDate(entry.date, locale) : entry.dateLabel?.[locale]}
                    </time>
                  </div>
                  <h2 className="text-base md:text-lg font-semibold text-foreground">{entry.title[locale]}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{entry.body[locale]}</p>
                  {(entry.link || entry.externalLink) && (
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {entry.link && (
                        <Link
                          href={localePath(locale, entry.link.href)}
                          className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4 decoration-primary/50 transition-colors hover:decoration-primary"
                        >
                          {entry.link.label[locale]}
                          {Arrow}
                        </Link>
                      )}
                      {entry.externalLink && (
                        <a
                          href={entry.externalLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-foreground/75 underline underline-offset-4 decoration-foreground/30 transition-colors hover:text-foreground hover:decoration-foreground/60"
                        >
                          {entry.externalLink.label}
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </m.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="border-t border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-3xl text-center">
          <m.div {...reveal}>
            <h2 className="font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">{c.cta.title[locale]}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">{c.cta.body[locale]}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-full bg-primary px-8 text-sm md:text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                <Link href={localePath(locale, "/contact-us")} className="group flex items-center gap-2">{t.contactCta}{Arrow}</Link>
              </Button>
              <WhatsAppLink
                location="releases"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 transition-colors hover:decoration-primary"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />
                {t.whatsapp}
              </WhatsAppLink>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
