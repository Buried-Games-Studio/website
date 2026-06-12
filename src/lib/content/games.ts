
/**
 * Localized rich-content blocks rendered as distinct <h2> sections on each game
 * detail page. Keeping them structured (rather than one long paragraph) lets the
 * detail page expose proper heading hierarchy and gives search engines several
 * substantial, unique passages per game per locale instead of a single thin blurb.
 *
 * `seoMeta` carries the accurate JSON-LD facts (genre, platforms, languages, and
 * a real datePublished only where confirmed from a live source — see notes inline).
 */

export const gamesContent = [
  {
    id: 'arrab',
    slug: 'arrab',
    title: 'Arrab',
    status: 'development',
    engine: 'Next.js / NestJS',
    logoUrl: 'https://assets.buriedgames.com/images/games/arrab/logo.png',
    description: {
      en: 'The ultimate social deduction experience — a premium multiplayer Mafia game with real-time gameplay, 11 unique roles, and a cinematic noir atmosphere.',
      ar: 'تجربة الخداع الاجتماعي المطلقة — لعبة مافيا متعددة اللاعبين بأجواء سينمائية، 11 دورًا فريدًا، ولعب جماعي في الوقت الفعلي.',
    },
    longDescription: {
      en: 'Arrab (العراب) is a premium web-based Mafia/Werewolf game designed as the definitive social deduction experience for the Arab world. Featuring 11 unique roles across three teams — Mafia, Town, and Neutral — players engage in strategic deception through day discussions, nighttime actions, and dramatic voting eliminations. With a cinematic "Midnight Lounge" aesthetic, real-time multiplayer via Socket.IO, and full Arabic/English bilingual support, Arrab transforms classic party gameplay into a polished digital experience.',
      ar: 'العرّاب هي لعبة مافيا/ذئب متعددة اللاعبين مصممة كتجربة خداع اجتماعي نهائية للعالم العربي. تضم 11 دورًا فريدًا عبر ثلاث فرق — المافيا والمدينة والمحايد — يشارك اللاعبون في خداع استراتيجي عبر مناقشات نهارية وأفعال ليلية وتصويت درامي. بجماليات "الصالة الليلية" السينمائية واللعب الجماعي في الوقت الفعلي ودعم ثنائي اللغة، يحوّل العرّاب لعب الحفلات الكلاسيكي إلى تجربة رقمية مصقولة.',
    },
    sections: {
      overview: {
        en: 'Arrab (العرّاب) is a web-based social deduction game built by our GCC game development studio for players across the Gulf and the wider Arab world. It takes the timeless party format of Mafia and Werewolf — a hidden circle of culprits versus an uninformed majority — and rebuilds it as a polished, real-time online experience with a cinematic "Midnight Lounge" identity. Every session is a battle of bluffing, reading faces, and surviving the vote, whether you are gathered around one table passing a phone or connected from different cities. Arrab is designed first for Arabic speakers, with a fully right-to-left interface and natural Arabic role names, while remaining completely playable in English.',
        ar: 'العرّاب لعبة خداع اجتماعي على الويب طوّرها استوديو تطوير الألعاب الخليجي لدينا للاعبين في الخليج والعالم العربي عمومًا. تأخذ القالب الخالد للعبة المافيا والذئب — دائرة خفية من المذنبين في مواجهة أغلبية لا تعرف هوياتهم — وتعيد بناءه كتجربة أونلاين مصقولة في الوقت الفعلي بهوية "الصالة الليلية" السينمائية. كل جولة معركة من المراوغة وقراءة الوجوه والنجاة من التصويت، سواء كنتم مجتمعين حول طاولة واحدة تتناقلون الهاتف أو متصلين من مدن مختلفة. صُمم العرّاب أولًا للناطقين بالعربية بواجهة كاملة من اليمين إلى اليسار وأسماء أدوار عربية طبيعية، مع بقائه قابلًا للعب بالكامل بالإنجليزية.',
      },
      howToPlay: {
        en: 'A game of Arrab runs in alternating night and day phases. At night the Mafia secretly choose a target while the Town\'s special roles act in the shadows — the Doctor saves, the Detective investigates, the Bodyguard protects, the Sniper takes a shot. When day breaks, survivors debate who among them is lying, accuse one another, and cast votes to eliminate a suspect. The Mafia win by reaching parity with the Town; the Town wins by uncovering and voting out every culprit; and the Neutral roles chase their own private victory conditions. Reading hesitation, defending the innocent, and timing your accusations are everything — Arrab handles the rules, timers, and night resolution automatically so the group can focus purely on the social game.',
        ar: 'تجري جولة العرّاب في مراحل متناوبة بين الليل والنهار. ليلًا تختار المافيا هدفها سرًا بينما تتحرك أدوار المدينة الخاصة في الخفاء — الدكتور ينقذ والمحقق يحقق والحارس الشخصي يحمي والقنّاص يطلق رصاصته. ومع بزوغ النهار يتجادل الناجون حول من يكذب بينهم، ويتبادلون الاتهامات، ويصوّتون لإقصاء أحد المشتبه بهم. تفوز المافيا حين تتساوى أعدادها مع المدينة، وتفوز المدينة بكشف كل المذنبين وإقصائهم بالتصويت، بينما تلاحق الأدوار المحايدة شروط فوزها الخاصة. قراءة التردد والدفاع عن الأبرياء وتوقيت اتهاماتك هي كل شيء — يتولى العرّاب القواعد والمؤقتات وحسم الليل تلقائيًا ليتفرغ الجميع للعبة الاجتماعية بحتة.',
      },
      whereToPlay: {
        en: 'Arrab is a web game that runs in the browser on phones, tablets, and desktops — no download or app store needed, which makes it ideal for spontaneous game nights. The game is currently in active development; follow Buried Games to know when public rooms open. Because it is built as a progressive web experience with full Arabic RTL support, it is equally at home for players in Kuwait, Saudi Arabia, the UAE, and across the GCC.',
        ar: 'العرّاب لعبة ويب تعمل في المتصفح على الهواتف والأجهزة اللوحية وأجهزة سطح المكتب — بلا تنزيل أو متجر تطبيقات، ما يجعلها مثالية لليالي اللعب العفوية. اللعبة قيد التطوير النشط حاليًا؛ تابع بريد جيمز لتعرف موعد فتح الغرف العامة. وبما أنها مبنية كتجربة ويب تقدمية بدعم عربي كامل من اليمين إلى اليسار، فهي مناسبة تمامًا للاعبين في الكويت والسعودية والإمارات وعبر دول الخليج.',
      },
      developmentStory: {
        en: 'We started Arrab because the Mafia format is a staple of Gulf diwaniyas, majlis evenings, and student gatherings, yet almost every digital version is English-first and built for Western audiences. As a GCC game development studio rooted in Gulf culture, we wanted an experience that feels native in Arabic from the very first screen. The engineering centres on a real-time multiplayer layer built with Socket.IO so that votes, accusations, and night actions sync instantly across every player, while the "Midnight Lounge" art direction — ornate role icons, ambient sound, and a smoky noir palette — gives the classic party game a premium, modern face.',
        ar: 'بدأنا العرّاب لأن قالب المافيا ركيزة في دواوين الخليج وأمسيات المجالس وتجمعات الطلبة، ومع ذلك فإن معظم النسخ الرقمية تأتي بالإنجليزية أولًا ومصممة للجمهور الغربي. وبصفتنا استوديو تطوير ألعاب خليجيًا متجذرًا في ثقافة الخليج، أردنا تجربة تشعر أنها عربية أصيلة منذ الشاشة الأولى. تتمحور الهندسة حول طبقة لعب جماعي في الوقت الفعلي مبنية بتقنية Socket.IO لتتزامن الأصوات والاتهامات والأفعال الليلية فوريًا بين جميع اللاعبين، بينما يمنح التوجيه الفني لـ"الصالة الليلية" — أيقونات الأدوار المزخرفة والصوت المحيط ولوحة النوار المدخّنة — لعبة الحفلات الكلاسيكية وجهًا عصريًا فاخرًا.',
      },
    },
    seoMeta: {
      genre: ['Social Deduction', 'Party', 'Multiplayer', 'Strategy'],
      platforms: ['Web Browser', 'PC'],
      // No confirmed public release date — game is in development. Omit datePublished.
    },
    features: [
      { icon: 'Users', title: { en: 'Real-Time Multiplayer', ar: 'لعب جماعي مباشر' }, description: { en: 'Play with friends in real-time via Socket.IO — designed for in-person game nights with digital moderation.', ar: 'العب مع الأصدقاء في الوقت الفعلي — مصمم لليالي اللعب الجماعي مع إدارة رقمية.' } },
      { icon: 'ShieldCheck', title: { en: '11 Unique Roles', ar: '11 دورًا فريدًا' }, description: { en: 'From the Godfather to the Jester — each role has unique night actions and win conditions across three teams.', ar: 'من العرّاب إلى المهرج — لكل دور أفعال ليلية فريدة وشروط فوز عبر ثلاث فرق.' } },
      { icon: 'Bolt', title: { en: 'Cinematic Design', ar: 'تصميم سينمائي' }, description: { en: 'A premium "Midnight Lounge" aesthetic with ornate role icons, ambient soundscapes, and immersive animations.', ar: 'جماليات "الصالة الليلية" الفاخرة مع أيقونات أدوار مزخرفة وأصوات محيطة ورسوم متحركة غامرة.' } },
      { icon: 'Globe', title: { en: 'Bilingual AR/EN', ar: 'ثنائي اللغة' }, description: { en: 'Full Arabic and English support with RTL layout — built for the Arab gaming community.', ar: 'دعم كامل للعربية والإنجليزية مع تخطيط RTL — مصمم لمجتمع الألعاب العربي.' } },
    ],
    stats: [
      { value: '11', label: { en: 'Unique Roles', ar: 'دور فريد' } },
      { value: '3', label: { en: 'Teams', ar: 'فرق' } },
      { value: '∞', label: { en: 'Game Nights', ar: 'ليالي لعب' } },
    ],
    storeLinks: [],
    heroImage: 'https://assets.buriedgames.com/images/games/arrab/hero-bg.png',
    heroImageHint: 'dark mafia noir lounge',
    heroVideo: null,
    imageUrl: 'https://assets.buriedgames.com/images/games/arrab/hero-right.png',
    imageHint: 'mafia godfather silhouette',
    videoUrl: null,
    gallery: [
      { url: 'https://assets.buriedgames.com/images/games/arrab/hero-bg.png', hint: 'Noir lounge background' },
      { url: 'https://assets.buriedgames.com/images/games/arrab/hero-right.png', hint: 'Godfather silhouette' },
    ],
    roles: [
      { id: 'godfather', team: 'mafia', name: { en: 'Godfather', ar: 'العرّاب' }, action: { en: 'Kill', ar: 'قتل' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/godfather.png' },
      { id: 'mafia-member', team: 'mafia', name: { en: 'Mafia Member', ar: 'عضو المافيا' }, action: { en: 'Kill', ar: 'قتل' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/mafia-member.png' },
      { id: 'barman', team: 'mafia', name: { en: 'Barman', ar: 'البارمان' }, action: { en: 'Block', ar: 'حظر' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/barman.png' },
      { id: 'doctor', team: 'town', name: { en: 'Doctor', ar: 'الدكتور' }, action: { en: 'Save', ar: 'إنقاذ' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/doctor.png' },
      { id: 'detective', team: 'town', name: { en: 'Detective', ar: 'المحقق' }, action: { en: 'Investigate', ar: 'تحقيق' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/detective.png' },
      { id: 'bodyguard', team: 'town', name: { en: 'Bodyguard', ar: 'الحارس الشخصي' }, action: { en: 'Protect', ar: 'حماية' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/bodyguard.png' },
      { id: 'sniper', team: 'town', name: { en: 'Sniper', ar: 'القنّاص' }, action: { en: 'Snipe', ar: 'قنص' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/sniper.png' },
      { id: 'villager', team: 'town', name: { en: 'Villager', ar: 'المواطن' }, action: { en: 'Vote', ar: 'تصويت' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/villager.png' },
      { id: 'jester', team: 'neutral', name: { en: 'Jester', ar: 'المهرج' }, action: { en: 'Deceive', ar: 'خداع' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/jester.png' },
      { id: 'serial-killer', team: 'neutral', name: { en: 'Serial Killer', ar: 'القاتل المتسلسل' }, action: { en: 'Kill', ar: 'قتل' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/serial-killer.png' },
      { id: 'kamikaze', team: 'town', name: { en: 'Kamikaze', ar: 'الانتحاري' }, action: { en: 'Sacrifice', ar: 'تضحية' }, image: 'https://assets.buriedgames.com/images/games/arrab/roles/kamikaze.png' },
    ],
  },
  {
    id: 'nabsh',
    slug: 'nabsh',
    title: 'Nabsh',
    status: 'released',
    engine: 'Next.js',
    logoUrl: 'https://assets.buriedgames.com/images/nabsh_logo.png',
    description: {
      en: 'A thrilling trivia web game that tests your knowledge on a wide range of topics. Challenge friends and climb the ranks!',
      ar: 'لعبة معلومات عامة مثيرة على الويب تختبر معلوماتك في مجموعة واسعة من المواضيع. تحدَّ أصدقاءك وتصدر قائمة المتصدرين!',
    },
    longDescription: {
        en: 'Nabsh is the ultimate trivia challenge! Compete with players in real-time, answer questions across various categories like history, culture, sports, and more. With a sleek design, engaging gameplay, and social features, Nabsh is the perfect game to prove your knowledge and have fun with friends and family.',
        ar: 'نبش هو التحدي النهائي للمعلومات العامة! تنافس مع اللاعبين في الوقت الفعلي، وأجب عن أسئلة في فئات متنوعة مثل التاريخ والثقافة والرياضة والمزيد. بفضل التصميم الأنيق واللعب الجذاب والميزات الاجتماعية، يعد نبش اللعبة المثالية لإثبات معرفتك والاستمتاع مع الأصدقاء والعائلة.'
    },
    sections: {
      overview: {
        en: 'Nabsh (نبش) is a fast-paced online trivia game playable free in any browser at nabsh.fun. Built by our GCC game development studio for players across Kuwait and the Gulf, it pits you against friends and other players in real-time question battles spanning more than fifty categories — from Kuwaiti culture, movies, and songs to sports, cars, geography, and general knowledge. The name "نبش" means to dig and unearth, and that is exactly the feeling: every match digs into a different corner of what you know. With over two hundred subcategories and a deep, constantly growing question bank, no two rounds feel the same, which makes Nabsh a natural fit for family majlis nights, friendly competition, and quick solo sessions alike.',
        ar: 'نبش لعبة معلومات عامة سريعة الإيقاع على الإنترنت يمكن لعبها مجانًا في أي متصفح عبر nabsh.fun. طوّرها استوديو تطوير الألعاب الخليجي لدينا للاعبين في الكويت والخليج، وهي تضعك في مواجهة أصدقائك ولاعبين آخرين في معارك أسئلة في الوقت الفعلي تمتد عبر أكثر من خمسين فئة — من الثقافة الكويتية والأفلام والأغاني إلى الرياضة والسيارات والجغرافيا والمعلومات العامة. واسم "نبش" يعني التنقيب والاستخراج، وهذا تمامًا هو الإحساس: كل جولة تنبش زاوية مختلفة مما تعرفه. ومع أكثر من مئتي فئة فرعية وبنك أسئلة عميق ينمو باستمرار، لا تتشابه جولتان، ما يجعل نبش خيارًا طبيعيًا لأمسيات المجلس العائلية والمنافسة الودية والجولات الفردية السريعة على حد سواء.',
      },
      howToPlay: {
        en: 'Playing Nabsh is simple: open nabsh.fun, pick the categories you want, and start answering. Questions appear one after another and you race to choose the correct answer before the timer runs out — faster correct answers earn more points. In multiplayer matches you compete head-to-head against friends or other players in real time, watching the score swing with every question, and the final standings push you onto the leaderboards. The breadth of categories means you can lean into your strengths or deliberately challenge yourself on unfamiliar topics. Because everything runs in the browser, anyone can jump in instantly with nothing to install.',
        ar: 'لعب نبش بسيط: افتح nabsh.fun واختر الفئات التي تريدها وابدأ الإجابة. تظهر الأسئلة واحدًا تلو الآخر وتتسابق لاختيار الإجابة الصحيحة قبل نفاد المؤقت — والإجابات الصحيحة الأسرع تكسب نقاطًا أكثر. وفي المباريات الجماعية تتنافس وجهًا لوجه ضد أصدقائك أو لاعبين آخرين في الوقت الفعلي، وتراقب النتيجة تتأرجح مع كل سؤال، وتدفعك الترتيبات النهائية إلى لوحات الصدارة. واتساع الفئات يعني أنه يمكنك الاعتماد على نقاط قوتك أو تحدي نفسك عمدًا في مواضيع غير مألوفة. وبما أن كل شيء يعمل في المتصفح، يستطيع أي شخص الانضمام فورًا دون تثبيت أي شيء.',
      },
      whereToPlay: {
        en: 'Nabsh is a web game available now and completely free to play at nabsh.fun. It runs in the browser on phones, tablets, and computers with a responsive, modern interface, so there is no app download required and no platform left out — ideal for players across Kuwait and the GCC who want to jump straight into a match.',
        ar: 'نبش لعبة ويب متاحة الآن ومجانية بالكامل عبر nabsh.fun. تعمل في المتصفح على الهواتف والأجهزة اللوحية والحواسيب بواجهة عصرية متجاوبة، فلا حاجة لتنزيل تطبيق ولا منصة مستبعدة — مثالية للاعبين في الكويت والخليج الراغبين في خوض مباراة مباشرة.',
      },
      developmentStory: {
        en: 'Nabsh grew out of a simple observation: the trivia games people loved were rarely built for an Arab audience, and the questions that did exist seldom reflected Gulf culture. We set out to make a polished, genuinely local trivia experience — one where a "Kuwait" category sits proudly beside global topics, and where the interface feels native in Arabic. The technical challenge was the real-time multiplayer layer: keeping scores, timers, and questions perfectly in sync across competing players so a match feels live and fair. Nabsh is one of our released titles and continues to receive new categories and questions as the library grows.',
        ar: 'وُلد نبش من ملاحظة بسيطة: ألعاب المعلومات العامة التي يحبها الناس نادرًا ما صُممت لجمهور عربي، والأسئلة الموجودة قلّما عكست ثقافة الخليج. فانطلقنا لصنع تجربة معلومات عامة محلية حقًا ومصقولة — تجلس فيها فئة "الكويت" بفخر إلى جانب المواضيع العالمية، وتشعر فيها الواجهة أنها عربية أصيلة. وكان التحدي التقني هو طبقة اللعب الجماعي في الوقت الفعلي: إبقاء النقاط والمؤقتات والأسئلة متزامنة تمامًا بين اللاعبين المتنافسين ليشعر اللاعب أن المباراة حية وعادلة. ونبش أحد ألعابنا المنشورة، ويستمر في تلقي فئات وأسئلة جديدة مع نمو المكتبة.',
      },
    },
    seoMeta: {
      genre: ['Trivia', 'Quiz', 'Educational', 'Multiplayer'],
      platforms: ['Web Browser'],
      // nabsh.fun is live; no specific public launch date confirmed from a source. Omit datePublished.
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
    heroImage: 'https://assets.buriedgames.com/images/games/nabsh/hero.png',
    heroImageHint: 'trivia quiz brain',
    heroVideo: 'https://nabsh.fun/videos/hero-animation-video.mp4',
    imageUrl: 'https://assets.buriedgames.com/images/games/nabsh/hero.png',
    imageHint: 'trivia game',
    videoUrl: 'https://www.youtube.com/embed/F0WBKweQ-NM',
    categories: [
      { name: { en: 'Celebrities', ar: 'المشاهير' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/celebrities.jpg' },
      { name: { en: 'Movies', ar: 'افلام' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/movies.webp' },
      { name: { en: 'Sports', ar: 'رياضة' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/sports.webp' },
      { name: { en: 'Cars', ar: 'سيارات' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/cars.webp' },
      { name: { en: 'Animals', ar: 'حيوانات' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/animals.webp' },
      { name: { en: 'Cartoon', ar: 'رسوم متحركه' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/cartoon.webp' },
      { name: { en: 'Video Games', ar: 'الالعاب' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/videogames.jpg' },
      { name: { en: 'Songs', ar: 'اغاني' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/songs.webp' },
      { name: { en: 'Kuwait', ar: 'الكويت' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/kuwait.webp' },
      { name: { en: 'Mathematics', ar: 'رياضيات' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/math.webp' },
      { name: { en: 'Plays', ar: 'مسرحيات' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/plays.webp' },
      { name: { en: 'Perfumes', ar: 'عطورات عالميه' }, image: 'https://assets.buriedgames.com/images/games/nabsh/categories/perfumes.jpg' },
    ],
    gallery: [],
  },
  {
    id: 'power-of-bombs',
    slug: 'power-of-bombs',
    title: 'Power of Bombs',
    status: 'development',
    engine: 'Unreal Engine',
    logoUrl: 'https://assets.buriedgames.com/images/powerofbombsIconTransparent.png',
    description: {
      en: 'An explosive action-packed arcade game. Strategize your way through challenging levels, plant bombs, and blast your enemies to bits!',
      ar: 'لعبة أركيد مليئة بالإثارة والمتفجرات. ضع استراتيجيتك عبر مستويات صعبة، وازرع القنابل، وانسف أعداءك إلى أشلاء!',
    },
    longDescription: {
        en: 'Dive into the explosive world of Power of Bombs! This is a top-down, action-packed arcade game that challenges your strategic thinking and reflexes. Navigate through intricate mazes, plant powerful bombs to clear paths and defeat unique enemies. With a variety of power-ups, challenging boss fights, and a retro-inspired aesthetic, Power of Bombs delivers hours of addictive fun.',
        ar: 'انغمس في عالم Power of Bombs المتفجر! هذه لعبة أركيد مليئة بالإثارة من منظور علوي تتحدى تفكيرك الاستراتيجي وردود أفعالك. تنقّل عبر متاهات معقدة، وازرع قنابل قوية لتمهيد الطرق وهزيمة الأعداء الفريدين. مع مجموعة متنوعة من معززات القوة ومعارك الزعماء الصعبة والجمالية المستوحاة من الطراز القديم، تقدم Power of Bombs ساعات من المرح الإدماني.'
    },
    sections: {
      overview: {
        en: 'Power of Bombs is a top-down action arcade game built in Unreal Engine by our game development studio. It revives the explosive, maze-clearing spirit of classic bomber arcade games and rebuilds it with modern visuals, tighter controls, and a retro-inspired aesthetic. You move through grid-like mazes, drop bombs to blast open paths and crates, and detonate your way through waves of distinct enemies — all while keeping clear of your own blast radius. It is a game about reading the board, planning two moves ahead, and committing to the explosion at exactly the right moment.',
        ar: 'باور أوف بومبز لعبة أركيد أكشن من منظور علوي مبنية بمحرك Unreal Engine في استوديو تطوير الألعاب لدينا. تُحيي روح ألعاب القنابل الأركيدية الكلاسيكية المتفجرة وتعيد بناءها برسوميات عصرية وتحكم أدق وجمالية مستوحاة من الطراز القديم. تتنقل عبر متاهات شبكية، وتسقط القنابل لتفجير الممرات والصناديق، وتشق طريقك بالانفجارات عبر موجات من أعداء متمايزين — مع الحرص دائمًا على الابتعاد عن نطاق انفجارك. إنها لعبة عن قراءة الساحة والتخطيط لحركتين مقدمًا والالتزام بالانفجار في اللحظة المناسبة تمامًا.',
      },
      howToPlay: {
        en: 'The core loop is pure arcade tension. You plant bombs that explode after a short fuse in a cross-shaped blast, using them to destroy obstacles, open new routes, and catch enemies in the explosion. Power-ups scattered through each level extend your blast radius, let you carry more bombs at once, or boost your speed — so a careful run snowballs into spectacular chain detonations. Hand-crafted levels escalate in complexity, and challenging boss fights cap off stages with enemies that demand specific tactics. A local multiplayer mode turns the same maze into a friendly battlefield where the last bomber standing wins.',
        ar: 'الحلقة الأساسية توتر أركيدي خالص. تزرع قنابل تنفجر بعد فتيل قصير في انفجار صليبي الشكل، وتستخدمها لتدمير العوائق وفتح مسارات جديدة وإيقاع الأعداء في الانفجار. وتمنحك معززات القوة المنتشرة في كل مستوى مدى انفجار أوسع، أو قدرة على حمل قنابل أكثر دفعة واحدة، أو سرعة أعلى — فتتحول الجولة المحسوبة إلى سلاسل انفجارات مذهلة. وتتصاعد المستويات المصممة يدويًا في تعقيدها، وتختم معارك الزعماء الصعبة المراحل بأعداء يتطلبون تكتيكات محددة. ويحوّل طور اللعب الجماعي المحلي المتاهة نفسها إلى ساحة معركة ودية يفوز فيها آخر مفجّر يبقى صامدًا.',
      },
      whereToPlay: {
        en: 'Power of Bombs is currently in development and is being built for web and PC. It is not yet publicly available — follow Buried Games and our devlog to be the first to know when a playable build or release date is announced.',
        ar: 'باور أوف بومبز قيد التطوير حاليًا ويُبنى للويب والكمبيوتر الشخصي. وهو ليس متاحًا للعموم بعد — تابع بريد جيمز ومدونة التطوير لدينا لتكون أول من يعرف عند الإعلان عن نسخة قابلة للعب أو موعد إصدار.',
      },
      developmentStory: {
        en: 'Power of Bombs is our love letter to the bomber arcade genre that defined countless childhood game sessions. Choosing Unreal Engine let us push the visual fidelity and effects — every detonation should feel weighty and satisfying — while preserving the instantly readable, grid-based tactics that make the genre endlessly replayable. The hardest design work is balance: tuning blast timing, enemy behaviour, and power-up pacing so that levels stay fair but always one mistimed bomb away from chaos.',
        ar: 'باور أوف بومبز رسالة حب منا لنوع ألعاب القنابل الأركيدية الذي شكّل جلسات لعب لا تُحصى في الطفولة. وقد أتاح لنا اختيار محرك Unreal دفع جودة الصورة والمؤثرات — إذ يجب أن يشعر كل انفجار بثقله وإشباعه — مع الحفاظ على التكتيكات الشبكية الواضحة فورًا التي تجعل هذا النوع قابلًا لإعادة اللعب بلا نهاية. وأصعب أعمال التصميم هو التوازن: ضبط توقيت الانفجار وسلوك الأعداء وإيقاع معززات القوة بحيث تبقى المستويات عادلة لكنها دائمًا على بُعد قنبلة واحدة سيئة التوقيت من الفوضى.',
      },
    },
    seoMeta: {
      genre: ['Arcade', 'Action', 'Strategy'],
      platforms: ['Web Browser', 'PC'],
      // In development — no confirmed release date. Omit datePublished.
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
    imageUrl: 'https://assets.buriedgames.com/images/buriedgames_logo.png',
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
    logoUrl: 'https://assets.buriedgames.com/images/Koutq8Logo.png',
    description: {
      en: 'A digital adaptation of the popular traditional card game Kout. Play with friends online and prove you are the Kout master.',
      ar: 'نسخة رقمية من لعبة الورق التقليدية الشهيرة الكوت. العب مع الأصدقاء عبر الإنترنت وأثبت أنك سيد الكوت.',
    },
    longDescription: {
        en: 'Experience the classic card game Kout like never before. KoutQ8 brings the beloved traditional game to your fingertips, featuring polished graphics, smooth online multiplayer, and challenging AI opponents. Team up with a partner, bid on hands, and strategize to win. Whether you\'re a seasoned veteran or new to the game, KoutQ8 is the definitive digital Kout experience.',
        ar: 'جرب لعبة الكوت الكلاسيكية كما لم يحدث من قبل. KoutQ8 تجلب اللعبة التقليدية المحبوبة إلى أطراف أصابعك، وتتميز برسومات مصقولة، ولعب سلس متعدد اللاعبين عبر الإنترنت، وخصوم ذكاء اصطناعي صعبين. كوّن فريقًا مع شريك، وراهن على توزيعات الورق، وضع استراتيجية للفوز. سواء كنت لاعبًا متمرسًا أو جديدًا في اللعبة، فإن KoutQ8 هي تجربة الكوت الرقمية النهائية.'
    },
    sections: {
      overview: {
        en: 'KoutQ8 is a polished digital adaptation of Kout (الكوت), the trick-taking card game that is a fixture of Kuwaiti diwaniyas and family gatherings. Built in Unity by our game development studio, it brings the partner-based card game online with clean graphics, smooth online multiplayer, and AI opponents capable enough to practise against. Kout is deeply social — a four-player, two-against-two game of bidding and trick-taking where coordination with your partner matters as much as the cards in your hand — and KoutQ8 preserves that feel while removing the friction of needing four people in one room. It is, in short, the traditional Kuwaiti card game reimagined for your phone.',
        ar: 'KoutQ8 نسخة رقمية مصقولة من الكوت، لعبة الورق التي تُعد ركنًا ثابتًا في دواوين الكويت وتجمعات العائلة. مبنية بمحرك Unity في استوديو تطوير الألعاب لدينا، وهي تنقل لعبة الورق القائمة على الشراكة إلى الإنترنت برسوميات نظيفة ولعب جماعي سلس عبر الإنترنت وخصوم ذكاء اصطناعي بمستوى يكفي للتمرن. والكوت لعبة اجتماعية بعمق — أربعة لاعبين، فريقان اثنان ضد اثنين، يتنافسون في المزايدة وجمع الأكلات حيث يهم التنسيق مع شريكك بقدر ما تهم الأوراق في يدك — وتحافظ KoutQ8 على هذا الإحساس مع إزالة عناء الحاجة إلى أربعة أشخاص في غرفة واحدة. باختصار، هي لعبة الورق الكويتية التقليدية معاد تخيّلها لهاتفك.',
      },
      howToPlay: {
        en: 'In KoutQ8 you and a partner sit opposite each other against the other team. Each round begins with bidding — players declare how many tricks their side expects to win — and play then proceeds trick by trick, with the strongest card taking each hand. Strong play is about counting the cards, signalling intent to your partner through the order you play, and bidding accurately so you neither overcommit nor leave points on the table. You can play online against friends and other players or sharpen your strategy against the AI partner and opponents, with leaderboards and stats tracking your climb. The pacing, scoring, and dealing are all handled for you, so newcomers can learn by playing while veterans focus on the deeper strategy.',
        ar: 'في KoutQ8 تجلس أنت وشريكك متقابلين في مواجهة الفريق الآخر. تبدأ كل جولة بالمزايدة — يعلن اللاعبون عدد الأكلات التي يتوقع فريقهم الفوز بها — ثم يتقدم اللعب أكلة بأكلة، حيث تأخذ الورقة الأقوى كل جولة. واللعب الجيد قوامه عدّ الأوراق، وإشارة نواياك إلى شريكك عبر ترتيب لعبك، والمزايدة بدقة فلا تبالغ في الالتزام ولا تترك نقاطًا على الطاولة. يمكنك اللعب عبر الإنترنت ضد الأصدقاء ولاعبين آخرين أو صقل استراتيجيتك ضد شريك وخصوم الذكاء الاصطناعي، مع لوحات صدارة وإحصائيات تتابع صعودك. والإيقاع والنقاط والتوزيع كلها تُدار نيابة عنك، فيتعلم القادمون الجدد باللعب بينما يركّز المتمرسون على الاستراتيجية الأعمق.',
      },
      whereToPlay: {
        en: 'KoutQ8 is available now on the App Store for iPhone, where it is free to download. Search "KoutQ8" on the App Store, or use the download link on this page, to start playing. As one of our released titles aimed squarely at players in Kuwait and the GCC, it brings a beloved local card tradition to mobile.',
        ar: 'KoutQ8 متاحة الآن على App Store لأجهزة iPhone، حيث يمكن تنزيلها مجانًا. ابحث عن "KoutQ8" في App Store، أو استخدم رابط التنزيل في هذه الصفحة، لتبدأ اللعب. وبصفتها إحدى ألعابنا المنشورة الموجهة مباشرة للاعبين في الكويت والخليج، فهي تجلب تقليد ورق محليًا محبوبًا إلى الهاتف المحمول.',
      },
      developmentStory: {
        en: 'Kout is one of the most-played card games in Kuwait, yet a faithful, well-built digital version was surprisingly hard to find. We built KoutQ8 to fill that gap — to let people enjoy a proper game of Kout even when the four of them cannot gather in one majlis. The toughest part was the AI: a trick-taking partner game is hard to model well, because a good AI partner has to bid sensibly and play in coordination, not just legally. Pairing that with reliable online multiplayer in Unity gave us a release players can pick up whenever they want a round, against people or against the machine.',
        ar: 'الكوت من أكثر ألعاب الورق لعبًا في الكويت، ومع ذلك كان من المفاجئ صعوبة العثور على نسخة رقمية أمينة ومتقنة. بنينا KoutQ8 لسدّ هذه الفجوة — لنتيح للناس الاستمتاع بجولة كوت حقيقية حتى حين لا يستطيع الأربعة الاجتماع في مجلس واحد. وكان الجزء الأصعب هو الذكاء الاصطناعي: لعبة شراكة قائمة على جمع الأكلات يصعب نمذجتها جيدًا، لأن الشريك الذكي عليه أن يزايد بحكمة ويلعب بتنسيق، لا أن يلعب لعبًا قانونيًا فحسب. واقتران ذلك بلعب جماعي موثوق عبر الإنترنت في Unity منحنا إصدارًا يمكن للاعبين تشغيله متى أرادوا جولة، ضد أشخاص أو ضد الآلة.',
      },
    },
    seoMeta: {
      genre: ['Card Game', 'Strategy', 'Multiplayer'],
      platforms: ['iOS'],
      // Confirmed from the App Store listing (apps.apple.com/app/id6738164175): v1.0.0 released 2025-06-10.
      datePublished: '2025-06-10',
    },
    features: [
        { icon: 'Users', title: { en: 'Online Multiplayer', ar: 'لعب جماعي عبر الإنترنت' }, description: { en: 'Play with friends and players from around the world.', ar: 'العب مع الأصدقاء واللاعبين من جميع أنحاء العالم.' } },
        { icon: 'Bot', title: { en: 'Challenging AI', ar: 'ذكاء اصطناعي صعب' }, description: { en: 'Hone your skills against our advanced AI partner and opponents.', ar: 'اصقل مهاراتك ضد شريكنا وخصومنا المتقدمين في الذكاء الاصطناعي.' } },
        { icon: 'Trophy', title: { en: 'Leaderboards & Stats', ar: 'لوحات الصدارة والإحصائيات' }, description: { en: 'Track your progress and climb the ranks to become the best.', ar: 'تتبع تقدمك وتسلق المراتب لتصبح الأفضل.' } },
        { icon: 'Smartphone', title: { en: 'Built for Mobile', ar: 'مصمم للهاتف المحمول' }, description: { en: 'Available now on the App Store for iPhone, with a touch-first interface.', ar: 'متاحة الآن على App Store لأجهزة iPhone بواجهة تعتمد اللمس أولًا.' } },
    ],
    stats: [],
    storeLinks: [
        { store: 'App Store', url: 'https://apps.apple.com/app/id6738164175', imageUrl: 'downloadAppStoreImage.png', label: null },
    ],
    heroImage: '',
    heroImageHint: 'playing cards',
    heroVideo: 'https://assets.buriedgames.com/videos/koutq8-hero.mp4',
    imageUrl: 'https://assets.buriedgames.com/images/buriedgames_logo.png',
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
    logoUrl: 'https://assets.buriedgames.com/images/luna-fantasy_logo.png',
    description: {
      en: 'Official website for the Luna Fantasy Discord community - a massive fantasy universe featuring 200+ characters, a strategic card game, and immersive lore.',
      ar: 'الموقع الرسمي لمجتمع Luna Fantasy على Discord - عالم خيالي ضخم يضم أكثر من 200 شخصية، ولعبة بطاقات استراتيجية، وقصص غامرة.',
    },
    longDescription: {
        en: 'Luna Fantasy is a comprehensive companion platform for a thriving Discord fantasy community. The website showcases an interconnected universe with over 200 unique characters across 13 factions, a custom strategic card game with 7 rarity tiers, rich lore documenting The Great Chaos War, and a complete virtual economy system. Built with bilingual support for English and Arabic audiences.',
        ar: 'Luna Fantasy هي منصة شاملة لمجتمع Discord الخيالي المزدهر. يعرض الموقع عالمًا مترابطًا يضم أكثر من 200 شخصية فريدة عبر 13 فصيلة، ولعبة بطاقات استراتيجية مخصصة بـ 7 مستويات ندرة، وقصص غنية توثق حرب الفوضى العظمى، ونظام اقتصادي افتراضي كامل. مبني بدعم ثنائي اللغة للجماهير الإنجليزية والعربية.'
    },
    sections: {
      overview: {
        en: 'Luna Fantasy is a companion web platform our game development studio built for a thriving Discord fantasy community. It turns a sprawling, community-driven universe into an explorable website: a character gallery of more than two hundred unique characters spread across thirteen factions, a custom collectible card game with seven rarity tiers, deep lore chronicling the Great Chaos War, and a complete virtual economy. The site is fully bilingual in English and Arabic, so members can browse the world they help shape in either language.',
        ar: 'Luna Fantasy منصة ويب مرافقة بناها استوديو تطوير الألعاب لدينا لمجتمع Discord خيالي مزدهر. تحوّل عالمًا واسعًا يقوده المجتمع إلى موقع قابل للاستكشاف: معرض شخصيات يضم أكثر من مئتي شخصية فريدة موزعة عبر ثلاث عشرة فصيلة، ولعبة بطاقات قابلة للجمع مخصصة بسبعة مستويات ندرة، وقصص عميقة توثّق حرب الفوضى العظمى، واقتصاد افتراضي كامل. والموقع ثنائي اللغة بالكامل بالإنجليزية والعربية، فيتصفح الأعضاء العالم الذي يساهمون في تشكيله بأي من اللغتين.',
      },
      howToPlay: {
        en: 'Luna Fantasy is best understood as the living reference and card game for its Discord community. Members explore character profiles and faction lore, collect cards across the seven rarity tiers, and engage with a virtual economy that includes a banking system with loans, trading, and VIP memberships. The website binds these systems together so the strategic card game and the surrounding fiction stay consistent and discoverable in one place.',
        ar: 'تُفهم Luna Fantasy على أفضل وجه بوصفها المرجع الحي ولعبة البطاقات لمجتمعها على Discord. يستكشف الأعضاء ملفات الشخصيات وقصص الفصائل، ويجمعون البطاقات عبر مستويات الندرة السبعة، ويتفاعلون مع اقتصاد افتراضي يشمل نظامًا مصرفيًا بقروض وتداول وعضويات VIP. ويربط الموقع هذه الأنظمة معًا لتبقى لعبة البطاقات الاستراتيجية والقصص المحيطة بها متسقة وسهلة الاكتشاف في مكان واحد.',
      },
      whereToPlay: {
        en: 'The Luna Fantasy companion site is live on the web and accessible from any browser on phone or desktop, with full English and Arabic support. Visit the site to explore the characters, cards, and lore of the universe.',
        ar: 'موقع Luna Fantasy المرافق متاح على الويب ويمكن الوصول إليه من أي متصفح على الهاتف أو سطح المكتب، بدعم كامل بالإنجليزية والعربية. زر الموقع لاستكشاف شخصيات العالم وبطاقاته وقصصه.',
      },
      developmentStory: {
        en: 'Luna Fantasy was a fascinating brief: rather than designing a world from scratch, we built the digital home for one a community had already grown. That meant engineering for breadth — hundreds of interlinked characters, a multi-tier card system, and an in-fiction economy — while keeping the bilingual interface clean and fast. The project is one of our released web builds and a good example of how we treat content-heavy fan universes as first-class software.',
        ar: 'كانت Luna Fantasy مهمة مثيرة: فبدلًا من تصميم عالم من الصفر، بنينا البيت الرقمي لعالم نمّاه مجتمع بالفعل. وهذا تطلّب هندسةً للاتساع — مئات الشخصيات المترابطة، ونظام بطاقات متعدد المستويات، واقتصادًا داخل القصة — مع إبقاء الواجهة ثنائية اللغة نظيفة وسريعة. والمشروع أحد إصداراتنا المنشورة على الويب، ومثال جيد على كيفية تعاملنا مع عوالم المعجبين الغنية بالمحتوى بوصفها برمجيات من الدرجة الأولى.',
      },
    },
    seoMeta: {
      genre: ['Fantasy', 'Card Game', 'Role-Playing'],
      platforms: ['Web Browser'],
      // Live companion site; no specific launch date confirmed from a source. Omit datePublished.
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
        { store: 'web', url: 'https://lunarian.com', imageUrl: null, label: { en: 'Visit Website', ar: 'زيارة الموقع' } },
    ],
    heroImage: 'https://assets.buriedgames.com/images/games/luna-fantasy/hero.png',
    heroImageHint: 'fantasy card game universe',
    heroVideo: null,
    imageUrl: 'https://assets.buriedgames.com/images/games/luna-fantasy/hero.png',
    imageHint: 'luna fantasy characters',
    videoUrl: null,
    gallery: [
      { url: 'https://assets.buriedgames.com/images/games/luna-fantasy/our-characters.png', hint: 'Luna Fantasy characters gallery' },
      { url: 'https://assets.buriedgames.com/images/games/luna-fantasy/card-legendary.png', hint: 'Legendary rarity card' },
      { url: 'https://assets.buriedgames.com/images/games/luna-fantasy/card-epic.png', hint: 'Epic rarity card' },
      { url: 'https://assets.buriedgames.com/images/games/luna-fantasy/champion.png', hint: 'Champion story art' },
      { url: 'https://assets.buriedgames.com/images/games/luna-fantasy/char-sentinel.png', hint: 'Luna Sentinel character' },
      { url: 'https://assets.buriedgames.com/images/games/luna-fantasy/char-knight.png', hint: 'Luna Knight character' },
    ],
  },
  {
    id: 'gathered-by-the-light',
    slug: 'gathered-by-the-light',
    title: 'Gathered by the Light',
    status: 'completed',
    engine: 'Unity',
    logoUrl: 'https://assets.buriedgames.com/images/games/gbtl/logo.png',
    description: {
      en: 'A hand-crafted pixel-art 2D platformer about a young moth on a perilous journey through a dark forest to find a mysterious light. Built as a college capstone project.',
      ar: 'لعبة منصات ثنائية الأبعاد بفن البكسل عن فراشة صغيرة في رحلة خطيرة عبر غابة مظلمة للعثور على ضوء غامض. تم بناؤها كمشروع تخرج جامعي.',
    },
    longDescription: {
      en: 'Gathered by the Light is a heartfelt 2D pixel-art platformer that tells the story of a young moth separated from their parents, embarking on a dangerous journey through a dark, spider-infested forest in search of a mysterious light. Featuring hand-drawn pixel art, parallax scrolling environments, a grappling hook mechanic, an atmospheric intro comic, and a challenging spider boss fight — this game was developed as a university capstone project and represents the studio\'s roots in game design and interactive storytelling.',
      ar: 'Gathered by the Light هي لعبة منصات ثنائية الأبعاد بفن البكسل تحكي قصة فراشة صغيرة انفصلت عن والديها، وانطلقت في رحلة خطيرة عبر غابة مظلمة مليئة بالعناكب بحثًا عن ضوء غامض. تتميز بفن بكسل مرسوم يدويًا، وبيئات تمرير متوازية، وآلية خطاف تسلق، ومقدمة كوميكية جوية، ومعركة زعيم عنكبوت صعبة — تم تطوير هذه اللعبة كمشروع تخرج جامعي وتمثل جذور الاستوديو في تصميم الألعاب والسرد التفاعلي.',
    },
    sections: {
      overview: {
        en: 'Gathered by the Light is a hand-crafted 2D pixel-art platformer made in Unity. You play as a young moth separated from their parents, drawn through a dark, spider-infested forest toward a mysterious light. It is a small, heartfelt game built as a university capstone project — the kind of focused, complete experience that taught our team the fundamentals of game design, level building, and interactive storytelling before the studio took on larger titles. Every sprite, tileset, and animation was drawn pixel by pixel, giving the forest a tactile, storybook atmosphere.',
        ar: 'Gathered by the Light لعبة منصات ثنائية الأبعاد بفن بكسل مرسوم يدويًا، صُنعت بمحرك Unity. تلعب فيها دور فراشة صغيرة انفصلت عن والديها، تنجذب عبر غابة مظلمة مليئة بالعناكب نحو ضوء غامض. وهي لعبة صغيرة صادقة بُنيت كمشروع تخرج جامعي — من نوع التجارب المركّزة المكتملة التي علّمت فريقنا أساسيات تصميم الألعاب وبناء المراحل والسرد التفاعلي قبل أن يخوض الاستوديو عناوين أكبر. وقد رُسم كل عنصر وبلاطة ورسوم متحركة بكسلًا بكسل، ما منح الغابة أجواءً ملموسة أشبه بكتاب قصص.',
      },
      howToPlay: {
        en: 'The game is a side-scrolling platformer driven by precise movement and a physics-based grappling hook that lets the moth swing through the forest canopy and reach otherwise impossible ledges. You navigate hazards across parallax-scrolling levels, use checkpoints to recover from mistakes, and follow gentle on-screen hints that teach the controls as you go. The journey builds toward a multi-phase spider boss fight — the climactic test of everything the levels have taught you. A short pixel-art comic opens the game and sets the emotional stakes of the moth\'s search.',
        ar: 'اللعبة منصات أفقية التمرير تعتمد على حركة دقيقة وخطاف تسلق قائم على الفيزياء يتيح للفراشة التأرجح عبر مظلة الغابة والوصول إلى حواف يستحيل بلوغها بغير ذلك. تتنقل بين المخاطر عبر مراحل ذات تمرير متوازي، وتستخدم نقاط الحفظ للتعافي من الأخطاء، وتتبع تلميحات لطيفة على الشاشة تعلّمك التحكم أثناء اللعب. وتتصاعد الرحلة نحو معركة زعيم عنكبوت متعددة المراحل — الاختبار الأبرز لكل ما علّمتك إياه المراحل. ويفتتح اللعبة كوميك قصير بفن البكسل يمهّد للرهانات العاطفية في بحث الفراشة.',
      },
      whereToPlay: {
        en: 'Gathered by the Light was completed as a capstone project rather than published as a commercial release, so it is not currently available on a store. We keep it on the site as part of our portfolio: a window into the studio\'s origins in game design and the craft we carry into every project we build today.',
        ar: 'اكتملت Gathered by the Light كمشروع تخرج لا كإصدار تجاري، لذا فهي ليست متاحة حاليًا على متجر. ونبقيها على الموقع ضمن أعمالنا: نافذة على جذور الاستوديو في تصميم الألعاب والحرفية التي نحملها إلى كل مشروع نبنيه اليوم.',
      },
      developmentStory: {
        en: 'Gathered by the Light is where our story as game makers really began. As a university capstone, it forced us to take a game from concept to a finished, playable whole — writing a small narrative, hand-drawing every asset in a pixel editor, building levels in Unity, and implementing systems like the grappling hook and a proper boss encounter. The constraints of a student project made us ruthless about scope, and the lessons from finishing it — about polish, pacing, and telling a story through movement — still shape how our studio approaches game development.',
        ar: 'Gathered by the Light هي حيث بدأت قصتنا فعلًا كصنّاع ألعاب. وبصفتها مشروع تخرج جامعي، أجبرتنا على أخذ لعبة من الفكرة إلى كلٍّ مكتمل قابل للعب — بكتابة سرد صغير، ورسم كل عنصر يدويًا في محرر بكسل، وبناء المراحل في Unity، وتنفيذ أنظمة كخطاف التسلق ومواجهة زعيم حقيقية. وجعلتنا قيود مشروع الطلبة حازمين في ضبط النطاق، وما زالت الدروس المستفادة من إكماله — عن الصقل والإيقاع ورواية قصة عبر الحركة — تشكّل طريقة تعامل استوديونا مع تطوير الألعاب.',
      },
    },
    seoMeta: {
      genre: ['Platformer', 'Adventure', 'Pixel Art', 'Indie'],
      platforms: ['PC'],
      // Capstone project, not commercially released — no datePublished.
    },
    features: [
      { icon: 'Puzzle', title: { en: 'Grappling Hook Mechanic', ar: 'آلية خطاف التسلق' }, description: { en: 'Swing through the forest canopy with a physics-based grappling hook system.', ar: 'تأرجح عبر مظلة الغابة مع نظام خطاف تسلق قائم على الفيزياء.' } },
      { icon: 'ShieldCheck', title: { en: 'Spider Boss Fight', ar: 'معركة زعيم العنكبوت' }, description: { en: 'Face a terrifying spider boss in an intense multi-phase battle.', ar: 'واجه زعيم عنكبوت مرعب في معركة متعددة المراحل.' } },
      { icon: 'Bolt', title: { en: 'Hand-Drawn Pixel Art', ar: 'فن بكسل مرسوم يدويًا' }, description: { en: 'Every sprite, tileset, and animation crafted pixel by pixel in Aseprite.', ar: 'كل رسم وبلاطة ورسوم متحركة مصنوعة بكسل ببكسل.' } },
      { icon: 'BookOpen', title: { en: 'Comic Intro Sequence', ar: 'مقدمة كوميكية' }, description: { en: 'A cinematic pixel-art comic that sets the stage for the moth\'s journey.', ar: 'كوميك بفن البكسل يمهد لرحلة الفراشة.' } },
    ],
    stats: [
      { value: '5', label: { en: 'Comic Slides', ar: 'شرائح كوميك' } },
      { value: '10+', label: { en: 'Levels', ar: 'مستويات' } },
      { value: '1', label: { en: 'Boss Fight', ar: 'معركة زعيم' } },
    ],
    storeLinks: [],
    heroImage: 'https://assets.buriedgames.com/images/games/gbtl/poster.png',
    heroImageHint: 'pixel art moth forest',
    heroVideo: 'https://assets.buriedgames.com/videos/gbtl-hero.mp4',
    imageUrl: 'https://assets.buriedgames.com/images/games/gbtl/poster.png',
    imageHint: 'pixel art platformer',
    videoUrl: null,
    gallery: [
      { url: 'https://assets.buriedgames.com/images/games/gbtl/poster.png', hint: 'Game poster' },
      { url: 'https://assets.buriedgames.com/images/games/gbtl/start-screen.png', hint: 'Start screen' },
      { url: 'https://assets.buriedgames.com/images/games/gbtl/tileset.png', hint: 'Level tileset' },
    ],
    comicSlides: [
      'https://assets.buriedgames.com/images/games/gbtl/comic-1.png',
      'https://assets.buriedgames.com/images/games/gbtl/comic-2.png',
      'https://assets.buriedgames.com/images/games/gbtl/comic-3.png',
      'https://assets.buriedgames.com/images/games/gbtl/comic-4.png',
      'https://assets.buriedgames.com/images/games/gbtl/comic-5.png',
    ],
    characters: [
      { name: { en: 'Moth (Hero)', ar: 'الفراشة (البطل)' }, sprite: 'https://assets.buriedgames.com/images/games/gbtl/moth-jump.gif' },
      { name: { en: 'Father', ar: 'الأب' }, sprite: 'https://assets.buriedgames.com/images/games/gbtl/father.gif' },
      { name: { en: 'Mother', ar: 'الأم' }, sprite: 'https://assets.buriedgames.com/images/games/gbtl/mother.gif' },
      { name: { en: 'Spider Boss', ar: 'زعيم العنكبوت' }, sprite: 'https://assets.buriedgames.com/images/games/gbtl/spider.gif' },
    ],
    designAssets: [
      { label: { en: 'Grappling Hook', ar: 'خطاف التسلق' }, image: 'https://assets.buriedgames.com/images/games/gbtl/grappling-hook.gif' },
      { label: { en: 'Checkpoint', ar: 'نقطة حفظ' }, image: 'https://assets.buriedgames.com/images/games/gbtl/checkpoint.gif' },
      { label: { en: 'Jump Hint', ar: 'تلميح القفز' }, image: 'https://assets.buriedgames.com/images/games/gbtl/hint-jump.gif' },
      { label: { en: 'Movement', ar: 'الحركة' }, image: 'https://assets.buriedgames.com/images/games/gbtl/hint-move.gif' },
    ],
    trailerUrl: 'https://assets.buriedgames.com/videos/gbtl-trailer.mp4',
  },
];

    
