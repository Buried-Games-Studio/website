"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { localePath } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["6deg", "-6deg"]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-6deg", "6deg"]), { stiffness: 300, damping: 30 });

  // Skip the 3D tilt on touch devices to reduce main-thread work (INP).
  const isMobile = useIsMobile();
  const tiltEnabled = isActive && !isMobile;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !tiltEnabled) return;
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
    <Link href={localePath(isRTL ? "ar" : "en", `/games/${project.slug}`)}>
      <m.div
        ref={cardRef}
        className={cn(
          "relative rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer group",
          "h-[480px] md:h-[560px] w-full",
          isActive ? "border-primary/40" : "border-border"
        )}
        style={{
          rotateX: tiltEnabled ? rotateX : 0,
          rotateY: tiltEnabled ? rotateY : 0,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={tiltEnabled ? { scale: 1.02 } : {}}
      >
        {/* Background art */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 90vw, 640px"
          />
        </div>

        {/* Consistent dark scrim — uniform across every card so titles stay legible */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/55 to-transparent" />
        <div className="absolute inset-0 z-10 bg-black/20" />

        {/* Status badge */}
        <div className="absolute top-4 end-4 z-20">
          <Badge className={cn("text-xs font-bold border backdrop-blur-md", status.color)}>
            {isRTL ? status.labelAr : status.label}
          </Badge>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 start-0 end-0 p-6 md:p-8 z-20">
          {/* Engine label */}
          <span className="text-[11px] font-medium text-white/55 uppercase tracking-[0.2em] mb-2 block">
            {project.engine}
          </span>

          <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-sm text-white/65 line-clamp-2 mb-4 max-w-md leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/75 border border-white/10">
                {tag}
              </span>
            ))}
          </div>

          {/* Hover CTA */}
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mt-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <span>{isRTL ? "عرض اللعبة" : "View game"}</span>
            <ArrowRight className={cn("w-4 h-4 transition-transform duration-300 group-hover:translate-x-1", isRTL && "rotate-180 group-hover:-translate-x-1")} />
          </div>
        </div>
      </m.div>
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

  const t_nav = {
    en: {
      prev: "Previous game",
      next: "Next game",
      goTo: (n: number) => `Go to game ${n}`,
    },
    ar: {
      prev: "اللعبة السابقة",
      next: "اللعبة التالية",
      goTo: (n: number) => `الانتقال إلى اللعبة ${n}`,
    },
  }[isRTL ? "ar" : "en"];

  return (
    <div className="relative">
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5 md:gap-6 py-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-[0_0_88%] md:flex-[0_0_60%] lg:flex-[0_0_48%] min-w-0"
              style={{
                transform: index === selectedIndex ? "scale(1)" : "scale(0.94)",
                opacity: index === selectedIndex ? 1 : 0.55,
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease",
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
          aria-label={t_nav.prev}
          className="w-11 h-11 rounded-full border border-foreground/20 hover:border-primary/50 bg-card hover:bg-foreground/5 flex items-center justify-center text-foreground/70 hover:text-primary transition-all duration-300 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeft className="w-5 h-5 rtl:rotate-180" />
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={t_nav.goTo(index + 1)}
              aria-current={index === selectedIndex ? "true" : undefined}
              className={cn(
                "h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                index === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              )}
            />
          ))}
        </div>

        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          aria-label={t_nav.next}
          className="w-11 h-11 rounded-full border border-foreground/20 hover:border-primary/50 bg-card hover:bg-foreground/5 flex items-center justify-center text-foreground/70 hover:text-primary transition-all duration-300 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowRight className="w-5 h-5 rtl:rotate-180" />
        </button>
      </div>
    </div>
  );
}
