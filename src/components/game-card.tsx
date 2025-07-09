
"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { getTranslation } from "@/lib/content";
import { cn } from "@/lib/utils";

type Game = ReturnType<typeof getTranslation>['games'][0];

export function GameCard({ game, viewText, image, reverse = false }: { game: Game, viewText: string, image?: StaticImageData, reverse?: boolean }) {
  return (
    <div id={game.id} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center scroll-mt-20">
      <div className={cn("relative aspect-video rounded-lg shadow-2xl group", reverse && "md:order-last")}>
        <Image 
          src={image || game.imageUrl} 
          alt={game.title} 
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          data-ai-hint={game.imageHint}
          placeholder={image ? "blur" : "empty"}
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-4xl">{game.title}</h3>
        <p className="text-muted-foreground">{game.description}</p>
        
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={`/games/${game.slug}`}>
            <Eye className="mr-2 h-4 w-4" /> {viewText}
          </Link>
        </Button>
      </div>
    </div>
  );
}
