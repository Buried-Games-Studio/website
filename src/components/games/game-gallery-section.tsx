"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { type GameTheme } from "@/lib/themes/game-themes";
import { GameImage } from "@/components/ui/game-image";
import { cn } from "@/lib/utils";

interface GameGallerySectionProps {
  game: any;
  theme: GameTheme;
  language: string;
  galleryImageMap: Record<string, string>;
}

export function GameGallerySection({ game, theme, language, galleryImageMap }: GameGallerySectionProps) {
  if (!game.gallery || game.gallery.length === 0) return null;

  const t_ui = {
    en: { title: "Visual Database" },
    ar: { title: "قاعدة البيانات المرئية" },
  }[language]!;

  return (
    <section className="py-32 overflow-hidden">
      <motion.div
        className="container mb-12 flex items-end justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-headline font-bold">{t_ui.title}</h2>
        <div className="hidden md:block w-1/3 h-px bg-gradient-to-r from-primary/30 to-transparent mb-4" />
      </motion.div>

      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Carousel className="w-full" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-4">
            {game.gallery.map((img: any, index: number) => {
              const gallerySrc = galleryImageMap[img.url] || img.url;
              return (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-2/3">
                  <motion.div
                    className={cn(
                      "group relative aspect-video rounded-2xl overflow-hidden border bg-black/80",
                      theme.layout === "magical-rpg" && "border-purple-500/15 hover:border-purple-500/30",
                      theme.layout === "explosive-arcade" && "border-orange-500/15 hover:border-orange-500/30",
                      theme.layout === "sleek-competitive" && "border-white/10 hover:border-primary/30"
                    )}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GameImage
                      src={gallerySrc}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                      gameTitle={game.title}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-6">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </motion.div>
    </section>
  );
}
