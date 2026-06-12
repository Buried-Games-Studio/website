"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { type GameTheme } from "@/lib/themes/game-themes";
import { staggerContainer, staggerChild } from "@/lib/motion/variants";

interface DesignAsset {
  label: { en: string; ar: string };
  image: string;
}

interface GameDesignJourneySectionProps {
  assets: DesignAsset[];
  trailerUrl?: string;
  theme: GameTheme;
  language: string;
}

export function GameDesignJourneySection({ assets, trailerUrl, theme, language }: GameDesignJourneySectionProps) {
  const t_ui = {
    en: { title: "Design Journey", subtitle: "Game mechanics and interactive elements crafted during development", trailer: "Watch Trailer" },
    ar: { title: "رحلة التصميم", subtitle: "آليات اللعبة والعناصر التفاعلية", trailer: "شاهد العرض" },
  }[language]!;

  return (
    <section className="py-14 md:py-20 overflow-hidden border-y border-yellow-500/10 bg-gradient-to-b from-transparent via-green-950/10 to-transparent">
      <div className="container">
        <m.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-foreground mb-3">{t_ui.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t_ui.subtitle}</p>
        </m.div>

        {/* Mechanics grid */}
        {assets && assets.length > 0 && (
          <m.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {assets.map((asset, index) => (
              <m.div
                key={index}
                variants={staggerChild}
                whileHover={{ y: -4 }}
                className="group relative bg-card/30 border border-yellow-500/10 hover:border-yellow-500/30 rounded-xl p-4 transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square rounded-lg bg-black/50 flex items-center justify-center mb-3 overflow-hidden">
                  <Image
                    src={asset.image}
                    alt={asset.label[language as "en" | "ar"]}
                    width={200}
                    height={200}
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
                <p className="text-sm font-bold text-center text-white/70 group-hover:text-yellow-400 transition-colors">
                  {asset.label[language as "en" | "ar"]}
                </p>
              </m.div>
            ))}
          </m.div>
        )}

        {/* Trailer */}
        {trailerUrl && (
          <m.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-headline font-bold text-center mb-6">{t_ui.trailer}</h3>
            <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-500/20 shadow-[0_0_40px_rgba(234,179,8,0.1)]">
              <video
                controls
                playsInline
                preload="metadata"
                poster="https://assets.buriedgames.com/images/games/gbtl/poster.png"
                className="w-full aspect-video bg-black"
              >
                <source src={trailerUrl} type="video/mp4" />
              </video>
            </div>
          </m.div>
        )}
      </div>
    </section>
  );
}
