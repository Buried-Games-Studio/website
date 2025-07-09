
import type { Language } from '@/contexts/language-context';
import { aboutContent } from './content/about';
import { servicesContent } from './content/services';
import { gamesContent } from './content/games';
import { faqContent } from './content/faq';
import { partnersContent } from './content/partners';
import { devlogContent } from './content/devlog';

export const content = {
  ...aboutContent,
  services: servicesContent,
  games: gamesContent,
  faq: faqContent,
  partners: partnersContent,
  devlog: devlogContent,
};

export const getTranslation = (language: Language) => ({
  about_summary: content.about_summary[language],
  about_page: content.about_page[language],
  services: content.services[language],
  games: content.games.map(game => ({ ...game, description: game.description[language] })),
  faq: content.faq[language],
  partners: content.partners[language],
  devlog: content.devlog[language],
});
