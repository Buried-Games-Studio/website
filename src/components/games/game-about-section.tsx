"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type GameTheme } from "@/lib/themes/game-themes";
import { fadeInUp, staggerContainer, staggerChild } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import { GameImage } from "@/components/ui/game-image";
import dynamic from "next/dynamic";
const ParticlesBackground = dynamic(() => import("@/components/particles-background").then(mod => mod.ParticlesBackground), { ssr: false });

interface GameAboutSectionProps {
  game: any;
  theme: GameTheme;
  language: string;
  aboutImage: string;
}

export function GameAboutSection({ game, theme, language, aboutImage }: GameAboutSectionProps) {
  const t_ui = {
    en: { about: "Mission Briefing", overview: "Overview" },
    ar: { about: "مهمة اللعبة", overview: "نظرة عامة" },
  }[language]!;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
        <ParticlesBackground />
      </div>

      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${theme.colors.gradientFrom}, transparent)` }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left: Text Content */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={staggerChild}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {t_ui.about}
              </div>
            </motion.div>

            <motion.h2 variants={staggerChild} className={cn(
              "text-4xl md:text-5xl font-headline font-bold text-white leading-tight",
              theme.layout === "magical-rpg" && "text-glow-primary"
            )}>
              {t_ui.overview}
            </motion.h2>

            <motion.div variants={staggerChild} className="prose prose-lg dark:prose-invert text-muted-foreground">
              <p className="leading-relaxed text-lg">{game.longDescription[language]}</p>
            </motion.div>

            {/* Stats Grid */}
            {game.stats && game.stats.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4 mt-8"
              >
                {game.stats.map((stat: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={staggerChild}
                    className={cn(
                      "p-4 rounded-xl text-center backdrop-blur-sm border transition-all duration-300 hover:scale-105",
                      theme.layout === "magical-rpg" && "bg-purple-950/30 border-purple-500/20 hover:border-yellow-500/30",
                      theme.layout === "explosive-arcade" && "bg-orange-950/30 border-orange-500/20 hover:border-red-500/30",
                      theme.layout === "sleek-competitive" && "bg-card/30 border-white/10 hover:border-primary/30"
                    )}
                  >
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{stat.label[language]}</div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 40, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.02 }}
          >
            <div className={cn(
              "relative aspect-square rounded-2xl overflow-hidden border shadow-2xl",
              theme.layout === "magical-rpg" && "border-purple-500/20 shadow-purple-500/10",
              theme.layout === "explosive-arcade" && "border-orange-500/20 shadow-orange-500/10",
              theme.layout === "sleek-competitive" && "border-white/10"
            )}>
              <GameImage
                src={aboutImage}
                alt="Game Visual"
                fill
                className="object-contain p-4"
                gameTitle={game.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Floating accent glow behind card */}
            <div
              className="absolute -inset-4 rounded-3xl blur-3xl opacity-20 -z-10"
              style={{ background: `linear-gradient(135deg, ${theme.colors.gradientFrom}, ${theme.colors.gradientTo})` }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
