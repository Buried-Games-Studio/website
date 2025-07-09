
"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getGameData } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Puzzle,
  Users,
  Bolt,
  ShieldCheck,
  Bot,
  Trophy,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Link from "next/link";

const iconMap: { [key: string]: LucideIcon } = {
  Puzzle,
  Users,
  Bolt,
  ShieldCheck,
  Bot,
  Trophy,
  Smartphone,
};


export default function GameDetailPage({ params }: { params: { slug: string } }) {
    const { language } = useLanguage();
    const game = getGameData(params.slug);

    if (!game) {
        notFound();
    }
    
    const t_ui = {
        en: {
            about: "About the Game",
            features: "Key Features",
            gallery: "Gallery",
            whereToBuy: "Where to Buy",
        },
        ar: {
            about: "عن اللعبة",
            features: "الميزات الرئيسية",
            gallery: "معرض الصور",
            whereToBuy: "أماكن الشراء",
        }
    }[language];

    return (
    <ParallaxProvider>
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white overflow-hidden p-4">
            <Parallax speed={-40} className="absolute inset-0 z-0">
                <Image 
                    src={game.heroImage} 
                    alt={`${game.title} Hero Background`} 
                    fill 
                    className="object-cover"
                    data-ai-hint={game.heroImageHint}
                    priority
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </Parallax>
            <div className="relative z-10">
                <h1 className="text-5xl tracking-wider sm:text-6xl md:text-7xl font-headline !leading-tight text-transparent bg-clip-text bg-gradient-to-t from-accent to-white">
                    {game.title}
                </h1>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="container">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight text-center mb-8">{t_ui.about}</h2>
                <div className="prose dark:prose-invert max-w-none mx-auto text-lg text-muted-foreground">
                    <p>{game.longDescription[language]}</p>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-card">
            <div className="container">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight text-center mb-12">{t_ui.features}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {game.features.map((feature, index) => {
                        const Icon = iconMap[feature.icon];
                        return (
                             <div key={index} className="flex items-start gap-4">
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-accent flex-shrink-0 mt-1">
                                    {Icon && <Icon className="w-8 h-8 text-accent"/>}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{feature.title[language]}</h3>
                                    <p className="text-muted-foreground mt-1">{feature.description[language]}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="container">
             <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight text-center mb-12">{t_ui.gallery}</h2>
             <div className="max-w-4xl mx-auto">
                <Carousel className="w-full">
                    <CarouselContent>
                        {game.gallery.map((img, index) => (
                        <CarouselItem key={index}>
                            <Card className="overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="aspect-video relative">
                                        <Image src={img.url} alt={`Gallery image ${index + 1}`} fill className="object-cover" data-ai-hint={img.hint} />
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
             </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="bg-card">
            <div className="container text-center">
                 <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight mb-8">{t_ui.whereToBuy}</h2>
                 <div className="flex justify-center items-center gap-4 flex-wrap">
                    {game.storeLinks.map((link, index) => (
                        <Button asChild size="lg" key={index}>
                            <Link href={link.url} target="_blank" rel="noopener noreferrer">{link.label[language]}</Link>
                        </Button>
                    ))}
                 </div>
            </div>
        </section>

      </main>
    </ParallaxProvider>
    )
}
