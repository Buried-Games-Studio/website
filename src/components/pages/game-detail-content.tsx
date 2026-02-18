"use client";

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
  Play,
  ArrowRight,
  Download,
  Monitor,
  Globe
} from "lucide-react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Link from "next/link";
import UnityImage from '@/components/images/UnityImage.png';
import UnrealEngineImage from '@/components/images/UnrealEngineImage.png';
import NextjsImage from '@/assets/images/nextjs.png';
import PowerOfBombsImage from '@/components/images/powerofbombsIconTransparent.png';
import Koutq8Image from '@/components/images/Koutq8Logo.png';
import NabshImage from '@/assets/images/nabsh_logo.png';
import POPBackgroundImage from '@/components/images/POPBackground.jpg';
import POPOverviewImage from '@/components/images/POPOverview.jpg';
import downloadAppStoreImage from '@/components/images/downloadAppStoreImage.png';
import KoutQ8Image_1 from '@/components/images/KoutQ8Image_1.png';
import KoutQ8Image_2 from '@/components/images/KoutQ8Image_2.png';
import KoutQ8Image_3 from '@/components/images/KoutQ8Image_3.png';
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const ParticlesBackground = dynamic(() => import("@/components/particles-background").then(mod => mod.ParticlesBackground), { ssr: false });


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
    'Next.js': NextjsImage,
};

const gameLogoMap: { [key: string]: StaticImageData | undefined } = {
    'power-of-bombs': PowerOfBombsImage,
    'koutq8': Koutq8Image,
    'nabsh': NabshImage,
};

const heroImageMap: { [key: string]: StaticImageData } = {
    'POPBackground.jpg': POPBackgroundImage,
};

const galleryImageMap: { [key: string]: StaticImageData } = {
    'nabsh_logo.png': NabshImage,
    'POPOverview.jpg': POPOverviewImage,
    'KoutQ8Image_1.png': KoutQ8Image_1,
    'KoutQ8Image_2.png': KoutQ8Image_2,
    'KoutQ8Image_3.png': KoutQ8Image_3,
};

const storeImageMap: { [key: string]: StaticImageData } = {
    'downloadAppStoreImage.png': downloadAppStoreImage,
};

// --- Components ---

const StatBadge = ({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string | React.ReactNode }) => (
    <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background/40 border border-white/10 backdrop-blur-md">
        <div className="p-2 rounded-full bg-accent/10 text-accent">
            <Icon className="w-5 h-5" />
        </div>
        <div className="flex flex-col leading-none">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">{label}</span>
            <span className="text-sm font-bold text-white">{value}</span>
        </div>
    </div>
);

export function GameDetailContent({ slug }: { slug: string }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { language } = useLanguage();
    const game = getGameData(slug);

    if (!game) {
        return null;
    }

    const gameLogo = gameLogoMap[game.id] ?? (game.logoUrl ? game.logoUrl : undefined);
    const heroSrc = heroImageMap[game.heroImage] || game.heroImage;
    const heroIsStatic = typeof heroSrc !== 'string';
    const isYoutubeVideo = game.heroVideo && (game.heroVideo.includes('youtube.com') || game.heroVideo.includes('youtu.be'));

    const t_ui = {
        en: {
            about: "Mission Briefing",
            features: "Intel & Features",
            gallery: "Visual Database",
            whereToBuy: "Acquire Game",
            whereToPlay: "Deploy Now",
            underDev: "In Development",
            released: "Live Ops",
            engine: "Engine",
            platform: "Platform",
        },
        ar: {
            about: "مهمة اللعبة",
            features: "المميزات والبيانات",
            gallery: "قاعدة البيانات المرئية",
            whereToBuy: "شراء اللعبة",
            whereToPlay: "ابدأ اللعب",
            underDev: "قيد التطوير",
            released: "متاح الآن",
            engine: "المحرك",
            platform: "المنصة",
        }
    }[language];

    const HeroMedia = () => {
        if (!isClient) {
            return (
                 <Image
                    src={heroSrc}
                    alt={`${game.title} Hero Background`}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-80"
                    priority
                    placeholder={heroIsStatic ? "blur" : "empty"}
                />
            )
        }

        if (isYoutubeVideo) {
             return (
                <div className="absolute inset-0 z-0 w-full h-full player-wrapper pointer-events-none scale-125">
                    <ReactPlayer
                        url={game.heroVideo}
                        className="react-player"
                        playing
                        loop
                        muted
                        width="100%"
                        height="100%"
                        playsinline
                        config={{ youtube: { playerVars: { showinfo: 0, controls: 0, disablekb: 1 } } }}
                    />
                </div>
             )
        }

        if (game.heroVideo) {
            return (
                <div className="absolute inset-0 overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 z-0 w-full h-full object-cover opacity-80"
                    >
                        <source src={game.heroVideo} type="video/mp4" />
                    </video>
                </div>
            )
        }

        return (
             <Image
                src={heroSrc}
                alt={`${game.title} Hero Background`}
                fill
                className="object-cover opacity-80"
                priority
                placeholder={heroIsStatic ? "blur" : "empty"}
            />
        )
    }

    return (
    <ParallaxProvider>
      <main className="min-h-screen bg-background overflow-x-hidden">

        {/* --- Cinematic Hero Section --- */}
        <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">

            {/* Background Media Layer */}
            <div className="absolute inset-0 z-0">
                <HeroMedia />
                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black z-10" />
            </div>

            {/* Content Layer */}
            <div className="relative z-20 container h-full flex flex-col justify-center items-center text-center pt-20">

                <div className="animate-fade-up [animation-delay:200ms] opacity-0 fill-mode-forwards">
                    {gameLogo && (
                        <Image
                            src={gameLogo}
                            alt={`${game.title} Logo`}
                            width={300}
                            height={300}
                            className="object-contain h-32 md:h-48 w-auto drop-shadow-[0_0_25px_rgba(var(--accent),0.6)] mb-8"
                        />
                    )}
                </div>

                <h1 className="text-6xl md:text-8xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-wide animate-fade-up [animation-delay:400ms] opacity-0 fill-mode-forwards">
                    {game.title}
                </h1>

                {/* HUD Stats Bar */}
                <div className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-up [animation-delay:600ms] opacity-0 fill-mode-forwards">
                     <StatBadge
                        icon={game.status === 'development' ? Construction : Globe}
                        label={t_ui.about} // Using as Status Label
                        value={game.status === 'development' ? t_ui.underDev : t_ui.released}
                     />
                     {game.engine && (
                        <StatBadge
                            icon={Bolt}
                            label={t_ui.engine}
                            value={game.engine}
                        />
                     )}
                     <StatBadge
                        icon={Monitor}
                        label={t_ui.platform}
                        value={game.slug === 'koutq8' ? 'Mobile / Web' : 'Web / PC'}
                     />
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                    <ArrowRight className="h-6 w-6 rotate-90" />
                </div>
            </div>
        </section>

        {/* --- Mission Briefing (About) --- */}
        <section className="relative py-24 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
               <ParticlesBackground />
            </div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Text Content */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-bold tracking-wider uppercase">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            {t_ui.about}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-headline font-bold text-white leading-tight">
                           {language === 'en' ? 'Overview' : 'نظرة عامة'}
                        </h2>
                        <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                            <p className="leading-relaxed">{game.longDescription[language]}</p>
                        </div>

                        {/* Stats Grid (If Nabsh) */}
                        {game.slug === 'nabsh' && game.stats && (
                             <div className="grid grid-cols-3 gap-4 mt-8">
                                {game.stats.map((stat, index) => (
                                    <div key={index} className="bg-card/30 border border-white/10 p-4 rounded-xl text-center backdrop-blur-sm">
                                        <div className="text-3xl font-bold text-accent">{stat.value}</div>
                                        <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{stat.label[language]}</div>
                                    </div>
                                ))}
                             </div>
                        )}
                    </div>

                    {/* Right: Visual Element */}
                    <div className="lg:col-span-5 relative">
                         <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-card/5 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                            {/* Using the first gallery image or hero as the side visual */}
                            <Image
                                src={game.gallery && game.gallery[0] ? (galleryImageMap[game.gallery[0].url] || game.gallery[0].url) : heroSrc}
                                alt="Game Visual"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                         </div>
                    </div>

                </div>
            </div>
        </section>

        {/* --- Features Grid (Intel) --- */}
        <section className="py-24 bg-secondary/10 border-y border-white/5">
            <div className="container">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">{t_ui.features}</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {language === 'en' ? 'Key operational capabilities and game mechanics.' : 'القدرات التشغيلية الرئيسية وآليات اللعبة.'}
                    </p>
                 </div>

                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {game.features.map((feature, index) => {
                        const Icon = iconMap[feature.icon];
                        return (
                            <div key={index} className="group bg-card/40 border border-white/5 hover:border-accent/50 p-8 rounded-2xl transition-all duration-300 hover:bg-card/60 hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {Icon && <Icon className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{feature.title[language]}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description[language]}</p>
                            </div>
                        )
                    })}
                 </div>
            </div>
        </section>

        {/* --- Visual Database (Gallery) --- */}
        {game.gallery && game.gallery.length > 0 && (
            <section className="py-32 overflow-hidden">
                 <div className="container mb-12 flex items-end justify-between">
                     <div>
                        <h2 className="text-4xl md:text-5xl font-headline font-bold">{t_ui.gallery}</h2>
                     </div>
                     <div className="hidden md:block w-1/3 h-px bg-white/10 mb-4" />
                 </div>

                 <div className="container">
                    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                        <CarouselContent className="-ml-4">
                            {game.gallery.map((img, index) => {
                               const gallerySrc = galleryImageMap[img.url] || img.url;
                               return (
                                 <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-2/3">
                                     <div className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-card">
                                         <Image
                                            src={gallerySrc}
                                            alt={`Gallery image ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            data-ai-hint={img.hint}
                                         />
                                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                     </div>
                                 </CarouselItem>
                               )
                            })}
                        </CarouselContent>
                        <div className="flex justify-end gap-2 mt-6">
                            <CarouselPrevious className="static translate-y-0" />
                            <CarouselNext className="static translate-y-0" />
                        </div>
                    </Carousel>
                 </div>
            </section>
        )}

        {/* --- Deployment (CTA) --- */}
        {game.storeLinks && game.storeLinks.length > 0 && (
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-accent/5 -z-10" />
                <div className="container">
                    <div className="max-w-4xl mx-auto bg-card border border-white/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">

                        {/* Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-accent shadow-[0_0_100px_rgba(var(--accent),0.5)]" />

                        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8">
                            {game.storeLinks.some(link => link.store === 'web') ? t_ui.whereToPlay : t_ui.whereToBuy}
                        </h2>

                        <div className="flex flex-wrap justify-center gap-6">
                            {game.storeLinks.map((link, index) => {
                                const StoreImage = link.store ? storeImageMap[link.store] : null;
                                const storeLabel = link.label ? link.label[language] : `Download on ${link.store}`;

                                if (game.slug === 'nabsh' && gameLogo) {
                                     return (
                                        <Button asChild size="lg" key={index} className="h-16 px-8 text-lg bg-accent hover:bg-accent/90 text-white shadow-[0_0_30px_rgba(var(--accent),0.4)] hover:shadow-[0_0_50px_rgba(var(--accent),0.6)] transition-all duration-300">
                                            <Link href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                                                <Play className="fill-current w-6 h-6" />
                                                {storeLabel}
                                            </Link>
                                        </Button>
                                    )
                                }

                                return (
                                    <Link href={link.url} target="_blank" rel="noopener noreferrer" key={index} className="group transition-transform hover:scale-105">
                                        {StoreImage ? (
                                            <div className="relative h-16 w-48 rounded-lg overflow-hidden border border-white/20 group-hover:border-accent transition-colors">
                                                <Image src={StoreImage} alt={`${game.title} on ${link.store}`} fill className="object-contain" />
                                            </div>
                                        ) : (
                                            <Button size="lg" className="h-14 px-8 text-lg font-bold">
                                                <Download className="mr-2 h-5 w-5"/>
                                                {storeLabel}
                                            </Button>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>

                        <p className="mt-8 text-sm text-muted-foreground">
                            {language === 'en' ? 'Join thousands of players online.' : 'انضم إلى آلاف اللاعبين عبر الإنترنت.'}
                        </p>
                    </div>
                </div>
            </section>
        )}

      </main>
    </ParallaxProvider>
    )
}
