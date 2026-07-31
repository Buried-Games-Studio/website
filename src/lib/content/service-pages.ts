import type { Locale } from "@/lib/i18n";

/**
 * Data-driven content for the /services child pages. Each slug carries fully
 * localized (en/ar) copy: hero, "what's included", platforms, a 5-step process
 * with honest phase outcomes (no invented prices/timelines), a "why a GCC
 * studio" block, a portfolio proof block linking real games, and a service FAQ.
 *
 * The route layer (src/app/[locale]/services/[service]) and the reusable detail
 * component read from here, and the JSON-LD (Service/FAQPage/BreadcrumbList) is
 * generated from the same content so structured data stays in sync per locale.
 */

export type LocalizedText = Record<Locale, string>;

export interface ServiceProcessStep {
  title: LocalizedText;
  /** What the client actually walks away with at the end of this phase. */
  outcome: LocalizedText;
}

export interface ServiceFaqItem {
  q: LocalizedText;
  a: LocalizedText;
}

export interface ServicePortfolioItem {
  /** Locale-neutral route, e.g. /games/koutq8 — localePath() adds the prefix. */
  href: string;
  /** Descriptive anchor text per locale (e.g. "our Kuwaiti card game KoutQ8"). */
  anchor: LocalizedText;
  blurb: LocalizedText;
}

export interface ServicePage {
  slug: string;
  /**
   * ISO date (YYYY-MM-DD) this page's content last materially changed — it is
   * the <lastmod> the sitemap advertises for /services/<slug>. Bump it BY HAND
   * whenever you edit the copy, title, or FAQ below. Never derive it from build
   * time: a sitemap where every URL moves on every deploy is a signal search
   * engines learn to ignore. See src/app/sitemap.ts.
   */
  updatedAt: string;
  /** Latin product/service name kept for schema alternateName on Arabic pages. */
  latinName: string;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  /** schema.org serviceType value (English, stable for both locales). */
  serviceType: string;
  hero: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    subtitle: LocalizedText;
  };
  /** Lead paragraphs under the hero — the page's substantive intro copy. */
  intro: { en: string[]; ar: string[] };
  included: {
    heading: LocalizedText;
    items: { title: LocalizedText; body: LocalizedText }[];
  };
  platforms: {
    heading: LocalizedText;
    intro: LocalizedText;
    /** Engine/platform names — Latin labels render fine in both locales. */
    items: { label: string; note: LocalizedText }[];
  };
  process: {
    heading: LocalizedText;
    steps: ServiceProcessStep[];
  };
  whyGcc: {
    heading: LocalizedText;
    body: LocalizedText;
    points: { title: LocalizedText; body: LocalizedText }[];
  };
  portfolio: {
    heading: LocalizedText;
    intro: LocalizedText;
    items: ServicePortfolioItem[];
  };
  faq: {
    heading: LocalizedText;
    items: ServiceFaqItem[];
  };
  cta: {
    title: LocalizedText;
    body: LocalizedText;
  };
}

/* ─────────────────── shared portfolio proof blocks ─────────────────── */

const koutq8: ServicePortfolioItem = {
  href: "/games/koutq8",
  anchor: { en: "our Kuwaiti card game KoutQ8", ar: "لعبة الورق الكويتية كوت" },
  blurb: {
    en: "A digital adaptation of the traditional Kuwaiti card game Kout, built in Unity with online multiplayer, AI partners, and an App Store release.",
    ar: "نسخة رقمية من لعبة الكوت الكويتية التقليدية، مبنية على Unity مع لعب جماعي عبر الإنترنت، وشركاء ذكاء اصطناعي، وإصدار على App Store.",
  },
};

const nabsh: ServicePortfolioItem = {
  href: "/games/nabsh",
  anchor: { en: "our real-time trivia game Nabsh", ar: "لعبة التريفيا الجماعية نبش" },
  blurb: {
    en: "A live multiplayer trivia web game with thousands of Arabic and English questions, leaderboards, and real-time matchmaking.",
    ar: "لعبة تريفيا جماعية على الويب في الوقت الفعلي، بآلاف الأسئلة بالعربية والإنجليزية، ولوحات صدارة، ومطابقة لاعبين فورية.",
  },
};

const powerOfBombs: ServicePortfolioItem = {
  href: "/games/power-of-bombs",
  anchor: { en: "our Unreal arcade title Power of Bombs", ar: "لعبة الأركيد باور أوف بومبز" },
  blurb: {
    en: "A top-down action arcade game built in Unreal Engine, with strategic level design, power-ups, and multiplayer mayhem.",
    ar: "لعبة أركيد أكشن من منظور علوي مبنية على Unreal Engine، بتصميم مستويات استراتيجي، ومعززات قوة، وفوضى متعددة اللاعبين.",
  },
};

const arrab: ServicePortfolioItem = {
  href: "/games/arrab",
  anchor: { en: "our real-time Mafia game Arrab", ar: "لعبة المافيا الجماعية العرّاب" },
  blurb: {
    en: "A premium web-based social deduction Mafia game with real-time Socket.IO multiplayer, 11 roles, and full Arabic/English RTL support.",
    ar: "لعبة مافيا وخداع اجتماعي فاخرة على الويب، بلعب جماعي فوري عبر Socket.IO، و11 دورًا، ودعم كامل للعربية والإنجليزية مع تخطيط RTL.",
  },
};

const gathered: ServicePortfolioItem = {
  href: "/games/gathered-by-the-light",
  anchor: { en: "our hand-drawn platformer Gathered by the Light", ar: "لعبة المنصات المرسومة يدويًا Gathered by the Light" },
  blurb: {
    en: "A 2D pixel-art platformer built in Unity with hand-drawn sprites, parallax environments, a grappling-hook mechanic, and a multi-phase boss fight — every asset drawn in-house.",
    ar: "لعبة منصات ثنائية الأبعاد بفن البكسل مبنية على Unity برسوم مرسومة يدويًا، وبيئات متوازية، وآلية خطاف تسلق، ومعركة زعيم متعددة المراحل — كل عنصر مرسوم داخليًا.",
  },
};

/* ─────────────────── the child pages ─────────────────── */

export const servicePages: ServicePage[] = [
  {
    slug: "game-development",
    updatedAt: "2026-07-23",
    latinName: "Game Development",
    serviceType: "Game Development",
    metaTitle: {
      en: "Game Development Company for Kuwait & the GCC",
      ar: "شركة تطوير ألعاب للكويت والخليج",
    },
    metaDescription: {
      en: "Full-cycle game development company serving Kuwait, the GCC, Saudi Arabia, and the UAE. We design, build, and ship Unity, Unreal Engine 5, mobile, and web games — Arabic-first, end to end.",
      ar: "شركة تطوير ألعاب متكاملة تخدم العملاء في الكويت والخليج والسعودية والإمارات. نصمم وننفذ ونطلق ألعاب Unity وUnreal Engine 5 والجوال والويب — بالعربية أولًا، من الفكرة إلى الإطلاق.",
    },
    hero: {
      eyebrow: { en: "Game Development", ar: "تطوير الألعاب" },
      title: {
        en: "Game Development Company for Kuwait & the GCC",
        ar: "شركة تطوير ألعاب للكويت والخليج",
      },
      subtitle: {
        en: "We take games from a one-line idea to a live release — design, art, engineering, and launch — for studios, publishers, and brands across Kuwait, Saudi Arabia, the UAE, and the wider GCC.",
        ar: "نأخذ الألعاب من فكرة بسطر واحد إلى إصدار حي — تصميم وفن وبرمجة وإطلاق — للاستوديوهات والناشرين والعلامات التجارية في الكويت والسعودية والإمارات وعموم الخليج.",
      },
    },
    intro: {
      en: [
        "Buried Games Studio is a full-cycle, remote-first game development company serving clients across Kuwait, the GCC, and beyond, building games for players throughout the Gulf. We own the entire pipeline so you don't have to coordinate five vendors: concept and game design, 2D/3D art and animation, engineering in Unity and Unreal Engine 5, backend and multiplayer networking, QA, and store launch.",
        "Whether you're a publisher with a green-lit concept, a brand that wants a branded game, or a founder with a prototype that needs to become a real product, we plug in at the stage you're at and ship something players actually want to open twice. Every project ships bilingual by default — Arabic-first UX with proper right-to-left layout, and English alongside it.",
      ],
      ar: [
        "استوديو بريد جيمز شركة تطوير ألعاب متكاملة تعمل عن بُعد وتخدم العملاء في الكويت والخليج وخارجهما، نبني ألعابًا للاعبين في عموم الخليج. نملك خط الإنتاج بالكامل حتى لا تضطر للتنسيق بين خمسة موردين: المفهوم وتصميم اللعبة، والفن والرسوم المتحركة ثنائية وثلاثية الأبعاد، والبرمجة على Unity وUnreal Engine 5، والواجهة الخلفية والشبكات الجماعية، وضمان الجودة، والإطلاق على المتاجر.",
        "سواء كنت ناشرًا لديه مفهوم معتمد، أو علامة تجارية تريد لعبة مخصصة، أو مؤسسًا لديه نموذج أولي يحتاج أن يصبح منتجًا حقيقيًا، ندخل من المرحلة التي أنت فيها ونطلق شيئًا يرغب اللاعبون في فتحه مرة بعد مرة. كل مشروع يُطلق ثنائي اللغة افتراضيًا — تجربة عربية أولًا بتخطيط صحيح من اليمين إلى اليسار، والإنجليزية إلى جانبها.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        {
          title: { en: "Game design & prototyping", ar: "تصميم اللعبة والنماذج الأولية" },
          body: {
            en: "Core loop, mechanics, and a playable prototype we test before committing to full production.",
            ar: "الحلقة الأساسية والآليات ونموذج أولي قابل للعب نختبره قبل الالتزام بالإنتاج الكامل.",
          },
        },
        {
          title: { en: "Art & animation", ar: "الفن والرسوم المتحركة" },
          body: {
            en: "2D and 3D art, characters, environments, UI, and animation tuned for your target platform.",
            ar: "فن ثنائي وثلاثي الأبعاد، وشخصيات، وبيئات، وواجهات، ورسوم متحركة مضبوطة لمنصتك المستهدفة.",
          },
        },
        {
          title: { en: "Engineering", ar: "البرمجة" },
          body: {
            en: "Gameplay code, tools, and systems in Unity or Unreal Engine 5, plus web builds with Next.js where it fits.",
            ar: "كود اللعب والأدوات والأنظمة على Unity أو Unreal Engine 5، إضافة إلى بناءات ويب بـ Next.js عند الحاجة.",
          },
        },
        {
          title: { en: "Backend & multiplayer", ar: "الواجهة الخلفية واللعب الجماعي" },
          body: {
            en: "Accounts, leaderboards, matchmaking, and real-time multiplayer infrastructure that scales.",
            ar: "حسابات، ولوحات صدارة، ومطابقة لاعبين، وبنية تحتية للعب الجماعي الفوري قابلة للتطوير.",
          },
        },
        {
          title: { en: "QA & launch", ar: "ضمان الجودة والإطلاق" },
          body: {
            en: "Device testing, balancing, store submission, and launch support across the App Store, Google Play, Steam, and web.",
            ar: "اختبار على الأجهزة، وموازنة، وتقديم للمتاجر، ودعم الإطلاق عبر App Store وGoogle Play وSteam والويب.",
          },
        },
        {
          title: { en: "Live ops & support", ar: "العمليات الحية والدعم" },
          body: {
            en: "Post-launch updates, events, analytics, and community support to keep players coming back.",
            ar: "تحديثات ما بعد الإطلاق، والفعاليات، والتحليلات، ودعم المجتمع لإبقاء اللاعبين متفاعلين.",
          },
        },
      ],
    },
    platforms: {
      heading: { en: "Engines & platforms", ar: "المحركات والمنصات" },
      intro: {
        en: "We pick the engine to fit the game, not the other way around. Across our portfolio we ship on every major platform.",
        ar: "نختار المحرك ليناسب اللعبة، لا العكس. عبر أعمالنا نطلق على كل منصة رئيسية.",
      },
      items: [
        { label: "Unity", note: { en: "Mobile and cross-platform games — our engine for KoutQ8.", ar: "ألعاب الجوال والمنصات المتعددة — محركنا في كوت." } },
        { label: "Unreal Engine 5", note: { en: "High-fidelity 3D and action titles like Power of Bombs.", ar: "ألعاب ثلاثية الأبعاد عالية الدقة وألعاب الأكشن مثل باور أوف بومبز." } },
        { label: "iOS & Android", note: { en: "Native mobile releases on the App Store and Google Play.", ar: "إصدارات جوال أصلية على App Store وGoogle Play." } },
        { label: "Steam & PC", note: { en: "Desktop distribution and PC builds.", ar: "توزيع على سطح المكتب وبناءات للحاسوب." } },
        { label: "Web", note: { en: "Instant-play browser games with Next.js, like Nabsh and Arrab.", ar: "ألعاب متصفح فورية بـ Next.js مثل نبش والعرّاب." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        {
          title: { en: "Discovery", ar: "الاكتشاف" },
          outcome: {
            en: "A clear scope, target platforms, and a roadmap. You leave with a written game brief and a realistic plan — typically 1-2 weeks depending on how defined the idea is.",
            ar: "نطاق واضح ومنصات مستهدفة وخارطة طريق. تخرج بملخص لعبة مكتوب وخطة واقعية — عادة أسبوع إلى أسبوعين حسب وضوح الفكرة.",
          },
        },
        {
          title: { en: "Design & prototype", ar: "التصميم والنموذج" },
          outcome: {
            en: "A playable prototype of the core loop. We prove the fun is there before spending budget on full production.",
            ar: "نموذج أولي قابل للعب للحلقة الأساسية. نثبت وجود المتعة قبل إنفاق الميزانية على الإنتاج الكامل.",
          },
        },
        {
          title: { en: "Production", ar: "الإنتاج" },
          outcome: {
            en: "Art, content, and systems built in agile sprints with regular playable builds. Scope drives the timeline — typically 4-12 weeks for a focused title, longer for larger games.",
            ar: "فن ومحتوى وأنظمة تُبنى في سباقات أجايل مع بناءات قابلة للعب بانتظام. النطاق يحدد المدة — عادة 4 إلى 12 أسبوعًا للعبة مركّزة، وأطول للألعاب الأكبر.",
          },
        },
        {
          title: { en: "Polish & QA", ar: "التلميع وضمان الجودة" },
          outcome: {
            en: "A balanced, optimized, device-tested build ready for stores — with the rough edges sanded down.",
            ar: "بناء متوازن ومحسّن ومختبَر على الأجهزة وجاهز للمتاجر — مع تنعيم الحواف الخشنة.",
          },
        },
        {
          title: { en: "Launch & live ops", ar: "الإطلاق والعمليات الحية" },
          outcome: {
            en: "Store submission, launch-day support, and an agreed live-ops plan for updates and events after release.",
            ar: "تقديم للمتاجر، ودعم يوم الإطلاق، وخطة عمليات حية متفق عليها للتحديثات والفعاليات بعد الإصدار.",
          },
        },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "Building for the Gulf market is not just translation. A studio that lives here ships games that feel native.",
        ar: "البناء لسوق الخليج ليس مجرد ترجمة. الاستوديو الذي يعيش هنا يطلق ألعابًا تبدو محلية بالفطرة.",
      },
      points: [
        {
          title: { en: "Arabic-first UX", ar: "تجربة عربية أولًا" },
          body: {
            en: "Right-to-left layout, real Arabic typography, and copy written by people who speak the language — not a bolted-on afterthought.",
            ar: "تخطيط من اليمين إلى اليسار، وطباعة عربية حقيقية، ونصوص يكتبها من يتحدثون اللغة — لا إضافة لاحقة مرتجلة.",
          },
        },
        {
          title: { en: "Local culture & payments", ar: "الثقافة والمدفوعات المحلية" },
          body: {
            en: "We understand Gulf player tastes, culturally relevant content, and the payment and store realities of the region.",
            ar: "نفهم أذواق لاعبي الخليج، والمحتوى المناسب ثقافيًا، وواقع المدفوعات والمتاجر في المنطقة.",
          },
        },
        {
          title: { en: "Same-timezone collaboration", ar: "تعاون في نفس المنطقة الزمنية" },
          body: {
            en: "Standups, reviews, and quick decisions during your working day — no waiting overnight for answers.",
            ar: "اجتماعات ومراجعات وقرارات سريعة خلال يوم عملك — دون انتظار ليلة كاملة للإجابات.",
          },
        },
      ],
    },
    portfolio: {
      heading: { en: "Proof from our portfolio", ar: "دليل من أعمالنا" },
      intro: {
        en: "We don't just talk about shipping games — we ship them. A few from our portfolio:",
        ar: "نحن لا نتحدث عن إطلاق الألعاب فقط — بل نطلقها فعلًا. بعض من أعمالنا:",
      },
      items: [koutq8, nabsh, powerOfBombs, arrab],
    },
    faq: {
      heading: { en: "Game development FAQ", ar: "أسئلة شائعة عن تطوير الألعاب" },
      items: [
        {
          q: { en: "How much does game development cost?", ar: "كم تكلفة تطوير لعبة؟" },
          a: {
            en: "It depends entirely on scope — a focused mobile title is a different budget from a multiplayer 3D game. After a short discovery call we give you a written scope and a clear estimate. We never quote a number before we understand what you're actually building.",
            ar: "تعتمد كليًا على النطاق — لعبة جوال مركّزة لها ميزانية مختلفة عن لعبة ثلاثية الأبعاد جماعية. بعد مكالمة اكتشاف قصيرة نقدم لك نطاقًا مكتوبًا وتقديرًا واضحًا. لا نقدّم رقمًا قبل أن نفهم ما تبنيه فعلًا.",
          },
        },
        {
          q: { en: "How long does it take to build a game?", ar: "كم تستغرق صناعة لعبة؟" },
          a: {
            en: "A focused title typically takes 4-12 weeks of production after design, while larger multiplayer games run longer. We work in sprints with regular playable builds so you see progress throughout, not just at the end.",
            ar: "لعبة مركّزة تستغرق عادة 4 إلى 12 أسبوعًا من الإنتاج بعد التصميم، بينما تأخذ الألعاب الجماعية الأكبر وقتًا أطول. نعمل في سباقات مع بناءات قابلة للعب بانتظام لترى التقدم طوال الوقت، لا في النهاية فقط.",
          },
        },
        {
          q: { en: "Do you build for mobile, PC, and web?", ar: "هل تبنون للجوال والحاسوب والويب؟" },
          a: {
            en: "Yes. We ship on iOS and Android, Steam and PC, and instant-play web. We choose the engine and platform to fit your audience and goals.",
            ar: "نعم. نطلق على iOS وAndroid، وSteam والحاسوب، والويب الفوري. نختار المحرك والمنصة بما يناسب جمهورك وأهدافك.",
          },
        },
        {
          q: { en: "Do you make Arabic games?", ar: "هل تصنعون ألعابًا عربية؟" },
          a: {
            en: "Arabic is first-class in everything we ship. Our games launch with proper right-to-left layouts and natural Arabic content alongside English — KoutQ8, Nabsh, and Arrab are all fully bilingual.",
            ar: "العربية أساسية في كل ما نطلقه. تُطلق ألعابنا بتخطيطات صحيحة من اليمين إلى اليسار ومحتوى عربي طبيعي إلى جانب الإنجليزية — كوت ونبش والعرّاب جميعها ثنائية اللغة بالكامل.",
          },
        },
        {
          q: { en: "Can you take over an existing or unfinished game?", ar: "هل يمكنكم استلام لعبة قائمة أو غير مكتملة؟" },
          a: {
            en: "Often, yes. We start with a technical review of your project and code, then propose the cleanest path to finish or improve it rather than rebuilding everything by default.",
            ar: "غالبًا نعم. نبدأ بمراجعة تقنية لمشروعك وكوده، ثم نقترح أنظف مسار لإكماله أو تحسينه بدلًا من إعادة بناء كل شيء افتراضيًا.",
          },
        },
      ],
    },
    cta: {
      title: { en: "Have a game in mind?", ar: "لديك لعبة في بالك؟" },
      body: {
        en: "Tell us about your project and we'll come back with a clear scope and next steps.",
        ar: "أخبرنا عن مشروعك وسنعود إليك بنطاق واضح وخطوات تالية.",
      },
    },
  },

  {
    slug: "mobile-game-development",
    updatedAt: "2026-07-23",
    latinName: "Mobile Game Development",
    serviceType: "Mobile Game Development",
    metaTitle: {
      en: "Mobile Game Development for Kuwait & the GCC | iOS & Android",
      ar: "تطوير ألعاب الجوال للكويت والخليج | iOS وAndroid",
    },
    metaDescription: {
      en: "Mobile game development studio for Kuwait and the GCC. We design and build Arabic-first iOS and Android games in Unity — from prototype to App Store and Google Play launch.",
      ar: "استوديو تطوير ألعاب جوال للكويت والخليج. نصمم ونبني ألعاب iOS وAndroid عربية أولًا على Unity — من النموذج الأولي إلى الإطلاق على App Store وGoogle Play.",
    },
    hero: {
      eyebrow: { en: "Mobile Game Development", ar: "تطوير ألعاب الجوال" },
      title: {
        en: "Mobile Game Development for iOS & Android",
        ar: "تطوير ألعاب الجوال لـ iOS وAndroid",
      },
      subtitle: {
        en: "Arabic-first mobile games built in Unity and shipped to the App Store and Google Play, for players across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "ألعاب جوال عربية أولًا مبنية على Unity ومُطلقة على App Store وGoogle Play، للاعبين في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "Mobile is where the Gulf plays. We build mobile games designed for touch from the first sketch — not desktop games squeezed onto a phone — with the performance, battery, and store realities of iOS and Android baked in from the start.",
        "Buried Games Studio handles the whole mobile pipeline: game design, art, Unity engineering, backend and multiplayer, store optimization, and submission to both the App Store and Google Play. We already have a live App Store release in our portfolio, so we know the review process, not just the theory.",
      ],
      ar: [
        "الجوال هو حيث يلعب الخليج. نبني ألعاب جوال مصممة للمس من أول رسمة — لا ألعاب حاسوب محشورة في هاتف — مع مراعاة الأداء والبطارية وواقع متاجر iOS وAndroid منذ البداية.",
        "يتولى استوديو بريد جيمز خط إنتاج الجوال بالكامل: تصميم اللعبة، والفن، وبرمجة Unity، والواجهة الخلفية واللعب الجماعي، وتحسين المتجر، والتقديم على App Store وGoogle Play. لدينا بالفعل إصدار حي على App Store في أعمالنا، لذا نعرف عملية المراجعة، لا النظرية فقط.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "Touch-first design", ar: "تصميم يعتمد اللمس أولًا" }, body: { en: "Controls, UI, and onboarding designed for phones and tablets, one-handed where it matters.", ar: "تحكم وواجهات وتهيئة مصممة للهواتف والأجهزة اللوحية، بيد واحدة حيث يهم ذلك." } },
        { title: { en: "Unity engineering", ar: "برمجة Unity" }, body: { en: "Cross-platform builds from a single Unity codebase for both iOS and Android.", ar: "بناءات متعددة المنصات من قاعدة كود Unity واحدة لكل من iOS وAndroid." } },
        { title: { en: "Performance optimization", ar: "تحسين الأداء" }, body: { en: "Frame-rate, memory, and battery tuning across a range of real devices, not just flagships.", ar: "ضبط معدل الإطارات والذاكرة والبطارية عبر مجموعة من الأجهزة الحقيقية، لا الرائدة فقط." } },
        { title: { en: "Accounts & multiplayer", ar: "الحسابات واللعب الجماعي" }, body: { en: "Player accounts, leaderboards, and real-time multiplayer where the game calls for it.", ar: "حسابات اللاعبين، ولوحات الصدارة، واللعب الجماعي الفوري عند الحاجة." } },
        { title: { en: "Store submission", ar: "التقديم على المتاجر" }, body: { en: "App Store and Google Play listings, assets, and the full submission and review process.", ar: "قوائم App Store وGoogle Play، والأصول، وعملية التقديم والمراجعة الكاملة." } },
        { title: { en: "Updates & live ops", ar: "التحديثات والعمليات الحية" }, body: { en: "Post-launch patches, content updates, and analytics to grow retention.", ar: "تصحيحات ما بعد الإطلاق، وتحديثات المحتوى، والتحليلات لزيادة الاحتفاظ باللاعبين." } },
      ],
    },
    platforms: {
      heading: { en: "Engines & platforms", ar: "المحركات والمنصات" },
      intro: {
        en: "We build mobile games primarily in Unity, with web companions in Next.js when a project needs them.",
        ar: "نبني ألعاب الجوال أساسًا على Unity، مع رفقاء ويب بـ Next.js عندما يحتاج المشروع إليهم.",
      },
      items: [
        { label: "Unity", note: { en: "Our primary mobile engine — one codebase, both stores.", ar: "محرك الجوال الأساسي لدينا — قاعدة كود واحدة، كلا المتجرين." } },
        { label: "iOS / App Store", note: { en: "Native iPhone and iPad builds; we've shipped a live App Store title.", ar: "بناءات أصلية لـ iPhone وiPad؛ أطلقنا لعبة حية على App Store." } },
        { label: "Android / Google Play", note: { en: "Builds tuned for the wide range of Android devices in the region.", ar: "بناءات مضبوطة للتنوع الواسع في أجهزة Android بالمنطقة." } },
        { label: "Web", note: { en: "Optional instant-play web versions with Next.js.", ar: "نسخ ويب فورية اختيارية بـ Next.js." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "We agree on the game concept, target devices, and a roadmap — typically 1-2 weeks.", ar: "نتفق على مفهوم اللعبة والأجهزة المستهدفة وخارطة طريق — عادة أسبوع إلى أسبوعين." } },
        { title: { en: "Prototype", ar: "النموذج الأولي" }, outcome: { en: "A touch-playable prototype on a real device so we feel the controls before full production.", ar: "نموذج أولي قابل للعب باللمس على جهاز حقيقي لنحسّ بالتحكم قبل الإنتاج الكامل." } },
        { title: { en: "Production", ar: "الإنتاج" }, outcome: { en: "Art, levels, and systems built in sprints with builds you can install — typically 4-12 weeks depending on scope.", ar: "فن ومستويات وأنظمة تُبنى في سباقات مع بناءات يمكنك تثبيتها — عادة 4 إلى 12 أسبوعًا حسب النطاق." } },
        { title: { en: "Optimization & QA", ar: "التحسين وضمان الجودة" }, outcome: { en: "Tested across real iOS and Android devices, with performance and balance dialed in.", ar: "مُختبَر على أجهزة iOS وAndroid حقيقية، مع ضبط الأداء والتوازن." } },
        { title: { en: "Store launch & live ops", ar: "إطلاق المتجر والعمليات الحية" }, outcome: { en: "App Store and Google Play submission, launch support, and a plan for updates.", ar: "تقديم على App Store وGoogle Play، ودعم الإطلاق، وخطة للتحديثات." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "Gulf players have specific tastes and devices. A local studio designs for them, not for a generic global average.",
        ar: "للاعبي الخليج أذواق وأجهزة محددة. الاستوديو المحلي يصمم لهم، لا لمتوسط عالمي عام.",
      },
      points: [
        { title: { en: "Arabic-first UX", ar: "تجربة عربية أولًا" }, body: { en: "Right-to-left mobile layouts and Arabic typography that feel native on the phone.", ar: "تخطيطات جوال من اليمين إلى اليسار وطباعة عربية تبدو محلية على الهاتف." } },
        { title: { en: "Regional device knowledge", ar: "معرفة بأجهزة المنطقة" }, body: { en: "We optimize for the Android and iOS devices people actually carry in the Gulf.", ar: "نحسّن لأجهزة Android وiOS التي يحملها الناس فعلًا في الخليج." } },
        { title: { en: "Same-timezone collaboration", ar: "تعاون في نفس المنطقة الزمنية" }, body: { en: "Reviews and decisions during your working hours.", ar: "مراجعات وقرارات خلال ساعات عملك." } },
      ],
    },
    portfolio: {
      heading: { en: "Proof from our portfolio", ar: "دليل من أعمالنا" },
      intro: {
        en: "Mobile and cross-platform titles we've shipped:",
        ar: "ألعاب جوال ومتعددة المنصات أطلقناها:",
      },
      items: [koutq8, nabsh],
    },
    faq: {
      heading: { en: "Mobile game development FAQ", ar: "أسئلة شائعة عن تطوير ألعاب الجوال" },
      items: [
        { q: { en: "Do you build for both iOS and Android?", ar: "هل تبنون لكل من iOS وAndroid؟" }, a: { en: "Yes. We build in Unity from a single codebase and ship to both the App Store and Google Play, with device-specific optimization for each.", ar: "نعم. نبني على Unity من قاعدة كود واحدة ونطلق على App Store وGoogle Play، مع تحسين خاص بكل جهاز." } },
        { q: { en: "Can you publish the game to the stores for us?", ar: "هل يمكنكم نشر اللعبة على المتاجر نيابة عنا؟" }, a: { en: "We handle store listings, assets, and the full submission and review process. We've already shipped a live title on the App Store, so the process isn't new to us.", ar: "نتولى قوائم المتاجر والأصول وعملية التقديم والمراجعة الكاملة. أطلقنا بالفعل لعبة حية على App Store، فالعملية ليست جديدة علينا." } },
        { q: { en: "Do you add online multiplayer to mobile games?", ar: "هل تضيفون لعبًا جماعيًا عبر الإنترنت لألعاب الجوال؟" }, a: { en: "Yes — accounts, leaderboards, matchmaking, and real-time multiplayer. KoutQ8 ships with online multiplayer and AI opponents.", ar: "نعم — حسابات، ولوحات صدارة، ومطابقة لاعبين، ولعب جماعي فوري. كوت يأتي بلعب جماعي عبر الإنترنت وخصوم ذكاء اصطناعي." } },
        { q: { en: "Will the game work in Arabic?", ar: "هل ستعمل اللعبة بالعربية؟" }, a: { en: "Yes. Arabic is first-class — right-to-left layout and natural Arabic content alongside English, designed for Gulf players from the start.", ar: "نعم. العربية أساسية — تخطيط من اليمين إلى اليسار ومحتوى عربي طبيعي إلى جانب الإنجليزية، مصمم للاعبي الخليج منذ البداية." } },
      ],
    },
    cta: {
      title: { en: "Building a mobile game?", ar: "تبني لعبة جوال؟" },
      body: { en: "Tell us your idea and we'll map out the path to the App Store and Google Play.", ar: "أخبرنا بفكرتك وسنرسم لك المسار إلى App Store وGoogle Play." },
    },
  },

  {
    slug: "unity-game-development",
    updatedAt: "2026-07-23",
    latinName: "Unity Game Development",
    serviceType: "Unity Game Development",
    metaTitle: {
      en: "Unity Game Development Studio for Kuwait & the GCC",
      ar: "استوديو تطوير ألعاب Unity للكويت والخليج",
    },
    metaDescription: {
      en: "Unity game development studio serving Kuwait, the GCC, Saudi Arabia, and the UAE. We build cross-platform mobile, PC, and web games in Unity — Arabic-first, from prototype to launch.",
      ar: "استوديو تطوير ألعاب Unity يخدم العملاء في الكويت والخليج والسعودية والإمارات. نبني ألعاب جوال وحاسوب وويب متعددة المنصات على Unity — عربية أولًا، من النموذج إلى الإطلاق.",
    },
    hero: {
      eyebrow: { en: "Unity Game Development", ar: "تطوير ألعاب Unity" },
      title: {
        en: "Unity Game Development Studio",
        ar: "استوديو تطوير ألعاب Unity",
      },
      subtitle: {
        en: "Cross-platform games built in Unity — mobile, PC, and web — for clients across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "ألعاب متعددة المنصات مبنية على Unity — جوال وحاسوب وويب — لعملاء في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "Unity is our workhorse engine for cross-platform games: one codebase that ships to iOS, Android, PC, and web. We use it where flexibility and fast iteration matter, and we've shipped real Unity titles — KoutQ8 is live on the App Store, and Gathered by the Light was built in Unity from the ground up.",
        "Buried Games Studio is a Unity development studio serving Kuwait and the GCC that owns the full pipeline: game design, C# gameplay programming, custom tools and editor extensions, 2D/3D art integration, backend and multiplayer, optimization, and store launch. We write clean, maintainable Unity code so your project stays easy to extend long after release.",
      ],
      ar: [
        "Unity هو محركنا الأساسي للألعاب متعددة المنصات: قاعدة كود واحدة تُطلق على iOS وAndroid والحاسوب والويب. نستخدمه حيث تهم المرونة والتكرار السريع، وأطلقنا ألعاب Unity حقيقية — كوت حي على App Store، وGathered by the Light بُنيت بالكامل على Unity.",
        "استوديو بريد جيمز استوديو تطوير Unity يخدم الكويت والخليج ويملك خط الإنتاج الكامل: تصميم اللعبة، وبرمجة اللعب بـ C#، وأدوات مخصصة وامتدادات للمحرر، ودمج فن ثنائي وثلاثي الأبعاد، والواجهة الخلفية واللعب الجماعي، والتحسين، وإطلاق المتاجر. نكتب كود Unity نظيفًا وقابلًا للصيانة ليبقى مشروعك سهل التوسعة بعد الإطلاق بوقت طويل.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "C# gameplay programming", ar: "برمجة اللعب بـ C#" }, body: { en: "Clean, maintainable gameplay systems and architecture built to scale with your game.", ar: "أنظمة لعب وبنية نظيفة وقابلة للصيانة مبنية لتتوسع مع لعبتك." } },
        { title: { en: "Cross-platform builds", ar: "بناءات متعددة المنصات" }, body: { en: "One Unity project targeting iOS, Android, PC, and web from a shared codebase.", ar: "مشروع Unity واحد يستهدف iOS وAndroid والحاسوب والويب من قاعدة كود مشتركة." } },
        { title: { en: "Custom tools & editor extensions", ar: "أدوات مخصصة وامتدادات للمحرر" }, body: { en: "In-editor tooling that speeds up content creation and keeps your team productive.", ar: "أدوات داخل المحرر تسرّع إنشاء المحتوى وتبقي فريقك منتجًا." } },
        { title: { en: "Art & animation integration", ar: "دمج الفن والرسوم المتحركة" }, body: { en: "2D and 3D assets, animation, shaders, and effects wired into Unity cleanly.", ar: "أصول ثنائية وثلاثية الأبعاد، ورسوم متحركة، وشيدرز، ومؤثرات مدمجة في Unity بنظافة." } },
        { title: { en: "Backend & multiplayer", ar: "الواجهة الخلفية واللعب الجماعي" }, body: { en: "Accounts, leaderboards, and real-time multiplayer integrated with your Unity client.", ar: "حسابات، ولوحات صدارة، ولعب جماعي فوري مدمج مع عميل Unity لديك." } },
        { title: { en: "Optimization & QA", ar: "التحسين وضمان الجودة" }, body: { en: "Profiling and tuning across target devices, plus thorough QA before launch.", ar: "تحليل أداء وضبط عبر الأجهزة المستهدفة، إضافة إلى ضمان جودة شامل قبل الإطلاق." } },
      ],
    },
    platforms: {
      heading: { en: "Platforms we ship to", ar: "المنصات التي نطلق عليها" },
      intro: {
        en: "A single Unity codebase, deployed everywhere your players are.",
        ar: "قاعدة كود Unity واحدة، تُنشر أينما كان لاعبوك.",
      },
      items: [
        { label: "iOS & Android", note: { en: "Mobile builds for the App Store and Google Play.", ar: "بناءات جوال لـ App Store وGoogle Play." } },
        { label: "PC & Steam", note: { en: "Desktop builds and Steam distribution.", ar: "بناءات سطح المكتب وتوزيع Steam." } },
        { label: "Web (WebGL)", note: { en: "Browser builds for instant-play experiences.", ar: "بناءات متصفح لتجارب اللعب الفوري." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "Scope, target platforms, and architecture decisions agreed — typically 1-2 weeks.", ar: "النطاق والمنصات المستهدفة وقرارات البنية متفق عليها — عادة أسبوع إلى أسبوعين." } },
        { title: { en: "Prototype", ar: "النموذج الأولي" }, outcome: { en: "A playable Unity prototype of the core loop to validate the fun and the tech.", ar: "نموذج أولي قابل للعب على Unity للحلقة الأساسية للتحقق من المتعة والتقنية." } },
        { title: { en: "Production", ar: "الإنتاج" }, outcome: { en: "Systems, content, and art built in sprints with regular Unity builds — typically 4-12 weeks depending on scope.", ar: "أنظمة ومحتوى وفن تُبنى في سباقات مع بناءات Unity منتظمة — عادة 4 إلى 12 أسبوعًا حسب النطاق." } },
        { title: { en: "Optimization & QA", ar: "التحسين وضمان الجودة" }, outcome: { en: "Profiled, optimized, and tested across all target platforms.", ar: "مُحلَّل ومُحسَّن ومُختبَر عبر كل المنصات المستهدفة." } },
        { title: { en: "Launch & support", ar: "الإطلاق والدعم" }, outcome: { en: "Builds shipped to the chosen stores with launch support and a maintenance plan.", ar: "بناءات تُطلق على المتاجر المختارة مع دعم الإطلاق وخطة صيانة." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "A Unity studio that lives in the region builds games that feel made for it.",
        ar: "استوديو Unity يعيش في المنطقة يبني ألعابًا تبدو مصنوعة لها.",
      },
      points: [
        { title: { en: "Arabic-first UX", ar: "تجربة عربية أولًا" }, body: { en: "Right-to-left layouts and Arabic typography handled correctly inside Unity.", ar: "تخطيطات من اليمين إلى اليسار وطباعة عربية معالجة بشكل صحيح داخل Unity." } },
        { title: { en: "Local culture & payments", ar: "الثقافة والمدفوعات المحلية" }, body: { en: "Content and monetization that fit Gulf players and platforms.", ar: "محتوى وتحقيق دخل يناسبان لاعبي الخليج ومنصاتهم." } },
        { title: { en: "Same-timezone collaboration", ar: "تعاون في نفس المنطقة الزمنية" }, body: { en: "Fast feedback loops during your working day.", ar: "دورات تغذية راجعة سريعة خلال يوم عملك." } },
      ],
    },
    portfolio: {
      heading: { en: "Proof from our portfolio", ar: "دليل من أعمالنا" },
      intro: {
        en: "Unity titles we've shipped:",
        ar: "ألعاب Unity أطلقناها:",
      },
      items: [koutq8],
    },
    faq: {
      heading: { en: "Unity development FAQ", ar: "أسئلة شائعة عن تطوير Unity" },
      items: [
        { q: { en: "Why Unity instead of another engine?", ar: "لماذا Unity بدلًا من محرك آخر؟" }, a: { en: "Unity is excellent for cross-platform games where you want one codebase across mobile, PC, and web with fast iteration. For high-fidelity 3D and action titles we also work in Unreal Engine 5 — we pick the engine that fits your game.", ar: "Unity ممتاز للألعاب متعددة المنصات حيث تريد قاعدة كود واحدة عبر الجوال والحاسوب والويب مع تكرار سريع. لألعاب ثلاثية الأبعاد عالية الدقة والأكشن نعمل أيضًا على Unreal Engine 5 — نختار المحرك المناسب للعبتك." } },
        { q: { en: "Can you continue an existing Unity project?", ar: "هل يمكنكم متابعة مشروع Unity قائم؟" }, a: { en: "Yes. We start with a code and project review, then propose the cleanest way to continue, fix, or extend it rather than rebuilding by default.", ar: "نعم. نبدأ بمراجعة الكود والمشروع، ثم نقترح أنظف طريقة لمتابعته أو إصلاحه أو توسعته بدلًا من إعادة البناء افتراضيًا." } },
        { q: { en: "Do you build custom Unity tools?", ar: "هل تبنون أدوات Unity مخصصة؟" }, a: { en: "Yes — editor extensions and pipeline tooling that speed up content creation and keep your team productive.", ar: "نعم — امتدادات للمحرر وأدوات خط إنتاج تسرّع إنشاء المحتوى وتبقي فريقك منتجًا." } },
        { q: { en: "Which platforms can a Unity game ship to?", ar: "على أي منصات يمكن إطلاق لعبة Unity؟" }, a: { en: "From one Unity project we ship to iOS, Android, PC and Steam, and web via WebGL.", ar: "من مشروع Unity واحد نطلق على iOS وAndroid والحاسوب وSteam، والويب عبر WebGL." } },
      ],
    },
    cta: {
      title: { en: "Need a Unity studio?", ar: "تحتاج استوديو Unity؟" },
      body: { en: "Tell us about your Unity project — new build or existing — and we'll plan the next step.", ar: "أخبرنا عن مشروع Unity لديك — جديد أو قائم — وسنخطط للخطوة التالية." },
    },
  },

  {
    slug: "multiplayer-game-development",
    updatedAt: "2026-07-23",
    latinName: "Multiplayer Game Development",
    serviceType: "Multiplayer Game Development",
    metaTitle: {
      en: "Multiplayer Game Development for Kuwait & the GCC",
      ar: "تطوير الألعاب الجماعية للكويت والخليج",
    },
    metaDescription: {
      en: "Multiplayer game development studio serving Kuwait and the GCC. We build real-time online multiplayer games — matchmaking, leaderboards, and scalable backends — for mobile, PC, and web.",
      ar: "استوديو تطوير ألعاب جماعية يخدم الكويت والخليج. نبني ألعابًا جماعية فورية عبر الإنترنت — مطابقة لاعبين، ولوحات صدارة، وواجهات خلفية قابلة للتطوير — للجوال والحاسوب والويب.",
    },
    hero: {
      eyebrow: { en: "Multiplayer Game Development", ar: "تطوير الألعاب الجماعية" },
      title: {
        en: "Real-Time Multiplayer Game Development",
        ar: "تطوير الألعاب الجماعية في الوقت الفعلي",
      },
      subtitle: {
        en: "Online multiplayer games with real-time gameplay, matchmaking, and scalable backends — for players across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "ألعاب جماعية عبر الإنترنت بلعب فوري ومطابقة لاعبين وواجهات خلفية قابلة للتطوير — للاعبين في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "Multiplayer is what keeps players coming back — and it's the hardest part to get right. We build real-time online multiplayer games end to end: the gameplay client, the networking layer, and the backend that keeps everyone in sync. This is core to what we do, not a bolt-on: Nabsh runs live real-time trivia matches, Arrab runs a full Socket.IO Mafia game, and KoutQ8 is online multiplayer on mobile.",
        "Buried Games Studio designs the netcode, accounts, matchmaking, leaderboards, and server infrastructure so your game stays responsive and fair as your player count grows — with the latency realities of GCC players in mind.",
      ],
      ar: [
        "اللعب الجماعي هو ما يُبقي اللاعبين عائدين — وهو الجزء الأصعب في إتقانه. نبني ألعابًا جماعية فورية عبر الإنترنت من البداية إلى النهاية: عميل اللعب، وطبقة الشبكات، والواجهة الخلفية التي تبقي الجميع متزامنين. هذا جوهر عملنا، لا إضافة لاحقة: نبش يدير مباريات تريفيا فورية مباشرة، والعرّاب يدير لعبة مافيا كاملة عبر Socket.IO، وكوت لعب جماعي عبر الإنترنت على الجوال.",
        "يصمم استوديو بريد جيمز كود الشبكة والحسابات ومطابقة اللاعبين ولوحات الصدارة وبنية الخوادم لتبقى لعبتك سريعة الاستجابة وعادلة مع نمو عدد لاعبيك — مع مراعاة واقع زمن الاستجابة للاعبي الخليج.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "Real-time netcode", ar: "كود شبكة فوري" }, body: { en: "Authoritative, low-latency networking so gameplay stays in sync and fair.", ar: "شبكات موثوقة منخفضة زمن الاستجابة لإبقاء اللعب متزامنًا وعادلًا." } },
        { title: { en: "Matchmaking & lobbies", ar: "مطابقة اللاعبين والردهات" }, body: { en: "Rooms, lobbies, and matchmaking that put the right players together quickly.", ar: "غرف وردهات ومطابقة لاعبين تجمع اللاعبين المناسبين بسرعة." } },
        { title: { en: "Accounts & profiles", ar: "الحسابات والملفات الشخصية" }, body: { en: "Player accounts, friends, progression, and persistent profiles.", ar: "حسابات اللاعبين والأصدقاء والتقدم والملفات الدائمة." } },
        { title: { en: "Leaderboards & stats", ar: "لوحات الصدارة والإحصائيات" }, body: { en: "Competitive leaderboards and player stats that drive retention.", ar: "لوحات صدارة تنافسية وإحصائيات لاعبين تعزز الاحتفاظ." } },
        { title: { en: "Scalable backend", ar: "واجهة خلفية قابلة للتطوير" }, body: { en: "Server infrastructure that scales with concurrent players without falling over.", ar: "بنية خوادم تتوسع مع اللاعبين المتزامنين دون انهيار." } },
        { title: { en: "Anti-cheat & fairness", ar: "مكافحة الغش والعدالة" }, body: { en: "Server-side validation and safeguards to keep matches fair.", ar: "تحقق من جانب الخادم وضمانات لإبقاء المباريات عادلة." } },
      ],
    },
    platforms: {
      heading: { en: "Stack & platforms", ar: "التقنيات والمنصات" },
      intro: {
        en: "We build multiplayer across the stack that fits your game — from real-time web to mobile clients.",
        ar: "نبني اللعب الجماعي عبر التقنيات المناسبة للعبتك — من الويب الفوري إلى عملاء الجوال.",
      },
      items: [
        { label: "Socket.IO / WebSockets", note: { en: "Real-time web multiplayer — the backbone of Arrab and Nabsh.", ar: "لعب جماعي فوري على الويب — العمود الفقري للعرّاب ونبش." } },
        { label: "NestJS / Node.js", note: { en: "Scalable game backends, accounts, and matchmaking services.", ar: "واجهات خلفية للألعاب قابلة للتطوير، وحسابات، وخدمات مطابقة لاعبين." } },
        { label: "Unity multiplayer", note: { en: "Networked mobile and PC clients — as in KoutQ8.", ar: "عملاء جوال وحاسوب مرتبطون بالشبكة — كما في كوت." } },
        { label: "iOS / Android / Web", note: { en: "Multiplayer clients across mobile and the browser.", ar: "عملاء لعب جماعي عبر الجوال والمتصفح." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "We define the multiplayer model — real-time vs turn-based, player counts, and architecture — typically 1-2 weeks.", ar: "نحدد نموذج اللعب الجماعي — فوري أم بالأدوار، وأعداد اللاعبين، والبنية — عادة أسبوع إلى أسبوعين." } },
        { title: { en: "Networking prototype", ar: "نموذج الشبكة" }, outcome: { en: "A working multiplayer prototype that proves sync, latency, and the core loop hold up.", ar: "نموذج لعب جماعي عامل يثبت ثبات التزامن وزمن الاستجابة والحلقة الأساسية." } },
        { title: { en: "Production", ar: "الإنتاج" }, outcome: { en: "Client and backend built together in sprints, with multiplayer playtests — timeline scales with scope.", ar: "العميل والواجهة الخلفية يُبنيان معًا في سباقات، مع اختبارات لعب جماعي — المدة تتناسب مع النطاق." } },
        { title: { en: "Load testing & QA", ar: "اختبار الحمل وضمان الجودة" }, outcome: { en: "Tested under concurrent load, with fairness and anti-cheat safeguards verified.", ar: "مُختبَر تحت حمل متزامن، مع التحقق من العدالة وضمانات مكافحة الغش." } },
        { title: { en: "Launch & live ops", ar: "الإطلاق والعمليات الحية" }, outcome: { en: "Servers deployed, monitored, and supported, with a plan for events and updates.", ar: "خوادم منشورة ومراقَبة ومدعومة، مع خطة للفعاليات والتحديثات." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "Multiplayer for the Gulf means designing for local players, latency, and social play styles.",
        ar: "اللعب الجماعي للخليج يعني التصميم للاعبين المحليين وزمن الاستجابة وأنماط اللعب الاجتماعية.",
      },
      points: [
        { title: { en: "Arabic-first social play", ar: "لعب اجتماعي عربي أولًا" }, body: { en: "Right-to-left lobbies, chat, and UI built for Arabic-speaking players — like Arrab.", ar: "ردهات ودردشة وواجهات من اليمين إلى اليسار مبنية للاعبين العرب — مثل العرّاب." } },
        { title: { en: "Regional latency awareness", ar: "وعي بزمن الاستجابة الإقليمي" }, body: { en: "Infrastructure choices that keep play responsive for GCC players.", ar: "خيارات بنية تحتية تبقي اللعب سريع الاستجابة للاعبي الخليج." } },
        { title: { en: "Same-timezone collaboration", ar: "تعاون في نفس المنطقة الزمنية" }, body: { en: "Live debugging and decisions during your working hours.", ar: "تصحيح مباشر وقرارات خلال ساعات عملك." } },
      ],
    },
    portfolio: {
      heading: { en: "Proof from our portfolio", ar: "دليل من أعمالنا" },
      intro: {
        en: "Real-time multiplayer games we've built:",
        ar: "ألعاب جماعية فورية بنيناها:",
      },
      items: [arrab, nabsh, koutq8],
    },
    faq: {
      heading: { en: "Multiplayer development FAQ", ar: "أسئلة شائعة عن تطوير الألعاب الجماعية" },
      items: [
        { q: { en: "Do you build real-time or turn-based multiplayer?", ar: "هل تبنون لعبًا جماعيًا فوريًا أم بالأدوار؟" }, a: { en: "Both. Arrab and Nabsh run real-time over Socket.IO, while card and board games can use turn-based models. We pick the model that fits the gameplay.", ar: "كلاهما. العرّاب ونبش يعملان فوريًا عبر Socket.IO، بينما يمكن لألعاب الورق واللوح استخدام نماذج بالأدوار. نختار النموذج المناسب للعب." } },
        { q: { en: "Can your multiplayer backend scale?", ar: "هل يمكن لواجهتكم الخلفية الجماعية التوسع؟" }, a: { en: "Yes. We design the backend and netcode to handle growing concurrent players, and we load-test before launch so the game holds up under real traffic.", ar: "نعم. نصمم الواجهة الخلفية وكود الشبكة للتعامل مع نمو اللاعبين المتزامنين، ونختبر الحمل قبل الإطلاق ليصمد اللعب تحت ضغط حقيقي." } },
        { q: { en: "Do you handle accounts, matchmaking, and leaderboards?", ar: "هل تتولون الحسابات ومطابقة اللاعبين ولوحات الصدارة؟" }, a: { en: "Yes — player accounts, profiles, friends, matchmaking, lobbies, and competitive leaderboards are all part of the multiplayer work.", ar: "نعم — حسابات اللاعبين والملفات والأصدقاء ومطابقة اللاعبين والردهات ولوحات الصدارة التنافسية كلها جزء من عمل اللعب الجماعي." } },
        { q: { en: "How do you keep multiplayer fair?", ar: "كيف تبقون اللعب الجماعي عادلًا؟" }, a: { en: "We use authoritative, server-side validation so the server is the source of truth, with safeguards against cheating built into the netcode.", ar: "نستخدم تحققًا موثوقًا من جانب الخادم بحيث يكون الخادم مصدر الحقيقة، مع ضمانات ضد الغش مدمجة في كود الشبكة." } },
        { q: { en: "Can you add multiplayer to an existing single-player game?", ar: "هل يمكنكم إضافة لعب جماعي للعبة فردية قائمة؟" }, a: { en: "Often, yes. We review your project first, then propose a networking architecture that fits the existing game rather than forcing a rewrite.", ar: "غالبًا نعم. نراجع مشروعك أولًا، ثم نقترح بنية شبكة تناسب اللعبة القائمة بدلًا من فرض إعادة كتابة." } },
      ],
    },
    cta: {
      title: { en: "Building a multiplayer game?", ar: "تبني لعبة جماعية؟" },
      body: { en: "Tell us how players will play together and we'll design the netcode and backend to match.", ar: "أخبرنا كيف سيلعب اللاعبون معًا وسنصمم كود الشبكة والواجهة الخلفية بما يناسب." },
    },
  },

  {
    slug: "unreal-engine-development",
    updatedAt: "2026-07-23",
    latinName: "Unreal Engine Development",
    serviceType: "Unreal Engine Development",
    metaTitle: {
      en: "Unreal Engine Development for Kuwait & the GCC | MetaHuman",
      ar: "تطوير Unreal Engine للكويت والخليج | ميتاهيومان",
    },
    metaDescription: {
      en: "Unreal Engine 5 development studio serving Kuwait and the GCC. Blueprints and C++, high-fidelity rendering, and realistic MetaHuman digital characters for games and interactive experiences — Arabic-first.",
      ar: "استوديو تطوير Unreal Engine 5 يخدم الكويت والخليج. برمجة بـ Blueprints وC++، وعرض عالي الدقة، وشخصيات رقمية واقعية بـ MetaHuman للألعاب والتجارب التفاعلية — بالعربية أولًا.",
    },
    hero: {
      eyebrow: { en: "Unreal Engine Development", ar: "تطوير Unreal Engine" },
      title: {
        en: "Unreal Engine 5 Development & MetaHuman",
        ar: "تطوير Unreal Engine 5 وميتاهيومان",
      },
      subtitle: {
        en: "High-fidelity 3D games and interactive experiences built in Unreal Engine 5 — with realistic MetaHuman digital characters — for clients across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "ألعاب وتجارب تفاعلية ثلاثية الأبعاد عالية الدقة مبنية على Unreal Engine 5 — مع شخصيات رقمية واقعية بـ MetaHuman — لعملاء في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "Unreal Engine 5 is where we build the studio's most visually ambitious work: high-fidelity 3D games, cinematic experiences, and realistic digital humans. We've already shipped an Unreal title — Power of Bombs, a top-down action arcade game — so this is production experience, not a sales pitch.",
        "We work in both Blueprints and C++, choosing visual scripting where it speeds iteration and native code where performance and architecture demand it. We lean on Unreal's modern rendering toolset — including Nanite-class geometry and Lumen-class dynamic lighting — to deliver visuals that hold up on a big screen, and we frame what's achievable honestly against your target hardware and budget rather than overpromising on a trailer.",
        "Beyond games, Unreal powers interactive experiences, archviz, product visualization, and real-time cinematics — and with MetaHuman we can bring believable digital characters into all of them, fully bilingual with Arabic and English support.",
      ],
      ar: [
        "Unreal Engine 5 هو حيث نبني أكثر أعمال الاستوديو طموحًا بصريًا: ألعاب ثلاثية الأبعاد عالية الدقة، وتجارب سينمائية، وبشر رقميون واقعيون. وقد أطلقنا بالفعل لعبة على Unreal — باور أوف بومبز، لعبة أركيد أكشن من منظور علوي — فهذه خبرة إنتاج حقيقية، لا حديث تسويق.",
        "نعمل بكل من Blueprints وC++، نختار البرمجة المرئية حيث تسرّع التكرار، والكود الأصلي حيث يتطلب الأداء والبنية ذلك. ونعتمد على أدوات العرض الحديثة في Unreal — بما فيها هندسة بمستوى Nanite وإضاءة ديناميكية بمستوى Lumen — لتقديم رسوميات تصمد على الشاشة الكبيرة، ونصف ما يمكن تحقيقه بصدق مقابل عتادك المستهدف وميزانيتك بدلًا من المبالغة في وعود مقطع دعائي.",
        "وإلى جانب الألعاب، يشغّل Unreal التجارب التفاعلية، والتصور المعماري، وتصوير المنتجات، والسينمائيات الفورية — وبواسطة MetaHuman يمكننا جلب شخصيات رقمية مقنعة إلى كل ذلك، ثنائية اللغة بالكامل بدعم العربية والإنجليزية.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "Blueprints & C++", ar: "Blueprints وC++" }, body: { en: "Gameplay built in visual scripting and native C++ — the right tool for each system.", ar: "لعب مبني بالبرمجة المرئية وC++ الأصلي — الأداة المناسبة لكل نظام." } },
        { title: { en: "High-fidelity rendering", ar: "عرض عالي الدقة" }, body: { en: "Modern UE5 lighting, materials, and geometry tuned to look great within your target hardware.", ar: "إضاءة ومواد وهندسة حديثة في UE5 مضبوطة لتبدو رائعة ضمن عتادك المستهدف." } },
        { title: { en: "MetaHuman digital humans", ar: "بشر رقميون بـ MetaHuman" }, body: { en: "Realistic, riggable characters built with MetaHuman for games, cinematics, and experiences.", ar: "شخصيات واقعية قابلة للتحريك مبنية بـ MetaHuman للألعاب والسينمائيات والتجارب." } },
        { title: { en: "3D & cinematics", ar: "ثلاثي الأبعاد وسينمائيات" }, body: { en: "Environments, characters, and real-time cinematic sequences built in Unreal.", ar: "بيئات وشخصيات ومشاهد سينمائية فورية مبنية في Unreal." } },
        { title: { en: "Interactive experiences", ar: "تجارب تفاعلية" }, body: { en: "Beyond games: archviz, product visualization, and branded interactive experiences.", ar: "ما وراء الألعاب: تصور معماري، وتصوير منتجات، وتجارب تفاعلية للعلامات التجارية." } },
        { title: { en: "Optimization & launch", ar: "التحسين والإطلاق" }, body: { en: "Profiling, scalability settings, and platform builds for PC, console, and mobile.", ar: "تحليل أداء، وإعدادات قابلية التوسع، وبناءات منصات للحاسوب والكونسول والجوال." } },
      ],
    },
    platforms: {
      heading: { en: "Tech & platforms", ar: "التقنيات والمنصات" },
      intro: {
        en: "Unreal Engine 5 at the core, with MetaHuman for characters and exports to every major target.",
        ar: "Unreal Engine 5 في القلب، مع MetaHuman للشخصيات وتصدير لكل هدف رئيسي.",
      },
      items: [
        { label: "Unreal Engine 5", note: { en: "Our high-fidelity engine — the tech behind Power of Bombs.", ar: "محركنا عالي الدقة — التقنية وراء باور أوف بومبز." } },
        { label: "Blueprints + C++", note: { en: "Visual scripting and native code, used together.", ar: "برمجة مرئية وكود أصلي، يُستخدمان معًا." } },
        { label: "MetaHuman", note: { en: "Realistic digital humans for characters and cinematics.", ar: "بشر رقميون واقعيون للشخصيات والسينمائيات." } },
        { label: "PC & Console", note: { en: "Desktop and console-class builds and distribution.", ar: "بناءات وتوزيع لسطح المكتب وبمستوى الكونسول." } },
        { label: "Mobile & Web", note: { en: "Scaled-down UE5 builds where the project calls for them.", ar: "بناءات UE5 مصغّرة حيث يحتاج المشروع إليها." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "We agree on visual targets, scope, and the hardware you're building for — typically 1-2 weeks.", ar: "نتفق على الأهداف البصرية والنطاق والعتاد الذي تبني له — عادة أسبوع إلى أسبوعين." } },
        { title: { en: "Look & tech prototype", ar: "نموذج المظهر والتقنية" }, outcome: { en: "A vertical slice in UE5 proving both the look and the frame rate hold up together.", ar: "شريحة عمودية في UE5 تثبت ثبات المظهر ومعدل الإطارات معًا." } },
        { title: { en: "Production", ar: "الإنتاج" }, outcome: { en: "Art, gameplay, MetaHuman characters, and systems built in sprints — timeline scales with fidelity and scope.", ar: "فن ولعب وشخصيات MetaHuman وأنظمة تُبنى في سباقات — المدة تتناسب مع الدقة والنطاق." } },
        { title: { en: "Optimization & QA", ar: "التحسين وضمان الجودة" }, outcome: { en: "Profiled and scaled across target hardware so the visuals stay smooth, not just pretty.", ar: "مُحلَّل ومُحجَّم عبر العتاد المستهدف لتبقى الرسوميات سلسة، لا جميلة فقط." } },
        { title: { en: "Launch & support", ar: "الإطلاق والدعم" }, outcome: { en: "Platform builds shipped with launch support and a maintenance plan.", ar: "بناءات منصات تُطلق مع دعم الإطلاق وخطة صيانة." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "High-fidelity work for the Gulf benefits from a team that understands the region's audiences, languages, and cultural detail.",
        ar: "الأعمال عالية الدقة للخليج تستفيد من فريق يفهم جماهير المنطقة ولغاتها وتفاصيلها الثقافية.",
      },
      points: [
        { title: { en: "Bilingual MetaHumans", ar: "ميتاهيومان ثنائي اللغة" }, body: { en: "Digital characters that speak and read naturally in both Arabic and English.", ar: "شخصيات رقمية تتحدث وتُقرأ بطبيعية بالعربية والإنجليزية." } },
        { title: { en: "Culturally grounded detail", ar: "تفاصيل متجذرة ثقافيًا" }, body: { en: "Characters, environments, and tone that feel right to Gulf audiences.", ar: "شخصيات وبيئات ونبرة تبدو صحيحة لجماهير الخليج." } },
        { title: { en: "Same-timezone collaboration", ar: "تعاون في نفس المنطقة الزمنية" }, body: { en: "Reviews of look-dev and builds during your working day.", ar: "مراجعات تطوير المظهر والبناءات خلال يوم عملك." } },
      ],
    },
    portfolio: {
      heading: { en: "Proof from our portfolio", ar: "دليل من أعمالنا" },
      intro: {
        en: "Unreal Engine work from our portfolio:",
        ar: "أعمال Unreal Engine من أعمالنا:",
      },
      items: [powerOfBombs],
    },
    faq: {
      heading: { en: "Unreal Engine development FAQ", ar: "أسئلة شائعة عن تطوير Unreal Engine" },
      items: [
        { q: { en: "What is MetaHuman and what do you use it for?", ar: "ما هو MetaHuman وفيم تستخدمونه؟" }, a: { en: "MetaHuman is Epic's framework for creating highly realistic, fully riggable digital humans inside Unreal Engine. We use it for believable game characters, real-time cinematics, virtual presenters, and interactive experiences — all with natural Arabic and English support.", ar: "MetaHuman هو إطار عمل Epic لإنشاء بشر رقميين واقعيين بدرجة عالية وقابلين للتحريك بالكامل داخل Unreal Engine. نستخدمه لشخصيات ألعاب مقنعة، وسينمائيات فورية، ومقدّمين افتراضيين، وتجارب تفاعلية — كلها بدعم طبيعي للعربية والإنجليزية." } },
        { q: { en: "Do you write C++ or just Blueprints?", ar: "هل تكتبون C++ أم Blueprints فقط؟" }, a: { en: "Both. We use Blueprints for fast iteration and designer-friendly logic, and C++ for performance-critical systems and clean architecture. We pick per system, not dogmatically.", ar: "كلاهما. نستخدم Blueprints للتكرار السريع والمنطق الصديق للمصممين، وC++ للأنظمة الحساسة للأداء والبنية النظيفة. نختار لكل نظام، لا بشكل متعصب." } },
        { q: { en: "Can Unreal games run on mobile?", ar: "هل يمكن لألعاب Unreal أن تعمل على الجوال؟" }, a: { en: "Yes, with the right scope. UE5 scales down to mobile, but high-end features have a cost — we set realistic visual targets for your hardware up front rather than promising console fidelity on a phone.", ar: "نعم، بالنطاق المناسب. يتقلص UE5 ليناسب الجوال، لكن للميزات الراقية تكلفة — نضع أهدافًا بصرية واقعية لعتادك مسبقًا بدلًا من وعد بدقة الكونسول على الهاتف." } },
        { q: { en: "Do you only build games in Unreal?", ar: "هل تبنون ألعابًا فقط في Unreal؟" }, a: { en: "No. Unreal also powers interactive experiences, architectural visualization, product visualization, and real-time cinematics — we build those too, often featuring MetaHuman characters.", ar: "لا. يشغّل Unreal أيضًا التجارب التفاعلية، والتصور المعماري، وتصوير المنتجات، والسينمائيات الفورية — نبنيها أيضًا، وغالبًا بشخصيات MetaHuman." } },
        { q: { en: "Unreal or Unity — which should I choose?", ar: "Unreal أم Unity — أيهما أختار؟" }, a: { en: "Unreal shines for high-fidelity 3D, cinematics, and realistic characters; Unity is excellent for cross-platform and mobile-first games. We work in both and recommend the engine that fits your game, not the one we feel like using.", ar: "يتألق Unreal في الأعمال ثلاثية الأبعاد عالية الدقة والسينمائيات والشخصيات الواقعية؛ وUnity ممتاز للألعاب متعددة المنصات والجوال أولًا. نعمل بكليهما ونوصي بالمحرك المناسب للعبتك، لا الذي نرغب باستخدامه." } },
      ],
    },
    cta: {
      title: { en: "Building something in Unreal?", ar: "تبني شيئًا في Unreal؟" },
      body: { en: "Tell us about your game, cinematic, or MetaHuman project and we'll scope the visuals honestly.", ar: "أخبرنا عن لعبتك أو سينمائيتك أو مشروع MetaHuman وسنحدد نطاق الرسوميات بصدق." },
    },
  },

  {
    slug: "app-development",
    updatedAt: "2026-07-23",
    latinName: "App Development",
    serviceType: "Mobile App Development",
    metaTitle: {
      en: "App Development for Kuwait & the GCC | iOS & Android",
      ar: "تطوير التطبيقات للكويت والخليج | iOS وAndroid",
    },
    metaDescription: {
      en: "Mobile app development studio serving Kuwait and the GCC. We build interactive, gamified iOS and Android apps — Unity, native, and web stacks — Arabic-first with proper RTL.",
      ar: "استوديو تطوير تطبيقات يخدم الكويت والخليج. نبني تطبيقات iOS وAndroid تفاعلية وملعّبة — تقنيات Unity وأصلية وويب — بالعربية أولًا مع تخطيط صحيح من اليمين إلى اليسار.",
    },
    hero: {
      eyebrow: { en: "App Development", ar: "تطوير التطبيقات" },
      title: {
        en: "Mobile App Development for iOS & Android",
        ar: "تطوير تطبيقات الجوال لـ iOS وAndroid",
      },
      subtitle: {
        en: "We don't only build games — we build apps. Interactive, gamified, and companion apps for iOS and Android, for clients across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "نحن لا نبني الألعاب فقط — بل نبني التطبيقات. تطبيقات تفاعلية وملعّبة ومرافقة لـ iOS وAndroid، لعملاء في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "The same engineering and design discipline that ships our games builds great apps. Years of making interactive, real-time products gives us an edge most app shops don't have: we know how to make an app feel responsive, rewarding, and worth opening every day — not just functional.",
        "Buried Games Studio builds mobile apps end to end: product design, UI/UX, engineering, backend, and store launch on both the App Store and Google Play. We're especially strong on interactive and gamified apps — loyalty mechanics, progression, leaderboards, and playful interactions — as well as game companion apps that connect to a live title.",
        "We frame our stack honestly: Unity when an app is graphics-heavy or shares systems with a game, native or web technologies when a leaner, platform-standard build is the right call. Every app ships Arabic-first with proper right-to-left layout alongside English.",
      ],
      ar: [
        "الانضباط الهندسي والتصميمي نفسه الذي يطلق ألعابنا يبني تطبيقات رائعة. سنوات من صناعة منتجات تفاعلية فورية تمنحنا ميزة لا تملكها معظم شركات التطبيقات: نعرف كيف نجعل التطبيق سريع الاستجابة ومجزيًا ويستحق فتحه كل يوم — لا مجرد عملي.",
        "يبني استوديو بريد جيمز تطبيقات الجوال من البداية إلى النهاية: تصميم المنتج، وتجربة وواجهة المستخدم، والبرمجة، والواجهة الخلفية، والإطلاق على كل من App Store وGoogle Play. ونحن أقوياء بشكل خاص في التطبيقات التفاعلية والملعّبة — آليات الولاء، والتقدم، ولوحات الصدارة، والتفاعلات المرحة — إضافة إلى تطبيقات مرافقة للألعاب ترتبط بلعبة حية.",
        "نصف تقنياتنا بصدق: Unity حين يكون التطبيق ثقيل الرسوميات أو يشارك أنظمة مع لعبة، وتقنيات أصلية أو ويب حين يكون البناء الأنحف والمعياري للمنصة هو القرار الصحيح. كل تطبيق يُطلق بالعربية أولًا مع تخطيط صحيح من اليمين إلى اليسار إلى جانب الإنجليزية.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "Product & UX design", ar: "تصميم المنتج وتجربة المستخدم" }, body: { en: "User flows, wireframes, and interface design built around how people actually use your app.", ar: "تدفقات المستخدم، والمخططات الهيكلية، وتصميم الواجهة المبني على كيفية استخدام الناس لتطبيقك فعلًا." } },
        { title: { en: "iOS & Android builds", ar: "بناءات iOS وAndroid" }, body: { en: "Apps for both platforms, with the stack chosen to fit the app's needs.", ar: "تطبيقات للمنصتين، مع اختيار التقنية بما يناسب احتياجات التطبيق." } },
        { title: { en: "Gamified interactions", ar: "تفاعلات ملعّبة" }, body: { en: "Progression, rewards, leaderboards, and playful mechanics that boost engagement.", ar: "تقدم ومكافآت ولوحات صدارة وآليات مرحة تعزز التفاعل." } },
        { title: { en: "Backend & accounts", ar: "الواجهة الخلفية والحسابات" }, body: { en: "Authentication, data, notifications, and scalable APIs behind your app.", ar: "مصادقة وبيانات وإشعارات وواجهات برمجية قابلة للتطوير خلف تطبيقك." } },
        { title: { en: "Game companion apps", ar: "تطبيقات مرافقة للألعاب" }, body: { en: "Companion apps that connect to a live game — profiles, stats, and second-screen features.", ar: "تطبيقات مرافقة ترتبط بلعبة حية — ملفات شخصية وإحصائيات وميزات الشاشة الثانية." } },
        { title: { en: "Store launch & updates", ar: "إطلاق المتجر والتحديثات" }, body: { en: "App Store and Google Play submission, plus post-launch updates and analytics.", ar: "تقديم على App Store وGoogle Play، إضافة إلى تحديثات ما بعد الإطلاق والتحليلات." } },
      ],
    },
    platforms: {
      heading: { en: "Stack & platforms", ar: "التقنيات والمنصات" },
      intro: {
        en: "We choose the stack to fit the app — graphics-heavy, native-lean, or web-based.",
        ar: "نختار التقنية بما يناسب التطبيق — ثقيل الرسوميات، أو أصلي خفيف، أو قائم على الويب.",
      },
      items: [
        { label: "Unity", note: { en: "For graphics-rich, interactive, and game-adjacent apps.", ar: "للتطبيقات الغنية بالرسوميات والتفاعلية والقريبة من الألعاب." } },
        { label: "Native iOS / Android", note: { en: "Lean, platform-standard builds where they fit best.", ar: "بناءات خفيفة معيارية للمنصة حيث تناسب أكثر." } },
        { label: "Web / Next.js", note: { en: "Progressive web apps and web-based products, like our browser games.", ar: "تطبيقات ويب تقدمية ومنتجات قائمة على الويب، مثل ألعاب المتصفح لدينا." } },
        { label: "App Store & Google Play", note: { en: "Full submission and review on both stores — we've shipped live.", ar: "تقديم ومراجعة كاملان على المتجرين — لدينا إصدارات حية." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "We define the app's purpose, users, features, and platforms — typically 1-2 weeks.", ar: "نحدد غرض التطبيق ومستخدميه وميزاته ومنصاته — عادة أسبوع إلى أسبوعين." } },
        { title: { en: "Design & prototype", ar: "التصميم والنموذج" }, outcome: { en: "Clickable UX flows and an interactive prototype to validate the experience before build.", ar: "تدفقات تجربة قابلة للنقر ونموذج تفاعلي للتحقق من التجربة قبل البناء." } },
        { title: { en: "Build", ar: "البناء" }, outcome: { en: "Frontend, backend, and integrations developed in sprints with installable builds — timeline scales with scope.", ar: "الواجهة الأمامية والخلفية والتكاملات تُطوَّر في سباقات مع بناءات قابلة للتثبيت — المدة تتناسب مع النطاق." } },
        { title: { en: "QA & optimization", ar: "ضمان الجودة والتحسين" }, outcome: { en: "Tested across real devices for performance, stability, and a polished feel.", ar: "مُختبَر على أجهزة حقيقية للأداء والاستقرار والإحساس المصقول." } },
        { title: { en: "Launch & updates", ar: "الإطلاق والتحديثات" }, outcome: { en: "App Store and Google Play submission, launch support, and a plan for ongoing updates.", ar: "تقديم على App Store وGoogle Play، ودعم الإطلاق، وخطة للتحديثات المستمرة." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "Gulf users expect apps that feel local — in language, layout, and the little interaction details.",
        ar: "يتوقع مستخدمو الخليج تطبيقات تبدو محلية — في اللغة والتخطيط وتفاصيل التفاعل الصغيرة.",
      },
      points: [
        { title: { en: "Arabic-first, RTL-native", ar: "عربية أولًا، أصيلة في RTL" }, body: { en: "Right-to-left layouts and Arabic typography built in from the first screen.", ar: "تخطيطات من اليمين إلى اليسار وطباعة عربية مبنية منذ الشاشة الأولى." } },
        { title: { en: "Engagement that sticks", ar: "تفاعل يدوم" }, body: { en: "Game-honed mechanics that keep users coming back, applied to everyday apps.", ar: "آليات مصقولة من الألعاب تُبقي المستخدمين عائدين، مطبقة على التطبيقات اليومية." } },
        { title: { en: "Same-timezone collaboration", ar: "تعاون في نفس المنطقة الزمنية" }, body: { en: "Decisions and reviews during your working hours.", ar: "قرارات ومراجعات خلال ساعات عملك." } },
      ],
    },
    portfolio: {
      heading: { en: "Proof from our portfolio", ar: "دليل من أعمالنا" },
      intro: {
        en: "Interactive products we've shipped — the same craft goes into our apps:",
        ar: "منتجات تفاعلية أطلقناها — الحرفية نفسها تدخل في تطبيقاتنا:",
      },
      items: [koutq8, nabsh],
    },
    faq: {
      heading: { en: "App development FAQ", ar: "أسئلة شائعة عن تطوير التطبيقات" },
      items: [
        { q: { en: "Do you build apps as well as games?", ar: "هل تبنون تطبيقات إلى جانب الألعاب؟" }, a: { en: "Yes. We build mobile apps end to end — design, engineering, backend, and store launch. Our game-building background is an advantage: we make apps feel interactive and engaging, not just functional.", ar: "نعم. نبني تطبيقات الجوال من البداية إلى النهاية — تصميم وبرمجة وواجهة خلفية وإطلاق على المتاجر. خلفيتنا في صناعة الألعاب ميزة: نجعل التطبيقات تفاعلية وجذابة، لا مجرد عملية." } },
        { q: { en: "What is a gamified app?", ar: "ما هو التطبيق الملعّب؟" }, a: { en: "It's an app that borrows game mechanics — points, progression, rewards, leaderboards, and playful feedback — to make everyday tasks more engaging and boost retention. It's a real strength of ours given our game work.", ar: "هو تطبيق يستعير آليات الألعاب — نقاط، وتقدم، ومكافآت، ولوحات صدارة، وتغذية راجعة مرحة — لجعل المهام اليومية أكثر جاذبية وزيادة الاحتفاظ. وهي قوة حقيقية لدينا بفضل عملنا في الألعاب." } },
        { q: { en: "Do you build native or cross-platform apps?", ar: "هل تبنون تطبيقات أصلية أم متعددة المنصات؟" }, a: { en: "Both, depending on the app. We use Unity for graphics-heavy and game-adjacent apps, native technologies for lean platform-standard builds, and web stacks for progressive web apps — chosen to fit your needs.", ar: "كلاهما، حسب التطبيق. نستخدم Unity للتطبيقات ثقيلة الرسوميات والقريبة من الألعاب، والتقنيات الأصلية للبناءات الخفيفة المعيارية للمنصة، وتقنيات الويب لتطبيقات الويب التقدمية — يُختار بما يناسب احتياجاتك." } },
        { q: { en: "Can you build a companion app for our game?", ar: "هل يمكنكم بناء تطبيق مرافق للعبتنا؟" }, a: { en: "Yes. We build companion apps that connect to a live game — player profiles, stats, second-screen features, and community tools — wired into your existing backend.", ar: "نعم. نبني تطبيقات مرافقة ترتبط بلعبة حية — ملفات لاعبين، وإحصائيات، وميزات الشاشة الثانية، وأدوات مجتمع — موصولة بواجهتك الخلفية القائمة." } },
        { q: { en: "Will the app work in Arabic?", ar: "هل سيعمل التطبيق بالعربية؟" }, a: { en: "Yes. Arabic is first-class — right-to-left layout and natural Arabic content alongside English, designed for Gulf users from the start.", ar: "نعم. العربية أساسية — تخطيط من اليمين إلى اليسار ومحتوى عربي طبيعي إلى جانب الإنجليزية، مصمم لمستخدمي الخليج منذ البداية." } },
      ],
    },
    cta: {
      title: { en: "Have an app in mind?", ar: "لديك تطبيق في بالك؟" },
      body: { en: "Tell us what your app should do and we'll come back with a clear scope and the right stack.", ar: "أخبرنا بما يجب أن يفعله تطبيقك وسنعود إليك بنطاق واضح والتقنية المناسبة." },
    },
  },

  {
    slug: "web-development",
    updatedAt: "2026-07-23",
    latinName: "Web Development",
    serviceType: "Web Development",
    metaTitle: {
      en: "Web Development for the GCC | Bilingual RTL Websites",
      ar: "تطوير الويب للخليج | مواقع ثنائية اللغة بدعم RTL",
    },
    metaDescription: {
      en: "Web development studio serving Kuwait and the GCC. We build modern Next.js websites, web apps, and browser games — bilingual, Arabic-first, RTL-native, fast, and SEO-ready.",
      ar: "استوديو تطوير ويب يخدم الكويت والخليج. نبني مواقع وتطبيقات ويب وألعاب متصفح حديثة بـ Next.js — ثنائية اللغة، عربية أولًا، أصيلة في RTL، سريعة وجاهزة للسيو.",
    },
    hero: {
      eyebrow: { en: "Web Development", ar: "تطوير الويب" },
      title: {
        en: "Websites & Web Experiences for the GCC",
        ar: "مواقع وتجارب ويب للخليج",
      },
      subtitle: {
        en: "Modern, fast, bilingual web apps and browser games built with Next.js — Arabic-first and RTL-native — for clients across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "تطبيقات ويب وألعاب متصفح حديثة وسريعة وثنائية اللغة مبنية بـ Next.js — عربية أولًا وأصيلة في RTL — لعملاء في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "We build for the web the same way we build games: with performance, polish, and real interactivity. This very site is a Next.js app, and we've shipped real-time browser games on the web — Arrab, a Socket.IO Mafia game, and Nabsh, a live multiplayer trivia game — so web isn't a sideline for us, it's a core platform.",
        "Buried Games Studio builds modern websites, web apps, landing pages, and browser-based games with Next.js, TypeScript, and a clean component architecture. Everything ships bilingual by default — Arabic-first with genuine right-to-left layout, not a mirrored afterthought — alongside English, with the SEO, accessibility, and Core Web Vitals work that gets sites found and keeps them fast.",
        "Whether you need a marketing site that loads instantly, a web app with real-time features, or an instant-play browser game, we bring game-grade interactivity and engineering discipline to the browser.",
      ],
      ar: [
        "نبني للويب بالطريقة نفسها التي نبني بها الألعاب: بالأداء والصقل والتفاعل الحقيقي. هذا الموقع نفسه تطبيق Next.js، وقد أطلقنا ألعاب متصفح فورية على الويب — العرّاب، لعبة مافيا بـ Socket.IO، ونبش، لعبة تريفيا جماعية مباشرة — فالويب ليس نشاطًا جانبيًا لنا، بل منصة أساسية.",
        "يبني استوديو بريد جيمز مواقع ويب حديثة وتطبيقات ويب وصفحات هبوط وألعابًا قائمة على المتصفح بـ Next.js وTypeScript وبنية مكوّنات نظيفة. كل شيء يُطلق ثنائي اللغة افتراضيًا — عربية أولًا بتخطيط حقيقي من اليمين إلى اليسار، لا انعكاس مرتجل — إلى جانب الإنجليزية، مع أعمال السيو وإمكانية الوصول ومؤشرات الويب الأساسية التي تجعل المواقع تُكتشف وتبقى سريعة.",
        "سواء احتجت موقعًا تسويقيًا يُحمّل فورًا، أو تطبيق ويب بميزات فورية، أو لعبة متصفح تُلعب فورًا، نجلب تفاعلية بمستوى الألعاب وانضباطًا هندسيًا إلى المتصفح.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "Next.js websites & web apps", ar: "مواقع وتطبيقات ويب بـ Next.js" }, body: { en: "Fast, modern sites and apps with a clean, maintainable component architecture.", ar: "مواقع وتطبيقات سريعة وحديثة ببنية مكوّنات نظيفة وقابلة للصيانة." } },
        { title: { en: "Bilingual, RTL-first", ar: "ثنائية اللغة، RTL أولًا" }, body: { en: "Genuine Arabic right-to-left layouts and English, handled with logical CSS, not hacks.", ar: "تخطيطات عربية حقيقية من اليمين إلى اليسار والإنجليزية، بـ CSS منطقي لا حيل." } },
        { title: { en: "Browser games", ar: "ألعاب المتصفح" }, body: { en: "Instant-play web games with real-time multiplayer — as in Arrab and Nabsh.", ar: "ألعاب ويب تُلعب فورًا بلعب جماعي فوري — كما في العرّاب ونبش." } },
        { title: { en: "SEO & performance", ar: "السيو والأداء" }, body: { en: "Structured data, metadata, and Core Web Vitals tuning so sites rank and load fast.", ar: "بيانات منظمة، وبيانات وصفية، وضبط مؤشرات الويب الأساسية لترتيب المواقع وسرعة تحميلها." } },
        { title: { en: "Accessibility", ar: "إمكانية الوصول" }, body: { en: "Keyboard navigation, focus states, and semantic markup built in, not bolted on.", ar: "تنقل بلوحة المفاتيح، وحالات تركيز، وترميز دلالي مبني داخليًا لا مضاف لاحقًا." } },
        { title: { en: "Backend & integrations", ar: "الواجهة الخلفية والتكاملات" }, body: { en: "APIs, content management, forms, and real-time features wired into your site.", ar: "واجهات برمجية، وإدارة محتوى، ونماذج، وميزات فورية موصولة بموقعك." } },
      ],
    },
    platforms: {
      heading: { en: "Stack & platforms", ar: "التقنيات والمنصات" },
      intro: {
        en: "A modern, type-safe web stack — the same one behind this site and our browser games.",
        ar: "تقنية ويب حديثة وآمنة الأنواع — نفسها وراء هذا الموقع وألعاب المتصفح لدينا.",
      },
      items: [
        { label: "Next.js & React", note: { en: "Our core web framework — fast, SEO-friendly, and scalable.", ar: "إطار الويب الأساسي لدينا — سريع وصديق للسيو وقابل للتطوير." } },
        { label: "TypeScript", note: { en: "Type-safe code that stays maintainable as the project grows.", ar: "كود آمن الأنواع يبقى قابلًا للصيانة مع نمو المشروع." } },
        { label: "Socket.IO / Node.js", note: { en: "Real-time web features — the backbone of Arrab and Nabsh.", ar: "ميزات ويب فورية — العمود الفقري للعرّاب ونبش." } },
        { label: "Tailwind CSS", note: { en: "Logical, RTL-safe styling for true bilingual layouts.", ar: "تنسيق منطقي وآمن في RTL لتخطيطات ثنائية اللغة حقيقية." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "We define goals, content, audiences, and scope — typically 1-2 weeks.", ar: "نحدد الأهداف والمحتوى والجماهير والنطاق — عادة أسبوع إلى أسبوعين." } },
        { title: { en: "Design", ar: "التصميم" }, outcome: { en: "Bilingual layouts and a design direction validated before we write production code.", ar: "تخطيطات ثنائية اللغة وتوجه تصميمي يُتحقق منه قبل كتابة كود الإنتاج." } },
        { title: { en: "Build", ar: "البناء" }, outcome: { en: "Pages, components, and integrations developed in sprints with preview deploys — timeline scales with scope.", ar: "صفحات ومكوّنات وتكاملات تُطوَّر في سباقات مع نشر معاينة — المدة تتناسب مع النطاق." } },
        { title: { en: "SEO, a11y & QA", ar: "السيو وإمكانية الوصول وضمان الجودة" }, outcome: { en: "Metadata, structured data, accessibility, and Core Web Vitals verified across devices.", ar: "بيانات وصفية وبيانات منظمة وإمكانية وصول ومؤشرات ويب أساسية يُتحقق منها عبر الأجهزة." } },
        { title: { en: "Launch & support", ar: "الإطلاق والدعم" }, outcome: { en: "Deployment, launch checks, and an ongoing maintenance and improvement plan.", ar: "نشر، وفحوصات إطلاق، وخطة صيانة وتحسين مستمرة." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "A site for the Gulf needs Arabic done right — not a mirrored English layout with translated text dropped in.",
        ar: "موقع للخليج يحتاج عربية تُنفَّذ بشكل صحيح — لا تخطيطًا إنجليزيًا معكوسًا بنص مترجم مُلقى فيه.",
      },
      points: [
        { title: { en: "RTL done properly", ar: "RTL منفّذ بشكل سليم" }, body: { en: "Logical layouts, Arabic typography, and bilingual SEO with correct hreflang.", ar: "تخطيطات منطقية، وطباعة عربية، وسيو ثنائي اللغة بـ hreflang صحيح." } },
        { title: { en: "Performance for the region", ar: "أداء يناسب المنطقة" }, body: { en: "Fast loads and strong Core Web Vitals for visitors across the Gulf.", ar: "تحميل سريع ومؤشرات ويب أساسية قوية للزوار في عموم الخليج." } },
        { title: { en: "Same-timezone collaboration", ar: "تعاون في نفس المنطقة الزمنية" }, body: { en: "Reviews and decisions during your working day.", ar: "مراجعات وقرارات خلال يوم عملك." } },
      ],
    },
    portfolio: {
      heading: { en: "Proof from our portfolio", ar: "دليل من أعمالنا" },
      intro: {
        en: "Web products we've shipped — real proof, not screenshots:",
        ar: "منتجات ويب أطلقناها — دليل حقيقي، لا لقطات شاشة:",
      },
      items: [arrab, nabsh],
    },
    faq: {
      heading: { en: "Web development FAQ", ar: "أسئلة شائعة عن تطوير الويب" },
      items: [
        { q: { en: "Do you build regular websites or only games?", ar: "هل تبنون مواقع عادية أم ألعابًا فقط؟" }, a: { en: "We build both. This site is a Next.js app we built, and we ship marketing sites, web apps, and browser games. Our game background means our sites are fast and genuinely interactive.", ar: "نبني الاثنين. هذا الموقع تطبيق Next.js بنيناه، ونطلق مواقع تسويقية وتطبيقات ويب وألعاب متصفح. خلفيتنا في الألعاب تعني أن مواقعنا سريعة وتفاعلية حقًا." } },
        { q: { en: "Can you build a true Arabic / RTL website?", ar: "هل يمكنكم بناء موقع عربي / RTL حقيقي؟" }, a: { en: "Yes, and properly. We use logical CSS so the Arabic layout is genuinely right-to-left — not a mirrored English design — with correct typography and bilingual SEO including hreflang.", ar: "نعم، وبشكل سليم. نستخدم CSS منطقيًا ليكون التخطيط العربي من اليمين إلى اليسار حقًا — لا تصميمًا إنجليزيًا معكوسًا — بطباعة صحيحة وسيو ثنائي اللغة يشمل hreflang." } },
        { q: { en: "Can you build browser-based games?", ar: "هل يمكنكم بناء ألعاب قائمة على المتصفح؟" }, a: { en: "Yes — it's a specialty. Arrab is a real-time Socket.IO Mafia game and Nabsh is a live multiplayer trivia game, both running in the browser with no install.", ar: "نعم — إنها تخصص. العرّاب لعبة مافيا فورية بـ Socket.IO، ونبش لعبة تريفيا جماعية مباشرة، كلاهما يعمل في المتصفح دون تثبيت." } },
        { q: { en: "Will my site be fast and SEO-ready?", ar: "هل سيكون موقعي سريعًا وجاهزًا للسيو؟" }, a: { en: "Yes. We build with Next.js and tune Core Web Vitals, add structured data and per-language metadata, and ship accessible, semantic markup so your site ranks and loads quickly.", ar: "نعم. نبني بـ Next.js ونضبط مؤشرات الويب الأساسية، ونضيف بيانات منظمة وبيانات وصفية لكل لغة، ونطلق ترميزًا دلاليًا ومتاحًا ليرتقي موقعك ويُحمّل بسرعة." } },
        { q: { en: "Can you redesign or take over an existing site?", ar: "هل يمكنكم إعادة تصميم موقع قائم أو استلامه؟" }, a: { en: "Often, yes. We review the current site and codebase first, then propose the cleanest path to redesign, rebuild, or extend it rather than starting from scratch by default.", ar: "غالبًا نعم. نراجع الموقع الحالي وقاعدة الكود أولًا، ثم نقترح أنظف مسار لإعادة التصميم أو البناء أو التوسعة بدلًا من البدء من الصفر افتراضيًا." } },
      ],
    },
    cta: {
      title: { en: "Need a website or web app?", ar: "تحتاج موقعًا أو تطبيق ويب؟" },
      body: { en: "Tell us what you're building for the web and we'll come back with a clear scope and plan.", ar: "أخبرنا بما تبنيه للويب وسنعود إليك بنطاق وخطة واضحين." },
    },
  },

  {
    slug: "game-art-design",
    updatedAt: "2026-07-23",
    latinName: "Game Art & Design",
    serviceType: "Game Art and Design",
    metaTitle: {
      en: "2D & 3D Game Art, Animation & Design for the GCC",
      ar: "فن ورسوم وتصميم ألعاب ثنائية وثلاثية الأبعاد للخليج",
    },
    metaDescription: {
      en: "Game art and design studio serving Kuwait and the GCC. Concept art, 2D and 3D assets, character design, animation, and game UI/UX — all crafted in-house.",
      ar: "استوديو فن وتصميم ألعاب يخدم الكويت والخليج. فن مفاهيمي، وأصول ثنائية وثلاثية الأبعاد، وتصميم شخصيات، ورسوم متحركة، وواجهة وتجربة مستخدم للألعاب — كلها مصنوعة داخليًا.",
    },
    hero: {
      eyebrow: { en: "Game Art & Design", ar: "فن وتصميم الألعاب" },
      title: {
        en: "2D & 3D Game Art, Animation & Design",
        ar: "فن ورسوم وتصميم ألعاب ثنائية وثلاثية الأبعاد",
      },
      subtitle: {
        en: "Concept art, 2D and 3D assets, character design, animation, and game UI/UX — crafted in-house for clients across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "فن مفاهيمي، وأصول ثنائية وثلاثية الأبعاد، وتصميم شخصيات، ورسوم متحركة، وواجهة وتجربة مستخدم للألعاب — مصنوعة داخليًا لعملاء في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "Art is what players see first and remember longest. Our in-house artists handle the full visual side of a game: concept art and art direction, 2D and 3D assets, character and environment design, animation, visual effects, and the game UI/UX that ties it all together.",
        "This isn't outsourced or stock — it's the same team that drew every sprite of Gathered by the Light by hand, designed the look of Power of Bombs in Unreal, and built the bilingual interfaces of Arrab and Nabsh. We can deliver art as a complete package alongside a full game build, or as a standalone service for studios that need a visual partner.",
        "We work across styles — pixel art, stylized, and realistic — and tune every asset to perform on the target platform. And because we design interfaces for Arabic and English from the start, our game UI is genuinely bilingual, with right-to-left layouts that feel native rather than mirrored.",
      ],
      ar: [
        "الفن هو أول ما يراه اللاعبون وأطول ما يتذكرونه. يتولى فنانونا الداخليون الجانب البصري الكامل للعبة: الفن المفاهيمي والتوجيه الفني، والأصول ثنائية وثلاثية الأبعاد، وتصميم الشخصيات والبيئات، والرسوم المتحركة، والمؤثرات البصرية، وواجهة وتجربة مستخدم اللعبة التي تربط كل ذلك.",
        "هذا ليس عملًا خارجيًا أو جاهزًا — إنه الفريق نفسه الذي رسم كل عنصر في Gathered by the Light يدويًا، وصمم مظهر باور أوف بومبز في Unreal، وبنى الواجهات ثنائية اللغة للعرّاب ونبش. يمكننا تسليم الفن كحزمة كاملة إلى جانب بناء لعبة كامل، أو كخدمة مستقلة للاستوديوهات التي تحتاج شريكًا بصريًا.",
        "نعمل عبر أنماط متعددة — فن البكسل، والمنمّق، والواقعي — ونضبط كل أصل ليؤدي على المنصة المستهدفة. ولأننا نصمم الواجهات للعربية والإنجليزية منذ البداية، فإن واجهات ألعابنا ثنائية اللغة حقًا، بتخطيطات من اليمين إلى اليسار تبدو محلية لا معكوسة.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "Concept art & art direction", ar: "الفن المفاهيمي والتوجيه الفني" }, body: { en: "The visual language of your game — mood, palette, and a consistent direction to build on.", ar: "اللغة البصرية للعبتك — الأجواء، ولوحة الألوان، وتوجه متسق نبني عليه." } },
        { title: { en: "2D assets & sprites", ar: "أصول ثنائية الأبعاد ورسوم" }, body: { en: "Characters, environments, props, and UI illustration — from pixel art to polished 2D.", ar: "شخصيات وبيئات وعناصر ورسوم واجهات — من فن البكسل إلى ثنائي الأبعاد المصقول." } },
        { title: { en: "3D modeling", ar: "نمذجة ثلاثية الأبعاد" }, body: { en: "Models, texturing, and optimized assets ready to drop into Unity or Unreal.", ar: "نماذج وكساء وأصول محسّنة جاهزة للإدراج في Unity أو Unreal." } },
        { title: { en: "Character design", ar: "تصميم الشخصيات" }, body: { en: "Memorable characters with consistent design across poses, expressions, and animation.", ar: "شخصيات لا تُنسى بتصميم متسق عبر الأوضاع والتعبيرات والرسوم المتحركة." } },
        { title: { en: "Animation & VFX", ar: "الرسوم المتحركة والمؤثرات البصرية" }, body: { en: "Character animation, UI motion, and visual effects that give the game life.", ar: "تحريك الشخصيات، وحركة الواجهات، ومؤثرات بصرية تمنح اللعبة الحياة." } },
        { title: { en: "Game UI/UX", ar: "واجهة وتجربة مستخدم اللعبة" }, body: { en: "Menus, HUDs, and flows designed bilingual and RTL-first for Gulf players.", ar: "قوائم، وواجهات عرض، وتدفقات مصممة ثنائية اللغة وRTL أولًا للاعبي الخليج." } },
      ],
    },
    platforms: {
      heading: { en: "Tools & styles", ar: "الأدوات والأنماط" },
      intro: {
        en: "We work across art styles and pipe assets cleanly into the engines we build in.",
        ar: "نعمل عبر أنماط فنية ونمرر الأصول بنظافة إلى المحركات التي نبني بها.",
      },
      items: [
        { label: "Pixel & 2D art", note: { en: "Hand-drawn sprites and stylized 2D — as in Gathered by the Light.", ar: "رسوم مرسومة يدويًا وثنائي أبعاد منمّق — كما في Gathered by the Light." } },
        { label: "3D & realistic", note: { en: "Models and look-dev for Unreal and Unity projects.", ar: "نماذج وتطوير مظهر لمشاريع Unreal وUnity." } },
        { label: "Animation", note: { en: "Character, UI, and effect animation tuned for performance.", ar: "تحريك الشخصيات والواجهات والمؤثرات مضبوط للأداء." } },
        { label: "Unity & Unreal pipelines", note: { en: "Assets optimized and integrated into the engine we ship in.", ar: "أصول محسّنة ومدمجة في المحرك الذي نطلق به." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery & moodboard", ar: "الاكتشاف ولوحة الإلهام" }, outcome: { en: "We agree on art direction, references, and style targets — typically 1-2 weeks.", ar: "نتفق على التوجيه الفني والمراجع وأهداف النمط — عادة أسبوع إلى أسبوعين." } },
        { title: { en: "Concept & style frames", ar: "المفهوم وإطارات النمط" }, outcome: { en: "Concept art and a style frame that lock the look before full asset production.", ar: "فن مفاهيمي وإطار نمط يثبتان المظهر قبل إنتاج الأصول الكامل." } },
        { title: { en: "Asset production", ar: "إنتاج الأصول" }, outcome: { en: "2D/3D assets, characters, and animation produced in batches with regular reviews — timeline scales with volume.", ar: "أصول ثنائية وثلاثية الأبعاد وشخصيات ورسوم متحركة تُنتج على دفعات مع مراجعات منتظمة — المدة تتناسب مع الكمية." } },
        { title: { en: "Integration", ar: "الدمج" }, outcome: { en: "Assets optimized and wired into Unity or Unreal so they look right in-engine, not just in a folder.", ar: "أصول محسّنة وموصولة في Unity أو Unreal لتبدو صحيحة داخل المحرك، لا في مجلد فقط." } },
        { title: { en: "Polish & handoff", ar: "الصقل والتسليم" }, outcome: { en: "Final polish pass and a clean, organized handoff of all source files.", ar: "تمريرة صقل نهائية وتسليم نظيف ومنظم لكل الملفات المصدرية." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "Visuals and interfaces for the Gulf benefit from a team that designs natively for Arabic and the region's tastes.",
        ar: "الرسوميات والواجهات للخليج تستفيد من فريق يصمم محليًا للعربية ولأذواق المنطقة.",
      },
      points: [
        { title: { en: "Bilingual, RTL-first UI", ar: "واجهة ثنائية اللغة، RTL أولًا" }, body: { en: "Game interfaces designed for Arabic right-to-left layouts from the first frame.", ar: "واجهات ألعاب مصممة لتخطيطات عربية من اليمين إلى اليسار منذ الإطار الأول." } },
        { title: { en: "Culturally grounded art", ar: "فن متجذر ثقافيًا" }, body: { en: "Characters, environments, and tone that resonate with Gulf players.", ar: "شخصيات وبيئات ونبرة تلامس لاعبي الخليج." } },
        { title: { en: "In-engine, not just pretty", ar: "داخل المحرك، لا مجرد جميل" }, body: { en: "Art optimized and integrated so it performs in the real game, by the team that builds it.", ar: "فن محسّن ومدمج ليؤدي في اللعبة الحقيقية، من الفريق الذي يبنيها." } },
      ],
    },
    portfolio: {
      heading: { en: "Proof from our portfolio", ar: "دليل من أعمالنا" },
      intro: {
        en: "In-house art and design from games we've shipped:",
        ar: "فن وتصميم داخلي من ألعاب أطلقناها:",
      },
      items: [gathered, powerOfBombs, arrab],
    },
    faq: {
      heading: { en: "Game art & design FAQ", ar: "أسئلة شائعة عن فن وتصميم الألعاب" },
      items: [
        { q: { en: "Do you offer art and design as a standalone service?", ar: "هل تقدمون الفن والتصميم كخدمة مستقلة؟" }, a: { en: "Yes. We deliver art as a complete package within a full game build, or as a standalone service for studios that need concept art, assets, animation, or game UI without the engineering.", ar: "نعم. نسلّم الفن كحزمة كاملة ضمن بناء لعبة كامل، أو كخدمة مستقلة للاستوديوهات التي تحتاج فنًا مفاهيميًا أو أصولًا أو رسومًا متحركة أو واجهة لعبة دون البرمجة." } },
        { q: { en: "What art styles do you work in?", ar: "بأي أنماط فنية تعملون؟" }, a: { en: "We work across pixel art, stylized, and realistic styles. Gathered by the Light is hand-drawn pixel art, Power of Bombs is a 3D Unreal look — we match the style to the game.", ar: "نعمل عبر فن البكسل والمنمّق والواقعي. Gathered by the Light فن بكسل مرسوم يدويًا، وباور أوف بومبز مظهر ثلاثي الأبعاد في Unreal — نطابق النمط مع اللعبة." } },
        { q: { en: "Is your art made in-house?", ar: "هل فنكم مصنوع داخليًا؟" }, a: { en: "Yes. Our own artists draw and model everything — every sprite in Gathered by the Light was hand-drawn by our team. It's not stock or outsourced.", ar: "نعم. فنانونا يرسمون وينمذجون كل شيء — كل عنصر في Gathered by the Light رسمه فريقنا يدويًا. ليس جاهزًا ولا خارجيًا." } },
        { q: { en: "Can you design game UI in Arabic?", ar: "هل يمكنكم تصميم واجهة لعبة بالعربية؟" }, a: { en: "Yes. We design game UI/UX bilingual and right-to-left first, so Arabic menus, HUDs, and flows feel native — as in Arrab and Nabsh — rather than a mirrored English layout.", ar: "نعم. نصمم واجهة وتجربة مستخدم اللعبة ثنائية اللغة ومن اليمين إلى اليسار أولًا، لتبدو القوائم وواجهات العرض والتدفقات العربية محلية — كما في العرّاب ونبش — لا تخطيطًا إنجليزيًا معكوسًا." } },
        { q: { en: "Do you deliver assets ready for Unity or Unreal?", ar: "هل تسلّمون أصولًا جاهزة لـ Unity أو Unreal؟" }, a: { en: "Yes. We optimize and integrate assets directly into Unity or Unreal so they look and perform right in-engine, and hand off clean, organized source files.", ar: "نعم. نحسّن وندمج الأصول مباشرة في Unity أو Unreal لتبدو وتؤدي بشكل صحيح داخل المحرك، ونسلّم ملفات مصدرية نظيفة ومنظمة." } },
      ],
    },
    cta: {
      title: { en: "Need art for your game?", ar: "تحتاج فنًا للعبتك؟" },
      body: { en: "Tell us about your project's visual needs and we'll propose an art direction and plan.", ar: "أخبرنا عن الاحتياجات البصرية لمشروعك وسنقترح توجيهًا فنيًا وخطة." },
    },
  },

  {
    slug: "interactive-installations",
    updatedAt: "2026-07-31",
    latinName: "Interactive Installations & IoT Experiences",
    serviceType: "Interactive Installation Development",
    metaTitle: {
      en: "Interactive Installations & IoT Experiences for Kuwait & the GCC",
      ar: "التركيبات التفاعلية وتجارب إنترنت الأشياء للكويت والخليج",
    },
    metaDescription: {
      en: "We design and build interactive installations for malls, events, and brand activations across Kuwait and the GCC — sensor floors, motion games, kiosk experiences, and IoT-driven games where the physical space is the controller.",
      ar: "نصمم وننفذ تركيبات تفاعلية للمولات والفعاليات وتفعيلات العلامات التجارية في الكويت والخليج — أرضيات بحساسات، وألعاب حركة، وتجارب أكشاك، وألعاب مدفوعة بإنترنت الأشياء حيث المساحة الفعلية هي وحدة التحكم.",
    },
    hero: {
      eyebrow: { en: "Interactive Installations", ar: "التركيبات التفاعلية" },
      title: {
        en: "Interactive Installations & IoT Experiences",
        ar: "التركيبات التفاعلية وتجارب إنترنت الأشياء",
      },
      subtitle: {
        en: "Games people step on, jump on, and gather around. We build sensor-driven installations for malls, events, and brand activations across Kuwait, Saudi Arabia, the UAE, and the GCC — where the floor, the wall, or the booth itself becomes the game.",
        ar: "ألعاب يقف الناس عليها ويقفزون فوقها ويتجمعون حولها. نبني تركيبات مدفوعة بالحساسات للمولات والفعاليات وتفعيلات العلامات التجارية في الكويت والسعودية والإمارات والخليج — حيث تصبح الأرضية أو الجدار أو الجناح نفسه هو اللعبة.",
      },
    },
    intro: {
      en: [
        "A screen alone doesn't stop foot traffic in a mall — but a floor that lights up when a child jumps on it does. Buried Games Studio designs and builds interactive installations for clients across Kuwait and the GCC: sensor floors and buttons wired to on-screen games, prize and reward systems, motion-reactive walls, and branded kiosk experiences that run unattended all day.",
        "Because we're a game studio first, the difference shows where it matters: the experience is an actual game with attract loops, suspense, and a win moment — not a sensor demo. And because installations live in public spaces, we engineer them like products: kiosk-mode software that starts from a wall switch, hardware chosen for thousands of plays, swappable parts, and bilingual Arabic-English screens as standard.",
      ],
      ar: [
        "الشاشة وحدها لا توقف المارّة في المول — لكن أرضية تضيء حين يقفز عليها طفل تفعل. يصمم استوديو بريد جيمز وينفذ تركيبات تفاعلية لعملاء في الكويت والخليج: أرضيات وأزرار بحساسات موصولة بألعاب على الشاشة، وأنظمة جوائز ومكافآت، وجدران تتفاعل مع الحركة، وتجارب أكشاك بهوية العلامة التجارية تعمل دون مراقبة طوال اليوم.",
        "ولأننا استوديو ألعاب أولًا، يظهر الفرق حيث يهم: التجربة لعبة حقيقية بحلقة جذب وتشويق ولحظة فوز — لا عرضًا تجريبيًا لحسّاس. ولأن التركيبات تعيش في أماكن عامة، نهندسها كمنتجات: برمجيات بوضع الكشك تعمل من مفتاح الحائط، وعتاد مختار لآلاف الجولات، وقطع قابلة للاستبدال، وشاشات ثنائية اللغة عربي-إنجليزي كأساس.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "Experience & game design", ar: "تصميم التجربة واللعبة" }, body: { en: "The interaction itself — session length, attract loop, suspense, win moment — designed for queues, crowds, and first-time players of every age.", ar: "التفاعل نفسه — مدة الجولة، وحلقة الجذب، والتشويق، ولحظة الفوز — مصمم للطوابير والحشود ولاعبين لأول مرة من كل الأعمار." } },
        { title: { en: "Sensors & physical inputs", ar: "الحساسات والمدخلات الفعلية" }, body: { en: "Pressure pads, floor buttons, motion and distance sensors, and lighting — selected, wired, and tuned for reliability under real public use.", ar: "وسائد ضغط، وأزرار أرضية، وحساسات حركة ومسافة، وإضاءة — مختارة وموصولة ومضبوطة للاعتمادية تحت استخدام عام حقيقي." } },
        { title: { en: "Show software & screens", ar: "برمجيات العرض والشاشات" }, body: { en: "The on-screen game, synchronized lighting and sound, and bilingual Arabic-English content — built on the same engines we ship games on.", ar: "اللعبة على الشاشة، وإضاءة وصوت متزامنان، ومحتوى ثنائي اللغة عربي-إنجليزي — مبنية على المحركات نفسها التي نطلق بها ألعابنا." } },
        { title: { en: "Prize & reward systems", ar: "أنظمة الجوائز والمكافآت" }, body: { en: "Prize engines with stock tracking and staff dashboards, so the screen never promises what ran out at 4pm.", ar: "محركات جوائز بتتبع المخزون ولوحات تحكم للموظفين، كي لا تعد الشاشة بما نفد في الرابعة عصرًا." } },
        { title: { en: "Kiosk reliability engineering", ar: "هندسة اعتمادية الكشك" }, body: { en: "Auto-start from a wall switch, watchdog recovery, UPS-backed shutdown, and offline-first operation — no venue Wi-Fi dependency.", ar: "تشغيل تلقائي من مفتاح الحائط، واستعادة تلقائية عند الأعطال، وإيقاف آمن مدعوم بـ UPS، وعمل دون اتصال أولًا — بلا اعتماد على شبكة المكان." } },
        { title: { en: "Install, training & analytics", ar: "التركيب والتدريب والتحليلات" }, body: { en: "On-site installation and calibration, staff training, spare parts, and anonymous play analytics with an end-of-run report for the brand.", ar: "تركيب ومعايرة في الموقع، وتدريب الموظفين، وقطع غيار، وتحليلات لعب مجهولة مع تقرير نهاية الحملة للعلامة التجارية." } },
      ],
    },
    platforms: {
      heading: { en: "The stack", ar: "التقنيات" },
      intro: {
        en: "Game-engine software driving commodity, replaceable hardware — nothing exotic that can strand an installation mid-campaign.",
        ar: "برمجيات بمحركات ألعاب تقود عتادًا شائعًا قابلًا للاستبدال — لا شيء نادرًا قد يوقف التركيب في منتصف الحملة.",
      },
      items: [
        { label: "Unity", note: { en: "Our show engine — frame-accurate sync of screen, sound, and lighting.", ar: "محرك العرض لدينا — تزامن دقيق بين الشاشة والصوت والإضاءة." } },
        { label: "Sensors & microcontrollers", note: { en: "Pressure, motion, and distance inputs on dedicated controller boards.", ar: "مدخلات ضغط وحركة ومسافة على لوحات تحكم مخصصة." } },
        { label: "Addressable LED lighting", note: { en: "Light choreography driven by the game itself.", ar: "إضاءة مصمّمة حركيًا تقودها اللعبة نفسها." } },
        { label: "Kiosk PCs & displays", note: { en: "Media PCs, commercial displays, UPS, and audio integrated as one system.", ar: "أجهزة عرض وشاشات تجارية وUPS وصوت مدمجة كنظام واحد." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Concept & venue discovery", ar: "المفهوم واكتشاف الموقع" }, outcome: { en: "The interaction, the space, power, staffing, and run length agreed — and a written scope with the hardware approach.", ar: "الاتفاق على التفاعل والمساحة والكهرباء والتشغيل ومدة الحملة — ونطاق مكتوب مع نهج العتاد." } },
        { title: { en: "Experience design", ar: "تصميم التجربة" }, outcome: { en: "The full show on paper: attract loop, game states, prize logic, sound, and bilingual screen states — signed off before hardware is ordered.", ar: "العرض كاملًا على الورق: حلقة الجذب، وحالات اللعبة، ومنطق الجوائز، والصوت، وشاشات ثنائية اللغة — يُعتمد قبل طلب العتاد." } },
        { title: { en: "Build & integration", ar: "البناء والدمج" }, outcome: { en: "Hardware assembled and the game built against it, with fabrication drawings issued to your stand builder where one is involved. Hardware lead times drive the calendar, so they're locked early.", ar: "تجميع العتاد وبناء اللعبة عليه، مع إصدار رسومات التصنيع لمنفّذ الجناح إن وُجد. مُهل توريد العتاد تحكم الجدول، لذا تُثبَّت مبكرًا." } },
        { title: { en: "Burn-in & acceptance", ar: "اختبار التحمل والقبول" }, outcome: { en: "The complete system runs continuously on our bench for days, then you see it working and sign off before it ships to the venue.", ar: "يعمل النظام الكامل باستمرار لدينا لأيام، ثم تراه يعمل وتعتمده قبل شحنه إلى الموقع." } },
        { title: { en: "Install, train & support", ar: "التركيب والتدريب والدعم" }, outcome: { en: "On-site installation and calibration, staff training with a handover pack, spares in the box, and support options for the run.", ar: "تركيب ومعايرة في الموقع، وتدريب الموظفين مع حزمة تسليم، وقطع غيار في الصندوق، وخيارات دعم طوال الحملة." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "Installations live in physical venues, and venue realities here are specific: mall rules, bilingual audiences, and campaigns that must not fail on a Thursday night.",
        ar: "التركيبات تعيش في أماكن فعلية، وواقع الأماكن هنا محدد: قواعد المولات، وجمهور ثنائي اللغة، وحملات لا يجوز أن تتعطل مساء الخميس.",
      },
      points: [
        { title: { en: "Bilingual by default", ar: "ثنائية اللغة افتراضيًا" }, body: { en: "Arabic-English screens with real RTL — designed for Gulf mall audiences, not translated afterwards.", ar: "شاشات عربي-إنجليزي بتخطيط RTL حقيقي — مصممة لجمهور مولات الخليج، لا مترجمة لاحقًا." } },
        { title: { en: "Built for the venue's rules", ar: "مبنية على قواعد المكان" }, body: { en: "Volume limits, safety expectations, staffed operation, and long daily hours are designed in from the first sketch.", ar: "حدود الصوت، ومتطلبات السلامة، والتشغيل بطاقم، وساعات العمل الطويلة تدخل التصميم من أول رسمة." } },
        { title: { en: "Same-timezone support", ar: "دعم في نفس المنطقة الزمنية" }, body: { en: "When a campaign is live, questions get answered during your working day — not overnight.", ar: "حين تكون الحملة حية، تُجاب الأسئلة خلال يوم عملك — لا في اليوم التالي." } },
      ],
    },
    portfolio: {
      heading: { en: "The engineering behind it", ar: "الهندسة خلفها" },
      intro: {
        en: "An installation is a game plus real-time systems that cannot fail in public. That engineering is what we ship every day:",
        ar: "التركيب لعبة زائد أنظمة فورية لا يجوز أن تفشل أمام الجمهور. هذه الهندسة هي ما نطلقه كل يوم:",
      },
      items: [nabsh, arrab, koutq8],
    },
    faq: {
      heading: { en: "Interactive installations FAQ", ar: "أسئلة شائعة عن التركيبات التفاعلية" },
      items: [
        { q: { en: "What kinds of interactive installations do you build?", ar: "ما أنواع التركيبات التفاعلية التي تبنونها؟" }, a: { en: "Sensor floors and step-on games, jump-and-win prize experiences, motion-reactive screens, branded kiosk games, and IoT-driven activations where physical inputs control an on-screen game — for malls, exhibitions, roadshows, and in-store campaigns.", ar: "أرضيات بحساسات وألعاب دوس، وتجارب اقفز-واربح بجوائز، وشاشات تتفاعل مع الحركة، وألعاب أكشاك بهوية العلامة، وتفعيلات مدفوعة بإنترنت الأشياء حيث تتحكم المدخلات الفعلية بلعبة على الشاشة — للمولات والمعارض والجولات الترويجية وحملات داخل المتاجر." } },
        { q: { en: "Do you supply the hardware or just the software?", ar: "هل توفرون العتاد أم البرمجيات فقط؟" }, a: { en: "Either. We can deliver a complete installed system — sensors, controllers, media PC, screen, audio, UPS — or supply the sensing modules and software as a kit with fabrication drawings, while your stand builder produces the physical booth.", ar: "كلاهما ممكن. نسلّم نظامًا كاملًا مركّبًا — حساسات ولوحات تحكم وجهاز عرض وشاشة وصوت وUPS — أو نورّد وحدات الاستشعار والبرمجيات كطقم مع رسومات تصنيع، بينما ينفذ منفّذكم الجناح الفعلي." } },
        { q: { en: "Can it run for weeks in a mall without breaking?", ar: "هل يعمل لأسابيع في مول دون أعطال؟" }, a: { en: "That's the design target. Systems boot straight into the experience from a wall switch, recover automatically from power cuts and software faults, run offline with no venue Wi-Fi dependency, and ship with swappable spare parts and staff training.", ar: "هذا هو هدف التصميم. الأنظمة تقلع مباشرة إلى التجربة من مفتاح الحائط، وتتعافى تلقائيًا من انقطاع الكهرباء وأعطال البرمجيات، وتعمل دون إنترنت وبلا اعتماد على شبكة المكان، وتُسلَّم مع قطع غيار قابلة للاستبدال وتدريب للموظفين." } },
        { q: { en: "Do you handle prizes and winners?", ar: "هل تتولون الجوائز والفائزين؟" }, a: { en: "We build the prize engine — odds, tiers, live stock tracking, and a staff dashboard — and we design for every-player-wins mechanics by default, which keeps kids happy and avoids the regulatory questions chance-based draws can raise. Physical prizes stay with your team.", ar: "نبني محرك الجوائز — الاحتمالات والفئات وتتبع المخزون لحظيًا ولوحة تحكم للموظفين — ونصمم افتراضيًا بآلية الكل-يربح، ما يُسعد الأطفال ويتجنب الأسئلة التنظيمية التي قد تثيرها السحوبات القائمة على الحظ. الجوائز الفعلية تبقى مع فريقكم." } },
        { q: { en: "How far ahead should we book an installation?", ar: "قبل كم من الوقت يجب حجز التركيب؟" }, a: { en: "Custom sensing and lighting hardware is manufactured to order, so lead time — typically a few weeks — is driven by hardware, not software. Tell us your event date first and we'll design within what it allows.", ar: "عتاد الاستشعار والإضاءة المخصص يُصنَّع حسب الطلب، لذا المهلة — عادة بضعة أسابيع — يحكمها العتاد لا البرمجيات. أخبرنا بتاريخ فعاليتك أولًا وسنصمم ضمن ما يسمح به." } },
      ],
    },
    cta: {
      title: { en: "Planning an activation?", ar: "تخطط لتفعيل علامة تجارية؟" },
      body: { en: "Tell us the venue, the audience, and the date — we'll come back with an experience concept and a clear scope.", ar: "أخبرنا بالمكان والجمهور والتاريخ — وسنعود إليك بمفهوم تجربة ونطاق واضح." },
    },
  },

  {
    slug: "augmented-reality-development",
    updatedAt: "2026-07-31",
    latinName: "Augmented Reality (AR) Development",
    serviceType: "Augmented Reality Development",
    metaTitle: {
      en: "Augmented Reality (AR) Development for Kuwait & the GCC",
      ar: "تطوير الواقع المعزز (AR) للكويت والخليج",
    },
    metaDescription: {
      en: "AR development studio serving Kuwait and the GCC. We build augmented reality apps, WebAR campaigns, AR product visualization, and AR games in Unity — Arabic-first, from concept to launch.",
      ar: "استوديو تطوير واقع معزز يخدم الكويت والخليج. نبني تطبيقات واقع معزز، وحملات WebAR، وعرض منتجات بالواقع المعزز، وألعاب AR على Unity — بالعربية أولًا، من الفكرة إلى الإطلاق.",
    },
    hero: {
      eyebrow: { en: "AR Development", ar: "تطوير الواقع المعزز" },
      title: {
        en: "Augmented Reality (AR) Development",
        ar: "تطوير الواقع المعزز (AR)",
      },
      subtitle: {
        en: "Augmented reality that lives on the phones people already carry — AR games, WebAR campaigns, and product experiences for brands and businesses across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "واقع معزز يعيش على الهواتف التي يحملها الناس بالفعل — ألعاب AR وحملات WebAR وتجارب منتجات للعلامات التجارية والشركات في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "AR is the shortest path between a brand and a phone camera: point, see, play. Buried Games Studio builds augmented reality experiences for clients across Kuwait and the GCC — AR games and filters for campaigns, WebAR that runs straight from a QR code with nothing to install, product visualization that places furniture or packaging in the customer's room, and location or marker-based experiences for events and retail.",
        "We build AR the way we build games: on Unity and its AR toolchain, with real interaction design rather than a floating logo. And because reach decides whether an AR campaign works, we default to the lightest thing that delivers the idea — WebAR from a QR code where install friction would kill it, native apps where depth and quality demand them. Arabic-first, both directions, always.",
      ],
      ar: [
        "الواقع المعزز أقصر طريق بين العلامة التجارية وكاميرا الهاتف: وجّه، شاهد، العب. يبني استوديو بريد جيمز تجارب واقع معزز لعملاء في الكويت والخليج — ألعاب وفلاتر AR للحملات، وWebAR يعمل مباشرة من رمز QR دون تثبيت أي شيء، وعرض منتجات يضع الأثاث أو العبوة في غرفة العميل، وتجارب قائمة على الموقع أو العلامات للفعاليات والمتاجر.",
        "نبني الـ AR كما نبني الألعاب: على Unity وسلسلة أدواته للواقع المعزز، بتصميم تفاعل حقيقي لا شعارًا يطفو في الهواء. ولأن الوصول يقرر نجاح حملة الواقع المعزز، نختار افتراضيًا أخف وسيلة توصل الفكرة — WebAR من رمز QR حيث يقتل التثبيت الحملة، وتطبيقات أصلية حيث يتطلب العمق والجودة ذلك. بالعربية أولًا، وفي الاتجاهين، دائمًا.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "AR concept & interaction design", ar: "مفهوم الـ AR وتصميم التفاعل" }, body: { en: "The idea itself — what the camera sees, what the user does, and why they share it — designed as a game, not a gimmick.", ar: "الفكرة نفسها — ما تراه الكاميرا، وما يفعله المستخدم، ولماذا يشاركه — مصممة كلعبة لا كحيلة." } },
        { title: { en: "AR apps in Unity", ar: "تطبيقات AR على Unity" }, body: { en: "Native iOS and Android AR built on Unity's AR Foundation — plane detection, anchors, occlusion, and solid tracking.", ar: "واقع معزز أصلي لـ iOS وAndroid مبني على AR Foundation في Unity — اكتشاف الأسطح، والمثبتات، والإخفاء، وتتبع ثابت." } },
        { title: { en: "WebAR campaigns", ar: "حملات WebAR" }, body: { en: "Browser-based AR launched from a QR code — zero install, maximum reach for time-boxed marketing campaigns.", ar: "واقع معزز في المتصفح يعمل من رمز QR — صفر تثبيت، وأقصى وصول للحملات التسويقية المحدودة زمنيًا." } },
        { title: { en: "AR product visualization", ar: "عرض المنتجات بالواقع المعزز" }, body: { en: "True-scale 3D of your product placed in the customer's space — for retail, real estate, and e-commerce.", ar: "نموذج ثلاثي الأبعاد بمقياس حقيقي لمنتجك يوضع في مساحة العميل — للتجزئة والعقار والتجارة الإلكترونية." } },
        { title: { en: "3D content production", ar: "إنتاج المحتوى ثلاثي الأبعاد" }, body: { en: "Optimized 3D models, animation, and effects built in-house and tuned for mobile AR performance.", ar: "نماذج ثلاثية الأبعاد محسّنة، ورسوم متحركة، ومؤثرات تُنتج داخليًا وتُضبط لأداء AR على الجوال." } },
        { title: { en: "Analytics & campaign wrap", ar: "التحليلات وتقرير الحملة" }, body: { en: "Scans, sessions, dwell time, and shares measured — with a report your marketing team can put in front of the brand.", ar: "قياس المسحات والجلسات ومدة البقاء والمشاركات — مع تقرير يمكن لفريقك التسويقي وضعه أمام العلامة التجارية." } },
      ],
    },
    platforms: {
      heading: { en: "Tools & platforms", ar: "الأدوات والمنصات" },
      intro: {
        en: "The same engines we ship games on, pointed at the camera.",
        ar: "المحركات نفسها التي نطلق بها ألعابنا، موجهة نحو الكاميرا.",
      },
      items: [
        { label: "Unity + AR Foundation", note: { en: "One codebase over ARKit (iOS) and ARCore (Android).", ar: "قاعدة كود واحدة فوق ARKit لـ iOS وARCore لـ Android." } },
        { label: "WebAR", note: { en: "Browser-based AR from a QR code — no app install.", ar: "واقع معزز في المتصفح من رمز QR — دون تثبيت تطبيق." } },
        { label: "iOS & Android", note: { en: "Native AR apps distributed through the stores.", ar: "تطبيقات AR أصلية توزَّع عبر المتاجر." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "The goal, audience, and distribution decided — app or WebAR — with a written scope. Reach strategy is settled here, because it shapes everything after.", ar: "تحديد الهدف والجمهور وقناة التوزيع — تطبيق أم WebAR — مع نطاق مكتوب. استراتيجية الوصول تُحسم هنا لأنها تشكّل كل ما بعدها." } },
        { title: { en: "Concept & prototype", ar: "المفهوم والنموذج" }, outcome: { en: "A rough AR prototype on a real phone — tracking, scale, and the core interaction proven before content production.", ar: "نموذج AR مبدئي على هاتف حقيقي — إثبات التتبع والمقياس والتفاعل الأساسي قبل إنتاج المحتوى." } },
        { title: { en: "Content & build", ar: "المحتوى والبناء" }, outcome: { en: "3D assets, interactions, and bilingual UI built and integrated, with regular builds you can point at the real world.", ar: "أصول ثلاثية الأبعاد وتفاعلات وواجهة ثنائية اللغة تُبنى وتُدمج، مع نسخ منتظمة توجهها نحو العالم الحقيقي." } },
        { title: { en: "Device QA", ar: "ضمان الجودة على الأجهزة" }, outcome: { en: "Tracking, lighting conditions, and performance tested across the iOS and Android devices your audience actually holds.", ar: "اختبار التتبع وظروف الإضاءة والأداء عبر أجهزة iOS وAndroid التي يحملها جمهورك فعلًا." } },
        { title: { en: "Launch & measure", ar: "الإطلاق والقياس" }, outcome: { en: "Store submission or WebAR deployment with QR assets, plus analytics and a campaign wrap-up report.", ar: "تقديم للمتاجر أو نشر WebAR مع أصول رموز QR، إضافة إلى تحليلات وتقرير ختامي للحملة." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "AR campaigns here speak to a bilingual audience on regional devices — and both halves have to feel native.",
        ar: "حملات الواقع المعزز هنا تخاطب جمهورًا ثنائي اللغة على أجهزة المنطقة — وكلا النصفين يجب أن يبدو أصيلًا.",
      },
      points: [
        { title: { en: "Arabic-first AR UX", ar: "تجربة AR عربية أولًا" }, body: { en: "RTL interfaces and Arabic type inside AR scenes — done properly, not mirrored English.", ar: "واجهات RTL وخط عربي داخل مشاهد الواقع المعزز — منفذة بإتقان، لا إنجليزية معكوسة." } },
        { title: { en: "Campaign-realistic thinking", ar: "تفكير واقعي بالحملات" }, body: { en: "We design for QR-on-packaging, in-mall signage, and social sharing habits in the Gulf.", ar: "نصمم لرموز QR على العبوات، ولافتات المولات، وعادات المشاركة الاجتماعية في الخليج." } },
        { title: { en: "Regional device reality", ar: "واقع أجهزة المنطقة" }, body: { en: "Tested on the actual mix of iPhones and Androids in GCC pockets, not just flagships.", ar: "مختبَر على المزيج الفعلي من هواتف iPhone وAndroid في جيوب الخليج، لا الرائدة فقط." } },
      ],
    },
    portfolio: {
      heading: { en: "Built on a shipping stack", ar: "مبني على تقنيات نطلق بها فعلًا" },
      intro: {
        en: "AR quality comes down to engine craft — 3D, interaction, and performance on real phones. That's the muscle we use daily:",
        ar: "جودة الواقع المعزز تعود إلى إتقان المحرك — ثلاثي الأبعاد والتفاعل والأداء على هواتف حقيقية. هذه العضلة نستخدمها يوميًا:",
      },
      items: [koutq8, gathered, powerOfBombs],
    },
    faq: {
      heading: { en: "AR development FAQ", ar: "أسئلة شائعة عن تطوير الواقع المعزز" },
      items: [
        { q: { en: "Does AR need a special app, or can it run from a QR code?", ar: "هل يحتاج الواقع المعزز تطبيقًا خاصًا أم يعمل من رمز QR؟" }, a: { en: "Both are possible. WebAR runs in the phone browser straight from a QR code — no install, ideal for campaigns. Native apps built on Unity's AR Foundation go deeper: better tracking, richer 3D, and persistent experiences. We recommend the lightest option that delivers your idea.", ar: "كلاهما ممكن. يعمل WebAR في متصفح الهاتف مباشرة من رمز QR — دون تثبيت، مثالي للحملات. التطبيقات الأصلية على AR Foundation في Unity تذهب أعمق: تتبع أفضل، وثلاثي أبعاد أغنى، وتجارب دائمة. ننصح بأخف خيار يوصل فكرتك." } },
        { q: { en: "What can brands actually do with AR?", ar: "ماذا يمكن للعلامات التجارية فعله بالواقع المعزز فعليًا؟" }, a: { en: "Packaging that comes alive when scanned, try-before-you-buy product placement at true scale, AR games and prize hunts for activations, and event experiences tied to a venue. The strongest campaigns give people a reason to point their camera — and something worth sharing afterwards.", ar: "عبوات تنبض بالحياة عند مسحها، ووضع منتجات بمقياس حقيقي للتجربة قبل الشراء، وألعاب AR ومطاردات جوائز للتفعيلات، وتجارب فعاليات مرتبطة بمكان. أقوى الحملات تعطي الناس سببًا لتوجيه الكاميرا — وشيئًا يستحق المشاركة بعدها." } },
        { q: { en: "Do you build the 3D content too?", ar: "هل تنتجون المحتوى ثلاثي الأبعاد أيضًا؟" }, a: { en: "Yes. Our in-house artists model, texture, and animate the 3D content, optimized specifically for mobile AR — where polygon and texture budgets are far tighter than on PC.", ar: "نعم. فنانونا داخليًا ينمذجون المحتوى ثلاثي الأبعاد ويكسونه ويحرّكونه، محسّنًا خصيصًا لـ AR الجوال — حيث ميزانيات المضلعات والخامات أضيق بكثير من الحاسوب." } },
        { q: { en: "Will it work in Arabic?", ar: "هل سيعمل بالعربية؟" }, a: { en: "Yes — Arabic-first, like everything we ship. RTL interfaces, Arabic typography inside the AR scene, and bilingual flows as standard.", ar: "نعم — بالعربية أولًا، ككل ما نطلقه. واجهات RTL، وخط عربي داخل مشهد الواقع المعزز، وتدفقات ثنائية اللغة كأساس." } },
      ],
    },
    cta: {
      title: { en: "Have an AR idea?", ar: "لديك فكرة واقع معزز؟" },
      body: { en: "Tell us the campaign or product and we'll recommend the right AR approach — and what it takes to ship it.", ar: "أخبرنا بالحملة أو المنتج وسننصحك بنهج الواقع المعزز الصحيح — وما يلزم لإطلاقه." },
    },
  },

  {
    slug: "virtual-reality-development",
    updatedAt: "2026-07-31",
    latinName: "Virtual Reality (VR) Development",
    serviceType: "Virtual Reality Development",
    metaTitle: {
      en: "Virtual Reality (VR) Development for Kuwait & the GCC",
      ar: "تطوير الواقع الافتراضي (VR) للكويت والخليج",
    },
    metaDescription: {
      en: "VR development studio serving Kuwait and the GCC. We build virtual reality games, training simulations, virtual showrooms, and event VR experiences for Meta Quest and PC VR — in Unity and Unreal Engine 5.",
      ar: "استوديو تطوير واقع افتراضي يخدم الكويت والخليج. نبني ألعاب واقع افتراضي، ومحاكاة تدريب، وصالات عرض افتراضية، وتجارب VR للفعاليات على Meta Quest وPC VR — بمحركي Unity وUnreal Engine 5.",
    },
    hero: {
      eyebrow: { en: "VR Development", ar: "تطوير الواقع الافتراضي" },
      title: {
        en: "Virtual Reality (VR) Development",
        ar: "تطوير الواقع الافتراضي (VR)",
      },
      subtitle: {
        en: "Worlds people step inside. We build VR games, training simulations, virtual showrooms, and headset experiences for events — for clients across Kuwait, Saudi Arabia, the UAE, and the GCC.",
        ar: "عوالم يدخلها الناس بأنفسهم. نبني ألعاب واقع افتراضي، ومحاكاة تدريب، وصالات عرض افتراضية، وتجارب نظارات للفعاليات — لعملاء في الكويت والسعودية والإمارات والخليج.",
      },
    },
    intro: {
      en: [
        "VR is the most convincing medium there is: presence. Buried Games Studio builds virtual reality experiences for clients across Kuwait and the GCC — VR games, training and safety simulations where mistakes cost nothing, virtual showrooms and walkthroughs for real estate and retail, and headset experiences that anchor a stand at an exhibition.",
        "We build VR on the same engines as our games — Unity and Unreal Engine 5 — where comfort is the discipline that separates professional VR from a tech demo: stable frame rates, movement design that doesn't make people sick, and sessions shaped so a first-time user in a headset knows what to do in seconds. For events, we design for throughput and hygiene realities too: short sessions, easy handover, and a staff-side view of what the player sees.",
      ],
      ar: [
        "الواقع الافتراضي أكثر الوسائط إقناعًا على الإطلاق: الحضور. يبني استوديو بريد جيمز تجارب واقع افتراضي لعملاء في الكويت والخليج — ألعاب VR، ومحاكاة تدريب وسلامة حيث الأخطاء لا تكلف شيئًا، وصالات عرض وجولات افتراضية للعقار والتجزئة، وتجارب نظارات تجعل الجناح مركز الجذب في المعرض.",
        "نبني الواقع الافتراضي على محركات ألعابنا نفسها — Unity وUnreal Engine 5 — حيث الراحة هي الانضباط الذي يفصل الـ VR الاحترافي عن العرض التجريبي: معدل إطارات ثابت، وتصميم حركة لا يسبب الدوار، وجلسات مصممة ليعرف مرتدي النظارة لأول مرة ما يفعله خلال ثوانٍ. وللفعاليات نصمم أيضًا لواقع التدفق والنظافة: جلسات قصيرة، وتسليم سهل، وشاشة جانبية للطاقم تعرض ما يراه اللاعب.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "VR games & experiences", ar: "ألعاب وتجارب VR" }, body: { en: "Original VR games and branded experiences designed for presence, comfort, and replay.", ar: "ألعاب VR أصلية وتجارب بهوية العلامة مصممة للحضور والراحة وإعادة اللعب." } },
        { title: { en: "Training & simulation", ar: "التدريب والمحاكاة" }, body: { en: "Procedural training, safety scenarios, and skills practice in VR — repeatable, measurable, and risk-free.", ar: "تدريب إجرائي، وسيناريوهات سلامة، وممارسة مهارات في الواقع الافتراضي — قابلة للتكرار والقياس وبلا مخاطر." } },
        { title: { en: "Virtual showrooms & walkthroughs", ar: "صالات عرض وجولات افتراضية" }, body: { en: "Real estate, retail, and product spaces people can walk through before they exist — or from another country.", ar: "مساحات عقارية وتجارية ومنتجات يتجول فيها الناس قبل أن توجد — أو من بلد آخر." } },
        { title: { en: "Event VR", ar: "VR للفعاليات" }, body: { en: "Headset experiences for exhibitions and activations, designed for short sessions, quick handover, and a spectator screen.", ar: "تجارب نظارات للمعارض والتفعيلات، مصممة لجلسات قصيرة وتسليم سريع وشاشة للمشاهدين." } },
        { title: { en: "Comfort & performance engineering", ar: "هندسة الراحة والأداء" }, body: { en: "Locomotion design, frame-rate budgets, and optimization tuned to the headset — the difference between wow and nausea.", ar: "تصميم التنقل، وميزانيات معدل الإطارات، وتحسين مضبوط على النظارة — الفرق بين الانبهار والدوار." } },
        { title: { en: "Deployment & device setup", ar: "النشر وتجهيز الأجهزة" }, body: { en: "Builds delivered to your headsets with kiosk-style auto-start for events, plus store distribution where the project calls for it.", ar: "نُسخ تُسلَّم إلى نظاراتكم مع تشغيل تلقائي بنمط الكشك للفعاليات، إضافة إلى التوزيع عبر المتاجر حين يتطلب المشروع." } },
      ],
    },
    platforms: {
      heading: { en: "Headsets & engines", ar: "النظارات والمحركات" },
      intro: {
        en: "Standalone-first, because untethered headsets are what events and training deployments actually use.",
        ar: "النظارات المستقلة أولًا، لأنها ما تستخدمه الفعاليات ونشر التدريب فعليًا.",
      },
      items: [
        { label: "Meta Quest", note: { en: "Standalone VR — no PC, no cables, the workhorse of event and training VR.", ar: "واقع افتراضي مستقل — دون حاسوب أو كابلات، حصان العمل في VR الفعاليات والتدريب." } },
        { label: "PC VR", note: { en: "Tethered high-fidelity experiences where visual quality leads.", ar: "تجارب موصولة عالية الدقة حيث تتصدر الجودة البصرية." } },
        { label: "Unity", note: { en: "Our primary VR engine — fast iteration and rock-solid Quest builds.", ar: "محرك الـ VR الأساسي لدينا — تكرار سريع ونسخ Quest شديدة الثبات." } },
        { label: "Unreal Engine 5", note: { en: "Cinematic fidelity for showrooms and high-end visualization.", ar: "دقة سينمائية لصالات العرض والتصوير المرئي الراقي." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "Goal, audience, headset, and venue realities agreed — with a written scope and comfort targets set from day one.", ar: "الاتفاق على الهدف والجمهور والنظارة وواقع المكان — مع نطاق مكتوب وأهداف راحة تُحدد من اليوم الأول." } },
        { title: { en: "Prototype in headset", ar: "نموذج داخل النظارة" }, outcome: { en: "The core interaction playable in VR early — presence, scale, and comfort proven before content production.", ar: "التفاعل الأساسي قابل للعب في الواقع الافتراضي مبكرًا — إثبات الحضور والمقياس والراحة قبل إنتاج المحتوى." } },
        { title: { en: "Production", ar: "الإنتاج" }, outcome: { en: "Environments, interactions, and content built in sprints, with headset builds you can try throughout.", ar: "بيئات وتفاعلات ومحتوى تُبنى في سباقات، مع نسخ للنظارة تجربها طوال المدة." } },
        { title: { en: "Comfort & performance QA", ar: "ضمان جودة الراحة والأداء" }, outcome: { en: "Frame-rate, locomotion comfort, and first-time-user testing on the target headset — including people who've never worn one.", ar: "اختبار معدل الإطارات وراحة التنقل والمستخدم الأول على النظارة المستهدفة — بمن فيهم من لم يرتدِ نظارة قط." } },
        { title: { en: "Deploy & support", ar: "النشر والدعم" }, outcome: { en: "Builds installed on your devices or submitted to the store, event-mode auto-start configured, and staff shown how to run sessions.", ar: "نسخ تُثبَّت على أجهزتكم أو تُقدَّم للمتجر، وتهيئة تشغيل تلقائي لوضع الفعاليات، وتدريب الطاقم على إدارة الجلسات." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "VR here is deployed at exhibitions, in training rooms, and at activations across the Gulf — physical contexts a regional studio designs for from the start.",
        ar: "الواقع الافتراضي هنا يُنشر في المعارض وقاعات التدريب والتفعيلات في أنحاء الخليج — سياقات فعلية يصمم لها الاستوديو الإقليمي من البداية.",
      },
      points: [
        { title: { en: "Arabic inside the headset", ar: "العربية داخل النظارة" }, body: { en: "RTL interfaces, Arabic voice-over direction, and bilingual flows built in from the start.", ar: "واجهات RTL، وإخراج تعليق صوتي عربي، وتدفقات ثنائية اللغة مدمجة من البداية." } },
        { title: { en: "Event-floor pragmatism", ar: "واقعية أرض الفعاليات" }, body: { en: "Short sessions, spectator screens, hygiene-friendly handover, and staff-runnable setups for Gulf exhibitions.", ar: "جلسات قصيرة، وشاشات مشاهدين، وتسليم مراعٍ للنظافة، وتجهيزات يديرها الطاقم في معارض الخليج." } },
        { title: { en: "Same-timezone collaboration", ar: "تعاون في نفس المنطقة الزمنية" }, body: { en: "Reviews in headset and quick decisions during your working day.", ar: "مراجعات داخل النظارة وقرارات سريعة خلال يوم عملك." } },
      ],
    },
    portfolio: {
      heading: { en: "Built on a shipping stack", ar: "مبني على تقنيات نطلق بها فعلًا" },
      intro: {
        en: "Great VR is real-time 3D craft under a hard performance budget — exactly the discipline of shipping games:",
        ar: "الـ VR الرائع حِرفة ثلاثية أبعاد فورية تحت ميزانية أداء صارمة — وهذا تحديدًا انضباط إطلاق الألعاب:",
      },
      items: [powerOfBombs, koutq8, gathered],
    },
    faq: {
      heading: { en: "VR development FAQ", ar: "أسئلة شائعة عن تطوير الواقع الافتراضي" },
      items: [
        { q: { en: "Which VR headsets do you develop for?", ar: "لأي نظارات واقع افتراضي تطورون؟" }, a: { en: "Primarily Meta Quest, because standalone headsets — no PC, no cables — are what events, showrooms, and training deployments actually use. We build PC VR where visual fidelity leads, and we'll recommend the right target for your goal and budget.", ar: "أساسًا Meta Quest، لأن النظارات المستقلة — دون حاسوب أو كابلات — هي ما تستخدمه الفعاليات وصالات العرض ونشر التدريب فعليًا. نبني PC VR حيث تتصدر الدقة البصرية، وننصحك بالهدف الصحيح لغايتك وميزانيتك." } },
        { q: { en: "Is VR only for games?", ar: "هل الواقع الافتراضي للألعاب فقط؟" }, a: { en: "No — some of the strongest VR use cases are training simulations where mistakes are free, virtual showrooms and real-estate walkthroughs, and exhibition experiences that draw a crowd to a stand. We bring game craft to all of them, because engagement is what makes them work.", ar: "لا — بعض أقوى استخدامات الواقع الافتراضي محاكاةُ تدريب حيث الأخطاء مجانية، وصالات عرض وجولات عقارية افتراضية، وتجارب معارض تجذب الجمهور إلى الجناح. نضع حِرفة الألعاب فيها جميعًا، لأن التفاعل هو ما يجعلها تنجح." } },
        { q: { en: "How do you stop people feeling motion sick?", ar: "كيف تمنعون شعور الناس بدوار الحركة؟" }, a: { en: "Comfort is engineered, not hoped for: locked frame-rate budgets, comfort-first locomotion (teleport and vignetting where appropriate), correct world scale, and testing with first-time users. It's the single biggest difference between professional VR and a demo.", ar: "الراحة تُهندَس ولا تُترك للحظ: ميزانيات معدل إطارات مثبتة، وتنقل يقدّم الراحة أولًا (انتقال لحظي وتظليل محيطي عند الحاجة)، ومقياس عالم صحيح، واختبار مع مستخدمين لأول مرة. إنه أكبر فرق بين الـ VR الاحترافي والعرض التجريبي." } },
        { q: { en: "Can you run VR at our event or exhibition stand?", ar: "هل يمكن تشغيل الواقع الافتراضي في فعاليتنا أو جناحنا؟" }, a: { en: "Yes — we design for the event floor: short repeatable sessions, auto-start kiosk builds, a spectator screen showing what the player sees, and staff training so your team runs it without us standing there.", ar: "نعم — نصمم لأرض الفعالية: جلسات قصيرة قابلة للتكرار، ونسخ بتشغيل تلقائي بنمط الكشك، وشاشة مشاهدين تعرض ما يراه اللاعب، وتدريب لفريقكم ليديرها دون وقوفنا هناك." } },
      ],
    },
    cta: {
      title: { en: "Exploring VR?", ar: "تستكشف الواقع الافتراضي؟" },
      body: { en: "Tell us the goal — training, showroom, event, or game — and we'll map the headset, scope, and path to deployment.", ar: "أخبرنا بالهدف — تدريب أو صالة عرض أو فعالية أو لعبة — وسنرسم النظارة والنطاق والمسار إلى النشر." },
    },
  },

  {
    slug: "dashboard-development",
    updatedAt: "2026-07-31",
    latinName: "Dashboards, Admin Panels & Internal Tools",
    serviceType: "Dashboard & Internal Tools Development",
    metaTitle: {
      en: "Dashboard & Admin Panel Development for Kuwait & the GCC",
      ar: "تطوير لوحات التحكم ولوحات الإدارة للكويت والخليج",
    },
    metaDescription: {
      en: "We build real-time dashboards, admin panels, and internal tools for businesses across Kuwait and the GCC — live data, bilingual Arabic-English interfaces, and control consoles for apps, games, and installations.",
      ar: "نبني لوحات تحكم فورية ولوحات إدارة وأدوات داخلية للشركات في الكويت والخليج — بيانات حية، وواجهات ثنائية اللغة عربي-إنجليزي، ووحدات تحكم للتطبيقات والألعاب والتركيبات.",
    },
    hero: {
      eyebrow: { en: "Dashboards & Internal Tools", ar: "لوحات التحكم والأدوات الداخلية" },
      title: {
        en: "Dashboards, Admin Panels & Internal Tools",
        ar: "لوحات التحكم ولوحات الإدارة والأدوات الداخلية",
      },
      subtitle: {
        en: "The control room behind the product: real-time dashboards, admin panels, and internal tools that let your team see what's happening and act on it — built for businesses across Kuwait and the GCC.",
        ar: "غرفة التحكم خلف المنتج: لوحات بيانات فورية ولوحات إدارة وأدوات داخلية تجعل فريقك يرى ما يحدث ويتصرف حياله — مبنية لشركات في الكويت والخليج.",
      },
    },
    intro: {
      en: [
        "Every serious product has a second product behind it: the dashboard its team runs it from. Buried Games Studio builds that layer for clients across Kuwait and the GCC — live operational dashboards, admin panels for content and users, prize and inventory consoles for campaigns and installations, and internal tools that replace the spreadsheet somebody swears by.",
        "We come at dashboards from an unusual direction: games. Running live multiplayer games means building ops surfaces where real-time data, permissions, and fast decisions are the whole point — and it means we design dashboards people actually read at a glance, because a control room UI that needs a manual has already failed. Bilingual Arabic-English interfaces with proper RTL come as standard.",
      ],
      ar: [
        "كل منتج جاد خلفه منتج ثانٍ: لوحة التحكم التي يديره منها فريقه. يبني استوديو بريد جيمز هذه الطبقة لعملاء في الكويت والخليج — لوحات تشغيل حية، ولوحات إدارة للمحتوى والمستخدمين، ووحدات تحكم بالجوائز والمخزون للحملات والتركيبات، وأدوات داخلية تحل محل جدول البيانات الذي يقسم أحدهم بولائه له.",
        "نأتي إلى لوحات التحكم من اتجاه غير مألوف: الألعاب. تشغيل ألعاب جماعية حية يعني بناء واجهات عمليات تكون فيها البيانات الفورية والصلاحيات والقرارات السريعة هي الغاية كلها — ويعني أننا نصمم لوحات يقرأها الناس بلمحة، لأن واجهة غرفة تحكم تحتاج دليل استخدام قد فشلت سلفًا. الواجهات ثنائية اللغة عربي-إنجليزي بتخطيط RTL صحيح تأتي كأساس.",
      ],
    },
    included: {
      heading: { en: "What's included", ar: "ما يشمله" },
      items: [
        { title: { en: "Real-time operational dashboards", ar: "لوحات تشغيل فورية" }, body: { en: "Live metrics, activity feeds, and alerts — sales, players, campaigns, or installations, updating as it happens.", ar: "مؤشرات حية، وسجلات نشاط، وتنبيهات — مبيعات أو لاعبون أو حملات أو تركيبات، تتحدث لحظة حدوثها." } },
        { title: { en: "Admin panels & CMS", ar: "لوحات الإدارة وإدارة المحتوى" }, body: { en: "Content, users, roles, and permissions managed from one place — so changes stop requiring a developer.", ar: "محتوى ومستخدمون وأدوار وصلاحيات تُدار من مكان واحد — لتتوقف التغييرات عن الحاجة إلى مبرمج." } },
        { title: { en: "Campaign & inventory consoles", ar: "وحدات تحكم الحملات والمخزون" }, body: { en: "Prize pools, stock tracking, odds, and daily resets for activations, promotions, and installations.", ar: "مجموعات جوائز، وتتبع مخزون، واحتمالات، وتصفير يومي للتفعيلات والعروض والتركيبات." } },
        { title: { en: "Data visualization", ar: "تصوير البيانات" }, body: { en: "Charts and reports designed to be read at a glance — the numbers that matter, not a wall of widgets.", ar: "رسوم وتقارير مصممة لتُقرأ بلمحة — الأرقام المهمة، لا جدار عناصر." } },
        { title: { en: "Integrations & APIs", ar: "التكاملات وواجهات البرمجة" }, body: { en: "Your existing systems wired in — payments, analytics, storage, and third-party services behind one clean API layer.", ar: "أنظمتك القائمة موصولة — مدفوعات وتحليلات وتخزين وخدمات طرف ثالث خلف طبقة API نظيفة واحدة." } },
        { title: { en: "Roles, audit & security", ar: "الأدوار والتدقيق والأمان" }, body: { en: "Authentication, role-based access, and audit trails, so the right people can act and every action is accounted for.", ar: "مصادقة، وصلاحيات حسب الدور، وسجلات تدقيق، ليتصرف الأشخاص المناسبون ويكون كل إجراء محسوبًا." } },
      ],
    },
    platforms: {
      heading: { en: "The stack", ar: "التقنيات" },
      intro: {
        en: "The same modern web stack behind our real-time games — chosen for live data and long service life.",
        ar: "حزمة الويب الحديثة نفسها خلف ألعابنا الفورية — مختارة للبيانات الحية وعمر خدمة طويل.",
      },
      items: [
        { label: "Next.js + React", note: { en: "Fast, maintainable interfaces — the stack this site and our web games run on.", ar: "واجهات سريعة قابلة للصيانة — الحزمة التي يعمل بها هذا الموقع وألعابنا على الويب." } },
        { label: "NestJS + Node", note: { en: "API and backend services built for real-time workloads.", ar: "خدمات API وواجهات خلفية مبنية لأحمال فورية." } },
        { label: "WebSockets / Socket.IO", note: { en: "Live updates pushed to the dashboard the moment they happen.", ar: "تحديثات حية تُدفع إلى اللوحة لحظة حدوثها." } },
        { label: "Cloud & databases", note: { en: "Firebase, SQL, and cloud hosting sized to the workload — no over-engineering.", ar: "Firebase وSQL واستضافة سحابية بحجم الحمل — دون هندسة زائدة." } },
      ],
    },
    process: {
      heading: { en: "Our 5-step process", ar: "منهجيتنا في خمس خطوات" },
      steps: [
        { title: { en: "Discovery", ar: "الاكتشاف" }, outcome: { en: "The workflows, the users, and the numbers that actually drive decisions — mapped with the people who'll use the tool daily.", ar: "سير العمل والمستخدمون والأرقام التي تقود القرارات فعلًا — تُرسم مع من سيستخدمون الأداة يوميًا." } },
        { title: { en: "Information design", ar: "تصميم المعلومات" }, outcome: { en: "Wireframes of every screen and state, organized around at-a-glance reading — approved before code.", ar: "مخططات لكل شاشة وحالة، منظمة حول القراءة بلمحة — تُعتمد قبل الكود." } },
        { title: { en: "Build & integrate", ar: "البناء والتكامل" }, outcome: { en: "The dashboard built in sprints against real data sources, with working versions you use — not screenshots.", ar: "تُبنى اللوحة في سباقات على مصادر بيانات حقيقية، مع نسخ عاملة تستخدمها — لا لقطات شاشة." } },
        { title: { en: "Harden & QA", ar: "التقوية وضمان الجودة" }, outcome: { en: "Permissions, edge cases, load behaviour, and bilingual RTL checks — plus an audit trail you can trust.", ar: "الصلاحيات والحالات الحدية وسلوك الحمل وفحوص RTL ثنائية اللغة — إضافة إلى سجل تدقيق موثوق." } },
        { title: { en: "Launch & iterate", ar: "الإطلاق والتحسين" }, outcome: { en: "Deployment, team onboarding, and a feedback loop — internal tools improve fastest in their first month of real use.", ar: "النشر وتهيئة الفريق وحلقة ملاحظات — الأدوات الداخلية تتحسن أسرع ما يكون في شهرها الأول من الاستخدام الحقيقي." } },
      ],
    },
    whyGcc: {
      heading: { en: "Why work with a GCC studio", ar: "لماذا استوديو من الخليج" },
      body: {
        en: "Internal tools are used by real teams — and Gulf teams work in two languages, across regional systems, in this timezone.",
        ar: "الأدوات الداخلية تستخدمها فرق حقيقية — وفرق الخليج تعمل بلغتين، عبر أنظمة إقليمية، وفي هذه المنطقة الزمنية.",
      },
      points: [
        { title: { en: "Bilingual back office", ar: "مكتب خلفي ثنائي اللغة" }, body: { en: "Arabic-English interfaces with real RTL, so every member of your team works in the language they think in.", ar: "واجهات عربي-إنجليزي بتخطيط RTL حقيقي، ليعمل كل فرد في فريقك باللغة التي يفكر بها." } },
        { title: { en: "Built beside the product", ar: "تُبنى بجانب المنتج" }, body: { en: "We build the game, app, or installation and its control room together — one team, no integration gap.", ar: "نبني اللعبة أو التطبيق أو التركيب وغرفة تحكمه معًا — فريق واحد، وبلا فجوة تكامل." } },
        { title: { en: "Same-timezone iteration", ar: "تحسين في نفس المنطقة الزمنية" }, body: { en: "Ops tools change fast once real use begins; we're awake when your team hits the edge case.", ar: "أدوات التشغيل تتغير سريعًا حين يبدأ الاستخدام الحقيقي؛ ونحن مستيقظون حين يصادف فريقك الحالة الحدية." } },
      ],
    },
    portfolio: {
      heading: { en: "The stack, proven live", ar: "التقنيات مثبتة في الإنتاج" },
      intro: {
        en: "Real-time web products we've shipped on exactly this stack — live data, live users, no refresh button:",
        ar: "منتجات ويب فورية أطلقناها على هذه الحزمة تحديدًا — بيانات حية ومستخدمون أحياء وبلا زر تحديث:",
      },
      items: [nabsh, arrab],
    },
    faq: {
      heading: { en: "Dashboards & internal tools FAQ", ar: "أسئلة شائعة عن لوحات التحكم والأدوات الداخلية" },
      items: [
        { q: { en: "What kinds of dashboards do you build?", ar: "ما أنواع لوحات التحكم التي تبنونها؟" }, a: { en: "Operational dashboards with live metrics, admin panels for content and users, campaign consoles with prize and stock tracking, analytics and reporting views, and internal tools that replace manual spreadsheet workflows.", ar: "لوحات تشغيل بمؤشرات حية، ولوحات إدارة للمحتوى والمستخدمين، ووحدات تحكم حملات بتتبع الجوائز والمخزون، وشاشات تحليلات وتقارير، وأدوات داخلية تحل محل سير عمل الجداول اليدوي." } },
        { q: { en: "Can the dashboard update in real time?", ar: "هل تتحدث اللوحة في الوقت الفعلي؟" }, a: { en: "Yes — real-time is our home ground. We use the same WebSocket infrastructure that powers our live multiplayer games, so data appears the moment it changes, without anyone hitting refresh.", ar: "نعم — الوقت الفعلي أرضنا الأصلية. نستخدم بنية WebSocket نفسها التي تشغّل ألعابنا الجماعية الحية، فتظهر البيانات لحظة تغيرها دون أن يضغط أحد زر التحديث." } },
        { q: { en: "Can you connect it to our existing systems?", ar: "هل يمكن ربطها بأنظمتنا القائمة؟" }, a: { en: "Yes. We integrate with your existing databases, payment providers, analytics, and third-party APIs, and put them behind one clean interface your team actually wants to open.", ar: "نعم. نتكامل مع قواعد بياناتك ومزودي الدفع والتحليلات وواجهات الطرف الثالث القائمة، ونضعها خلف واجهة واحدة نظيفة يرغب فريقك فعلًا في فتحها." } },
        { q: { en: "Do you build the product and the dashboard together?", ar: "هل تبنون المنتج ولوحة تحكمه معًا؟" }, a: { en: "That's the ideal case. When we build a game, app, or interactive installation, the admin layer is designed alongside it from day one — the same team, the same data model, no integration seams.", ar: "هذه الحالة المثالية. حين نبني لعبة أو تطبيقًا أو تركيبًا تفاعليًا، تُصمَّم طبقة الإدارة إلى جانبه من اليوم الأول — الفريق نفسه ونموذج البيانات نفسه وبلا فواصل تكامل." } },
        { q: { en: "Will it work in Arabic?", ar: "هل ستعمل بالعربية؟" }, a: { en: "Yes — bilingual Arabic-English with proper right-to-left layout as standard, so your whole team works in the language they prefer.", ar: "نعم — ثنائية اللغة عربي-إنجليزي بتخطيط صحيح من اليمين إلى اليسار كأساس، ليعمل فريقك كله باللغة التي يفضلها." } },
      ],
    },
    cta: {
      title: { en: "Drowning in spreadsheets?", ar: "غارق في جداول البيانات؟" },
      body: { en: "Tell us the workflow and the numbers you need to see — we'll come back with a dashboard concept and a clear scope.", ar: "أخبرنا بسير العمل والأرقام التي تحتاج رؤيتها — وسنعود إليك بمفهوم لوحة تحكم ونطاق واضح." },
    },
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
