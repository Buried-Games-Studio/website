"use client";

import { m } from "framer-motion";
import { type GameTheme } from "@/lib/themes/game-themes";
import { staggerContainer, staggerChild } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import {
  Puzzle, Users, Bolt, ShieldCheck, Bot, Trophy, Smartphone,
  BookOpen, Wallet, Globe, type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Puzzle, Users, Bolt, ShieldCheck, Bot, Trophy, Smartphone, BookOpen, Wallet, Globe,
};

interface GameFeaturesSectionProps {
  game: any;
  theme: GameTheme;
  language: string;
}

function MagicalCard({ feature, index, language }: { feature: any; index: number; language: string }) {
  const Icon = iconMap[feature.icon];
  return (
    <m.div
      variants={staggerChild}
      whileHover={{ y: -8, rotateY: 5, rotateX: -2 }}
      className="group relative bg-purple-950/30 border border-purple-500/15 hover:border-yellow-500/40 p-6 rounded-xl transition-all duration-500 overflow-hidden"
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
    >
      {/* Gold trim top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Rarity corner ornament */}
      <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-yellow-500/20 rounded-tr-lg group-hover:border-yellow-500/50 transition-colors" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-yellow-500/20 rounded-bl-lg group-hover:border-yellow-500/50 transition-colors" />

      <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-4 group-hover:scale-110 group-hover:bg-yellow-500/20 transition-all duration-300">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <h3 className="text-base md:text-lg font-headline font-bold tracking-tight mb-2 group-hover:text-yellow-300 transition-colors duration-300">{feature.title[language]}</h3>
      <p className="text-sm text-foreground/65 leading-relaxed">{feature.description[language]}</p>

      {/* Background glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </m.div>
  );
}

function ExplosiveCard({ feature, index, language }: { feature: any; index: number; language: string }) {
  const Icon = iconMap[feature.icon];
  return (
    <m.div
      variants={staggerChild}
      whileHover={{ y: -6, scale: 1.03 }}
      className={cn(
        "group relative bg-orange-950/20 border border-orange-500/15 hover:border-red-500/40 p-6 rounded-xl transition-all duration-300 overflow-hidden",
        index % 2 === 1 && "lg:translate-y-4"
      )}
    >
      {/* Number badge */}
      <div aria-hidden="true" className="absolute top-4 right-4 text-5xl font-black text-orange-500/10 group-hover:text-orange-500/20 transition-colors select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Skewed accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <h3 className="text-base md:text-lg font-headline font-bold tracking-tight mb-2 group-hover:text-orange-300 transition-colors duration-300">{feature.title[language]}</h3>
      <p className="text-sm text-foreground/65 leading-relaxed">{feature.description[language]}</p>
    </m.div>
  );
}

function CompetitiveCard({ feature, index, language }: { feature: any; index: number; language: string }) {
  const Icon = iconMap[feature.icon];
  return (
    <m.div
      variants={staggerChild}
      whileHover={{ y: -4 }}
      className="group relative bg-card border border-border hover:border-primary/40 p-6 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Animated underline */}
      <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
        {Icon && <Icon className="w-6 h-6" />}
      </div>
      <h3 className="text-base md:text-lg font-headline font-bold tracking-tight mb-2 group-hover:text-primary transition-colors duration-300">{feature.title[language]}</h3>
      <p className="text-sm text-foreground/65 leading-relaxed">{feature.description[language]}</p>
    </m.div>
  );
}

export function GameFeaturesSection({ game, theme, language }: GameFeaturesSectionProps) {
  const t_ui = {
    en: { eyebrow: "Features", title: "Intel & Features", subtitle: "Key operational capabilities and game mechanics." },
    ar: { eyebrow: "المميزات", title: "المميزات والبيانات", subtitle: "القدرات التشغيلية الرئيسية وآليات اللعبة." },
  }[language]!;

  const cardComponents: Record<GameTheme["layout"], typeof CompetitiveCard> = {
    "magical-rpg": MagicalCard,
    "explosive-arcade": ExplosiveCard,
    "sleek-competitive": CompetitiveCard,
    "pixel-adventure": CompetitiveCard,
    "noir-mafia": CompetitiveCard,
  };
  const CardComponent = cardComponents[theme.layout] || CompetitiveCard;

  return (
    <section className={cn(
      "py-14 md:py-20 border-y",
      theme.layout === "magical-rpg" && "bg-purple-950/10 border-purple-500/10",
      theme.layout === "explosive-arcade" && "bg-orange-950/10 border-orange-500/10",
      theme.layout === "sleek-competitive" && "bg-card/40 border-border",
      theme.layout === "noir-mafia" && "bg-red-950/5 border-red-900/10",
      theme.layout === "pixel-adventure" && "bg-card/40 border-border"
    )}>
      <div className="container max-w-screen-xl">
        <m.div
          className="mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
            {t_ui.eyebrow}
          </p>
          <h2 className="mt-4 text-2xl md:text-3xl font-headline font-bold tracking-tight text-foreground">{t_ui.title}</h2>
          <p className="mt-3 max-w-2xl text-base text-foreground/65 leading-relaxed">{t_ui.subtitle}</p>
        </m.div>

        <m.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {game.features.map((feature: any, index: number) => (
            <CardComponent key={index} feature={feature} index={index} language={language} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
