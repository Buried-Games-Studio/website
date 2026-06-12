"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Youtube } from "lucide-react";
import { m } from "framer-motion";
import { getTranslation } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { trackYouTubeSubscribe, trackVideoClick } from "@/lib/google-analytics";
import { localePath, type Locale } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import dynamic from "next/dynamic";
const AnimatedBackground = dynamic(() => import("@/components/ui/animated-background").then(mod => mod.AnimatedBackground), { ssr: false });

export function DevlogContent({ locale }: { locale: Locale }) {
    const language = locale;
    const t = getTranslation(language);
    const { page_title, page_subtitle, subscribe_cta, videos } = t.devlog;

    const thumbnailMap: { [key: string]: string } = {
        'thumb1': assets.thumbnail1,
        'thumb2': assets.thumbnail2,
        'thumb3': assets.thumbnail3,
        'thumb4': assets.thumbnail4,
        'thumb5': assets.thumbnail5,
        'thumb6': assets.thumbnail6,
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
                        <m.div
                            key={video.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Link
                                href={localePath(language, `/devlog/${video.slug}`)}
                                className="block group relative rounded-lg overflow-hidden shadow-lg hover:shadow-accent/20 transition-all duration-300"
                                onClick={() => trackVideoClick(video.alt, video.youtubeUrl)}
                            >
                                <Image
                                    src={thumbnailMap[video.id]}
                                    alt={video.alt}
                                    width={1280}
                                    height={720}
                                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                                    data-ai-hint="video thumbnail"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                    <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                                </div>
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10">
                                    <h2 className="text-sm md:text-base font-semibold text-white text-start line-clamp-2">
                                        {video.alt}
                                    </h2>
                                </div>
                            </Link>
                        </m.div>
                    ))}
                </div>

                <div className="mt-20 text-center animate-fade-in-up delay-300">
                    <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent">
                        <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-[#ff0000] text-white hover:bg-[#cc0000] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                            <a href="https://www.youtube.com/@BuriedGamesStudio?sub_confirmation=1" target="_blank" rel="noopener noreferrer" onClick={() => trackYouTubeSubscribe()}>
                                <Youtube className="me-2 h-6 w-6" />
                                {subscribe_cta}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
