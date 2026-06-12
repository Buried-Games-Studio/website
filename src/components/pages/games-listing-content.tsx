"use client";

import { m } from "framer-motion";
import { GameGridCard, type GameGridCardData } from "@/components/ui/game-grid-card";
import { gamesContent } from "@/lib/content/games";
import { assets } from "@/lib/assets";
import { type Locale } from "@/lib/i18n";

export function GamesListingContent({ locale }: { locale: Locale }) {
  const language = locale;

  const gameImageMap: { [key: string]: string } = {
    'power-of-bombs': assets.powerOfBombsLogo,
    'koutq8': assets.koutq8Logo,
    'nabsh': assets.nabshLogo,
    'luna-fantasy': 'https://assets.buriedgames.com/images/luna-fantasy-hero.png',
    'gathered-by-the-light': 'https://assets.buriedgames.com/images/games/gbtl/poster.png',
    'arrab': assets.arrabHatLogo,
  };

  // Sort order: Luna Fantasy first (latest published), then by array order
  const sortOrder = ['arrab', 'luna-fantasy', 'nabsh', 'koutq8', 'gathered-by-the-light', 'power-of-bombs'];
  const games: GameGridCardData[] = gamesContent
    .slice()
    .sort((a, b) => {
      const ai = sortOrder.indexOf(a.id);
      const bi = sortOrder.indexOf(b.id);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })
    .map((game) => ({
      id: game.id,
      slug: game.slug,
      title: game.title,
      description: game.description[language],
      image: gameImageMap[game.id] || 'https://assets.buriedgames.com/images/hero-collage.jpg',
      status: game.status as GameGridCardData["status"],
      engine: game.engine,
      tags: game.features?.slice(0, 2).map((f: any) => f.title[language]) || [],
    }));

  const t_ui = {
    en: {
      eyebrow: "Our Games",
      title: "Original titles, built in-house",
      subtitle: "Explore our full portfolio of games and interactive experiences.",
      intro:
        "Every title below is built in-house by Buried Games, a game development studio creating original games for players across the GCC — Kuwait, Saudi Arabia, the UAE, and beyond. Our portfolio spans real-time multiplayer trivia, a digital take on the traditional Kuwaiti card game Kout, an Arabic-first Mafia social deduction game, a bomber arcade title, and more — with full Arabic and English support throughout. As an independent Arab game development company, we build games that feel native to the region in both language and culture.",
    },
    ar: {
      eyebrow: "ألعابنا",
      title: "عناوين أصلية، مبنية داخليًا",
      subtitle: "استكشف مجموعتنا الكاملة من الألعاب والتجارب التفاعلية.",
      intro:
        "كل عنوان أدناه مبنيٌّ داخليًا في بريد جيمز، استوديو تطوير ألعاب يصنع ألعابًا أصلية للاعبين في الخليج — الكويت والسعودية والإمارات وما بعدها. تمتد أعمالنا من ألعاب التريفيا الجماعية في الوقت الفعلي، إلى نسخة رقمية من لعبة الورق الكويتية التقليدية الكوت، ولعبة مافيا وخداع اجتماعي بالعربية أولًا، ولعبة أركيد قنابل، والمزيد — بدعم كامل للعربية والإنجليزية في كل مكان. وبصفتنا شركة تطوير ألعاب عربية مستقلة، نبني ألعابًا تشعر أنها أصيلة في المنطقة لغةً وثقافةً.",
    },
  }[language];

  return (
    <main className="min-h-screen bg-background">
      <section className="container max-w-screen-xl py-14 md:py-20">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
            <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
            {t_ui.eyebrow}
          </p>
          <h1 className="mt-5 text-3xl md:text-4xl font-headline font-bold tracking-tight text-foreground text-balance">
            {t_ui.title}
          </h1>
          <p className="mt-4 text-base md:text-lg text-foreground/65 leading-relaxed">
            {t_ui.subtitle}
          </p>
          <p className="mt-5 text-base text-foreground/55 leading-relaxed">
            {t_ui.intro}
          </p>
        </m.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <GameGridCard key={game.id} game={game} language={language} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
