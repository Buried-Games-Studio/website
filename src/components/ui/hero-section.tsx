"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "./animated-background";
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import logoImage from '@/components/images/buriedgames_logo.png';

export const HeroSection = () => {
    const { language } = useLanguage();
    const t = getTranslation(language);

    const t_ui = {
        en: {
            headline: "Crafting Worlds,",
            subheadline: "One Game at a Time",
            description: "We are an indie game studio dedicated to creating immersive experiences that transport players to new realities. Born in the Arab world, playing globally.",
            cta_games: "Explore Games",
            cta_contact: "Contact Us",
        },
        ar: {
            headline: "نصنع العوالم،",
            subheadline: "لعبة تلو الأخرى",
            description: "نحن استوديو ألعاب مستقل مكرس لإنشاء تجارب غامرة تنقل اللاعبين إلى واقع جديد. ولدنا في العالم العربي، ونلعب عالمياً.",
            cta_games: "استكشف الألعاب",
            cta_contact: "تواصل معنا",
        }
    }[language];

    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-20">
            <AnimatedBackground />

            {/* Radial Gradient Overlay for "Bloody" Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

            <div className="container relative z-10 flex flex-col items-center text-center space-y-8">

                {/* Logo & Name - Restored as requested */}
                <div className="flex flex-col items-center animate-fade-in-up">
                    <div className="relative w-40 h-40 md:w-56 md:h-56 mb-6 group">
                        <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-glow" />
                        <Image
                            src={logoImage}
                            alt="Buried Games Studio Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                            priority
                        />
                    </div>
                    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white uppercase drop-shadow-lg">
                        Buried Games <span className="text-primary text-glow">Studio</span>
                    </h1>
                </div>

                {/* Glitch Text Effect Wrapper */}
                <div className="relative max-w-4xl">
                    <h2 className="font-headline text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 opacity-90">
                        {t_ui.headline} <br className="hidden md:block" />
                        <span className="text-primary/80">{t_ui.subheadline}</span>
                    </h2>
                </div>

                <p className="max-w-[42rem] text-lg text-muted-foreground sm:text-xl leading-relaxed">
                    {t_ui.description}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                    <Button asChild size="lg" className="h-14 px-10 text-lg rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_40px_rgba(var(--primary),0.6)] uppercase tracking-widest font-bold">
                        <Link href="/#games">
                            {t_ui.cta_games}
                            {language === 'ar' ? <ArrowRight className="mr-2 h-5 w-5 rotate-180" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-none border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white hover:text-white transition-all uppercase tracking-widest font-bold">
                        <Link href="/contact-us">
                            {t_ui.cta_contact}
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary/50">
                <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-2" />
                <span className="text-xs uppercase tracking-widest opacity-50">Scroll</span>
            </div>
        </section>
    );
};
