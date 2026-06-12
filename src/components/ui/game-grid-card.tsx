"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GameImage } from "@/components/ui/game-image";
import { localePath, type Locale } from "@/lib/i18n";

export interface GameGridCardData {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  status: "released" | "development" | "coming_soon" | "completed";
  engine: string;
  tags?: string[];
}

const statusLabels: Record<Locale, Record<GameGridCardData["status"], string>> = {
  en: {
    released: "Released",
    development: "In Development",
    coming_soon: "Coming Soon",
    completed: "Completed",
  },
  ar: {
    released: "متاح",
    development: "قيد التطوير",
    coming_soon: "قريباً",
    completed: "مكتمل",
  },
};

// Status dot color only — chips themselves stay on the neutral surface so the
// card art reads first and red stays reserved for the primary accents.
const statusDot: Record<GameGridCardData["status"], string> = {
  released: "bg-emerald-400",
  development: "bg-amber-400",
  coming_soon: "bg-sky-400",
  completed: "bg-violet-400",
};

const viewLabel: Record<Locale, string> = {
  en: "View game",
  ar: "عرض اللعبة",
};

export function GameGridCard({
  game,
  language,
  index = 0,
}: {
  game: GameGridCardData;
  language: Locale;
  index?: number;
}) {
  const isRTL = language === "ar";

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={localePath(language, `/games/${game.slug}`)}
        className="group block h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Key art panel: game logo/art on a layered surface with a bottom scrim */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary/40 via-card to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--primary)/0.12),transparent_65%)]" />
          <GameImage
            src={game.image}
            alt={game.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.06]"
            gameTitle={game.title}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />

          {/* Status chip, top-start */}
          <div className="absolute top-3 start-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-foreground/80 backdrop-blur-sm">
              <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[game.status])} />
              {statusLabels[language][game.status]}
            </span>
          </div>

          {/* Engine / platform chip, top-end */}
          <div className="absolute top-3 end-3">
            <span className="inline-flex items-center rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] font-medium text-foreground/60 backdrop-blur-sm">
              {game.engine}
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base md:text-lg font-headline font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {game.title}
            </h3>
            <ArrowUpRight
              className={cn(
                "h-4 w-4 shrink-0 text-foreground/40 transition-all duration-300 group-hover:text-primary",
                "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                isRTL && "-scale-x-100 group-hover:-translate-x-0.5",
              )}
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/60">
            {game.description}
          </p>
          {game.tags && game.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2 py-0.5 text-[11px] text-foreground/55"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            {viewLabel[language]}
          </span>
        </div>
      </Link>
    </m.div>
  );
}
