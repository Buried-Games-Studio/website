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
import {
  ArrowRight,
  Rocket,
  Gamepad2,
  Lightbulb,
  Palette,
  Smartphone,
  Bug,
  Music,
  DollarSign,
  Users as UsersIcon,
  Server,
  Wrench,
  MessageSquare,
  FileSearch,
  Code2,
  Layers,
} from "lucide-react";
import { ZoomParallaxHero } from "@/components/ui/zoom-parallax-hero";
import { ProjectsBentoGrid } from "@/components/ui/projects-bento-grid";
import { gamesContent } from "@/lib/content/games";
import PowerOfBombsImage from "@/components/images/powerofbombsIconTransparent.png";
import Koutq8Image from "@/components/images/Koutq8Logo.png";
import NabshImage from "@/assets/images/nabsh_logo.png";
import UnityImage from "@/components/images/UnityImage.png";
import UnrealEngineImage from "@/components/images/UnrealEngineImage.png";
import { ParallaxProvider } from "react-scroll-parallax";
import GavanLogo from "@/components/images/gavan.png";
import ImgConcept from "@/components/images/howitWorks_Concept.webp";
import ImgDesigning from "@/components/images/howitWorks_designing.webp";
import ImgPrototyping from "@/components/images/howitWorks_prototyping.webp";
import ImgTesting from "@/components/images/howitWorks_testing.webp";
import ImgLaunch from "@/components/images/howitWorks_launch.webp";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HomeContent() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const isRTL = language === "ar";

  const gameImageMap: { [key: string]: string } = {
    "power-of-bombs": PowerOfBombsImage.src,
    koutq8: Koutq8Image.src,
    nabsh: NabshImage.src,
    "luna-fantasy": "/assets/images/luna-fantasy-hero.png",
  };

  const projectsForGrid = gamesContent
    .slice()
    .reverse()
    .map((game) => ({
      id: game.id,
      slug: game.slug,
      title: game.title,
      description: game.description[language],
      image: gameImageMap[game.id] || "/assets/images/hero-collage.jpg",
      status: game.status as "released" | "development" | "coming_soon",
      engine: game.engine,
      tags:
        game.features?.slice(0, 2).map((f: any) => f.title[language]) || [],
    }));

  const t_ui = {
    en: {
      // Stats
      stats_games: "Games Shipped",
      stats_years: "Years Active",
      stats_engines: "Game Engines",
      stats_remote: "Fully Remote",
      // Games
      portfolio: "Portfolio",
      latest_releases: "Our Games",
      games_subtitle:
        "Strategy games, multiplayer experiences, and interactive platforms we've built from the ground up.",
      view_all_games: "View All Games",
      // Services
      services_label: "Services",
      services_title: "What We Can Build For You",
      services_subtitle:
        "End-to-end game development — from a napkin sketch to a live product in players' hands.",
      explore_services: "Explore All Services",
      // Process
      process_label: "How We Work",
      process_title: "From Idea to Launch",
      // Partners
      partners_label: "Trusted By",
      // CTA
      contact_title: "Have a Project in Mind?",
      contact_subtitle:
        "Tell us what you're building and we'll show you how we can help.",
      contact_cta: "Start a Conversation",
      // FAQ
      faq_title: "Common Questions",
    },
    ar: {
      stats_games: "ألعاب منشورة",
      stats_years: "سنوات نشاط",
      stats_engines: "محركات ألعاب",
      stats_remote: "عمل عن بعد بالكامل",
      portfolio: "أعمالنا",
      latest_releases: "ألعابنا",
      games_subtitle:
        "ألعاب استراتيجية، تجارب جماعية، ومنصات تفاعلية بنيناها من الصفر.",
      view_all_games: "عرض كل الألعاب",
      services_label: "الخدمات",
      services_title: "ما يمكننا بناؤه لك",
      services_subtitle:
        "تطوير ألعاب شامل — من رسمة على ورقة إلى منتج حي في أيدي اللاعبين.",
      explore_services: "استكشف جميع الخدمات",
      process_label: "كيف نعمل",
      process_title: "من الفكرة إلى الإطلاق",
      partners_label: "يثقون بنا",
      contact_title: "لديك مشروع في ذهنك؟",
      contact_subtitle: "أخبرنا بما تبنيه وسنريك كيف يمكننا المساعدة.",
      contact_cta: "ابدأ محادثة",
      faq_title: "أسئلة شائعة",
    },
  }[language];

  const serviceIcons: Record<string, React.ElementType> = {
    "Full Game Development": Gamepad2,
    "Game Design & Prototyping": Lightbulb,
    "2D & 3D Art/Animation": Palette,
    "Mobile Game Porting": Smartphone,
    "QA & Testing": Bug,
    "Audio Design & Music": Music,
    "Game Monetization Strategy": DollarSign,
    "Live Ops & Community Management": UsersIcon,
    "Backend & Network Development": Server,
    "Technical Art & Pipeline Development": Wrench,
    "تطوير الألعاب بالكامل": Gamepad2,
    "تصميم الألعاب والنماذج الأولية": Lightbulb,
    "فن ورسوم متحركة ثنائية وثلاثية الأبعاد": Palette,
    "نقل الألعاب إلى الجوال": Smartphone,
    "ضمان الجودة والاختبار": Bug,
    "تصميم الصوت والموسيقى": Music,
    "استراتيجية تحقيق الدخل من الألعاب": DollarSign,
    "العمليات الحية وإدارة المجتمع": UsersIcon,
    "تطوير الواجهة الخلفية والشبكات": Server,
    "الفن التقني وتطوير خطوط الإنتاج": Wrench,
  };

  const processSteps = {
    en: [
      { title: "Discovery", image: ImgConcept },
      { title: "Design", image: ImgDesigning },
      { title: "Development", image: ImgPrototyping },
      { title: "QA & Polish", image: ImgTesting },
      { title: "Launch", image: ImgLaunch },
    ],
    ar: [
      { title: "الاكتشاف", image: ImgConcept },
      { title: "التصميم", image: ImgDesigning },
      { title: "التطوير", image: ImgPrototyping },
      { title: "الاختبار", image: ImgTesting },
      { title: "الإطلاق", image: ImgLaunch },
    ],
  }[language];

  return (
    <ParallaxProvider>
      <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
        <main className="flex-1">
          {/* ══════════════════════════════════════
              1. HERO
          ══════════════════════════════════════ */}
          <ZoomParallaxHero />

          {/* ══════════════════════════════════════
              2. SOCIAL PROOF — STATS STRIP
          ══════════════════════════════════════ */}
          <section className="!py-0 border-y border-white/5 bg-card/30">
            <div className="container">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                {[
                  { value: "4", label: t_ui.stats_games },
                  { value: "7+", label: t_ui.stats_years },
                  { value: "3", label: t_ui.stats_engines },
                  { value: "100%", label: t_ui.stats_remote },
                ].map((stat, i) => (
                  <div key={i} className="py-8 md:py-10 text-center">
                    <div className="text-3xl md:text-4xl font-headline font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              3. GAMES / PORTFOLIO — moved up, proof first
          ══════════════════════════════════════ */}
          <section
            id="games"
            className="relative py-24 md:py-32 bg-black overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,0,0,0.1),transparent_50%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10">
              <div className="text-center mb-16">
                <span className="text-primary font-bold tracking-[0.5em] uppercase text-sm">
                  {t_ui.portfolio}
                </span>
                <h2 className="text-5xl md:text-7xl font-headline font-bold text-white mt-4">
                  {t_ui.latest_releases}
                </h2>
                <div className="h-1 w-20 bg-primary rounded-full mx-auto mt-6" />
                <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto">
                  {t_ui.games_subtitle}
                </p>
              </div>

              <ProjectsBentoGrid
                projects={projectsForGrid}
                language={language}
              />

              <div className="text-center mt-12">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-primary/50 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Link href="/games" className="flex items-center gap-2">
                    {t_ui.view_all_games}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              4. SERVICES — outcome focused, concise
          ══════════════════════════════════════ */}
          <section id="services" className="py-24 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10">
              {/* Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
                <div className="max-w-2xl">
                  <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
                    {t_ui.services_label}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-headline font-bold text-white mb-4">
                    {t_ui.services_title}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {t_ui.services_subtitle}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm text-muted-foreground hidden md:block">
                    {language === "en" ? "Powered by" : "مدعوم بـ"}
                  </span>
                  <div className="flex gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Image
                      src={UnityImage}
                      alt="Unity"
                      height={36}
                      width={36}
                      className="h-9 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="w-px bg-white/10" />
                    <Image
                      src={UnrealEngineImage}
                      alt="Unreal Engine"
                      height={36}
                      width={36}
                      className="h-9 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Service grid — compact 5-col */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {t.services.items.map((service, index) => {
                  const Icon = serviceIcons[service.name] || Gamepad2;
                  return (
                    <Link
                      href="/services"
                      key={index}
                      className="group relative p-5 rounded-xl bg-card/40 border border-white/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_-8px_rgba(var(--primary),0.25)] overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {service.name}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="text-center mt-10">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-primary/50 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Link href="/services" className="flex items-center gap-2">
                    {t_ui.explore_services}
                    <ArrowRight
                      className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              5. PROCESS — builds trust for hire-us
          ══════════════════════════════════════ */}
          <section className="py-20 md:py-28 bg-secondary/10 border-y border-white/5">
            <div className="container">
              <div className="text-center mb-14">
                <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">
                  {t_ui.process_label}
                </span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
                  {t_ui.process_title}
                </h2>
                <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
              </div>

              {/* Horizontal process steps */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="group text-center"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-accent/30 transition-all duration-300">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="text-[10px] font-bold text-accent/50 uppercase tracking-widest mb-1">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button
                  asChild
                  variant="ghost"
                  className="group text-base font-bold hover:bg-transparent p-0 hover:text-accent transition-colors"
                >
                  <Link
                    href="/services"
                    className="flex items-center gap-2"
                  >
                    {t_ui.explore_services}
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1",
                        isRTL && "rotate-180 group-hover:-translate-x-1"
                      )}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              6. PARTNER STRIP
          ══════════════════════════════════════ */}
          <section className="!py-12 border-b border-white/5">
            <div className="container">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground/50">
                  {t_ui.partners_label}
                </span>
                <a
                  href="https://gavan-tech.com/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="absolute -inset-4 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                  <Image
                    src={GavanLogo}
                    alt="Gavan Tech"
                    width={140}
                    height={50}
                    className="relative z-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════
              7. CTA + FAQ — conversion close
          ══════════════════════════════════════ */}
          <section className="container py-20 md:py-28">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-card/30 backdrop-blur-sm p-8 md:p-16">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-20 animate-pulse-glow pointer-events-none" />

              <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                {/* CTA Column — first on desktop */}
                <div className="flex flex-col justify-center items-center text-center space-y-8 order-2 lg:order-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full animate-pulse" />
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative z-10 shadow-xl">
                      <Rocket className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">
                      {t_ui.contact_title}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-md mx-auto">
                      {t_ui.contact_subtitle}
                    </p>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary/50 font-bold"
                  >
                    <Link href="/contact-us">{t_ui.contact_cta}</Link>
                  </Button>
                </div>

                {/* FAQ Column */}
                <div className="space-y-6 order-1 lg:order-2">
                  <h3 className="text-3xl font-bold font-headline text-white">
                    {t_ui.faq_title}
                  </h3>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-3"
                  >
                    {t.faq.items.slice(0, 5).map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-white/5 bg-white/5 rounded-xl px-6 data-[state=open]:border-primary/50 data-[state=open]:bg-primary/5 transition-all duration-300"
                      >
                        <AccordionTrigger className="text-base font-medium hover:no-underline hover:text-primary text-start py-5">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-5 text-sm leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </ParallaxProvider>
  );
}
