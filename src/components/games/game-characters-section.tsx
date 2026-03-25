"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type GameTheme } from "@/lib/themes/game-themes";
import { staggerContainer, staggerChild } from "@/lib/motion/variants";

interface Character {
  name: { en: string; ar: string };
  sprite: string;
}

interface GameCharactersSectionProps {
  characters: Character[];
  theme: GameTheme;
  language: string;
}

export function GameCharactersSection({ characters, theme, language }: GameCharactersSectionProps) {
  if (!characters || characters.length === 0) return null;

  const t_ui = {
    en: { title: "Characters", subtitle: "The cast of Gathered by the Light" },
    ar: { title: "الشخصيات", subtitle: "شخصيات اللعبة" },
  }[language]!;

  return (
    <section className="py-24 overflow-hidden">
      <div className="container">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">{t_ui.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t_ui.subtitle}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {characters.map((char, index) => (
            <motion.div
              key={index}
              variants={staggerChild}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group flex flex-col items-center"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-b from-yellow-500/10 to-green-900/20 border border-yellow-500/20 hover:border-yellow-500/40 flex items-center justify-center overflow-hidden transition-colors duration-300">
                {/* Pixel art glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={char.sprite}
                  alt={char.name[language as "en" | "ar"]}
                  width={120}
                  height={120}
                  className="object-contain"
                  style={{ imageRendering: "pixelated" }}
                  unoptimized
                />
              </div>
              <span className="mt-3 text-sm font-bold text-white/80 group-hover:text-yellow-400 transition-colors">
                {char.name[language as "en" | "ar"]}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
