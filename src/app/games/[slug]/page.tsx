import { Metadata } from "next";
import { notFound } from "next/navigation";
import { gamesContent } from "@/lib/content/games";
import { GameDetailContent } from "@/components/pages/game-detail-content";

export function generateStaticParams() {
  return gamesContent.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = gamesContent.find((g) => g.slug === slug);

  if (!game) {
    return {
      title: 'Game Not Found',
    };
  }

  const seoTitles: Record<string, string> = {
    'nabsh': 'Nabsh — Online Trivia Game | Play Free',
    'power-of-bombs': 'Power of Bombs — Multiplayer Arcade Game of Bombs',
    'koutq8': 'KoutQ8 — Kout Game for Kuwait | Card Game App',
    'arrab': 'Arrab — Online Mafia Social Deduction Game',
    'luna-fantasy': 'Luna Fantasy — Web RPG Adventure Game',
    'gathered-by-the-light': 'Gathered by the Light — Pixel Art Adventure Game',
  };

  const title = seoTitles[game.slug] || game.title;

  return {
    title,
    description: game.description.en,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: `${title} | Buried Games Studio`,
      description: game.description.en,
      url: `/games/${game.slug}`,
      images: game.logoUrl ? [{ url: game.logoUrl, alt: game.title }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${title} | Buried Games Studio`,
      description: game.description.en,
      images: game.logoUrl ? [game.logoUrl] : undefined,
    },
  };
}

export default async function GameDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = gamesContent.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            "name": game.title,
            "description": game.description.en,
            "image": game.logoUrl,
            "url": `https://buriedgames.com/games/${game.slug}`,
            "gamePlatform": game.slug === 'koutq8' ? ['Mobile', 'Web'] : ['Web', 'PC'],
            "applicationCategory": "Game",
            "operatingSystem": "Any",
            "author": {
              "@type": "Organization",
              "name": "Buried Games Studio",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://buriedgames.com" },
              { "@type": "ListItem", "position": 2, "name": "Games", "item": "https://buriedgames.com/games" },
              { "@type": "ListItem", "position": 3, "name": game.title, "item": `https://buriedgames.com/games/${game.slug}` },
            ],
          }),
        }}
      />
      <GameDetailContent slug={slug} />
    </>
  );
}
