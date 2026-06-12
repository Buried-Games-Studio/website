"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Youtube, ArrowUpRight } from "lucide-react";
import { m } from "framer-motion";
import { getTranslation } from "@/lib/content";
import { devlogPosts } from "@/lib/content/devlog";
import { Button } from "@/components/ui/button";
import { trackYouTubeSubscribe, trackVideoClick } from "@/lib/google-analytics";
import { localePath, type Locale } from "@/lib/i18n";
import { assets } from "@/lib/assets";

const thumbnailMap: { [key: string]: string } = {
  thumb1: assets.thumbnail1,
  thumb2: assets.thumbnail2,
  thumb3: assets.thumbnail3,
  thumb4: assets.thumbnail4,
  thumb5: assets.thumbnail5,
  thumb6: assets.thumbnail6,
};

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-KW" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function DevlogContent({ locale }: { locale: Locale }) {
  const language = locale;
  const t = getTranslation(language);
  const isRTL = language === "ar";
  const { page_title, page_subtitle, page_intro, subscribe_cta, videos } = t.devlog;

  // The translation feed carries the thumbnail/slug; the richer devlogPosts
  // module carries the published date + a proper title/excerpt. Joining them by
  // slug gives each card real editorial metadata instead of a bare thumbnail.
  const posts = videos.map((video) => {
    const post = devlogPosts.find((p) => p.slug === video.slug);
    return {
      slug: video.slug,
      youtubeUrl: video.youtubeUrl,
      thumb: thumbnailMap[video.id],
      title: post?.title[language] ?? video.alt,
      excerpt: post?.description[language] ?? "",
      publishedAt: post?.publishedAt,
    };
  });

  return (
    <main className="min-h-screen bg-background">
      <section className="container max-w-screen-xl py-14 md:py-20">
        {/* Editorial header — eyebrow + sentence-case h1, start-aligned */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
            {language === "ar" ? "مدونة التطوير" : "Devlog"}
          </p>
          <h1 className="mt-5 text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground text-balance">
            {page_title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/65 leading-relaxed">
            {page_subtitle}
          </p>
          <p className="mt-5 text-base text-foreground/55 leading-relaxed">{page_intro}</p>
        </m.div>

        {/* Card list */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <m.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={localePath(language, `/devlog/${post.slug}`)}
                className="group block h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onClick={() => trackVideoClick(post.title, post.youtubeUrl)}
              >
                <div className="relative aspect-video overflow-hidden bg-black/30">
                  <Image
                    src={post.thumb}
                    alt={post.title}
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint="video thumbnail"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/15" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-14 w-14 text-white/85 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
                  </div>
                </div>
                <div className="p-5">
                  {post.publishedAt && (
                    <p className="text-xs text-foreground/45">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, language)}</time>
                    </p>
                  )}
                  <h2 className="mt-2 line-clamp-2 text-base md:text-lg font-headline font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-1 text-sm text-foreground/60 leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {language === "ar" ? "اقرأ المزيد" : "Read more"}
                    <ArrowUpRight
                      className={`h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                        isRTL ? "-scale-x-100 group-hover:-translate-x-0.5" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </m.div>
          ))}
        </div>

        {/* Single contact-adjacent CTA: subscribe band */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/40 px-6 py-10 text-center"
        >
          <p className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-foreground">
            {language === "ar" ? "تابع رحلة التطوير" : "Follow the build"}
          </p>
          <Button
            asChild
            size="lg"
            className="h-12 md:h-13 px-8 rounded-full bg-[#ff0000] text-white hover:bg-[#cc0000] font-semibold transition-all duration-300"
          >
            <a
              href="https://www.youtube.com/@BuriedGamesStudio?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackYouTubeSubscribe()}
            >
              <Youtube className="me-2 h-5 w-5" />
              {subscribe_cta}
            </a>
          </Button>
        </m.div>
      </section>
    </main>
  );
}
