import type { Locale } from "@/lib/i18n";
import { assets } from "@/lib/assets";

/**
 * Data-driven content for the /how-it-works page — the studio's process as a
 * dedicated, substantive page. It expands the homepage's 5-step process
 * (concept → design → prototype → test → launch) into a real explainer, with the
 * existing how-it-works images, engagement models, communication cadence, and an
 * honest tooling note. The HowTo + BreadcrumbList JSON-LD on the route is built
 * from the same `steps` array so structured data stays in sync per locale.
 *
 * Targets "how game development works" / "كيف تتم صناعة الألعاب". No invented
 * prices or timelines — only honest, qualitative description of how we work.
 */

export type LocalizedText = Record<Locale, string>;

export interface ProcessStep {
  /** Stable English key for JSON-LD step name fallback. */
  key: string;
  number: string;
  image: string;
  imageAlt: LocalizedText;
  title: LocalizedText;
  /** Short summary used for the HowTo step text. */
  summary: LocalizedText;
  whatHappens: LocalizedText;
  whatYouGet: LocalizedText;
  involvement: LocalizedText;
}

export interface EngagementModel {
  title: LocalizedText;
  body: LocalizedText;
  bestFor: LocalizedText;
}

export const howItWorksContent = {
  metaTitle: {
    en: "How Game Development Works | Our Process | Buried Games Studio",
    ar: "كيف تتم صناعة الألعاب | منهجيتنا | استوديو بريد جيمز",
  } satisfies LocalizedText,
  metaDescription: {
    en: "How game development works at Buried Games Studio: our 5-step process from concept to launch, engagement models, communication cadence, and the tools we use — for clients across Kuwait and the GCC.",
    ar: "كيف تتم صناعة الألعاب في استوديو بريد جيمز: منهجيتنا في خمس خطوات من الفكرة إلى الإطلاق، ونماذج التعاون، ووتيرة التواصل، والأدوات التي نستخدمها — لعملاء في الكويت والخليج.",
  } satisfies LocalizedText,

  hero: {
    eyebrow: { en: "Our Process", ar: "منهجيتنا" } satisfies LocalizedText,
    title: {
      en: "How Game Development Works",
      ar: "كيف تتم صناعة الألعاب",
    } satisfies LocalizedText,
    subtitle: {
      en: "A clear, honest walkthrough of how we take a game from a one-line idea to a live release — what happens at each stage, what you walk away with, and how involved you need to be.",
      ar: "شرح واضح وصادق لكيفية أخذنا اللعبة من فكرة بسطر واحد إلى إصدار حي — ماذا يحدث في كل مرحلة، وما الذي تخرج به، وكم يلزم أن تكون منخرطًا.",
    } satisfies LocalizedText,
  },

  intro: {
    en: [
      "Every game we build follows the same backbone: concept, design, prototype, test, and launch. The details change with the project, but the shape does not — because a repeatable process is what turns a good idea into a shipped game instead of an unfinished prototype.",
      "Below is exactly how each stage works at Buried Games Studio: what we do, what you receive at the end of it, and how much of your time it asks for. We keep it transparent on purpose, so you always know where your project is and what comes next.",
    ],
    ar: [
      "كل لعبة نبنيها تتبع العمود الفقري نفسه: الفكرة، والتصميم، والنموذج الأولي، والاختبار، والإطلاق. تتغير التفاصيل حسب المشروع، لكن الشكل لا يتغير — لأن المنهجية القابلة للتكرار هي ما يحوّل الفكرة الجيدة إلى لعبة مُطلقة بدلًا من نموذج غير مكتمل.",
      "في ما يلي كيف تعمل كل مرحلة بالضبط في استوديو بريد جيمز: ماذا نفعل، وما الذي تتسلمه في نهايتها، وكم تتطلب من وقتك. نبقيها شفافة عمدًا، لتعرف دائمًا أين وصل مشروعك وما الخطوة التالية.",
    ],
  },

  stepsHeading: { en: "The 5 steps, in detail", ar: "الخطوات الخمس بالتفصيل" } satisfies LocalizedText,
  whatHappensLabel: { en: "What happens", ar: "ماذا يحدث" } satisfies LocalizedText,
  whatYouGetLabel: { en: "What you get", ar: "ما الذي تحصل عليه" } satisfies LocalizedText,
  involvementLabel: { en: "Your involvement", ar: "مدى انخراطك" } satisfies LocalizedText,

  steps: [
    {
      key: "concept",
      number: "01",
      image: assets.howitWorksConcept,
      imageAlt: { en: "Concept and discovery stage of game development", ar: "مرحلة الفكرة والاكتشاف في تطوير الألعاب" },
      title: { en: "Concept", ar: "الفكرة" },
      summary: {
        en: "We turn your idea into a clear, agreed game brief and scope.",
        ar: "نحوّل فكرتك إلى ملخص لعبة واضح ونطاق متفق عليه.",
      },
      whatHappens: {
        en: "We start with a discovery conversation about your idea, audience, platforms, and goals. We pin down the core fantasy of the game, the must-have features, and what success looks like, then translate that into a written game brief and a realistic scope.",
        ar: "نبدأ بمحادثة اكتشاف حول فكرتك وجمهورك ومنصاتك وأهدافك. نحدد جوهر اللعبة وميزاتها الأساسية وكيف يبدو النجاح، ثم نترجم ذلك إلى ملخص لعبة مكتوب ونطاق واقعي.",
      },
      whatYouGet: {
        en: "A written game brief, a defined feature scope, target platforms, and a roadmap you can review before any production begins.",
        ar: "ملخص لعبة مكتوب، ونطاق ميزات محدد، ومنصات مستهدفة، وخارطة طريق يمكنك مراجعتها قبل بدء أي إنتاج.",
      },
      involvement: {
        en: "High. This stage needs your vision and quick answers — it is where your input shapes everything that follows.",
        ar: "عالٍ. تحتاج هذه المرحلة إلى رؤيتك وإجابات سريعة — فهنا يشكّل مدخلك كل ما يليه.",
      },
    },
    {
      key: "design",
      number: "02",
      image: assets.howitWorksDesigning,
      imageAlt: { en: "Game design stage with mechanics and systems", ar: "مرحلة تصميم اللعبة بالآليات والأنظمة" },
      title: { en: "Design", ar: "التصميم" },
      summary: {
        en: "We design the core loop, mechanics, art direction, and UX.",
        ar: "نصمم الحلقة الأساسية والآليات والتوجيه الفني وتجربة المستخدم.",
      },
      whatHappens: {
        en: "We design the core gameplay loop, the systems and mechanics, the progression, and the art direction. For Arabic-first projects we plan the right-to-left UX from the start rather than retrofitting it. You see designs and references and we iterate together before a line of production code is written.",
        ar: "نصمم حلقة اللعب الأساسية والأنظمة والآليات والتقدم والتوجيه الفني. للمشاريع العربية أولًا نخطط لتجربة من اليمين إلى اليسار منذ البداية لا كإضافة لاحقة. ترى التصاميم والمراجع ونكرّر معًا قبل كتابة سطر إنتاج واحد.",
      },
      whatYouGet: {
        en: "Game design documentation, the art direction, UX flows, and a clear picture of how the finished game will look and play.",
        ar: "توثيق تصميم اللعبة، والتوجيه الفني، وتدفقات تجربة المستخدم، وصورة واضحة لكيف ستبدو اللعبة المكتملة وكيف تُلعب.",
      },
      involvement: {
        en: "Medium-high. You review and approve designs at milestones; we handle the craft in between.",
        ar: "متوسط إلى عالٍ. تراجع التصاميم وتعتمدها عند المحطات؛ ونتولى نحن الحرفة بينها.",
      },
    },
    {
      key: "prototype",
      number: "03",
      image: assets.howitWorksPrototyping,
      imageAlt: { en: "Playable prototype stage of the game", ar: "مرحلة النموذج الأولي القابل للعب" },
      title: { en: "Prototype", ar: "النموذج الأولي" },
      summary: {
        en: "We build a playable prototype to prove the fun is real.",
        ar: "نبني نموذجًا أوليًا قابلًا للعب لإثبات أن المتعة حقيقية.",
      },
      whatHappens: {
        en: "We build a playable prototype of the core loop — often rough on the surface but real underneath. This is where we prove the game is actually fun before committing budget to full production. If something is not working, this is the cheapest possible place to change it.",
        ar: "نبني نموذجًا أوليًا قابلًا للعب للحلقة الأساسية — خشنًا في الظاهر غالبًا لكنه حقيقي في جوهره. هنا نثبت أن اللعبة ممتعة فعلًا قبل الالتزام بميزانية الإنتاج الكامل. وإن كان شيء لا يعمل، فهذا أرخص مكان ممكن لتغييره.",
      },
      whatYouGet: {
        en: "A hands-on, playable build of the core gameplay that you can try yourself — and an honest read on what to keep, cut, or change.",
        ar: "نسخة قابلة للعب من اللعب الأساسي يمكنك تجربتها بنفسك — وقراءة صادقة لما يجب إبقاؤه أو حذفه أو تغييره.",
      },
      involvement: {
        en: "Medium. You play the prototype and give gut-feel feedback — your reaction is the most valuable signal here.",
        ar: "متوسط. تلعب النموذج وتعطي انطباعك المباشر — ردة فعلك هي أثمن إشارة هنا.",
      },
    },
    {
      key: "test",
      number: "04",
      image: assets.howitWorksTesting,
      imageAlt: { en: "Testing and quality assurance stage", ar: "مرحلة الاختبار وضمان الجودة" },
      title: { en: "Test", ar: "الاختبار" },
      summary: {
        en: "We build out, balance, and test the game across real devices.",
        ar: "نُكمل البناء ونوازن ونختبر اللعبة عبر أجهزة حقيقية.",
      },
      whatHappens: {
        en: "With the fun proven, we build out the full game in sprints, then balance and test it. We run QA across real target devices, tune difficulty and pacing, fix bugs, and polish the rough edges. For multiplayer titles we load-test the backend so it holds up under real concurrent players.",
        ar: "بعد إثبات المتعة، نبني اللعبة الكاملة في سباقات، ثم نوازنها ونختبرها. نجري ضمان الجودة على أجهزة مستهدفة حقيقية، ونضبط الصعوبة والإيقاع، ونصلح العلل، ونلمّع الحواف الخشنة. وللألعاب الجماعية نختبر تحمّل الواجهة الخلفية لتصمد تحت لاعبين متزامنين حقيقيين.",
      },
      whatYouGet: {
        en: "A balanced, optimized, device-tested build that is ready to submit to stores — with the bugs and rough spots ironed out.",
        ar: "نسخة متوازنة ومحسّنة ومختبَرة على الأجهزة وجاهزة للتقديم إلى المتاجر — مع تذليل العلل والنقاط الخشنة.",
      },
      involvement: {
        en: "Low-medium. You review builds and sign off on the release candidate; we drive the testing.",
        ar: "منخفض إلى متوسط. تراجع النسخ وتعتمد المرشح للإطلاق؛ ونقود نحن الاختبار.",
      },
    },
    {
      key: "launch",
      number: "05",
      image: assets.howitWorksLaunch,
      imageAlt: { en: "Launch and release stage of the game", ar: "مرحلة الإطلاق والإصدار" },
      title: { en: "Launch", ar: "الإطلاق" },
      summary: {
        en: "We ship the game to stores and support it after release.",
        ar: "نطلق اللعبة على المتاجر وندعمها بعد الإصدار.",
      },
      whatHappens: {
        en: "We prepare store listings and assets, submit the game to the App Store, Google Play, Steam, or the web, and support launch day. After release we can keep going with updates, events, analytics, and community support under an agreed live-ops plan.",
        ar: "نجهّز قوائم المتاجر والأصول، ونقدّم اللعبة على App Store أو Google Play أو Steam أو الويب، وندعم يوم الإطلاق. وبعد الإصدار يمكننا الاستمرار بالتحديثات والفعاليات والتحليلات ودعم المجتمع ضمن خطة عمليات حية متفق عليها.",
      },
      whatYouGet: {
        en: "A live game in your players' hands, launch-day support, and an optional ongoing plan to keep improving it.",
        ar: "لعبة حية بين أيدي لاعبيك، ودعم يوم الإطلاق، وخطة مستمرة اختيارية لمواصلة تحسينها.",
      },
      involvement: {
        en: "Medium. You approve the final submission and decide the post-launch plan; we handle the mechanics of shipping.",
        ar: "متوسط. تعتمد التقديم النهائي وتقرّر خطة ما بعد الإطلاق؛ ونتولى نحن آليات الإطلاق.",
      },
    },
  ] satisfies ProcessStep[],

  engagement: {
    heading: { en: "How we engage", ar: "كيف نتعاون" } satisfies LocalizedText,
    intro: {
      en: "We work in one of two ways, depending on whether your project has a defined finish line or needs an ongoing partner.",
      ar: "نعمل بإحدى طريقتين، حسب ما إذا كان لمشروعك خط نهاية محدد أو يحتاج شريكًا مستمرًا.",
    } satisfies LocalizedText,
    bestForLabel: { en: "Best for", ar: "الأنسب لـ" } satisfies LocalizedText,
    models: [
      {
        title: { en: "Fixed scope", ar: "نطاق ثابت" },
        body: {
          en: "We agree on a defined scope and deliverables up front, then build to it. Best when you know what you want and need a predictable plan from concept to launch.",
          ar: "نتفق على نطاق ومخرجات محددة مسبقًا، ثم نبني وفقها. الأنسب حين تعرف ما تريد وتحتاج خطة متوقعة من الفكرة إلى الإطلاق.",
        },
        bestFor: {
          en: "A clearly defined game with a known feature set and a launch target.",
          ar: "لعبة محددة بوضوح بمجموعة ميزات معروفة وهدف إطلاق.",
        },
      },
      {
        title: { en: "Ongoing partnership", ar: "شراكة مستمرة" },
        body: {
          en: "We work as your ongoing game team across sprints, evolving the game with you. Best for live games that need continuous updates, events, and iteration after launch.",
          ar: "نعمل كفريق ألعابك المستمر عبر السباقات، نطوّر اللعبة معك. الأنسب للألعاب الحية التي تحتاج تحديثات وفعاليات وتكرارًا مستمرًا بعد الإطلاق.",
        },
        bestFor: {
          en: "Live-service games and products that keep growing after release.",
          ar: "ألعاب الخدمة الحية والمنتجات التي تستمر في النمو بعد الإصدار.",
        },
      },
    ] satisfies EngagementModel[],
  },

  cadence: {
    heading: { en: "Communication cadence", ar: "وتيرة التواصل" } satisfies LocalizedText,
    body: {
      en: "We work in short sprints with regular playable builds, so you see real progress throughout — not just at the end. Expect a steady rhythm of updates, milestone reviews, and quick decisions during your working day. Because we work across the same timezone as the GCC, you are not waiting overnight for answers.",
      ar: "نعمل في سباقات قصيرة مع نسخ قابلة للعب بانتظام، لترى تقدمًا حقيقيًا طوال الوقت — لا في النهاية فقط. توقّع إيقاعًا ثابتًا من التحديثات ومراجعات المحطات والقرارات السريعة خلال يوم عملك. ولأننا نعمل ضمن المنطقة الزمنية نفسها للخليج، فلن تنتظر ليلة كاملة للإجابات.",
    } satisfies LocalizedText,
  },

  tooling: {
    heading: { en: "The tools we use", ar: "الأدوات التي نستخدمها" } satisfies LocalizedText,
    body: {
      en: "We are honest about our stack: we build in Unity and Unreal Engine for games, and Next.js and NestJS for web titles and multiplayer backends. We pick the engine to fit the game, not the other way around — and we tell you plainly when a tool is the right fit and when it is not. No buzzwords, no over-engineering.",
      ar: "نحن صادقون بشأن أدواتنا: نبني على Unity وUnreal Engine للألعاب، وNext.js وNestJS لألعاب الويب والواجهات الخلفية الجماعية. نختار المحرك ليناسب اللعبة لا العكس — ونخبرك بوضوح متى تكون الأداة مناسبة ومتى لا تكون. بلا مصطلحات رنانة وبلا هندسة زائدة.",
    } satisfies LocalizedText,
  },

  servicesHeading: { en: "Explore our services", ar: "استكشف خدماتنا" } satisfies LocalizedText,
  servicesIntro: {
    en: "Each part of this process maps to a service. Dive deeper into the one that fits your project:",
    ar: "كل جزء من هذه المنهجية يقابل خدمة. تعمّق في الخدمة التي تناسب مشروعك:",
  } satisfies LocalizedText,
  // Descriptive internal anchors targeting "game development" + GCC terms.
  serviceLinks: [
    { href: "/services/game-development", label: { en: "Full-cycle game development", ar: "تطوير ألعاب متكامل" } },
    { href: "/services/mobile-game-development", label: { en: "Mobile game development for iOS & Android", ar: "تطوير ألعاب الجوال لـ iOS وAndroid" } },
    { href: "/services/unity-game-development", label: { en: "Unity game development", ar: "تطوير ألعاب Unity" } },
    { href: "/services/multiplayer-game-development", label: { en: "Multiplayer game development", ar: "تطوير الألعاب الجماعية" } },
  ] satisfies { href: string; label: LocalizedText }[],

  cta: {
    title: { en: "Ready to start your game?", ar: "جاهز لبدء لعبتك؟" } satisfies LocalizedText,
    body: {
      en: "Tell us about your idea and we'll walk you through exactly how we'd take it from concept to launch.",
      ar: "أخبرنا عن فكرتك وسنوضح لك بالضبط كيف سنأخذها من الفكرة إلى الإطلاق.",
    } satisfies LocalizedText,
  },
};
