"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGameTheme } from "@/lib/themes/game-themes";

interface GameProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  status: "released" | "development" | "coming_soon" | "completed";
  engine: string;
  tags: string[];
}

interface GamesShowcaseCarouselProps {
  projects: GameProject[];
  language: string;
}

const statusConfig = {
  released: { label: "Released", labelAr: "متاح", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  development: { label: "In Dev", labelAr: "قيد التطوير", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  coming_soon: { label: "Soon", labelAr: "قريبًا", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  completed: { label: "Completed", labelAr: "مكتمل", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
};

function GameCard({ project, isActive, language }: { project: GameProject; isActive: boolean; language: string }) {
  const theme = getGameTheme(project.id);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["8deg", "-8deg"]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-8deg", "8deg"]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isRTL = language === "ar";
  const status = statusConfig[project.status];

  return (
    <Link href={`/games/${project.slug}`}>
      <motion.div
        ref={cardRef}
        className={cn(
          "relative rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer group",
          "h-[420px] md:h-[480px] w-full",
          isActive
            ? "border-primary/30 shadow-[0_0_40px_hsla(var(--primary),0.15)]"
            : "border-white/5 opacity-70 blur-[0.5px]"
        )}
        style={{
          rotateX: isActive ? rotateX : 0,
          rotateY: isActive ? rotateY : 0,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={isActive ? { scale: 1.02 } : {}}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 90vw, 600px"
          />
        </div>

        {/* Gradient overlay using game theme colors */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(180deg, transparent 0%, transparent 30%, ${theme.colors.gradientFrom}90 70%, ${theme.colors.gradientFrom} 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Glow border on active hover */}
        {isActive && (
          <div
            className="absolute inset-0 z-20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: `inset 0 0 30px ${theme.colors.glow}` }}
          />
        )}

        {/* Status badge */}
        <div className="absolute top-4 right-4 z-20">
          <Badge className={cn("text-xs font-bold border backdrop-blur-md", status.color)}>
            {isRTL ? status.labelAr : status.label}
          </Badge>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
          {/* Engine badge */}
          <span className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2 block">
            {project.engine}
          </span>

          <h3 className="text-3xl md:text-4xl font-headline font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-sm text-white/60 line-clamp-2 mb-4 max-w-md">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/5">
                {tag}
              </span>
            ))}
          </div>

          {/* Hover CTA */}
          <motion.div
            className="flex items-center gap-2 text-primary text-sm font-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <span>{isRTL ? "عرض اللعبة" : "View Game"}</span>
            <ArrowRight className={cn("w-4 h-4", isRTL && "rotate-180")} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export function GamesShowcaseCarousel({ projects, language }: GamesShowcaseCarouselProps) {
  const isRTL = language === "ar";
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    direction: isRTL ? "rtl" : "ltr",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-[0_0_85%] md:flex-[0_0_55%] lg:flex-[0_0_45%] min-w-0 transition-all duration-500"
              style={{
                transform: index === selectedIndex ? "scale(1)" : "scale(0.9)",
                opacity: index === selectedIndex ? 1 : 0.6,
                transition: "transform 0.5s ease, opacity 0.5s ease",
              }}
            >
              <GameCard
                project={project}
                isActive={index === selectedIndex}
                language={language}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="w-12 h-12 rounded-full border border-white/10 hover:border-primary/50 bg-card/50 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300 disabled:opacity-30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>

        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="w-12 h-12 rounded-full border border-white/10 hover:border-primary/50 bg-card/50 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300 disabled:opacity-30"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
