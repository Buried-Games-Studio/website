
"use client";

import Image, { type StaticImageData } from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Eye className="mr-2 h-4 w-4" /> {viewText}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl">{game.title}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-8 py-4">
              <div>
                <p className="text-muted-foreground mb-4">{game.description}</p>
                <h3 className="font-semibold text-lg mb-2">Gameplay</h3>
                 <div className="aspect-video rounded-lg overflow-hidden border">
                   <iframe
                     width="100%"
                     height="100%"
                     src={game.videoUrl}
                     title="YouTube video player"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                   ></iframe>
                 </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Gallery</h3>
                <Carousel className="w-full">
                  <CarouselContent>
                    {game.gallery.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                            <div className="aspect-video relative overflow-hidden rounded-lg border">
                                <Image src={img.url} alt={`Gallery image ${index + 1}`} fill className="object-cover" data-ai-hint={img.hint} />
                            </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
