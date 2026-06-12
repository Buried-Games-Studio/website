'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Click-to-load YouTube facade: renders only the thumbnail until the user
 * plays, keeping the heavy YouTube iframe out of initial page load (LCP/TBT).
 */
export function LiteYouTube({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className={cn('aspect-video w-full rounded-xl', className)}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={title}
      className={cn(
        'group relative block aspect-video w-full overflow-hidden rounded-xl border border-white/10',
        className
      )}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="ms-1 h-7 w-7 fill-current" />
        </span>
      </span>
    </button>
  );
}
