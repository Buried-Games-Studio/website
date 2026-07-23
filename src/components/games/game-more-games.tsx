"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gamesContent } from "@/lib/content/games";
import { type GameTheme } from "@/lib/themes/game-themes";
import { localePath, type Locale } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { staggerContainer, staggerChild } from "@/lib/motion/variants";
import { GameImage } from "@/components/ui/game-image";
import { cn } from "@/lib/utils";

// Descriptive anchor phrases for cross-links. Each reads as a natural sentence
// fragment ("our trivia game Nabsh") rather than a bare title, so the internal
// links carry topical anchor text instead of generic names.
const anchorText: Record<string, Record<Locale, string>> = {
  nabsh: { en: "our trivia game Nabsh", ar: "لعبة التريفيا نبش" },
  koutq8: { en: "our Kuwaiti card game KoutQ8", ar: "لعبة الورق الكويتية كوت" },
  arrab: { en: "our Mafia social deduction game Arrab", ar: "لعبة المافيا والخداع الاجتماعي العرّاب" },
  "power-of-bombs": { en: "our bomber arcade game Power of Bombs", ar: "لعبة الأركيد باور أوف بومبز" },
  "luna-fantasy": { en: "the Luna Fantasy card universe", ar: "عالم بطاقات لونا فانتازيا" },
  "gathered-by-the-light": {
    en: "our pixel-art platformer Gathered by the Light",
    ar: "لعبة المنصات بفن البكسل Gathered by the Light",
  },
};

const gameImageMap: Record<string, string> = {
  "power-of-bombs": assets.powerOfBombsLogo,
  koutq8: assets.koutq8Logo,
  nabsh: assets.nabshLogo,
  "luna-fantasy": "https://assets.buriedgames.com/images/games/luna-fantasy/hero.png",
  "gathered-by-the-light": "https://assets.buriedgames.com/images/games/gbtl/poster.png",
  arrab: assets.arrabHeroRight,
};

// Native mobile builds (Unity / store releases) point at the mobile service;
// the browser-based titles point at the general game development service.
const mobileFirst = new Set(["koutq8", "gathered-by-the-light"]);

interface GameMoreGamesProps {
  currentSlug: string;
  theme: GameTheme;
  language: Locale;
}

export function GameMoreGames({ currentSlug, theme, language }: GameMoreGamesProps) {
  const others = gamesContent.filter((g) => g.slug !== currentSlug).slice(0, 3);

  const t = {
    en: {
      heading: "More games by Buried Games",
      lead: "Buried Games is a game development studio building original titles for players across Kuwait and the GCC. Explore more of our work:",
      serviceLead:
        "Want a game like this for your brand? The same team behind our titles builds games for clients across Kuwait and the GCC:",
      view: "View game",
    },
    ar: {
      heading: "المزيد من ألعاب بريد جيمز",
      lead: "بريد جيمز استوديو تطوير ألعاب يبني عناوين أصلية للاعبين في الكويت والخليج. استكشف المزيد من أعمالنا:",
      serviceLead:
        "تريد لعبة كهذه لعلامتك التجارية؟ نفس الفريق الذي صنع ألعابنا يبني ألعابًا لعملائنا في الكويت والخليج:",
      view: "عرض اللعبة",
    },
  }[language];

  // Game pages are the site's strongest organic entry points (GSC/GA4), so
  // each one funnels descriptive-anchor links to the money pages: the
  // contextual dev service, the art service, and the Kuwait landing.
  const serviceLinks: Array<{ href: string; label: Record<Locale, string> }> = [
    mobileFirst.has(currentSlug)
      ? {
          href: "/services/mobile-game-development",
          label: {
            en: "Mobile game development service",
            ar: "خدمة تطوير ألعاب الموبايل",
          },
        }
      : {
          href: "/services/game-development",
          label: {
            en: "Game development service",
            ar: "خدمة تطوير الألعاب",
          },
        },
    {
      href: "/services/game-art-design",
      label: {
        en: "2D/3D game art & animation",
        ar: "فن الألعاب والتحريك 2D/3D",
      },
    },
    {
      href: "/game-development-kuwait",
      label: {
        en: "Game development in Kuwait",
        ar: "تطوير الألعاب في الكويت",
      },
    },
  ];

  return (
    <section
      className={cn(
        "border-t py-14 md:py-20",
        theme.layout === "magical-rpg" && "border-purple-500/10 bg-purple-950/10",
        theme.layout === "explosive-arcade" && "border-orange-500/10 bg-orange-950/10",
        theme.layout === "noir-mafia" && "border-red-900/10 bg-red-950/5",
        (theme.layout === "sleek-competitive" || theme.layout === "pixel-adventure") &&
          "border-border bg-card/40",
      )}
    >
      <div className="container max-w-screen-xl">
        <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-foreground">
          {t.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-base text-foreground/65 leading-relaxed">
          {t.lead}
        </p>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {others.map((g) => {
            const label = anchorText[g.slug]?.[language] ?? g.title;
            return (
              <m.div key={g.slug} variants={staggerChild}>
                <Link
                  href={localePath(language, `/games/${g.slug}`)}
                  className="group block h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-secondary/40 via-card to-background">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--primary)/0.1),transparent_65%)]" />
                    <GameImage
                      src={gameImageMap[g.slug] ?? "https://assets.buriedgames.com/images/hero-collage.jpg"}
                      alt={g.title}
                      fill
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                      gameTitle={g.title}
                    />
                  </div>
                  <div className="p-5">
                  <p className="mb-2 text-base font-semibold capitalize text-foreground">{label}</p>
                  <p className="line-clamp-2 text-sm text-foreground/65 leading-relaxed">{g.description[language]}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    {t.view}
                    <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", language === "ar" && "rotate-180 group-hover:-translate-x-1")} aria-hidden="true" />
                  </span>
                  </div>
                </Link>
              </m.div>
            );
          })}
        </m.div>

        <div className="mt-10 rounded-xl border border-border bg-card/40 p-6">
          <p className="max-w-2xl text-base text-foreground/65 leading-relaxed">
            {t.serviceLead}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={localePath(language, link.href)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                {link.label[language]}
                <ArrowRight
                  className={cn(
                    "h-3.5 w-3.5",
                    language === "ar" && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
