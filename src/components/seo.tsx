'use client';

import { useLanguage } from '@/contexts/language-context';

const englishFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What does Buried Games Studio specialize in?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Buried Games Studio specializes in developing indie strategy and multiplayer games using Unity and Unreal Engine, based in Kuwait."
            }
        },
        {
            "@type": "Question",
            "name": "What games has Buried Games Studio developed?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We have developed 'Power of Bombs', a tactical PC strategy game, and 'KoutQ8', a digital version of the traditional Kuwaiti card game Kout with AI-powered gameplay."
            }
        },
        {
            "@type": "Question",
            "name": "What game engines do you use?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use Unity and Unreal Engine to build our games, depending on the project scope, genre, and platform requirements."
            }
        },
        {
            "@type": "Question",
            "name": "What platforms are your games available on?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our games are developed for PC and will be released through platforms like Steam, itch.io, and direct download from our website. We also port games to mobile (iOS & Android)."
            }
        },
        {
            "@type": "Question",
            "name": "Where is Buried Games Studio located?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We are proudly based in Kuwait, developing high-quality indie games that represent Middle Eastern creativity in the global gaming industry."
            }
        },
        {
            "@type": "Question",
            "name": "Do you teach game development?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we publish game development tutorials, devlogs, and tips on our official YouTube channel, covering Unity, Unreal Engine, and indie game production."
            }
        },
        {
            "@type": "Question",
            "name": "How can I collaborate with Buried Games Studio?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We're open to partnerships, publishing, and creative collaborations. Please use the contact form or reach out via WhatsApp/email to connect with our team."
            }
        },
        {
            "@type": "Question",
            "name": "Can I submit a game idea to you?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We appreciate the enthusiasm! However, for legal reasons, we cannot accept unsolicited game ideas or submissions. We focus on developing our original in-house projects."
            }
        },
        {
            "@type": "Question",
            "name": "How can I stay updated on new games and announcements?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The best way to stay in the loop is by following us on our social media channels like YouTube, Twitter, and Instagram! You can find all the links in our website footer."
            }
        },
        {
            "@type": "Question",
            "name": "Do you offer internships or job opportunities?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We post any available job or internship openings on our LinkedIn page. We recommend following us there for the latest career opportunities at Buried Games Studio."
            }
        }
    ]
};

const arabicFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "ما هو تخصص استوديو بريد جيمز؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "يختص استوديو بريد جيمز في تطوير ألعاب استراتيجية ومستقلة متعددة اللاعبين باستخدام Unity وUnreal Engine، ويقع مقره في الكويت."
            }
        },
        {
            "@type": "Question",
            "name": "ما هي الألعاب التي طورها استوديو بريد جيمز؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "قمنا بتطوير لعبة 'Power of Bombs'، وهي لعبة استراتيجية تكتيكية للحاسوب، ولعبة 'KoutQ8'، وهي نسخة رقمية من لعبة الكوت الكويتية التقليدية مع لعب مدعوم بالذكاء الاصطناعي."
            }
        },
        {
            "@type": "Question",
            "name": "ما هي محركات الألعاب التي تستخدمونها؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "نستخدم محركي Unity وUnreal Engine لبناء ألعابنا، اعتمادًا على نطاق المشروع ونوعه ومتطلبات المنصة."
            }
        },
        {
            "@type": "Question",
            "name": "على أي منصات تتوفر ألعابكم؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "نقوم بتطوير ألعابنا لأجهزة الحاسوب، وسيتم إطلاقها عبر منصات مثل Steam وitch.io والتحميل المباشر من موقعنا. كما نقوم بنقل الألعاب إلى الجوال (iOS و Android)."
            }
        },
        {
            "@type": "Question",
            "name": "أين يقع مقر استوديو بريد جيمز؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "نحن نفتخر بأننا متواجدون في الكويت، حيث نطور ألعابًا مستقلة عالية الجودة تمثل الإبداع في الشرق الأوسط في صناعة الألعاب العالمية."
            }
        },
        {
            "@type": "Question",
            "name": "هل تقدمون دروسًا في تطوير الألعاب؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "نعم، ننشر دروسًا تعليمية وسجلات تطوير ونصائح على قناتنا الرسمية في يوتيوب، تغطي Unity وUnreal Engine وإنتاج الألعاب المستقلة."
            }
        },
        {
            "@type": "Question",
            "name": "كيف يمكنني التعاون مع استوديو بريد جيمز؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "نحن منفتحون على الشراكات وفرص النشر والتعاونات الإبداعية. يرجى استخدام نموذج الاتصال أو التواصل عبر واتساب/البريد الإلكتروني للتواصل مع فريقنا."
            }
        },
        {
            "@type": "Question",
            "name": "هل يمكنني تقديم فكرة لعبة لكم؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "نحن نقدر حماسكم! ومع ذلك، لأسباب قانونية، لا يمكننا قبول أفكار أو تقديمات ألعاب غير مرغوب فيها. نحن نركز على تطوير مشاريعنا الداخلية الأصلية."
            }
        },
        {
            "@type": "Question",
            "name": "كيف يمكنني البقاء على اطلاع بألعابكم وإعلاناتكم الجديدة؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "أفضل طريقة للبقاء على اطلاع هي متابعتنا على قنوات التواصل الاجتماعي الخاصة بنا مثل يوتيوب وتويتر وإنستغرام! يمكنك العثور على جميع الروابط في تذييل موقعنا."
            }
        },
        {
            "@type": "Question",
            "name": "هل تقدمون فرص تدريب أو وظائف؟",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "نقوم بنشر أي فرص عمل أو تدريب متاحة على صفحتنا في LinkedIn. نوصي بمتابعتنا هناك للحصول على أحدث الفرص الوظيفية في استوديو بريد جيمز."
            }
        }
    ]
};

export function DynamicSEO() {
  const { language } = useLanguage();

  const faqSchema = language === 'ar' ? arabicFaqSchema : englishFaqSchema;

  return (
    <script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
