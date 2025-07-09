
"use client";

import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { VideoCard } from "@/components/video-card";

export default function DevlogPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const { page_title, page_subtitle, subscribe_cta, videos } = t.devlog;

  return (
    <main>
      <section className="bg-card">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{page_title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">{page_subtitle}</p>
        </div>
      </section>

      <section className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <a href="https://www.youtube.com/@BuriedGamesStudio?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
              <Youtube className="mr-2 h-5 w-5" />
              {subscribe_cta}
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
