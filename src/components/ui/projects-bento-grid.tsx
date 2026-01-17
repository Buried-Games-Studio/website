"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  status: "released" | "development" | "coming_soon";
  engine: string;
  tags?: string[];
  externalUrl?: string;
}

interface ProjectsBentoGridProps {
  projects: Project[];
  language: "en" | "ar";
}

const statusLabels = {
  en: {
    released: "Released",
    development: "In Development",
    coming_soon: "Coming Soon",
  },
  ar: {
    released: "متاح",
    development: "قيد التطوير",
    coming_soon: "قريباً",
  },
};

const statusColors = {
  released: "bg-green-500/20 text-green-400 border-green-500/30",
  development: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  coming_soon: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const ProjectCard = ({
  project,
  featured = false,
  language,
  index,
}: {
  project: Project;
  featured?: boolean;
  language: "en" | "ar";
  index: number;
}) => {
  const isRTL = language === "ar";
  const [imgError, setImgError] = useState(false);

  const fallbackImage = "/assets/images/hero-collage.jpg";
  const imageSrc = imgError ? fallbackImage : (project.image || fallbackImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm",
        "hover:border-primary/50 transition-all duration-500",
        "hover:shadow-[0_0_60px_rgba(255,0,0,0.15)]",
        featured ? "md:col-span-2 md:row-span-2" : ""
      )}
    >
      <Link href={`/games/${project.slug}`} className="block h-full">
        {/* Background Image */}
        <div className="absolute inset-0 bg-card">
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div
          className={cn(
            "relative h-full flex flex-col justify-end p-6 md:p-8",
            featured ? "min-h-[400px] md:min-h-[500px]" : "min-h-[280px]"
          )}
        >
          {/* Status Badge */}
          <div className="absolute top-6 left-6">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm",
                statusColors[project.status]
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {statusLabels[language][project.status]}
            </span>
          </div>

          {/* Engine Badge */}
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/10 backdrop-blur-sm">
              {project.engine}
            </span>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-primary/80 font-medium uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3
              className={cn(
                "font-headline font-bold text-white group-hover:text-primary transition-colors duration-300",
                featured ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
              )}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p
              className={cn(
                "text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300",
                featured
                  ? "text-base md:text-lg max-w-xl"
                  : "text-sm line-clamp-2"
              )}
            >
              {project.description}
            </p>

            {/* CTA */}
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                {language === "en" ? "View Project" : "عرض المشروع"}
                <ArrowUpRight
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    "group-hover:translate-x-1 group-hover:-translate-y-1",
                    isRTL && "rotate-90"
                  )}
                />
              </span>
            </div>
          </div>

          {/* Decorative Corner Accent */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};

export const ProjectsBentoGrid = ({
  projects,
  language,
}: ProjectsBentoGridProps) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  // First project is featured (largest)
  const [featured, ...rest] = projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Featured Project - Takes 2x2 space on desktop */}
      <ProjectCard
        project={featured}
        featured={true}
        language={language}
        index={0}
      />

      {/* Other Projects - Fill remaining grid */}
      {rest.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          language={language}
          index={index + 1}
        />
      ))}
    </div>
  );
};
