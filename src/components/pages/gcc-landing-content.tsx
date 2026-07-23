"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { gccLandingUi, type GccLanding } from "@/lib/content/gcc-landing";
import { localePath, type Locale } from "@/lib/i18n";

import { WhatsAppLink } from "@/components/whatsapp-link";

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

export function GccLandingContent({
  locale,
  landing,
}: {
  locale: Locale;
  landing: GccLanding;
}) {
  const isRTL = locale === "ar";
  const ui = gccLandingUi[locale];

  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      {/* HERO BAND */}
      <section className="relative overflow-hidden border-b border-border bg-card/40 py-14 md:py-20">
        <div className="absolute top-0 start-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
        <div className="container relative z-10 max-w-screen-xl">
          <nav
            aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"}
            className="mb-6 flex flex-wrap items-center gap-2 text-xs text-foreground/55"
          >
            <Link
              href={localePath(locale, "/")}
              className="transition-colors hover:text-foreground"
            >
              {ui.breadcrumbHome}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{landing.countryName[locale]}</span>
          </nav>
          <m.div {...reveal}>
            <Eyebrow label={landing.countryName[locale]} />
            <h1 className="mt-5 max-w-3xl font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground text-start">
              {landing.title[locale]}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65 text-start">
              {landing.intro[locale]}
            </p>
          </m.div>
        </div>
      </section>

      {/* CONTENT SECTIONS — alternating surfaces, start-aligned */}
      {landing.sections.map((section, i) => {
        const tinted = i % 2 === 1;
        return (
          <section
            key={i}
            className={
              tinted
                ? "border-y border-border bg-card/40 py-14 md:py-20"
                : "py-14 md:py-20"
            }
          >
            <div className="container max-w-screen-xl">
              <m.div {...reveal} className="grid gap-6 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <Eyebrow label={`${String(i + 1).padStart(2, "0")}`} />
                  <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">
                    {section.heading[locale]}
                  </h2>
                </div>
                <div className="md:col-span-8 space-y-4">
                  {section.body.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-base leading-relaxed text-foreground/70 text-start"
                    >
                      {paragraph[locale]}
                    </p>
                  ))}
                </div>
              </m.div>
            </div>
          </section>
        );
      })}

      {/* FAQ */}
      <section className="border-y border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-3xl">
          <m.div {...reveal}>
            <Eyebrow label={ui.faqTitle} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">
              {ui.faqTitle}
            </h2>
          </m.div>
          <Accordion type="single" collapsible className="mt-8">
            {landing.faqs.map((faq, i) => (
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

      {/* CTA BAND — single contact surface */}
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
                    className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 rtl:group-hover:-translate-x-1" : ""}`}
                  />
                </Link>
              </Button>
              <WhatsAppLink
                location="gcc_landing"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />
                {ui.whatsappCta}
              </WhatsAppLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
              <Link
                href={localePath(locale, "/services/game-development")}
                className="group inline-flex items-center gap-2 text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary"
              >
                {ui.servicesCta}
                <ArrowRight
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 rtl:group-hover:-translate-x-1" : ""}`}
                />
              </Link>
              <Link
                href={localePath(locale, "/games")}
                className="group inline-flex items-center gap-2 text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary"
              >
                {ui.gamesCta}
                <ArrowRight
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 rtl:group-hover:-translate-x-1" : ""}`}
                />
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
