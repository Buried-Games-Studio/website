import { gamesContent } from "@/lib/content/games";
import type { Locale } from "@/lib/i18n";

/**
 * The studio's verifiable proof points, in ONE place.
 *
 * Why this module exists: these numbers were hard-coded inside home-content.tsx
 * ("4", "7+", "3"), which meant they could only ever go stale silently — and the
 * commercial pages that most need them (the six GCC country pages and the twelve
 * service pages) had no proof points at all. The 05.08.2026 competitor teardown
 * put that in sharp relief: the page outranking /game-development-kuwait carries
 * Tencent, Sony, Disney and Warner Bros logos plus "200+ shipped titles" and
 * "250+ engineers", while ours carried no numbers whatsoever.
 *
 * We cannot and must not answer that with borrowed credibility. The rule from
 * CLAUDE.md stands: only real, verifiable facts — no invented counts, budgets,
 * timelines or client names. So everything here is either DERIVED from content
 * that already exists in the repo, or a hand-checked constant with its source
 * written next to it.
 */

/** Founding date asserted in Organization JSON-LD (layout.tsx) and on /about-us. */
export const FOUNDED_YEAR = 2018;

/**
 * Games the studio has actually put in players' hands. Derived, not typed in,
 * so shipping or un-shipping a title updates every page that cites the number.
 *
 * `completed` counts alongside `released`: Gathered by the Light was finished
 * and published as a capstone project, which is shipped work even though it has
 * no storefront listing. `development` (Arrab, Power of Bombs) does not count.
 */
export const gamesShipped = gamesContent.filter(
  (game) => game.status === "released" || game.status === "completed",
).length;

/**
 * Years active, evaluated at build time. This is the one figure that moves on
 * its own, and a rebuild is frequent enough to keep it honest — the alternative
 * is a hand-typed number that is quietly wrong for months.
 */
export const yearsActive = new Date().getFullYear() - FOUNDED_YEAR;

/**
 * Game engines the studio ships production work in.
 *
 * ⚠️ Deliberately TWO, not the "3" the homepage used to display. games.ts lists
 * Unity, Unreal Engine and Next.js/NestJS — but Next.js is a web framework, not
 * a game engine, and counting it inflated the claim. The web/dashboard work is
 * real and is sold on the service pages; it just is not an engine.
 */
export const gameEngines = ["Unity", "Unreal Engine"] as const;

export type StudioStat = { value: string; label: Record<Locale, string> };

/**
 * The proof band, shared by the homepage, the country pages and the service
 * pages. Order is deliberate: shipped work first (the only figure a prospect
 * really weighs), longevity second.
 */
export const studioStats: StudioStat[] = [
  {
    value: String(gamesShipped),
    label: { en: "Games Shipped", ar: "ألعاب منشورة" },
  },
  {
    value: `${yearsActive}+`,
    label: { en: "Years Active", ar: "سنوات نشاط" },
  },
  {
    value: String(gameEngines.length),
    label: { en: "Game Engines", ar: "محركات ألعاب" },
  },
  {
    value: "100%",
    label: { en: "Fully Remote", ar: "عمل عن بعد بالكامل" },
  },
];
