import type { Locale } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { DESIGN_WORKS_PATH } from "./design-works";

/**
 * Single source of truth for the studio team. Feeds the about page (team
 * cards + AboutPage schema), the homepage credibility band, the site-wide
 * Organization schema, and the /design-works creator attribution — one place
 * to change a name, title, or photo.
 */

type Localized = { en: string; ar: string };

export type TeamMember = {
  id: string;
  name: Localized;
  /** Latin name kept for schema alternateName on Arabic pages. */
  latinName: string;
  /** Team-card eyebrow. */
  role: Localized;
  /** Sub-line under the name; rendered only when it differs from role. */
  title: Localized;
  /** Schema jobTitle — explicit so structured data stays stable if UI labels change. */
  jobTitle: Localized;
  /** Rendered in quotation marks on the team card. */
  quote?: Localized;
  /** Plain descriptive blurb, used when there is no quote. */
  bio?: Localized;
  photoUrl: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  /** Internal showcase link for the team card (shown once the section is live). */
  showcaseHref?: string;
};

export const fahed: TeamMember = {
  id: "fahed",
  name: { en: "Fahed Alahmad", ar: "فهد الأحمد" },
  latinName: "Fahed Alahmad",
  role: { en: "Founder", ar: "المؤسس" },
  title: { en: "Founder & Lead Developer", ar: "المؤسس والمطور الرئيسي" },
  jobTitle: { en: "Founder", ar: "المؤسس" },
  quote: {
    en: "I started Buried Games with a simple belief: games should be immersive, challenging, and respectful of the player's time. We are building the games we always wanted to play — and helping clients across the GCC build theirs.",
    ar: "أسّست بريد جيمز بإيمان بسيط: يجب أن تكون الألعاب غامرة وتمثّل تحديًا وتحترم وقت اللاعب. نحن نصنع الألعاب التي طالما أردنا أن نلعبها — ونساعد عملاءنا في مختلف دول الخليج على صناعة ألعابهم.",
  },
  photoUrl: assets.fahedAlahmad,
  linkedInUrl: "https://linkedin.com/in/fahed-f-al-ahmad-se",
};

export const bokhari: TeamMember = {
  id: "bokhari",
  name: { en: "Bokhari Hamid", ar: "بوخاري حامد" },
  latinName: "Bokhari Hamid",
  role: { en: "Creative Director", ar: "المدير الإبداعي" },
  title: { en: "Creative Director", ar: "المدير الإبداعي" },
  jobTitle: { en: "Creative Director", ar: "المدير الإبداعي" },
  bio: {
    en: "Bokhari leads the studio's creative direction — concept art, characters, branding, and game UI. His design work sets the visual bar for everything we ship.",
    ar: "يقود بوخاري الاتجاه الإبداعي للاستوديو — من الفن المفاهيمي وتصميم الشخصيات إلى الهوية البصرية وواجهات الألعاب. أعماله ترسم السقف البصري لكل ما نطلقه.",
  },
  photoUrl: assets.bokhariHamid,
  linkedInUrl: "https://www.linkedin.com/in/bokhari-hamid-b1524a231/",
  showcaseHref: DESIGN_WORKS_PATH,
};

export const teamMembers: TeamMember[] = [fahed, bokhari];

export function getTeamMember(id: string): TeamMember | undefined {
  return teamMembers.find((member) => member.id === id);
}

const ORGANIZATION = {
  "@type": "Organization",
  "name": "Buried Games Studio",
  "url": "https://buriedgames.com",
} as const;

/**
 * Person node for nesting inside an Organization (founder / employee):
 * containment already expresses the employment, so no worksFor.
 */
export function personLdNested(member: TeamMember, locale: Locale) {
  const sameAs = [member.linkedInUrl, member.portfolioUrl].filter(
    (url): url is string => Boolean(url),
  );
  return {
    "@type": "Person",
    "name": member.name[locale],
    ...(locale === "ar" ? { "alternateName": member.latinName } : {}),
    "jobTitle": member.jobTitle[locale],
    ...(sameAs.length ? { "sameAs": sameAs } : {}),
  };
}

/**
 * Standalone Person node (e.g. a design work's creator): worksFor ties the
 * member to the studio — a member of the team, not an external vendor.
 */
export function personLd(member: TeamMember, locale: Locale) {
  return {
    ...personLdNested(member, locale),
    "worksFor": ORGANIZATION,
  };
}
