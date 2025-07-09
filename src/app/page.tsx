
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
import { useState, useEffect, useRef } from "react";
import logoImage from '@/components/images/buriedgames_logo.png';
import { cn } from "@/lib/utils";

export default function Home() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const [logoStyle, setLogoStyle] = useState<React.CSSProperties>({});
  const [isLogoInPlace, setIsLogoInPlace] = useState(false);
  const aboutImageContainerRef = useRef<HTMLDivElement>(null);
  const heroTextContainerRef = useRef<HTMLDivElement>(null);

  const animationData = useRef({
    isInitialized: false,
    initial: { x: 0, y: 0, scale: 1 },
    final: { x: 0, y: 0, scale: 1 },
    animationEnd: 0,
  });

  useEffect(() => {
    const aboutImageEl = aboutImageContainerRef.current;
    const heroTextEl = heroTextContainerRef.current;
    if (!aboutImageEl || !heroTextEl) return;

    const initialSize = 256;

    const calculateAnimationValues = () => {
      const aboutRect = aboutImageEl.getBoundingClientRect();
      const heroTextRect = heroTextEl.getBoundingClientRect();
      const animData = animationData.current;

      animData.initial.scale = 1;
      animData.initial.x = window.innerWidth / 2 - initialSize / 2;
      // Position the logo vertically below the hero text with a margin, relative to the document
      animData.initial.y = heroTextRect.bottom + window.scrollY + 48;

      animData.final.scale = aboutRect.width / initialSize;
      animData.final.x = aboutRect.left;
      // Final position is the top of the placeholder, relative to the document
      animData.final.y = aboutRect.top + window.scrollY;

      // End animation when the top of the placeholder is 1/3 down the viewport
      const endViewportOffset = window.innerHeight / 3;
      animData.animationEnd = animData.final.y - endViewportOffset;


      animData.isInitialized = true;
      handleScroll();
    };

    const handleScroll = () => {
      if (!animationData.current.isInitialized) return;

      const animData = animationData.current;
      const scrollY = window.scrollY;
      const animationStart = 0;
      const animationEnd = animData.animationEnd;

      setIsLogoInPlace(scrollY >= animationEnd);

      let progress = (scrollY - animationStart) / (animationEnd - animationStart);
      progress = Math.max(0, Math.min(1, progress));

      const currentX = animData.initial.x + (animData.final.x - animData.initial.x) * progress;
      const currentY = animData.initial.y + (animData.final.y - animData.initial.y) * progress;
      const currentScale = animData.initial.scale + (animData.final.scale - animData.final.scale) * progress;

      setLogoStyle({
        position: 'fixed',
        width: `${initialSize}px`,
        height: `${initialSize}px`,
        top: 0,
        left: 0,
        transform: `translate(${currentX}px, ${currentY - scrollY}px) scale(${currentScale})`,
        transformOrigin: 'top left',
        zIndex: 40,
        pointerEvents: 'none',
      });
    };

    calculateAnimationValues();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateAnimationValues);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateAnimationValues);
    };
  }, []);

  const t_ui = {
    en: {
      hero_subtitle: "Crafting worlds, one game at a time.",
      view_details: "View Details",
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      contact_cta: "Contact Us Now",
    },
    ar: {
      hero_subtitle: "نصنع العوالم، لعبة تلو الأخرى.",
      view_details: "عرض التفاصيل",
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      contact_cta: "تواصل معنا الآن",
    }
  }[language];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        
        <div style={{...logoStyle, opacity: isLogoInPlace ? 0 : 1, transition: 'opacity 0.2s ease-in-out'}}>
          <Image 
            src={logoImage} 
            alt="Buried Games Logo" 
            width={256}
            height={256}
            priority
            className="w-full h-full"
          />
        </div>

        {/* Hero Section */}
        <section className="relative h-screen min-h-[700px] flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          <div ref={heroTextContainerRef} className="relative">
            <h1 className="text-5xl tracking-wider sm:text-6xl md:text-7xl lg:text-8xl font-headline text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 !leading-tight" style={{ letterSpacing: '0.1em' }}>
              Buried Games Studio
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
              {t_ui.hero_subtitle}
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container pt-0">
           <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>{t.about.title}</h2>
              <p className="mt-4 text-muted-foreground">{t.about.p1}</p>
              <p className="mt-4 text-muted-foreground">{t.about.p2}</p>
            </div>
            <div ref={aboutImageContainerRef} className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
                <Image 
                  src={logoImage} 
                  alt="Buried Games Team" 
                  fill 
                  className={cn(
                    "object-cover transition-opacity duration-200 ease-in-out",
                    isLogoInPlace ? "opacity-100" : "opacity-0"
                  )}
                  data-ai-hint="game development" 
                />
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
                    <CheckCircle2 className="w-8 h-8 text-primary" />
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
  );
}
