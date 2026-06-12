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

// VideoObject JSON-LD. NOTE FOR OWNER: uploadDate is intentionally omitted
// because the publish date is not available in the content data. Add an
// `uploadDate` (ISO 8601) to each entry in devlogPosts to populate it — Google
// recommends it for richer Video results.
function videoSchema(post: (typeof devlogPosts)[number], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": post.title[locale],
    "description": post.description[locale],
    "thumbnailUrl": `https://img.youtube.com/vi/${post.youtubeId}/hqdefault.jpg`,
    "embedUrl": `https://www.youtube-nocookie.com/embed/${post.youtubeId}`,
    "url": `${SITE}${localePath(locale, `/devlog/${post.slug}`)}`,
    "publisher": {
      "@type": "Organization",
      "name": "Buried Games Studio",
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

      <main className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(var(--primary),0.15),transparent_50%)] pointer-events-none" />

        <article className="container relative z-10 max-w-3xl">
          <Link
            href={localePath(locale, "/devlog")}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowRight className={`w-4 h-4 ${isRTL ? "" : "rotate-180"}`} />
            {backLabel[locale]}
          </Link>

          <h1 className="mt-6 font-headline text-3xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-lg text-start">
            {post.title[locale]}
          </h1>

          <div className="mt-8">
            <LiteYouTube videoId={post.youtubeId} title={post.title[locale]} />
          </div>

          <div className="mt-8 text-muted-foreground md:text-lg leading-relaxed text-start">
            <p>{post.description[locale]}</p>
          </div>

          <div className="mt-8">
            <a
              href={`https://www.youtube.com/watch?v=${post.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              {watchLabel[locale]}
              <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
