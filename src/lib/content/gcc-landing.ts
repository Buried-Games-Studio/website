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

export const gccLandings: Record<string, GccLanding> = {
  "game-development-kuwait": {
    slug: "game-development-kuwait",
    countryCode: "KW",
    metaTitle: {
      en: "Game Development for Kuwait | Buried Games Studio",
      ar: "تطوير ألعاب للكويت | استوديو بريد جيمز",
    },
    metaDescription: {
      en: "Game development for Kuwait from Buried Games Studio. Arabic-first Unity & web games rooted in Kuwaiti culture — from KoutQ8, our digital take on the traditional Kuwaiti Kout card game, to Nabsh trivia. We serve clients across Kuwait and the GCC.",
      ar: "تطوير ألعاب للكويت من استوديو بريد جيمز. ألعاب عربية أولًا على يونيتي والويب متجذّرة في الثقافة الكويتية — من كوت، نسختنا الرقمية للعبة الورق الكويتية التقليدية، إلى نبش للمعلومات العامة. نخدم العملاء في الكويت والخليج.",
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
    ],
  },
  "game-development-saudi-arabia": {
    slug: "game-development-saudi-arabia",
    countryCode: "SA",
    metaTitle: {
      en: "Game Development Company for Saudi Arabia | Buried Games Studio",
      ar: "شركة تطوير ألعاب للسعودية | استوديو بريد جيمز",
    },
    metaDescription: {
      en: "Game development for Saudi Arabia from Buried Games Studio, an independent GCC games studio. Arabic-first Unity & Unreal games, store and payment localisation, and remote collaboration across the Gulf for KSA clients.",
      ar: "تطوير ألعاب للسعودية من استوديو بريد جيمز، استوديو ألعاب خليجي مستقل. ألعاب عربية أولًا على يونيتي وأنريل، وأقلمة المتاجر والدفع، وتعاون عن بُعد عبر الخليج لعملاء المملكة.",
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
    ],
    faqs: [
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
    countryCode: "AE",
    metaTitle: {
      en: "Game Development Company for the UAE | Dubai & Abu Dhabi",
      ar: "شركة تطوير ألعاب للإمارات | دبي وأبوظبي",
    },
    metaDescription: {
      en: "Game development for the UAE from Buried Games Studio, an independent GCC games studio. Arabic and English games on Unity & Unreal for Dubai and Abu Dhabi clients, with store and payment localisation and remote Gulf collaboration.",
      ar: "تطوير ألعاب للإمارات من استوديو بريد جيمز، استوديو ألعاب خليجي مستقل. ألعاب بالعربية والإنجليزية على يونيتي وأنريل لعملاء دبي وأبوظبي، مع أقلمة المتاجر والدفع وتعاون خليجي عن بُعد.",
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
    countryCode: "QA",
    metaTitle: {
      en: "Game Development Company for Qatar | Buried Games Studio",
      ar: "شركة تطوير ألعاب لقطر | استوديو بريد جيمز",
    },
    metaDescription: {
      en: "Game development for Qatar from Buried Games Studio, an independent GCC games studio. Arabic and English Unity & Unreal games for Qatar's esports-driven, bilingual audience, with store and payment localisation and remote Gulf collaboration.",
      ar: "تطوير ألعاب لقطر من استوديو بريد جيمز، استوديو ألعاب خليجي مستقل. ألعاب بالعربية والإنجليزية على يونيتي وأنريل لجمهور قطر ثنائي اللغة المدفوع بالرياضات الإلكترونية، مع أقلمة المتاجر والدفع وتعاون خليجي عن بُعد.",
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
    countryCode: "BH",
    metaTitle: {
      en: "Game Development Company for Bahrain | Buried Games Studio",
      ar: "شركة تطوير ألعاب للبحرين | استوديو بريد جيمز",
    },
    metaDescription: {
      en: "Game development for Bahrain from Buried Games Studio, an independent GCC games studio. Arabic-first, mobile-first Unity & web games for Bahrain's young, connected audience, with store and payment localisation and remote Gulf collaboration.",
      ar: "تطوير ألعاب للبحرين من استوديو بريد جيمز، استوديو ألعاب خليجي مستقل. ألعاب عربية أولًا للجوال أولًا على يونيتي والويب لجمهور البحرين الشاب المتصل، مع أقلمة المتاجر والدفع وتعاون خليجي عن بُعد.",
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
    countryCode: "OM",
    metaTitle: {
      en: "Game Development Company for Oman | Buried Games Studio",
      ar: "شركة تطوير ألعاب لعُمان | استوديو بريد جيمز",
    },
    metaDescription: {
      en: "Game development for Oman from Buried Games Studio, an independent GCC games studio. Arabic-first, mobile-first Unity & web games for Oman's growing, young audience, with store and payment localisation and remote Gulf collaboration.",
      ar: "تطوير ألعاب لعُمان من استوديو بريد جيمز، استوديو ألعاب خليجي مستقل. ألعاب عربية أولًا للجوال أولًا على يونيتي والويب لجمهور عُمان الشاب المتنامي، مع أقلمة المتاجر والدفع وتعاون خليجي عن بُعد.",
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
};

export const gccLandingSlugs = Object.keys(gccLandings);

export function getGccLanding(slug: string): GccLanding | undefined {
  return gccLandings[slug];
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
