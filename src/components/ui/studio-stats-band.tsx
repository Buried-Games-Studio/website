"use client";

import { m } from "framer-motion";
import { studioStats } from "@/lib/content/studio-facts";
import type { Locale } from "@/lib/i18n";

/**
 * The studio's proof band — shipped games, years active, engines, remote.
 *
 * Extracted from home-content.tsx so the commercial pages can carry proof too.
 * The 05.08.2026 competitor teardown found the page outranking
 * /game-development-kuwait leading with "200+ shipped titles" and Sony/Disney
 * logos, while our country and service pages carried no numbers at all. We
 * answer with our own real figures rather than borrowed ones — every value is
 * derived or hand-checked in `studio-facts.ts`.
 *
 * Numerals are `text-primary` per the brand rule: red is reserved for CTAs,
 * eyebrow ticks and key numerals, never body copy.
 */
export function StudioStatsBand({ locale }: { locale: Locale }) {
  return (
    <section
      className="!py-0 border-y border-border bg-card/40"
      aria-label={locale === "ar" ? "أرقام الاستوديو" : "Studio at a glance"}
    >
      <div className="container max-w-screen-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {studioStats.map((stat, i) => (
            <m.div
              key={stat.label.en}
              className="py-6 md:py-7 text-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="font-headline font-bold text-3xl md:text-4xl text-primary tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-foreground/55 uppercase tracking-[0.2em] mt-1.5">
                {stat.label[locale]}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
