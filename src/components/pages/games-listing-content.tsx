"use client";

import { useLanguage } from "@/contexts/language-context";
import { ProjectsBentoGrid } from "@/components/ui/projects-bento-grid";
import { gamesContent } from "@/lib/content/games";
import PowerOfBombsImage from '@/components/images/powerofbombsIconTransparent.png';
import Koutq8Image from '@/components/images/Koutq8Logo.png';
import NabshImage from '@/assets/images/nabsh_logo.png';

export function GamesListingContent() {
  const { language } = useLanguage();

  const gameImageMap: { [key: string]: string } = {
    'power-of-bombs': PowerOfBombsImage.src,
    'koutq8': Koutq8Image.src,
    'nabsh': NabshImage.src,
    'luna-fantasy': '/assets/images/luna-fantasy-hero.png',
  };

  const projectsForGrid = gamesContent
    .slice()
    .reverse()
    .map((game) => ({
      id: game.id,
      slug: game.slug,
      title: game.title,
      description: game.description[language],
      image: gameImageMap[game.id] || '/assets/images/hero-collage.jpg',
      status: game.status as "released" | "development" | "coming_soon",
      engine: game.engine,
      tags: game.features?.slice(0, 2).map((f: any) => f.title[language]) || [],
    }));

  const t_ui = {
    en: {
      title: "Our Games",
      subtitle: "Explore our full portfolio of games and interactive experiences.",
    },
    ar: {
      title: "ألعابنا",
      subtitle: "استكشف مجموعتنا الكاملة من الألعاب والتجارب التفاعلية.",
    },
  }[language];

  return (
    <main className="min-h-screen bg-background">
      <section className="container py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white">
            {t_ui.title}
          </h1>
          <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
            {t_ui.subtitle}
          </p>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto mt-6" />
        </div>

        <ProjectsBentoGrid projects={projectsForGrid} language={language} />
      </section>
    </main>
  );
}
