"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { assets } from "@/lib/assets";
import { useLanguage } from "@/contexts/language-context";
import { useMagnetic } from "@/hooks/use-magnetic";
import { heroTextStagger, clipRevealWord } from "@/lib/motion/variants";

function HeroEmbers() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 25 }, (_, i) => ({
      bottom: `${Math.random() * 20}%`,
      left: `${Math.random() * 100}%`,
      bg: i % 3 === 0 ? "#ff0000" : i % 3 === 1 ? "#ff4400" : "#ffaa00",
      yEnd: -200 - Math.random() * 400,
      xEnd: (Math.random() - 0.5) * 100,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 8,
    }));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-[11] pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ bottom: p.bottom, left: p.left, background: p.bg }}
          animate={{ opacity: [0, 0.7, 0], y: [0, p.yEnd], x: [0, p.xEnd] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

const MagneticCTA = ({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) => {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(0.25);
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Button asChild size="lg" className={className}>
        <Link href={href}>{children}</Link>
      </Button>
    </motion.div>
  );
};

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
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const { language } = useLanguage();
  const isRTL = language === "ar";

  const t_ui = {
    en: {
      tagline: "Indie Game Studio",
      title: "Crafting Worlds, One Game at a Time",
      subtitle:
        "From concept to launch — strategy games, multiplayer experiences, and interactive entertainment crafted with passion.",
      cta_games: "See Our Work",
      cta_services: "Hire Us",
    },
    ar: {
      tagline: "استوديو ألعاب مستقل",
      title: "نصنع عوالم، لعبة تلو الأخرى",
      subtitle:
        "من الفكرة إلى الإطلاق — ألعاب استراتيجية، تجارب جماعية، وترفيه تفاعلي مصنوع بشغف.",
      cta_games: "شاهد أعمالنا",
      cta_services: "وظّفنا",
    },
  }[language];

  const titleWords = t_ui.title.split(" ");

  return (
    <div ref={containerRef} className="h-[120vh] relative w-full">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <motion.div
          style={{ scale, borderRadius }}
          className="relative w-full h-full overflow-hidden"
        >
          {/* Background Image with parallax */}
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay z-10" />
            <Image
              src={assets.heroCollage}
              alt="Hero Background"
              fill
              sizes="100vw"
              className="object-cover opacity-30 scale-110"
              priority
            />
          </motion.div>

          {/* Animated ember particles (deterministic positions to avoid hydration mismatch) */}
          <HeroEmbers />

          {/* Vignette + darkening */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-[12]" />
          <div className="absolute inset-0 bg-black/40 z-[12]" />

          {/* Content Overlay */}
          <motion.div
            style={{ opacity, y: yText }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4"
          >
            {/* Logo with glow */}
            <motion.div
              className="relative w-24 h-24 md:w-32 md:h-32 mb-6 group"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse-glow" />
              <Image
                src={assets.logo}
                alt="Buried Games Studio Logo"
                fill
                sizes="(max-width: 768px) 96px, 128px"
                className="object-contain drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                priority
              />
            </motion.div>

            {/* Tagline badge */}
            <motion.span
              className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.3em] text-accent uppercase backdrop-blur-md mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t_ui.tagline}
            </motion.span>

            {/* Studio Name */}
            <motion.h2
              className="text-2xl md:text-3xl font-headline tracking-[0.15em] text-white/90 uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Buried Games Studio
            </motion.h2>

            {/* Headline with staggered word reveal */}
            <motion.h1
              className="flex flex-wrap justify-center gap-x-3 md:gap-x-5 text-4xl md:text-6xl lg:text-7xl tracking-tight text-white uppercase font-headline mb-8 leading-[1.15] max-w-5xl"
              variants={heroTextStagger}
              initial="hidden"
              animate="visible"
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={clipRevealWord}
                  className="inline-block"
                  style={{
                    color: ["One", "Game", "Time", "لعبة", "الأخرى"].includes(word)
                      ? "hsl(var(--primary))"
                      : "white",
                    textShadow: ["One", "Game", "Time", "لعبة", "الأخرى"].includes(word)
                      ? "0 0 30px hsla(var(--primary), 0.4)"
                      : "none",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="max-w-lg mx-auto text-base md:text-lg text-white/60 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {t_ui.subtitle}
            </motion.p>

            {/* Dual CTAs with magnetic effect */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <MagneticCTA
                href="/#games"
                className="h-14 px-10 text-base rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/50 font-bold uppercase tracking-wider"
              >
                <span className="flex items-center gap-2">
                  {t_ui.cta_games}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                </span>
              </MagneticCTA>
              <MagneticCTA
                href="/contact-us"
                className="h-14 px-10 text-base rounded-full border-white/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 font-bold uppercase tracking-wider bg-transparent border"
              >
                <span className="flex items-center gap-2">{t_ui.cta_services}</span>
              </MagneticCTA>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <ArrowDown className="h-4 w-4 text-primary/40" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
