
"use client";

import { useParams, notFound } from "next/navigation";
import Image, { type StaticImageData } from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getGameData } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Puzzle,
  Users,
  Bolt,
  ShieldCheck,
  Bot,
  Trophy,
  Smartphone,
  Construction,
  type LucideIcon,
} from "lucide-react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Link from "next/link";
import UnityImage from '@/components/images/UnityImage.png';
import UnrealEngineImage from '@/components/images/UnrealEngineImage.png';
import PowerOfBombsImage from '@/components/images/powerofbombsIconTransparent.png';
import Koutq8Image from '@/components/images/Koutq8Logo.png';
import POPBackgroundImage from '@/components/images/POPBackground.jpg';
import POPOverviewImage from '@/components/images/POPOverview.jpg';
import downloadAppStoreImage from '@/components/images/downloadAppStoreImage.png';
import KoutQ8Image_1 from '@/components/images/KoutQ8Image_1.png';
import KoutQ8Image_2 from '@/components/images/KoutQ8Image_2.png';
import KoutQ8Image_3 from '@/components/images/KoutQ8Image_3.png';
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";


const iconMap: { [key: string]: LucideIcon } = {
  Puzzle,
  Users,
  Bolt,
  ShieldCheck,
  Bot,
  Trophy,
  Smartphone,
};

const engineImageMap: { [key: string]: StaticImageData | undefined } = {
    'Unity': UnityImage,
    'Unreal Engine': UnrealEngineImage,
    'Next.js': undefined,
};

const gameLogoMap: { [key: string]: StaticImageData | undefined } = {
    'power-of-bombs': PowerOfBombsImage,
    'koutq8': Koutq8Image,
    'nabsh': undefined,
};

const heroImageMap: { [key: string]: StaticImageData } = {
    'POPBackground.jpg': POPBackgroundImage,
};

const galleryImageMap: { [key: string]: StaticImageData } = {
    'POPOverview.jpg': POPOverviewImage,
    'KoutQ8Image_1.png': KoutQ8Image_1,
    'KoutQ8Image_2.png': KoutQ8Image_2,
    'KoutQ8Image_3.png': KoutQ8Image_3,
};

const storeImageMap: { [key: string]: StaticImageData } = {
    'downloadAppStoreImage.png': downloadAppStoreImage,
};

export default function GameDetailPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const params = useParams();
    const { language } = useLanguage();
    const game = getGameData(params.slug as string);

    if (!game) {
        notFound();
    }
    
    const gameLogo = gameLogoMap[game.id] ?? (game.logoUrl ? game.logoUrl : undefined);
    const heroSrc = heroImageMap[game.heroImage] || game.heroImage;
    const heroIsStatic = typeof heroSrc !== 'string';
    const isYoutubeVideo = game.heroVideo && (game.heroVideo.includes('youtube.com') || game.heroVideo.includes('youtu.be'));

    const t_ui = {
        en: {
            about: "About the Game",
            features: "Key Features",
            gallery: "Gallery",
            whereToBuy: "Where to Buy",
            whereToPlay: "Where to Play",
            underDev: "Under Development"
        },
        ar: {
            about: "عن اللعبة",
            features: "الميزات الرئيسية",
            gallery: "معرض الصور",
            whereToBuy: "أماكن الشراء",
            whereToPlay: "أين تلعب",
            underDev: "تحت التطوير"
        }
    }[language];

    const HeroMedia = () => {
        if (!isClient) {
            return (
                 <Image 
                    src={heroSrc} 
                    alt={`${game.title} Hero Background`} 
                    fill 
                    className="object-contain"
                    data-ai-hint={game.heroImageHint}
                    priority
                    placeholder={heroIsStatic ? "blur" : "empty"}
                />
            )
        }
        
        if (isYoutubeVideo) {
             return (
                <div className="absolute inset-0 z-0 w-full h-full player-wrapper">
                    <ReactPlayer
                        url={game.heroVideo}
                        className="react-player"
                        playing
                        loop
                        muted
                        width="100%"
                        height="100%"
                        playsinline
                    />
                </div>
             )
        }

        if (game.heroVideo) {
            return (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 z-0 w-full h-full object-contain"
                    key={game.heroVideo}
                >
                    <source src={game.heroVideo} type="video/mp4" />
                </video>
            )
        }

        return (
             <Image 
                src={heroSrc} 
                alt={`${game.title} Hero Background`} 
                fill 
                className="object-contain"
                data-ai-hint={game.heroImageHint}
                priority
                placeholder={heroIsStatic ? "blur" : "empty"}
            />
        )
    }

    return (
    <ParallaxProvider>
      <main>
        {/* Hero Section */}
        <section className="relative w-full aspect-video flex items-center justify-center text-center text-white overflow-hidden">
            <Parallax speed={-20} className="absolute inset-0 z-0">
                <HeroMedia />
                <div className="absolute inset-0 bg-black/60"></div>
            </Parallax>
            <div className="relative z-10 p-4">
                <h1 className="text-5xl tracking-wider sm:text-6xl md:text-7xl font-headline !leading-tight text-transparent bg-clip-text bg-gradient-to-t from-accent to-white">
                    {game.title}
                </h1>
                <div className="mt-4 flex items-center justify-center gap-4">
                    {game.status === 'development' && (
                        <Badge className="border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-base flex items-center gap-2">
                           <Construction className="w-4 h-4" />
                           {t_ui.underDev}
                        </Badge>
                    )}
                    {game.engine && (
                         <Badge variant="outline" className="text-base flex items-center gap-2 bg-background/20 backdrop-blur-sm h-10">
                            Made with 
                            {engineImageMap[game.engine] ? (
                                <Image src={engineImageMap[game.engine]!} alt={game.engine} height={32} width={32} className="h-8 w-auto" />
                            ) : (
                                game.engine
                            )}
                        </Badge>
                    )}
                </div>
            </div>
        </section>

        {/* About Section */}
        <section id="about" className="container">
            <div className="max-w-3xl mx-auto text-center">
                 {gameLogo && (
                    <Image
                        src={gameLogo}
                        alt={`${game.title} Logo`}
                        width={250}
                        height={250}
                        className="object-contain mx-auto mb-8"
                        placeholder={typeof gameLogo === 'string' ? 'empty' : 'blur'}
                    />
                )}
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight text-center mb-8">{t_ui.about}</h2>
                <div className="prose dark:prose-invert max-w-none mx-auto text-lg text-muted-foreground text-left">
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
                        {game.gallery.map((img, index) => {
                           const gallerySrc = galleryImageMap[img.url] || img.url;
                           const galleryIsStatic = typeof gallerySrc !== 'string';
                           return (
                             <CarouselItem key={index}>
                                 <Card className="overflow-hidden">
                                     <CardContent className="p-0">
                                         <div className="aspect-video relative">
                                             <Image src={gallerySrc} alt={`Gallery image ${index + 1}`} fill className="object-cover" data-ai-hint={img.hint} placeholder={galleryIsStatic ? "blur" : "empty"} />
                                         </div>
                                     </CardContent>
                                 </Card>
                             </CarouselItem>
                           )
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
             </div>
        </section>

        {/* CTA Section */}
        {game.storeLinks && game.storeLinks.length > 0 && (
            <section id="cta" className="bg-card">
                <div className="container text-center">
                    <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight mb-8">
                      {game.storeLinks.some(link => link.store === 'web') ? t_ui.whereToPlay : t_ui.whereToBuy}
                    </h2>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        {game.storeLinks.map((link, index) => {
                             const StoreImage = link.imageUrl ? storeImageMap[link.imageUrl] : null;
                             const storeLabel = link.label ? link.label[language] : `Download on ${link.store}`;
                             return (
                                <Link href={link.url} target="_blank" rel="noopener noreferrer" key={index} className="inline-block transition-transform hover:scale-105">
                                    {StoreImage ? (
                                        <Image src={StoreImage} alt={`${game.title} on ${link.store}`} width={200} height={60} placeholder="blur" />
                                    ) : (
                                        <Button size="lg">{storeLabel}</Button>
                                    )}
                                </Link>
                             )
                        })}
                    </div>
                </div>
            </section>
        )}

      </main>
    </ParallaxProvider>
    )
}
