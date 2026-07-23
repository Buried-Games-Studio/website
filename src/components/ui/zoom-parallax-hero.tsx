"use client";
import { useScroll, useTransform, useReducedMotion, m, type MotionValue } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { assets } from "@/lib/assets";
import { useLanguage } from "@/contexts/language-context";
import { localePath } from "@/lib/i18n";
import { useMagnetic } from "@/hooks/use-magnetic";
import { trackHeroCTA } from "@/lib/google-analytics";
import { WhatsAppLink } from "@/components/whatsapp-link";

// Desktop, non-touch, motion-allowed. Drives whether we run scroll-linked
// transforms, ember particles, and entrance animations at all. On mobile and
// under prefers-reduced-motion the hero renders fully static and painted.
function useHeroMotion() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (prefersReduced) return;
    const mql = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setEnabled(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [prefersReduced]);
  return enabled;
}

function HeroEmbers({ enabled }: { enabled: boolean }) {
  const particles = useMemo(() => {
    if (!enabled) return [];
    return Array.from({ length: 12 }, (_, i) => ({
      bottom: `${Math.random() * 20}%`,
      left: `${Math.random() * 100}%`,
      bg: i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "#ff4400" : "#ffaa00",
      yEnd: -200 - Math.random() * 400,
      xEnd: (Math.random() - 0.5) * 100,
      duration: 5 + Math.random() * 6,
      delay: Math.random() * 8,
    }));
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 z-[11] pointer-events-none">
      {particles.map((p, i) => (
        <m.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ bottom: p.bottom, left: p.left, background: p.bg }}
          animate={{ opacity: [0, 0.5, 0], y: [0, p.yEnd], x: [0, p.xEnd] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

const MagneticCTA = ({ children, className, href, onClick }: { children: React.ReactNode; className?: string; href: string; onClick?: () => void }) => {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnetic(0.25);
  return (
    <m.div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Button asChild size="lg" className={className}>
        <Link href={href} onClick={onClick}>{children}</Link>
      </Button>
    </m.div>
  );
};

export const ZoomParallaxHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionEnabled = useHeroMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scroll-linked transforms only subscribe on desktop. On mobile the hero is
  // static, so these MotionValues are created but never read into style.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const wrapperStyle = motionEnabled ? { scale, borderRadius } : undefined;
  const bgStyle = motionEnabled ? { y: bgY } : undefined;
  const contentStyle = motionEnabled
    ? ({ opacity, y: yText } as { opacity: MotionValue<number>; y: MotionValue<number> })
    : undefined;

  const { language } = useLanguage();
  const isRTL = language === "ar";

  // Title is split so exactly one phrase carries the accent color — accenting
  // scattered words made the headline read as noise.
  const t_ui = {
    en: {
      eyebrow: "Crafting Worlds, One Game at a Time",
      title_pre: "A game development studio building for",
      title_accent: "Kuwait & the GCC",
      subtitle:
        "Strategy games, multiplayer experiences, and mobile games — for clients and brands across the Gulf, alongside our own original titles.",
      cta_primary: "Start your project",
      cta_secondary: "See our games",
      cta_whatsapp: "WhatsApp",
      cta_whatsapp_aria: "Chat with Buried Games on WhatsApp",
    },
    ar: {
      eyebrow: "نصنع عوالم، لعبة تلو الأخرى",
      title_pre: "استوديو تطوير ألعاب يبني من أجل",
      title_accent: "الكويت والخليج",
      subtitle:
        "ألعاب استراتيجية وتجارب جماعية وألعاب موبايل — للعملاء والعلامات التجارية في الخليج، إلى جانب ألعابنا الأصلية.",
      cta_primary: "ابدأ مشروعك",
      cta_secondary: "شاهد ألعابنا",
      cta_whatsapp: "واتساب",
      cta_whatsapp_aria: "تواصل مع بريد جيمز عبر واتساب",
    },
  }[language];

  const rise = (delay: number) =>
    motionEnabled
      ? {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
        }
      : { initial: false as const, animate: { opacity: 1, y: 0 } };

  return (
    <div ref={containerRef} className="relative w-full min-h-[92vh] md:h-[110vh]">
      <div className="sticky top-0 min-h-[92vh] md:h-screen overflow-hidden bg-background">
        <m.div
          style={wrapperStyle}
          className="relative w-full min-h-[92vh] md:h-full overflow-hidden"
        >
          {/* Background: CSS gradient on mobile (no image cost), dim textured
              image on desktop where it is barely visible at 30% opacity. */}
          <m.div className="absolute inset-0" style={bgStyle}>
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background md:hidden" />
            <Image
              src={assets.heroCollage}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              quality={40}
              className="hidden md:block object-cover opacity-30 scale-110"
              priority
            />
          </m.div>

          <HeroEmbers enabled={motionEnabled} />

          {/* Vignette + bottom fade into the page background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_95%)] z-[12]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-[12]" />

          {/* Content */}
          <m.div
            style={contentStyle}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-5"
          >
            <m.div className="relative w-20 h-20 md:w-24 md:h-24 mb-8" {...rise(0)}>
              <div className="absolute inset-0 bg-primary/25 blur-2xl rounded-full" />
              <Image
                src={assets.logo}
                alt="Buried Games Studio Logo"
                fill
                sizes="(max-width: 768px) 80px, 96px"
                className="object-contain"
                priority
              />
            </m.div>

            {/* Eyebrow — single quiet line, body face, red tick */}
            <m.p
              className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-6"
              {...rise(0.05)}
            >
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {t_ui.eyebrow}
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
            </m.p>

            {/* Headline — LCP element, painted on first frame on mobile */}
            <m.h1
              className="font-headline font-bold text-balance text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground max-w-4xl mb-6"
              {...rise(0.1)}
            >
              {t_ui.title_pre}{" "}
              <span className="text-primary">{t_ui.title_accent}</span>
            </m.h1>

            <m.p
              className="max-w-xl mx-auto text-base md:text-lg text-foreground/65 leading-relaxed mb-10"
              {...rise(0.18)}
            >
              {t_ui.subtitle}
            </m.p>

            {/* CTA hierarchy: one primary, one ghost, WhatsApp as a quiet
                third with the real glyph — never a green-painted button. */}
            <m.div className="flex flex-wrap items-center justify-center gap-3 md:gap-4" {...rise(0.26)}>
              <MagneticCTA
                href={localePath(language, "/contact-us")}
                onClick={() => trackHeroCTA("start_project")}
                className="h-12 md:h-13 px-8 text-sm md:text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-[0_8px_30px_-10px_hsl(var(--primary)/0.7)] transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  {t_ui.cta_primary}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                </span>
              </MagneticCTA>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 md:h-13 px-8 text-sm md:text-base rounded-full border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/40 font-semibold transition-all duration-300"
              >
                <Link
                  href={`${localePath(language, "/")}#games`}
                  onClick={() => trackHeroCTA("see_our_work")}
                >
                  {t_ui.cta_secondary}
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 md:h-13 px-6 text-sm md:text-base rounded-full border-foreground/20 bg-transparent text-foreground/80 hover:bg-foreground/5 hover:border-foreground/40 font-medium transition-all duration-300"
              >
                <WhatsAppLink location="hero" aria-label={t_ui.cta_whatsapp_aria}>
                  <span className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
                    {t_ui.cta_whatsapp}
                  </span>
                </WhatsAppLink>
              </Button>
            </m.div>
          </m.div>

          {/* Scroll Indicator (desktop / motion-allowed only) */}
          {motionEnabled && (
            <m.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <m.div
                className="w-px h-10 bg-gradient-to-b from-primary/60 to-transparent"
                animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <m.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <ArrowDown className="h-4 w-4 text-primary/40" />
              </m.div>
            </m.div>
          )}
        </m.div>
      </div>
    </div>
  );
};
