
import type { Language } from '@/contexts/language-context';
import { aboutContent } from './content/about';
import { servicesContent } from './content/services';
import { gamesContent as allGames } from './content/games';
import { faqContent } from './content/faq';
import { partnersContent } from './content/partners';
import { devlogContent } from './content/devlog';

export const content = {
  ...aboutContent,
  services: servicesContent,
  games: allGames,
  faq: faqContent,
  partners: partnersContent,
  devlog: devlogContent,
};

export const getTranslation = (language: Language) => ({
  about_summary: content.about_summary[language],
  about_page: content.about_page[language],
  services: content.services[language],
  games: allGames.map(game => ({
    id: game.id,
    slug: game.slug,
    title: game.title,
    description: game.description[language],
    imageUrl: game.logoUrl || game.imageUrl,
    imageHint: game.imageHint,
  })),
  faq: content.faq[language],
  partners: content.partners[language],
  devlog: content.devlog[language],
});

export const getGameData = (slug: string) => {
    const game = allGames.find(g => g.slug === slug);
    if (!game) return null;
    return game;
}
