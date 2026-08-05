import type { Locale } from "@/lib/i18n";

/**
 * Typed content for the per-country GCC game-development landing pages
 * (/game-development-kuwait, -saudi-arabia, -uae, -qatar, -bahrain, -oman).
 *
 * Each country is a fully localized page of unique copy. Buried Games Studio
 * is a remote-first GCC games studio; the angle is "how we work with clients
 * in <country>", framed by service area and culture, never by a claimed place
 * of establishment or local office. One reusable component renders any entry
 * in this map; route files select by slug.
 */
type Localized = { en: string; ar: string };

export type LandingSection = {
  heading: Localized;
  /** Each entry is one paragraph. */
  body: Localized[];
};

export type LandingFaq = {
  q: Localized;
  a: Localized;
};

export type GccLanding = {
  slug: string;
  /**
   * ISO date (YYYY-MM-DD) this page's content last materially changed — it is
   * the <lastmod> the sitemap advertises for /<slug>. Bump it BY HAND whenever
   * you edit the copy, title, or FAQs below. Never derive it from build time.
   * See src/app/sitemap.ts.
   */
  updatedAt: string;
  /** ISO 3166-1 alpha-2, used for Service.areaServed in JSON-LD. */
  countryCode: string;
  metaTitle: Localized;
  metaDescription: Localized;
  /** Breadcrumb + visible H1. */
  title: Localized;
  /** Country name for breadcrumbs and prose where needed. */
  countryName: Localized;
  intro: Localized;
  sections: LandingSection[];
  faqs: LandingFaq[];
};

// `satisfies` rather than a `Record<string, …>` annotation so the keys stay a
// literal union (`GccLandingSlug` below) instead of widening to `string`. That
// union is what lets `gcc-market-links.ts` prove — at compile time, with a
// type-only import that ships no prose to the browser — that every landing page
// has an in-content anchor. A country added here without one is a build error.
export const gccLandings = {
  "game-development-kuwait": {
    slug: "game-development-kuwait",
    updatedAt: "2026-08-05",
    countryCode: "KW",
    metaTitle: {
      en: "Game Development Company for Kuwait | Arabic-First",
      ar: "شركة تطوير ألعاب إلكترونية للكويت",
    },
    metaDescription: {
      en: "Game development company for Kuwait. Arabic-first Unity and web games rooted in Kuwaiti culture — from KoutQ8, our take on the traditional Kout card game.",
      ar: "شركة تطوير ألعاب إلكترونية للكويت. ألعاب عربية أولًا على Unity والويب متجذّرة في الثقافة الكويتية — من كوت، نسختنا الرقمية للعبة الورق التقليدية.",
    },
    title: {
      en: "Game Development for Kuwait",
      ar: "تطوير ألعاب للكويت",
    },
    countryName: { en: "Kuwait", ar: "الكويت" },
    intro: {
      en: "Kuwait is where our work is most at home. Buried Games Studio is an independent GCC games studio, and Kuwait is the market and the culture we know best — from KoutQ8, our digital take on the traditional Kuwaiti Kout card game, to Nabsh, our real-time trivia game built for Gulf players. We design Arabic-first games for Kuwaiti and wider GCC audiences, and we understand the rhythms of how people here actually play: the diwaniya and the majlis, the late-night card games, the trivia battles between friends. If you are building a game for the Kuwaiti market, this is the studio that already speaks its language.",
      ar: "الكويت هي المكان الأكثر ألفةً لعملنا. استوديو بريد جيمز استوديو ألعاب خليجي مستقل، والكويت هي السوق والثقافة التي نعرفها أكثر من غيرها — من كوت، نسختنا الرقمية للعبة الورق الكويتية التقليدية، إلى نبش، لعبة المعلومات العامة المباشرة المبنية للاعبي الخليج. نصمّم ألعابًا بالعربية أولًا للجمهور الكويتي والخليجي الأوسع، ونفهم إيقاع كيف يلعب الناس هنا فعلًا: الديوانية والمجلس، وألعاب الورق في آخر الليل، ومنافسات المعلومات بين الأصدقاء. إن كنت تبني لعبة للسوق الكويتي، فهذا هو الاستوديو الذي يتحدث لغته أصلًا.",
    },
    sections: [
      {
        heading: {
          en: "Games rooted in Kuwaiti culture",
          ar: "ألعاب متجذّرة في الثقافة الكويتية",
        },
        body: [
          {
            en: "We do not just localise games for Kuwait — we build games that come from here. KoutQ8 is the clearest example: a faithful digital version of Kout, the card game that has been played across Kuwaiti diwaniyas and majlis nights for generations, rebuilt for mobile with online multiplayer and AI opponents so the table is never empty. Nabsh, our real-time trivia game, leans into the same instinct, with categories that span Kuwaiti and Gulf culture rather than generic Western quiz fare. When a game references the things Kuwaiti players grew up with, they feel it immediately.",
            ar: "نحن لا نُؤقلم الألعاب للكويت فحسب — بل نبني ألعابًا تنبع من هنا. كوت هو المثال الأوضح: نسخة رقمية أمينة من لعبة الورق التي تُلعب عبر الدواوين وليالي المجالس الكويتية منذ أجيال، أُعيد بناؤها للجوال بلعب جماعي عبر الإنترنت وخصوم بذكاء اصطناعي فلا تخلو الطاولة أبدًا. ونبش، لعبة المعلومات العامة المباشرة، تنحاز إلى الغريزة نفسها، بفئات تمتد عبر الثقافة الكويتية والخليجية بدلًا من أسئلة غربية عامة. حين تشير لعبة إلى ما نشأ عليه اللاعبون الكويتيون، يشعرون به فورًا.",
          },
          {
            en: "This cultural fluency is the hardest thing to fake and the easiest thing for players to spot. It is the difference between a game that Kuwaiti players tolerate and one they recommend to the group chat.",
            ar: "هذه الطلاقة الثقافية أصعب ما يُزيَّف وأسهل ما يلتقطه اللاعبون. إنها الفرق بين لعبة يتحمّلها اللاعبون الكويتيون وأخرى يوصون بها في مجموعة المحادثة.",
          },
        ],
      },
      {
        heading: {
          en: "How Kuwaitis actually play",
          ar: "كيف يلعب الكويتيون فعلًا",
        },
        body: [
          {
            en: "Kuwait is a small, hyper-connected, mobile-first market with one of the highest smartphone penetration rates in the world. Gaming here is profoundly social: a Kout night around the majlis, a trivia showdown between cousins, a multiplayer session that runs in parallel with the group chat. We design for that reality — quick to enter, easy to play in short social bursts, and built around the friends-and-family dynamics that drive how games spread in Kuwait. A title that nails the social loop travels through Kuwaiti networks faster than any ad budget.",
            ar: "الكويت سوق صغير شديد الاتصال يضع الجوال أولًا، بأحد أعلى معدلات انتشار الهواتف الذكية في العالم. اللعب هنا اجتماعي بعمق: ليلة كوت حول المجلس، ومنافسة معلومات بين الأقارب، وجلسة جماعية تجري بالتوازي مع مجموعة المحادثة. نصمّم لهذا الواقع — دخول سريع، ولعب سهل في نوبات اجتماعية قصيرة، ومبني حول ديناميكيات الأصدقاء والعائلة التي تقود انتشار الألعاب في الكويت. اللعبة التي تُتقن الحلقة الاجتماعية تنتقل عبر الشبكات الكويتية أسرع من أي ميزانية إعلانية.",
          },
        ],
      },
      {
        heading: {
          en: "Arabic-first, built for the Gulf",
          ar: "العربية أولًا، مبنية للخليج",
        },
        body: [
          {
            en: "Every game we ship treats Arabic as first-class, not as a translation pass. Correct right-to-left layout, typography that respects Arabic letterforms, and copy written in natural Gulf-appropriate Arabic — that is the default, not an upsell. KoutQ8, Nabsh, and Arrab are all fully bilingual, so a Kuwaiti player and an English-speaking friend can sit in the same match without either feeling like a second-class user. For a Kuwaiti client, this means a game that reads as genuinely local from the first screen.",
            ar: "كل لعبة نُطلقها تعامل العربية كدرجة أولى لا كمرحلة ترجمة. تخطيط صحيح من اليمين إلى اليسار، وطباعة تحترم أشكال الحروف العربية، ونص مكتوب بعربية خليجية طبيعية — هذا هو الأصل لا إضافة بمقابل. كوت ونبش والعرّاب كلها ثنائية اللغة بالكامل، فيجلس لاعب كويتي وصديق ناطق بالإنجليزية في المباراة نفسها دون أن يشعر أحدهما بأنه مستخدم من الدرجة الثانية. وبالنسبة لعميل كويتي، يعني هذا لعبة تُقرأ كمحلية فعلًا من الشاشة الأولى.",
          },
        ],
      },
      {
        heading: {
          en: "Working with us from Kuwait",
          ar: "العمل معنا من الكويت",
        },
        body: [
          {
            en: "We are a remote-first GCC games studio, and most Kuwaiti projects start with a WhatsApp message and a quick call. From there we scope the idea, recommend an engine — usually Unity for mobile or the web for instant-play titles — and run the build on clear milestones you can play on your own device as it comes together. Same time zone, same working week, same language: working with us feels less like hiring an outside vendor and more like adding a team that already gets it.",
            ar: "نحن استوديو ألعاب خليجي يعمل عن بُعد أولًا، ومعظم المشاريع الكويتية تبدأ برسالة واتساب ومكالمة سريعة. من هناك نحدّد نطاق الفكرة، ونوصي بمحرّك — عادةً يونيتي للجوال أو الويب للألعاب الفورية — وندير البناء بمراحل واضحة تلعبها على جهازك بينما يتشكّل. المنطقة الزمنية نفسها، وأسبوع العمل نفسه، واللغة نفسها: العمل معنا أقرب إلى إضافة فريق يفهم الأمر أصلًا منه إلى توظيف مورّد خارجي.",
          },
        ],
      },
      {
        heading: {
          en: "What we build for clients in Kuwait",
          ar: "ما نبنيه لعملائنا في الكويت",
        },
        body: [
          {
            en: "Most enquiries from Kuwait fall into one of three shapes. The first is a full game: an original title taken from concept through design, art, engineering and launch — the path KoutQ8 and Nabsh both took. The second is a specific piece of a bigger project: mobile game development for a title that needs porting, multiplayer game development for a game that has outgrown single-player, or 2D and 3D game art for a team that has the code but not the look. The third is interactive work that is not a game in the storefront sense at all — installations for malls and brand activations, AR and VR experiences, or the dashboards and internal tools that sit behind them.",
            ar: "معظم الطلبات من الكويت تأخذ أحد ثلاثة أشكال. الأول لعبة كاملة: عنوان أصلي يُؤخذ من الفكرة عبر التصميم والفن والبرمجة إلى الإطلاق — وهو المسار الذي سلكته كوت ونبش. الثاني جزء محدد من مشروع أكبر: تطوير ألعاب جوال لعنوان يحتاج نقلًا، أو برمجة ألعاب جماعية للعبة تجاوزت اللاعب الواحد، أو فن ثنائي وثلاثي الأبعاد لفريق يملك الكود لا المظهر. والثالث عمل تفاعلي ليس لعبة بمعنى المتجر إطلاقًا — تركيبات للمولات وتفعيلات العلامات التجارية، وتجارب واقع معزز وافتراضي، أو لوحات التحكم والأدوات الداخلية التي تقف خلفها.",
          },
          {
            en: "We take the second and third shapes as seriously as the first. A studio that only wants whole projects is not much use to a team that already has one under way and needs a specific gap filled.",
            ar: "نأخذ الشكلين الثاني والثالث بجدية الأول نفسها. الاستوديو الذي لا يريد إلا المشاريع الكاملة قليل النفع لفريق لديه مشروع جارٍ بالفعل ويحتاج سدّ ثغرة بعينها.",
          },
        ],
      },
      {
        heading: {
          en: "Choosing an engine: Unity, Unreal, or the browser",
          ar: "اختيار المحرّك: Unity أو Unreal أو المتصفح",
        },
        body: [
          {
            en: "The engine is a consequence of the game, not a preference we bring to it. Unity is where most Kuwaiti mobile projects land: it ships to iOS and Android from one codebase, its 2D and casual tooling is mature, and it is what KoutQ8 is built in. Unreal Engine 5 earns its place when fidelity is the point — high-end 3D, realistic lighting, or MetaHuman digital characters — and it is what Power of Bombs uses. The browser is the third option and the most underrated one in this market: a web game needs no download and no store approval, which is why Nabsh lives at nabsh.fun and spreads through a group chat rather than an app listing.",
            ar: "المحرّك نتيجة للعبة لا تفضيلًا نأتي به إليها. Unity حيث تحطّ معظم مشاريع الجوال الكويتية: يُصدِّر إلى iOS وAndroid من قاعدة كود واحدة، وأدواته للألعاب ثنائية الأبعاد والعادية ناضجة، وهو ما بُنيت به كوت. أما Unreal Engine 5 فيستحق مكانه حين تكون الدقة هي المقصد — رسوميات ثلاثية الأبعاد عالية الجودة، أو إضاءة واقعية، أو شخصيات رقمية بـ MetaHuman — وهو ما تستخدمه Power of Bombs. والمتصفح هو الخيار الثالث والأكثر بخسًا لحقه في هذا السوق: لعبة الويب لا تحتاج تنزيلًا ولا موافقة متجر، ولهذا تعيش نبش على nabsh.fun وتنتشر عبر مجموعة محادثة لا عبر قائمة تطبيقات.",
          },
          {
            en: "If you are unsure which fits, that is a conversation rather than a form. We would rather talk you out of an engine that will cost you time than win the work and discover the mismatch in month three.",
            ar: "إن لم تكن متأكدًا أيها يناسبك، فتلك محادثة لا استمارة. نفضّل أن نثنيك عن محرّك سيكلّفك وقتًا على أن نكسب العمل ثم نكتشف عدم التوافق في الشهر الثالث.",
          },
        ],
      },
      {
        heading: {
          en: "What actually drives the cost of a game",
          ar: "ما الذي يحدّد تكلفة اللعبة فعلًا",
        },
        body: [
          {
            en: "We will not quote a number on a web page, because any studio that does is guessing at your project. What we can do is tell you honestly what moves the figure. Scope is the largest lever — the number of distinct game modes, screens and rules, not the length of the wish list. Art is the second: a stylised 2D title and a realistic 3D one can differ by a multiple, for the same gameplay. Multiplayer is the third and the most commonly underestimated, because real-time play brings servers, matchmaking, reconnection and cheating into a project that was quoted as a single-player game.",
            ar: "لن نضع رقمًا على صفحة ويب، لأن أي استوديو يفعل ذلك إنما يخمّن مشروعك. ما نستطيعه أن نخبرك بصدق بما يحرّك الرقم. النطاق هو الرافعة الكبرى — عدد أنماط اللعب والشاشات والقواعد المتمايزة، لا طول قائمة الأمنيات. الفن ثانيًا: عنوان ثنائي الأبعاد بأسلوب مصمّم وآخر ثلاثي الأبعاد واقعي قد يفترقان بمضاعفات، للعب نفسه. واللعب الجماعي ثالثًا وأكثرها استهانةً، لأن اللعب الفوري يُدخل الخوادم ومطابقة اللاعبين وإعادة الاتصال والغش في مشروع سُعِّر بوصفه لعبة لاعب واحد.",
          },
          {
            en: "The fourth factor is the one clients rarely raise and always feel: how settled the design is before the build starts. A prototype that answers the fun question early is the cheapest thing you will ever pay us for, because everything after it stops being a rewrite.",
            ar: "العامل الرابع هو الذي نادرًا ما يذكره العملاء ويشعرون به دائمًا: مدى استقرار التصميم قبل بدء البناء. النموذج الأولي الذي يجيب عن سؤال المتعة مبكرًا هو أرخص ما ستدفعه لنا، لأن كل ما بعده يتوقّف عن كونه إعادة كتابة.",
          },
        ],
      },
      {
        heading: {
          en: "Launching to Kuwaiti players",
          ar: "الإطلاق للاعبين الكويتيين",
        },
        body: [
          {
            en: "Shipping in Kuwait means more than an English build with an Arabic toggle. Store listings need Arabic titles, descriptions and screenshots that read naturally rather than machine-translated; pricing and in-app purchases need the local currency and the payment methods people here actually use; and the whole interface has to hold up right-to-left, which is layout work, not a translation pass. We build for that from the first screen, because retrofitting RTL into a finished game is one of the most expensive corrections in this business.",
            ar: "الإطلاق في الكويت أكثر من نسخة إنجليزية بمفتاح عربي. قوائم المتاجر تحتاج عناوين ووصفًا ولقطات بالعربية تُقرأ طبيعية لا مترجمة آليًا؛ والتسعير والمشتريات داخل التطبيق يحتاجان العملة المحلية وطرق الدفع التي يستخدمها الناس هنا فعلًا؛ والواجهة كلها عليها أن تصمد من اليمين إلى اليسار، وذلك عمل تخطيط لا تمرير ترجمة. نبني لذلك من الشاشة الأولى، لأن إقحام الاتجاه من اليمين إلى اليسار في لعبة منتهية من أغلى التصحيحات في هذه الصناعة.",
          },
        ],
      },
      {
        heading: {
          en: "How a project runs, week to week",
          ar: "كيف يسير المشروع أسبوعًا بأسبوع",
        },
        body: [
          {
            en: "A project starts with scoping, not a contract. We work through what the game actually is — the modes, the loop, the platforms, the audience — until the brief is specific enough to estimate honestly. Where the fun is still an open question, we propose a playable prototype before anything else, because a prototype settles arguments that documents only postpone.",
            ar: "المشروع يبدأ بتحديد النطاق لا بالعقد. نعمل على ما هي اللعبة فعلًا — الأنماط، وحلقة اللعب، والمنصات، والجمهور — إلى أن يصبح الموجز محددًا بما يكفي للتقدير بصدق. وحيث تبقى المتعة سؤالًا مفتوحًا، نقترح نموذجًا أوليًا قابلًا للعب قبل أي شيء آخر، لأن النموذج يحسم جدالات لا تؤجّلها المستندات إلا تأجيلًا.",
          },
          {
            en: "After that the build runs on milestones, and the defining rule is that every milestone ends in something you can play on your own device — not a status report, not a screenshot deck. You see the game in the state it is actually in, which is the only reliable way to catch a wrong turn while it is still cheap. Between milestones you have a direct line to the people building it: same time zone, same working week, and answers in Arabic or English as you prefer.",
            ar: "بعد ذلك يسير البناء على مراحل، والقاعدة الحاسمة أن كل مرحلة تنتهي بشيء تستطيع لعبه على جهازك — لا تقرير حالة ولا عرض لقطات. ترى اللعبة في حالتها الفعلية، وهي الطريقة الوحيدة الموثوقة لالتقاط منعطف خاطئ وهو ما يزال رخيصًا. وبين المراحل لديك خط مباشر مع من يبنونها: المنطقة الزمنية نفسها، وأسبوع العمل نفسه، وإجابات بالعربية أو الإنجليزية كما تفضّل.",
          },
        ],
      },
      {
        heading: {
          en: "Arabic that reads like Arabic",
          ar: "عربية تُقرأ كعربية",
        },
        body: [
          {
            en: "Most games that reach Gulf players were built in English and translated afterwards, and it shows in ways players notice even when they cannot name them: text that overflows its button, a menu that mirrors but leaves its icons facing the wrong way, numerals in the wrong script, a tone that reads like a manual rather than a game. None of that is a translation problem. It is an architecture problem, created the moment right-to-left was treated as a setting instead of a layout.",
            ar: "معظم الألعاب التي تصل إلى لاعبي الخليج بُنيت بالإنجليزية ثم تُرجمت، ويظهر ذلك بطرق يلاحظها اللاعبون حتى لو لم يسمّوها: نص يفيض عن زرّه، وقائمة تنعكس لكن أيقوناتها تبقى في الاتجاه الخاطئ، وأرقام بالخط الخاطئ، ونبرة تُقرأ كدليل استخدام لا كلعبة. لا شيء من ذلك مشكلة ترجمة. إنها مشكلة بنية، نشأت لحظة معاملة الاتجاه من اليمين إلى اليسار كإعداد لا كتخطيط.",
          },
          {
            en: "We build the other way round. Arabic is a first-class language in our projects from the first screen — correct bidirectional layout, typography chosen for Arabic letterforms rather than inherited from a Latin design, and copy written in natural Gulf Arabic rather than translated at the end. It is why a Kuwaiti player and an English-speaking friend can sit in the same match of KoutQ8 without either feeling like the secondary audience.",
            ar: "نحن نبني بالعكس. العربية لغة من الدرجة الأولى في مشاريعنا من الشاشة الأولى — تخطيط ثنائي الاتجاه صحيح، وطباعة مختارة لأشكال الحروف العربية لا موروثة من تصميم لاتيني، ونصوص مكتوبة بعربية خليجية طبيعية لا مترجمة في النهاية. ولهذا يجلس لاعب كويتي وصديق يتحدث الإنجليزية في مباراة واحدة من كوت دون أن يشعر أحدهما بأنه الجمهور الثانوي.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: {
          en: "Do you make games for the Kuwaiti market?",
          ar: "هل تصنعون ألعابًا للسوق الكويتي؟",
        },
        a: {
          en: "Yes — it is what we know best. KoutQ8 is our digital version of the traditional Kuwaiti Kout card game, and Nabsh is our real-time trivia game with Kuwaiti and Gulf categories. We build Arabic-first games designed around how Kuwaiti players actually play, and we serve clients across Kuwait and the wider GCC.",
          ar: "نعم — وهو ما نعرفه أكثر من غيره. كوت نسختنا الرقمية للعبة الورق الكويتية التقليدية، ونبش لعبة المعلومات العامة المباشرة بفئات كويتية وخليجية. نبني ألعابًا بالعربية أولًا مصمّمة حول كيف يلعب الكويتيون فعلًا، ونخدم العملاء في الكويت والخليج الأوسع.",
        },
      },
      {
        q: {
          en: "Can you build a game based on a traditional Kuwaiti game like Kout?",
          ar: "هل تستطيعون بناء لعبة مبنية على لعبة كويتية تقليدية مثل الكوت؟",
        },
        a: {
          en: "Yes, and we have. KoutQ8 is a faithful digital Kout with online multiplayer and AI opponents so a table is always available. We are comfortable adapting traditional card and social games for mobile while keeping the rules and feel that players know.",
          ar: "نعم، وقد فعلنا. كوت لعبة كوت رقمية أمينة بلعب جماعي عبر الإنترنت وخصوم بذكاء اصطناعي فتتوفر الطاولة دائمًا. ونحن مرتاحون في تكييف ألعاب الورق والألعاب الاجتماعية التقليدية للجوال مع الحفاظ على القواعد والإحساس الذي يعرفه اللاعبون.",
        },
      },
      {
        q: {
          en: "Are your games fully in Arabic?",
          ar: "هل ألعابكم بالعربية بالكامل؟",
        },
        a: {
          en: "Yes. We build Arabic-first with correct right-to-left layout and natural Gulf Arabic, and our titles are bilingual Arabic and English. KoutQ8, Nabsh, and Arrab all support both languages so mixed groups can play together.",
          ar: "نعم. نبني بالعربية أولًا بتخطيط صحيح من اليمين إلى اليسار وعربية خليجية طبيعية، وألعابنا ثنائية اللغة بالعربية والإنجليزية. كوت ونبش والعرّاب كلها تدعم اللغتين فتلعب المجموعات المختلطة معًا.",
        },
      },
      {
        q: {
          en: "How do we start a game project with you?",
          ar: "كيف نبدأ مشروع لعبة معكم؟",
        },
        a: {
          en: "Message us on WhatsApp or through the contact page with your idea, target platform, and timeline. We will scope it with you, recommend an engine and approach, and propose a plan with clear milestones you can play as the build progresses.",
          ar: "راسلنا على واتساب أو عبر صفحة التواصل بفكرتك ومنصتك المستهدفة وجدولك. سنحدّد النطاق معك، ونوصي بمحرّك ومنهج، ونقترح خطة بمراحل واضحة تستطيع لعبها مع تقدّم البناء.",
        },
      },
      {
        q: {
          en: "How much does it cost to make a game?",
          ar: "كم تكلفة صناعة لعبة؟",
        },
        a: {
          en: "It depends on four things, and we would rather explain them than quote a number we would have to walk back. Scope — how many distinct modes, screens and rules. Art — a stylised 2D title and a realistic 3D one can differ by a multiple for identical gameplay. Multiplayer — real-time play adds servers, matchmaking and reconnection. And how settled the design is before the build starts, which is why we often suggest a prototype first. Send us the idea and we will scope it properly rather than guess.",
          ar: "تعتمد على أربعة أمور، ونفضّل شرحها على أن نعطي رقمًا سنضطر للتراجع عنه. النطاق — كم نمط لعب وشاشة وقاعدة متمايزة. والفن — عنوان ثنائي الأبعاد بأسلوب مصمّم وآخر ثلاثي الأبعاد واقعي قد يفترقان بمضاعفات للعب نفسه. واللعب الجماعي — اللعب الفوري يضيف خوادم ومطابقة لاعبين وإعادة اتصال. ومدى استقرار التصميم قبل بدء البناء، ولهذا نقترح غالبًا نموذجًا أوليًا أولًا. أرسل لنا الفكرة وسنحدّد نطاقها بدقة بدل التخمين.",
        },
      },
      {
        q: {
          en: "Which engines do you build in?",
          ar: "بأي محركات تبنون؟",
        },
        a: {
          en: "Unity and Unreal Engine 5, plus the browser for instant-play web games. Unity covers most mobile work and is what KoutQ8 runs on; Unreal Engine 5 is for high-fidelity 3D and MetaHuman characters, as in Power of Bombs; and Nabsh is a browser game precisely because it needs no download or store approval to spread.",
          ar: "Unity وUnreal Engine 5، إضافةً إلى المتصفح لألعاب الويب الفورية. يغطي Unity معظم أعمال الجوال وهو ما تعمل عليه كوت؛ وUnreal Engine 5 للرسوميات ثلاثية الأبعاد عالية الدقة وشخصيات MetaHuman كما في Power of Bombs؛ ونبش لعبة متصفح تحديدًا لأنها لا تحتاج تنزيلًا ولا موافقة متجر كي تنتشر.",
        },
      },
      {
        q: {
          en: "Do you build for both iOS and Android?",
          ar: "هل تبنون لنظامي iOS وAndroid؟",
        },
        a: {
          en: "Yes. Building in Unity means one codebase ships to the App Store and Google Play, and we handle the store listings, Arabic metadata and right-to-left layout that a Gulf launch needs rather than treating them as an afterthought.",
          ar: "نعم. البناء بـ Unity يعني قاعدة كود واحدة تُصدَّر إلى App Store وGoogle Play، ونتولى قوائم المتاجر والبيانات العربية والتخطيط من اليمين إلى اليسار التي يحتاجها إطلاق خليجي بدل معاملتها كفكرة لاحقة.",
        },
      },
      {
        q: {
          en: "Can you join a project that has already started?",
          ar: "هل يمكنكم الانضمام إلى مشروع بدأ بالفعل؟",
        },
        a: {
          en: "Often, yes. Plenty of work reaches us as a specific gap rather than a whole game — multiplayer for a title that outgrew single-player, a port to mobile, or 2D and 3D art for a team that has the engineering covered. Send us what exists and we will tell you honestly whether we are the right fit for the piece you need.",
          ar: "غالبًا نعم. كثير من العمل يصلنا كثغرة محددة لا كلعبة كاملة — لعب جماعي لعنوان تجاوز اللاعب الواحد، أو نقل إلى الجوال، أو فن ثنائي وثلاثي الأبعاد لفريق تغطّى جانبه البرمجي. أرسل لنا ما هو قائم وسنخبرك بصدق إن كنا المناسبين للجزء الذي تحتاجه.",
        },
      },
    ],
  },
  "game-development-saudi-arabia": {
    slug: "game-development-saudi-arabia",
    updatedAt: "2026-08-05",
    countryCode: "SA",
    metaTitle: {
      en: "Game Development Company for Saudi Arabia | Unity",
      ar: "شركة تطوير ألعاب إلكترونية للسعودية",
    },
    metaDescription: {
      en: "Game development company for Saudi Arabia. Arabic-first Unity and Unreal games, store and payment localisation, and remote collaboration across the Gulf.",
      ar: "شركة تطوير ألعاب إلكترونية للسعودية. ألعاب عربية أولًا على Unity وUnreal، وأقلمة المتاجر والدفع، وتعاون عن بُعد عبر الخليج.",
    },
    title: {
      en: "Game Development in Saudi Arabia",
      ar: "تطوير الألعاب في السعودية",
    },
    countryName: { en: "Saudi Arabia", ar: "السعودية" },
    intro: {
      en: "Saudi Arabia is the largest gaming market in the GCC and one of the fastest-growing in the world. Buried Games Studio is an independent, remote-first GCC games studio, and we partner with clients across Saudi Arabia to design, build, and ship games for Saudi and wider Arab players. What we bring is a studio rooted in the Gulf that understands the Saudi market, works in Arabic first, and shares your time zone and working week — so collaborating remotely feels as if we were down the street.",
      ar: "السعودية أكبر سوق ألعاب في الخليج وأحد أسرعها نموًا في العالم. استوديو بريد جيمز استوديو ألعاب خليجي مستقل يعمل عن بُعد أولًا، ونتشارك مع عملاء في كل أنحاء السعودية لتصميم الألعاب وبنائها وإطلاقها للاعبين السعوديين والعرب عمومًا. ما نقدّمه استوديو متجذّر في الخليج يفهم السوق السعودي، ويعمل بالعربية أولًا، ويشاركك المنطقة الزمنية وأسبوع العمل — فيبدو التعاون عن بُعد وكأننا في الشارع المجاور.",
    },
    sections: [
      {
        heading: {
          en: "A market with real momentum",
          ar: "سوق بزخم حقيقي",
        },
        body: [
          {
            en: "Saudi Arabia has put gaming at the centre of its economic diversification. Through the Public Investment Fund and its gaming arm Savvy Games Group, the Kingdom has committed major investment to studios, publishing, and esports as part of a national strategy under Vision 2030. For a client building a game here, that momentum is concrete: a young, highly connected, mobile-first audience, growing local infrastructure, and rising expectations for production quality. A game made for this market has to meet that bar.",
            ar: "وضعت السعودية الألعاب في قلب تنويعها الاقتصادي. فعبر صندوق الاستثمارات العامة وذراعه للألعاب «مجموعة سافي للألعاب»، خصّصت المملكة استثمارات كبيرة للاستوديوهات والنشر والرياضات الإلكترونية ضمن استراتيجية وطنية تحت رؤية 2030. وبالنسبة لعميل يبني لعبة هنا، فهذا الزخم ملموس: جمهور شاب شديد الاتصال يضع الجوال أولًا، وبنية تحتية محلية متنامية، وتوقعات مرتفعة لجودة الإنتاج. اللعبة المصنوعة لهذا السوق عليها أن تبلغ هذا المستوى.",
          },
          {
            en: "Our role is to help clients build to that standard without over-building. We pick the right scope and engine for the goal, prototype quickly, and validate with real players before committing to a full production budget.",
            ar: "دورنا مساعدة العملاء على البناء وفق هذا المعيار دون مبالغة في البناء. نختار النطاق والمحرّك المناسبين للهدف، ونبني النماذج بسرعة، ونتحقق مع لاعبين حقيقيين قبل الالتزام بميزانية إنتاج كاملة.",
          },
        ],
      },
      {
        heading: {
          en: "Arabic-first, not Arabic-as-an-afterthought",
          ar: "العربية أولًا لا العربية كفكرة لاحقة",
        },
        body: [
          {
            en: "Most games reach Saudi players as a Western title with a bolted-on translation, and players feel the difference immediately. We design Arabic-first: correct right-to-left layout, typography that respects Arabic letterforms, copy written in natural Modern Standard Arabic rather than machine-translated English, and a tone that fits a Saudi and Gulf audience. This is the same discipline behind our own bilingual titles, where the Arabic experience is built alongside the English one rather than patched in at the end.",
            ar: "تصل معظم الألعاب إلى اللاعبين السعوديين كعمل غربي بترجمة مُلصقة، ويشعر اللاعبون بالفرق فورًا. نحن نصمّم بالعربية أولًا: تخطيط صحيح من اليمين إلى اليسار، وطباعة تحترم أشكال الحروف العربية، ونص مكتوب بعربية فصيحة طبيعية لا ترجمة آلية للإنجليزية، ونبرة تلائم الجمهور السعودي والخليجي. هذه هي الحرفة نفسها خلف ألعابنا ثنائية اللغة، حيث تُبنى التجربة العربية جنبًا إلى جنب مع الإنجليزية لا تُرقَّع في النهاية.",
          },
        ],
      },
      {
        heading: {
          en: "Store and payment localisation for KSA",
          ar: "أقلمة المتاجر والدفع للمملكة",
        },
        body: [
          {
            en: "Reaching Saudi players is also an operational job. We localise the App Store and Google Play listings — Arabic screenshots, titles, and descriptions — because that is where most installs are decided. We integrate the payment methods Saudi players actually use, including local cards and wallets alongside the global app-store billing, and we price with local purchasing power in mind. Getting these details right is the difference between a game that downloads and a game that earns.",
            ar: "الوصول إلى اللاعبين السعوديين عمل تشغيلي أيضًا. نُؤقلم قوائم App Store وGoogle Play — لقطات وعناوين وأوصاف بالعربية — لأن هناك تُقرّر معظم التثبيتات. ونُدمج طرق الدفع التي يستخدمها اللاعبون السعوديون فعلًا، بما فيها البطاقات والمحافظ المحلية إلى جانب فوترة المتاجر العالمية، ونُسعّر مع مراعاة القوة الشرائية المحلية. ضبط هذه التفاصيل هو الفرق بين لعبة تُحمَّل ولعبة تُربح.",
          },
        ],
      },
      {
        heading: {
          en: "How we work with Saudi clients remotely",
          ar: "كيف نعمل مع العملاء السعوديين عن بُعد",
        },
        body: [
          {
            en: "We work remotely across the GCC and share the Saudi time zone, working week, and culture, which makes collaboration genuinely seamless — overlapping hours and a shared language for both the code reviews and the casual calls. We run projects with clear milestones, regular builds you can play on your own device, and a single point of contact, so distance never becomes a black box. Many of our Saudi conversations start on WhatsApp, and we are happy to keep them there.",
            ar: "نعمل عن بُعد عبر الخليج ونشارك السعودية المنطقة الزمنية وأسبوع العمل والثقافة، ما يجعل التعاون سلسًا فعلًا — ساعات متداخلة، ولغة مشتركة لمراجعات الكود والمكالمات العفوية على حد سواء. نُدير المشاريع بمراحل واضحة، وبنسخ منتظمة تستطيع لعبها على جهازك، وبنقطة تواصل واحدة، فلا تصبح المسافة صندوقًا أسود أبدًا. كثير من محادثاتنا السعودية يبدأ على واتساب، ويسعدنا إبقاؤه هناك.",
          },
        ],
      },
      {
        heading: {
          en: "What we build for Saudi clients",
          ar: "ما نبنيه لعملائنا السعوديين",
        },
        body: [
          {
            en: "Saudi enquiries tend to be more varied than elsewhere in the Gulf, because the market is bigger and the buyers are more different from one another. Some are studios who need a specific capability added — multiplayer game development for a title that outgrew single-player, or 2D and 3D game art for a team whose engineering is already covered. Some are brands and agencies who want an interactive installation or an AR campaign rather than a storefront game. And some are founders with an original concept who need the whole path: design, art, engineering and launch.",
            ar: "الطلبات السعودية أكثر تنوّعًا من غيرها في الخليج، لأن السوق أكبر والمشترون أشدّ اختلافًا عن بعضهم. بعضهم استوديوهات تحتاج إضافة قدرة بعينها — برمجة ألعاب جماعية لعنوان تجاوز اللاعب الواحد، أو فن ثنائي وثلاثي الأبعاد لفريق تغطّى جانبه البرمجي. وبعضهم علامات تجارية ووكالات تريد تركيبًا تفاعليًا أو حملة واقع معزز لا لعبة على متجر. وبعضهم مؤسسون بفكرة أصلية يحتاجون المسار كاملًا: تصميم وفن وبرمجة وإطلاق.",
          },
          {
            en: "We are equally happy taking one slice or the whole thing. A studio that only accepts complete projects is of little use to a Saudi team that already has one running and needs a particular gap closed.",
            ar: "يسعدنا أخذ شريحة واحدة أو العمل كاملًا على حدّ سواء. الاستوديو الذي لا يقبل إلا المشاريع الكاملة قليل النفع لفريق سعودي لديه مشروع جارٍ ويحتاج سدّ ثغرة بعينها.",
          },
        ],
      },
      {
        heading: {
          en: "Choosing an engine: Unity, Unreal, or the browser",
          ar: "اختيار المحرّك: Unity أو Unreal أو المتصفح",
        },
        body: [
          {
            en: "The engine follows the game, never the other way round. Unity carries most mobile work — one codebase to the App Store and Google Play, mature 2D and casual tooling, and the engine behind KoutQ8. Unreal Engine 5 earns its place where fidelity is the product: high-end 3D, realistic lighting, MetaHuman digital characters, as in Power of Bombs. The browser is the third route and the one most often overlooked in a market this mobile-heavy — a web game needs no download and no store review, which is exactly why Nabsh spreads through a group chat instead of an app listing.",
            ar: "المحرّك يتبع اللعبة لا العكس. Unity يحمل معظم أعمال الجوال — قاعدة كود واحدة إلى App Store وGoogle Play، وأدوات ناضجة للألعاب ثنائية الأبعاد والعادية، وهو المحرّك خلف كوت. وUnreal Engine 5 يستحق مكانه حين تكون الدقة هي المنتج: رسوميات ثلاثية الأبعاد عالية الجودة، وإضاءة واقعية، وشخصيات MetaHuman، كما في Power of Bombs. والمتصفح هو الطريق الثالث والأكثر إغفالًا في سوق يميل إلى الجوال بهذا القدر — لعبة الويب لا تحتاج تنزيلًا ولا مراجعة متجر، ولهذا تحديدًا تنتشر نبش عبر مجموعة محادثة لا عبر قائمة تطبيقات.",
          },
        ],
      },
      {
        heading: {
          en: "What actually drives the cost of a game",
          ar: "ما الذي يحدّد تكلفة اللعبة فعلًا",
        },
        body: [
          {
            en: "We do not publish a price, because any studio quoting one on a web page is guessing at your project. What we will do is name the levers. Scope comes first — the count of distinct modes, screens and rules, not the length of the wish list. Art is second, and it is where estimates diverge most: a stylised 2D game and a realistic 3D one can differ by a multiple for identical gameplay. Multiplayer is third and the most routinely underestimated, because real-time play drags servers, matchmaking, reconnection and anti-cheat into a budget written for single-player.",
            ar: "لا ننشر سعرًا، لأن أي استوديو يضع سعرًا على صفحة ويب إنما يخمّن مشروعك. ما سنفعله هو تسمية الروافع. النطاق أولًا — عدد الأنماط والشاشات والقواعد المتمايزة، لا طول قائمة الأمنيات. والفن ثانيًا، وفيه تتباعد التقديرات أكثر ما تتباعد: لعبة ثنائية الأبعاد بأسلوب مصمّم وأخرى ثلاثية الأبعاد واقعية قد تفترقان بمضاعفات للعب نفسه. واللعب الجماعي ثالثًا وأكثرها استهانةً على نحو متكرر، لأن اللعب الفوري يجرّ الخوادم ومطابقة اللاعبين وإعادة الاتصال ومكافحة الغش إلى ميزانية كُتبت للاعب واحد.",
          },
          {
            en: "The fourth lever is the quiet one: how settled the design is before the build begins. A prototype that answers the fun question early is the cheapest work you will ever commission from us, because everything after it stops being a rewrite.",
            ar: "الرافعة الرابعة هي الهادئة: مدى استقرار التصميم قبل بدء البناء. النموذج الأولي الذي يجيب عن سؤال المتعة مبكرًا أرخص عمل ستطلبه منا، لأن كل ما بعده يتوقف عن كونه إعادة كتابة.",
          },
        ],
      },
      {
        heading: {
          en: "How a project runs, week to week",
          ar: "كيف يسير المشروع أسبوعًا بأسبوع",
        },
        body: [
          {
            en: "Scoping comes before any contract. We work through what the game actually is — modes, loop, platforms, audience — until the brief is specific enough to estimate honestly, and where the fun is still an open question we propose a playable prototype first. From there the build runs on milestones, and the rule that matters is that each one ends in something you can play on your own device rather than a status report. You see the game in the state it is genuinely in, which is the only dependable way to catch a wrong turn while correcting it is still cheap.",
            ar: "تحديد النطاق يسبق أي عقد. نعمل على ما هي اللعبة فعلًا — الأنماط وحلقة اللعب والمنصات والجمهور — إلى أن يصبح الموجز محددًا بما يكفي للتقدير بصدق، وحيث تبقى المتعة سؤالًا مفتوحًا نقترح نموذجًا أوليًا قابلًا للعب أولًا. ومن هناك يسير البناء على مراحل، والقاعدة المهمة أن تنتهي كل مرحلة بشيء تلعبه على جهازك لا بتقرير حالة. ترى اللعبة في حالتها الحقيقية، وهي الطريقة الوحيدة المعوَّل عليها لالتقاط منعطف خاطئ وتصحيحه ما زال رخيصًا.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: {
          en: "How much does it cost to make a game?",
          ar: "كم تكلفة صناعة لعبة؟",
        },
        a: {
          en: "It turns on four things, and we would rather explain them than quote a figure we would have to retract. Scope — how many distinct modes, screens and rules. Art — a stylised 2D title and a realistic 3D one can differ by a multiple for the same gameplay. Multiplayer — real-time play adds servers, matchmaking and reconnection. And how settled the design is before the build starts, which is why we often propose a prototype first. Send the idea over and we will scope it properly instead of guessing.",
          ar: "تتوقف على أربعة أمور، ونفضّل شرحها على إعطاء رقم سنضطر لسحبه. النطاق — كم نمط لعب وشاشة وقاعدة متمايزة. والفن — عنوان ثنائي الأبعاد بأسلوب مصمّم وآخر ثلاثي الأبعاد واقعي قد يفترقان بمضاعفات للعب نفسه. واللعب الجماعي — اللعب الفوري يضيف خوادم ومطابقة لاعبين وإعادة اتصال. ومدى استقرار التصميم قبل بدء البناء، ولهذا نقترح غالبًا نموذجًا أوليًا أولًا. أرسل الفكرة وسنحدّد نطاقها بدقة بدل التخمين.",
        },
      },
      {
        q: {
          en: "Can you join a project that has already started?",
          ar: "هل يمكنكم الانضمام إلى مشروع بدأ بالفعل؟",
        },
        a: {
          en: "Often, yes. A good share of our work arrives as a specific gap rather than a whole game — multiplayer for a title that outgrew single-player, a port to mobile, or 2D and 3D art for a team whose engineering is already handled. Send us what exists and we will tell you honestly whether we are the right fit for that piece.",
          ar: "غالبًا نعم. نصيب معتبر من عملنا يصلنا كثغرة محددة لا كلعبة كاملة — لعب جماعي لعنوان تجاوز اللاعب الواحد، أو نقل إلى الجوال، أو فن ثنائي وثلاثي الأبعاد لفريق تغطّى جانبه البرمجي. أرسل لنا ما هو قائم وسنخبرك بصدق إن كنا المناسبين لذلك الجزء.",
        },
      },
      {
        q: {
          en: "Do you have an office in Saudi Arabia?",
          ar: "هل لديكم مكتب في السعودية؟",
        },
        a: {
          en: "No local office — we are a remote-first GCC games studio and we serve Saudi clients remotely. It works smoothly because we share a time zone, a working week, and the Arabic language. You get the same regular builds, milestones, and direct communication as a local team.",
          ar: "لا مكتب محلي — نحن استوديو ألعاب خليجي يعمل عن بُعد أولًا، ونخدم العملاء السعوديين عن بُعد. يسير الأمر بسلاسة لأننا نشترك في المنطقة الزمنية وأسبوع العمل واللغة العربية. تحصل على النسخ المنتظمة والمراحل والتواصل المباشر نفسها التي يقدّمها فريق محلي.",
        },
      },
      {
        q: {
          en: "Can you build a fully Arabic game for the Saudi market?",
          ar: "هل تستطيعون بناء لعبة عربية بالكامل للسوق السعودي؟",
        },
        a: {
          en: "Yes. We build Arabic-first, with correct right-to-left layout, natural Arabic copy, and Arabic store listings — not a translated afterthought. Bilingual Arabic and English support is part of our standard workflow.",
          ar: "نعم. نبني بالعربية أولًا، بتخطيط صحيح من اليمين إلى اليسار، ونص عربي طبيعي، وقوائم متاجر بالعربية — لا ترجمة لاحقة. دعم العربية والإنجليزية معًا جزء من سير عملنا القياسي.",
        },
      },
      {
        q: {
          en: "Which engine do you use for Saudi mobile games?",
          ar: "أي محرّك تستخدمون لألعاب الجوال السعودية؟",
        },
        a: {
          en: "Usually Unity, because most of the Saudi audience is mobile-first and Unity ships smoothly to iOS and Android on the mid-range devices most players carry. We use Unreal when a project genuinely needs high-end 3D visuals, and we recommend the right engine per project.",
          ar: "عادةً يونيتي، لأن معظم الجمهور السعودي يضع الجوال أولًا، ويونيتي يُطلق بسلاسة على iOS وأندرويد على الأجهزة متوسطة الفئة التي يحملها معظم اللاعبين. نستخدم أنريل حين يحتاج مشروع فعلًا إلى رسوميات ثلاثية الأبعاد راقية، ونوصي بالمحرّك المناسب لكل مشروع.",
        },
      },
      {
        q: {
          en: "How do we start a project?",
          ar: "كيف نبدأ مشروعًا؟",
        },
        a: {
          en: "Message us on WhatsApp or through the contact page with your idea, target platform, and rough timeline. We will scope it with you, recommend an engine and approach, and propose a plan with clear milestones.",
          ar: "راسلنا على واتساب أو عبر صفحة التواصل بفكرتك ومنصتك المستهدفة وجدولك التقريبي. سنحدّد النطاق معك، ونوصي بمحرّك ومنهج، ونقترح خطة بمراحل واضحة.",
        },
      },
    ],
  },
  "game-development-uae": {
    slug: "game-development-uae",
    updatedAt: "2026-08-05",
    countryCode: "AE",
    metaTitle: {
      en: "Game Development Company for the UAE | Dubai & Abu Dhabi",
      ar: "شركة تطوير ألعاب إلكترونية للإمارات | دبي وأبوظبي",
    },
    metaDescription: {
      en: "Game development company for the UAE. Arabic and English games on Unity and Unreal for Dubai and Abu Dhabi clients, with store and payment localisation.",
      ar: "شركة تصميم وتطوير ألعاب إلكترونية للإمارات. ألعاب بالعربية والإنجليزية على Unity وUnreal لعملاء دبي وأبوظبي، مع أقلمة المتاجر والدفع.",
    },
    title: {
      en: "Game Development in the UAE",
      ar: "تطوير الألعاب في الإمارات",
    },
    countryName: { en: "the UAE", ar: "الإمارات" },
    intro: {
      en: "The UAE is the most international gaming market in the GCC — a mix of Emirati players, a large expatriate audience, and a government actively courting the games and creative industries. Buried Games Studio is an independent, remote-first GCC games studio, and we work with clients across the UAE to build games for Dubai, Abu Dhabi, and the wider region. What we offer is deep Gulf understanding, genuine bilingual development, and remote collaboration that fits how UAE companies already work.",
      ar: "الإمارات أكثر أسواق الألعاب عالميةً في الخليج — مزيج من اللاعبين الإماراتيين، وجمهور وافد كبير، وحكومة تستقطب بنشاط صناعات الألعاب والإبداع. استوديو بريد جيمز استوديو ألعاب خليجي مستقل يعمل عن بُعد أولًا، ونعمل مع عملاء في كل أنحاء الإمارات لبناء ألعاب لدبي وأبوظبي والمنطقة الأوسع. ما نقدّمه فهم خليجي عميق، وتطوير ثنائي اللغة حقيقي، وتعاون عن بُعد يلائم طريقة عمل الشركات الإماراتية أصلًا.",
    },
    sections: [
      {
        heading: {
          en: "A bilingual, international audience",
          ar: "جمهور دولي ثنائي اللغة",
        },
        body: [
          {
            en: "The UAE player base is unusually diverse. Emirati and Arab players sit alongside a huge expatriate community, which means a successful game here often needs to feel equally natural in Arabic and in English. We treat this as a design constraint from the start, not a translation task at the end: layouts that flow correctly in both right-to-left and left-to-right, copy written natively in each language, and a visual tone that reads as premium to a Dubai audience that expects polish.",
            ar: "قاعدة اللاعبين الإماراتية متنوعة بشكل غير اعتيادي. يجلس اللاعبون الإماراتيون والعرب إلى جانب جالية وافدة ضخمة، ما يعني أن اللعبة الناجحة هنا تحتاج غالبًا إلى أن تبدو طبيعية بالعربية والإنجليزية معًا. نتعامل مع هذا كقيد تصميمي منذ البداية لا كمهمة ترجمة في النهاية: تخطيطات تتدفق بشكل صحيح من اليمين إلى اليسار ومن اليسار إلى اليمين، ونص مكتوب أصليًا بكل لغة، ونبرة بصرية تُقرأ كفاخرة لدى جمهور دبي الذي يتوقع الإتقان.",
          },
        ],
      },
      {
        heading: {
          en: "A government backing the creative sector",
          ar: "حكومة تدعم القطاع الإبداعي",
        },
        body: [
          {
            en: "The UAE has invested heavily in becoming a hub for gaming, esports, and digital entertainment, with dedicated programmes, free zones, and events drawing studios and publishers to Dubai and Abu Dhabi. For a client, this means a market that takes games seriously and an audience accustomed to high production values across mobile and beyond. We help clients meet those expectations efficiently — choosing scope and engine to match the goal rather than chasing fidelity for its own sake.",
            ar: "استثمرت الإمارات بكثافة لتصبح مركزًا للألعاب والرياضات الإلكترونية والترفيه الرقمي، ببرامج مخصصة، ومناطق حرة، وفعاليات تستقطب الاستوديوهات والناشرين إلى دبي وأبوظبي. وبالنسبة لعميل، يعني هذا سوقًا يأخذ الألعاب على محمل الجد وجمهورًا معتادًا على قيم إنتاج عالية عبر الجوال وما بعده. نساعد العملاء على بلوغ هذه التوقعات بكفاءة — باختيار النطاق والمحرّك ليلائما الهدف بدلًا من مطاردة الجودة البصرية لذاتها.",
          },
        ],
      },
      {
        heading: {
          en: "Store and payment localisation for the UAE",
          ar: "أقلمة المتاجر والدفع للإمارات",
        },
        body: [
          {
            en: "Shipping into the UAE means getting the operational layer right. We localise App Store and Google Play listings in both Arabic and English, since the audience spans both, and we integrate the payment methods UAE players use, from global app-store billing to local cards and wallets. Pricing is set with the local market in mind. These details decide whether a strong game actually converts the players who find it.",
            ar: "الإطلاق في الإمارات يعني ضبط الطبقة التشغيلية. نُؤقلم قوائم App Store وGoogle Play بالعربية والإنجليزية معًا، لأن الجمهور يشمل اللغتين، ونُدمج طرق الدفع التي يستخدمها اللاعبون الإماراتيون، من فوترة المتاجر العالمية إلى البطاقات والمحافظ المحلية. ويُضبط التسعير مع مراعاة السوق المحلي. هذه التفاصيل تُقرّر إن كانت لعبة قوية تُحوّل فعلًا اللاعبين الذين يجدونها.",
          },
        ],
      },
      {
        heading: {
          en: "Remote collaboration across GCC time zones",
          ar: "تعاون عن بُعد عبر مناطق الخليج الزمنية",
        },
        body: [
          {
            en: "We work remotely across the GCC and share the UAE's working rhythm and time zone, so collaborating remotely feels local. We run projects on clear milestones with playable builds you can test on your own devices, a single point of contact, and fast turnarounds over WhatsApp and email. UAE companies are already used to working with distributed teams across the region, and our process is built to make that distance invisible.",
            ar: "نعمل عن بُعد عبر الخليج ونشارك الإمارات إيقاع العمل والمنطقة الزمنية، فيبدو التعاون عن بُعد محليًا. نُدير المشاريع بمراحل واضحة، وبنسخ قابلة للعب تختبرها على أجهزتك، وبنقطة تواصل واحدة، وباستجابات سريعة عبر واتساب والبريد. الشركات الإماراتية معتادة أصلًا على العمل مع فرق موزّعة عبر المنطقة، وعمليتنا مبنية لجعل هذه المسافة غير مرئية.",
          },
        ],
      },
      {
        heading: {
          en: "Beyond games: installations, AR and VR",
          ar: "أبعد من الألعاب: تركيبات وواقع معزز وافتراضي",
        },
        body: [
          {
            en: "More of our UAE conversations begin outside the app stores than anywhere else in the Gulf. Malls, expos, retail activations and visitor attractions all want something interactive, and the brief is rarely a downloadable game — it is a sensor floor, a motion-controlled screen, a kiosk experience, or an AR campaign that opens from a QR code with nothing to install. Virtual reality shows up here too, in training simulations and virtual showrooms rather than entertainment titles.",
            ar: "محادثاتنا الإماراتية تبدأ خارج متاجر التطبيقات أكثر من أي مكان آخر في الخليج. المولات والمعارض وتفعيلات التجزئة والوجهات السياحية كلها تريد شيئًا تفاعليًا، والموجز نادرًا ما يكون لعبة قابلة للتنزيل — بل أرضية بحساسات، أو شاشة تُدار بالحركة، أو تجربة كشك، أو حملة واقع معزز تُفتح من رمز QR بلا تثبيت. والواقع الافتراضي يظهر هنا أيضًا، في محاكاة التدريب وصالات العرض الافتراضية لا في ألعاب الترفيه.",
          },
          {
            en: "The engineering underneath is the same discipline as a game — real-time rendering, input handling, state that survives being hammered by strangers for a fortnight — which is why a games studio tends to build these better than a general software house. The difference is that nobody restarts a mall installation when it hangs, so it has to run unattended for weeks.",
            ar: "الهندسة تحت السطح هي انضباط اللعبة نفسه — عرض في الوقت الفعلي، ومعالجة مدخلات، وحالة تصمد أمام غرباء يطرقونها أسبوعين — ولهذا يبني استوديو الألعاب هذه الأعمال أفضل من بيت برمجيات عام. الفرق أن لا أحد يعيد تشغيل تركيب في مول حين يتوقف، فعليه أن يعمل دون إشراف أسابيع.",
          },
        ],
      },
      {
        heading: {
          en: "Choosing an engine: Unity, Unreal, or the browser",
          ar: "اختيار المحرّك: Unity أو Unreal أو المتصفح",
        },
        body: [
          {
            en: "Engine choice is downstream of the brief. Unity handles most mobile and installation work — one codebase across iOS, Android and kiosk hardware, and the engine behind KoutQ8. Unreal Engine 5 is where visual fidelity is the deliverable: architectural and product visualisation, realistic lighting, MetaHuman digital characters, as in Power of Bombs. And for a campaign that has to open instantly from a QR code or a link, the browser wins outright — no download, no store review, which is why Nabsh lives on the web.",
            ar: "اختيار المحرّك تابع للموجز. Unity يتولى معظم أعمال الجوال والتركيبات — قاعدة كود واحدة عبر iOS وAndroid وأجهزة الأكشاك، وهو المحرّك خلف كوت. وUnreal Engine 5 حيث تكون الدقة البصرية هي المُسلَّم: تصور معماري ومنتجات، وإضاءة واقعية، وشخصيات MetaHuman، كما في Power of Bombs. وللحملة التي يجب أن تُفتح فورًا من رمز QR أو رابط، يفوز المتصفح بلا منازع — بلا تنزيل وبلا مراجعة متجر، ولهذا تعيش نبش على الويب.",
          },
        ],
      },
      {
        heading: {
          en: "What actually drives the cost",
          ar: "ما الذي يحدّد التكلفة فعلًا",
        },
        body: [
          {
            en: "We do not put a price on a web page, because a studio that does is guessing at your brief. The levers are worth naming, though. Scope leads — the number of distinct modes, screens and rules. Art follows, and it is where estimates spread furthest: stylised and photoreal can differ by a multiple for the same interaction. Real-time multiplayer is third and the most routinely underpriced, because it drags servers, matchmaking and reconnection into a budget written without them. For installations, add the hardware and the requirement to run unattended, which is an engineering cost rather than a creative one.",
            ar: "لا نضع سعرًا على صفحة ويب، لأن الاستوديو الذي يفعل يخمّن موجزك. لكن الروافع تستحق التسمية. النطاق يتصدّر — عدد الأنماط والشاشات والقواعد المتمايزة. ثم الفن، وفيه تتباعد التقديرات أقصى ما تتباعد: الأسلوب المصمَّم والواقعي الفوتوغرافي قد يفترقان بمضاعفات للتفاعل نفسه. واللعب الجماعي الفوري ثالثًا وأكثرها بخسًا في التسعير، لأنه يجرّ الخوادم ومطابقة اللاعبين وإعادة الاتصال إلى ميزانية كُتبت بدونها. وللتركيبات، أضف العتاد وشرط العمل دون إشراف، وهي كلفة هندسية لا إبداعية.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: {
          en: "Are you based in the UAE?",
          ar: "هل مقركم في الإمارات؟",
        },
        a: {
          en: "No local office — we are a remote-first GCC games studio and we work with UAE clients remotely. We share the UAE's working week and time zone, so collaboration is smooth, with regular builds, clear milestones, and direct communication.",
          ar: "لا مكتب محلي — نحن استوديو ألعاب خليجي يعمل عن بُعد أولًا، ونعمل مع عملاء الإمارات عن بُعد. نشارك الإمارات أسبوع العمل والمنطقة الزمنية، فالتعاون سلس، بنسخ منتظمة ومراحل واضحة وتواصل مباشر.",
        },
      },
      {
        q: {
          en: "Can you build a game in both Arabic and English for the UAE?",
          ar: "هل تستطيعون بناء لعبة بالعربية والإنجليزية للإمارات؟",
        },
        a: {
          en: "Yes, and for the UAE we usually recommend it. The audience spans Arabic and English speakers, so we build both experiences natively — correct layout in each direction, native copy, and bilingual store listings — rather than translating one into the other.",
          ar: "نعم، ونوصي بذلك عادةً للإمارات. يشمل الجمهور الناطقين بالعربية والإنجليزية، فنبني التجربتين أصليًا — تخطيط صحيح في كل اتجاه، ونص أصلي، وقوائم متاجر ثنائية اللغة — بدلًا من ترجمة إحداهما إلى الأخرى.",
        },
      },
      {
        q: {
          en: "Do you build for mobile, PC, or console?",
          ar: "هل تطوّرون للجوال أم الحاسوب أم الأجهزة المنزلية؟",
        },
        a: {
          en: "Our focus is mobile-first, which suits most of the UAE market, primarily in Unity. We also take on higher-end 3D projects in Unreal when a client's vision calls for it, and we will recommend the right platform and engine for your goals.",
          ar: "تركيزنا على الجوال أولًا، وهو ما يناسب معظم السوق الإماراتي، بشكل رئيسي في يونيتي. ونتولى أيضًا مشاريع ثلاثية الأبعاد راقية في أنريل حين تتطلبها رؤية العميل، وسنوصي بالمنصة والمحرّك المناسبين لأهدافك.",
        },
      },
      {
        q: {
          en: "How do we get started?",
          ar: "كيف نبدأ؟",
        },
        a: {
          en: "Reach us on WhatsApp or via the contact page with your concept, target platform, and timeline. We will scope the project, recommend an approach, and come back with a clear plan and milestones.",
          ar: "تواصل معنا على واتساب أو عبر صفحة التواصل بفكرتك ومنصتك المستهدفة وجدولك. سنحدّد نطاق المشروع، ونوصي بمنهج، ونعود إليك بخطة ومراحل واضحة.",
        },
      },
    ],
  },
  "game-development-qatar": {
    slug: "game-development-qatar",
    updatedAt: "2026-08-05",
    countryCode: "QA",
    metaTitle: {
      en: "Game Development Company for Qatar | Unity & Unreal",
      ar: "شركة تطوير ألعاب إلكترونية لقطر",
    },
    metaDescription: {
      en: "Game development company for Qatar. Arabic and English Unity and Unreal games for Qatar's bilingual, esports-driven audience — built and shipped remotely.",
      ar: "شركة تطوير ألعاب إلكترونية لقطر. ألعاب بالعربية والإنجليزية على Unity وUnreal لجمهور قطر ثنائي اللغة المدفوع بالرياضات الإلكترونية.",
    },
    title: {
      en: "Game Development for Qatar",
      ar: "تطوير ألعاب لقطر",
    },
    countryName: { en: "Qatar", ar: "قطر" },
    intro: {
      en: "Qatar has moved fast to position itself as a regional centre for esports and digital entertainment. Buried Games Studio is an independent, remote-first GCC games studio, and we work with clients across Qatar to design, build, and ship games for a Qatari and international audience. We bring deep Gulf understanding, genuine Arabic-and-English bilingual development, and a process built for the kind of competitive, community-driven games Qatar's players increasingly expect.",
      ar: "تحركت قطر بسرعة لتضع نفسها مركزًا إقليميًا للرياضات الإلكترونية والترفيه الرقمي. استوديو بريد جيمز استوديو ألعاب خليجي مستقل يعمل عن بُعد أولًا، ونعمل مع عملاء في كل أنحاء قطر لتصميم الألعاب وبنائها وإطلاقها لجمهور قطري ودولي. نقدّم فهمًا خليجيًا عميقًا، وتطويرًا ثنائي اللغة حقيقيًا بالعربية والإنجليزية، وعملية مبنية لنوع الألعاب التنافسية المدفوعة بالمجتمع التي يتوقعها لاعبو قطر أكثر فأكثر.",
    },
    sections: [
      {
        heading: {
          en: "An esports-led market",
          ar: "سوق تقوده الرياضات الإلكترونية",
        },
        body: [
          {
            en: "Qatar has invested deliberately in competitive gaming. The Qatar Esports Federation, established under the Qatar Olympic Committee, has signed a long-term framework with the Global Esports Federation, and the country has hosted major international tournaments with serious prize pools. For a client, this means an audience primed for competition: players who care about leaderboards, ranked play, real-time multiplayer, and the social status of a good run. We build with that appetite in mind — networked multiplayer, matchmaking, and progression systems are core to what we do, as in Nabsh and Arrab, not features we bolt on at the end.",
            ar: "استثمرت قطر بتأنٍّ في الألعاب التنافسية. وقّع الاتحاد القطري للرياضات الإلكترونية، المنشأ تحت اللجنة الأولمبية القطرية، إطارًا طويل الأمد مع الاتحاد العالمي للرياضات الإلكترونية، واستضافت البلاد بطولات دولية كبرى بجوائز جادة. وبالنسبة لعميل، يعني هذا جمهورًا مهيأً للمنافسة: لاعبون يهتمون بلوحات الصدارة، واللعب المصنّف، واللعب الجماعي الفوري، والمكانة الاجتماعية للأداء الجيد. نبني مع وضع هذه الشهية في الحسبان — اللعب الجماعي الشبكي، ومطابقة اللاعبين، وأنظمة التقدّم جوهر ما نفعله، كما في نبش والعرّاب، لا ميزات نلصقها في النهاية.",
          },
        ],
      },
      {
        heading: {
          en: "Bilingual by default",
          ar: "ثنائية اللغة كأصل",
        },
        body: [
          {
            en: "Qatar's audience spans Qatari and Arab players alongside a large international community, so a successful game here usually needs to feel equally natural in Arabic and English. We treat this as a design constraint from the start: correct layout in both directions, copy written natively in each language rather than machine-translated, and a tone that reads well to both audiences. KoutQ8, Nabsh, and Arrab are all fully bilingual, built that way from the first screen rather than patched at the end.",
            ar: "يمتد جمهور قطر من اللاعبين القطريين والعرب إلى جانب جالية دولية كبيرة، فاللعبة الناجحة هنا تحتاج غالبًا إلى أن تبدو طبيعية بالعربية والإنجليزية معًا. نتعامل مع هذا كقيد تصميمي منذ البداية: تخطيط صحيح في الاتجاهين، ونص مكتوب أصليًا بكل لغة لا ترجمة آلية، ونبرة تُقرأ جيدًا لدى الجمهورين. كوت ونبش والعرّاب كلها ثنائية اللغة بالكامل، مبنية هكذا من الشاشة الأولى لا مُرقّعة في النهاية.",
          },
        ],
      },
      {
        heading: {
          en: "Store and payment localisation for Qatar",
          ar: "أقلمة المتاجر والدفع لقطر",
        },
        body: [
          {
            en: "Shipping into Qatar means getting the operational layer right. We localise App Store and Google Play listings in Arabic and English, integrate the payment methods Qatari players use alongside global app-store billing, and set pricing with the local market in mind. With one of the highest per-capita incomes in the region, Qatar rewards games that present themselves with polish — and the store listing is the first place that impression is made.",
            ar: "الإطلاق في قطر يعني ضبط الطبقة التشغيلية. نُؤقلم قوائم App Store وGoogle Play بالعربية والإنجليزية، ونُدمج طرق الدفع التي يستخدمها اللاعبون القطريون إلى جانب فوترة المتاجر العالمية، ونضبط التسعير مع مراعاة السوق المحلي. وبأحد أعلى مستويات الدخل للفرد في المنطقة، تكافئ قطر الألعاب التي تقدّم نفسها بإتقان — وقائمة المتجر هي أول مكان يتشكّل فيه هذا الانطباع.",
          },
        ],
      },
      {
        heading: {
          en: "Remote collaboration that fits Qatar",
          ar: "تعاون عن بُعد يلائم قطر",
        },
        body: [
          {
            en: "We work remotely across the GCC and share Qatar's time zone and working week, so collaboration feels local. We run projects on clear milestones with playable builds you can test on your own devices, a single point of contact, and fast turnarounds over WhatsApp and email. Qatari organisations are used to working with distributed teams across the region, and our process is built to make the distance invisible.",
            ar: "نعمل عن بُعد عبر الخليج ونشارك قطر المنطقة الزمنية وأسبوع العمل، فيبدو التعاون محليًا. نُدير المشاريع بمراحل واضحة، وبنسخ قابلة للعب تختبرها على أجهزتك، وبنقطة تواصل واحدة، وباستجابات سريعة عبر واتساب والبريد. المؤسسات القطرية معتادة على العمل مع فرق موزّعة عبر المنطقة، وعمليتنا مبنية لجعل المسافة غير مرئية.",
          },
        ],
      },
      {
        heading: {
          en: "Competitive play, and building for it",
          ar: "اللعب التنافسي والبناء له",
        },
        body: [
          {
            en: "Qatar's players skew competitive, and that changes what a game has to get right. A casual title forgives a lot; a competitive one forgives almost nothing. Matches have to be fair, which means server-authoritative rules rather than trusting the client. They have to be responsive, which means latency budgets taken seriously rather than discovered at launch. And they have to be legible under pressure — a player who loses should be able to see why, or the game reads as broken rather than hard.",
            ar: "لاعبو قطر يميلون إلى التنافس، وهذا يغيّر ما يجب أن تتقنه اللعبة. العنوان العادي يغفر كثيرًا؛ التنافسي لا يغفر شيئًا تقريبًا. المباريات يجب أن تكون عادلة، ما يعني قواعد يحكمها الخادم لا الثقة بالعميل. ويجب أن تكون سريعة الاستجابة، ما يعني أخذ ميزانيات التأخير بجدية لا اكتشافها عند الإطلاق. ويجب أن تكون مفهومة تحت الضغط — من يخسر عليه أن يرى لماذا، وإلا قُرئت اللعبة كمعطوبة لا كصعبة.",
          },
          {
            en: "Real-time multiplayer is the part of this work we do most often, and the part clients most often underestimate. Matchmaking, reconnection after a dropped call, and handling the player who closes the app mid-match are not features you add at the end — they are architecture decided in week one.",
            ar: "اللعب الجماعي الفوري هو الجزء الذي ننفّذه أكثر من غيره، والجزء الذي يستهين به العملاء أكثر من غيره. مطابقة اللاعبين، وإعادة الاتصال بعد انقطاع مكالمة، ومعالجة من يغلق التطبيق في منتصف المباراة ليست ميزات تُضاف في النهاية — إنها بنية تُقرَّر في الأسبوع الأول.",
          },
        ],
      },
      {
        heading: {
          en: "Choosing an engine for a Qatari project",
          ar: "اختيار المحرّك لمشروع قطري",
        },
        body: [
          {
            en: "Unity carries most of what we ship to Qatar — one codebase to iOS and Android, strong tooling for 2D and casual work, and the engine KoutQ8 runs on. Unreal Engine 5 is the answer when fidelity is the product rather than the packaging: high-end 3D, realistic lighting, MetaHuman characters, as in Power of Bombs. The browser stays the quietly effective option for anything that has to spread without friction — Nabsh is a web game precisely because a link travels through a group chat faster than a store listing ever will.",
            ar: "Unity يحمل معظم ما نُطلقه لقطر — قاعدة كود واحدة إلى iOS وAndroid، وأدوات قوية للأعمال ثنائية الأبعاد والعادية، والمحرّك الذي تعمل عليه كوت. وUnreal Engine 5 هو الجواب حين تكون الدقة هي المنتج لا التغليف: رسوميات ثلاثية الأبعاد عالية الجودة، وإضاءة واقعية، وشخصيات MetaHuman، كما في Power of Bombs. ويبقى المتصفح الخيار الفعّال بهدوء لكل ما يجب أن ينتشر بلا احتكاك — نبش لعبة ويب تحديدًا لأن الرابط يسافر عبر مجموعة محادثة أسرع مما تفعل قائمة متجر أبدًا.",
          },
        ],
      },
      {
        heading: {
          en: "What actually drives the cost",
          ar: "ما الذي يحدّد التكلفة فعلًا",
        },
        body: [
          {
            en: "No price goes on this page, because a studio quoting one has not seen your brief. The levers are nameable, though. Scope first — distinct modes, screens and rules, not the length of the wish list. Art second, where estimates diverge most sharply: stylised and photoreal can differ by a multiple for identical gameplay. Multiplayer third, and given how competitive this market is, it is usually in scope — which means servers, matchmaking and reconnection belong in the budget from the start rather than arriving as a surprise in month three.",
            ar: "لا سعر على هذه الصفحة، لأن الاستوديو الذي يضع سعرًا لم يطّلع على موجزك. لكن الروافع قابلة للتسمية. النطاق أولًا — أنماط وشاشات وقواعد متمايزة، لا طول قائمة الأمنيات. والفن ثانيًا، وفيه تتباعد التقديرات أحدّ ما تتباعد: الأسلوب المصمَّم والواقعي الفوتوغرافي قد يفترقان بمضاعفات للعب نفسه. واللعب الجماعي ثالثًا، وبالنظر إلى تنافسية هذا السوق فهو داخل النطاق عادةً — ما يعني أن الخوادم ومطابقة اللاعبين وإعادة الاتصال تنتمي إلى الميزانية من البداية لا أن تصل مفاجأةً في الشهر الثالث.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: {
          en: "Can you build competitive or esports-style games for Qatar?",
          ar: "هل تستطيعون بناء ألعاب تنافسية أو بأسلوب الرياضات الإلكترونية لقطر؟",
        },
        a: {
          en: "Yes. Real-time multiplayer, matchmaking, leaderboards, and ranked progression are core to what we build — Nabsh runs live trivia matches and Arrab runs a full real-time social-deduction game. We design competitive loops that suit Qatar's esports-minded audience.",
          ar: "نعم. اللعب الجماعي الفوري، ومطابقة اللاعبين، ولوحات الصدارة، والتقدّم المصنّف جوهر ما نبنيه — نبش يدير مباريات معلومات مباشرة والعرّاب يدير لعبة استنتاج اجتماعي فورية كاملة. نصمّم حلقات تنافسية تلائم جمهور قطر المهتم بالرياضات الإلكترونية.",
        },
      },
      {
        q: {
          en: "Do you build games in both Arabic and English for Qatar?",
          ar: "هل تبنون ألعابًا بالعربية والإنجليزية لقطر؟",
        },
        a: {
          en: "Yes, and for Qatar we usually recommend it. The audience spans Arabic and English speakers, so we build both experiences natively — correct layout in each direction, native copy, and bilingual store listings — rather than translating one into the other.",
          ar: "نعم، ونوصي بذلك عادةً لقطر. يشمل الجمهور الناطقين بالعربية والإنجليزية، فنبني التجربتين أصليًا — تخطيط صحيح في كل اتجاه، ونص أصلي، وقوائم متاجر ثنائية اللغة — بدلًا من ترجمة إحداهما إلى الأخرى.",
        },
      },
      {
        q: {
          en: "Do you have an office in Qatar?",
          ar: "هل لديكم مكتب في قطر؟",
        },
        a: {
          en: "No local office — we are a remote-first GCC games studio and we serve Qatari clients remotely. We share Qatar's time zone, working week, and the Arabic language, so collaboration is smooth, with regular builds, clear milestones, and direct communication.",
          ar: "لا مكتب محلي — نحن استوديو ألعاب خليجي يعمل عن بُعد أولًا، ونخدم العملاء القطريين عن بُعد. نشارك قطر المنطقة الزمنية وأسبوع العمل واللغة العربية، فالتعاون سلس، بنسخ منتظمة ومراحل واضحة وتواصل مباشر.",
        },
      },
      {
        q: {
          en: "How do we get started?",
          ar: "كيف نبدأ؟",
        },
        a: {
          en: "Reach us on WhatsApp or via the contact page with your concept, target platform, and timeline. We will scope the project, recommend an engine and approach, and come back with a clear plan and milestones.",
          ar: "تواصل معنا على واتساب أو عبر صفحة التواصل بفكرتك ومنصتك المستهدفة وجدولك. سنحدّد نطاق المشروع، ونوصي بمحرّك ومنهج، ونعود إليك بخطة ومراحل واضحة.",
        },
      },
    ],
  },
  "game-development-bahrain": {
    slug: "game-development-bahrain",
    updatedAt: "2026-08-05",
    countryCode: "BH",
    metaTitle: {
      en: "Game Development Company for Bahrain | Mobile-First",
      ar: "شركة تطوير ألعاب إلكترونية للبحرين",
    },
    metaDescription: {
      en: "Game development company for Bahrain. Arabic-first, mobile-first Unity and web games for Bahrain's young, connected audience — built and shipped remotely.",
      ar: "شركة تطوير ألعاب إلكترونية للبحرين. ألعاب عربية أولًا للجوال على Unity والويب لجمهور البحرين الشاب المتصل، مع أقلمة المتاجر والدفع.",
    },
    title: {
      en: "Game Development for Bahrain",
      ar: "تطوير ألعاب للبحرين",
    },
    countryName: { en: "Bahrain", ar: "البحرين" },
    intro: {
      en: "Bahrain punches above its size in the Gulf's gaming scene — a young, highly connected population, a fast-growing esports community, and a government that has actively backed digital entertainment. Buried Games Studio is an independent, remote-first GCC games studio, and we work with clients across Bahrain to design and build Arabic-first, mobile-first games for Bahraini and wider Gulf players. We bring real GCC understanding and a process built for small, sharp teams that ship.",
      ar: "تتفوق البحرين على حجمها في مشهد الألعاب الخليجي — سكان شباب شديدو الاتصال، ومجتمع رياضات إلكترونية سريع النمو، وحكومة دعمت الترفيه الرقمي بنشاط. استوديو بريد جيمز استوديو ألعاب خليجي مستقل يعمل عن بُعد أولًا، ونعمل مع عملاء في كل أنحاء البحرين لتصميم وبناء ألعاب بالعربية أولًا وللجوال أولًا للاعبين البحرينيين والخليجيين الأوسع. نقدّم فهمًا خليجيًا حقيقيًا وعملية مبنية لفرق صغيرة دقيقة تُطلق.",
    },
    sections: [
      {
        heading: {
          en: "A small market with outsized energy",
          ar: "سوق صغير بطاقة كبيرة",
        },
        body: [
          {
            en: "Bahrain is compact, but its gaming community is dense and active. The country has hosted regional esports events — including esports at the 2025 Asian Youth Games — and supported gaming through dedicated initiatives and tech programmes. For a client, the appeal of Bahrain is reach without noise: a tight, engaged audience where a well-made game can find its players quickly. Mobile dominates here, so we focus on titles that load fast, play in short social sessions, and spread through word of mouth.",
            ar: "البحرين صغيرة، لكن مجتمع الألعاب فيها كثيف ونشط. استضافت البلاد فعاليات رياضات إلكترونية إقليمية — منها الرياضات الإلكترونية في دورة الألعاب الآسيوية للشباب 2025 — ودعمت الألعاب عبر مبادرات مخصصة وبرامج تقنية. وبالنسبة لعميل، جاذبية البحرين هي الوصول دون ضجيج: جمهور متماسك ومتفاعل تجد فيه لعبة جيدة الصنع لاعبيها بسرعة. يهيمن الجوال هنا، فنركّز على ألعاب تُحمَّل بسرعة، وتُلعب في جلسات اجتماعية قصيرة، وتنتشر بالكلمة المنطوقة.",
          },
        ],
      },
      {
        heading: {
          en: "Arabic-first, mobile-first",
          ar: "العربية أولًا، الجوال أولًا",
        },
        body: [
          {
            en: "Bahraini players are mobile-first and bilingual, so we design accordingly. Arabic is first-class in everything we ship — correct right-to-left layout, natural Gulf Arabic, and Arabic store listings — alongside English where the audience needs it. Unity is our usual engine for mobile, and we use the web for instant-play titles like Nabsh and Arrab that players can open in a tap and share in the group chat. The goal is a game that feels native to a Bahraini phone, not a port.",
            ar: "اللاعبون البحرينيون يضعون الجوال أولًا وهم ثنائيو اللغة، فنصمّم تبعًا لذلك. العربية درجة أولى في كل ما نُطلقه — تخطيط صحيح من اليمين إلى اليسار، وعربية خليجية طبيعية، وقوائم متاجر بالعربية — إلى جانب الإنجليزية حيث يحتاجها الجمهور. يونيتي محركنا المعتاد للجوال، ونستخدم الويب للألعاب الفورية مثل نبش والعرّاب التي يفتحها اللاعبون بنقرة ويشاركونها في مجموعة المحادثة. الهدف لعبة تبدو أصلية لهاتف بحريني لا نسخة منقولة.",
          },
        ],
      },
      {
        heading: {
          en: "Store, payment, and remote delivery",
          ar: "المتجر والدفع والتسليم عن بُعد",
        },
        body: [
          {
            en: "We localise App Store and Google Play listings, integrate the payment methods Bahraini players use alongside global billing, and price with the local market in mind. And because we are a remote-first GCC studio that shares Bahrain's time zone and working week, delivery is straightforward: clear milestones, playable builds on your own device, a single point of contact, and quick replies over WhatsApp. Distance never becomes a black box.",
            ar: "نُؤقلم قوائم App Store وGoogle Play، ونُدمج طرق الدفع التي يستخدمها اللاعبون البحرينيون إلى جانب الفوترة العالمية، ونُسعّر مع مراعاة السوق المحلي. ولأننا استوديو خليجي يعمل عن بُعد أولًا ويشارك البحرين المنطقة الزمنية وأسبوع العمل، فالتسليم مباشر: مراحل واضحة، ونسخ قابلة للعب على جهازك، ونقطة تواصل واحدة، وردود سريعة عبر واتساب. لا تصبح المسافة صندوقًا أسود أبدًا.",
          },
        ],
      },
      {
        heading: {
          en: "Small market, fast word of mouth",
          ar: "سوق صغير وانتشار سريع",
        },
        body: [
          {
            en: "Bahrain's size is a strategic advantage rather than a limitation, provided a game is built to exploit it. In a small, densely connected market a title does not climb a chart so much as pass through a network — one group of friends to the next, over WhatsApp and in person. That rewards a very particular kind of design: quick to enter with no tutorial wall, playable in short sessions, and social by default so that inviting someone is the natural next action rather than a buried menu item.",
            ar: "حجم البحرين ميزة استراتيجية لا قيدًا، شرط أن تُبنى اللعبة لاستثماره. في سوق صغير شديد الترابط، لا تتسلّق اللعبة قائمةً بقدر ما تمرّ عبر شبكة — من مجموعة أصدقاء إلى التالية، عبر واتساب ووجهًا لوجه. وهذا يكافئ نوعًا محددًا من التصميم: دخول سريع بلا جدار تعليمي، ولعب في جلسات قصيرة، واجتماعية بالأصل بحيث تكون الدعوة هي الخطوة التالية الطبيعية لا عنصر قائمة مدفونًا.",
          },
          {
            en: "It also means a launch is testable in a way it is not in a larger market. You can put a build in front of a real slice of your actual audience, watch what they do with it, and fix the loop before spending anything on reach.",
            ar: "ويعني أيضًا أن الإطلاق قابل للاختبار بما لا يتاح في سوق أكبر. تستطيع وضع نسخة أمام شريحة حقيقية من جمهورك الفعلي، ومراقبة ما يفعلونه بها، وإصلاح حلقة اللعب قبل إنفاق أي شيء على الوصول.",
          },
        ],
      },
      {
        heading: {
          en: "Engines, and why mobile usually wins here",
          ar: "المحركات، ولماذا يفوز الجوال هنا عادةً",
        },
        body: [
          {
            en: "Bahraini projects are mobile-first far more often than not, which puts Unity at the centre of the work — a single codebase reaching both stores, mature 2D tooling, and the engine behind KoutQ8. Unreal Engine 5 remains available where high-fidelity 3D or MetaHuman characters are genuinely the point, as in Power of Bombs, but it is rarely what a mobile-first brief needs. The browser deserves more consideration than it gets: a web build has no install step at all, which in a market that spreads by word of mouth removes the single biggest drop-off between hearing about a game and playing it.",
            ar: "المشاريع البحرينية تضع الجوال أولًا في الغالب الأعم، ما يضع Unity في قلب العمل — قاعدة كود واحدة تصل إلى المتجرين، وأدوات ناضجة للأعمال ثنائية الأبعاد، والمحرّك خلف كوت. ويبقى Unreal Engine 5 متاحًا حيث تكون الرسوميات ثلاثية الأبعاد عالية الدقة أو شخصيات MetaHuman هي المقصد فعلًا، كما في Power of Bombs، لكنه نادرًا ما يكون ما يحتاجه موجز يضع الجوال أولًا. والمتصفح يستحق اعتبارًا أكثر مما ينال: نسخة الويب بلا خطوة تثبيت إطلاقًا، وهو ما يزيل — في سوق ينتشر بالكلمة المنطوقة — أكبر نقطة تسرّب بين سماع الخبر واللعب.",
          },
        ],
      },
      {
        heading: {
          en: "What actually drives the cost",
          ar: "ما الذي يحدّد التكلفة فعلًا",
        },
        body: [
          {
            en: "We will not print a figure, because any studio that prints one is guessing at a brief it has not read. What we can set out is what moves it. Scope is the biggest lever — how many distinct modes, screens and rules, rather than how long the wish list runs. Art is next and spreads estimates furthest: a stylised 2D game and a realistic 3D one can differ by a multiple for the same gameplay. Multiplayer is third and consistently underestimated, because real-time play brings servers, matchmaking and reconnection with it. And ahead of all of them sits how settled the design is before the build begins, which is why a prototype is usually the cheapest thing we will ever build for you.",
            ar: "لن نطبع رقمًا، لأن أي استوديو يطبع رقمًا إنما يخمّن موجزًا لم يقرأه. ما نستطيع عرضه هو ما يحرّكه. النطاق أكبر الروافع — كم نمط وشاشة وقاعدة متمايزة، لا كم تطول قائمة الأمنيات. ثم الفن، وهو أوسع ما يباعد التقديرات: لعبة ثنائية الأبعاد بأسلوب مصمّم وأخرى ثلاثية الأبعاد واقعية قد تفترقان بمضاعفات للعب نفسه. واللعب الجماعي ثالثًا ويُستهان به باطراد، لأن اللعب الفوري يجلب معه الخوادم ومطابقة اللاعبين وإعادة الاتصال. وقبلها جميعًا يقف مدى استقرار التصميم قبل بدء البناء، ولهذا يكون النموذج الأولي عادةً أرخص ما نبنيه لك.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: {
          en: "Do you build mobile games for the Bahrain market?",
          ar: "هل تبنون ألعاب جوال لسوق البحرين؟",
        },
        a: {
          en: "Yes. Bahrain is mobile-first, so we focus on Unity mobile games and instant-play web titles that load fast and play in short social sessions. We build Arabic-first, with bilingual Arabic and English support as standard.",
          ar: "نعم. البحرين تضع الجوال أولًا، فنركّز على ألعاب يونيتي للجوال وألعاب الويب الفورية التي تُحمَّل بسرعة وتُلعب في جلسات اجتماعية قصيرة. نبني بالعربية أولًا، بدعم ثنائي للعربية والإنجليزية كأمر قياسي.",
        },
      },
      {
        q: {
          en: "Do you have an office in Bahrain?",
          ar: "هل لديكم مكتب في البحرين؟",
        },
        a: {
          en: "No local office — we are a remote-first GCC games studio and we serve Bahraini clients remotely. We share Bahrain's time zone, working week, and the Arabic language, so collaboration is smooth, with regular builds, clear milestones, and direct communication.",
          ar: "لا مكتب محلي — نحن استوديو ألعاب خليجي يعمل عن بُعد أولًا، ونخدم العملاء البحرينيين عن بُعد. نشارك البحرين المنطقة الزمنية وأسبوع العمل واللغة العربية، فالتعاون سلس، بنسخ منتظمة ومراحل واضحة وتواصل مباشر.",
        },
      },
      {
        q: {
          en: "How do we start a project?",
          ar: "كيف نبدأ مشروعًا؟",
        },
        a: {
          en: "Message us on WhatsApp or through the contact page with your idea, target platform, and timeline. We will scope it with you, recommend an engine and approach, and propose a plan with clear milestones.",
          ar: "راسلنا على واتساب أو عبر صفحة التواصل بفكرتك ومنصتك المستهدفة وجدولك. سنحدّد النطاق معك، ونوصي بمحرّك ومنهج، ونقترح خطة بمراحل واضحة.",
        },
      },
    ],
  },
  "game-development-oman": {
    slug: "game-development-oman",
    updatedAt: "2026-08-05",
    countryCode: "OM",
    metaTitle: {
      en: "Game Development Company for Oman | Mobile-First",
      ar: "شركة تطوير ألعاب إلكترونية لعُمان",
    },
    metaDescription: {
      en: "Game development company for Oman. Arabic-first, mobile-first Unity and web games for Oman's growing young audience — built and shipped remotely.",
      ar: "شركة تطوير ألعاب إلكترونية لعُمان. ألعاب عربية أولًا للجوال على Unity والويب لجمهور عُمان الشاب المتنامي، مع أقلمة المتاجر والدفع.",
    },
    title: {
      en: "Game Development for Oman",
      ar: "تطوير ألعاب لعُمان",
    },
    countryName: { en: "Oman", ar: "عُمان" },
    intro: {
      en: "Oman's gaming market is growing steadily, carried by a young population, expanding internet infrastructure, and rising mobile adoption. Buried Games Studio is an independent, remote-first GCC games studio, and we work with clients across Oman to design and build Arabic-first, mobile-first games for Omani and wider Gulf players. We bring genuine GCC understanding and a pragmatic process: pick the right scope and engine for the goal, prototype quickly, and ship something real.",
      ar: "ينمو سوق الألعاب في عُمان باطّراد، مدفوعًا بسكان شباب، وبنية تحتية للإنترنت تتوسع، واعتماد متزايد على الجوال. استوديو بريد جيمز استوديو ألعاب خليجي مستقل يعمل عن بُعد أولًا، ونعمل مع عملاء في كل أنحاء عُمان لتصميم وبناء ألعاب بالعربية أولًا وللجوال أولًا للاعبين العُمانيين والخليجيين الأوسع. نقدّم فهمًا خليجيًا حقيقيًا وعملية عملية: اختيار النطاق والمحرّك المناسبين للهدف، وبناء النماذج بسرعة، وإطلاق شيء حقيقي.",
    },
    sections: [
      {
        heading: {
          en: "A growing, mobile-first audience",
          ar: "جمهور متنامٍ يضع الجوال أولًا",
        },
        body: [
          {
            en: "Oman's gaming sector is expanding as affordability and access improve and a young, connected generation comes online. The audience here is overwhelmingly mobile, so we design for the phone first: games that download fast, run well on mid-range devices, and play in short sessions. For a client entering this market, the opportunity is a growing audience that is not yet saturated with local-feeling games — which is exactly the gap an Arabic-first studio can fill.",
            ar: "يتوسع قطاع الألعاب في عُمان مع تحسّن القدرة على تحمّل التكلفة والوصول ودخول جيل شاب متصل إلى الإنترنت. الجمهور هنا جوال بأغلبية ساحقة، فنصمّم للهاتف أولًا: ألعاب تُحمَّل بسرعة، وتعمل جيدًا على الأجهزة متوسطة الفئة، وتُلعب في جلسات قصيرة. وبالنسبة لعميل يدخل هذا السوق، الفرصة جمهور متنامٍ لم يُشبَع بعد بألعاب تبدو محلية — وهذه بالضبط الفجوة التي يستطيع استوديو يعمل بالعربية أولًا ملأها.",
          },
        ],
      },
      {
        heading: {
          en: "Arabic-first, made to feel local",
          ar: "العربية أولًا، مصنوعة لتبدو محلية",
        },
        body: [
          {
            en: "Most games reach Omani players as Western titles with a translation layered on top, and players notice. We design Arabic-first: correct right-to-left layout, typography that respects Arabic letterforms, and natural Gulf Arabic rather than machine translation, with English alongside where it helps. This is the same discipline behind our own bilingual titles like KoutQ8 and Nabsh, where the Arabic experience is built in parallel with the English one rather than patched in at the end.",
            ar: "تصل معظم الألعاب إلى اللاعبين العُمانيين كأعمال غربية بترجمة مُضافة فوقها، ويلاحظ اللاعبون. نصمّم بالعربية أولًا: تخطيط صحيح من اليمين إلى اليسار، وطباعة تحترم أشكال الحروف العربية، وعربية خليجية طبيعية لا ترجمة آلية، مع الإنجليزية حيث تفيد. هذه هي الحرفة نفسها خلف ألعابنا ثنائية اللغة مثل كوت ونبش، حيث تُبنى التجربة العربية بالتوازي مع الإنجليزية لا تُرقَّع في النهاية.",
          },
        ],
      },
      {
        heading: {
          en: "Store, payment, and remote delivery",
          ar: "المتجر والدفع والتسليم عن بُعد",
        },
        body: [
          {
            en: "We localise App Store and Google Play listings in Arabic and English, integrate the payment methods Omani players use alongside global app-store billing, and price with local purchasing power in mind. As a remote-first GCC studio that shares Oman's working week and time zone, we deliver on clear milestones with playable builds you can test on your own device, a single point of contact, and quick communication over WhatsApp — so working remotely never feels remote.",
            ar: "نُؤقلم قوائم App Store وGoogle Play بالعربية والإنجليزية، ونُدمج طرق الدفع التي يستخدمها اللاعبون العُمانيون إلى جانب فوترة المتاجر العالمية، ونُسعّر مع مراعاة القوة الشرائية المحلية. وبوصفنا استوديو خليجيًا يعمل عن بُعد أولًا ويشارك عُمان أسبوع العمل والمنطقة الزمنية، نُسلّم بمراحل واضحة، وبنسخ قابلة للعب تختبرها على جهازك، وبنقطة تواصل واحدة، وبتواصل سريع عبر واتساب — فلا يبدو العمل عن بُعد بعيدًا أبدًا.",
          },
        ],
      },
      {
        heading: {
          en: "An audience that has not been over-served",
          ar: "جمهور لم يُشبَع بعد",
        },
        body: [
          {
            en: "Oman gets less attention from regional publishers than its neighbours, and that is an opening rather than a drawback. The audience is young and mobile-first, but it has been served mostly by titles built for somewhere else and shipped here without much thought — English-first games with Arabic bolted on, or Gulf games that assume a Kuwaiti or Saudi frame of reference. A game that treats Omani players as a primary audience rather than an overflow market starts from a position very few competitors have bothered to take.",
            ar: "تنال عُمان اهتمامًا أقل من الناشرين الإقليميين مقارنةً بجيرانها، وذلك فرصة لا عيب. الجمهور شاب ويضع الجوال أولًا، لكنه خُدم في معظمه بعناوين بُنيت لمكان آخر وأُرسلت إلى هنا دون تفكير كبير — ألعاب بالإنجليزية أولًا أُلحقت بها العربية، أو ألعاب خليجية تفترض إطارًا مرجعيًا كويتيًا أو سعوديًا. اللعبة التي تعامل اللاعبين العُمانيين كجمهور أساسي لا كسوق فائض تبدأ من موقع لم يكلّف كثير من المنافسين نفسه بأخذه.",
          },
        ],
      },
      {
        heading: {
          en: "Engines, and designing for real devices",
          ar: "المحركات والتصميم لأجهزة حقيقية",
        },
        body: [
          {
            en: "Most Omani work is mobile, and mobile here means designing for the devices people actually carry rather than the flagship in the demo video. Unity is the practical centre of that — one codebase to both stores, and enough control over rendering and asset budgets to keep a game smooth on mid-range hardware, which is the difference between a title people keep and one they uninstall after a week. Unreal Engine 5 is there for genuinely high-fidelity 3D work, as in Power of Bombs. And a browser build, like Nabsh, sidesteps the install decision altogether — which matters most precisely where storage is tight and data is metered.",
            ar: "معظم العمل العُماني للجوال، والجوال هنا يعني التصميم للأجهزة التي يحملها الناس فعلًا لا للجهاز الرائد في فيديو العرض. Unity هو المركز العملي لذلك — قاعدة كود واحدة إلى المتجرين، وتحكّم كافٍ في العرض وميزانيات الأصول لإبقاء اللعبة سلسة على عتاد متوسط، وهو الفرق بين عنوان يحتفظ به الناس وآخر يُحذف بعد أسبوع. وUnreal Engine 5 موجود للأعمال ثلاثية الأبعاد عالية الدقة فعلًا، كما في Power of Bombs. ونسخة المتصفح، مثل نبش، تتجاوز قرار التثبيت كليًا — وهو ما يهم تحديدًا حيث تكون المساحة ضيقة والبيانات محدودة.",
          },
        ],
      },
      {
        heading: {
          en: "What actually drives the cost",
          ar: "ما الذي يحدّد التكلفة فعلًا",
        },
        body: [
          {
            en: "There is no number on this page, and there should not be one on anybody's — a quote written before the brief is read is a guess wearing a suit. The honest version is the list of levers. Scope leads: the count of distinct modes, screens and rules. Art follows and spreads the range widest, since stylised and realistic can differ by a multiple for the same gameplay. Real-time multiplayer is third, bringing servers, matchmaking and reconnection with it. And underneath all three sits how settled the design is when building starts — which is why we so often suggest paying for a prototype first and a full build second.",
            ar: "لا رقم على هذه الصفحة، ولا ينبغي أن يكون على صفحة أحد — التسعير المكتوب قبل قراءة الموجز تخمين يرتدي بدلة. النسخة الصادقة هي قائمة الروافع. النطاق يتصدّر: عدد الأنماط والشاشات والقواعد المتمايزة. ثم الفن، وهو أوسعها مدى، إذ قد يفترق الأسلوب المصمَّم والواقعي بمضاعفات للعب نفسه. واللعب الجماعي الفوري ثالثًا، جالبًا معه الخوادم ومطابقة اللاعبين وإعادة الاتصال. وتحت الثلاثة جميعًا يقف مدى استقرار التصميم عند بدء البناء — ولهذا نقترح كثيرًا الدفع مقابل نموذج أولي أولًا وبناء كامل ثانيًا.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: {
          en: "Do you build games for the Oman market?",
          ar: "هل تبنون ألعابًا لسوق عُمان؟",
        },
        a: {
          en: "Yes. Oman is a growing, mobile-first market, so we focus on Unity mobile games and instant-play web titles, built Arabic-first with bilingual Arabic and English support. We serve clients across Oman and the wider GCC remotely.",
          ar: "نعم. عُمان سوق متنامٍ يضع الجوال أولًا، فنركّز على ألعاب يونيتي للجوال وألعاب الويب الفورية، مبنية بالعربية أولًا بدعم ثنائي للعربية والإنجليزية. نخدم العملاء في عُمان والخليج الأوسع عن بُعد.",
        },
      },
      {
        q: {
          en: "Do you have an office in Oman?",
          ar: "هل لديكم مكتب في عُمان؟",
        },
        a: {
          en: "No local office — we are a remote-first GCC games studio and we serve Omani clients remotely. We share Oman's time zone, working week, and the Arabic language, so collaboration is smooth, with regular builds, clear milestones, and direct communication.",
          ar: "لا مكتب محلي — نحن استوديو ألعاب خليجي يعمل عن بُعد أولًا، ونخدم العملاء العُمانيين عن بُعد. نشارك عُمان المنطقة الزمنية وأسبوع العمل واللغة العربية، فالتعاون سلس، بنسخ منتظمة ومراحل واضحة وتواصل مباشر.",
        },
      },
      {
        q: {
          en: "How do we get started?",
          ar: "كيف نبدأ؟",
        },
        a: {
          en: "Reach us on WhatsApp or via the contact page with your concept, target platform, and timeline. We will scope the project, recommend an engine and approach, and come back with a clear plan and milestones.",
          ar: "تواصل معنا على واتساب أو عبر صفحة التواصل بفكرتك ومنصتك المستهدفة وجدولك. سنحدّد نطاق المشروع، ونوصي بمحرّك ومنهج، ونعود إليك بخطة ومراحل واضحة.",
        },
      },
    ],
  },
} satisfies Record<string, GccLanding>;

/** Canonical slug union — the single source of truth for which markets exist. */
export type GccLandingSlug = keyof typeof gccLandings;

export const gccLandingSlugs = Object.keys(gccLandings) as GccLandingSlug[];

export function getGccLanding(slug: string): GccLanding | undefined {
  return (gccLandings as Record<string, GccLanding>)[slug];
}

// Shared UI strings for the landing component, kept beside the content.
export const gccLandingUi: Record<
  Locale,
  { faqTitle: string; ctaTitle: string; ctaBody: string; whatsappCta: string; servicesCta: string; gamesCta: string; contactCta: string; breadcrumbHome: string }
> = {
  en: {
    faqTitle: "Frequently asked questions",
    ctaTitle: "Build your game with a GCC studio",
    ctaBody: "Tell us about your idea and we will help you scope, plan, and ship it.",
    whatsappCta: "Chat with us on WhatsApp",
    servicesCta: "Explore our game development services",
    gamesCta: "See the games we have built",
    contactCta: "Contact us",
    breadcrumbHome: "Home",
  },
  ar: {
    faqTitle: "الأسئلة الشائعة",
    ctaTitle: "ابنِ لعبتك مع استوديو خليجي",
    ctaBody: "أخبرنا عن فكرتك وسنساعدك على تحديد نطاقها والتخطيط لها وإطلاقها.",
    whatsappCta: "تحدث معنا على واتساب",
    servicesCta: "استكشف خدمات تطوير الألعاب لدينا",
    gamesCta: "شاهد الألعاب التي بنيناها",
    contactCta: "تواصل معنا",
    breadcrumbHome: "الرئيسية",
  },
};
