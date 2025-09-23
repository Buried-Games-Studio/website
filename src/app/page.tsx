
"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GameCard } from "@/components/game-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Palette, Smartphone, Swords, Youtube } from 'lucide-react';
import { ParticlesBackground } from "@/components/particles-background";
import PowerOfBombsImage from '@/components/images/powerofbombsIconTransparent.png';
import Koutq8Image from '@/components/images/Koutq8Logo.png';
import UnityImage from '@/components/images/UnityImage.png';
import NabshImage from '@/assets/images/nabsh_logo.png';
import UnrealEngineImage from '@/components/images/UnrealEngineImage.png';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import logoImage from '@/components/images/buriedgames_logo.png';

export default function Home() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const gameImageMap: { [key: string]: any } = {
    'power-of-bombs': PowerOfBombsImage,
    'koutq8': Koutq8Image,
    'nabsh': NabshImage,
  };
  
  const serviceIcons: { [key: string]: React.ElementType } = {
    'Full Game Development': Swords,
    'Game Design & Prototyping': Lightbulb,
    '2D & 3D Art/Animation': Palette,
    'Mobile Game Porting': Smartphone,
  };

  const t_ui = {
    en: {
      hero_subtitle: "Crafting worlds, one game at a time.",
      view_details: "View Details",
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      contact_cta: "Contact Us Now",
      learn_more: "Learn More About Us",
      learn_more_services: "Explore Our Services"
    },
    ar: {
      hero_subtitle: "نصنع العوالم، لعبة تلو الأخرى.",
      view_details: "عرض التفاصيل",
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      contact_cta: "تواصل معنا الآن",
      learn_more: "اعرف المزيد عنا",
      learn_more_services: "اكتشف خدماتنا"
    }
  }[language];

  return (
    <ParallaxProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">

          {/* Hero Section */}
          <section 
            className="relative isolate h-screen min-h-[700px] text-center px-4 flex flex-col items-center justify-center overflow-hidden"
          >
            <ParticlesBackground />
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background z-0 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              <Parallax speed={-25}>
                <Image 
                    src={logoImage} 
                    alt="Buried Games Studio Background Logo" 
                    width={800} 
                    height={800} 
                    className="max-w-[80vw] md:max-w-[600px] w-auto h-auto opacity-80"
                    priority
                />
              </Parallax>
              <h1 
                className="absolute inset-0 text-6xl tracking-wider sm:text-7xl md:text-8xl lg:text-9xl font-headline !leading-tight text-white flex items-center justify-center -z-10"
              >
                Buried Games Studio
              </h1>
            </div>

            <div className="relative z-20 mt-4">
              <Parallax speed={5}>
                <p className="text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out delay-500 [animation-fill-mode:forwards]">
                  {t_ui.hero_subtitle}
                </p>
              </Parallax>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="container">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t.about_summary.title}</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">{t.about_summary.p1}</p>
                <div className="mt-8">
                    <Button asChild size="lg" variant="outline">
                        <Link href="/about-us">{t_ui.learn_more}</Link>
                    </Button>
                </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="bg-card">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="prose dark:prose-invert max-w-none">
                    <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t.services.title}</h2>
                    <p className="lead">{t.services.homepage_subtitle}</p>
                    <p className="flex flex-wrap items-center gap-x-4">
                      <span>{t.services.homepage_p[0]}</span>
                      <Image src={UnityImage} alt="Unity" height={100} width={100} className="inline-block h-auto w-24" />
                      <span>{t.services.homepage_p[1]}</span>
                      <Image src={UnrealEngineImage} alt="Unreal Engine" height={100} width={100} className="inline-block h-auto w-24" />
                      <span>{t.services.homepage_p[2]}</span>
                    </p>
                    <Button asChild size="lg" className="mt-4 no-underline">
                        <Link href="/services">{t_ui.learn_more_services} <ArrowRight className="ms-2 h-5 w-5" /></Link>
                    </Button>
                </div>
                <div>
                    <ul className="space-y-6">
                        {t.services.items.slice(0, 4).map((service, index) => {
                            const Icon = serviceIcons[service.name] || Swords;
                            return (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border-2 border-accent flex-shrink-0">
                                        <Icon className="w-6 h-6 text-accent"/>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{service.name}</h3>
                                        <p className="text-muted-foreground mt-1">{service.description}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
              </div>
            </div>
          </section>


          {/* Games Section */}
          <section id="games" className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">
                {language === 'en' ? 'Our Games' : 'ألعابنا'}
              </h2>
            </div>
            <div className="mt-12 space-y-16 md:space-y-24">
              {t.games.map((game, index) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  viewText={t_ui.view_details} 
                  image={gameImageMap[game.id]}
                  reverse={index % 2 !== 0} 
                />
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t.faq.title}</h2>
              </div>
              <div className="mt-12 max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {t.faq.items.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-lg text-start">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.contact_title}</h2>
              <p className="mt-4 text-muted-foreground">{t_ui.contact_subtitle}</p>
              <div className="mt-8">
                  <Button asChild size="lg">
                      <Link href="/contact-us">{t_ui.contact_cta}</Link>
                  </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ParallaxProvider>
  );
}
