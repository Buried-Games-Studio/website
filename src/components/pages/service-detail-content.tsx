"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ServicePage } from "@/lib/content/service-pages";
import { assets } from "@/lib/assets";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { m } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Cpu,
  MapPin,
  Workflow,
  Sparkles,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/96555528686";

const ui = {
  en: {
    home: "Home",
    services: "Services",
    contactCta: "Start your project",
    whatsappCta: "WhatsApp",
    whatsappAria: "Chat with Buried Games on WhatsApp",
    backToServices: "Explore all our services",
    viewProject: "View project",
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    contactCta: "ابدأ مشروعك",
    whatsappCta: "واتساب",
    whatsappAria: "تواصل مع بريد جيمز عبر واتساب",
    backToServices: "استكشف جميع خدماتنا",
    viewProject: "شاهد المشروع",
  },
} as const;

/* Map portfolio game routes to real game art for the proof cards. */
const portfolioArt: Record<string, string> = {
  "/games/koutq8": assets.koutq8Image1,
  "/games/nabsh": assets.popBackground,
  "/games/power-of-bombs": assets.popOverview,
  "/games/arrab": assets.arrabHeroBg,
  "/games/gathered-by-the-light": assets.lunaFantasyHero,
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function ServiceDetailContent({
  service,
  locale,
}: {
  service: ServicePage;
  locale: Locale;
}) {
  const isRTL = locale === "ar";
  const t = ui[locale];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
      <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
      {children}
    </p>
  );

  return (
    <main className="bg-background overflow-x-hidden">
      {/* ─────────────── HERO ─────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-card/40">
        <div className="container relative z-10 py-16 md:py-24">
          {/* Breadcrumb */}
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
            <Link
              href={localePath(locale, "/services")}
              className="transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            >
              {t.services}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{service.hero.eyebrow[locale]}</span>
          </nav>

          <m.div {...reveal()} className="max-w-3xl">
            <Eyebrow>{service.hero.eyebrow[locale]}</Eyebrow>
            <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              {service.hero.title[locale]}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">
              {service.hero.subtitle[locale]}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300"
              >
                <Link
                  href={localePath(locale, "/contact-us")}
                  className="group flex items-center gap-2"
                >
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

      {/* ─────────────── INTRO ─────────────── */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div {...reveal()} className="max-w-3xl space-y-5">
            {service.intro[locale].map((para, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed text-foreground/75">
                {para}
              </p>
            ))}
          </m.div>
        </div>
      </section>

      {/* ─────────────── WHAT'S INCLUDED ─────────────── */}
      <section className="py-14 md:py-20 bg-card/40 border-y border-border">
        <div className="container">
          <m.div {...reveal()}>
            <Eyebrow>{service.included.heading[locale]}</Eyebrow>
          </m.div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.included.items.map((item, i) => (
              <m.div
                key={i}
                {...reveal((i % 3) * 0.05)}
                className="group rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Check className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 text-base md:text-lg font-bold tracking-tight text-foreground">
                  {item.title[locale]}
                </h3>
                <p className="text-sm leading-relaxed text-foreground/65">
                  {item.body[locale]}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── PLATFORMS / ENGINES ─────────────── */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div {...reveal()} className="max-w-2xl">
            <Eyebrow>
              <span className="flex items-center gap-2">
                <Cpu className="h-3.5 w-3.5 text-primary" aria-hidden />
                {service.platforms.heading[locale]}
              </span>
            </Eyebrow>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-foreground/65">
              {service.platforms.intro[locale]}
            </p>
          </m.div>

          {/* Chip row of engine/platform names */}
          <m.div {...reveal(0.05)} className="mt-7 flex flex-wrap gap-2">
            {service.platforms.items.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-foreground/80"
              >
                {item.label}
              </span>
            ))}
          </m.div>

          {/* Detail cards under the chips */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.platforms.items.map((item, i) => (
              <m.div
                key={i}
                {...reveal((i % 3) * 0.05)}
                className="rounded-xl border border-border bg-card p-5"
              >
                <span className="text-sm font-bold text-foreground">{item.label}</span>
                <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                  {item.note[locale]}
                </p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── PROCESS (ghost-numeral timeline) ─────────────── */}
      <section className="py-14 md:py-20 bg-card/40 border-y border-border">
        <div className="container">
          <m.div {...reveal()}>
            <Eyebrow>
              <span className="flex items-center gap-2">
                <Workflow className="h-3.5 w-3.5 text-primary" aria-hidden />
                {service.process.heading[locale]}
              </span>
            </Eyebrow>
          </m.div>

          <ol className="mt-10 max-w-3xl">
            {service.process.steps.map((step, i) => {
              const last = i === service.process.steps.length - 1;
              return (
                <m.li
                  key={i}
                  {...reveal(i * 0.05)}
                  className="relative grid grid-cols-[auto_1fr] gap-5 pb-8 last:pb-0"
                >
                  {/* Numeral + connector line */}
                  <div className="relative flex flex-col items-center">
                    <span className="text-2xl font-bold leading-none text-primary/80 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {!last && (
                      <span
                        aria-hidden
                        className="mt-2 w-px flex-1 bg-gradient-to-b from-border to-transparent"
                      />
                    )}
                  </div>
                  <div className={cn(!last && "pb-2")}>
                    <h3 className="text-base md:text-lg font-bold tracking-tight text-foreground">
                      {step.title[locale]}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">
                      {step.outcome[locale]}
                    </p>
                  </div>
                </m.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ─────────────── WHY A GCC STUDIO ─────────────── */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div {...reveal()} className="max-w-2xl">
            <Eyebrow>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                {service.whyGcc.heading[locale]}
              </span>
            </Eyebrow>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-foreground/65">
              {service.whyGcc.body[locale]}
            </p>
          </m.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.whyGcc.points.map((point, i) => (
              <m.div
                key={i}
                {...reveal((i % 2) * 0.05)}
                className="group flex gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold tracking-tight text-foreground">
                    {point.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                    {point.body[locale]}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── PORTFOLIO PROOF ─────────────── */}
      <section className="py-14 md:py-20 bg-card/40 border-y border-border">
        <div className="container">
          <m.div {...reveal()} className="max-w-2xl">
            <Eyebrow>{service.portfolio.heading[locale]}</Eyebrow>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-foreground/65">
              {service.portfolio.intro[locale]}
            </p>
          </m.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {service.portfolio.items.map((item, i) => {
              const art = portfolioArt[item.href];
              return (
                <m.div key={i} {...reveal((i % 2) * 0.05)}>
                  <Link
                    href={localePath(locale, item.href)}
                    className="group relative flex h-full min-h-[12rem] flex-col justify-end overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 focus-visible:border-primary/40 focus-visible:outline-none"
                  >
                    {art && (
                      <Image
                        src={art}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover opacity-30 transition-all duration-500 group-hover:opacity-40 group-hover:scale-105"
                      />
                    )}
                    {/* Scrim for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/85 to-card/40" />
                    <div className="relative z-10">
                      <h3 className="flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {item.anchor[locale]}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                        {item.blurb[locale]}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {t.viewProject}
                        <ArrowRight
                          className={cn(
                            "w-4 h-4 transition-transform group-hover:translate-x-1",
                            isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                          )}
                        />
                      </span>
                    </div>
                  </Link>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div {...reveal()}>
            <Eyebrow>{service.faq.heading[locale]}</Eyebrow>
          </m.div>
          <div className="mt-8 max-w-3xl space-y-3">
            {service.faq.items.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="overflow-hidden rounded-xl border border-border bg-card"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-start transition-colors hover:bg-foreground/5 focus-visible:bg-foreground/5 focus-visible:outline-none"
                  >
                    <span className="text-sm md:text-base font-semibold text-foreground">
                      {item.q[locale]}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-primary transition-transform",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed text-foreground/65">
                        {item.a[locale]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="py-14 md:py-20 bg-card/40 border-t border-border">
        <div className="container">
          <m.div {...reveal()} className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {service.cta.title[locale]}
            </h2>
            <p className="mt-3 leading-relaxed text-foreground/65">
              {service.cta.body[locale]}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300"
              >
                <Link
                  href={localePath(locale, "/contact-us")}
                  className="group flex items-center gap-2"
                >
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
            <div className="mt-8">
              <Link
                href={localePath(locale, "/services")}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
              >
                {t.backToServices}
                <ArrowRight
                  className={cn(
                    "w-4 h-4 transition-transform group-hover:translate-x-1",
                    isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                  )}
                />
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
