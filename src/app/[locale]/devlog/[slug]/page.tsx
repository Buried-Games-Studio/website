import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LiteYouTube } from "@/components/lite-youtube";
import { devlogPosts } from "@/lib/content/devlog";
import { isLocale, localePath, languageAlternates, ogLocale, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

const SITE = "https://buriedgames.com";

const backLabel: Record<Locale, string> = {
  en: "Back to all devlogs",
  ar: "العودة إلى كل مدونات التطوير",
};

const watchLabel: Record<Locale, string> = {
  en: "Watch on our YouTube channel",
  ar: "شاهد على قناتنا على يوتيوب",
};

const readMoreLabel: Record<Locale, string> = {
  en: "Keep exploring",
  ar: "تابع الاستكشاف",
};

function formatPublishedDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "ar" ? "ar-KW" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return devlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const post = devlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: locale === "ar" ? "المدونة غير موجودة" : "Devlog Not Found" };
  }

  const path = `/devlog/${post.slug}`;

  return {
    title: post.title[locale],
    description: post.description[locale],
    alternates: {
      canonical: localePath(locale, path),
      languages: languageAlternates(path),
    },
    openGraph: {
      title: post.title[locale],
      description: post.description[locale],
      url: localePath(locale, path),
      locale: ogLocale[locale],
      type: "video.other",
      images: [{ url: `https://img.youtube.com/vi/${post.youtubeId}/hqdefault.jpg`, alt: post.title[locale] }],
    },
  };
}

// VideoObject JSON-LD. uploadDate is the real publish date of the source video
// on our YouTube channel (devlogPosts[].publishedAt), which Google recommends
// for richer Video results.
function videoSchema(post: (typeof devlogPosts)[number], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": post.title[locale],
    "description": post.description[locale],
    "thumbnailUrl": `https://img.youtube.com/vi/${post.youtubeId}/hqdefault.jpg`,
    "embedUrl": `https://www.youtube-nocookie.com/embed/${post.youtubeId}`,
    "uploadDate": post.publishedAt,
    "url": `${SITE}${localePath(locale, `/devlog/${post.slug}`)}`,
    "publisher": {
      "@type": "Organization",
      "name": "Buried Games Studio",
    },
  };
}

// BlogPosting JSON-LD for the long-form article that accompanies the video.
function articleSchema(post: (typeof devlogPosts)[number], locale: Locale) {
  const url = `${SITE}${localePath(locale, `/devlog/${post.slug}`)}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title[locale],
    "description": post.description[locale],
    "image": `https://img.youtube.com/vi/${post.youtubeId}/maxresdefault.jpg`,
    "datePublished": post.publishedAt,
    "inLanguage": locale === "ar" ? "ar" : "en",
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "url": url,
    "author": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": SITE,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Buried Games Studio",
      "url": SITE,
    },
  };
}

export default async function DevlogPostPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const post = devlogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isRTL = locale === "ar";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema(post, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": locale === "ar" ? "الرئيسية" : "Home", "item": `${SITE}${localePath(locale, "/")}` },
              { "@type": "ListItem", "position": 2, "name": locale === "ar" ? "مدونات التطوير" : "Devlogs", "item": `${SITE}${localePath(locale, "/devlog")}` },
              { "@type": "ListItem", "position": 3, "name": post.title[locale], "item": `${SITE}${localePath(locale, `/devlog/${post.slug}`)}` },
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-background">
        <article className="container max-w-3xl py-14 md:py-20">
          <Link
            href={localePath(locale, "/devlog")}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "group-hover:translate-x-1" : "rotate-180 group-hover:-translate-x-1"}`} />
            {backLabel[locale]}
          </Link>

          {/* Eyebrow + published date */}
          <p className="mt-8 flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase text-start">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
            <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt, locale)}</time>
          </p>

          <h1 className="mt-4 font-headline text-3xl md:text-4xl font-bold tracking-tight leading-[1.1] text-foreground text-start text-balance">
            {post.title[locale]}
          </h1>

          {/* Video framed in a rounded-xl border card */}
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card p-2">
            <div className="overflow-hidden rounded-lg">
              <LiteYouTube videoId={post.youtubeId} title={post.title[locale]} />
            </div>
            <div className="flex items-center justify-between gap-3 px-3 py-2.5">
              <a
                href={`https://www.youtube.com/watch?v=${post.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {watchLabel[locale]}
                <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
              </a>
            </div>
          </div>

          <p className="mt-10 text-foreground/80 text-lg leading-relaxed text-start">
            {post.intro[locale]}
          </p>

          {post.sections.map((section, i) => (
            <section key={i} className="mt-12">
              <h2 className="flex items-center gap-3 font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground text-start">
                <span aria-hidden="true" className="inline-block w-6 h-px shrink-0 bg-primary" />
                {section.heading[locale]}
              </h2>
              {section.body.map((paragraph, j) => (
                <p key={j} className="mt-4 text-foreground/70 text-lg leading-relaxed text-start">
                  {paragraph[locale]}
                </p>
              ))}
            </section>
          ))}

          <section className="mt-14 border-t border-border pt-10">
            <h2 className="font-headline text-xl md:text-2xl font-bold tracking-tight text-foreground text-start">
              {readMoreLabel[locale]}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {post.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localePath(locale, link.href)}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 text-start transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.label[locale]}
                    </span>
                    <ArrowRight className={`w-4 h-4 shrink-0 text-foreground/40 transition-all group-hover:text-primary ${isRTL ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
    </>
  );
}
