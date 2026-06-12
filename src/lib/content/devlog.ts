
export const devlogContent = {
  en: {
    page_title: 'Vlogs & Behind the Scenes',
    page_subtitle: 'See how we make our games — behind-the-scenes footage, feature breakdowns, and studio updates on our official YouTube channel.',
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
    page_title: 'مدونات الفيديو وما وراء الكواليس',
    page_subtitle: 'شاهد كيف نصنع ألعابنا - لقطات من وراء الكواليس، وتحليلات للميزات، وتحديثات الاستوديو على قناتنا الرسمية على يوتيوب.',
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
 * Slugs, titles and descriptions are derived from the video alt texts above;
 * youtubeIds are extracted from the youtu.be URLs (the segment after youtu.be/,
 * before the query string). Arabic copy targets real GCC search phrases for
 * each topic.
 */
export type DevlogPost = {
  slug: string;
  youtubeId: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
};

export const devlogPosts: DevlogPost[] = [
  {
    slug: 'devlog-game-audio-design',
    youtubeId: 'Rt2zSXYjxg4',
    title: {
      en: 'Game Audio Design',
      ar: 'تصميم صوت الألعاب',
    },
    description: {
      en: 'A behind-the-scenes devlog on game audio design at Buried Games Studio — how we craft sound effects, music, and audio cues that bring our games to life.',
      ar: 'مدونة تطوير من وراء الكواليس عن تصميم صوت الألعاب في استوديو بريد جيمز — كيف نصنع المؤثرات الصوتية والموسيقى والإشارات الصوتية التي تبثّ الحياة في ألعابنا.',
    },
  },
  {
    slug: 'devlog-level-design',
    youtubeId: 'ivS3ypjdUtA',
    title: {
      en: 'Level Design',
      ar: 'تصميم المراحل',
    },
    description: {
      en: 'A behind-the-scenes devlog on level design — how we plan, build, and balance game levels that keep players engaged from start to finish.',
      ar: 'مدونة تطوير من وراء الكواليس عن تصميم المراحل — كيف نخطّط ونبني ونوازن مراحل اللعبة لإبقاء اللاعبين منغمسين من البداية حتى النهاية.',
    },
  },
  {
    slug: 'devlog-character-animation',
    youtubeId: 'uiBltx7SHdA',
    title: {
      en: 'Character Animation',
      ar: 'تحريك الشخصيات',
    },
    description: {
      en: 'A behind-the-scenes devlog on character animation — our workflow for rigging, animating, and bringing personality to the characters in our games.',
      ar: 'مدونة تطوير من وراء الكواليس عن تحريك الشخصيات — سير عملنا في تصميم الهياكل العظمية والتحريك ومنح الشخصيات في ألعابنا طابعها الخاص.',
    },
  },
  {
    slug: 'devlog-ai-in-games',
    youtubeId: 'ZcT2WfDRMgQ',
    title: {
      en: 'AI in Games',
      ar: 'الذكاء الاصطناعي في الألعاب',
    },
    description: {
      en: 'A behind-the-scenes devlog on AI in games — how we use artificial intelligence to drive enemy behaviour, NPCs, and smarter gameplay systems.',
      ar: 'مدونة تطوير من وراء الكواليس عن الذكاء الاصطناعي في الألعاب — كيف نستخدم الذكاء الاصطناعي لتحريك سلوك الأعداء والشخصيات غير القابلة للعب وأنظمة لعب أكثر ذكاءً.',
    },
  },
  {
    slug: 'devlog-unity-vs-unreal',
    youtubeId: 'ygPjpaLWyzE',
    title: {
      en: 'Unity vs Unreal',
      ar: 'مقارنة بين Unity و Unreal',
    },
    description: {
      en: 'A devlog comparing Unity vs Unreal Engine — the strengths, trade-offs, and how we choose the right game engine for each Buried Games project.',
      ar: 'مدونة تطوير تقارن بين محرّكَي Unity و Unreal — نقاط القوة والمفاضلات وكيف نختار محرّك الألعاب المناسب لكل مشروع في استوديو بريد جيمز.',
    },
  },
  {
    slug: 'devlog-game-release-strategy',
    youtubeId: '9mlvZXzy9ok',
    title: {
      en: 'Game Release Strategy',
      ar: 'استراتيجية إطلاق الألعاب',
    },
    description: {
      en: 'A devlog on game release strategy — how we plan launches, build hype, and bring a finished game to players across the GCC and beyond.',
      ar: 'مدونة تطوير عن استراتيجية إطلاق الألعاب — كيف نخطّط لإطلاق الألعاب ونبني الحماس ونوصل اللعبة المكتملة إلى اللاعبين في الخليج وخارجه.',
    },
  },
];
