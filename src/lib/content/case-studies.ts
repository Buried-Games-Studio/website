import type { Locale } from "@/lib/i18n";

/**
 * Typed content for /case-studies — outcome-focused project write-ups, the
 * most citable format for both search and AI assistants (GEO). Every fact
 * must be real and verifiable: no invented budgets, timelines, or metrics.
 * Studio titles qualify alongside client work; client case studies need the
 * client's sign-off before publishing.
 *
 * Like the other content modules, entries here are automatically advertised
 * in sitemap.ts and /llms.txt.
 */
type Localized = { en: string; ar: string };

export type CaseStudySection = {
  heading: Localized;
  /** Each entry is one paragraph. */
  body: Localized[];
};

export type CaseStudyFact = {
  label: Localized;
  value: Localized;
};

export type CaseStudy = {
  slug: string;
  /** Latin name kept for schema alternateName on Arabic pages. */
  latinName: string;
  metaTitle: Localized;
  metaDescription: Localized;
  /** Visible H1 + breadcrumb. */
  title: Localized;
  /** Card blurb on the index page. */
  summary: Localized;
  intro: Localized;
  /** Sidebar facts: client, engine, platform, release, services. */
  facts: CaseStudyFact[];
  sections: CaseStudySection[];
  /** Related links rendered at the end (game page, store page, service). */
  related: Array<{ href: string; label: Localized; external?: boolean }>;
  /** ISO date for schema datePublished (the project's public release). */
  datePublished?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "koutq8-digital-kout-card-game",
    latinName: "KoutQ8",
    metaTitle: {
      en: "Case Study: KoutQ8 — Taking Kuwait's Favourite Card Game Digital | Buried Games",
      ar: "دراسة حالة: كوت كويت — نقل لعبة الورق المفضلة في الكويت إلى الرقمية | بريد جيمز",
    },
    metaDescription: {
      en: "How Buried Games Studio built KoutQ8: a faithful Unity adaptation of Kout, the Gulf's most-played card game — real-time online multiplayer, an AI partner that bids and coordinates, and an App Store launch.",
      ar: "كيف بنى استوديو بريد جيمز لعبة كوت كويت: نسخة أمينة بمحرك Unity من الكوت، أكثر ألعاب الورق لعبًا في الخليج — لعب جماعي مباشر عبر الإنترنت وذكاء اصطناعي يزايد وينسّق، وإطلاق على App Store.",
    },
    title: {
      en: "KoutQ8: taking Kuwait's favourite card game digital",
      ar: "كوت كويت: نقل لعبة الورق المفضلة في الكويت إلى العالم الرقمي",
    },
    summary: {
      en: "A faithful Unity adaptation of Kout — real-time multiplayer, a genuinely capable AI partner, and a free App Store release.",
      ar: "نسخة أمينة بمحرك Unity من الكوت — لعب جماعي مباشر، وشريك ذكاء اصطناعي بارع فعلًا، وإصدار مجاني على App Store.",
    },
    intro: {
      en: "Kout (الكوت) is a fixture of Kuwaiti diwaniyas and family gatherings — a four-player, two-against-two game of bidding and trick-taking. Yet a faithful, well-built digital version was surprisingly hard to find. KoutQ8 is how we filled that gap: the traditional Kuwaiti card game, reimagined for the phone without losing what makes it social.",
      ar: "الكوت ركن ثابت في دواوين الكويت وتجمعات العائلة — لعبة لأربعة لاعبين، فريقان اثنان ضد اثنين، تقوم على المزايدة وجمع الأكلات. ومع ذلك كان من المفاجئ صعوبة العثور على نسخة رقمية أمينة ومتقنة. كوت كويت هي طريقتنا لسدّ هذه الفجوة: لعبة الورق الكويتية التقليدية، معاد تخيّلها للهاتف من دون أن تفقد ما يجعلها اجتماعية.",
    },
    facts: [
      {
        label: { en: "Project type", ar: "نوع المشروع" },
        value: { en: "Studio title", ar: "عنوان من الاستوديو" },
      },
      {
        label: { en: "Engine", ar: "المحرك" },
        value: { en: "Unity", ar: "Unity" },
      },
      {
        label: { en: "Platform", ar: "المنصة" },
        value: { en: "iOS (App Store, free)", ar: "iOS (متجر التطبيقات، مجانًا)" },
      },
      {
        label: { en: "Released", ar: "تاريخ الإصدار" },
        value: { en: "June 2025", ar: "يونيو 2025" },
      },
      {
        label: { en: "Scope", ar: "النطاق" },
        value: {
          en: "Game design · AI · online multiplayer · UI · launch",
          ar: "تصميم اللعبة · ذكاء اصطناعي · لعب جماعي عبر الإنترنت · واجهة · إطلاق",
        },
      },
    ],
    sections: [
      {
        heading: { en: "The challenge", ar: "التحدي" },
        body: [
          {
            en: "Kout is one of the most-played card games in Kuwait, but it needs four people at one table — and the existing digital options didn't do the game justice. The brief we set ourselves: preserve the feel of a real majlis round (partnership, bidding, table talk through play) while removing the need for four people in one room.",
            ar: "الكوت من أكثر ألعاب الورق لعبًا في الكويت، لكنها تحتاج أربعة أشخاص على طاولة واحدة — والخيارات الرقمية الموجودة لم تُنصف اللعبة. المهمة التي حددناها لأنفسنا: الحفاظ على إحساس جولة المجلس الحقيقية (الشراكة والمزايدة والتفاهم عبر أسلوب اللعب) مع إزالة الحاجة إلى أربعة أشخاص في غرفة واحدة.",
          },
          {
            en: "The hardest problem was the AI. A trick-taking partnership game is difficult to model well: a good AI partner has to bid sensibly and play in coordination with you — signalling through the order it plays — not just make legal moves.",
            ar: "أصعب مشكلة كانت الذكاء الاصطناعي. لعبة شراكة قائمة على جمع الأكلات يصعب نمذجتها جيدًا: الشريك الذكي عليه أن يزايد بحكمة ويلعب بتنسيق معك — مُشيرًا عبر ترتيب لعبه — لا أن يكتفي بحركات قانونية.",
          },
        ],
      },
      {
        heading: { en: "What we built", ar: "ما بنيناه" },
        body: [
          {
            en: "We built KoutQ8 in Unity with smooth online multiplayer, an AI partner and opponents capable enough to practise against, leaderboards and stats, and a touch-first interface. Pacing, scoring, and dealing are handled automatically, so newcomers learn by playing while veterans focus on strategy — counting cards, reading partners, bidding accurately.",
            ar: "بنينا كوت كويت بمحرك Unity مع لعب جماعي سلس عبر الإنترنت، وشريك وخصوم ذكاء اصطناعي بمستوى يكفي للتمرن، ولوحات صدارة وإحصائيات، وواجهة تعتمد اللمس أولًا. الإيقاع والنقاط والتوزيع تُدار تلقائيًا، فيتعلم الجدد باللعب بينما يركّز المتمرسون على الاستراتيجية — عدّ الأوراق وقراءة الشريك والمزايدة بدقة.",
          },
          {
            en: "Everything is bilingual and culturally grounded: this is a game whose home is Kuwait and the Gulf, and the product treats that as a feature, not an afterthought.",
            ar: "كل شيء ثنائي اللغة ومتجذر ثقافيًا: هذه لعبة موطنها الكويت والخليج، والمنتج يتعامل مع ذلك كميزة لا كفكرة لاحقة.",
          },
        ],
      },
      {
        heading: { en: "The outcome", ar: "النتيجة" },
        body: [
          {
            en: "KoutQ8 shipped on the App Store in June 2025 as a free download — a release players can pick up whenever they want a round, against people or against the machine. It's the definitive digital Kout experience, and the clearest demonstration of what we do: real-time multiplayer, game AI, and Arabic-first product craft, end to end.",
            ar: "أُطلقت كوت كويت على App Store في يونيو 2025 كتنزيل مجاني — إصدار يفتحه اللاعبون متى أرادوا جولة، ضد أشخاص أو ضد الآلة. إنها تجربة الكوت الرقمية النهائية، وأوضح برهان على ما نقوم به: لعب جماعي في الوقت الفعلي، وذكاء اصطناعي للألعاب، وحِرفية منتج بالعربية أولًا، من البداية إلى النهاية.",
          },
        ],
      },
    ],
    related: [
      {
        href: "/games/koutq8",
        label: { en: "KoutQ8 game page", ar: "صفحة لعبة كوت كويت" },
      },
      {
        href: "https://apps.apple.com/app/id6738164175",
        label: { en: "KoutQ8 on the App Store", ar: "كوت كويت على App Store" },
        external: true,
      },
      {
        href: "/services/game-development",
        label: { en: "Our game development service", ar: "خدمة تطوير الألعاب لدينا" },
      },
    ],
    datePublished: "2025-06-10",
  },
];

export const caseStudySlugs = caseStudies.map((cs) => cs.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/** Shared UI strings for the case-studies pages. */
export const caseStudiesUi: Record<
  Locale,
  {
    breadcrumbHome: string;
    breadcrumbIndex: string;
    indexEyebrow: string;
    indexTitle: string;
    indexIntro: string;
    factsTitle: string;
    relatedTitle: string;
    ctaTitle: string;
    ctaBody: string;
    contactCta: string;
    whatsappCta: string;
    readCta: string;
  }
> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbIndex: "Case Studies",
    indexEyebrow: "Case Studies",
    indexTitle: "Case studies",
    indexIntro:
      "Real projects, real outcomes — how we design, build, and ship games and interactive products for Kuwait and the GCC.",
    factsTitle: "At a glance",
    relatedTitle: "Related",
    ctaTitle: "Have a project like this?",
    ctaBody:
      "Tell us what you want to build. We'll reply within one business day with an honest read on scope and approach.",
    contactCta: "Start a project",
    whatsappCta: "Chat on WhatsApp",
    readCta: "Read the case study",
  },
  ar: {
    breadcrumbHome: "الرئيسية",
    breadcrumbIndex: "دراسات الحالة",
    indexEyebrow: "دراسات الحالة",
    indexTitle: "دراسات الحالة",
    indexIntro:
      "مشاريع حقيقية ونتائج حقيقية — كيف نصمم ونبني ونطلق ألعابًا ومنتجات تفاعلية للكويت والخليج.",
    factsTitle: "لمحة سريعة",
    relatedTitle: "روابط ذات صلة",
    ctaTitle: "لديك مشروع مشابه؟",
    ctaBody:
      "أخبرنا بما تريد بناءه. سنرد خلال يوم عمل واحد بقراءة صادقة للنطاق والنهج.",
    contactCta: "ابدأ مشروعك",
    whatsappCta: "تواصل عبر واتساب",
    readCta: "اقرأ دراسة الحالة",
  },
};
