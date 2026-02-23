"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import logoImage from '@/components/images/buriedgames_logo.png';
import { useLanguage } from "@/contexts/language-context";

export const ZoomParallaxHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const yText = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const t_ui = {
        en: {
            tagline: "Indie Game Studio",
            title_1: "We Build Games",
            title_2: "Players Remember",
            subtitle: "From concept to launch — strategy games, multiplayer experiences, and interactive entertainment crafted with passion.",
            cta_games: "See Our Work",
            cta_services: "Hire Us",
        },
        ar: {
            tagline: "استوديو ألعاب مستقل",
            title_1: "نصنع ألعاباً",
            title_2: "يتذكرها اللاعبون",
            subtitle: "من الفكرة إلى الإطلاق — ألعاب استراتيجية، تجارب جماعية، وترفيه تفاعلي مصنوع بشغف.",
            cta_games: "شاهد أعمالنا",
            cta_services: "وظّفنا",
        }
    }[language];

    return (
        <div ref={containerRef} className="h-[120vh] relative w-full">
            <div className="sticky top-0 h-screen overflow-hidden bg-black">
                <motion.div
                    style={{ scale, borderRadius }}
                    className="relative w-full h-full overflow-hidden"
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay z-10" />
                    <Image
                        src="/assets/images/hero-collage.jpg"
                        alt="Hero Background"
                        fill
                        sizes="100vw"
                        className="object-cover opacity-30"
                        priority
                    />

                    {/* Vignette + darkening */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10" />
                    <div className="absolute inset-0 bg-black/40 z-10" />

                    {/* Content Overlay */}
                    <motion.div
                        style={{ opacity, y: yText }}
                        className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4"
                    >
                        {/* Logo */}
                        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 group">
                            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-glow" />
                            <Image
                                src={logoImage}
                                alt="Buried Games Studio Logo"
                                fill
                                sizes="(max-width: 768px) 96px, 128px"
                                className="object-contain drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                priority
                            />
                        </div>

                        {/* Tagline badge */}
                        <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.3em] text-accent uppercase backdrop-blur-md mb-6">
                            {t_ui.tagline}
                        </span>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase drop-shadow-lg font-headline mb-8 leading-[1.15]">
                            {t_ui.title_1} <br />
                            <span className="text-primary text-glow">{t_ui.title_2}</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="max-w-lg mx-auto text-base md:text-lg text-white/60 leading-relaxed mb-10">
                            {t_ui.subtitle}
                        </p>

                        {/* Dual CTAs */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Button asChild size="lg" className="h-14 px-10 text-base rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/50 font-bold uppercase tracking-wider">
                                <Link href="/#games" className="flex items-center gap-2">
                                    {t_ui.cta_games}
                                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-10 text-base rounded-full border-white/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 font-bold uppercase tracking-wider">
                                <Link href="/contact-us" className="flex items-center gap-2">
                                    {t_ui.cta_services}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
