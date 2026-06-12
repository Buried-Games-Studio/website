"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type GameTheme } from "@/lib/themes/game-themes";
import { Play, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { trackStoreClick } from "@/lib/google-analytics";

interface GameCTASectionProps {
  game: any;
  theme: GameTheme;
  language: string;
  gameLogo: string | string | undefined;
  storeImageMap: Record<string, string>;
}

export function GameCTASection({ game, theme, language, gameLogo, storeImageMap }: GameCTASectionProps) {
  if (!game.storeLinks || game.storeLinks.length === 0) return null;

  const t_ui = {
    en: { play: "Deploy Now", buy: "Acquire Game", join: "Join thousands of players online." },
    ar: { play: "ابدأ اللعب", buy: "شراء اللعبة", join: "انضم إلى آلاف اللاعبين عبر الإنترنت." },
  }[language]!;

  const isWebGame = game.storeLinks.some((link: any) => link.store === "web");

  return (
    <section className="py-14 md:py-20 relative">
      <div className="absolute inset-0 bg-primary/5 -z-10" />

      <div className="container">
        <m.div
          className={cn(
            "max-w-4xl mx-auto border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden",
            theme.layout === "magical-rpg" && "bg-purple-950/30 border-purple-500/20",
            theme.layout === "explosive-arcade" && "bg-orange-950/30 border-orange-500/20",
            (theme.layout === "sleek-competitive" || theme.layout === "pixel-adventure" || theme.layout === "noir-mafia") && "bg-card border-border"
          )}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top glow accent */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.colors.gradientFrom}, ${theme.colors.gradientTo}, transparent)`,
              boxShadow: `0 0 60px ${theme.colors.glow}`,
            }}
          />

          <h2 className="text-2xl md:text-3xl font-headline font-bold tracking-tight mb-8">
            {isWebGame ? t_ui.play : t_ui.buy}
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {game.storeLinks.map((link: any, index: number) => {
              const storeLabel = link.label ? link.label[language] : `Download on ${link.store}`;

              if (link.store === "web") {
                return (
                  <m.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button asChild size="lg" className={cn(
                      "h-12 md:h-13 px-8 text-sm md:text-base rounded-full font-semibold shadow-lg transition-all duration-300",
                      "bg-primary hover:bg-primary/90 text-primary-foreground",
                      `hover:shadow-[0_0_40px_${theme.colors.glow}]`
                    )}>
                      <Link href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" onClick={() => trackStoreClick(game.slug, 'web', link.url)}>
                        <Play className="fill-current w-4 h-4" />
                        {storeLabel}
                        <ArrowRight className={cn("w-4 h-4", language === "ar" && "rotate-180")} />
                      </Link>
                    </Button>
                  </m.div>
                );
              }

              const StoreImageSrc = link.imageUrl ? storeImageMap[link.imageUrl] : null;
              return (
                <m.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" className="group" onClick={() => trackStoreClick(game.slug, link.store, link.url)}>
                    {StoreImageSrc ? (
                      <div className="relative h-16 w-48 rounded-lg overflow-hidden border border-white/20 group-hover:border-primary transition-colors">
                        <Image src={StoreImageSrc} alt={`${game.title} on ${link.store}`} fill className="object-contain" />
                      </div>
                    ) : (
                      <Button size="lg" className="h-12 md:h-13 px-8 text-sm md:text-base rounded-full font-semibold">
                        <Download className="me-2 h-4 w-4" />
                        {storeLabel}
                      </Button>
                    )}
                  </Link>
                </m.div>
              );
            })}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">{t_ui.join}</p>
        </m.div>
      </div>
    </section>
  );
}
