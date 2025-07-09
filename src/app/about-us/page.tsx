
"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Heart, Wand2, ShieldCheck, Handshake } from "lucide-react";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import FahedAlahmadImage from '@/components/images/fahed_alahmad.jpeg';
import GavanLogo from '@/components/images/gavan.png';


export default function AboutUsPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const t_ui = {
    en: {
      page_title: "About Buried Games Studio",
      page_subtitle: t.about_page.title,
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      contact_cta: "Contact Us Now",
      core_values_title: "Our Core Values",
      our_story_title: "Our Story"
    },
    ar: {
      page_title: "حول استوديو بريد جيمز",
      page_subtitle: t.about_page.title,
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      contact_cta: "تواصل معنا الآن",
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
    <ParallaxProvider>
      <main>
        {/* Hero Section */}
        <section className="bg-card overflow-hidden">
          <div className="container py-16 md:py-24 text-center">
            <Parallax speed={-10}>
              <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.page_title}</h1>
            </Parallax>
            <Parallax speed={5}>
              <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">{t_ui.page_subtitle}</p>
            </Parallax>
          </div>
        </section>

        {/* Content Section */}
        <section className="container overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <Parallax x={[-20, 20]}>
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="font-headline text-3xl mb-4 tracking-wide">{t_ui.our_story_title}</h2>
                  <p className="lead">{t.about_page.p1}</p>
                  <p>{t.about_page.p2}</p>
                </div>
            </Parallax>
            <Parallax x={[20, -20]}>
                <div className="bg-card p-8 rounded-lg shadow-lg">
                    <h3 className="font-headline text-2xl mb-4 tracking-wide">{t.about_page.mission_title}</h3>
                    <p className="text-muted-foreground">{t.about_page.mission_text}</p>
                </div>
            </Parallax>
          </div>
        </section>

        {/* Core Values Section */}
        <section id="values" className="bg-background overflow-hidden">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
                <Parallax scale={[0.8, 1, 'easeInCubic']}>
                    <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight">{t_ui.core_values_title}</h2>
                </Parallax>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {coreValues.map((value, index) => (
                  <Parallax y={[30, -30]} key={index}>
                    <div className="text-center flex flex-col items-center">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 border-2 border-accent">
                            <value.icon className="w-10 h-10 text-accent"/>
                        </div>
                        <h3 className="text-2xl font-bold font-headline tracking-wide">{value.title}</h3>
                        <p className="mt-2 text-muted-foreground max-w-xs">{value.description}</p>
                    </div>
                  </Parallax>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="bg-card overflow-hidden">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center">
                     <Parallax scale={[0.8, 1, 'easeInCubic']}>
                        <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight flex items-center justify-center gap-4">
                        <Users className="w-10 h-10" />
                        {t.about_page.team_title}
                        </h2>
                    </Parallax>
                </div>
                <div className="mt-12">
                {t.about_page.team.map((member, index) => (
                    <Parallax opacity={[0, 1]} scale={[0.9, 1]} key={index}>
                        <Link href={member.linkedInUrl} target="_blank" rel="noopener noreferrer" className="block max-w-4xl mx-auto group">
                            <Card className="overflow-hidden transition-all duration-300 hover:shadow-accent/20 hover:shadow-lg hover:-translate-y-2">
                                <div className="md:flex">
                                    <div className="md:w-1/3 relative aspect-square md:aspect-auto">
                                        <Image
                                            src={FahedAlahmadImage}
                                            alt={member.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            placeholder="blur"
                                        />
                                    </div>
                                    <div className="md:w-2/3">
                                        <CardContent className="p-6 md:p-8 flex flex-col justify-center h-full">
                                            <h3 className="text-4xl font-bold font-headline tracking-wide">{member.name}</h3>
                                            <p className="text-accent text-lg">{member.role}</p>
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </Parallax>
                ))}
                </div>
            </div>
        </section>


        {/* Partners Section */}
        <section id="partners" className="bg-background overflow-hidden">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
                <Parallax scale={[0.8, 1, 'easeInCubic']}>
                    <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight flex items-center justify-center gap-4">
                    <Handshake className="w-10 h-10" />
                    {t.partners.title}
                    </h2>
                </Parallax>
            </div>
            <div className="mt-12 flex justify-center items-center gap-8 flex-wrap">
              {t.partners.items.map((partner, index) => (
                 <Parallax y={[30, -30]} key={index}>
                    <a 
                        href={partner.websiteUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block filter grayscale hover:grayscale-0 transition-all duration-300 ease-in-out hover:scale-105"
                        title={partner.name}
                    >
                        <Image
                        src={GavanLogo}
                        alt={partner.name}
                        width={200}
                        height={80}
                        data-ai-hint={partner.imageHint}
                        className="object-contain"
                        />
                    </a>
                </Parallax>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section id="contact" className="bg-card">
          <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>{t_ui.contact_title}</h2>
                <p className="mt-4 text-muted-foreground">{t_ui.contact_subtitle}</p>
                <div className="mt-8">
                    <Button asChild size="lg">
                        <Link href="/contact-us">{t_ui.contact_cta}</Link>
                    </Button>
                </div>
              </div>
          </div>
        </section>
      </main>
    </ParallaxProvider>
  );
}
