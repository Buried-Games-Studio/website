
"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Heart, Wand2, ShieldCheck, Handshake } from "lucide-react";

export default function AboutUsPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const t_ui = {
    en: {
      page_title: "About Buried Games Studio",
      page_subtitle: t.about_page.title,
      contact_cta_title: "Have a project in mind?",
      contact_cta_button: "Let's Talk",
      core_values_title: "Our Core Values",
      our_story_title: "Our Story"
    },
    ar: {
      page_title: "حول استوديو بريد جيمز",
      page_subtitle: t.about_page.title,
      contact_cta_title: "هل لديك مشروع في ذهنك؟",
      contact_cta_button: "لنتحدث",
      core_values_title: "قيمنا الأساسية",
      our_story_title: "قصتنا"
    },
  }[language];
  
  const coreValues = {
      en: [
        { icon: Heart, title: 'Passion', description: 'We love games. This passion fuels our creativity and dedication to every project.' },
        { icon: Wand2, title: 'Innovation', description: 'We constantly explore new ideas and technologies to create unique experiences.' },
        { icon: ShieldCheck, title: 'Quality', description: 'We are committed to delivering polished, high-quality games that we are proud of.' },
      ],
      ar: [
        { icon: Heart, title: 'الشغف', description: 'نحن نحب الألعاب. هذا الشغف يغذي إبداعنا وتفانينا في كل مشروع.' },
        { icon: Wand2, title: 'الابتكار', description: 'نستكشف باستمرار أفكارًا وتقنيات جديدة لإنشاء تجارب فريدة.' },
        { icon: ShieldCheck, title: 'الجودة', description: 'نحن ملتزمون بتقديم ألعاب مصقولة وعالية الجودة نفخر بها.' },
      ]
  }[language]

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-card">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.page_title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">{t_ui.page_subtitle}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="font-headline text-3xl mb-4 tracking-wide">{t_ui.our_story_title}</h2>
            <p className="lead">{t.about_page.p1}</p>
            <p>{t.about_page.p2}</p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="font-headline text-2xl mb-4 tracking-wide">{t.about_page.mission_title}</h3>
              <p className="text-muted-foreground">{t.about_page.mission_text}</p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="values" className="bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight">{t_ui.core_values_title}</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {coreValues.map((value, index) => (
                <div key={index} className="text-center flex flex-col items-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 border-2 border-accent">
                        <value.icon className="w-10 h-10 text-accent"/>
                    </div>
                    <h3 className="text-2xl font-bold font-headline tracking-wide">{value.title}</h3>
                    <p className="mt-2 text-muted-foreground max-w-xs">{value.description}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight flex items-center justify-center gap-4">
              <Users className="w-10 h-10" />
              {t.about_page.team_title}
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {t.about_page.team.map((member, index) => {
               const teamCard = (
                  <Card className="text-center max-w-sm mx-auto overflow-hidden group transition-all duration-300 hover:shadow-accent/20 hover:shadow-lg hover:-translate-y-1">
                     <div className="aspect-square relative">
                        <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            data-ai-hint={member.imageHint}
                        />
                     </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold font-headline tracking-wide">{member.name}</h3>
                      <p className="text-accent">{member.role}</p>
                    </CardContent>
                  </Card>
               );

               return member.linkedInUrl ? (
                 <Link href={member.linkedInUrl} key={index} target="_blank" rel="noopener noreferrer">
                   {teamCard}
                 </Link>
               ) : (
                 <div key={index}>{teamCard}</div>
               );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="bg-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight flex items-center justify-center gap-4">
              <Handshake className="w-10 h-10" />
              {t.partners.title}
            </h2>
          </div>
          <div className="mt-12 flex justify-center items-center gap-8 flex-wrap">
            {t.partners.items.map((partner, index) => (
              <a 
                href={partner.websiteUrl} 
                key={index} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block filter grayscale hover:grayscale-0 transition-all duration-300 ease-in-out hover:scale-105"
                title={partner.name}
              >
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={200}
                  height={80}
                  data-ai-hint={partner.imageHint}
                  className="object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container text-center">
         <h2 className="text-3xl font-bold font-headline tracking-wide">{t_ui.contact_cta_title}</h2>
         <div className="mt-6">
            <Button asChild size="lg">
                <Link href="/contact-us">{t_ui.contact_cta_button}</Link>
            </Button>
         </div>
      </section>
    </main>
  );
}
