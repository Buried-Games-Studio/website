"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { localePath, type Locale } from "@/lib/i18n";
import { getTranslation } from "@/lib/content";
import { Heart, Wand2, ShieldCheck, Target, ArrowRight } from "lucide-react";
import { assets } from "@/lib/assets";
import { teamMembers } from "@/lib/content/team";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function AboutUsContent({
  locale,
  showDesignWorks,
}: {
  locale: Locale;
  showDesignWorks: boolean;
}) {
  const language = locale;
  const t = getTranslation(language);
  const isRTL = language === "ar";

  const t_ui = {
    en: {
      eyebrow: "Studio profile",
      core_values_title: "Our DNA",
      our_story_title: "The origin story",
      mission_label: "Our mission",
      partners_title: "Strategic partners",
      established: "Est. 2018",
      studio_name: "Buried Games Studio",
      links_prefix: "Explore our",
      links_services: "game development services",
      links_join: "or browse the",
      links_games: "games we've shipped",
    },
    ar: {
      eyebrow: "ملف الاستوديو",
      core_values_title: "هويتنا",
      our_story_title: "قصة البداية",
      mission_label: "مهمتنا",
      partners_title: "شركاء النجاح",
      established: "تأسس 2018",
      studio_name: "استوديو بريد جيمز",
      links_prefix: "استكشف",
      links_services: "خدمات تطوير الألعاب لدينا",
      links_join: "أو تصفّح",
      links_games: "الألعاب التي أطلقناها",
    },
  }[language];

  const coreValues = {
    en: [
      { icon: Heart, title: "Passion First", description: "Driven by an obsession with gameplay excellence." },
      { icon: Wand2, title: "Innovation", description: "Pushing boundaries with new tech and mechanics." },
      { icon: ShieldCheck, title: "Quality", description: "Polished, bug-free, and immersive experiences." },
    ],
    ar: [
      { icon: Heart, title: "الشغف أولاً", description: "مدفوعون بهوس التميز في أسلوب اللعب." },
      { icon: Wand2, title: "الابتكار", description: "دفع الحدود بتقنيات وآليات جديدة." },
      { icon: ShieldCheck, title: "الجودة", description: "تجربة مصقولة، خالية من الأخطاء، وغامرة." },
    ],
  }[language];

  return (
    <main>
      {/* --- Hero band --- */}
      <section className="border-b border-border bg-card/40">
        <div className="container max-w-screen-xl py-14 md:py-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-5">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {t_ui.eyebrow}
            </p>
            <h1 className="font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground">
              {t.about_page.title}
            </h1>
          </m.div>
        </div>
      </section>

      {/* --- Our Story & Mission --- */}
      <section className="container max-w-screen-xl py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          {/* Left: Story */}
          <m.div {...reveal} className="space-y-6">
            <h2 className="flex items-center gap-3 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">
              <span aria-hidden="true" className="inline-block w-8 h-px bg-primary" />
              {t_ui.our_story_title}
            </h2>
            <div className="space-y-4 text-foreground/65 leading-relaxed max-w-2xl">
              <p>{t.about_page.p1}</p>
              <p>{t.about_page.p2}</p>
            </div>

            {/* Mission */}
            <div className="rounded-xl border-s-2 border-primary border-y border-e border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Target className="w-5 h-5" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em]">{t_ui.mission_label}</h3>
              </div>
              <p className="text-foreground text-base md:text-lg leading-relaxed">
                &ldquo;{t.about_page.mission_text}&rdquo;
              </p>
            </div>

            <p className="text-foreground/65 leading-relaxed">
              {t_ui.links_prefix}{" "}
              <Link
                href={localePath(language, "/services")}
                className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
              >
                {t_ui.links_services}
              </Link>{" "}
              {t_ui.links_join}{" "}
              <Link
                href={localePath(language, "/games")}
                className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
              >
                {t_ui.links_games}
              </Link>
              .
            </p>
          </m.div>

          {/* Right: Visual */}
          <m.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.08 }}
            className="group relative h-full min-h-[360px] overflow-hidden rounded-xl border border-border lg:sticky lg:top-24"
          >
            <Image
              src={assets.aboutSection}
              alt={t_ui.studio_name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-6 start-6 end-6">
              <div className="text-foreground/60 text-xs uppercase tracking-[0.2em] mb-1.5">{t_ui.established}</div>
              <div className="text-xl font-bold text-foreground">{t_ui.studio_name}</div>
            </div>
          </m.div>
        </div>
      </section>

      {/* --- Core Values --- */}
      <section className="border-y border-border bg-card/40">
        <div className="container max-w-screen-xl py-14 md:py-20">
          <m.div {...reveal} className="mb-10">
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-4">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {t_ui.core_values_title}
            </p>
          </m.div>

          <div className="grid gap-5 md:grid-cols-3">
            {coreValues.map((value, index) => (
              <m.div
                key={index}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.06 }}
                className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-primary">
                  <value.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-foreground">{value.title}</h3>
                <p className="text-sm text-foreground/65 leading-relaxed">{value.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Team --- */}
      <section className="container max-w-screen-xl py-14 md:py-20">
        <m.div {...reveal} className="mb-8">
          <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
            {t.about_page.team_title}
          </p>
        </m.div>

        <div className="grid gap-6">
          {teamMembers.map((member) => {
            const showcaseHref =
              member.showcaseHref && showDesignWorks
                ? localePath(language, member.showcaseHref)
                : undefined;
            const cardHref = showcaseHref ?? member.linkedInUrl;

            const card = (
              <div className="grid overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/40 md:grid-cols-12">
                {/* Image */}
                <div className="relative h-72 md:col-span-4 md:h-auto">
                  <Image
                    src={member.photoUrl}
                    alt={member.name[language]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-card" />
                </div>

                {/* Content */}
                <div className="relative md:col-span-8 p-7 md:p-10 flex flex-col justify-center">
                  {cardHref && (
                    <ArrowRight
                      className={`absolute top-6 end-6 w-5 h-5 text-foreground/30 transition-all duration-300 group-hover:text-primary ${
                        isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
                      }`}
                    />
                  )}
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                    {member.role[language]}
                  </p>
                  <h3 className="font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">
                    {member.name[language]}
                  </h3>
                  {member.title[language] !== member.role[language] && (
                    <p className="mt-1 text-sm text-foreground/70">{member.title[language]}</p>
                  )}
                  {member.quote ? (
                    <p className="mt-5 text-foreground/65 leading-relaxed max-w-2xl">
                      &ldquo;{member.quote[language]}&rdquo;
                    </p>
                  ) : member.bio ? (
                    <p className="mt-5 text-foreground/65 leading-relaxed max-w-2xl">
                      {member.bio[language]}
                    </p>
                  ) : null}
                </div>
              </div>
            );

            return (
              <m.div key={member.id} {...reveal}>
                {showcaseHref ? (
                  <Link href={showcaseHref} className="group block">
                    {card}
                  </Link>
                ) : member.linkedInUrl ? (
                  <a
                    href={member.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {card}
                  </a>
                ) : (
                  <div className="group">{card}</div>
                )}
              </m.div>
            );
          })}
        </div>
      </section>

      {/* --- Partners --- */}
      <section className="border-t border-border bg-card/40">
        <div className="container max-w-screen-xl py-14">
          <m.div {...reveal} className="flex flex-col items-center text-center">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/50 mb-8">
              {t_ui.partners_title}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
              {t.partners.items.map((partner, index) => (
                <a
                  key={index}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={partner.name}
                  className="opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  <Image
                    src={assets.gavan}
                    alt={partner.name}
                    width={160}
                    height={60}
                    className="object-contain"
                  />
                </a>
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
