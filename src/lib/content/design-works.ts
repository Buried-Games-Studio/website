import type { Locale } from "@/lib/i18n";

/**
 * Typed content for /design-works — a showcase of design pieces by the
 * studio's Creative Director, Bokhari Hamid.
 *
 * Framing rule (owner requirement): every piece is credited to Bokhari with
 * his studio title — work by a member of our team, shared under the studio
 * umbrella. Never present a piece as a Buried Games production, and never as
 * outsourced/vendor work. Only real, verifiable pieces are published (same
 * truthfulness rule as case-studies); pieces made for third parties need
 * display permission and are described by discipline, not claimed as studio
 * projects.
 *
 * Like the other content modules, entries here are automatically advertised
 * in sitemap.ts and /llms.txt — but only once the first real works land:
 * while `designWorks` is empty the routes 404 and every wiring point stays
 * silent (see hasDesignWorks).
 */

type Localized = { en: string; ar: string };

export const DESIGN_WORKS_PATH = "/design-works";

export type DesignWorkSection = {
  heading: Localized;
  /** Each entry is one paragraph. */
  body: Localized[];
};

export type DesignWork = {
  slug: string;
  /** Latin name kept for schema alternateName on Arabic pages. */
  latinName: string;
  /** Schema @type — VisualArtwork suits visual pieces; CreativeWork for the rest. */
  schemaType?: "VisualArtwork" | "CreativeWork";
  metaTitle: Localized;
  metaDescription: Localized;
  /** Visible H1 + breadcrumb. */
  title: Localized;
  /** Card blurb on the index page (also the /llms.txt line). */
  summary: Localized;
  intro: Localized;
  /** Discipline tags: concept art, character design, branding, game UI … */
  discipline: Localized[];
  /** Locale-neutral tool names (Photoshop, Blender, Figma …). */
  tools?: string[];
  /** Year the piece was created — schema dateCreated. */
  year?: string;
  /** ISO date the piece was published here — schema datePublished + sitemap lastModified. */
  datePublished?: string;
  /** Cover image: hub card + OG image. Absolute assets.buriedgames.com URL. */
  heroImage: string;
  heroImageHint: Localized;
  gallery: Array<{ url: string; hint: Localized }>;
  /** Optional write-up (brief, process, outcome). */
  sections?: DesignWorkSection[];
  related?: Array<{ href: string; label: Localized; external?: boolean }>;
  /** Team member id from team.ts; defaults to 'bokhari'. */
  authorId?: string;
};

const WORKS_ASSETS = "https://assets.buriedgames.com/images/design-works";

export const designWorks: DesignWork[] = [
  // To publish a work Bokhari sends:
  // 1. Upload images to R2: images/design-works/<slug>/cover.<ext> plus
  //    images/design-works/<slug>/gallery-01.<ext>, -02, …
  // 2. Add a DesignWork entry here (EN + AR for every Localized field).
  // The section, sitemap, llms.txt, and footer link all go live automatically
  // with the first entry (hasDesignWorks gate). No placeholder entries, ever.
  {
    slug: "arrab-godfather-character-art",
    latinName: "Arrab — The Godfather",
    metaTitle: {
      en: "The Godfather of Arrab — Character Art Process by Bokhari Hamid",
      ar: "العرّاب في لعبة عراب — مراحل رسم الشخصية بريشة بوخاري حامد",
    },
    metaDescription: {
      en: "Six stages from pencil sketch to final painted portrait: how Bokhari Hamid, Creative Director at Buried Games, painted the Godfather character for Arrab, the studio's social-deduction game.",
      ar: "ست مراحل من الرسم التخطيطي إلى اللوحة النهائية: كيف رسم بوخاري حامد، المدير الإبداعي في بريد جيمز، شخصية العرّاب للعبة عراب، لعبة الاستوديو في الخداع الاجتماعي.",
    },
    title: {
      en: "The Godfather of Arrab",
      ar: "العرّاب في لعبة عراب",
    },
    summary: {
      en: "A six-stage process breakdown — pencil sketch, value pass, color blockout, lighting, refinement, and the final painted portrait of Arrab's Godfather.",
      ar: "تفصيل لست مراحل — التخطيط، فقيم الظل، فالألوان الأساسية، فالإضاءة، فالصقل، وصولًا إلى اللوحة النهائية لشخصية العرّاب.",
    },
    intro: {
      en: "Arrab is our social-deduction game, and the Godfather is the role the whole table revolves around. Bokhari painted the character's portrait and kept every stage of the process — from the first pencil lines to the finished piece — a rare look at how a character goes from idea to presence.",
      ar: "عراب لعبتنا في الخداع الاجتماعي، والعرّاب هو الدور الذي تدور حوله الطاولة كلها. رسم بوخاري بورتريه الشخصية واحتفظ بكل مرحلة من مراحل العمل — من أول خطوط الرصاص إلى اللوحة المكتملة — نظرة نادرة على تحوّل الشخصية من فكرة إلى حضور.",
    },
    discipline: [
      { en: "Character Design", ar: "تصميم شخصيات" },
      { en: "Digital Painting", ar: "رسم رقمي" },
      { en: "Concept Art", ar: "فن مفاهيمي" },
    ],
    year: "2026",
    datePublished: "2026-07-18",
    heroImage: `${WORKS_ASSETS}/arrab-godfather-character-art/cover.jpg`,
    heroImageHint: {
      en: "The Godfather of Arrab — final painted portrait",
      ar: "العرّاب في لعبة عراب — اللوحة النهائية",
    },
    gallery: [
      {
        url: `${WORKS_ASSETS}/arrab-godfather-character-art/gallery-01.jpg`,
        hint: { en: "Stage 1 — pencil line sketch", ar: "المرحلة 1 — التخطيط بالخطوط" },
      },
      {
        url: `${WORKS_ASSETS}/arrab-godfather-character-art/gallery-02.jpg`,
        hint: { en: "Stage 2 — value and shadow pass", ar: "المرحلة 2 — قيم الضوء والظل" },
      },
      {
        url: `${WORKS_ASSETS}/arrab-godfather-character-art/gallery-03.jpg`,
        hint: { en: "Stage 3 — first color blockout", ar: "المرحلة 3 — الألوان الأساسية" },
      },
      {
        url: `${WORKS_ASSETS}/arrab-godfather-character-art/gallery-04.jpg`,
        hint: { en: "Stage 4 — lighting pass", ar: "المرحلة 4 — تمرير الإضاءة" },
      },
      {
        url: `${WORKS_ASSETS}/arrab-godfather-character-art/gallery-05.jpg`,
        hint: { en: "Stage 5 — refined rendering", ar: "المرحلة 5 — الصقل والتفاصيل" },
      },
      {
        url: `${WORKS_ASSETS}/arrab-godfather-character-art/gallery-06.jpg`,
        hint: { en: "Stage 6 — the final portrait", ar: "المرحلة 6 — اللوحة النهائية" },
      },
    ],
    sections: [
      {
        heading: { en: "Six passes, one character", ar: "ست مراحل، شخصية واحدة" },
        body: [
          {
            en: "The portrait was built in layered passes: a pencil sketch to lock the pose and attitude, a sepia value pass for light and shadow, a flat color blockout, then lighting, refinement, and the final rendering with the suit's embroidery, the quilted cloak, and the smoke.",
            ar: "بُنيت اللوحة عبر طبقات متتابعة: تخطيط بالرصاص لتثبيت الوضعية والحضور، ثم تمرير قيم بلون بني لتحديد الضوء والظل، فألوان أساسية مسطحة، تليها الإضاءة والصقل، وصولًا إلى المعالجة النهائية بتطريز البدلة والعباءة المبطّنة والدخان.",
          },
          {
            en: "The character had to read as authority without a single word — the cane, the cigar, and the yellow quilted cloak carry the weight of the role inside the game.",
            ar: "كان على الشخصية أن توحي بالهيبة دون كلمة واحدة — فالعصا والسيجار والعباءة الصفراء المبطّنة تحمل ثقل الدور داخل اللعبة.",
          },
        ],
      },
    ],
    related: [
      {
        href: "/games/arrab",
        label: { en: "Arrab game page", ar: "صفحة لعبة عراب" },
      },
      {
        href: "/services/game-art-design",
        label: { en: "Our 2D/3D art & animation service", ar: "خدمة الفن والتحريك 2D/3D لدينا" },
      },
    ],
  },
  {
    slug: "unicef-elearning-games",
    latinName: "UNICEF E-learning Games",
    metaTitle: {
      en: "UNICEF E-learning Games — Educational Game Art & UI by Bokhari Hamid",
      ar: "ألعاب اليونيسف التعليمية — فن ألعاب وواجهات بتصميم بوخاري حامد",
    },
    metaDescription: {
      en: "Educational game art from a series of UNICEF e-learning games: Gulf-inspired kid characters, letter planets, classroom mini-games, and a complete Arabic game UI — design work by Bokhari Hamid, Creative Director at Buried Games.",
      ar: "فن ألعاب تعليمية من سلسلة ألعاب اليونيسف الرقمية: شخصيات أطفال بطابع خليجي، وكواكب الحروف، وألعاب صفّية مصغرة، وواجهة لعبة عربية متكاملة — من تصميم بوخاري حامد، المدير الإبداعي في بريد جيمز.",
    },
    title: {
      en: "UNICEF E-learning Games",
      ar: "ألعاب اليونيسف التعليمية",
    },
    summary: {
      en: "Characters, letter planets, backgrounds, and a full Arabic game UI from a series of e-learning games made in collaboration with UNICEF, covering several years of school curricula.",
      ar: "شخصيات وكواكب حروف وخلفيات وواجهة لعبة عربية كاملة من سلسلة ألعاب تعليمية نُفّذت بالتعاون مع منظمة اليونيسف، تغطي عدة سنوات من المناهج الدراسية.",
    },
    intro: {
      en: "A series of digital learning games produced in collaboration with UNICEF, covering several years of school curricula for children. Bokhari worked across the full art production — illustration, character design, backgrounds, and the complete Arabic-first game UI — keeping one consistent visual identity across every game in the set.",
      ar: "سلسلة ألعاب تعليمية رقمية نُفّذت بالتعاون مع منظمة اليونيسف، تغطي عدة سنوات من المناهج الدراسية للأطفال. عمل بوخاري على الإنتاج الفني الكامل — الرسوم، وتصميم الشخصيات، والخلفيات، وواجهة اللعبة العربية المتكاملة — مع الحفاظ على هوية بصرية متسقة عبر جميع ألعاب السلسلة.",
    },
    discipline: [
      { en: "2D Game Art", ar: "فن ألعاب ثنائي الأبعاد" },
      { en: "Character Design", ar: "تصميم شخصيات" },
      { en: "Game UI", ar: "واجهات ألعاب" },
    ],
    datePublished: "2026-07-18",
    heroImage: `${WORKS_ASSETS}/unicef-elearning-games/cover.jpg`,
    heroImageHint: {
      en: "UNICEF Games key art — a stylized valley",
      ar: "الرسم الرئيسي لألعاب اليونيسف — وادٍ بأسلوب فني مبسط",
    },
    gallery: [
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-01.jpg`,
        hint: { en: "Playable characters — a girl and a boy in Gulf dress", ar: "الشخصيات القابلة للعب — بنت وولد بالزي الخليجي" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-02.jpg`,
        hint: { en: "Color explorations for the girl character", ar: "تجارب ألوان لشخصية البنت" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-03.jpg`,
        hint: { en: "The full Arabic UI kit — buttons, dialogs, and HUD", ar: "طقم الواجهة العربية الكامل — أزرار ونوافذ وعناصر الشاشة" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-04.png`,
        hint: { en: "Letter planets — level worlds for the Arabic curriculum", ar: "كواكب الحروف — عوالم المراحل لمنهج اللغة العربية" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-05.png`,
        hint: { en: "A letter planet up close", ar: "كوكب حروف عن قرب" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-06.png`,
        hint: { en: "Environment art — forest stages and level scenes", ar: "فن البيئات — مراحل الغابة ومشاهد المستويات" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-07.png`,
        hint: { en: "Math mini-game screens", ar: "شاشات ألعاب الرياضيات المصغرة" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-08.jpg`,
        hint: { en: "World-map planet with the level path", ar: "كوكب خريطة العالم مع مسار المراحل" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-09.png`,
        hint: { en: "In-game dialog with the two characters", ar: "حوار داخل اللعبة مع الشخصيتين" },
      },
      {
        url: `${WORKS_ASSETS}/unicef-elearning-games/gallery-10.jpg`,
        hint: { en: "Multiplication mini-game screen", ar: "شاشة لعبة الضرب المصغرة" },
      },
    ],
    sections: [
      {
        heading: { en: "What the work covered", ar: "ما شمله العمل" },
        body: [
          {
            en: "The project called for complete art production across a set of games: illustrations, character design, backgrounds, animation, and user interfaces. The characters were designed to feel local to the region — a girl and a boy in Gulf dress, explored across multiple color variants — while the letter planets and classroom scenes gave each curriculum year its own world.",
            ar: "تطلّب المشروع إنتاجًا فنيًا كاملًا عبر مجموعة من الألعاب: الرسوم، وتصميم الشخصيات، والخلفيات، والأنيميشن، وواجهات المستخدم. صُممت الشخصيات لتحمل ملامح المنطقة — بنت وولد بالزي الخليجي مع تجارب ألوان متعددة — بينما منحت كواكب الحروف ومشاهد الصف كل سنة دراسية عالمها الخاص.",
          },
          {
            en: "The UI was built Arabic-first: a full kit of buttons, dialogs, progress elements, and feedback screens that stays readable and playful for children, and consistent from game to game across the series.",
            ar: "بُنيت الواجهة بالعربية أولًا: طقم كامل من الأزرار والنوافذ وعناصر التقدم وشاشات التقييم، يبقى واضحًا وممتعًا للأطفال، ومتسقًا من لعبة إلى أخرى عبر السلسلة.",
          },
        ],
      },
    ],
    related: [
      {
        href: "/services/game-art-design",
        label: { en: "Our 2D/3D art & animation service", ar: "خدمة الفن والتحريك 2D/3D لدينا" },
      },
    ],
  },
  {
    slug: "salamander-board-game",
    latinName: "Salamander",
    metaTitle: {
      en: "Salamander Board Game — Creature & Game Art by Bokhari Hamid",
      ar: "لعبة سالاماندر اللوحية — فن المخلوقات واللعبة بتصميم بوخاري حامد",
    },
    metaDescription: {
      en: "Complete art production for the board game Salamander: creature designs from egg to adult, grass, water, and lava arena boards, an island world, and the game's interface art — by Bokhari Hamid, Creative Director at Buried Games.",
      ar: "إنتاج فني كامل للعبة سالاماندر اللوحية: تصميم المخلوقات من البيضة إلى البلوغ، وساحات العشب والماء والحمم، وجزيرة اللعبة، وفن الواجهات — من تصميم بوخاري حامد، المدير الإبداعي في بريد جيمز.",
    },
    title: {
      en: "Salamander Board Game",
      ar: "لعبة سالاماندر اللوحية",
    },
    summary: {
      en: "Complete art production for the board game Salamander — creature designs, arena boards, the island world, and interface art under one unified style.",
      ar: "إنتاج فني كامل للعبة سالاماندر اللوحية — تصميم المخلوقات، وساحات اللعب، وجزيرة اللعبة، وفن الواجهات وفق أسلوب موحد.",
    },
    intro: {
      en: "Salamander is a board game centered on salamander broods — eggs, hatchlings, and grown salamanders — across grass, water, and lava arenas. Bokhari delivered the complete art production: the creatures and their elemental variants, the arena boards and island world, and the game's full interface art, all under one unified visual direction.",
      ar: "سالاماندر لعبة لوحية تدور حول صغار السالاماندر — من البيض إلى الفقس والبلوغ — عبر ساحات العشب والماء والحمم. نفّذ بوخاري الإنتاج الفني الكامل: المخلوقات وتنويعاتها العنصرية، وساحات اللعب وجزيرة اللعبة، وفن الواجهات بالكامل، وفق رؤية فنية موحدة.",
    },
    discipline: [
      { en: "Character Design", ar: "تصميم شخصيات" },
      { en: "Board Game Art", ar: "فن ألعاب لوحية" },
      { en: "Game UI", ar: "واجهات ألعاب" },
    ],
    datePublished: "2026-07-18",
    heroImage: `${WORKS_ASSETS}/salamander-board-game/cover.jpg`,
    heroImageHint: {
      en: "Salamander key art — the spotted eggs",
      ar: "الرسم الرئيسي للعبة سالاماندر — البيض المرقّط",
    },
    gallery: [
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-01.png`,
        hint: { en: "An adult salamander with its hatchling", ar: "سالاماندر بالغ مع صغيره" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-02.png`,
        hint: { en: "Water salamanders — concept sheet", ar: "سالاماندر الماء — لوحة تصميم" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-03.png`,
        hint: { en: "Grass salamanders — concept sheet", ar: "سالاماندر العشب — لوحة تصميم" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-04.png`,
        hint: { en: "Fire salamanders on lava crystals", ar: "سالاماندر النار على بلورات الحمم" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-05.jpg`,
        hint: { en: "The hatching scene", ar: "مشهد الفقس" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-06.png`,
        hint: { en: "The island world", ar: "جزيرة اللعبة" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-07.png`,
        hint: { en: "Grass arena board", ar: "ساحة العشب" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-08.png`,
        hint: { en: "Water arena board", ar: "ساحة الماء" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-09.png`,
        hint: { en: "Lava arena board", ar: "ساحة الحمم" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-10.jpg`,
        hint: { en: "Interface screens — menus and in-game", ar: "شاشات الواجهة — القوائم وداخل اللعب" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-11.png`,
        hint: { en: "“Hatchling” event card", ar: "بطاقة حدث «الفقس»" },
      },
      {
        url: `${WORKS_ASSETS}/salamander-board-game/gallery-12.png`,
        hint: { en: "“Consumed” event card", ar: "بطاقة حدث «الالتهام»" },
      },
    ],
    sections: [
      {
        heading: { en: "What the work covered", ar: "ما شمله العمل" },
        body: [
          {
            en: "The brief was the game's entire visual layer: character design, backgrounds, maps, and user interfaces, plus every supporting visual element the project needed. The salamanders were designed as a family — eggs, hatchlings, and adults, each with grass, water, and fire variants that match the arena they live in.",
            ar: "كان المطلوب هو الطبقة البصرية الكاملة للعبة: تصميم الشخصيات، والخلفيات، والخرائط، وواجهات المستخدم، إضافة إلى كل عنصر بصري يحتاجه المشروع. صُممت مخلوقات السالاماندر كعائلة واحدة — بيض وصغار وبالغون، لكل منها تنويعات العشب والماء والنار بما يطابق ساحتها.",
          },
          {
            en: "One unified art direction ties it together — from the hand-painted arena boards and the island world to the event cards and menu screens — so the game reads as one world on the table.",
            ar: "رؤية فنية موحدة تجمع كل ذلك — من ساحات اللعب المرسومة يدويًا وجزيرة اللعبة إلى بطاقات الأحداث وشاشات القوائم — لتظهر اللعبة كعالم واحد على الطاولة.",
          },
        ],
      },
    ],
    related: [
      {
        href: "/services/game-art-design",
        label: { en: "Our 2D/3D art & animation service", ar: "خدمة الفن والتحريك 2D/3D لدينا" },
      },
    ],
  },
];

export const designWorkSlugs = designWorks.map((work) => work.slug);

export function getDesignWork(slug: string): DesignWork | undefined {
  return designWorks.find((work) => work.slug === slug);
}

/**
 * Gate for the whole section: while no real works exist the routes 404 and
 * sitemap / llms.txt / footer stay silent, so nothing thin or empty ships.
 */
export function hasDesignWorks(): boolean {
  return designWorks.length > 0;
}

/** Shared UI strings for the design-works pages. */
export const designWorksUi: Record<
  Locale,
  {
    breadcrumbHome: string;
    breadcrumbIndex: string;
    indexEyebrow: string;
    indexTitle: string;
    indexIntro: string;
    serviceCtaLabel: string;
    byPrefix: string;
    studioName: string;
    factsTitle: string;
    designedByLabel: string;
    disciplineLabel: string;
    toolsLabel: string;
    yearLabel: string;
    galleryTitle: string;
    relatedTitle: string;
    ctaTitle: string;
    ctaBody: string;
    contactCta: string;
    whatsappCta: string;
    viewCta: string;
  }
> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbIndex: "Design Works",
    indexEyebrow: "Design works",
    indexTitle: "Design work by our Creative Director",
    indexIntro:
      "A showcase of design work by Bokhari Hamid, Creative Director at Buried Games. From concept art and character design to branding and game UI, these pieces are his own craft — shared here as part of our team's portfolio.",
    serviceCtaLabel: "Explore our 2D/3D art & animation service",
    byPrefix: "By",
    studioName: "Buried Games",
    factsTitle: "At a glance",
    designedByLabel: "Designed by",
    disciplineLabel: "Discipline",
    toolsLabel: "Tools",
    yearLabel: "Year",
    galleryTitle: "Gallery",
    relatedTitle: "Related",
    ctaTitle: "Want this level of design in your game?",
    ctaBody:
      "The same creative direction behind these pieces goes into every client project we take on across Kuwait and the GCC. Tell us what you're building.",
    contactCta: "Start a project",
    whatsappCta: "Chat on WhatsApp",
    viewCta: "View work",
  },
  ar: {
    breadcrumbHome: "الرئيسية",
    breadcrumbIndex: "أعمال التصميم",
    indexEyebrow: "أعمال التصميم",
    indexTitle: "أعمال تصميم مديرنا الإبداعي",
    indexIntro:
      "معرض لأعمال التصميم التي أبدعها بوخاري حامد، المدير الإبداعي في بريد جيمز. من الفن المفاهيمي وتصميم الشخصيات إلى الهوية البصرية وواجهات الألعاب — هذه الأعمال من صنعه، نعرضها هنا ضمن أعمال فريقنا.",
    serviceCtaLabel: "استكشف خدمة الفن والتحريك 2D/3D لدينا",
    byPrefix: "من تصميم",
    studioName: "بريد جيمز",
    factsTitle: "لمحة سريعة",
    designedByLabel: "التصميم",
    disciplineLabel: "التخصص",
    toolsLabel: "الأدوات",
    yearLabel: "السنة",
    galleryTitle: "المعرض",
    relatedTitle: "روابط ذات صلة",
    ctaTitle: "تريد هذا المستوى من التصميم في لعبتك؟",
    ctaBody:
      "نفس الرؤية الإبداعية وراء هذه الأعمال تدخل في كل مشروع ننفذه لعملائنا في الكويت والخليج. أخبرنا بما تبنيه.",
    contactCta: "ابدأ مشروعك",
    whatsappCta: "تواصل عبر واتساب",
    viewCta: "عرض العمل",
  },
};
