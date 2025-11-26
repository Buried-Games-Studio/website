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
import { GameCard3D } from "@/components/ui/game-card-3d";
import { ArrowRight, Lightbulb, Palette, Smartphone, Swords, ChevronDown, Rocket, Code, Gamepad2 } from 'lucide-react';
import { ZoomParallaxHero } from "@/components/ui/zoom-parallax-hero";
import { HorizontalScrollCarousel } from "@/components/ui/horizontal-scroll-carousel";
import PowerOfBombsImage from '@/components/images/powerofbombsIconTransparent.png';
import Koutq8Image from '@/components/images/Koutq8Logo.png';
import NabshImage from '@/assets/images/nabsh_logo.png';
import UnityImage from '@/components/images/UnityImage.png';
import UnrealEngineImage from '@/components/images/UnrealEngineImage.png';
import { ParallaxProvider } from 'react-scroll-parallax';
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
    'Full Game Development': Gamepad2,
    'Game Design & Prototyping': Lightbulb,
    '2D & 3D Art/Animation': Palette,
    'Mobile Game Porting': Smartphone,
  };

  const t_ui = {
    en: {
      view_details: "View Details",
      contact_title: "Ready to Start?",
      contact_subtitle: "Let's build the next big thing together.",
      contact_cta: "Get in Touch",
      learn_more: "Read Our Story",
      view_all_games: "View All Games",
      learn_more_services: "Explore Services",
      latest_releases: "Latest Releases",
      portfolio: "Portfolio",
      about_title: "Who We Are",
      services_title: "Our Expertise"
    },
    ar: {
      view_details: "عرض التفاصيل",
      contact_title: "جاهز للبدء؟",
      contact_subtitle: "دعنا نبني الشيء الكبير التالي معاً.",
      contact_cta: "تواصل معنا",
      learn_more: "اقرأ قصتنا",
      view_all_games: "عرض كل الألعاب",
      learn_more_services: "اكتشف خدماتنا",
      latest_releases: "أحدث الإصدارات",
      portfolio: "أعمالنا",
      about_title: "من نحن",
      services_title: "خبراتنا"
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
          <section id="services" className="py-20 bg-secondary/5 relative">
            <div className="container relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-2xl">
                  <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">{t_ui.services_title}</span>
                  <h2 className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-4">{t.services.title}</h2>
                  <p className="text-xl text-muted-foreground">{t.services.homepage_subtitle}</p>
                </div>

                {/* Tech Stack Icons */}
                <div className="flex gap-6 opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                  <Image src={UnityImage} alt="Unity" height={50} width={50} className="h-12 w-auto" />
                  <Image src={UnrealEngineImage} alt="Unreal" height={50} width={50} className="h-12 w-auto" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.services.items.slice(0, 4).map((service, index) => {
                  const Icon = serviceIcons[service.name] || Rocket;
                  return (
                    <div key={index} className="group relative overflow-hidden rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary),0.15)] p-8 flex flex-col gap-6 hover:-translate-y-2">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-150 origin-top-right">
                        <Icon className="w-32 h-32" />
                      </div>

                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>

                      <h3 className="text-xl font-bold z-10 group-hover:text-primary transition-colors">{service.name}</h3>

                      <div className="mt-auto pt-4 border-t border-white/5 group-hover:border-primary/20 transition-colors">
                        <span className="text-sm text-muted-foreground group-hover:text-white transition-colors flex items-center gap-2">
                          {t_ui.view_details} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* --- Games Section --- */}
          <section id="games" className="relative bg-black">
            <div className="container relative z-10 pt-10 pb-4 text-center">
              <span className="text-primary font-bold tracking-[0.5em] uppercase text-sm animate-pulse">{t_ui.portfolio}</span>
              <h2 className="text-5xl md:text-7xl font-headline font-bold text-white mt-4">
                {t_ui.latest_releases}
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full mx-auto mt-6" />
            </div>

            <HorizontalScrollCarousel
              items={[
                {
                  id: 'power-of-bombs',
                  title: 'Power of Bombs',
                  description: 'An explosive multiplayer arena game.',
                  image: gameImageMap['power-of-bombs']?.src || logoImage.src,
                  slug: 'power-of-bombs',
                  tags: ['Action', 'Multiplayer']
                },
                {
                  id: 'koutq8',
                  title: 'KoutQ8',
                  description: 'The classic card game, reimagined.',
                  image: gameImageMap['koutq8']?.src || logoImage.src,
                  slug: 'koutq8',
                  tags: ['Card', 'Strategy']
                },
                {
                  id: 'nabsh',
                  title: 'Nabsh',
                  description: 'A mysterious adventure awaits.',
                  image: gameImageMap['nabsh']?.src || logoImage.src,
                  slug: 'nabsh',
                  tags: ['Trivia', 'Indie']
                },
                // Duplicates for scroll effect
                {
                  id: 'power-of-bombs-2',
                  title: 'Power of Bombs',
                  description: 'An explosive multiplayer arena game.',
                  image: gameImageMap['power-of-bombs']?.src || logoImage.src,
                  slug: 'power-of-bombs',
                  tags: ['Action', 'Multiplayer']
                },
                {
                  id: 'koutq8-2',
                  title: 'KoutQ8',
                  description: 'The classic card game, reimagined.',
                  image: gameImageMap['koutq8']?.src || logoImage.src,
                  slug: 'koutq8',
                  tags: ['Card', 'Strategy']
                },
                {
                  id: 'nabsh-2',
                  title: 'Nabsh',
                  description: 'A mysterious adventure awaits.',
                  image: gameImageMap['nabsh']?.src || logoImage.src,
                  slug: 'nabsh',
                  tags: ['Trivia', 'Indie']
                },
              ]}
            />
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