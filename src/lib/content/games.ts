
export const gamesContent = [
  {
    id: 'nabsh',
    slug: 'nabsh',
    title: 'Nabsh',
    status: 'released',
    engine: 'Next.js',
    logoUrl: '/assets/images/nabsh_logo.png',
    description: {
      en: 'A thrilling trivia web game that tests your knowledge on a wide range of topics. Challenge friends and climb the ranks!',
      ar: 'لعبة معلومات عامة مثيرة على الويب تختبر معلوماتك في مجموعة واسعة من المواضيع. تحدَّ أصدقاءك وتصدر قائمة المتصدرين!',
    },
    longDescription: {
        en: 'Nabsh is the ultimate trivia challenge! Compete with players in real-time, answer questions across various categories like history, culture, sports, and more. With a sleek design, engaging gameplay, and social features, Nabsh is the perfect game to prove your knowledge and have fun with friends and family.',
        ar: 'نبش هو التحدي النهائي للمعلومات العامة! تنافس مع اللاعبين في الوقت الفعلي، وأجب عن أسئلة في فئات متنوعة مثل التاريخ والثقافة والرياضة والمزيد. بفضل التصميم الأنيق واللعب الجذاب والميزات الاجتماعية، يعد نبش اللعبة المثالية لإثبات معرفتك والاستمتاع مع الأصدقاء والعائلة.'
    },
    features: [
        { icon: 'Users', title: { en: 'Live Multiplayer', ar: 'لعب جماعي مباشر' }, description: { en: 'Challenge friends or other players in exciting real-time trivia battles.', ar: 'تحدَّ الأصدقاء أو اللاعبين الآخرين في معارك معلومات عامة مثيرة في الوقت الفعلي.' } },
        { icon: 'Puzzle', title: { en: 'Diverse Categories', ar: 'فئات متنوعة' }, description: { en: 'Thousands of questions covering culture, history, sports, and more.', ar: 'آلاف الأسئلة التي تغطي الثقافة والتاريخ والرياضة والمزيد.' } },
        { icon: 'Trophy', title: { en: 'Leaderboards', ar: 'لوحات الصدارة' }, description: { en: 'Compete for the top spot and showcase your trivia prowess.', ar: 'تنافس على المركز الأول واستعرض براعتك في المعلومات العامة.' } },
        { icon: 'Smartphone', title: { en: 'Sleek & Modern', ar: 'أنيق وعصري' }, description: { en: 'Enjoy a beautiful and user-friendly interface on all your devices.', ar: 'استمتع بواجهة جميلة وسهلة الاستخدام على جميع أجهزتك.' } },
    ],
    stats: [
        { value: '50+', label: { en: 'Categories', ar: 'فئات' } },
        { value: '200+', label: { en: 'Subcategories', ar: 'فئات فرعية' } },
        { value: '10K+', label: { en: 'Questions', ar: 'أسئلة' } },
    ],
    storeLinks: [
        { store: 'web', url: 'https://nabsh.fun', imageUrl: null, label: { en: 'Visit Website', ar: 'زيارة الموقع' } },
    ],
    heroImage: 'https://picsum.photos/1920/1080',
    heroImageHint: 'trivia quiz brain',
    heroVideo: 'https://nabsh.fun/videos/hero-animation-video.mp4',
    imageUrl: '/assets/images/nabsh_logo.png',
    imageHint: 'trivia game',
    videoUrl: 'https://www.youtube.com/embed/F0WBKweQ-NM',
    gallery: [
      { url: 'nabsh_logo.png', hint: 'NABSH logo' }
    ],
  },
  {
    id: 'power-of-bombs',
    slug: 'power-of-bombs',
    title: 'Power of Bombs',
    status: 'development',
    engine: 'Unreal Engine',
    logoUrl: '/components/images/powerofbombsIconTransparent.png',
    description: {
      en: 'An explosive action-packed arcade game. Strategize your way through challenging levels, plant bombs, and blast your enemies to bits!',
      ar: 'لعبة أركيد مليئة بالإثارة والمتفجرات. ضع استراتيجيتك عبر مستويات صعبة ، وازرع القنابل ، وانسف أعدائك إلى أشلاء!',
    },
    longDescription: {
        en: 'Dive into the explosive world of Power of Bombs! This is a top-down, action-packed arcade game that challenges your strategic thinking and reflexes. Navigate through intricate mazes, plant powerful bombs to clear paths and defeat unique enemies. With a variety of power-ups, challenging boss fights, and a retro-inspired aesthetic, Power of Bombs delivers hours of addictive fun.',
        ar: 'انغمس في عالم Power of Bombs المتفجر! هذه لعبة أركيد مليئة بالإثارة من منظور علوي تتحدى تفكيرك الاستراتيجي وردود أفعالك. تنقل عبر متاهات معقدة ، وازرع قنابل قوية لتمهيد الطرق وهزيمة الأعداء الفريدين. مع مجموعة متنوعة من معززات القوة ومعارك الزعماء الصعبة والجمالية المستوحاة من الطراز القديم ، تقدم Power of Bombs ساعات من المرح الإدماني.'
    },
    features: [
        { icon: 'Puzzle', title: { en: 'Strategic Levels', ar: 'مستويات استراتيجية' }, description: { en: 'Dozens of hand-crafted levels to test your wits.', ar: 'عشرات المستويات المصممة يدويًا لاختبار ذكائك.' } },
        { icon: 'Users', title: { en: 'Multiplayer Mayhem', ar: 'فوضى متعددة اللاعبين' }, description: { en: 'Compete against friends in local multiplayer battles.', ar: 'تنافس ضد الأصدقاء في معارك محلية متعددة اللاعبين.' } },
        { icon: 'Bolt', title: { en: 'Powerful Power-ups', ar: 'معززات قوة قوية' }, description: { en: 'Collect upgrades to increase your bomb range and power.', ar: 'اجمع الترقيات لزيادة مدى قنابلتك وقوتها.' } },
        { icon: 'ShieldCheck', title: { en: 'Epic Boss Fights', ar: 'معارك زعماء ملحمية' }, description: { en: 'Face off against challenging bosses with unique mechanics.', ar: 'واجه زعماء صعبين بآليات فريدة.' } },
    ],
    stats: [],
    storeLinks: [],
    heroImage: 'POPBackground.jpg',
    heroImageHint: 'POPBackground game art',
    heroVideo: null,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'explosion action',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gallery: [
      { url: 'POPOverview.jpg', hint: 'POPOverview gameplay' },
    ],
  },
  {
    id: 'koutq8',
    slug: 'koutq8',
    title: 'KoutQ8',
    status: 'released',
    engine: 'Unity',
    logoUrl: '/components/images/Koutq8Logo.png',
    description: {
      en: 'A digital adaptation of the popular traditional card game Kout. Play with friends online and prove you are the Kout master.',
      ar: 'نسخة رقمية من لعبة الورق التقليدية الشهيرة الكوت. العب مع الأصدقاء عبر الإنترنت وأثبت أنك سيد الكوت.',
    },
    longDescription: {
        en: 'Experience the classic card game Kout like never before. KoutQ8 brings the beloved traditional game to your fingertips, featuring polished graphics, smooth online multiplayer, and challenging AI opponents. Team up with a partner, bid on hands, and strategize to win. Whether you\'re a seasoned veteran or new to the game, KoutQ8 is the definitive digital Kout experience.',
        ar: 'جرب لعبة الكوت الكلاسيكية كما لم يحدث من قبل. KoutQ8 تجلب اللعبة التقليدية المحبوبة إلى أطراف أصابعك ، وتتميز برسومات مصقولة ، ولعب سلس متعدد اللاعبين عبر الإنترنت ، وخصوم ذكاء اصطناعي صعبين. كوّن فريقًا مع شريك ، وراهن على توزيعات الورق ، وضع استراتيجية للفوز. سواء كنت لاعبًا متمرسًا أو جديدًا في اللعبة ، فإن KoutQ8 هي تجربة الكوت الرقمية النهائية.'
    },
    features: [
        { icon: 'Users', title: { en: 'Online Multiplayer', ar: 'لعب جماعي عبر الإنترنت' }, description: { en: 'Play with friends and players from around the world.', ar: 'العب مع الأصدقاء واللاعبين من جميع أنحاء العالم.' } },
        { icon: 'Bot', title: { en: 'Challenging AI', ar: 'ذكاء اصطناعي صعب' }, description: { en: 'Hone your skills against our advanced AI partner and opponents.', ar: 'اصقل مهاراتك ضد شريكنا وخصومنا المتقدمين في الذكاء الاصطناعي.' } },
        { icon: 'Trophy', title: { en: 'Leaderboards & Stats', ar: 'لوحات الصدارة والإحصائيات' }, description: { en: 'Track your progress and climb the ranks to become the best.', ar: 'تتبع تقدمك وتسلق المراتب لتصبح الأفضل.' } },
        { icon: 'Smartphone', title: { en: 'Cross-Platform Play', ar: 'لعب عبر المنصات' }, description: { en: 'Play on your favorite device, with support for mobile and PC.', ar: 'العب على جهازك المفضل ، مع دعم للجوال والكمبيوتر الشخصي.' } },
    ],
    stats: [],
    storeLinks: [
        { store: 'App Store', url: 'https://apps.apple.com/app/id6738164175', imageUrl: 'downloadAppStoreImage.png', label: null },
    ],
    heroImage: 'https://picsum.photos/1920/1080',
    heroImageHint: 'playing cards',
    heroVideo: null,
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'card game',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    gallery: [
      { url: 'KoutQ8Image_1.png', hint: 'KoutQ8 gameplay screenshot 1' },
      { url: 'KoutQ8Image_2.png', hint: 'KoutQ8 gameplay screenshot 2' },
      { url: 'KoutQ8Image_3.png', hint: 'KoutQ8 gameplay screenshot 3' },
    ],
  },
  {
    id: 'luna-fantasy',
    slug: 'luna-fantasy',
    title: 'Luna Fantasy',
    status: 'released',
    engine: 'Next.js',
    logoUrl: '/assets/images/luna-fantasy_logo.png',
    description: {
      en: 'Official website for the Luna Fantasy Discord community - a massive fantasy universe featuring 200+ characters, a strategic card game, and immersive lore.',
      ar: 'الموقع الرسمي لمجتمع Luna Fantasy على Discord - عالم خيالي ضخم يضم أكثر من 200 شخصية، ولعبة بطاقات استراتيجية، وقصص غامرة.',
    },
    longDescription: {
        en: 'Luna Fantasy is a comprehensive companion platform for a thriving Discord fantasy community. The website showcases an interconnected universe with over 200 unique characters across 13 factions, a custom strategic card game with 7 rarity tiers, rich lore documenting The Great Chaos War, and a complete virtual economy system. Built with bilingual support for English and Arabic audiences.',
        ar: 'Luna Fantasy هي منصة شاملة لمجتمع Discord الخيالي المزدهر. يعرض الموقع عالمًا مترابطًا يضم أكثر من 200 شخصية فريدة عبر 13 فصيلة، ولعبة بطاقات استراتيجية مخصصة بـ 7 مستويات ندرة، وقصص غنية توثق حرب الفوضى العظمى، ونظام اقتصادي افتراضي كامل. مبني بدعم ثنائي اللغة للجماهير الإنجليزية والعربية.'
    },
    features: [
        { icon: 'Users', title: { en: 'Character Gallery', ar: 'معرض الشخصيات' }, description: { en: '200+ unique characters across 13 factions with detailed lore and profiles.', ar: 'أكثر من 200 شخصية فريدة عبر 13 فصيلة مع قصص وملفات تعريف مفصلة.' } },
        { icon: 'Puzzle', title: { en: 'Strategic Card Game', ar: 'لعبة بطاقات استراتيجية' }, description: { en: 'Custom card game system with 7 rarity tiers and 200+ collectible cards.', ar: 'نظام لعبة بطاقات مخصص مع 7 مستويات ندرة وأكثر من 200 بطاقة قابلة للجمع.' } },
        { icon: 'BookOpen', title: { en: 'Rich Lore & Chronicles', ar: 'قصص وسجلات غنية' }, description: { en: 'Epic narrative spanning The Great Chaos War and centuries of history.', ar: 'سرد ملحمي يمتد عبر حرب الفوضى العظمى وقرون من التاريخ.' } },
        { icon: 'Wallet', title: { en: 'Virtual Economy', ar: 'اقتصاد افتراضي' }, description: { en: 'Complete banking system with loans, trading, and VIP memberships.', ar: 'نظام مصرفي كامل مع قروض وتداول وعضويات VIP.' } },
    ],
    stats: [
        { value: '200+', label: { en: 'Characters', ar: 'شخصية' } },
        { value: '13', label: { en: 'Factions', ar: 'فصيلة' } },
        { value: '7', label: { en: 'Card Rarities', ar: 'مستويات ندرة' } },
    ],
    storeLinks: [
        { store: 'web', url: 'https://luna-fantasy.com', imageUrl: null, label: { en: 'Visit Website', ar: 'زيارة الموقع' } },
    ],
    heroImage: 'https://luna-fantasy.com/images/luna-fantasy.png',
    heroImageHint: 'fantasy card game universe',
    heroVideo: null,
    imageUrl: '/assets/images/luna-fantasy_logo.png',
    imageHint: 'luna fantasy logo',
    videoUrl: null,
    gallery: [],
  },
];

    
