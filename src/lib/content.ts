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
        { q: 'What platforms do you develop for?', a: 'We primarily develop for PC, and mobile (iOS and Android). We are always exploring new platforms like consoles.' },
        { q: 'Are you available for hire or contract work?', a: 'Yes, we are open to discussing contract work and partnerships. Please use the contact form to get in touch with us.' },
        { q: 'Where can I buy your games?', a: 'Our games are available on various digital storefronts like Steam, the App Store, and Google Play. Links can be found on each game\'s page.' },
        { q: 'Do you offer internships?', a: 'We occasionally have internship opportunities. Keep an eye on our social media channels for any announcements.' },
      ],
    },
    ar: {
      title: 'الأسئلة الشائعة',
      items: [
        { q: 'ما هي المنصات التي تطورون لها؟', a: 'نحن نطور بشكل أساسي لأجهزة الكمبيوتر الشخصي والجوال (iOS و Android). نحن نستكشف دائمًا منصات جديدة مثل وحدات التحكم.' },
        { q: 'هل أنتم متاحون للتوظيف أو العمل بالعقود؟', a: 'نعم ، نحن منفتحون لمناقشة العمل بالعقود والشراكات. يرجى استخدام نموذج الاتصال للتواصل معنا.' },
        { q: 'أين يمكنني شراء ألعابكم؟', a: 'ألعابنا متاحة في متاجر رقمية مختلفة مثل Steam و App Store و Google Play. يمكن العثور على الروابط في صفحة كل لعبة.' },
        { q: 'هل تقدمون تدريبًا داخليًا؟', a: 'لدينا أحيانًا فرص تدريب. ترقبوا قنوات التواصل الاجتماعي الخاصة بنا للحصول على أي إعلانات.' },
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
