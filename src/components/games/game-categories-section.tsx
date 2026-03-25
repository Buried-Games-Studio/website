"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { type GameTheme } from "@/lib/themes/game-themes";
import { staggerContainer, staggerChild } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";

interface Category {
  name: { en: string; ar: string };
  image: string;
}

interface GameCategoriesSectionProps {
  categories: Category[];
  theme: GameTheme;
  language: string;
}

export function GameCategoriesSection({ categories, theme, language }: GameCategoriesSectionProps) {
  if (!categories || categories.length === 0) return null;

  const t_ui = {
    en: { title: "Explore Categories", subtitle: "Test your knowledge across dozens of topics" },
    ar: { title: "استكشف الفئات", subtitle: "اختبر معلوماتك عبر عشرات المواضيع" },
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              variants={staggerChild}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 hover:border-primary/40 cursor-pointer transition-colors duration-300"
            >
              <Image
                src={cat.image}
                alt={cat.name[language as "en" | "ar"]}
                fill
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 40px ${theme.colors.glow}` }}
              />

              {/* Category name */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                <span className="text-sm font-bold text-white drop-shadow-lg">
                  {cat.name[language as "en" | "ar"]}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
