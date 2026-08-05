import type { Locale } from "@/lib/i18n";

/**
 * Buyer's guides — reference pages that help someone choose a studio, including
 * when the answer is not us.
 *
 * Why this exists: the SERPs for "game development companies in Kuwait" are held
 * by listicles written by outsourcing firms about their own market (Juego,
 * Capermint, TekRevol). Those pages rank AND get quoted by AI assistants when
 * someone asks who to hire, which makes them the highest-leverage content format
 * in this category — see the 05.08.2026 keyword research.
 *
 * TWO RULES, both load-bearing:
 *
 * 1. It has to be genuinely useful or it does not work. A guide that exists to
 *    rank us first gets read as marketing and earns nothing. Ours is ordered by
 *    what a buyer needs to know, we are one entry among several, and we say
 *    plainly when another studio is the better fit.
 *
 * 2. Every claim about another company is public information, stated
 *    conservatively, and dated — see `sourcedOn`. We describe what a company
 *    does and where it is based. We do not rank them against each other, invent
 *    team sizes, or characterise their quality. The CLAUDE.md truthfulness rule
 *    applies with more force here, not less, because these are other people's
 *    businesses.
 *
 * On positioning: the guide is framed as companies working FOR the Kuwaiti
 * market, and each entry states where that company is actually established.
 * That is both the honest answer to a buyer's real question ("is this a local
 * studio or a sales office?") and the framing that keeps our own entry inside
 * the service-area rule — we are listed as serving Kuwait, never as based there.
 */

type Localized = { en: string; ar: string };

export type GuideEntry = {
  /** Company name as it presents itself. Not localized — it is a proper noun. */
  name: string;
  /** Where the company is actually established, stated plainly. */
  basedIn: Localized;
  /** What they do, in their own terms, described conservatively. */
  body: Localized;
  /** Set only for our own entry, so the UI can label it rather than hide it. */
  isUs?: boolean;
};

export type GuideSection = {
  heading: Localized;
  body: Localized[];
};

export type Guide = {
  slug: string;
  updatedAt: string;
  metaTitle: Localized;
  metaDescription: Localized;
  title: Localized;
  intro: Localized[];
  /** The date the third-party facts below were gathered, shown on the page. */
  sourcedOn: string;
  criteriaHeading: Localized;
  criteria: Localized[];
  entriesHeading: Localized;
  entries: GuideEntry[];
  sections: GuideSection[];
  faqs: { q: Localized; a: Localized }[];
};

export const guides: Guide[] = [
  {
    slug: "game-development-companies-kuwait",
    updatedAt: "2026-08-05",
    sourcedOn: "2026-08-05",
    metaTitle: {
      en: "Game Development Companies for Kuwait | Buyer's Guide",
      ar: "شركات تطوير الألعاب للسوق الكويتي | دليل المشتري",
    },
    metaDescription: {
      en: "Who actually builds games for the Kuwaiti market — which studios are established in Kuwait, which are outsourcers with a local office, and how to tell.",
      ar: "من يبني الألعاب فعلًا للسوق الكويتي — أي الاستوديوهات قائمة في الكويت، وأيها شركات إسناد بمكتب محلي، وكيف تميّز بينها.",
    },
    title: {
      en: "Game development companies for Kuwait: an honest guide",
      ar: "شركات تطوير الألعاب للسوق الكويتي: دليل صادق",
    },
    intro: [
      {
        en: "If you search for a game studio in Kuwait, most of what you will find is a list written by a company that appears at the top of it. We are a game studio too, and we appear in this list — so read it with that in mind. What we have tried to do is write the guide we wanted when we started, rather than an advert with other names in it.",
        ar: "إن بحثت عن استوديو ألعاب في الكويت، فمعظم ما ستجده قائمة كتبتها شركة تتصدّرها. نحن أيضًا استوديو ألعاب، ونظهر في هذه القائمة — فاقرأها واضعًا ذلك في الحسبان. ما حاولناه هو كتابة الدليل الذي تمنّيناه حين بدأنا، لا إعلانًا تتخلله أسماء أخرى.",
      },
      {
        en: "The single most useful thing to know is one the other lists tend to blur: some of these companies are established in Kuwait, and some are large international outsourcers with a Kuwait City address on a services page. Neither is wrong, and the outsourcers are often genuinely good. But they answer different briefs, they price differently, and confusing the two is the most common mistake we see buyers make. So every entry below says plainly where the company is actually based.",
        ar: "أنفع ما ينبغي معرفته هو ما تميل القوائم الأخرى إلى تمييعه: بعض هذه الشركات قائمة في الكويت، وبعضها شركات إسناد دولية كبيرة بعنوان في مدينة الكويت على صفحة خدمات. لا خطأ في أيٍّ منهما، وشركات الإسناد جيدة فعلًا في الغالب. لكنها تجيب موجزات مختلفة، وتسعّر بطريقة مختلفة، والخلط بينهما أشيع خطأ نراه لدى المشترين. لذا يذكر كل مدخل أدناه بوضوح أين تقوم الشركة فعلًا.",
      },
    ],
    criteriaHeading: {
      en: "How this list was put together",
      ar: "كيف جُمعت هذه القائمة",
    },
    criteria: [
      {
        en: "Every company here is one we could verify from public sources — its own site, an app store listing, or regional business coverage. No company paid to appear and there are no affiliate links.",
        ar: "كل شركة هنا تحققنا منها من مصادر عامة — موقعها، أو قائمة في متجر تطبيقات، أو تغطية أعمال إقليمية. لم تدفع أي شركة مقابل الظهور، ولا توجد روابط إحالة.",
      },
      {
        en: "The list is not ranked. It is grouped by what kind of company each one is, because that is the distinction that actually changes your decision.",
        ar: "القائمة غير مرتّبة تفاضليًا. إنها مجمّعة بحسب نوع كل شركة، لأن ذلك هو الفارق الذي يغيّر قرارك فعلًا.",
      },
      {
        en: "We describe what each company does and where it is based. We do not rate their quality, quote their prices, or estimate their team sizes — we are a competitor, and those judgements are not ours to publish.",
        ar: "نصف ما تفعله كل شركة وأين تقوم. لا نقيّم جودتها ولا نذكر أسعارها ولا نقدّر أحجام فرقها — نحن منافس، وتلك أحكام ليس لنا أن ننشرها.",
      },
    ],
    entriesHeading: {
      en: "The companies",
      ar: "الشركات",
    },
    entries: [
      {
        name: "Duwaween Games",
        basedIn: { en: "Kuwait", ar: "الكويت" },
        body: {
          en: "A Kuwaiti mobile games company built around traditional Gulf card games — Kout, Balot, Hand and Trix in a single app. It launched in 2019 out of Kuwait Net, originally as Koot Posta, and a majority stake was later acquired by the Kuwaiti youth platform VO. If your project is a traditional card or social game for a Kuwaiti audience, they are the most direct precedent in the market.",
          ar: "شركة ألعاب جوال كويتية مبنية حول ألعاب الورق الخليجية التقليدية — الكوت والبلوت والهند والطرنيب في تطبيق واحد. أُطلقت عام 2019 من كويت نت، باسم كوت بوسته في البداية، ثم استحوذت منصة الشباب الكويتية VO على حصة أغلبية فيها. إن كان مشروعك لعبة ورق أو لعبة اجتماعية تقليدية لجمهور كويتي، فهي أقرب سابقة في السوق.",
        },
      },
      {
        name: "Sooqista Studios",
        basedIn: { en: "Kuwait", ar: "الكويت" },
        body: {
          en: "A Kuwait-based studio founded in 2019, focused on hyper-casual and idle arcade mobile games. That is a genuinely distinct discipline — hyper-casual lives or dies on retention metrics and rapid iteration rather than depth — so they are a natural fit for a brief in that space and a poor one for a large narrative or multiplayer title.",
          ar: "استوديو قائم في الكويت تأسس عام 2019، يركّز على ألعاب الجوال العادية جدًا وألعاب الأركيد الخاملة. وذلك انضباط متمايز فعلًا — إذ تحيا الألعاب العادية جدًا أو تموت على مؤشرات الاحتفاظ والتكرار السريع لا على العمق — فهم مناسبون طبيعيًا لموجز في ذلك المجال، وغير مناسبين لعنوان سردي أو جماعي كبير.",
        },
      },
      {
        name: "Diwaniya Labs",
        basedIn: { en: "Kuwait", ar: "الكويت" },
        body: {
          en: "An independent Kuwaiti game company working on multiplayer card and puzzle games. The name tells you the audience it is designing for, and like Duwaween it sits squarely in the social-games tradition that dominates play in Kuwait.",
          ar: "شركة ألعاب كويتية مستقلة تعمل على ألعاب ورق وألغاز جماعية. الاسم وحده يخبرك بالجمهور الذي تصمّم له، وهي مثل الدواوين تقع في صميم تقليد الألعاب الاجتماعية الذي يهيمن على اللعب في الكويت.",
        },
      },
      {
        name: "Vertex Game Design Studio",
        basedIn: { en: "Kuwait", ar: "الكويت" },
        body: {
          en: "A Kuwaiti studio offering game design and development across phones, tablets, desktop and kiosk systems. The kiosk work is worth noting — it is the same discipline behind mall and exhibition installations, which is a common brief here and one many game studios do not take.",
          ar: "استوديو كويتي يقدّم تصميم وتطوير الألعاب عبر الهواتف والأجهزة اللوحية والحواسيب وأنظمة الأكشاك. وعمل الأكشاك جدير بالملاحظة — فهو الانضباط نفسه خلف تركيبات المولات والمعارض، وهو موجز شائع هنا ولا تقبله كثير من استوديوهات الألعاب.",
        },
      },
      {
        name: "Buried Games Studio",
        isUs: true,
        basedIn: {
          en: "Remote-first, serving Kuwait and the GCC",
          ar: "عن بُعد أولًا، نخدم الكويت والخليج",
        },
        body: {
          en: "That is us, so treat this entry as the least objective on the page. We are a remote-first studio serving clients across Kuwait and the Gulf, and our own titles are Arabic-first — KoutQ8 is a digital version of Kout, Nabsh is browser trivia, Arrab is a social deduction game in development. We build in Unity, Unreal Engine 5 and the browser, and the thing we would actually claim as a differentiator is that Arabic and right-to-left are how our games are built rather than a service we added. If your project is hyper-casual, or you need a team physically in a Kuwait office, one of the others above is a better call.",
          ar: "هذه نحن، فعامل هذا المدخل بوصفه الأقل موضوعية في الصفحة. نحن استوديو يعمل عن بُعد أولًا ويخدم عملاء في الكويت والخليج، وعناويننا الخاصة بالعربية أولًا — كوت نسخة رقمية من الكوت، ونبش تريفيا في المتصفح، وعراب لعبة خداع اجتماعي قيد التطوير. نبني بـ Unity وUnreal Engine 5 والمتصفح، وما نزعمه فارقًا فعليًا هو أن العربية والاتجاه من اليمين إلى اليسار هما طريقة بناء ألعابنا لا خدمة أضفناها. وإن كان مشروعك من الألعاب العادية جدًا، أو تحتاج فريقًا حاضرًا في مكتب بالكويت، فأحد الاستوديوهات أعلاه خيار أفضل.",
        },
      },
      {
        name: "Juego Studios",
        basedIn: {
          en: "India, with a Kuwait City office",
          ar: "الهند، مع مكتب في مدينة الكويت",
        },
        body: {
          en: "A large international outsourcing studio, founded in 2011 and ISO 9001:2015 certified, with a Kuwait City address and a services page for the market. They cover an unusually broad range — console, PC, mobile, VR, art, LiveOps — and they are the most visible result for almost every game-development search in this region. If you need scale and breadth from a single vendor, that breadth is real. If you want a team in your time zone that grew up on the same games as your players, it is a different proposition.",
          ar: "استوديو إسناد دولي كبير، تأسس عام 2011 وحاصل على شهادة ISO 9001:2015، وله عنوان في مدينة الكويت وصفحة خدمات للسوق. يغطي نطاقًا واسعًا بشكل لافت — كونسول وحاسوب وجوال وواقع افتراضي وفن وعمليات حية — وهو النتيجة الأبرز في كل بحث تقريبًا عن تطوير الألعاب في هذه المنطقة. إن احتجت حجمًا واتساعًا من مورّد واحد، فذلك الاتساع حقيقي. وإن أردت فريقًا في منطقتك الزمنية نشأ على الألعاب نفسها التي نشأ عليها لاعبوك، فتلك مسألة أخرى.",
        },
      },
    ],
    sections: [
      {
        heading: {
          en: "Local studio or international outsourcer?",
          ar: "استوديو محلي أم شركة إسناد دولية؟",
        },
        body: [
          {
            en: "This is the decision underneath most of the others. An international outsourcer gives you scale, a wide menu of disciplines, and a process that has shipped hundreds of titles. A studio rooted in the region gives you cultural fluency, your own working week, and someone who understands why a card game needs to feel like a diwaniya rather than a card game with Arabic text.",
            ar: "هذا هو القرار الكامن تحت معظم القرارات الأخرى. شركة الإسناد الدولية تمنحك الحجم، وقائمة واسعة من التخصصات، وعملية أطلقت مئات العناوين. والاستوديو المتجذر في المنطقة يمنحك الطلاقة الثقافية، وأسبوع عملك نفسه، ومن يفهم لماذا ينبغي أن تبدو لعبة الورق كديوانية لا كلعبة ورق بنص عربي.",
          },
          {
            en: "Neither answer is universally right. A technically demanding 3D project with a large budget and a long runway often belongs with an outsourcer that has the bench for it. A culturally specific title for a Gulf audience usually does not, because the thing that makes it work is the part hardest to brief in a document.",
            ar: "لا جواب صحيح على الإطلاق. المشروع ثلاثي الأبعاد المتطلّب تقنيًا بميزانية كبيرة ومدى زمني طويل ينتمي غالبًا إلى شركة إسناد لديها الطاقم لذلك. والعنوان المتجذر ثقافيًا لجمهور خليجي غالبًا لا ينتمي إليها، لأن ما يجعله ينجح هو أصعب ما يمكن وصفه في مستند.",
          },
        ],
      },
      {
        heading: {
          en: "Questions worth asking any of them",
          ar: "أسئلة تستحق أن تُطرح على أيٍّ منهم",
        },
        body: [
          {
            en: "Ask who is actually building it. Large studios sell with senior people and staff with whoever is free; small studios sometimes over-commit. Either way, the useful question is which named people are on your project and for what share of their week.",
            ar: "اسأل من سيبنيها فعلًا. الاستوديوهات الكبيرة تبيع بكبار موظفيها وتُنفّذ بمن هو متاح؛ والصغيرة تفرط أحيانًا في الالتزام. وفي الحالتين، السؤال المفيد هو أي أشخاص محدّدين بالاسم على مشروعك، وبأي نسبة من أسبوعهم.",
          },
          {
            en: "Ask to play something. Not a trailer or a deck — a build, on your own phone. A studio that cannot put a playable in your hands early is telling you something about how it works, and every milestone on your project will have the same shape.",
            ar: "اطلب أن تلعب شيئًا. لا مقطعًا دعائيًا ولا عرضًا تقديميًا — بل نسخة، على هاتفك أنت. والاستوديو الذي لا يستطيع وضع نسخة قابلة للعب في يدك مبكرًا يخبرك بشيء عن طريقة عمله، وكل محطة في مشروعك ستأخذ الشكل نفسه.",
          },
          {
            en: "Ask what happens to the Arabic. Specifically: is right-to-left handled in the layout or applied at the end? The answer separates studios that have shipped Arabic games from studios that have translated them.",
            ar: "اسأل ماذا يحدث للعربية. تحديدًا: هل يُعالَج الاتجاه من اليمين إلى اليسار في التخطيط أم يُطبَّق في النهاية؟ الجواب يفصل بين استوديوهات أطلقت ألعابًا عربية واستوديوهات ترجمتها.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: {
          en: "Is this list ranked?",
          ar: "هل هذه القائمة مرتّبة تفاضليًا؟",
        },
        a: {
          en: "No. It is grouped by the kind of company each one is, because that distinction changes your decision more than any ordering we could invent. We are a competitor to everyone on this page, so ranking them would not be worth reading.",
          ar: "لا. إنها مجمّعة بحسب نوع كل شركة، لأن ذلك الفارق يغيّر قرارك أكثر من أي ترتيب نخترعه. نحن منافس لكل من في هذه الصفحة، فترتيبهم لن يستحق القراءة.",
        },
      },
      {
        q: {
          en: "Why is Buried Games on a list it wrote?",
          ar: "لماذا تظهر بريد جيمز في قائمة كتبتها بنفسها؟",
        },
        a: {
          en: "Because leaving ourselves off would be its own kind of dishonest — we do this work and you would find us anyway. The entry says it is the least objective on the page and names the briefs where another studio here is the better fit.",
          ar: "لأن استبعاد أنفسنا سيكون نوعًا آخر من عدم الصدق — نحن نمارس هذا العمل وستجدنا على أي حال. والمدخل يذكر أنه الأقل موضوعية في الصفحة ويسمّي الموجزات التي يكون فيها استوديو آخر هنا الخيار الأفضل.",
        },
      },
      {
        q: {
          en: "How current is this?",
          ar: "ما مدى حداثة هذا؟",
        },
        a: {
          en: "The third-party details were gathered from public sources on the date shown at the top of the page. Companies change — if something here is out of date or wrong about your company, tell us and we will correct it.",
          ar: "جُمعت تفاصيل الأطراف الأخرى من مصادر عامة في التاريخ الظاهر أعلى الصفحة. والشركات تتغيّر — إن كان شيء هنا قديمًا أو خاطئًا بشأن شركتك، فأخبرنا وسنصحّحه.",
        },
      },
      {
        q: {
          en: "Do I need a studio in Kuwait to build a game for Kuwait?",
          ar: "هل أحتاج استوديو في الكويت لبناء لعبة للكويت؟",
        },
        a: {
          en: "No, but you need one that understands it. The Gulf shares a time zone and a working week, so remote collaboration across the region is not the compromise it would be with a studio eight hours away. What matters far more than an office address is whether the team can tell you why your audience will or will not play the thing you are describing.",
          ar: "لا، لكنك تحتاج من يفهمها. الخليج يتشارك المنطقة الزمنية وأسبوع العمل، فالتعاون عن بُعد داخل المنطقة ليس التنازل الذي سيكونه مع استوديو يبعد ثماني ساعات. وما يهم أكثر بكثير من عنوان مكتب هو ما إذا كان الفريق يستطيع أن يخبرك لماذا سيلعب جمهورك ما تصفه أو لن يلعبه.",
        },
      },
    ],
  },
  {
    slug: "game-development-companies-saudi-arabia",
    updatedAt: "2026-08-05",
    sourcedOn: "2026-08-05",
    metaTitle: {
      en: "Game Development Companies in Saudi Arabia | Guide",
      ar: "شركات تطوير الألعاب في السعودية | دليل المشتري",
    },
    metaDescription: {
      en: "Who builds games in Saudi Arabia — the Vision 2030-backed studios, the independents, and the outsourcers, with what each is actually built for.",
      ar: "من يبني الألعاب في السعودية — استوديوهات مدعومة برؤية 2030، ومستقلون، وشركات إسناد، مع ما بُني له كل منها فعلًا.",
    },
    title: {
      en: "Game development companies in Saudi Arabia: an honest guide",
      ar: "شركات تطوير الألعاب في السعودية: دليل صادق",
    },
    intro: [
      {
        en: "Saudi Arabia has the most active games industry in the Gulf by a wide margin, and it is the only market in the region where a studio can be state-backed, venture-funded or a two-person team and all three are normal. That makes choosing harder, not easier — the range of companies calling themselves game studios here is genuinely wide.",
        ar: "تملك السعودية أنشط صناعة ألعاب في الخليج بفارق كبير، وهي السوق الوحيد في المنطقة الذي قد يكون فيه الاستوديو مدعومًا من الدولة أو ممولًا استثماريًا أو فريقًا من شخصين، والثلاثة طبيعية. وذلك يجعل الاختيار أصعب لا أسهل — فمدى الشركات التي تسمّي نفسها استوديوهات ألعاب هنا واسع فعلًا.",
      },
      {
        en: "We are a game studio and we appear in this list, so weigh it accordingly. As with our Kuwait guide, every entry says where the company is actually established and what kind of company it is, because those two facts change your decision more than anything else you will read about them.",
        ar: "نحن استوديو ألعاب ونظهر في هذه القائمة، فزن الأمر تبعًا لذلك. وكما في دليل الكويت، يذكر كل مدخل أين تقوم الشركة فعلًا وأي نوع من الشركات هي، لأن هاتين الحقيقتين تغيّران قرارك أكثر من أي شيء آخر ستقرأه عنها.",
      },
    ],
    criteriaHeading: {
      en: "How this list was put together",
      ar: "كيف جُمعت هذه القائمة",
    },
    criteria: [
      {
        en: "Every company was verified from public sources — its own site, store listings, or regional business and industry coverage. Nobody paid to appear and there are no affiliate links.",
        ar: "تحققنا من كل شركة من مصادر عامة — موقعها، أو قوائم المتاجر، أو تغطية الأعمال والصناعة الإقليمية. لم يدفع أحد مقابل الظهور، ولا توجد روابط إحالة.",
      },
      {
        en: "It is not ranked. Grouping by what kind of company each one is tells you more than an order we would have to invent.",
        ar: "غير مرتّبة تفاضليًا. التجميع بحسب نوع كل شركة يخبرك أكثر من ترتيب سيكون علينا اختراعه.",
      },
      {
        en: "We describe what each company does and where it is based. We do not rate quality, quote prices, or estimate team sizes — we compete with these companies, and those are not our judgements to publish.",
        ar: "نصف ما تفعله كل شركة وأين تقوم. لا نقيّم الجودة ولا نذكر الأسعار ولا نقدّر أحجام الفرق — نحن ننافس هذه الشركات، وتلك ليست أحكامنا لننشرها.",
      },
    ],
    entriesHeading: {
      en: "The companies",
      ar: "الشركات",
    },
    entries: [
      {
        name: "Steer Studios",
        basedIn: { en: "Riyadh, Saudi Arabia", ar: "الرياض، السعودية" },
        body: {
          en: "Riyadh's flagship AAA studio, wholly owned by Savvy Games Group and built to compete at a global level. This is a different category from everything else on this page — Steer is a first-party developer building its own titles, not a services company you commission. Worth knowing about because it shapes the hiring market and the talent pool everyone else draws from, but it is not somewhere you send a brief.",
          ar: "استوديو الرياض الرائد في ألعاب AAA، مملوك بالكامل لمجموعة سافي للألعاب ومبني للمنافسة عالميًا. وهذه فئة مختلفة عن كل ما في هذه الصفحة — ستير مطوّر يبني عناوينه الخاصة، لا شركة خدمات تكلّفها. يستحق المعرفة لأنه يشكّل سوق التوظيف ومخزون المواهب الذي يسحب منه الجميع، لكنه ليس جهة ترسل إليها موجزًا.",
        },
      },
      {
        name: "Starvania",
        basedIn: { en: "Riyadh, Saudi Arabia", ar: "الرياض، السعودية" },
        body: {
          en: "An independent Riyadh studio focused on fantasy titles and 2D adventure games, recognised as a leading game startup in the MENA region. Independents like this build their own IP first and take selected client work second, which is worth establishing early in a conversation — the answer determines whether you are hiring a team or partnering with one.",
          ar: "استوديو مستقل في الرياض يركّز على عناوين الفانتازيا وألعاب المغامرات ثنائية الأبعاد، ومعترف به كأحد أبرز الشركات الناشئة في الألعاب بمنطقة الشرق الأوسط وشمال أفريقيا. المستقلون من هذا النوع يبنون ملكيتهم الفكرية أولًا ويأخذون أعمال العملاء المختارة ثانيًا، وهو أمر يستحق توضيحه مبكرًا في أي محادثة — فالجواب يحدد ما إذا كنت توظّف فريقًا أم تشاركه.",
        },
      },
      {
        name: "Shafrah Games Studios",
        basedIn: { en: "Saudi Arabia", ar: "السعودية" },
        body: {
          en: "A Saudi studio building 2D and 3D games across a range of genres. Genre breadth in a studio this size usually means the team is generalist rather than specialised, which suits a project that has not settled on its shape yet and suits a technically narrow brief less well.",
          ar: "استوديو سعودي يبني ألعابًا ثنائية وثلاثية الأبعاد عبر أنواع متعددة. واتساع الأنواع في استوديو بهذا الحجم يعني عادةً أن الفريق عام لا متخصص، وهو ما يناسب مشروعًا لم يستقر شكله بعد ويناسب أقلّ موجزًا ضيقًا تقنيًا.",
        },
      },
      {
        name: "Athr",
        basedIn: { en: "Riyadh, Saudi Arabia", ar: "الرياض، السعودية" },
        body: {
          en: "A Riyadh company offering games alongside programming, design and marketing as integrated services, working in Unity and Unreal. Full-service agencies are a real option when a game is one piece of a larger campaign and you would rather not coordinate three vendors — the trade-off is that games are one of several disciplines rather than the whole business.",
          ar: "شركة في الرياض تقدّم الألعاب إلى جانب البرمجة والتصميم والتسويق كخدمات متكاملة، وتعمل بـ Unity وUnreal. والوكالات الشاملة خيار حقيقي حين تكون اللعبة جزءًا من حملة أكبر ولا ترغب في تنسيق ثلاثة مورّدين — والمقايضة أن الألعاب أحد تخصصات عدة لا العمل كله.",
        },
      },
      {
        name: "Buried Games Studio",
        isUs: true,
        basedIn: {
          en: "Remote-first, serving Saudi Arabia and the GCC",
          ar: "عن بُعد أولًا، نخدم السعودية والخليج",
        },
        body: {
          en: "That is us, so treat this as the least objective entry here. We are a remote-first studio serving clients across the Gulf, sharing the Saudi working week and time zone. Our own titles are Arabic-first — KoutQ8, Nabsh, and Arrab in development — and we build in Unity, Unreal Engine 5 and the browser. What we would actually claim is that Arabic and right-to-left are how our games are built rather than a service bolted on. If you need a AAA-scale team or a full-service marketing agency, others on this page fit better.",
          ar: "هذه نحن، فعامل هذا المدخل بوصفه الأقل موضوعية هنا. نحن استوديو يعمل عن بُعد أولًا ويخدم عملاء في الخليج، ونشارك السعودية أسبوع العمل والمنطقة الزمنية. عناويننا الخاصة بالعربية أولًا — كوت ونبش وعراب قيد التطوير — ونبني بـ Unity وUnreal Engine 5 والمتصفح. وما نزعمه فعلًا أن العربية والاتجاه من اليمين إلى اليسار هما طريقة بناء ألعابنا لا خدمة ملحقة. وإن احتجت فريقًا بحجم AAA أو وكالة تسويق شاملة، فغيرنا في هذه الصفحة أنسب.",
        },
      },
      {
        name: "Juego Studios",
        basedIn: {
          en: "India, with Riyadh and Jeddah service pages",
          ar: "الهند، مع صفحات خدمات للرياض وجدة",
        },
        body: {
          en: "A large international outsourcing studio, founded in 2011 and ISO 9001:2015 certified, marketing to Riyadh and Jeddah. They cover console, PC, mobile, VR, art and LiveOps, and they are the most visible search result for game development across the whole region. Scale and breadth from one vendor is a genuine offer. A team that shares your week and grew up on the games your players did is a different one.",
          ar: "استوديو إسناد دولي كبير، تأسس عام 2011 وحاصل على ISO 9001:2015، ويسوّق للرياض وجدة. يغطي الكونسول والحاسوب والجوال والواقع الافتراضي والفن والعمليات الحية، وهو النتيجة الأبرز في البحث عن تطوير الألعاب في المنطقة كلها. الحجم والاتساع من مورّد واحد عرض حقيقي. والفريق الذي يشاركك أسبوعك ونشأ على الألعاب التي نشأ عليها لاعبوك عرض آخر.",
        },
      },
    ],
    sections: [
      {
        heading: {
          en: "Vision 2030 changed what is available",
          ar: "رؤية 2030 غيّرت المتاح",
        },
        body: [
          {
            en: "Saudi Arabia has invested heavily in games as a sector, and the visible result is a tier of well-capitalised, state-backed studios that did not exist a decade ago. For a buyer, the practical effect is a deeper talent pool and more credible local partners than anywhere else in the Gulf — and also more competition for that talent, which is why timelines from small independents can be longer than you expect.",
            ar: "استثمرت السعودية بقوة في الألعاب كقطاع، والنتيجة الظاهرة طبقة من الاستوديوهات المدعومة والممولة جيدًا لم تكن موجودة قبل عقد. وبالنسبة للمشتري، الأثر العملي هو مخزون مواهب أعمق وشركاء محليون أكثر مصداقية من أي مكان آخر في الخليج — وأيضًا منافسة أشد على تلك المواهب، ولهذا قد تكون الجداول الزمنية لدى المستقلين الصغار أطول مما تتوقع.",
          },
          {
            en: "It also means the word 'studio' covers more ground here than elsewhere. A first-party developer building its own AAA title and a services company taking client briefs are both accurately called game studios, and only one of them can be commissioned. Establish which you are talking to in the first conversation.",
            ar: "ويعني أيضًا أن كلمة «استوديو» تغطي هنا مساحة أوسع من غيرها. المطوّر الذي يبني عنوان AAA خاصًا به وشركة الخدمات التي تأخذ موجزات العملاء كلاهما يُسمّى بدقة استوديو ألعاب، وواحد منهما فقط يمكن تكليفه. حدّد مع أيهما تتحدث في المحادثة الأولى.",
          },
        ],
      },
      {
        heading: {
          en: "Questions worth asking any of them",
          ar: "أسئلة تستحق أن تُطرح على أيٍّ منهم",
        },
        body: [
          {
            en: "Ask whether they take client work at all, and what share of their capacity it is. A studio whose own IP is the priority will always resolve a conflict in favour of its own release date, and you should know that before signing rather than in month four.",
            ar: "اسأل إن كانوا يأخذون أعمال عملاء أصلًا، وأي نسبة من طاقتهم هي. الاستوديو الذي تكون ملكيته الفكرية أولويته سيحسم أي تعارض لصالح تاريخ إصداره هو، ويجدر أن تعرف ذلك قبل التوقيع لا في الشهر الرابع.",
          },
          {
            en: "Ask to play a build on your own device early. Not a trailer, not a deck. A studio that cannot put a playable in your hands in the first weeks is showing you the shape every later milestone will take.",
            ar: "اطلب لعب نسخة على جهازك مبكرًا. لا مقطعًا دعائيًا ولا عرضًا تقديميًا. والاستوديو الذي لا يستطيع وضع نسخة قابلة للعب في يدك في الأسابيع الأولى يريك شكل كل محطة لاحقة.",
          },
          {
            en: "Ask how Arabic is handled — in the layout, or applied at the end? In this market the answer is close to a proxy for how much of the team has actually shipped an Arabic game rather than a translated one.",
            ar: "اسأل كيف تُعالَج العربية — في التخطيط أم تُطبَّق في النهاية؟ في هذا السوق يكاد الجواب يكون مؤشرًا على كم من الفريق أطلق فعلًا لعبة عربية لا لعبة مترجمة.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: {
          en: "Is this list ranked?",
          ar: "هل هذه القائمة مرتّبة تفاضليًا؟",
        },
        a: {
          en: "No. It groups companies by what kind of company they are, which matters more than any order. We compete with everyone on this page, so a ranking from us would not be worth reading.",
          ar: "لا. تجمّع الشركات بحسب نوعها، وهو أهم من أي ترتيب. نحن ننافس كل من في هذه الصفحة، فترتيب منا لن يستحق القراءة.",
        },
      },
      {
        q: {
          en: "Can a studio outside Saudi Arabia build for the Saudi market?",
          ar: "هل يستطيع استوديو خارج السعودية البناء للسوق السعودي؟",
        },
        a: {
          en: "Yes, and across the Gulf it is routine — the shared time zone and working week mean remote collaboration inside the region is nothing like working with a studio eight hours away. What matters is cultural fluency and whether the team can tell you why your audience will or will not play what you are describing. If a project needs a physical presence in the Kingdom for procurement or contracting reasons, that is a separate and legitimate constraint.",
          ar: "نعم، وهو أمر معتاد عبر الخليج — فالمنطقة الزمنية وأسبوع العمل المشتركان يجعلان التعاون عن بُعد داخل المنطقة مختلفًا تمامًا عن العمل مع استوديو يبعد ثماني ساعات. المهم هو الطلاقة الثقافية وما إذا كان الفريق يستطيع أن يخبرك لماذا سيلعب جمهورك ما تصفه أو لن يلعبه. وإن احتاج مشروع حضورًا فعليًا في المملكة لأسباب تتعلق بالمشتريات أو التعاقد، فذلك قيد منفصل ومشروع.",
        },
      },
      {
        q: {
          en: "Why is Buried Games on a list it wrote?",
          ar: "لماذا تظهر بريد جيمز في قائمة كتبتها بنفسها؟",
        },
        a: {
          en: "Leaving ourselves off would be its own kind of dishonest — we do this work and you would find us anyway. The entry says it is the least objective on the page and names the briefs where another company here fits better.",
          ar: "استبعاد أنفسنا سيكون نوعًا آخر من عدم الصدق — نحن نمارس هذا العمل وستجدنا على أي حال. والمدخل يذكر أنه الأقل موضوعية في الصفحة ويسمّي الموجزات التي تناسبها شركة أخرى هنا أكثر.",
        },
      },
      {
        q: {
          en: "How current is this?",
          ar: "ما مدى حداثة هذا؟",
        },
        a: {
          en: "Third-party details were gathered from public sources on the date shown at the top. This market moves quickly — if something here is out of date or wrong about your company, tell us and we will correct it.",
          ar: "جُمعت تفاصيل الأطراف الأخرى من مصادر عامة في التاريخ الظاهر أعلى الصفحة. وهذا السوق يتحرك سريعًا — إن كان شيء هنا قديمًا أو خاطئًا بشأن شركتك، فأخبرنا وسنصحّحه.",
        },
      },
    ],
  },
];

export const guideSlugs = guides.map((g) => g.slug);

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export const guidesUi: Record<Locale, { home: string; guides: string; basedInLabel: string; usLabel: string; sourcedLabel: string; ctaTitle: string; ctaBody: string; contactCta: string }> = {
  en: {
    home: "Home",
    guides: "Guides",
    basedInLabel: "Based in",
    usLabel: "That's us",
    sourcedLabel: "Third-party details gathered",
    ctaTitle: "Think we're the right fit?",
    ctaBody: "Tell us what you're building and we'll give you an honest read on scope — including if we think someone else should build it.",
    contactCta: "Start your project",
  },
  ar: {
    home: "الرئيسية",
    guides: "الأدلة",
    basedInLabel: "المقر",
    usLabel: "هذه نحن",
    sourcedLabel: "جُمعت تفاصيل الأطراف الأخرى في",
    ctaTitle: "ترى أننا الخيار المناسب؟",
    ctaBody: "أخبرنا بما تبنيه وسنعطيك قراءة صادقة للنطاق — بما في ذلك إن رأينا أن على غيرنا بناءه.",
    contactCta: "ابدأ مشروعك",
  },
};
