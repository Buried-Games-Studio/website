"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GameImage } from "@/components/ui/game-image";
import {
  DESIGN_WORKS_PATH,
  designWorksUi,
  type DesignWork,
} from "@/lib/content/design-works";
import { bokhari, getTeamMember } from "@/lib/content/team";
import { localePath, type Locale } from "@/lib/i18n";

export function DesignWorkCard({
  work,
  language,
  index = 0,
}: {
  work: DesignWork;
  language: Locale;
  index?: number;
}) {
  const isRTL = language === "ar";
  const ui = designWorksUi[language];
  const author = getTeamMember(work.authorId ?? "") ?? bokhari;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={localePath(language, `${DESIGN_WORKS_PATH}/${work.slug}`)}
        className="group block h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {/* Cover panel: the piece itself on a layered surface with a bottom scrim */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary/40 via-card to-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--primary)/0.12),transparent_65%)]" />
          <GameImage
            src={work.heroImage}
            alt={work.heroImageHint[language]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            gameTitle={work.latinName}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Caption */}
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base md:text-lg font-headline font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {work.title[language]}
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
          <p className="mt-1.5 text-xs text-foreground/50">
            {ui.byPrefix} {author.name[language]} · {author.jobTitle[language]}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/60">
            {work.summary[language]}
          </p>
          {work.discipline.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {work.discipline.map((tag) => (
                <span
                  key={tag.en}
                  className="rounded-full border border-border px-2 py-0.5 text-[11px] text-foreground/55"
                >
                  {tag[language]}
                </span>
              ))}
            </div>
          )}
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            {ui.viewCta}
          </span>
        </div>
      </Link>
    </m.div>
  );
}
