
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
import { ArrowRight, Lightbulb, Palette, Smartphone, Swords } from 'lucide-react';
import { ParticlesBackground } from "@/components/particles-background";
import PowerOfBombsImage from '@/components/images/powerofbombsIconTransparent.png';
import Koutq8Image from '@/components/images/Koutq8Logo.png';
import UnityImage from '@/components/images/UnityImage.png';
import NabshImage from '@/assets/images/nabsh_logo.png';
import UnrealEngineImage from '@/components/images/UnrealEngineImage.png';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import logoImage from '@/components/images/buriedgames_logo.png';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
      view_details: "View Details",
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      contact_cta: "Contact Us Now",
      learn_more: "Learn More About Us",
      learn_more_services: "Explore Our Solutions"
    },
    ar: {
      view_details: "عرض التفاصيل",
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      contact_cta: "تواصل معنا الآن",
      learn_more: "اعرف المزيد عنا",
      learn_more_services: "اكتشف حلولنا"
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
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,hsl(var(--accent)/0.3),transparent_70%)] -z-10" />


            <div className="relative z-10 flex flex-col items-center justify-center w-full">
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
                className="absolute inset-x-0 top-[25%] whitespace-nowrap text-8xl tracking-[0.2em] font-headline !leading-tight text-white font-bold -z-10"
              >
                Buried Games Studio
              </h1>
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
          
          <Separator className="my-8 opacity-30" />


          {/* Services Section */}
          <section id="services" className="bg-background">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center mb-12">
                  <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{t.services.title}</h2>
                  <p className="lead text-muted-foreground mt-4">{t.services.homepage_subtitle}</p>
                  <div className="mt-6 flex flex-col items-center gap-4">
                      <p className="text-muted-foreground">{t.services.homepage_p[0]}</p>
                      <div className="flex items-center gap-6">
                          <Image src={UnityImage} alt="Unity" height={100} width={100} className="h-16 w-auto filter grayscale hover:grayscale-0 transition-all" />
                          <Image src={UnrealEngineImage} alt="Unreal Engine" height={100} width={100} className="h-16 w-auto filter grayscale hover:grayscale-0 transition-all" />
                      </div>
                  </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {t.services.items.slice(0, 4).map((service, index) => {
                      const Icon = serviceIcons[service.name] || Swords;
                      return (
                          <div key={index} className="bg-card/50 backdrop-blur-sm border border-border/40 rounded-lg p-4 text-center flex flex-col items-center justify-center gap-3 transition-all hover:border-accent hover:shadow-[0_0_20px] hover:shadow-accent/30">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border-2 border-accent">
                                  <Icon className="w-6 h-6 text-accent"/>
                              </div>
                              <h3 className="text-base font-bold text-center">{service.name}</h3>
                          </div>
                      );
                  })}
              </div>
              <div className="text-center mt-12">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px] shadow-accent/50 transition-shadow">
                    <Link href="/contact-us">{t_ui.learn_more_services} <ArrowRight className="ms-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </div>
          </section>
          
          <Separator className="my-8 opacity-30" />


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

          <Separator className="my-8 opacity-30" />


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
          
          <Separator className="my-8 opacity-30" />


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
