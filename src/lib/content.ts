import type { Language } from '@/contexts/language-context';

export const content = {
  about: {
    en: {
      title: 'About Buried Games',
      p1: 'Buried Games is a passionate game development studio dedicated to creating unique and engaging experiences. Our team of developers, designers, and artists work collaboratively to bring innovative ideas to life.',
      p2: 'Founded on the principle of "gameplay first," we believe in crafting games that are not only fun to play but also tell compelling stories. We specialize in a variety of genres, always looking to push the boundaries of interactive entertainment.',
    },
    ar: {
      title: 'حول بارييد جيمز',
      p1: 'بارييد جيمز هو استوديو تطوير ألعاب شغوف مكرس لإنشاء تجارب فريدة وجذابة. يعمل فريقنا من المطورين والمصممين والفنانين بشكل تعاوني لإحياء الأفكار المبتكرة.',
      p2: 'تأسسنا على مبدأ "اللعب أولاً" ، ونؤمن بصناعة ألعاب ليست ممتعة للعب فحسب ، بل تروي أيضًا قصصًا مقنعة. نحن متخصصون في مجموعة متنوعة من الأنواع ، ونتطلع دائمًا إلى دفع حدود الترفيه التفاعلي.',
    },
  },
  services: {
    en: {
      title: 'Our Services',
      items: [
        { name: 'Full Game Development', description: 'From concept to launch, we handle the entire game development lifecycle.' },
        { name: 'Game Design & Prototyping', description: 'We craft compelling game mechanics and build prototypes to test ideas.' },
        { name: '2D & 3D Art/Animation', description: 'Our artists create stunning visuals and animations that bring worlds to life.' },
        { name: 'Mobile Game Porting', description: 'We adapt and optimize games for a seamless experience on mobile devices.' },
      ],
    },
    ar: {
      title: 'خدماتنا',
      items: [
        { name: 'تطوير الألعاب بالكامل', description: 'من الفكرة إلى الإطلاق ، نتعامل مع دورة حياة تطوير اللعبة بأكملها.' },
        { name: 'تصميم الألعاب والنماذج الأولية', description: 'نصنع آليات لعب مقنعة ونبني نماذج أولية لاختبار الأفكار.' },
        { name: 'فن ورسوم متحركة ثنائية وثلاثية الأبعاد', description: 'يبتكر فنانونا صورًا ورسومًا متحركة مذهلة تبث الحياة في العوالم.' },
        { name: 'نقل الألعاب إلى الجوال', description: 'نقوم بتكييف الألعاب وتحسينها لتجربة سلسة على الأجهزة المحمولة.' },
      ],
    },
  },
  games: [
    {
      id: 'power-of-bombs',
      title: 'Power of Bombs',
      description: {
        en: 'An explosive action-packed arcade game. Strategize your way through challenging levels, plant bombs, and blast your enemies to bits!',
        ar: 'لعبة أركيد مليئة بالإثارة والمتفجرات. ضع استراتيجيتك عبر مستويات صعبة ، وازرع القنابل ، وانسف أعدائك إلى أشلاء!',
      },
      imageUrl: 'https://placehold.co/600x400.png',
      imageHint: 'explosion action',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      gallery: [
        { url: 'https://placehold.co/1280x720.png', hint: 'gameplay screenshot' },
        { url: 'https://placehold.co/1280x720.png', hint: 'character art' },
        { url: 'https://placehold.co/1280x720.png', hint: 'level design' },
      ],
    },
    {
      id: 'koutq8',
      title: 'KoutQ8',
      description: {
        en: 'A digital adaptation of the popular traditional card game from Kuwait. Play with friends online and prove you are the Kout master.',
        ar: 'نسخة رقمية من لعبة الورق التقليدية الشهيرة من الكويت. العب مع الأصدقاء عبر الإنترنت وأثبت أنك سيد الكوت.',
      },
      imageUrl: 'https://placehold.co/600x400.png',
      imageHint: 'card game',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      gallery: [
        { url: 'https://placehold.co/1280x720.png', hint: 'game lobby' },
        { url: 'https://placehold.co/1280x720.png', hint: 'card design' },
        { url: 'https://placehold.co/1280x720.png', hint: 'gameplay interface' },
      ],
    },
  ],
  faq: {
    en: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'What does Buried Games Studio specialize in?', a: 'Buried Games Studio specializes in developing indie strategy and multiplayer games using Unity and Unreal Engine, based in Kuwait.' },
        { q: 'What games has Buried Games Studio developed?', a: 'We have developed \'Power of Bombs\', a tactical PC strategy game, and \'KoutQ8\', a digital version of the traditional Kuwaiti card game Kout with AI-powered gameplay.' },
        { q: 'What game engines do you use?', a: 'We use Unity and Unreal Engine to build our games, depending on the project scope, genre, and platform requirements.' },
        { q: 'What platforms are your games available on?', a: 'Our games are developed for PC and will be released through platforms like Steam, itch.io, and direct download from our website. We also port games to mobile (iOS & Android).' },
        { q: 'Where is Buried Games Studio located?', a: 'We are proudly based in Kuwait, developing high-quality indie games that represent Middle Eastern creativity in the global gaming industry.' },
        { q: 'Do you teach game development?', a: 'Yes, we publish game development tutorials, devlogs, and tips on our official YouTube channel, covering Unity, Unreal Engine, and indie game production.' },
        { q: 'How can I collaborate with Buried Games Studio?', a: 'We\'re open to partnerships, publishing, and creative collaborations. Please use the contact form or reach out via WhatsApp/email to connect with our team.' },
        { q: 'Can I submit a game idea to you?', a: 'We appreciate the enthusiasm! However, for legal reasons, we cannot accept unsolicited game ideas or submissions. We focus on developing our original in-house projects.' },
        { q: 'How can I stay updated on new games and announcements?', a: 'The best way to stay in the loop is by following us on our social media channels like YouTube, Twitter, and Instagram! You can find all the links in our website footer.' },
        { q: 'Do you offer internships or job opportunities?', a: 'We post any available job or internship openings on our LinkedIn page. We recommend following us there for the latest career opportunities at Buried Games Studio.' },
      ],
    },
    ar: {
      title: 'الأسئلة الشائعة',
      items: [
        { q: 'ما هو تخصص استوديو Buried Games؟', a: 'يختص استوديو Buried Games في تطوير ألعاب استراتيجية ومستقلة متعددة اللاعبين باستخدام Unity وUnreal Engine، ويقع مقره في الكويت.' },
        { q: 'ما هي الألعاب التي طورها استوديو Buried Games؟', a: 'قمنا بتطوير لعبة \'Power of Bombs\'، وهي لعبة استراتيجية تكتيكية للحاسوب، ولعبة \'KoutQ8\'، وهي نسخة رقمية من لعبة الكوت الكويتية التقليدية مع لعب مدعوم بالذكاء الاصطناعي.' },
        { q: 'ما هي محركات الألعاب التي تستخدمونها؟', a: 'نستخدم محركي Unity وUnreal Engine لبناء ألعابنا، اعتمادًا على نطاق المشروع ونوعه ومتطلبات المنصة.' },
        { q: 'على أي منصات تتوفر ألعابكم؟', a: 'نقوم بتطوير ألعابنا لأجهزة الحاسوب، وسيتم إطلاقها عبر منصات مثل Steam وitch.io والتحميل المباشر من موقعنا. كما نقوم بنقل الألعاب إلى الجوال (iOS و Android).' },
        { q: 'أين يقع مقر استوديو Buried Games؟', a: 'نحن نفتخر بأننا متواجدون في الكويت، حيث نطور ألعابًا مستقلة عالية الجودة تمثل الإبداع في الشرق الأوسط في صناعة الألعاب العالمية.' },
        { q: 'هل تقدمون دروسًا في تطوير الألعاب؟', a: 'نعم، ننشر دروسًا تعليمية وسجلات تطوير ونصائح على قناتنا الرسمية في يوتيوب، تغطي Unity وUnreal Engine وإنتاج الألعاب المستقلة.' },
        { q: 'كيف يمكنني التعاون مع استوديو Buried Games؟', a: 'نحن منفتحون على الشراكات وفرص النشر والتعاونات الإبداعية. يرجى استخدام نموذج الاتصال أو التواصل عبر واتساب/البريد الإلكتروني للتواصل مع فريقنا.' },
        { q: 'هل يمكنني تقديم فكرة لعبة لكم؟', a: 'نحن نقدر حماسكم! ومع ذلك، لأسباب قانونية، لا يمكننا قبول أفكار أو تقديمات ألعاب غير مرغوب فيها. نحن نركز على تطوير مشاريعنا الداخلية الأصلية.' },
        { q: 'كيف يمكنني البقاء على اطلاع بألعابكم وإعلاناتكم الجديدة؟', a: 'أفضل طريقة للبقاء على اطلاع هي متابعتنا على قنوات التواصل الاجتماعي الخاصة بنا مثل يوتيوب وتويتر وإنستغرام! يمكنك العثور على جميع الروابط في تذييل موقعنا.' },
        { q: 'هل تقدمون فرص تدريب أو وظائف؟', a: 'نقوم بنشر أي فرص عمل أو تدريب متاحة على صفحتنا في LinkedIn. نوصي بمتابعتنا هناك للحصول على أحدث الفرص الوظيفية في استوديو Buried Games.' },
      ],
    },
  },
};

export const getTranslation = (language: Language) => ({
  about: content.about[language],
  services: content.services[language],
  games: content.games.map(game => ({ ...game, description: game.description[language] })),
  faq: content.faq[language],
});
