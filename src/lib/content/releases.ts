import type { Locale } from "@/lib/i18n";
import { devlogPosts } from "@/lib/content/devlog";

/**
 * Data-driven content for the /releases timeline page. REAL, verifiable milestones
 * only — anything unconfirmed is omitted (and listed in the page's openQuestions).
 *
 * Verified sources:
 *  - KoutQ8 v1.0.0 on the App Store, released 2025-06-10 (apps.apple.com/app/id6738164175;
 *    same date recorded as games.ts koutq8 seoMeta.datePublished).
 *  - Nabsh is live and playable at nabsh.fun (HTTP 200; status "released" in games.ts).
 *    No specific public launch date is confirmed from a source, so its entry carries
 *    no exact date — it is marked as a live milestone without a fabricated day.
 *  - Devlog video upload dates come from devlog.ts publishedAt (read from each
 *    source video's uploadDate). They are pulled in programmatically below so a new
 *    devlog automatically extends the timeline.
 *  - Studio founded 2018 (Organization schema foundingDate 2018-10-01).
 *  - Arrab, Power of Bombs (in development) and Gathered by the Light (completed
 *    capstone) are status milestones from games.ts — described as in development /
 *    completed, with no invented release dates.
 *
 * Adding a future release is a one-line entry in `manualEntries`.
 */

export type LocalizedText = Record<Locale, string>;

export type ReleaseKind = "release" | "milestone" | "devlog" | "development";

export interface ReleaseEntry {
  /** ISO date (YYYY-MM-DD) when known; null when the date is not verifiable. */
  date: string | null;
  /** Human label for a missing/approximate date, e.g. "Live now". */
  dateLabel?: LocalizedText;
  kind: ReleaseKind;
  title: LocalizedText;
  body: LocalizedText;
  /** Optional internal link (locale-neutral) with descriptive anchor. */
  link?: { href: string; label: LocalizedText };
  /** Optional external link (e.g. App Store, nabsh.fun). */
  externalLink?: { href: string; label: string };
}

export const releasesContent = {
  metaTitle: {
    en: "Releases & Updates | Game Development Timeline",
    ar: "الإصدارات والتحديثات | الخط الزمني لتطوير الألعاب",
  } satisfies LocalizedText,
  metaDescription: {
    en: "A timeline of Buried Games Studio releases, game milestones, and devlogs — from our founding to live titles like KoutQ8 on the App Store and Nabsh on the web, serving players across Kuwait and the GCC.",
    ar: "خط زمني لإصدارات استوديو بريد جيمز ومحطات ألعابه ومدونات تطويره — من تأسيسنا إلى ألعاب حية مثل كوت على App Store ونبش على الويب، لخدمة اللاعبين في الكويت والخليج.",
  } satisfies LocalizedText,

  hero: {
    eyebrow: { en: "Releases & Updates", ar: "الإصدارات والتحديثات" } satisfies LocalizedText,
    title: { en: "Release & Update Timeline", ar: "الخط الزمني للإصدارات والتحديثات" } satisfies LocalizedText,
    subtitle: {
      en: "A running record of what we've shipped and what we're building — game releases, studio milestones, and development logs, newest first.",
      ar: "سجل متجدد لما أطلقناه وما نبنيه — إصدارات الألعاب ومحطات الاستوديو ومدونات التطوير، الأحدث أولًا.",
    } satisfies LocalizedText,
  },

  intro: {
    en: "This timeline lists only verified milestones — real releases, confirmed live games, and dated devlogs. We update it as we ship.",
    ar: "يسرد هذا الخط الزمني المحطات المؤكدة فقط — إصدارات حقيقية وألعاب حية مؤكدة ومدونات تطوير مؤرخة. نحدّثه كلما أطلقنا.",
  } satisfies LocalizedText,

  legendLabels: {
    release: { en: "Release", ar: "إصدار" } satisfies LocalizedText,
    milestone: { en: "Milestone", ar: "محطة" } satisfies LocalizedText,
    devlog: { en: "Devlog", ar: "مدونة تطوير" } satisfies LocalizedText,
    development: { en: "In development", ar: "قيد التطوير" } satisfies LocalizedText,
  },

  cta: {
    title: { en: "Want to be our next release?", ar: "تريد أن تكون إصدارنا التالي؟" } satisfies LocalizedText,
    body: {
      en: "Tell us about your game and we'll help you ship it to players across Kuwait and the GCC.",
      ar: "أخبرنا عن لعبتك وسنساعدك على إطلاقها للاعبين في الكويت والخليج.",
    } satisfies LocalizedText,
  },
};

/** Hand-curated, verifiable milestones (newest handled by the sort below). */
const manualEntries: ReleaseEntry[] = [
  {
    date: "2025-06-10",
    kind: "release",
    title: { en: "KoutQ8 launches on the App Store", ar: "إطلاق كوت على App Store" },
    body: {
      en: "KoutQ8, our digital take on the traditional Kuwaiti card game Kout, went live on the App Store (v1.0.0) — free to download, with online multiplayer and AI partners. Built in Unity.",
      ar: "كوت، نسختنا الرقمية من لعبة الورق الكويتية التقليدية، أصبحت حية على App Store (الإصدار 1.0.0) — مجانية التنزيل، بلعب جماعي عبر الإنترنت وشركاء ذكاء اصطناعي. مبنية على Unity.",
    },
    link: { href: "/games/koutq8", label: { en: "KoutQ8 game page", ar: "صفحة لعبة كوت" } },
    externalLink: { href: "https://apps.apple.com/app/id6738164175", label: "App Store" },
  },
  {
    date: null,
    dateLabel: { en: "Live now", ar: "حية الآن" },
    kind: "milestone",
    title: { en: "Nabsh live on the web", ar: "نبش حية على الويب" },
    body: {
      en: "Nabsh, our real-time multiplayer trivia game with 50+ categories spanning Kuwaiti culture and global topics, is live and free to play in any browser at nabsh.fun.",
      ar: "نبش، لعبة التريفيا الجماعية الفورية لدينا بأكثر من 50 فئة تمتد من الثقافة الكويتية إلى المواضيع العالمية، حية ومجانية للعب في أي متصفح عبر nabsh.fun.",
    },
    link: { href: "/games/nabsh", label: { en: "Nabsh game page", ar: "صفحة لعبة نبش" } },
    externalLink: { href: "https://nabsh.fun", label: "nabsh.fun" },
  },
  {
    date: null,
    dateLabel: { en: "In development", ar: "قيد التطوير" },
    kind: "development",
    title: { en: "Arrab in development", ar: "العرّاب قيد التطوير" },
    body: {
      en: "Arrab, our premium real-time social-deduction Mafia game with 11 roles and full Arabic RTL support, is in active development. Follow the studio for room-opening news.",
      ar: "العرّاب، لعبة المافيا والخداع الاجتماعي الفاخرة الفورية بـ11 دورًا ودعم عربي كامل من اليمين إلى اليسار، قيد التطوير النشط. تابع الاستوديو لأخبار فتح الغرف.",
    },
    link: { href: "/games/arrab", label: { en: "Arrab game page", ar: "صفحة لعبة العرّاب" } },
  },
  {
    date: null,
    dateLabel: { en: "In development", ar: "قيد التطوير" },
    kind: "development",
    title: { en: "Power of Bombs in development", ar: "باور أوف بومبز قيد التطوير" },
    body: {
      en: "Power of Bombs, a top-down action arcade game built in Unreal Engine, is in development for web and PC.",
      ar: "باور أوف بومبز، لعبة أركيد أكشن من منظور علوي مبنية على Unreal Engine، قيد التطوير للويب والحاسوب.",
    },
    link: { href: "/games/power-of-bombs", label: { en: "Power of Bombs game page", ar: "صفحة لعبة باور أوف بومبز" } },
  },
  {
    date: "2018-10-01",
    kind: "milestone",
    title: { en: "Buried Games Studio founded", ar: "تأسيس استوديو بريد جيمز" },
    body: {
      en: "Buried Games Studio is founded by Fahed Alahmad as an independent games studio serving Kuwait and the GCC, with roots in the capstone game Gathered by the Light.",
      ar: "تأسس استوديو بريد جيمز على يد فهد الأحمد كاستوديو ألعاب مستقل يخدم الكويت والخليج، بجذور في لعبة التخرج مجتمعون بالنور.",
    },
    link: { href: "/games/gathered-by-the-light", label: { en: "Gathered by the Light, our origins", ar: "مجتمعون بالنور، جذورنا" } },
  },
];

/** Devlog uploads become dated timeline entries automatically. */
const devlogEntries: ReleaseEntry[] = devlogPosts.map((post) => ({
  date: post.publishedAt.slice(0, 10),
  kind: "devlog",
  title: post.title,
  body: post.description,
  link: { href: `/devlog/${post.slug}`, label: { en: "Read the devlog", ar: "اقرأ مدونة التطوير" } },
}));

/**
 * Final timeline, newest first. Entries without a verified date (live/in-dev games)
 * sort to the top as current state, ahead of the dated history.
 */
export const releaseTimeline: ReleaseEntry[] = [...manualEntries, ...devlogEntries].sort((a, b) => {
  if (a.date === null && b.date === null) return 0;
  if (a.date === null) return -1;
  if (b.date === null) return 1;
  return b.date.localeCompare(a.date);
});
