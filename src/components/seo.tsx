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
        "name": "What is KoutQ8?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "KoutQ8 is our modern take on the traditional Kuwaiti card game Kout. It features smart AI opponents and real-time multiplayer, built with Unity for local players and the global community."
        }
        },
        {
        "@type": "Question",
        "name": "Is Power of Bombs a multiplayer game?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Power of Bombs offers strategic multiplayer gameplay with bomb-based combat mechanics and tactical decision-making."
        }
        },
        {
        "@type": "Question",
        "name": "What platforms are your games available on?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our games are developed for PC and will be released through platforms like Steam, itch.io, and direct download from our website."
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
        "name": "Where is Buried Games Studio located?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are proudly based in Kuwait, developing high-quality indie games that represent Middle Eastern creativity in the global gaming industry."
        }
        },
        {
        "@type": "Question",
        "name": "How can I collaborate with Buried Games Studio?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "We're open to partnerships, publishing, and creative collaborations. Reach out via WhatsApp or email to connect with our team."
        }
        },
        {
        "@type": "Question",
        "name": "What game engines do you use?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use Unity and Unreal Engine to build our games, depending on the project scope, genre, and platform requirements."
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
        "name": "ما هو تخصص استوديو Buried Games؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "يختص استوديو Buried Games في تطوير ألعاب استراتيجية ومستقلة متعددة اللاعبين باستخدام Unity وUnreal Engine، ويقع مقره في الكويت."
        }
        },
        {
        "@type": "Question",
        "name": "ما هي الألعاب التي طورها استوديو Buried Games؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "قمنا بتطوير لعبة Power of Bombs الاستراتيجية على الحاسوب، ولعبة KoutQ8 التي تعيد إحياء لعبة الكوت الكويتية بتجربة رقمية مع خصوم يعملون بالذكاء الاصطناعي."
        }
        },
        {
        "@type": "Question",
        "name": "ما هي لعبة KoutQ8؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "KoutQ8 هي نسخة رقمية من لعبة الكوت الكويتية التقليدية، تتميز بخصوم أذكياء وإمكانية اللعب الجماعي، ومصممة باستخدام Unity للاعبين المحليين والعالميين."
        }
        },
        {
        "@type": "Question",
        "name": "هل لعبة Power of Bombs تدعم اللعب الجماعي؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، Power of Bombs تقدم تجربة لعب جماعي استراتيجية تعتمد على القنابل والتكتيك."
        }
        },
        {
        "@type": "Question",
        "name": "على أي منصات تتوفر ألعابكم؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "نقوم بتطوير ألعابنا لأجهزة الحاسوب، وسيتم إطلاقها عبر Steam وitch.io ومن خلال موقعنا الرسمي."
        }
        },
        {
        "@type": "Question",
        "name": "هل تقدمون دروسًا في تطوير الألعاب؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "نعم، ننشر دروسًا تعليمية ومذكرات تطوير ونصائح على قناتنا الرسمية في يوتيوب، نغطي فيها Unity وUnreal Engine وإنتاج الألعاب المستقلة."
        }
        },
        {
        "@type": "Question",
        "name": "أين يقع مقر استوديو Buried Games؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "نحن موجودون في الكويت ونهدف إلى تطوير ألعاب مستقلة عالية الجودة تمثل الإبداع العربي في صناعة الألعاب عالميًا."
        }
        },
        {
        "@type": "Question",
        "name": "كيف يمكنني التعاون مع استوديو Buried Games؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "نرحب بالشراكات والتعاونات الإبداعية وفرص النشر. يمكنك التواصل معنا عبر واتساب أو البريد الإلكتروني."
        }
        },
        {
        "@type": "Question",
        "name": "ما هي محركات الألعاب التي تستخدمونها؟",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "نستخدم محركي Unity وUnreal Engine في بناء ألعابنا، حسب نوع المشروع ومتطلباته التقنية والفنية."
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
