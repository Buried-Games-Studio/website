"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { WhatsAppLink } from "@/components/whatsapp-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { guidesUi, type Guide } from "@/lib/content/guides";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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

export function GuideContent({ locale, guide }: { locale: Locale; guide: Guide }) {
  const isRTL = locale === "ar";
  const ui = guidesUi[locale];

  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-card/40 py-14 md:py-20">
        <div className="absolute top-0 start-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
        <div className="container relative z-10 max-w-screen-xl">
          <nav
            aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"}
            className="mb-6 flex flex-wrap items-center gap-2 text-xs text-foreground/55"
          >
            <Link href={localePath(locale, "/")} className="transition-colors hover:text-foreground">
              {ui.home}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{ui.guides}</span>
          </nav>
          <m.div {...reveal}>
            <Eyebrow label={ui.guides} />
            <h1 className="mt-5 max-w-3xl font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground text-start">
              {guide.title[locale]}
            </h1>
            <div className="mt-6 max-w-2xl space-y-4">
              {guide.intro.map((p, i) => (
                <p key={i} className="text-base md:text-lg leading-relaxed text-foreground/65 text-start">
                  {p[locale]}
                </p>
              ))}
            </div>
            <p className="mt-6 text-xs text-foreground/45">
              {ui.sourcedLabel}: {guide.sourcedOn}
            </p>
          </m.div>
        </div>
      </section>

      {/* CRITERIA */}
      <section className="py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.div {...reveal} className="max-w-3xl">
            <Eyebrow label={guide.criteriaHeading[locale]} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">
              {guide.criteriaHeading[locale]}
            </h2>
            <ul className="mt-6 space-y-4">
              {guide.criteria.map((c, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-3 items-start">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-primary" />
                  <span className="text-base leading-relaxed text-foreground/70">{c[locale]}</span>
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </section>

      {/* ENTRIES */}
      <section className="border-y border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={guide.entriesHeading[locale]} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">
              {guide.entriesHeading[locale]}
            </h2>
          </m.div>
          <div className="mt-8 space-y-4">
            {guide.entries.map((entry, i) => (
              <m.article
                {...reveal}
                key={entry.name}
                className={cn(
                  "rounded-xl border bg-background p-6 md:p-7",
                  entry.isUs ? "border-primary/40" : "border-border"
                )}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <h3 className="font-headline text-lg md:text-xl font-bold tracking-tight text-foreground">
                    {entry.name}
                  </h3>
                  {entry.isUs && (
                    <span className="rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.09em] text-primary-foreground">
                      {ui.usLabel}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-foreground/50">
                  {ui.basedInLabel}: {entry.basedIn[locale]}
                </p>
                <p className="mt-4 text-base leading-relaxed text-foreground/70">
                  {entry.body[locale]}
                </p>
                {entry.isUs && (
                  <Link
                    href={localePath(locale, "/services/game-development")}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    {locale === "ar" ? "خدمات تطوير الألعاب لدينا" : "Our game development services"}
                    <ArrowRight className={cn("h-3.5 w-3.5", isRTL && "rotate-180")} aria-hidden />
                  </Link>
                )}
                {/* Deliberately NO outbound links to the other companies. This is a
                    guide, not a directory — and linking competitors from a page we
                    wrote about them invites the "why is theirs nofollowed" reading
                    either way. Named plainly is enough to be useful. */}
              </m.article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      {guide.sections.map((section, i) => (
        <section key={i} className="py-14 md:py-20">
          <div className="container max-w-screen-xl">
            <m.div {...reveal} className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="md:col-span-4">
                <Eyebrow label={`${String(i + 1).padStart(2, "0")}`} />
                <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">
                  {section.heading[locale]}
                </h2>
              </div>
              <div className="md:col-span-8 space-y-4">
                {section.body.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed text-foreground/70 text-start">
                    {p[locale]}
                  </p>
                ))}
              </div>
            </m.div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="border-y border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-3xl">
          <m.div {...reveal}>
            <Eyebrow label={locale === "ar" ? "أسئلة شائعة" : "Common questions"} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">
              {locale === "ar" ? "أسئلة شائعة" : "Common questions"}
            </h2>
          </m.div>
          <Accordion type="single" collapsible className="mt-8">
            {guide.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-start text-foreground hover:no-underline hover:text-primary text-base font-semibold">
                  {faq.q[locale]}
                </AccordionTrigger>
                <AccordionContent className="text-start text-foreground/70 leading-relaxed">
                  {faq.a[locale]}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="container max-w-3xl text-center">
          <m.div {...reveal}>
            <h2 className="font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">
              {ui.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">
              {ui.ctaBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-primary px-8 text-sm md:text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              >
                <Link href={localePath(locale, "/contact-us")} className="group flex items-center gap-2">
                  {ui.contactCta}
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-transform group-hover:translate-x-1",
                      isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                    )}
                  />
                </Link>
              </Button>
              <WhatsAppLink
                location="guide"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />
                {locale === "ar" ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
              </WhatsAppLink>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
