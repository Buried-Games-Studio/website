"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { GameImage } from "@/components/ui/game-image";
import {
  DESIGN_WORKS_PATH,
  designWorksUi,
  type DesignWork,
} from "@/lib/content/design-works";
import { bokhari, getTeamMember } from "@/lib/content/team";
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

export function DesignWorkDetailContent({
  locale,
  work,
}: {
  locale: Locale;
  work: DesignWork;
}) {
  const isRTL = locale === "ar";
  const ui = designWorksUi[locale];
  const author = getTeamMember(work.authorId ?? "") ?? bokhari;

  const facts: Array<{ label: string; value: string }> = [
    {
      label: ui.designedByLabel,
      value: `${author.name[locale]} — ${author.jobTitle[locale]}`,
    },
    {
      label: ui.disciplineLabel,
      value: work.discipline.map((d) => d[locale]).join(" · "),
    },
    ...(work.tools?.length
      ? [{ label: ui.toolsLabel, value: work.tools.join(" · ") }]
      : []),
    ...(work.year ? [{ label: ui.yearLabel, value: work.year }] : []),
  ];

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
            <Link
              href={localePath(locale, DESIGN_WORKS_PATH)}
              className="transition-colors hover:text-foreground"
            >
              {ui.breadcrumbIndex}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{work.latinName}</span>
          </nav>
          <m.div {...reveal}>
            <Eyebrow label={ui.indexEyebrow} />
            <h1 className="mt-5 max-w-3xl font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground text-start">
              {work.title[locale]}
            </h1>
            {/* Team-member credit — the work is his, shared under the studio umbrella */}
            <p className="mt-4 text-sm text-foreground/70 text-start">
              <Link
                href={localePath(locale, "/about-us")}
                className="font-medium text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
              >
                {ui.byPrefix} {author.name[locale]}
              </Link>
              <span> · {author.jobTitle[locale]} — {ui.studioName}</span>
            </p>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65 text-start">
              {work.intro[locale]}
            </p>
          </m.div>
        </div>
      </section>

      {/* FACTS BAND */}
      <section className="border-b border-border py-10 md:py-12">
        <div className="container max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={ui.factsTitle} />
            <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact, i) => (
                <div key={i} className="text-start">
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/50">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-relaxed text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </m.div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-b border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-screen-xl">
          <m.div {...reveal}>
            <Eyebrow label={ui.galleryTitle} />
          </m.div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {work.gallery.map((image, i) => (
              <m.figure
                key={image.url}
                {...reveal}
                transition={{ ...reveal.transition, delay: (i % 2) * 0.06 }}
                className="overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3]">
                  <GameImage
                    src={image.url}
                    alt={image.hint[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                    gameTitle={work.latinName}
                  />
                </div>
                <figcaption className="p-4 text-xs text-foreground/55 text-start">
                  {image.hint[locale]}
                </figcaption>
              </m.figure>
            ))}
          </div>
        </div>
      </section>

      {/* WRITE-UP SECTIONS — alternating surfaces, start-aligned */}
      {work.sections?.map((section, i) => {
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

      {/* RELATED LINKS */}
      {work.related && work.related.length > 0 && (
        <section className="border-y border-border bg-card/40 py-10 md:py-12">
          <div className="container max-w-screen-xl">
            <m.div {...reveal}>
              <Eyebrow label={ui.relatedTitle} />
              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
                {work.related.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary"
                    >
                      {link.label[locale]}
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={localePath(locale, link.href)}
                      className="group inline-flex items-center gap-2 text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary"
                    >
                      {link.label[locale]}
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180 rtl:group-hover:-translate-x-1" : ""}`}
                      />
                    </Link>
                  ),
                )}
              </div>
            </m.div>
          </div>
        </section>
      )}

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
                location="design_work"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />
                {ui.whatsappCta}
              </WhatsAppLink>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
