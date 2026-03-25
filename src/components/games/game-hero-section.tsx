"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Construction, Globe, Bolt, Monitor, ArrowDown } from "lucide-react";
import { type GameTheme } from "@/lib/themes/game-themes";
import { heroTextStagger, clipRevealWord } from "@/lib/motion/variants";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import ReactPlayer from "react-player";

function ClientParticles({ count, type }: { count: number; type: "sparkle" | "ember" }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: count }, (_, i) => ({
      top: type === "sparkle" ? `${Math.random() * 100}%` : undefined,
      bottom: type === "ember" ? `${Math.random() * 30}%` : undefined,
      left: `${Math.random() * 100}%`,
      color: type === "ember" ? (i % 2 === 0 ? "#f97316" : "#ef4444") : undefined,
      yEnd: type === "sparkle" ? -60 : -150 - Math.random() * 200,
      xEnd: type === "ember" ? (Math.random() - 0.5) * 80 : 0,
      duration: type === "sparkle" ? 3 + Math.random() * 4 : 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, [mounted, count, type]);
  if (!mounted) return null;
  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={cn("absolute z-10", type === "sparkle" ? "w-1 h-1 rounded-full bg-yellow-400/60" : "w-1.5 h-1.5 rounded-full")}
          style={{
            top: p.top, bottom: p.bottom, left: p.left,
            ...(type === "ember" ? { background: `radial-gradient(circle, ${p.color}, transparent)` } : {}),
          }}
          animate={
            type === "sparkle"
              ? { opacity: [0, 0.8, 0], y: [0, -30, p.yEnd], scale: [0, 1, 0] }
              : { opacity: [0, 1, 0], y: [0, p.yEnd], x: [0, p.xEnd] }
          }
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </>
  );
}

interface GameHeroSectionProps {
  game: any;
  theme: GameTheme;
  language: string;
  gameLogo: string | undefined;
  heroSrc: string;
}

const StatBadge = ({ icon: Icon, label, value, layout }: { icon: any; label: string; value: string | React.ReactNode; layout: string }) => {
  const baseClasses = "flex items-center gap-3 px-4 py-2.5 rounded-xl backdrop-blur-md border transition-all duration-300 hover:scale-105";

  const layoutClasses = {
    "magical-rpg": "bg-purple-950/50 border-purple-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]",
    "explosive-arcade": "bg-orange-950/50 border-orange-500/20 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] skew-x-[-2deg]",
    "sleek-competitive": "bg-background/40 border-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_hsla(var(--primary),0.3)]",
    "noir-mafia": "bg-red-950/40 border-red-900/30 hover:border-[#d4a853]/40 hover:shadow-[0_0_20px_rgba(212,168,83,0.2)]",
  }[layout] || "";

  return (
    <div className={cn(baseClasses, layoutClasses)}>
      <div className="p-2 rounded-full bg-primary/10 text-primary">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">{label}</span>
        <span className="text-sm font-bold text-white">{value}</span>
      </div>
    </div>
  );
};

export function GameHeroSection({ game, theme, language, gameLogo, heroSrc }: GameHeroSectionProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  const isYoutubeVideo = game.heroVideo && (game.heroVideo.includes("youtube.com") || game.heroVideo.includes("youtu.be"));

  const t_ui = {
    en: { status: "Status", underDev: "In Development", released: "Live Ops", completed: "Completed", engine: "Engine", platform: "Platform" },
    ar: { status: "الحالة", underDev: "قيد التطوير", released: "متاح الآن", completed: "مكتمل", engine: "المحرك", platform: "المنصة" },
  }[language]!;

  const titleWords = game.title.split(" ");

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Media Layer */}
      <div className="absolute inset-0 z-0">
        {isClient && isYoutubeVideo ? (
          <div className="absolute inset-0 z-0 w-full h-full player-wrapper pointer-events-none scale-125">
            <ReactPlayer url={game.heroVideo} className="react-player" playing loop muted width="100%" height="100%" playsinline config={{ youtube: { playerVars: { showinfo: 0, controls: 0, disablekb: 1 } } }} />
          </div>
        ) : isClient && game.heroVideo ? (
          <div className="absolute inset-0 overflow-hidden">
            <video autoPlay loop muted playsInline className="absolute inset-0 z-0 w-full h-full object-cover opacity-80">
              <source src={game.heroVideo} type="video/mp4" />
            </video>
          </div>
        ) : heroSrc ? (
          <Image src={heroSrc} alt={`${game.title} Hero`} fill sizes="100vw" className="object-cover opacity-70" priority />
        ) : null}

        {/* Layout-specific overlays */}
        {theme.layout === "magical-rpg" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-purple-950/60 via-transparent to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/70 via-transparent to-purple-950/70 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
            {/* Floating sparkles */}
            <ClientParticles count={20} type="sparkle" />
          </>
        )}

        {theme.layout === "explosive-arcade" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-orange-950/50 via-transparent to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10" />
            {/* Ember particles */}
            <ClientParticles count={15} type="ember" />
          </>
        )}

        {theme.layout === "sleek-competitive" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10" />
            {/* Gradient mesh orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full z-[5] opacity-20"
              style={{ background: `radial-gradient(circle, ${theme.colors.gradientFrom}40, transparent 70%)` }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </>
        )}

        {theme.layout === "noir-mafia" && (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a]/80 via-transparent to-black z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10" />
            {/* Blood-red ambient glow */}
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full z-[5] opacity-15"
              style={{ background: "radial-gradient(ellipse, rgba(194,58,58,0.4), transparent 70%)" }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            {/* Gold dust particles */}
            <ClientParticles count={12} type="sparkle" />
          </>
        )}
      </div>

      {/* Content Layer */}
      <div className="relative z-20 container h-full flex flex-col justify-center items-center text-center pt-20">
        {/* Logo */}
        {gameLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <Image
              src={gameLogo}
              alt={`${game.title} Logo`}
              width={300}
              height={300}
              className={cn(
                "object-contain h-28 md:h-44 w-auto",
                theme.layout === "magical-rpg" && "drop-shadow-[0_0_30px_rgba(212,160,23,0.6)] animate-float",
                theme.layout === "explosive-arcade" && "drop-shadow-[0_0_25px_rgba(249,115,22,0.5)]",
                theme.layout === "sleek-competitive" && "drop-shadow-[0_0_20px_hsla(var(--primary),0.4)]",
                theme.layout === "noir-mafia" && "drop-shadow-[0_0_25px_rgba(212,168,83,0.5)]"
              )}
            />
          </motion.div>
        )}

        {/* Title with staggered word reveal */}
        <motion.h1
          variants={heroTextStagger}
          initial="hidden"
          animate="visible"
          className={cn(
            "flex flex-wrap justify-center gap-x-4 md:gap-x-6 text-5xl md:text-7xl lg:text-8xl font-headline font-bold",
            theme.layout === "explosive-arcade" && "-skew-y-1"
          )}
        >
          {titleWords.map((word: string, i: number) => (
            <motion.span
              key={i}
              variants={clipRevealWord}
              className={cn(
                "inline-block text-transparent bg-clip-text",
                theme.layout === "magical-rpg" && "bg-gradient-to-b from-purple-200 via-white to-yellow-200",
                theme.layout === "explosive-arcade" && "bg-gradient-to-b from-orange-200 via-white to-red-200",
                theme.layout === "sleek-competitive" && "bg-gradient-to-b from-white to-white/50",
                theme.layout === "noir-mafia" && "bg-gradient-to-b from-[#d4a853] via-white to-[#c23a3a]"
              )}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl"
        >
          {game.description[language]}
        </motion.p>

        {/* HUD Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <StatBadge
            icon={game.status === "development" ? Construction : Globe}
            label={t_ui.status}
            value={game.status === "development" ? t_ui.underDev : game.status === "completed" ? t_ui.completed : t_ui.released}
            layout={theme.layout}
          />
          {game.engine && (
            <StatBadge icon={Bolt} label={t_ui.engine} value={game.engine} layout={theme.layout} />
          )}
          <StatBadge
            icon={Monitor}
            label={t_ui.platform}
            value={game.slug === "koutq8" ? "Mobile / Web" : "Web / PC"}
            layout={theme.layout}
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-4 w-4 text-primary/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
