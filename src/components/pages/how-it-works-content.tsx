"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { howItWorksContent } from "@/lib/content/how-it-works";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/96555528686";

const ui = {
  en: {
    home: "Home",
    howItWorks: "How it works",
    contactCta: "Start your project",
    whatsappCta: "WhatsApp",
    whatsappAria: "Chat with Buried Games on WhatsApp",
  },
  ar: {
    home: "الرئيسية",
    howItWorks: "كيف نعمل",
    contactCta: "ابدأ مشروعك",
    whatsappCta: "واتساب",
    whatsappAria: "تواصل مع بريد جيمز عبر واتساب",
  },
} as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function HowItWorksContent({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";
  const t = ui[locale];
  const c = howItWorksContent;

  const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
      <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
      {children}
    </p>
  );

  return (
    <main className="bg-background overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-card/40">
        <div className="container relative z-10 py-16 md:py-24">
          <nav
            aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"}
            className="mb-8 flex flex-wrap items-center gap-2 text-xs text-foreground/50"
          >
            <Link
              href={localePath(locale, "/")}
              className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              {t.home}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{t.howItWorks}</span>
          </nav>

          <m.div {...reveal()} className="max-w-3xl">
            <Eyebrow>{c.hero.eyebrow[locale]}</Eyebrow>
            <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              {c.hero.title[locale]}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">
              {c.hero.subtitle[locale]}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300"
              >
                <Link href={localePath(locale, "/contact-us")} className="group flex items-center gap-2">
                  {t.contactCta}
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-transform group-hover:translate-x-1",
                      isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                    )}
                  />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-6 rounded-full border-foreground/20 bg-transparent text-foreground/80 hover:bg-foreground/5 hover:border-foreground/40 font-medium transition-all duration-300"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.whatsappAria}
                  className="flex items-center gap-2"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
                  {t.whatsappCta}
                </a>
              </Button>
            </div>
          </m.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div {...reveal()} className="max-w-3xl space-y-5">
            {c.intro[locale].map((para, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed text-foreground/75">{para}</p>
            ))}
          </m.div>
        </div>
      </section>

      {/* STEPS — the star: generous numerals + connector lines */}
      <section className="py-14 md:py-20 bg-card/40 border-y border-border">
        <div className="container">
          <m.div {...reveal()}>
            <Eyebrow>{c.stepsHeading[locale]}</Eyebrow>
          </m.div>

          <ol className="mt-12 max-w-5xl">
            {c.steps.map((step, i) => {
              const last = i === c.steps.length - 1;
              return (
                <m.li
                  key={step.key}
                  {...reveal(i * 0.04)}
                  className="relative grid grid-cols-[3rem_1fr] gap-x-5 gap-y-4 pb-12 last:pb-0 md:grid-cols-[5rem_1fr] md:gap-x-8"
                >
                  {/* Big ghost numeral + connector line */}
                  <div className="relative flex flex-col items-center">
                    <span className="text-3xl md:text-4xl font-bold leading-none text-primary tabular-nums">
                      {step.number}
                    </span>
                    {!last && (
                      <span
                        aria-hidden
                        className="mt-3 w-px flex-1 bg-gradient-to-b from-border via-border to-transparent"
                      />
                    )}
                  </div>

                  {/* Step body card */}
                  <div className="rounded-xl border border-border bg-background p-6 md:p-7">
                    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
                      <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
                        <Image
                          src={step.image}
                          alt={step.imageAlt[locale]}
                          fill
                          sizes="(max-width: 768px) 100vw, 260px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground">
                          {step.title[locale]}
                        </h3>
                        <p className="mt-2 text-sm md:text-base leading-relaxed text-foreground/75">
                          {step.summary[locale]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-3">
                      <div>
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/50">
                          {c.whatHappensLabel[locale]}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{step.whatHappens[locale]}</p>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/50">
                          {c.whatYouGetLabel[locale]}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{step.whatYouGet[locale]}</p>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/50">
                          {c.involvementLabel[locale]}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{step.involvement[locale]}</p>
                      </div>
                    </div>
                  </div>
                </m.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div {...reveal()} className="max-w-2xl">
            <Eyebrow>{c.engagement.heading[locale]}</Eyebrow>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-foreground/65">{c.engagement.intro[locale]}</p>
          </m.div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {c.engagement.models.map((model, i) => (
              <m.div
                key={i}
                {...reveal((i % 2) * 0.05)}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
              >
                <h3 className="text-base md:text-lg font-bold tracking-tight text-foreground">{model.title[locale]}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{model.body[locale]}</p>
                <p className="mt-4 text-sm text-foreground/65">
                  <span className="font-semibold text-foreground">{c.engagement.bestForLabel[locale]}: </span>
                  {model.bestFor[locale]}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CADENCE + TOOLING */}
      <section className="py-14 md:py-20 bg-card/40 border-y border-border">
        <div className="container grid gap-5 lg:grid-cols-2">
          <m.div {...reveal()} className="rounded-xl border border-border bg-background p-7">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{c.cadence.heading[locale]}</h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground/75">{c.cadence.body[locale]}</p>
          </m.div>
          <m.div {...reveal(0.05)} className="rounded-xl border border-border bg-background p-7">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">{c.tooling.heading[locale]}</h2>
            <p className="mt-4 text-sm md:text-base leading-relaxed text-foreground/75">{c.tooling.body[locale]}</p>
          </m.div>
        </div>
      </section>

      {/* SERVICE LINKS */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div {...reveal()} className="max-w-2xl">
            <Eyebrow>{c.servicesHeading[locale]}</Eyebrow>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-foreground/65">{c.servicesIntro[locale]}</p>
          </m.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {c.serviceLinks.map((s, i) => (
              <m.div key={s.href} {...reveal((i % 2) * 0.05)}>
                <Link
                  href={localePath(locale, s.href)}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 focus-visible:border-primary/40 focus-visible:outline-none"
                >
                  <span className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {s.label[locale]}
                  </span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1",
                      isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                    )}
                    aria-hidden
                  />
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-card/40 border-t border-border">
        <div className="container">
          <m.div {...reveal()} className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{c.cta.title[locale]}</h2>
            <p className="mt-3 leading-relaxed text-foreground/65">{c.cta.body[locale]}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300"
              >
                <Link href={localePath(locale, "/contact-us")} className="group flex items-center gap-2">
                  {t.contactCta}
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-transform group-hover:translate-x-1",
                      isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                    )}
                  />
                </Link>
              </Button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.whatsappAria}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
                {t.whatsappCta}
              </a>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
