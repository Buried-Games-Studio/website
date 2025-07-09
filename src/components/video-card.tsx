
"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import type { getTranslation } from "@/lib/content";

type Video = ReturnType<typeof getTranslation>['devlog']['videos'][0];

export function VideoCard({ video, thumbnail }: { video: Video, thumbnail: StaticImageData }) {
  return (
    <Link href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block group relative rounded-lg overflow-hidden shadow-lg hover:shadow-accent/20 transition-all duration-300">
      <Image
        src={thumbnail}
        alt={video.alt}
        width={1280}
        height={720}
        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
        data-ai-hint="video thumbnail"
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
      </div>
    </Link>
  );
}
