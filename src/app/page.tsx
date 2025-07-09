
"use client";

import Link from "next/link";
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
import { CheckCircle2 } from 'lucide-react';
import Image from "next/image";
import logoImage from '@/components/images/buriedgames_logo.png';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { ParticlesBackground } from "@/components/particles-background";

export default function Home() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const t_ui = {
    en: {
      hero_subtitle: "Crafting worlds, one game at a time.",
      view_details: "View Details",
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      contact_cta: "Contact Us Now",
      learn_more: "Learn More About Us",
    },
    ar: {
      hero_subtitle: "نصنع العوالم، لعبة تلو الأخرى.",
      view_details: "عرض التفاصيل",
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      contact_cta: "تواصل معنا الآن",
      learn_more: "اعرف المزيد عنا",
    }
  }[language];

  const subtitle = t_ui.hero_subtitle;

  const [animationStyle, setAnimationStyle] = useState<CSSProperties>({});
  const [textToShow, setTextToShow] = useState('');
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setTextToShow('');
    setStartTyping(false);
    
    const initialDelayTimer = setTimeout(() => {
      setStartTyping(true);
    }, 2000);

    return () => clearTimeout(initialDelayTimer);
  }, [language]);


  useEffect(() => {
    if (!startTyping) {
        setAnimationStyle({
            borderRight: '2px solid hsl(var(--accent))',
            animation: 'blink-caret-start .75s step-end infinite'
        });
        return;
    };

    setTextToShow(subtitle);
    
    const typingDuration = 3;
    const blinkInterval = 0.75;
    const blinkIterations = Math.ceil(typingDuration / blinkInterval) + 2;

    setAnimationStyle({
      animation: `typing ${typingDuration}s steps(${subtitle.length}, end) forwards, blink-caret ${blinkInterval}s step-end ${blinkIterations} forwards`
    });

  }, [startTyping, subtitle]);


  return (
    <ParallaxProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">

          {/* Hero Section */}
          <section 
            className="relative h-screen min-h-[700px] text-center px-4 flex flex-col items-center justify-center"
          >
            <ParticlesBackground />
            <Parallax speed={-30} className="absolute inset-0 z-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={logoImage.src}
                  alt="Buried Games Studio Logo background"
                  width={400}
                  height={400}
                  className="opacity-20"
                />
              </div>
            </Parallax>
            
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10"></div>
            
            <div className="relative z-20">
              <h1 className="text-5xl tracking-wider sm:text-6xl md:text-7xl lg:text-8xl font-headline !leading-tight text-transparent bg-clip-text bg-gradient-to-t from-accent to-foreground bg-[length:100%_200%] animate-bubble-text" style={{ letterSpacing: '0.1em' }}>
                Buried Games Studio
              </h1>
              <p 
                style={animationStyle}
                className="inline-block overflow-hidden whitespace-nowrap border-r-4 border-transparent text-muted-foreground md:text-xl mt-4"
              >
                {textToShow}
              </p>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="container">
             <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>{t.about_summary.title}</h2>
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
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>{t.services.title}</h2>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {t.services.items.map((service, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold">{service.name}</h3>
                    <p className="mt-2 text-muted-foreground">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>


          {/* Games Section */}
          <section id="games" className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>
                {language === 'en' ? 'Our Games' : 'ألعابنا'}
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {t.games.map((game) => (
                <GameCard key={game.id} game={game} viewText={t_ui.view_details} />
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="bg-card">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>{t.faq.title}</h2>
              </div>
              <div className="mt-12 max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {t.faq.items.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-lg text-left">{item.q}</AccordionTrigger>
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
              <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>{t_ui.contact_title}</h2>
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
