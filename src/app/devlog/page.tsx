
"use client";

import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { VideoCard } from "@/components/video-card";
import Thumbnail1 from '@/components/images/thumbnail_1.png';
import Thumbnail2 from '@/components/images/thumbnail_2.png';
import Thumbnail3 from '@/components/images/thumbnail_3.png';
import Thumbnail4 from '@/components/images/thumbnail_4.png';
import Thumbnail5 from '@/components/images/thumbnail_5.png';
import Thumbnail6 from '@/components/images/thumbnail_6.png';

export default function DevlogPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const { page_title, page_subtitle, subscribe_cta, videos } = t.devlog;

  const thumbnailMap: { [key: string]: any } = {
    'thumb1': Thumbnail1,
    'thumb2': Thumbnail2,
    'thumb3': Thumbnail3,
    'thumb4': Thumbnail4,
    'thumb5': Thumbnail5,
    'thumb6': Thumbnail6,
  };

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
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} thumbnail={thumbnailMap[video.id]} />
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
