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
import { ArrowRight, Rocket } from 'lucide-react';
import { ZoomParallaxHero } from "@/components/ui/zoom-parallax-hero";
import { ProjectsBentoGrid } from "@/components/ui/projects-bento-grid";
import { ServicesShowcase } from "@/components/ui/services-showcase";
import { gamesContent } from "@/lib/content/games";
import PowerOfBombsImage from '@/components/images/powerofbombsIconTransparent.png';
import Koutq8Image from '@/components/images/Koutq8Logo.png';
import NabshImage from '@/assets/images/nabsh_logo.png';
import UnityImage from '@/components/images/UnityImage.png';
import UnrealEngineImage from '@/components/images/UnrealEngineImage.png';
import { ParallaxProvider } from 'react-scroll-parallax';
import logoImage from '@/components/images/buriedgames_logo.png';
import AboutUsImage from '@/components/images/AboutUsSection.webp';

export function HomeContent() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  // Map game IDs to their hero images (using .src for static imports)
  const gameImageMap: { [key: string]: string } = {
    'power-of-bombs': PowerOfBombsImage.src,
    'koutq8': Koutq8Image.src,
    'nabsh': NabshImage.src,
    'luna-fantasy': '/assets/images/luna-fantasy-hero.png',
  };

  // Transform games content for the bento grid - Luna Fantasy first as featured
  const projectsForGrid = gamesContent
    .slice()
    .reverse() // Newest first (Luna Fantasy)
    .map((game) => ({
      id: game.id,
      slug: game.slug,
      title: game.title,
      description: game.description[language],
      image: gameImageMap[game.id] || '/assets/images/hero-collage.jpg',
      status: game.status as "released" | "development" | "coming_soon",
      engine: game.engine,
      tags: game.features?.slice(0, 2).map((f: any) => f.title[language]) || [],
    }));

  const t_ui = {
    en: {
      contact_title: "Ready to Start?",
      contact_subtitle: "Let's build the next big thing together.",
      contact_cta: "Get in Touch",
      learn_more: "Read Our Story",
      view_all_games: "View All Games",
      latest_releases: "Latest Releases",
      portfolio: "Portfolio",
      about_title: "Who We Are",
    },
    ar: {
      contact_title: "جاهز للبدء؟",
      contact_subtitle: "دعنا نبني الشيء الكبير التالي معاً.",
      contact_cta: "تواصل معنا",
      learn_more: "اقرأ قصتنا",
      view_all_games: "عرض كل الألعاب",
      latest_releases: "أحدث الإصدارات",
      portfolio: "أعمالنا",
      about_title: "من نحن",
    }
  }[language];

  const isRTL = language === 'ar';

  return (
    <ParallaxProvider>
      <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
        <main className="flex-1">

          {/* --- Hero Section --- */}
          <ZoomParallaxHero />

          {/* --- About Section --- */}
          <section id="about" className="relative py-10 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-1/2 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <div className="container relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Image Side */}
                <div className={`relative group order-2 lg:order-1 ${isRTL ? 'lg:order-2' : ''}`}>
                  <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]">
                    <Image
                      src={AboutUsImage || logoImage}
                      alt="About Buried Games"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>
                  {/* Neon Border Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur opacity-20 group-hover:opacity-50 transition-opacity duration-700 -z-10 animate-pulse-glow" />
                </div>

                {/* Content Side */}
                <div className={`flex flex-col gap-8 order-1 lg:order-2 ${isRTL ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{t_ui.about_title}</span>
                    <h2 className="text-4xl md:text-6xl font-headline font-bold text-white mb-6">
                      {t.about_summary.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-6">
                    {t.about_summary.p1}
                  </p>
                  <div className="pt-4">
                    <Button asChild variant="ghost" className="group text-lg font-bold hover:bg-transparent p-0 hover:text-primary transition-colors">
                      <Link href="/about-us" className="flex items-center gap-3">
                        {t_ui.learn_more}
                        <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-2 rotate-180' : 'group-hover:translate-x-2'}`} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- Services Section --- */}
          <section id="services" className="py-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
              <ServicesShowcase
                title={t.services.title}
                subtitle={t.services.homepage_subtitle}
                services={t.services.items}
                language={language}
                unityImage={UnityImage}
                unrealImage={UnrealEngineImage}
              />
            </div>
          </section>

          {/* --- Games Section --- */}
          <section id="games" className="relative py-24 bg-black overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.1),transparent_50%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-[0.5em] uppercase text-sm">{t_ui.portfolio}</span>
                <h2 className="text-5xl md:text-7xl font-headline font-bold text-white mt-4">
                  {t_ui.latest_releases}
                </h2>
                <div className="h-1 w-20 bg-primary rounded-full mx-auto mt-6" />
                <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
                  {language === 'en'
                    ? 'Explore our portfolio of games and interactive experiences we\'ve crafted for clients worldwide.'
                    : 'استكشف مجموعة ألعابنا والتجارب التفاعلية التي صممناها لعملائنا حول العالم.'}
                </p>
              </div>

              {/* Bento Grid */}
              <ProjectsBentoGrid projects={projectsForGrid} language={language} />

              {/* View All Button */}
              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg" className="rounded-full border-primary/50 hover:bg-primary hover:text-white transition-all duration-300">
                  <Link href="/games" className="flex items-center gap-2">
                    {t_ui.view_all_games}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* --- FAQ & Final CTA --- */}
          <section className="container pb-20">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-card/30 backdrop-blur-sm p-8 md:p-16">
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-20 animate-pulse-glow pointer-events-none" />

              <div className="grid lg:grid-cols-2 gap-16 relative z-10">

                {/* FAQ Column */}
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold font-headline text-white">{t.faq.title}</h3>
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {t.faq.items.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border border-white/5 bg-white/5 rounded-xl px-6 data-[state=open]:border-primary/50 data-[state=open]:bg-primary/5 transition-all duration-300">
                        <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-primary text-start py-6">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                {/* CTA Column */}
                <div className="flex flex-col justify-center items-center text-center space-y-8 lg:border-l border-white/10 lg:pl-16">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full animate-pulse" />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative z-10 shadow-xl">
                      <Rocket className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">{t_ui.contact_title}</h2>
                    <p className="text-xl text-muted-foreground max-w-md mx-auto">{t_ui.contact_subtitle}</p>
                  </div>

                  <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/50 font-bold">
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
