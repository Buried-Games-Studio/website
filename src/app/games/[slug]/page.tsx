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

  return {
    title: game.title,
    description: game.description.en,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: `${game.title} | Buried Games Studio`,
      description: game.description.en,
      url: `/games/${game.slug}`,
      images: game.logoUrl ? [{ url: game.logoUrl, alt: game.title }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${game.title} | Buried Games Studio`,
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
      <GameDetailContent slug={slug} />
    </>
  );
}
