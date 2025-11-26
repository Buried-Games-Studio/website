"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import logoImage from '@/components/images/buriedgames_logo.png';
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";

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
    const t_ui = {
        en: {
            description: "We are Buried Games Studio. We unearth immersive worlds and craft unforgettable gaming experiences.",
            cta_games: "Our Games",
        },
        ar: {
            description: "نحن استوديو Buried Games. نكشف عن عوالم غامرة ونصنع تجارب ألعاب لا تُنسى.",
            cta_games: "ألعابنا",
        }
    }[language];

    return (
        <div ref={containerRef} className="h-[120vh] relative w-full">
            <div className="sticky top-0 h-screen overflow-hidden bg-black">
                <motion.div
                    style={{ scale, borderRadius }}
                    className="relative w-full h-full overflow-hidden"
                >
                    {/* Background Image/Video Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay z-10" />
                    <Image
                        src="/assets/images/hero-collage.jpg" // Ensure this exists or use a placeholder
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />

                    {/* Content Overlay */}
                    <motion.div
                        style={{ opacity, y: yText }}
                        className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4"
                    >
                        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8 group">
                            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-glow" />
                            <Image
                                src={logoImage}
                                alt="Buried Games Studio Logo"
                                fill
                                className="object-contain drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                                priority
                            />
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-tighter text-white uppercase drop-shadow-lg font-headline mb-6">
                            Buried Games <br />
                            <span className="text-primary text-glow">Studio</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                            {t_ui.description}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <Button asChild size="lg" className="h-16 px-12 text-xl rounded-none border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_40px_rgba(var(--primary),0.6)] uppercase tracking-widest font-bold">
                                <Link href="/#games">
                                    {t_ui.cta_games}
                                    {language === 'ar' ? <ArrowRight className="mr-2 h-6 w-6 rotate-180" /> : <ArrowRight className="ml-2 h-6 w-6" />}
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
