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
import { GameGridCard } from "@/components/game-grid-card";
import { ArrowRight, Lightbulb, Palette, Smartphone, Swords, ChevronDown, ExternalLink } from 'lucide-react';
import { ParticlesBackground } from "@/components/particles-background";
import PowerOfBombsImage from '@/components/images/powerofbombsIconTransparent.png';
import Koutq8Image from '@/components/images/Koutq8Logo.png';
import NabshImage from '@/assets/images/nabsh_logo.png';
import UnityImage from '@/components/images/UnityImage.png';
import UnrealEngineImage from '@/components/images/UnrealEngineImage.png';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import logoImage from '@/components/images/buriedgames_logo.png';
import AboutUsImage from '@/components/images/AboutUsSection.webp'; 

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
      contact_title: "Let's Build Something Epic",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      contact_cta: "Start Your Project",
      learn_more: "Our Story",
      view_all_games: "View All Games", // Changed from generic "Explore"
      learn_more_services: "Explore All Services"
    },
    ar: {
      view_details: "عرض التفاصيل",
      contact_title: "لنبدأ شيئاً عظيماً",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      contact_cta: "ابدأ مشروعك",
      learn_more: "قصتنا",
      view_all_games: "عرض كل الألعاب",
      learn_more_services: "اكتشف جميع الخدمات"
    }
  }[language];

  const isRTL = language === 'ar';

  return (
    <ParallaxProvider>
      <div className="flex flex-col min-h-screen bg-background selection:bg-accent/30">
        <main className="flex-1">

          {/* --- Hero Section --- */}
          <section className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden px-4">
            <ParticlesBackground />
            
            {/* Atmosphere Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/20 blur-[120px] rounded-full pointer-events-none opacity-40 animate-pulse-glow" />
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />

            <div className="relative z-20 flex flex-col items-center justify-center w-full text-center max-w-5xl mx-auto space-y-8">
              <div className="relative mb-8 animate-fade-up [animation-delay:200ms] opacity-0 fill-mode-forwards">
                <Parallax speed={-10}>
                  <Image 
                    src={logoImage} 
                    alt="Buried Games Studio" 
                    width={250} 
                    height={250} 
                    className="w-40 h-40 md:w-64 md:h-64 object-contain drop-shadow-[0_0_30px_rgba(255,0,0,0.3)]"
                    priority
                  />
                </Parallax>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold tracking-wider animate-fade-up [animation-delay:400ms] opacity-0 fill-mode-forwards">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
                  BURIED GAMES
                </span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:600ms] opacity-0 fill-mode-forwards">
                Crafting worlds, one game at a time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-up [animation-delay:800ms] opacity-0 fill-mode-forwards">
                 <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-6 rounded-full shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] transition-all duration-300">
                    <Link href="/contact-us">{t_ui.contact_cta}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm px-8 py-6 rounded-full">
                    <Link href="#games">{t_ui.view_details}</Link>
                </Button>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/30">
              <ChevronDown className="w-8 h-8" />
            </div>
          </section>


          {/* --- About Section --- */}
          <section id="about" className="relative container py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className={`relative order-2 lg:order-1 ${isRTL ? 'lg:order-2' : ''}`}>
                <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                   <Image 
                      src={AboutUsImage || logoImage} 
                      alt="About Buried Games"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="absolute -inset-4 bg-accent/20 rounded-2xl blur-2xl -z-10" />
              </div>

              <div className={`flex flex-col gap-6 order-1 lg:order-2 ${isRTL ? 'lg:order-1' : ''}`}>
                 <h2 className="text-4xl md:text-5xl font-headline font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                  {t.about_summary.title}
                 </h2>
                 <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about_summary.p1}
                 </p>
                 <div className="pt-4">
                    <Button asChild variant="link" className="text-accent p-0 text-lg font-bold hover:text-accent/80">
                        <Link href="/about-us" className="flex items-center gap-2">
                          {t_ui.learn_more} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                 </div>
              </div>
            </div>
          </section>


          {/* --- Services Section --- */}
          <section id="services" className="bg-secondary/20 relative">
            <div className="container relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                   <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4 text-foreground">{t.services.title}</h2>
                   <p className="text-xl text-muted-foreground">{t.services.homepage_subtitle}</p>
                </div>
                <div className="flex gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300">
                   <Image src={UnityImage} alt="Unity" height={40} width={40} className="h-10 w-auto" />
                   <Image src={UnrealEngineImage} alt="Unreal" height={40} width={40} className="h-10 w-auto" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {t.services.items.slice(0, 4).map((service, index) => {
                      const Icon = serviceIcons[service.name] || Swords;
                      return (
                          <div key={index} className="group relative overflow-hidden rounded-xl bg-card/5 border border-white/5 hover:border-accent/50 transition-all duration-300 hover:bg-card/10 p-8 flex flex-col gap-4">
                              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Icon className="w-24 h-24" />
                              </div>
                              
                              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-6 h-6" />
                              </div>
                              
                              <h3 className="text-xl font-bold z-10">{service.name}</h3>
                              <div className="w-full h-1 bg-accent/20 rounded-full overflow-hidden mt-auto">
                                <div className="w-0 h-full bg-accent group-hover:w-full transition-all duration-500 ease-out" />
                              </div>
                          </div>
                      );
                  })}
              </div>
            </div>
          </section>

          <section id="games" className="container py-32 relative">
            
            {/* Section Header with "01" Watermark */}
            <div className="relative flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div className="relative z-10">
                <span className="text-sm font-bold tracking-[0.3em] text-accent uppercase mb-2 block">
                  Portfolio
                </span>
                <h2 className="text-6xl md:text-8xl font-headline font-bold text-white leading-[0.8]">
                  LATEST<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/50 to-white/10">RELEASES</span>
                </h2>
              </div>

              {/* Huge "01" Watermark behind text */}
              <div className="absolute -top-20 -left-10 text-[200px] font-bold text-white/5 pointer-events-none select-none font-headline z-0">
                01
              </div>

              {/* Magnetic CTA */}
              {/* <Link 
                href="/games" 
                className="group hidden md:flex items-center gap-4 text-lg font-bold text-white hover:text-accent transition-colors duration-300 pb-2 border-b border-white/20 hover:border-accent z-10"
              >
                <span>{t_ui.view_all_games}</span>
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-transparent group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                   <ArrowRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </span>
              </Link> */}
            </div>

            {/* Cinematic Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Featured Game (First Item) - Cinematic Full Width Card */}
              <div className="col-span-1 md:col-span-3 aspect-video md:aspect-[21/9] w-full">
                {t.games[0] && (
                   <GameGridCard 
                      game={t.games[0]} 
                      viewText={t_ui.view_details} 
                      image={gameImageMap[t.games[0].id]}
                      className="h-full w-full shadow-2xl"
                    />
                )}
              </div>

              {/* Secondary Games - Standard Cards */}
              {t.games.slice(1).map((game) => (
                <div key={game.id} className="col-span-1 aspect-[4/3]">
                  <GameGridCard 
                    game={game} 
                    viewText={t_ui.view_details} 
                    image={gameImageMap[game.id]}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
            
            {/* Mobile Only CTA */}
             {/* <div className="mt-12 md:hidden text-center">
                <Button asChild variant="outline" size="lg" className="rounded-full w-full border-white/20">
                 <Link href="/games">
                    {t_ui.view_all_games}
                 </Link>
              </Button>
             </div> */}
          </section>


          {/* --- FAQ & Final CTA --- */}
          <section className="container pb-24">
            <div className="glass-card rounded-3xl p-8 md:p-16 overflow-hidden relative">
              {/* Background Element */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
              
              <div className="grid lg:grid-cols-2 gap-16">
                
                {/* FAQ Column */}
                <div className="space-y-8">
                   <h3 className="text-3xl font-bold font-headline">{t.faq.title}</h3>
                   <Accordion type="single" collapsible className="w-full space-y-4">
                    {t.faq.items.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 bg-black/20 rounded-lg px-4 data-[state=open]:border-accent/50 transition-colors">
                        <AccordionTrigger className="text-lg hover:no-underline hover:text-accent text-start py-4">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 text-base leading-relaxed">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* CTA Column */}
                <div className="flex flex-col justify-center items-center text-center space-y-6 lg:border-l border-white/10 lg:pl-16">
                   <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4 animate-pulse">
                      <Smartphone className="w-10 h-10 text-accent" />
                   </div>
                   <h2 className="text-3xl md:text-4xl font-bold">{t_ui.contact_title}</h2>
                   <p className="text-muted-foreground">{t_ui.contact_subtitle}</p>
                   <Button asChild size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90 font-bold text-lg py-6">
                      <Link href="/contact-us">{t_ui.contact_cta}</Link>
                   </Button>
                </div>

              </div>
            </div>
          </section>

        </main>
      </div>
    </ParallaxProvider>
  );
}