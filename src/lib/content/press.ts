import type { Locale } from "@/lib/i18n";
import { assets } from "@/lib/assets";
import { gamesContent } from "@/lib/content/games";

/**
 * Data-driven content for the /press page (studio press kit). Everything here is
 * either a verifiable fact (founding year 2018 from the Organization schema's
 * foundingDate 2018-10-01, founder Fahed Alahmad, the real social profiles, the
 * brand colours from globals.css) or copy reused from existing content modules.
 *
 * LEGAL RULE: the boilerplate NEVER asserts a place of establishment, registration,
 * or physical location. It frames the studio by its service area (Kuwait & the GCC)
 * and its work — no "based in", no "مقره الكويت".
 *
 * There is intentionally NO "press coverage / awards" section: no real coverage of
 * Buried Games could be verified from a live source, and inventing it is forbidden.
 * The orchestrator/owner can add a verified-coverage block here later.
 */

export type LocalizedText = Record<Locale, string>;

export interface PressDownload {
  /** Visible label per locale. */
  label: LocalizedText;
  /** Absolute asset URL (real file from src/lib/assets.ts). */
  href: string;
  /** Short type/format hint shown under the label, e.g. "PNG" / "WebP". */
  format: string;
}

export interface BrandColor {
  name: LocalizedText;
  hex: string;
  /** Human note on usage. */
  usage: LocalizedText;
}

export interface GameFactSheet {
  name: string;
  genre: LocalizedText;
  platforms: LocalizedText;
  status: LocalizedText;
  oneLiner: LocalizedText;
  logo: string;
  /** Locale-neutral route to the game detail page. */
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const pressContent = {
  metaTitle: {
    en: "Press Kit — Game Development for Kuwait & the GCC",
    ar: "الملف الصحفي — تطوير ألعاب للكويت والخليج",
  } satisfies LocalizedText,
  metaDescription: {
    en: "Official press kit for Buried Games Studio: studio boilerplate, founder, founding year, logo downloads, game fact sheets, brand colours, and press contact for journalists and partners covering game development across Kuwait and the GCC.",
    ar: "الملف الصحفي الرسمي لاستوديو بريد جيمز: نبذة عن الاستوديو، والمؤسس، وسنة التأسيس، وتنزيلات الشعار، وبطاقات تعريف الألعاب، وألوان العلامة، وجهة الاتصال الصحفي للصحفيين والشركاء الذين يغطون تطوير الألعاب في الكويت والخليج.",
  } satisfies LocalizedText,

  hero: {
    eyebrow: { en: "Press Kit", ar: "الملف الصحفي" } satisfies LocalizedText,
    title: { en: "Buried Games Studio Press Kit", ar: "الملف الصحفي لاستوديو بريد جيمز" } satisfies LocalizedText,
    subtitle: {
      en: "Everything journalists, partners, and storefronts need to write about us — studio facts, logos, game fact sheets, and brand assets, free to use with attribution.",
      ar: "كل ما يحتاجه الصحفيون والشركاء والمتاجر للكتابة عنا — حقائق الاستوديو والشعارات وبطاقات تعريف الألعاب وأصول العلامة، متاحة للاستخدام مع الإسناد.",
    } satisfies LocalizedText,
  },

  // Founding year is derived from the Organization schema's foundingDate (2018-10-01).
  facts: [
    { label: { en: "Studio", ar: "الاستوديو" }, value: { en: "Buried Games Studio", ar: "استوديو بريد جيمز" } },
    { label: { en: "Founder", ar: "المؤسس" }, value: { en: "Fahed Alahmad, Founder", ar: "فهد الأحمد، المؤسس" } },
    { label: { en: "Founded", ar: "سنة التأسيس" }, value: { en: "2018", ar: "2018" } },
    { label: { en: "Service area", ar: "نطاق الخدمة" }, value: { en: "Kuwait & the GCC", ar: "الكويت والخليج" } },
    { label: { en: "Focus", ar: "التخصص" }, value: { en: "Mobile, multiplayer & Unity game development", ar: "تطوير ألعاب الجوال والألعاب الجماعية وألعاب Unity" } },
    { label: { en: "Press contact", ar: "جهة الاتصال الصحفي" }, value: { en: "support@buriedgames.com", ar: "support@buriedgames.com" } },
  ] satisfies { label: LocalizedText; value: LocalizedText }[],

  boilerplate: {
    heading: { en: "Studio boilerplate", ar: "نبذة عن الاستوديو" } satisfies LocalizedText,
    shortHeading: { en: "Short (one line)", ar: "مختصرة (سطر واحد)" } satisfies LocalizedText,
    longHeading: { en: "Long", ar: "مطوّلة" } satisfies LocalizedText,
    short: {
      en: "Buried Games Studio is an independent GCC games studio building mobile, multiplayer, and Unity games for studios, brands, and players across Kuwait and the GCC.",
      ar: "استوديو بريد جيمز استوديو ألعاب مستقل في الخليج يبني ألعاب الجوال والألعاب الجماعية وألعاب Unity للاستوديوهات والعلامات التجارية واللاعبين في الكويت والخليج.",
    } satisfies LocalizedText,
    long: {
      en: "Founded in 2018 by Fahed Alahmad, Buried Games Studio is an independent games studio serving clients and players across Kuwait and the wider GCC. We design and develop games end to end — concept, art, engineering, multiplayer networking, QA, and launch — in Unity, Unreal Engine, and modern web technologies like Next.js. Every project is Arabic-first, with proper right-to-left interfaces alongside English. Our portfolio spans KoutQ8, a digital take on the traditional Kuwaiti card game Kout; Nabsh, a real-time multiplayer trivia game; Arrab, a social-deduction Mafia game; and original titles like Power of Bombs and Gathered by the Light. We pair regional understanding with global production standards to build games that feel native to Gulf players.",
      ar: "تأسس استوديو بريد جيمز عام 2018 على يد فهد الأحمد، وهو استوديو ألعاب مستقل يخدم العملاء واللاعبين في الكويت وعموم الخليج. نصمم ونطور الألعاب من الفكرة إلى الإطلاق — المفهوم والفن والبرمجة وشبكات اللعب الجماعي وضمان الجودة والإطلاق — على Unity وUnreal Engine وتقنيات الويب الحديثة مثل Next.js. كل مشروع عربي أولًا، بواجهات صحيحة من اليمين إلى اليسار إلى جانب الإنجليزية. تمتد أعمالنا من كوت، نسختنا الرقمية من لعبة الورق الكويتية التقليدية، إلى نبش، لعبة التريفيا الجماعية الفورية، والعرّاب، لعبة المافيا والخداع الاجتماعي، وألعاب أصلية مثل باور أوف بومبز ومجتمعون بالنور. نجمع بين الفهم الإقليمي ومعايير الإنتاج العالمية لنبني ألعابًا تبدو محلية للاعبي الخليج.",
    } satisfies LocalizedText,
  },

  logos: {
    heading: { en: "Logos & marks", ar: "الشعارات والعلامات" } satisfies LocalizedText,
    intro: {
      en: "Studio and game logos for editorial use. Please keep clear space around the mark and do not recolour or distort it.",
      ar: "شعارات الاستوديو والألعاب للاستخدام التحريري. يرجى ترك مساحة فارغة حول العلامة وعدم إعادة تلوينها أو تشويهها.",
    } satisfies LocalizedText,
    downloads: [
      { label: { en: "Buried Games logo (PNG)", ar: "شعار بريد جيمز (PNG)" }, href: assets.logo, format: "PNG" },
      { label: { en: "Buried Games logo (WebP)", ar: "شعار بريد جيمز (WebP)" }, href: assets.logoWebp, format: "WebP" },
      { label: { en: "KoutQ8 logo", ar: "شعار كوت" }, href: assets.koutq8Logo, format: "PNG" },
      { label: { en: "Nabsh logo", ar: "شعار نبش" }, href: assets.nabshLogo, format: "PNG" },
      { label: { en: "Arrab logo", ar: "شعار العرّاب" }, href: assets.arrabLogo, format: "PNG" },
      { label: { en: "Power of Bombs logo", ar: "شعار باور أوف بومبز" }, href: assets.powerOfBombsLogo, format: "PNG" },
      { label: { en: "Luna Fantasy logo", ar: "شعار لونا فانتازيا" }, href: assets.lunaFantasyLogo, format: "PNG" },
    ] satisfies PressDownload[],
  },

  colors: {
    heading: { en: "Brand colours", ar: "ألوان العلامة" } satisfies LocalizedText,
    intro: {
      en: "Our identity is built on a bold red against a deep black. Use red as the accent and black as the ground.",
      ar: "تقوم هويتنا على أحمر جريء على أسود عميق. استخدم الأحمر لونًا مميزًا والأسود أرضية.",
    } satisfies LocalizedText,
    // hex values match globals.css: --primary 0 100% 50% (#FF0000), --background 0 0% 0% (#000000).
    items: [
      { name: { en: "Buried Red", ar: "أحمر بريد" }, hex: "#FF0000", usage: { en: "Primary accent — highlights, buttons, links.", ar: "اللون المميز الأساسي — التمييزات والأزرار والروابط." } },
      { name: { en: "Buried Black", ar: "أسود بريد" }, hex: "#000000", usage: { en: "Background — the studio's signature dark canvas.", ar: "الخلفية — اللوحة الداكنة المميزة للاستوديو." } },
      { name: { en: "Signal Gold", ar: "ذهبي" }, hex: "#FFD400", usage: { en: "Secondary accent used sparingly for emphasis.", ar: "لون مميز ثانوي يُستخدم باعتدال للتأكيد." } },
    ] satisfies BrandColor[],
  },

  socials: {
    heading: { en: "Social channels", ar: "قنوات التواصل" } satisfies LocalizedText,
    intro: {
      en: "Follow the studio and link these official profiles when crediting us.",
      ar: "تابع الاستوديو واربط هذه الحسابات الرسمية عند إسناد العمل إلينا.",
    } satisfies LocalizedText,
    // Mirrors the Organization schema sameAs list in layout.tsx (verified profiles only).
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@buriedgames" },
      { label: "X (Twitter)", href: "https://twitter.com/buriedgames" },
      { label: "Instagram", href: "https://instagram.com/buriedgames" },
      { label: "LinkedIn", href: "https://linkedin.com/company/buriedgames" },
      { label: "GitHub", href: "https://github.com/Buried-Games-Studio" },
    ] satisfies SocialLink[],
  },

  gamesHeading: { en: "Game fact sheets", ar: "بطاقات تعريف الألعاب" } satisfies LocalizedText,
  gamesIntro: {
    en: "Quick-reference sheets for every title in our portfolio. Each game has a full page with screenshots and more detail.",
    ar: "بطاقات مرجعية سريعة لكل لعبة في أعمالنا. لكل لعبة صفحة كاملة بلقطات شاشة وتفاصيل أوفى.",
  } satisfies LocalizedText,

  contact: {
    heading: { en: "Press & partnership contact", ar: "الاتصال الصحفي والشراكات" } satisfies LocalizedText,
    body: {
      en: "For interviews, assets, review builds, or partnership enquiries, email us — we reply in English or Arabic.",
      ar: "للمقابلات أو الأصول أو نسخ المراجعة أو استفسارات الشراكة، راسلنا عبر البريد — نرد بالإنجليزية أو العربية.",
    } satisfies LocalizedText,
    email: "support@buriedgames.com",
  },
};

/* ─────────────────── game fact sheets, derived from games.ts ─────────────────── */

const STATUS_LABEL: Record<string, LocalizedText> = {
  released: { en: "Released", ar: "مُطلقة" },
  development: { en: "In development", ar: "قيد التطوير" },
  completed: { en: "Completed", ar: "مكتملة" },
};

const ONE_LINER: Record<string, LocalizedText> = {
  koutq8: {
    en: "A digital take on the traditional Kuwaiti card game Kout, with online multiplayer and AI partners — live on the App Store.",
    ar: "نسخة رقمية من لعبة الكوت الكويتية التقليدية، بلعب جماعي عبر الإنترنت وشركاء ذكاء اصطناعي — متاحة على App Store.",
  },
  nabsh: {
    en: "A real-time multiplayer trivia game with 50+ categories spanning Kuwaiti culture and global topics — live at nabsh.fun.",
    ar: "لعبة تريفيا جماعية فورية بأكثر من 50 فئة تمتد من الثقافة الكويتية إلى المواضيع العالمية — متاحة على nabsh.fun.",
  },
  arrab: {
    en: "A premium real-time social-deduction Mafia game with 11 roles and full Arabic RTL support.",
    ar: "لعبة مافيا وخداع اجتماعي فاخرة فورية بـ11 دورًا ودعم عربي كامل من اليمين إلى اليسار.",
  },
  "power-of-bombs": {
    en: "A top-down action arcade game built in Unreal Engine, with strategic levels and explosive power-ups.",
    ar: "لعبة أركيد أكشن من منظور علوي مبنية على Unreal Engine، بمستويات استراتيجية ومعززات قوة متفجرة.",
  },
  "luna-fantasy": {
    en: "A bilingual companion platform for a fantasy universe of 200+ characters and a strategic card game.",
    ar: "منصة مرافقة ثنائية اللغة لعالم خيالي يضم أكثر من 200 شخصية ولعبة بطاقات استراتيجية.",
  },
  "gathered-by-the-light": {
    en: "A hand-crafted pixel-art 2D platformer about a young moth's journey toward a mysterious light.",
    ar: "لعبة منصات ثنائية الأبعاد بفن البكسل عن رحلة فراشة صغيرة نحو ضوء غامض.",
  },
};

const LOGO: Record<string, string> = {
  koutq8: assets.koutq8Logo,
  nabsh: assets.nabshLogo,
  arrab: assets.arrabLogo,
  "power-of-bombs": assets.powerOfBombsLogo,
  "luna-fantasy": assets.lunaFantasyLogo,
  "gathered-by-the-light": "https://assets.buriedgames.com/images/games/gbtl/logo.png",
};

export const gameFactSheets: GameFactSheet[] = gamesContent.map((game) => ({
  name: game.title,
  // genre/platforms are English label arrays in games.ts; join them for the sheet.
  genre: { en: game.seoMeta.genre.join(", "), ar: game.seoMeta.genre.join("، ") },
  platforms: { en: game.seoMeta.platforms.join(", "), ar: game.seoMeta.platforms.join("، ") },
  status: STATUS_LABEL[game.status] ?? { en: game.status, ar: game.status },
  oneLiner: ONE_LINER[game.id] ?? { en: game.description.en, ar: game.description.ar },
  logo: LOGO[game.id] ?? game.logoUrl,
  href: `/games/${game.slug}`,
}));
