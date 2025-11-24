"use client";

import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { VideoCard } from "@/components/video-card";
import { AnimatedBackground } from "@/components/ui/animated-background";
import Thumbnail1 from '@/components/images/thumbnail_1.png';
import Thumbnail2 from '@/components/images/thumbnail_2.png';
import Thumbnail3 from '@/components/images/thumbnail_3.png';
import Thumbnail4 from '@/components/images/thumbnail_4.png';
import Thumbnail5 from '@/components/images/thumbnail_5.png';
import Thumbnail6 from '@/components/images/thumbnail_6.png';

export function DevlogContent() {
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
        <main className="relative min-h-screen pt-24 pb-16 overflow-hidden">
            <AnimatedBackground />

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--primary),0.15),transparent_50%)] pointer-events-none" />

            <div className="container relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-lg">
                        {page_title}
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl leading-relaxed">
                        {page_subtitle}
                    </p>
                    <div className="mt-6 h-1 w-24 bg-primary mx-auto rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <div key={video.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <VideoCard video={video} thumbnail={thumbnailMap[video.id]} />
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center animate-fade-in-up delay-300">
                    <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent">
                        <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-[#ff0000] text-white hover:bg-[#cc0000] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                            <a href="https://www.youtube.com/@BuriedGamesStudio?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                                <Youtube className="mr-2 h-6 w-6" />
                                {subscribe_cta}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
