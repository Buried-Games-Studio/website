
"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import type { getTranslation } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";

type Game = ReturnType<typeof getTranslation>['games'][0];

export function GameGridCard({ game, viewText, image }: { game: Game, viewText: string, image?: StaticImageData }) {
  return (
    <Card className="overflow-hidden group relative">
        <Link href={`/games/${game.slug}`} className="block">
            <CardContent className="p-0">
                <div className="aspect-square relative">
                    <Image 
                        src={image || game.imageUrl} 
                        alt={game.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={game.imageHint}
                        placeholder={image ? "blur" : "empty"}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
            </CardContent>
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
            <h3 className="font-headline text-2xl text-white drop-shadow-md">{game.title}</h3>
            <Button asChild variant="secondary" size="sm">
                <Link href={`/games/${game.slug}`}>
                    <Eye className="me-2 h-4 w-4" /> {viewText}
                </Link>
            </Button>
        </div>
    </Card>
  );
}
