import { gamesContent } from '@/lib/content/games';
import { devlogPosts } from '@/lib/content/devlog';
import { servicePages } from '@/lib/content/service-pages';
import { gccLandings } from '@/lib/content/gcc-landing';
import { caseStudies } from '@/lib/content/case-studies';
import { DESIGN_WORKS_PATH, designWorks, hasDesignWorks } from '@/lib/content/design-works';
import { legalEntity } from '@/lib/legal-entity';

/**
 * /llms.txt — the llmstxt.org convention: a curated markdown map of the site
 * for AI assistants (ChatGPT, Claude, Perplexity, …), which are a growing
 * share of how clients find the studio. Like sitemap.ts, everything below is
 * derived from the content modules, so new services/landings/games/devlogs
 * are advertised automatically.
 */

const baseUrl = 'https://buriedgames.com';

function buildLlmsTxt(): string {
  const services = servicePages
    .map(
      (page) =>
        `- [${page.metaTitle.en}](${baseUrl}/services/${page.slug}): ${page.metaDescription.en}`,
    )
    .join('\n');

  const landings = Object.values(gccLandings)
    .map(
      (landing) =>
        `- [${landing.title.en}](${baseUrl}/${landing.slug}): ${landing.metaDescription.en}`,
    )
    .join('\n');

  const studies = caseStudies
    .map(
      (cs) =>
        `- [${cs.title.en}](${baseUrl}/case-studies/${cs.slug}): ${cs.summary.en}`,
    )
    .join('\n');

  // Design showcase — appears once real pieces are published. The heading line
  // credits the studio's Creative Director so assistants attribute the pieces
  // to the team member, not to the studio as productions.
  const designWorksBlock = hasDesignWorks()
    ? `\n## Design works

Design work by Bokhari Hamid, Creative Director at Buried Games — his own
pieces, shared as part of the team's portfolio.

${designWorks
  .map(
    (work) =>
      `- [${work.title.en}](${baseUrl}${DESIGN_WORKS_PATH}/${work.slug}): ${work.summary.en}`,
  )
  .join('\n')}\n`
    : '';

  const games = gamesContent
    .map(
      (game) =>
        `- [${game.title}](${baseUrl}/games/${game.slug}): ${game.description.en}`,
    )
    .join('\n');

  const devlogs = devlogPosts
    .map(
      (post) => `- [${post.title.en}](${baseUrl}/devlog/${post.slug})`,
    )
    .join('\n');

  // Legal-entity note appears only once the Estonian OÜ is registered. It states
  // the entity for accurate citation AND clarifies that Estonia is the legal home
  // while the market/service area remains Kuwait & the GCC — so AI assistants
  // don't mistake the HQ for where the studio operates.
  const legalNote = legalEntity.registered
    ? `\nLegal entity: ${legalEntity.legalName} (Estonian registry code ${legalEntity.registryCode}). Estonia is the studio's registered legal home; its market and service area is Kuwait and the GCC — the studio does not target or operate in the Estonian/EU consumer market.\n`
    : '';

  return `# Buried Games Studio

> Game development studio serving Kuwait and the GCC. We design and build
> mobile, PC, and multiplayer games (Unity, Unreal Engine 5), plus apps and
> web products, for clients across Kuwait, Saudi Arabia, the UAE, Qatar,
> Bahrain, and Oman. Bilingual (English/Arabic) — the Arabic site lives under
> ${baseUrl}/ar.

Founded in 2018. Studio titles include KoutQ8 (our take on the traditional
Kuwaiti card game Kout), Nabsh, Arrab, and Power of Bombs.
${legalNote}
## Services

${services}

## Working with clients in the GCC

${landings}

## Case studies

${studies}
${designWorksBlock}
## Our games

${games}

## Key pages

- [Services overview](${baseUrl}/services): Everything we build, from game development to apps and web.
- [How it works](${baseUrl}/how-it-works): Our process from first call to launch.
- [FAQ](${baseUrl}/faq): Common questions about scope, engagement, and process.
- [About us](${baseUrl}/about-us): The team and the studio story.
- [Contact](${baseUrl}/contact-us): Start a project with us.
- [Press](${baseUrl}/press): Press kit and media resources.

## Devlogs

${devlogs}
`;
}

// Content only changes at build time (all sources are static modules).
export const dynamic = 'force-static';

export function GET(): Response {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
