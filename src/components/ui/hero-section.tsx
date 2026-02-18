"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const AnimatedBackground = dynamic(() => import("@/components/ui/animated-background").then(mod => mod.AnimatedBackground), { ssr: false });
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import logoImage from '@/components/images/buriedgames_logo.png';
import { ContainerScroll } from "./container-scroll-animation";

export const HeroSection = () => {
    const { language } = useLanguage();
    const t_ui = {
        en: {
            headline: "Forging Legends",
            subheadline: "In The Digital Realm",
            description: "We are Buried Games Studio. We unearth immersive worlds and craft unforgettable gaming experiences.",
            cta_games: "Our Games",
            cta_contact: "Contact Us"
        },
        ar: {
            headline: "نصنع الأساطير",
            subheadline: "في العالم الرقمي",
            description: "نحن استوديو Buried Games. نكشف عن عوالم غامرة ونصنع تجارب ألعاب لا تُنسى.",
            cta_games: "ألعابنا",
            cta_contact: "تواصل معنا"
        }
    }[language];

    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden pt-20 bg-background">
            <AnimatedBackground />

            {/* Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

            <ContainerScroll
                titleComponent={
                    <div className="flex flex-col items-center text-center space-y-4 mb-10">
                        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 group mx-auto">
                            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-glow" />
                            <Image
                                src={logoImage}
                                alt="Buried Games Studio Logo"
                                fill
                                className="object-contain drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                priority
                            />
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white uppercase drop-shadow-lg font-headline">
                            Buried Games <br />
                            <span className="text-primary text-glow">Studio</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {t_ui.description}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                            <Button asChild size="lg" className="h-14 px-10 text-lg rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_40px_rgba(var(--primary),0.6)] uppercase tracking-widest font-bold">
                                <Link href="/#games">
                                    {t_ui.cta_games}
                                    {language === 'ar' ? <ArrowRight className="mr-2 h-5 w-5 rotate-180" /> : <ArrowRight className="ml-2 h-5 w-5" />}
                                </Link>
                            </Button>
                        </div>
                    </div>
                }
            >
                <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden border border-white/10 group">
                    {/* Placeholder for a Hero Video or High-Quality Image Collage */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay z-10" />
                    <Image
                        src="/assets/images/hero-collage.jpg" // You might need to create this or use a placeholder
                        alt="Games Collage"
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                        <h3 className="text-4xl md:text-6xl font-bold text-white/20 uppercase tracking-[1em] animate-pulse">
                            Play Now
                        </h3>
                    </div>
                </div>
            </ContainerScroll>
        </section>
    );
};
