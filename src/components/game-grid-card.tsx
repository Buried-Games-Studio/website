"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowUpRight, Gamepad2, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  title: string;
//   genre: string;
  description: string;
  slug: string;
  platforms?: string[]; // Array of platforms like ['PC', 'Mobile']
}

interface GameGridCardProps {
  game: Game;
  image: StaticImageData | string;
  viewText: string;
  className?: string;
}

export function GameGridCard({ game, image, viewText, className }: GameGridCardProps) {
  return (
    <Link href={`/games/${game.slug}`} className="block group h-full w-full perspective-1000">
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-card/5 transition-all duration-500 ease-out",
          "group-hover:border-accent/50 group-hover:shadow-[0_0_40px_-10px_rgba(var(--accent),0.3)]",
          "group-hover:scale-[1.02] group-hover:-translate-y-2",
          className
        )}
      >
        {/* --- Image Layer --- */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={game.title}
            fill
            className="object-contain transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Dark Gradient Overlay (Always visible for text readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
          
          {/* Accent Glow on Hover */}
          <div className="absolute inset-0 bg-accent/20 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* --- Content Layer --- */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
          
          {/* Top Badge (Hidden by default, slides down on hover) */}
          <div className="absolute top-6 right-6 translate-y-[-20px] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-lg">
               <span>{viewText}</span>
               <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>

          {/* Game Info */}
          <div className="transform transition-all duration-300 group-hover:translate-y-[-8px]">
            {/* Genre / Platform Tag */}
            <div className="mb-3 flex items-center gap-3 text-xs font-medium text-accent tracking-wider uppercase">
              {/* <span className="bg-accent/10 border border-accent/20 px-2 py-1 rounded-md backdrop-blur-md">
                {game.genre}
              </span> */}
              {/* Example Platform Icons (Logic to show specific icon based on data) */}
              {game.platforms?.includes("Mobile") && <Smartphone className="h-4 w-4 text-muted-foreground" />}
              {(game.platforms?.includes("PC") || game.platforms?.includes("Console")) && <Gamepad2 className="h-4 w-4 text-muted-foreground" />}
            </div>

            <h3 className="mb-2 font-headline text-3xl font-bold text-white leading-none tracking-wide">
              {game.title}
            </h3>
            
            <p className="line-clamp-2 text-sm text-gray-300 md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto">
              {game.description}
            </p>
          </div>

          {/* Bottom Border Accent */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </Link>
  );
}