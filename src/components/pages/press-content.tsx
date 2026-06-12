"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  pressContent,
  gameFactSheets,
} from "@/lib/content/press";
import { m } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";

const ui = {
  en: { home: "Home", press: "Press", contactCta: "Start your project", download: "Download" },
  ar: { home: "الرئيسية", press: "الملف الصحفي", contactCta: "ابدأ مشروعك", download: "تنزيل" },
} as const;

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

export function PressContent({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";
  const t = ui[locale];
  const c = pressContent;

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
            <span className="text-foreground/80">{t.press}</span>
          </nav>
          <m.div {...reveal}>
            <Eyebrow label={c.hero.eyebrow[locale]} />
            <h1 className="mt-5 max-w-3xl font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground text-start">{c.hero.title[locale]}</h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65 text-start">{c.hero.subtitle[locale]}</p>
          </m.div>
        </div>
      </section>

      {/* QUICK FACTS — definition-list grid */}
      <section className="py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.dl {...reveal} className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {c.facts.map((fact, i) => (
              <div key={i} className="bg-card p-5 md:p-6">
                <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/55">{fact.label[locale]}</dt>
                <dd className="mt-2 text-base font-semibold text-foreground">{fact.value[locale]}</dd>
              </div>
            ))}
          </m.dl>
        </div>
      </section>

      {/* BOILERPLATE */}
      <section className="border-y border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={c.boilerplate.heading[locale]} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">{c.boilerplate.heading[locale]}</h2>
          </m.div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <m.div {...reveal} className="rounded-xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/55">{c.boilerplate.shortHeading[locale]}</h3>
              <p className="text-base leading-relaxed text-foreground/80">{c.boilerplate.short[locale]}</p>
            </m.div>
            <m.div {...reveal} className="rounded-xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5">
              <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/55">{c.boilerplate.longHeading[locale]}</h3>
              <p className="text-base leading-relaxed text-foreground/75">{c.boilerplate.long[locale]}</p>
            </m.div>
          </div>
        </div>
      </section>

      {/* LOGOS — preview + download cards */}
      <section className="py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={c.logos.heading[locale]} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">{c.logos.heading[locale]}</h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">{c.logos.intro[locale]}</p>
          </m.div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.logos.downloads.map((dl, i) => (
              <m.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: Math.min(i, 5) * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href={dl.href}
                  download
                  className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-background/60 p-2">
                    <Image src={dl.href} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">{dl.label[locale]}</span>
                    <span className="text-[11px] uppercase tracking-wider text-foreground/50">{dl.format}</span>
                  </span>
                  <Download className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                </a>
              </m.li>
            ))}
          </ul>
        </div>
      </section>

      {/* GAME FACT SHEETS — compact cards */}
      <section className="border-y border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={c.gamesHeading[locale]} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">{c.gamesHeading[locale]}</h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">{c.gamesIntro[locale]}</p>
          </m.div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {gameFactSheets.map((game, i) => (
              <m.article
                key={game.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: Math.min(i, 5) * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-border bg-card p-5 md:p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={game.logo}
                    alt={`${game.name} logo`}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-lg object-contain"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-foreground">{game.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/70">{game.oneLiner[locale]}</p>
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-foreground/50">{locale === "ar" ? "النوع" : "Genre"}</dt>
                    <dd className="mt-0.5 text-foreground/80">{game.genre[locale]}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-foreground/50">{locale === "ar" ? "المنصات" : "Platforms"}</dt>
                    <dd className="mt-0.5 text-foreground/80">{game.platforms[locale]}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-foreground/50">{locale === "ar" ? "الحالة" : "Status"}</dt>
                    <dd className="mt-0.5 text-foreground/80">{game.status[locale]}</dd>
                  </div>
                </dl>
                <Link
                  href={localePath(locale, game.href)}
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline underline-offset-4 decoration-primary/50 transition-colors hover:decoration-primary"
                >
                  {locale === "ar" ? `صفحة ${game.name}` : `${game.name} game page`}
                  {Arrow}
                </Link>
              </m.article>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND COLOURS */}
      <section className="py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={c.colors.heading[locale]} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">{c.colors.heading[locale]}</h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">{c.colors.intro[locale]}</p>
          </m.div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {c.colors.items.map((color, i) => (
              <m.div
                key={color.hex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
              >
                <div className="h-24 w-full" style={{ backgroundColor: color.hex }} aria-hidden />
                <div className="p-5">
                  <h3 className="text-base font-semibold text-foreground">{color.name[locale]}</h3>
                  <p className="mt-1 font-mono text-sm text-primary">{color.hex}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{color.usage[locale]}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL CHANNELS — chip row */}
      <section className="border-y border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={c.socials.heading[locale]} />
            <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground text-start">{c.socials.heading[locale]}</h2>
            <p className="mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">{c.socials.intro[locale]}</p>
          </m.div>
          <ul className="mt-8 flex flex-wrap gap-3">
            {c.socials.links.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-foreground/5"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PRESS CONTACT / CTA BAND */}
      <section className="py-14 md:py-20">
        <div className="container max-w-3xl text-center">
          <m.div {...reveal}>
            <h2 className="font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">{c.contact.heading[locale]}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">{c.contact.body[locale]}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-full bg-primary px-8 text-sm md:text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                <Link href={localePath(locale, "/contact-us")} className="group flex items-center gap-2">
                  {t.contactCta}
                  {Arrow}
                </Link>
              </Button>
              <a
                href={`mailto:${c.contact.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 transition-colors hover:decoration-primary"
              >
                <Mail className="h-4 w-4 text-primary" aria-hidden />
                {c.contact.email}
              </a>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
