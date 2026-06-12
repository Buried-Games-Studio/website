
export const devlogContent = {
  en: {
    page_title: 'Game Development Devlogs & Behind the Scenes',
    page_subtitle: 'See how we make our games — behind-the-scenes footage, feature breakdowns, and studio updates on our official YouTube channel.',
    page_intro:
      'This is our game development knowledge hub: long-form articles paired with the videos from our GCC games studio. Each devlog unpacks how we actually approach a part of the craft — audio, level design, character animation, AI, choosing a game engine, and shipping — drawing on the work behind our own titles like Nabsh, KoutQ8, Power of Bombs, and Arrab. If you build games anywhere across the GCC, these are written for you.',
    home_title: 'Latest Devlogs',
    home_subtitle: 'Get a glimpse into our development process.',
    subscribe_cta: 'Subscribe to our YouTube Channel',
    view_all_cta: 'View All Videos',
    videos: [
      { id: 'thumb1', slug: 'devlog-game-audio-design', youtubeUrl: 'https://youtu.be/Rt2zSXYjxg4?si=lxzf_MRTElIBR6LR', alt: 'Devlog about game audio design' },
      { id: 'thumb2', slug: 'devlog-level-design', youtubeUrl: 'https://youtu.be/ivS3ypjdUtA?si=aiTMqs2BiRgpvrpV', alt: 'Devlog about level design' },
      { id: 'thumb3', slug: 'devlog-character-animation', youtubeUrl: 'https://youtu.be/uiBltx7SHdA?si=bt6NdNiDgaZXSMV-', alt: 'Devlog about character animation' },
      { id: 'thumb4', slug: 'devlog-ai-in-games', youtubeUrl: 'https://youtu.be/ZcT2WfDRMgQ?si=9usO6mgAfSokjvit', alt: 'Devlog about AI in games' },
      { id: 'thumb5', slug: 'devlog-unity-vs-unreal', youtubeUrl: 'https://youtu.be/ygPjpaLWyzE?si=m-8xi6m07Px8KuHz', alt: 'Devlog about Unity vs Unreal' },
      { id: 'thumb6', slug: 'devlog-game-release-strategy', youtubeUrl: 'https://youtu.be/9mlvZXzy9ok?si=WHBUdRqGRbkqMTtF', alt: 'Devlog about game release strategy' },
    ],
  },
  ar: {
    page_title: 'مدونات تطوير الألعاب وما وراء الكواليس',
    page_subtitle: 'شاهد كيف نصنع ألعابنا - لقطات من وراء الكواليس، وتحليلات للميزات، وتحديثات الاستوديو على قناتنا الرسمية على يوتيوب.',
    page_intro:
      'هذه منصتنا المعرفية لتطوير الألعاب: مقالات مطوّلة مقترنة بفيديوهات استوديو الألعاب الخليجي لدينا. يشرح كل مدوّنة كيف نتعامل فعليًا مع جانب من جوانب الحرفة — الصوت، وتصميم المراحل، وتحريك الشخصيات، والذكاء الاصطناعي، واختيار محرّك الألعاب، والإطلاق — مستندين إلى العمل خلف ألعابنا مثل نبش وكوت الكويت وباور أوف بومبز وعرّاب. إن كنت تطوّر الألعاب في أي مكان في الخليج، فهذه المقالات مكتوبة لك.',
    home_title: 'أحدث مدونات التطوير',
    home_subtitle: 'ألق نظرة على عملية التطوير لدينا.',
    subscribe_cta: 'اشترك في قناتنا على يوتيوب',
    view_all_cta: 'مشاهدة كل الفيديوهات',
    videos: [
      { id: 'thumb1', slug: 'devlog-game-audio-design', youtubeUrl: 'https://youtu.be/Rt2zSXYjxg4?si=lxzf_MRTElIBR6LR', alt: 'مدونة تطوير عن تصميم صوت الألعاب' },
      { id: 'thumb2', slug: 'devlog-level-design', youtubeUrl: 'https://youtu.be/ivS3ypjdUtA?si=aiTMqs2BiRgpvrpV', alt: 'مدونة تطوير عن تصميم المراحل' },
      { id: 'thumb3', slug: 'devlog-character-animation', youtubeUrl: 'https://youtu.be/uiBltx7SHdA?si=bt6NdNiDgaZXSMV-', alt: 'مدونة تطوير عن تحريك الشخصيات' },
      { id: 'thumb4', slug: 'devlog-ai-in-games', youtubeUrl: 'https://youtu.be/ZcT2WfDRMgQ?si=9usO6mgAfSokjvit', alt: 'مدونة تطوير عن الذكاء الاصطناعي في الألعاب' },
      { id: 'thumb5', slug: 'devlog-unity-vs-unreal', youtubeUrl: 'https://youtu.be/ygPjpaLWyzE?si=m-8xi6m07Px8KuHz', alt: 'مدونة تطوير عن مقارنة بين Unity و Unreal' },
      { id: 'thumb6', slug: 'devlog-game-release-strategy', youtubeUrl: 'https://youtu.be/9mlvZXzy9ok?si=WHBUdRqGRbkqMTtF', alt: 'مدونة تطوير عن استراتيجية إطلاق الألعاب' },
    ],
  },
};

/**
 * Per-post devlog data backing the indexable /devlog/[slug] pages.
 *
 * Each post carries a full long-form article (structured h2 sections with body
 * copy) in both locales, the YouTube id for the embed, and a publishedAt date.
 *
 * publishedAt is the real upload date of the source video on our YouTube
 * channel, read from the watch page's `uploadDate` meta and normalised to UTC.
 * It backs both the visible date and the Article/VideoObject uploadDate in JSON-LD.
 *
 * `links` are descriptive internal cross-links rendered after the article: each
 * post points to the most relevant service child page and at least one game page.
 */
type Localized = { en: string; ar: string };

export type DevlogSection = {
  heading: Localized;
  /** Each entry is one paragraph. */
  body: Localized[];
};

export type DevlogLink = {
  href: string;
  label: Localized;
};

export type DevlogPost = {
  slug: string;
  youtubeId: string;
  /** ISO 8601 (UTC) upload date of the source video. */
  publishedAt: string;
  title: Localized;
  description: Localized;
  /** Lead paragraph rendered under the video, before the sectioned article. */
  intro: Localized;
  sections: DevlogSection[];
  links: DevlogLink[];
};

export const devlogPosts: DevlogPost[] = [
  {
    slug: 'devlog-game-audio-design',
    youtubeId: 'Rt2zSXYjxg4',
    publishedAt: '2024-04-21T18:55:00Z',
    title: {
      en: 'Game Audio Design: How We Make a Game Sound Alive',
      ar: 'تصميم صوت الألعاب: كيف نجعل اللعبة تنبض بالحياة',
    },
    description: {
      en: 'A practitioner devlog on game audio design — how we layer sound effects, music, and feedback cues so a game feels responsive, polished, and alive.',
      ar: 'مدونة تطوير عملية عن تصميم صوت الألعاب — كيف نُراكم المؤثرات الصوتية والموسيقى وإشارات التغذية الراجعة لتصبح اللعبة سريعة الاستجابة ومصقولة ونابضة بالحياة.',
    },
    intro: {
      en: 'Audio is the half of game development nobody notices until it is missing. Mute a great game and it instantly feels broken; the buttons stop feeling pressed and the world stops feeling real. Here is how we think about game audio design as a studio, from the first placeholder beep to a mixed, mastered soundtrack.',
      ar: 'الصوت هو نصف تطوير الألعاب الذي لا يلاحظه أحد حتى يغيب. اكتم الصوت في لعبة رائعة وستشعر فورًا بأنها معطّلة؛ تتوقف الأزرار عن الإحساس بالضغط ويتوقف العالم عن الشعور بالواقعية. إليك كيف نفكّر في تصميم صوت الألعاب كاستوديو، من أول صفير مؤقت حتى موسيقى تصويرية ممزوجة ومُتقنة.',
    },
    sections: [
      {
        heading: { en: 'The three layers of game audio', ar: 'طبقات صوت اللعبة الثلاث' },
        body: [
          {
            en: 'We split every project into three audio layers: sound effects (SFX), music, and UI feedback. SFX are the diegetic sounds the world makes — a card flipping, a bomb landing, footsteps. Music sets the emotional register and rarely changes within a scene. UI feedback is the smallest layer but the most felt: the click when you tap an answer, the chime when you win a round. Treating these as separate buses from day one keeps the final mix controllable instead of a wall of noise.',
            ar: 'نقسّم كل مشروع إلى ثلاث طبقات صوتية: المؤثرات الصوتية، والموسيقى، وتغذية واجهة المستخدم الراجعة. المؤثرات الصوتية هي أصوات العالم الواقعية — قلب بطاقة، سقوط قنبلة، وقع الأقدام. أما الموسيقى فتحدد الطابع العاطفي ونادرًا ما تتغير داخل المشهد. وتغذية واجهة المستخدم الراجعة هي أصغر طبقة لكنها الأكثر إحساسًا: النقرة عند اختيار إجابة، والرنين عند الفوز بجولة. التعامل معها كمسارات منفصلة منذ اليوم الأول يبقي المزيج النهائي قابلًا للتحكم بدلًا من أن يكون جدارًا من الضجيج.',
          },
        ],
      },
      {
        heading: { en: 'Feedback before fidelity', ar: 'التغذية الراجعة قبل جودة الصوت' },
        body: [
          {
            en: 'Early on we deliberately use rough placeholder sounds. The goal is not a beautiful sample but a fast feedback loop: does pressing this button feel good, does this hit land with weight? A trivia answer in a game like Nabsh needs a confirmation that arrives within a frame or two of the tap, or players feel lag even when the network is fine. We tune that timing with throwaway sounds first, then swap in polished assets once the feel is locked.',
            ar: 'في البداية نستخدم عمدًا أصواتًا مؤقتة خشنة. الهدف ليس عيّنة جميلة بل حلقة تغذية راجعة سريعة: هل الضغط على هذا الزر مريح، وهل تحمل هذه الضربة وزنًا؟ تحتاج إجابة المعلومات العامة في لعبة مثل نبش إلى تأكيد يصل خلال إطار أو إطارين من اللمسة، وإلا شعر اللاعبون بالتأخير حتى مع سلامة الشبكة. نضبط هذا التوقيت بأصوات مؤقتة أولًا، ثم نستبدلها بمؤثرات مصقولة بعد تثبيت الإحساس.',
          },
          {
            en: 'This is also why we attach a subtle audio cue to almost every interactive element. Silence on a tap reads as a bug; a quiet, well-mixed click reads as quality. The cue should never fight the music, so we duck competing layers automatically when an important sound plays.',
            ar: 'لهذا أيضًا نربط إشارة صوتية خفيفة بكل عنصر تفاعلي تقريبًا. الصمت عند اللمس يُقرأ كخلل؛ والنقرة الهادئة الممزوجة جيدًا تُقرأ كجودة. لا ينبغي للإشارة أن تنافس الموسيقى أبدًا، لذا نخفض الطبقات المتنافسة تلقائيًا عند تشغيل صوت مهم.',
          },
        ],
      },
      {
        heading: { en: 'Mixing for phone speakers, not studio monitors', ar: 'المزج لسماعات الهاتف لا لسماعات الاستوديو' },
        body: [
          {
            en: 'Most of our players in the GCC are on phones, often without headphones, sometimes in a noisy majlis during a game night. So we master with that reality in mind. Tiny phone speakers lose almost all low end, so a bass-heavy explosion that thumps on monitors simply disappears in the player\'s hand. We add midrange "click" and "crack" content to percussive sounds so they read on small speakers, and we keep the loudness consistent so nobody scrambles for the volume button between a quiet menu and a loud match.',
            ar: 'معظم لاعبينا في الخليج يستخدمون الهواتف، غالبًا دون سماعات، وأحيانًا في مجلس صاخب خلال ليلة لعب. لذا نُتقن المزج واضعين هذا الواقع في الحسبان. تفقد سماعات الهاتف الصغيرة معظم الترددات المنخفضة، فالانفجار الغني بالباس الذي يدوّي على سماعات الاستوديو يختفي ببساطة في يد اللاعب. نضيف محتوى «نقرة» و«طقطقة» في المدى المتوسط للأصوات الإيقاعية لتُسمع على السماعات الصغيرة، ونحافظ على ثبات مستوى الصوت حتى لا يبحث أحد عن زر مستوى الصوت بين قائمة هادئة ومباراة صاخبة.',
          },
        ],
      },
      {
        heading: { en: 'Arabic and the rhythm of the soundtrack', ar: 'العربية وإيقاع الموسيقى التصويرية' },
        body: [
          {
            en: 'Because we ship Arabic-first experiences, audio sometimes carries cultural weight too. A win sting, a countdown, the mood of a card-game lounge — these read differently to a Gulf audience than to a Western one. We lean on this rather than ignore it, choosing instrument palettes and tempos that feel local without becoming a cliché. The right soundtrack makes a regionally made game feel like it belongs to its players.',
            ar: 'لأننا نطلق تجارب عربية أولًا، يحمل الصوت أحيانًا ثقلًا ثقافيًا. لحن الفوز، والعد التنازلي، وأجواء صالة لعبة الورق — تُقرأ هذه بشكل مختلف لدى الجمهور الخليجي عنها لدى الغربي. نستثمر هذا بدلًا من تجاهله، فنختار توليفات الآلات والإيقاعات التي تبدو محلية دون أن تصبح مبتذلة. الموسيقى التصويرية الصحيحة تجعل اللعبة المصنوعة إقليميًا تبدو ملكًا للاعبيها.',
          },
        ],
      },
    ],
    links: [
      { href: '/services/game-development', label: { en: 'our full game development services', ar: 'خدمات تطوير الألعاب الكاملة لدينا' } },
      { href: '/games/nabsh', label: { en: 'Nabsh, our real-time trivia game', ar: 'نبش، لعبة المعلومات العامة المباشرة لدينا' } },
    ],
  },
  {
    slug: 'devlog-level-design',
    youtubeId: 'ivS3ypjdUtA',
    publishedAt: '2024-04-23T10:44:50Z',
    title: {
      en: 'Level Design: How We Build Levels Players Want to Finish',
      ar: 'تصميم المراحل: كيف نبني مراحل يرغب اللاعبون في إكمالها',
    },
    description: {
      en: 'A practitioner devlog on level design — how we plan, prototype, and balance levels so difficulty rises fairly and players stay engaged from start to finish.',
      ar: 'مدونة تطوير عملية عن تصميم المراحل — كيف نخطّط ونبني النماذج ونوازن المراحل لترتفع الصعوبة بإنصاف ويبقى اللاعبون منغمسين من البداية حتى النهاية.',
    },
    intro: {
      en: 'Level design is where game mechanics meet a player\'s patience. A perfectly tuned mechanic can still feel terrible if the levels around it ask for the wrong thing at the wrong time. This is how we approach designing, prototyping, and balancing levels so the difficulty curve feels earned rather than punishing.',
      ar: 'تصميم المراحل هو حيث تلتقي آليات اللعبة بصبر اللاعب. قد تبقى الآلية المضبوطة بإتقان سيئة الإحساس إذا طلبت المراحل المحيطة بها الشيء الخطأ في الوقت الخطأ. إليك كيف نتعامل مع تصميم المراحل وبناء نماذجها وموازنتها ليبدو منحنى الصعوبة مكتسبًا لا عقابيًا.',
    },
    sections: [
      {
        heading: { en: 'Start with the verb, not the layout', ar: 'ابدأ بالفعل لا بالتخطيط' },
        body: [
          {
            en: 'Before drawing a single room or arena we name the core verb the level teaches — dodge, time, deduce, aim. A level exists to give the player a focused space to practice one idea. In an arcade title like Power of Bombs, an early level should isolate the dodge-and-time verb with very few distractions, so the player builds the muscle before we layer in pressure. Designing layout first, without a verb, produces pretty spaces that teach nothing.',
            ar: 'قبل رسم غرفة أو ساحة واحدة، نُسمّي الفعل الأساسي الذي تُعلّمه المرحلة — المراوغة، التوقيت، الاستنتاج، التصويب. توجد المرحلة لتمنح اللاعب مساحة مركّزة لممارسة فكرة واحدة. في لعبة آركيد مثل باور أوف بومبز، ينبغي للمرحلة المبكرة أن تعزل فعل المراوغة والتوقيت بأقل القليل من المشتتات، ليبني اللاعب المهارة قبل أن نضيف الضغط. تصميم التخطيط أولًا، دون فعل، يُنتج مساحات جميلة لا تُعلّم شيئًا.',
          },
        ],
      },
      {
        heading: { en: 'Greybox before art', ar: 'النموذج الرمادي قبل الفن' },
        body: [
          {
            en: 'We build every level twice. The first build is a greybox: untextured shapes, placeholder timings, no polish. Greyboxing is the cheapest place to discover that a jump is impossible or a puzzle is unreadable. We playtest the greybox aggressively because changes here cost minutes, while the same change after the art pass costs days. Only once the greybox plays well do we hand it to artists.',
            ar: 'نبني كل مرحلة مرتين. البناء الأول نموذج رمادي: أشكال بلا خامات، وتوقيتات مؤقتة، دون صقل. النموذج الرمادي هو أرخص مكان لاكتشاف أن قفزة مستحيلة أو أن لغزًا غير مقروء. نختبر النموذج الرمادي بصرامة لأن التغييرات هنا تكلّف دقائق، بينما يكلّف التغيير نفسه بعد مرحلة الفن أيامًا. وفقط بعد أن يُلعب النموذج الرمادي جيدًا نُسلّمه للفنانين.',
          },
        ],
      },
      {
        heading: { en: 'The difficulty curve is a sawtooth, not a ramp', ar: 'منحنى الصعوبة سن منشار لا منحدر' },
        body: [
          {
            en: 'Players burn out on a constant climb. We shape difficulty as a sawtooth: introduce a tough challenge, then deliberately drop to an easier beat so the player exhales and feels powerful with their new skill. Each peak is a little higher than the last. This rhythm — tension, release, tension — is what keeps someone playing one more level at 1am instead of putting the phone down.',
            ar: 'يُنهك اللاعبون من تسلّق مستمر. نُشكّل الصعوبة كسن منشار: نُقدّم تحديًا صعبًا، ثم نهبط عمدًا إلى إيقاع أسهل ليتنفس اللاعب ويشعر بالقوة بمهارته الجديدة. كل قمة أعلى قليلًا من سابقتها. هذا الإيقاع — توتر، انفراج، توتر — هو ما يُبقي شخصًا يلعب مرحلة إضافية في الواحدة فجرًا بدلًا من ترك الهاتف.',
          },
          {
            en: 'We also respect the first-session quit risk. The opening levels carry more forgiveness and clearer signposting than anything later, because we have one chance to convince a new player the game respects their time.',
            ar: 'نحترم أيضًا خطر الانسحاب في الجلسة الأولى. تحمل المراحل الافتتاحية تسامحًا أكبر وإرشادًا أوضح من أي شيء لاحق، لأن لدينا فرصة واحدة لإقناع اللاعب الجديد بأن اللعبة تحترم وقته.',
          },
        ],
      },
      {
        heading: { en: 'Telemetry closes the loop', ar: 'القياس عن بُعد يُغلق الحلقة' },
        body: [
          {
            en: 'Once a level is live, data tells us what playtesting could not. If a single level shows a sharp spike in failures or quits, that is a design bug, not a player problem. We instrument levels to log where players die, how long they take, and where they give up, then re-tune the spots that the numbers flag. Good level design is never finished at launch; it is finished when the curve looks fair in the data.',
            ar: 'بمجرد أن تصبح المرحلة منشورة، تخبرنا البيانات بما لم يستطع الاختبار اليدوي إخباره. إذا أظهرت مرحلة واحدة ارتفاعًا حادًا في الإخفاقات أو الانسحابات، فهذا خلل تصميمي لا مشكلة لاعب. نُجهّز المراحل لتسجيل أين يموت اللاعبون، وكم يستغرقون، وأين يستسلمون، ثم نُعيد ضبط النقاط التي تُشير إليها الأرقام. تصميم المراحل الجيد لا ينتهي عند الإطلاق؛ بل ينتهي حين يبدو المنحنى منصفًا في البيانات.',
          },
        ],
      },
    ],
    links: [
      { href: '/services/game-development', label: { en: 'our end-to-end game development services', ar: 'خدمات تطوير الألعاب الشاملة لدينا' } },
      { href: '/games/power-of-bombs', label: { en: 'Power of Bombs, our arcade title', ar: 'باور أوف بومبز، لعبة الآركيد لدينا' } },
    ],
  },
  {
    slug: 'devlog-character-animation',
    youtubeId: 'uiBltx7SHdA',
    publishedAt: '2024-04-25T11:55:42Z',
    title: {
      en: 'Character Animation: Giving Game Characters Personality',
      ar: 'تحريك الشخصيات: منح شخصيات الألعاب طابعها الخاص',
    },
    description: {
      en: 'A practitioner devlog on character animation — our workflow from rigging to game-ready motion, and the principles that make characters feel alive on mobile.',
      ar: 'مدونة تطوير عملية عن تحريك الشخصيات — سير عملنا من بناء الهيكل العظمي إلى الحركة الجاهزة للعبة، والمبادئ التي تجعل الشخصيات تبدو حية على الجوال.',
    },
    intro: {
      en: 'Character animation is where a model stops being a sculpture and starts being a person. Players form an opinion about a character in the first second of seeing it move, long before they read a line of dialogue. This is the workflow and the principles we use to make game characters feel alive — especially within the tight performance budget of mobile.',
      ar: 'تحريك الشخصيات هو حيث يتوقف النموذج عن كونه منحوتة ويبدأ في كونه شخصًا. يُكوّن اللاعبون رأيًا عن الشخصية في الثانية الأولى من رؤيتها تتحرك، قبل قراءة سطر حوار بوقت طويل. إليك سير العمل والمبادئ التي نستخدمها لجعل شخصيات اللعبة تبدو حية — خصوصًا ضمن ميزانية الأداء الضيقة للجوال.',
    },
    sections: [
      {
        heading: { en: 'A clean rig is half the animation', ar: 'الهيكل النظيف نصف التحريك' },
        body: [
          {
            en: 'Animation lives or dies on the rig. Before a single keyframe, we build a skeleton with sensible joint hierarchies, good weight painting, and controls an animator can actually pose quickly. A bad rig forces animators to fight the tool on every shot; a clean rig with intuitive controllers lets them spend their time on performance, not problem-solving. For mobile we also cap bone counts deliberately, because every extra bone is skinning cost on a phone GPU.',
            ar: 'يحيا التحريك أو يموت بالهيكل العظمي. قبل أي إطار مفتاحي واحد، نبني هيكلًا بتسلسلات مفاصل منطقية، وطلاء أوزان جيد، وعناصر تحكم يستطيع المحرّك تشكيلها بسرعة فعلًا. الهيكل السيئ يُجبر المحرّكين على مصارعة الأداة في كل لقطة؛ والهيكل النظيف بعناصر تحكم بديهية يتيح لهم إنفاق وقتهم على الأداء لا على حل المشكلات. وللجوال نُحدّد عدد العظام عمدًا، لأن كل عظمة إضافية تكلفة كساء على معالج رسوميات الهاتف.',
          },
        ],
      },
      {
        heading: { en: 'The principles still rule', ar: 'المبادئ لا تزال تحكم' },
        body: [
          {
            en: 'The classic animation principles — anticipation, follow-through, squash and stretch, timing — are not optional nostalgia; they are why a jump reads as a jump. A character winds up before a big action so the player anticipates it, then overshoots and settles so the motion has weight. Even a stylised, low-poly mobile character feels expensive when these fundamentals are respected, and cheap when they are skipped.',
            ar: 'مبادئ التحريك الكلاسيكية — الترقّب، والمتابعة، والسحق والتمدد، والتوقيت — ليست حنينًا اختياريًا؛ بل هي سبب قراءة القفزة كقفزة. تتهيّأ الشخصية قبل فعل كبير ليترقّبه اللاعب، ثم تتجاوز الهدف وتستقر ليكون للحركة وزن. حتى الشخصية المنخفضة المضلّعات والمنمّقة على الجوال تبدو ثمينة حين تُحترم هذه الأساسيات، ورخيصة حين تُتجاهل.',
          },
        ],
      },
      {
        heading: { en: 'Game-ready means looping and blending', ar: 'الجاهز للعبة يعني التكرار والمزج' },
        body: [
          {
            en: 'Cinematic animation plays once; game animation has to loop seamlessly and blend into whatever the player does next. We author idle, walk, and action clips so their start and end poses line up, then rely on the engine\'s blend trees to transition between them without a visible snap. A walk cycle that pops at the loop point is the kind of small flaw players cannot name but always feel.',
            ar: 'التحريك السينمائي يُعرض مرة واحدة؛ أما تحريك اللعبة فعليه أن يتكرر بسلاسة ويمتزج مع أي فعل يقوم به اللاعب تاليًا. نُؤلّف مقاطع الوقوف والمشي والفعل بحيث تتطابق وضعيات بدايتها ونهايتها، ثم نعتمد على أشجار المزج في المحرّك للانتقال بينها دون قفزة مرئية. دورة المشي التي تقفز عند نقطة التكرار هي ذلك العيب الصغير الذي لا يستطيع اللاعبون تسميته لكنهم يشعرون به دائمًا.',
          },
        ],
      },
      {
        heading: { en: 'Performance is part of the art', ar: 'الأداء جزء من الفن' },
        body: [
          {
            en: 'On phones we constantly trade animation richness against frame rate. We bake complex secondary motion where we can, use level-of-detail rigs so distant characters animate more cheaply, and lean on additive layers to add life — a head turn, a breath — without authoring full new clips. The goal is a character that feels hand-animated while staying inside a budget that runs smoothly on a mid-range device, which is what most of our GCC players carry.',
            ar: 'على الهواتف، نُقايض باستمرار بين غنى التحريك ومعدل الإطارات. نُثبّت الحركة الثانوية المعقدة حيثما أمكن، ونستخدم هياكل بمستويات تفصيل ليُحرَّك البعيدون بتكلفة أقل، ونعتمد على الطبقات الإضافية لإضافة الحياة — التفاتة رأس، نفَس — دون تأليف مقاطع جديدة كاملة. الهدف شخصية تبدو محرَّكة يدويًا مع البقاء ضمن ميزانية تعمل بسلاسة على جهاز متوسط الفئة، وهو ما يحمله معظم لاعبينا في الخليج.',
          },
        ],
      },
    ],
    links: [
      { href: '/services/game-development', label: { en: 'our game development and art services', ar: 'خدمات تطوير الألعاب والفن لدينا' } },
      { href: '/games/arrab', label: { en: 'Arrab, our social-deduction game with illustrated roles', ar: 'عرّاب، لعبة الاستنتاج الاجتماعي لدينا بأدوار مرسومة' } },
    ],
  },
  {
    slug: 'devlog-ai-in-games',
    youtubeId: 'ZcT2WfDRMgQ',
    publishedAt: '2024-04-28T13:25:41Z',
    title: {
      en: 'AI in Games: From Enemy Behaviour to Smarter Systems',
      ar: 'الذكاء الاصطناعي في الألعاب: من سلوك الأعداء إلى أنظمة أذكى',
    },
    description: {
      en: 'A practitioner devlog on AI in games — how we use state machines, behaviour trees, and tuning to make enemies, NPCs, and game systems feel smart, not scripted.',
      ar: 'مدونة تطوير عملية عن الذكاء الاصطناعي في الألعاب — كيف نستخدم آلات الحالة وأشجار السلوك والضبط لجعل الأعداء والشخصيات والأنظمة تبدو ذكية لا مكتوبة مسبقًا.',
    },
    intro: {
      en: 'When people hear "AI in games" they often picture machine learning, but most game AI is something more practical and more controllable: systems that make characters and opponents behave believably. The craft is less about raw intelligence and more about creating the convincing illusion of it. Here is how we approach game AI as a studio.',
      ar: 'حين يسمع الناس «الذكاء الاصطناعي في الألعاب» يتخيلون غالبًا تعلّم الآلة، لكن معظم ذكاء الألعاب شيء أكثر عملية وقابلية للتحكم: أنظمة تجعل الشخصيات والخصوم يتصرفون بشكل مقنع. الحرفة أقل ارتباطًا بالذكاء الخام وأكثر ارتباطًا بخلق وهم مقنع به. إليك كيف نتعامل مع ذكاء الألعاب كاستوديو.',
    },
    sections: [
      {
        heading: { en: 'State machines and behaviour trees', ar: 'آلات الحالة وأشجار السلوك' },
        body: [
          {
            en: 'Most of our agents start as a finite state machine: idle, patrol, chase, attack, flee, with clear rules for moving between states. When behaviour gets richer we graduate to behaviour trees, which compose small reusable actions into priorities — defend if low on health, otherwise pursue, otherwise wander. Both are deterministic and debuggable, which matters: a designer needs to understand exactly why an enemy did what it did to be able to tune it.',
            ar: 'تبدأ معظم عملائنا كآلة حالة منتهية: وقوف، دورية، مطاردة، هجوم، فرار، بقواعد واضحة للانتقال بين الحالات. وحين يزداد السلوك غنى نترقّى إلى أشجار السلوك التي تُركّب أفعالًا صغيرة قابلة لإعادة الاستخدام في أولويات — دافع إن قلّت الصحة، وإلا فطارد، وإلا فتجوّل. كلاهما حتمي وقابل للتنقيح، وهذا مهم: يحتاج المصمم إلى فهم سبب فعل العدو لما فعله بالضبط ليتمكن من ضبطه.',
          },
        ],
      },
      {
        heading: { en: 'Believable beats optimal', ar: 'المقنع أفضل من الأمثل' },
        body: [
          {
            en: 'An AI that plays perfectly is rarely fun. A flawless opponent feels unfair, and a perfect chaser becomes a stress test rather than a game. We deliberately give agents human-like imperfections — a reaction delay, a moment of hesitation, a slightly wrong guess — because believability, not optimality, is what players enjoy. The same principle guides difficulty: we scale the AI\'s competence to the player\'s, rather than always playing at full strength.',
            ar: 'نادرًا ما يكون الذكاء الاصطناعي الذي يلعب بإتقان ممتعًا. يبدو الخصم الذي لا يخطئ غير منصف، ويتحوّل المطارد المثالي إلى اختبار ضغط لا لعبة. نمنح العملاء عمدًا عيوبًا شبيهة بالبشر — تأخر في رد الفعل، لحظة تردد، تخمين خاطئ قليلًا — لأن الإقناع لا الكمال هو ما يستمتع به اللاعبون. المبدأ نفسه يوجّه الصعوبة: نُقيّس كفاءة الذكاء الاصطناعي على مستوى اللاعب بدلًا من اللعب بكامل القوة دائمًا.',
          },
        ],
      },
      {
        heading: { en: 'AI beyond enemies', ar: 'الذكاء الاصطناعي خارج الأعداء' },
        body: [
          {
            en: 'Game AI is not only opponents. It runs matchmaking, difficulty adjustment, hint systems, and content generation. In a trivia and card-game context like ours, "AI" often means smart question selection, fair bot opponents for players waiting on a match, and systems that detect when a player is struggling and adapt. These invisible systems shape the experience as much as any on-screen enemy.',
            ar: 'ذكاء الألعاب ليس الخصوم فقط. فهو يُدير التوفيق بين اللاعبين، وتعديل الصعوبة، وأنظمة التلميح، وتوليد المحتوى. في سياق المعلومات العامة وألعاب الورق مثل سياقنا، يعني «الذكاء الاصطناعي» غالبًا اختيار الأسئلة الذكي، وخصومًا آليين منصفين للاعبين المنتظرين مباراة، وأنظمة تكتشف تعثّر اللاعب وتتكيّف. تُشكّل هذه الأنظمة غير المرئية التجربة بقدر أي عدو على الشاشة.',
          },
        ],
      },
      {
        heading: { en: 'Where generative AI fits — and where it does not', ar: 'أين يناسب الذكاء التوليدي وأين لا يناسب' },
        body: [
          {
            en: 'Generative AI is genuinely useful in production: drafting placeholder dialogue, brainstorming content, accelerating tooling. But we keep it out of the runtime loop where determinism, latency, and tone matter. A live multiplayer match cannot wait on an unpredictable model, and shipped content — especially Arabic copy — needs a human editor to guarantee voice and correctness. We treat generative AI as a power tool for the team, not an unsupervised author.',
            ar: 'الذكاء الاصطناعي التوليدي مفيد فعلًا في الإنتاج: صياغة حوار مؤقت، والعصف الذهني للمحتوى، وتسريع الأدوات. لكننا نُبقيه خارج حلقة التشغيل الحية حيث تهمّ الحتمية وزمن الاستجابة والنبرة. لا يمكن لمباراة جماعية مباشرة أن تنتظر نموذجًا غير متوقع، والمحتوى المنشور — خصوصًا النص العربي — يحتاج إلى محرّر بشري يضمن النبرة والصحة. نتعامل مع الذكاء التوليدي كأداة قوية للفريق لا كمؤلّف بلا إشراف.',
          },
        ],
      },
    ],
    links: [
      { href: '/services/game-development', label: { en: 'our game development services', ar: 'خدمات تطوير الألعاب لدينا' } },
      { href: '/games/nabsh', label: { en: 'Nabsh, where smart matchmaking and question selection matter', ar: 'نبش، حيث يهمّ التوفيق الذكي واختيار الأسئلة' } },
    ],
  },
  {
    slug: 'devlog-unity-vs-unreal',
    youtubeId: 'ygPjpaLWyzE',
    publishedAt: '2024-05-03T11:22:52Z',
    title: {
      en: 'Unity vs Unreal: How We Choose a Game Engine',
      ar: 'مقارنة بين Unity و Unreal: كيف نختار محرّك الألعاب',
    },
    description: {
      en: 'A practitioner devlog comparing Unity vs Unreal Engine — the real trade-offs for mobile, team skills, and shipping in the GCC, and how we pick per project.',
      ar: 'مدونة تطوير عملية تقارن بين محرّكَي Unity و Unreal — المفاضلات الحقيقية للجوال ومهارات الفريق والإطلاق في الخليج، وكيف نختار لكل مشروع.',
    },
    intro: {
      en: 'Unity versus Unreal is the question every new studio and client asks, and the honest answer is "it depends." Both are excellent engines; neither is universally better. What matters is matching the engine to the project, the platform, and the team. Here is the framework we actually use to choose between Unity and Unreal at the start of a project.',
      ar: 'مقارنة Unity بـ Unreal هي السؤال الذي يطرحه كل استوديو وعميل جديد، والإجابة الصادقة هي «حسب الحالة». كلا المحرّكين ممتاز؛ ولا أحدهما أفضل عالميًا. ما يهمّ هو مطابقة المحرّك للمشروع والمنصّة والفريق. إليك الإطار الذي نستخدمه فعلًا للاختيار بين Unity و Unreal في بداية المشروع.',
    },
    sections: [
      {
        heading: { en: 'Mobile-first tilts toward Unity', ar: 'الأولوية للجوال تميل نحو Unity' },
        body: [
          {
            en: 'For the mobile games that dominate the GCC market, Unity is usually our default. Its build pipeline for iOS and Android is mature, its footprint is lighter on mid-range phones, and the ecosystem of mobile-focused plugins, ad networks, and analytics is deep. Unreal can ship to mobile and looks stunning doing it, but you spend more effort fighting binary size and performance on the average device our players carry. When the target is a phone, Unity removes friction.',
            ar: 'لألعاب الجوال التي تهيمن على سوق الخليج، يكون Unity عادةً خيارنا الافتراضي. خط بنائه لنظامي iOS وأندرويد ناضج، وبصمته أخف على الهواتف متوسطة الفئة، ومنظومة الإضافات وشبكات الإعلانات والتحليلات الموجهة للجوال عميقة فيه. يستطيع Unreal الإطلاق على الجوال ويبدو مذهلًا، لكنك تبذل جهدًا أكبر في مصارعة حجم الملف والأداء على الجهاز المتوسط الذي يحمله لاعبونا. حين يكون الهدف هاتفًا، يُزيل Unity الاحتكاك.',
          },
        ],
      },
      {
        heading: { en: 'High-end visuals tilt toward Unreal', ar: 'الرسوميات الراقية تميل نحو Unreal' },
        body: [
          {
            en: 'When a project lives or dies on cutting-edge fidelity — cinematic 3D, photoreal environments, console or high-end PC — Unreal\'s out-of-the-box rendering, Nanite geometry, and Lumen lighting are a genuine head start. You get a AAA look earlier and Blueprints let designers prototype without engineers. The cost is a heavier project, a steeper learning curve, and more careful optimisation if you ever bring it back down to mobile.',
            ar: 'حين يحيا مشروع أو يموت على جودة بصرية متطوّرة — ثلاثي أبعاد سينمائي، وبيئات شبه واقعية، وأجهزة منزلية أو حاسوب راقٍ — تكون عوامل العرض الجاهزة في Unreal، وهندسة Nanite، وإضاءة Lumen، بداية حقيقية متقدمة. تحصل على مظهر AAA أبكر، وتتيح Blueprints للمصممين بناء النماذج دون مهندسين. الثمن مشروع أثقل، ومنحنى تعلّم أحدّ، وتحسين أدق إن أعدته إلى الجوال يومًا.',
          },
        ],
      },
      {
        heading: { en: 'The team you have beats the engine you wish for', ar: 'الفريق الذي لديك يتغلّب على المحرّك الذي تتمناه' },
        body: [
          {
            en: 'The most underrated factor is the team. An engine your developers already know deeply will out-ship a theoretically superior engine they are learning on the clock. Unity\'s C# is approachable and widely taught across the region, which makes hiring and onboarding easier here; Unreal\'s C++ and Blueprints reward teams with existing depth. We weigh existing skills heavily, because momentum and confidence are real project assets.',
            ar: 'أكثر العوامل تُبخس قدرًا هو الفريق. المحرّك الذي يعرفه مطوّروك بعمق سيُطلق أسرع من محرّك أفضل نظريًا يتعلمونه أثناء العمل. لغة C# في Unity سهلة المنال ومُدرّسة على نطاق واسع في المنطقة، ما يُسهّل التوظيف والإلحاق هنا؛ بينما تكافئ C++ وBlueprints في Unreal الفرق ذات العمق القائم. نُرجّح المهارات الموجودة بشدة، لأن الزخم والثقة أصول مشروع حقيقية.',
          },
        ],
      },
      {
        heading: { en: 'Our default, and when we break it', ar: 'خيارنا الافتراضي ومتى نكسره' },
        body: [
          {
            en: 'Because our portfolio is mobile-first and Arabic-first, Unity is our usual home — it is where we built titles like KoutQ8 and Nabsh quickly and shipped them to real players. But the choice is per project, not dogma. A client whose vision genuinely needs Unreal\'s visual ceiling gets Unreal, with eyes open about the trade-offs. The right engine is the one that lets this specific game reach this specific audience with the least wasted effort.',
            ar: 'لأن محفظتنا للجوال أولًا وللعربية أولًا، فإن Unity موطننا المعتاد — حيث بنينا ألعابًا مثل كوت الكويت ونبش بسرعة وأطلقناها للاعبين حقيقيين. لكن الاختيار لكل مشروع لا عقيدة. العميل الذي تحتاج رؤيته فعلًا إلى سقف Unreal البصري يحصل على Unreal، بوعي كامل بالمفاضلات. المحرّك الصحيح هو الذي يتيح لهذه اللعبة بعينها الوصول إلى هذا الجمهور بعينه بأقل جهد مهدور.',
          },
        ],
      },
    ],
    links: [
      { href: '/services/unity-game-development', label: { en: 'our Unity game development services', ar: 'خدمات تطوير الألعاب بمحرك يونيتي لدينا' } },
      { href: '/games/koutq8', label: { en: 'KoutQ8, built mobile-first in Unity', ar: 'كوت الكويت، المبنية للجوال أولًا في يونيتي' } },
    ],
  },
  {
    slug: 'devlog-game-release-strategy',
    youtubeId: '9mlvZXzy9ok',
    publishedAt: '2024-05-09T15:08:05Z',
    title: {
      en: 'Game Release Strategy: Launching a Game in the GCC',
      ar: 'استراتيجية إطلاق الألعاب: إطلاق لعبة في الخليج',
    },
    description: {
      en: 'A practitioner devlog on game release strategy — soft launch, store optimisation, launch-day timing, and localisation for reaching players across the GCC.',
      ar: 'مدونة تطوير عملية عن استراتيجية إطلاق الألعاب — الإطلاق التجريبي، وتحسين المتاجر، وتوقيت يوم الإطلاق، والأقلمة للوصول إلى اللاعبين في الخليج.',
    },
    intro: {
      en: 'A great game with a weak release reaches no one. Launch is not a single day — it is a strategy that starts months before and continues for weeks after. Here is how we approach releasing a game, with specific attention to reaching players across the GCC, where store behaviour, payment habits, and language expectations differ from Western markets.',
      ar: 'اللعبة الرائعة بإطلاق ضعيف لا تصل إلى أحد. الإطلاق ليس يومًا واحدًا — بل استراتيجية تبدأ قبل أشهر وتستمر أسابيع بعده. إليك كيف نتعامل مع إطلاق لعبة، باهتمام خاص بالوصول إلى اللاعبين في الخليج، حيث يختلف سلوك المتاجر وعادات الدفع وتوقعات اللغة عن الأسواق الغربية.',
    },
    sections: [
      {
        heading: { en: 'Soft launch before global launch', ar: 'إطلاق تجريبي قبل الإطلاق العالمي' },
        body: [
          {
            en: 'We rarely go straight to a global release. A soft launch in a limited region lets us watch real retention, crash rates, and monetisation on real devices before the marketing spend arrives. The numbers from a soft launch tell us whether day-one retention is healthy and where players drop, so we can fix the leaks before pouring traffic into a bucket with holes. Launching globally on hope, without this data, is how good games quietly fail.',
            ar: 'نادرًا ما نذهب مباشرة إلى إطلاق عالمي. الإطلاق التجريبي في منطقة محدودة يتيح لنا مراقبة الاحتفاظ الحقيقي ومعدلات الأعطال والربحية على أجهزة حقيقية قبل وصول إنفاق التسويق. تخبرنا أرقام الإطلاق التجريبي إن كان احتفاظ اليوم الأول صحيًا وأين ينسحب اللاعبون، لنُصلح التسريبات قبل ضخ الزيارات في دلو مثقوب. الإطلاق العالمي على الأمل، دون هذه البيانات، هو كيف تفشل الألعاب الجيدة بهدوء.',
          },
        ],
      },
      {
        heading: { en: 'Store optimisation is the cheapest growth', ar: 'تحسين المتجر أرخص نمو' },
        body: [
          {
            en: 'Most installs begin on a store page, so app store optimisation is the highest-leverage work we do. The icon, the first screenshot, the title, and the first lines of the description decide whether a browsing player taps install. We localise all of this — an Arabic-speaking player should see Arabic screenshots and copy, not an English page with a translated button. Getting the store listing right multiplies the value of every other marketing dollar.',
            ar: 'معظم التثبيتات تبدأ من صفحة متجر، لذا فإن تحسين متجر التطبيقات أعلى عملنا أثرًا. الأيقونة، وأول لقطة شاشة، والعنوان، وأول أسطر الوصف، تُقرّر إن كان اللاعب المتصفّح سيضغط تثبيت. نُؤقلم كل هذا — ينبغي للاعب الناطق بالعربية أن يرى لقطات ونصًا بالعربية، لا صفحة إنجليزية بزر مترجم. ضبط قائمة المتجر يُضاعف قيمة كل دولار تسويقي آخر.',
          },
        ],
      },
      {
        heading: { en: 'Localisation is more than translation', ar: 'الأقلمة أكثر من الترجمة' },
        body: [
          {
            en: 'Reaching GCC players means treating the region as a first-class market, not an afterthought. That is full Arabic support with correct right-to-left layout, payment methods players actually use, and pricing that respects local purchasing power. We also time announcements and content around the regional rhythm — weekends, holidays, and gatherings. A game that feels built for the region, rather than ported into it, earns word of mouth that no ad budget can buy.',
            ar: 'الوصول إلى لاعبي الخليج يعني التعامل مع المنطقة كسوق من الدرجة الأولى لا فكرة لاحقة. وهذا يعني دعمًا عربيًا كاملًا بتخطيط صحيح من اليمين إلى اليسار، وطرق دفع يستخدمها اللاعبون فعلًا، وتسعيرًا يحترم القوة الشرائية المحلية. نُوقّت أيضًا الإعلانات والمحتوى حول إيقاع المنطقة — العطل الأسبوعية والأعياد والتجمّعات. اللعبة التي تبدو مصنوعة للمنطقة، لا منقولة إليها، تكسب كلامًا شفهيًا لا تشتريه أي ميزانية إعلانات.',
          },
        ],
      },
      {
        heading: { en: 'Launch day is the start, not the finish', ar: 'يوم الإطلاق بداية لا نهاية' },
        body: [
          {
            en: 'The work that decides a launch\'s success often happens after it. We plan the first content updates and events before launch day, because the store ranking algorithms and the players both reward a game that keeps improving. Early reviews get answered, the first crash reports get hotfixed fast, and the roadmap stays visible. Treating launch as the finish line is the most common release mistake; treating it as the starting line is how a game builds a community.',
            ar: 'العمل الذي يُقرّر نجاح الإطلاق يحدث غالبًا بعده. نُخطّط لأول تحديثات المحتوى والفعاليات قبل يوم الإطلاق، لأن خوارزميات ترتيب المتجر واللاعبين كليهما يكافئان لعبة تستمر في التحسّن. يُردّ على المراجعات المبكرة، وتُصلَح أول تقارير الأعطال بسرعة، وتبقى خارطة الطريق واضحة. اعتبار الإطلاق خط النهاية أكثر أخطاء الإطلاق شيوعًا؛ واعتباره خط البداية هو كيف تبني اللعبة مجتمعًا.',
          },
        ],
      },
    ],
    links: [
      { href: '/services/game-development', label: { en: 'our game development and launch services', ar: 'خدمات تطوير الألعاب والإطلاق لدينا' } },
      { href: '/games/koutq8', label: { en: 'KoutQ8, launched for players across the GCC', ar: 'كوت الكويت، المُطلقة للاعبين في الخليج' } },
    ],
  },
];
