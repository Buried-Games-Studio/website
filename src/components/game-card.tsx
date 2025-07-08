"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Eye, Youtube } from "lucide-react";
import type { getTranslation } from "@/lib/content";

type Game = ReturnType<typeof getTranslation>['games'][0];

export function GameCard({ game, viewText }: { game: Game, viewText: string }) {
  return (
    <Card id={game.id} className="flex flex-col overflow-hidden h-full scroll-mt-20">
      <CardHeader className="p-0">
        <div className="aspect-video relative">
            <Image 
              src={game.imageUrl} 
              alt={game.title} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint={game.imageHint}
            />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl mb-2">{game.title}</CardTitle>
        <CardDescription>{game.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
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
      </CardFooter>
    </Card>
  );
}
