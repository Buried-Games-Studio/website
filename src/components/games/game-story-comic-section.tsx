"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type GameTheme } from "@/lib/themes/game-themes";
import { staggerContainer, staggerChild } from "@/lib/motion/variants";

interface GameStoryComicSectionProps {
  slides: string[];
  theme: GameTheme;
  language: string;
}

export function GameStoryComicSection({ slides, theme, language }: GameStoryComicSectionProps) {
  if (!slides || slides.length === 0) return null;

  const t_ui = {
    en: { title: "The Story", subtitle: "A cinematic pixel-art comic prologue" },
    ar: { title: "القصة", subtitle: "مقدمة كوميكية بفن البكسل" },
  }[language]!;

  return (
    <section className="py-24 overflow-hidden bg-black">
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
          className="flex flex-col gap-6 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              variants={staggerChild}
              className="relative rounded-lg overflow-hidden border-2 border-yellow-500/20 hover:border-yellow-500/40 transition-colors duration-300 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
            >
              <Image
                src={slide}
                alt={`Story slide ${index + 1}`}
                width={1920}
                height={1080}
                className="w-full h-auto"
                style={{ imageRendering: "pixelated" }}
              />
              {/* Slide number */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-mono text-yellow-400 border border-yellow-500/30">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
