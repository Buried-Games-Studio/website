"use client";

import { m } from "framer-motion";
import { type GameTheme } from "@/lib/themes/game-themes";
import { type Locale } from "@/lib/i18n";
import { staggerContainer, staggerChild } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import { Gamepad2, MapPin, Hammer, type LucideIcon } from "lucide-react";

interface LocalizedBlock {
  en: string;
  ar: string;
}

interface GameSections {
  overview?: LocalizedBlock;
  howToPlay?: LocalizedBlock;
  whereToPlay?: LocalizedBlock;
  developmentStory?: LocalizedBlock;
}

interface GameContentSectionsProps {
  sections: GameSections | undefined;
  theme: GameTheme;
  language: Locale;
}

// Section keys rendered here (overview lives in the About hero alongside the
// stats). Each becomes a distinct <h2> so the page exposes real, crawlable
// heading structure instead of one undifferentiated blurb.
const SECTION_ORDER: Array<{
  key: keyof GameSections;
  icon: LucideIcon;
  heading: Record<Locale, string>;
}> = [
  {
    key: "howToPlay",
    icon: Gamepad2,
    heading: { en: "How to Play", ar: "كيفية اللعب" },
  },
  {
    key: "whereToPlay",
    icon: MapPin,
    heading: { en: "Platforms & Where to Play", ar: "المنصات وأين تلعب" },
  },
  {
    key: "developmentStory",
    icon: Hammer,
    heading: { en: "Development Story", ar: "قصة التطوير" },
  },
];

export function GameContentSections({ sections, theme, language }: GameContentSectionsProps) {
  if (!sections) return null;

  const blocks = SECTION_ORDER.map((s) => ({ ...s, body: sections[s.key]?.[language] })).filter(
    (s) => Boolean(s.body),
  );

  if (blocks.length === 0) return null;

  return (
    <section className="relative py-14 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-12">
          {blocks.map(({ key, icon: Icon, heading, body }) => (
            <m.article
              key={key}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-4"
            >
              <m.div variants={staggerChild} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                    theme.layout === "magical-rpg" && "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
                    theme.layout === "explosive-arcade" && "border-orange-500/20 bg-orange-500/10 text-orange-400",
                    theme.layout === "noir-mafia" && "border-amber-500/20 bg-amber-500/10 text-amber-400",
                    (theme.layout === "sleek-competitive" || theme.layout === "pixel-adventure") &&
                      "border-primary/20 bg-primary/10 text-primary",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-foreground">
                  {heading[language]}
                </h2>
              </m.div>
              <m.p
                variants={staggerChild}
                className="text-base md:text-lg leading-relaxed text-foreground/70"
              >
                {body}
              </m.p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
