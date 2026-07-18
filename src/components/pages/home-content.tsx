"use client";

import Link from "next/link";
import Image from "next/image";
import { localePath, type Locale } from "@/lib/i18n";
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
} from "lucide-react";
import { ZoomParallaxHero } from "@/components/ui/zoom-parallax-hero";
import { GamesShowcaseCarousel } from "@/components/ui/games-showcase-carousel";
import { gamesContent } from "@/lib/content/games";
import { fahed } from "@/lib/content/team";
import { DESIGN_WORKS_PATH, designWorks } from "@/lib/content/design-works";
import { DesignWorkCard } from "@/components/ui/design-work-card";
import { WhatsAppIcon } from "@/components/icons/whatsapp";

import { assets } from "@/lib/assets";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { trackHomeCTA, trackFAQOpen, trackServiceCardClick, trackWhatsAppClick } from "@/lib/google-analytics";

const WHATSAPP_HREF = "https://wa.me/96555528686";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

// Eyebrow label. Start-aligned by default with a single leading red tick;
// centered variant adds a trailing tick, per the design system.
function Eyebrow({ children, centered }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase",
        centered && "justify-center"
      )}
    >
      <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
      {children}
      {centered && <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />}
    </p>
  );
}

export function HomeContent({ locale }: { locale: Locale }) {
  const language = locale;
  const t = getTranslation(language);
  const isRTL = language === "ar";

  const gameImageMap: { [key: string]: string } = {
    "power-of-bombs": assets.powerOfBombsLogo,
    koutq8: assets.koutq8Logo,
    nabsh: assets.nabshLogo,
    "luna-fantasy": assets.lunaFantasyHero,
    "gathered-by-the-light": "https://assets.buriedgames.com/images/games/gbtl/poster.png",
    arrab: assets.arrabHeroRight,
  };

  const projectsForGrid = gamesContent
    .slice()
    .reverse()
    .map((game) => ({
      id: game.id,
      slug: game.slug,
      title: game.title,
      description: game.description[language],
      image: gameImageMap[game.id] || "https://assets.buriedgames.com/images/hero-collage.jpg",
      status: game.status as "released" | "development" | "coming_soon" | "completed",
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
      portfolio: "Proof of Work",
      latest_releases: "Work we've shipped",
      games_subtitle:
        "Strategy games, multiplayer experiences, and interactive platforms we've built from the ground up — for ourselves and for clients.",
      view_all_games: "View all games",
      // Design works
      design_label: "Design works",
      design_title: "Design work by our Creative Director",
      design_subtitle:
        "Character art, game UI, and full art production by Bokhari Hamid — shared as part of our team's portfolio.",
      view_all_designs: "View all design works",
      // Services
      services_label: "What we build for you",
      services_title: "Your game, built from concept to launch",
      services_subtitle:
        "We build games for studios, brands, and entrepreneurs across the GCC — from a napkin sketch to a live product in players' hands.",
      explore_services: "Explore all services",
      more_services: "More of what we do",
      // Process
      process_label: "How we work",
      process_title: "From idea to launch",
      // Credibility band
      credibility_label: "Why studios work with us",
      partners_label: "Partner",
      powered_by: "Powered by",
      // CTA
      contact_label: "Work with us",
      contact_title: "Have a project in mind?",
      contact_subtitle:
        "Tell us what you're building and we'll show you how we can help.",
      contact_cta: "Start your project",
      or: "or",
      whatsapp_us: "message us on WhatsApp",
      // FAQ
      faq_label: "Good to know",
      faq_title: "Common questions",
    },
    ar: {
      stats_games: "ألعاب منشورة",
      stats_years: "سنوات نشاط",
      stats_engines: "محركات ألعاب",
      stats_remote: "عمل عن بعد بالكامل",
      portfolio: "أعمال أنجزناها",
      latest_releases: "أعمال أطلقناها",
      games_subtitle:
        "ألعاب استراتيجية وتجارب جماعية ومنصات تفاعلية بنيناها من الصفر — لأنفسنا ولعملائنا.",
      view_all_games: "عرض كل الألعاب",
      design_label: "أعمال التصميم",
      design_title: "أعمال تصميم مديرنا الإبداعي",
      design_subtitle:
        "فن الشخصيات وواجهات الألعاب وإنتاج فني متكامل من بوخاري حامد — ضمن أعمال فريقنا.",
      view_all_designs: "عرض كل أعمال التصميم",
      services_label: "ما نبنيه لك",
      services_title: "لعبتك، من الفكرة إلى الإطلاق",
      services_subtitle:
        "نبني الألعاب للاستوديوهات والعلامات التجارية ورواد الأعمال في مختلف دول الخليج — من رسمة على ورقة إلى منتج حي في أيدي اللاعبين.",
      explore_services: "استكشف جميع الخدمات",
      more_services: "المزيد مما نقوم به",
      process_label: "كيف نعمل",
      process_title: "من الفكرة إلى الإطلاق",
      credibility_label: "لماذا تعمل معنا الاستوديوهات",
      partners_label: "شريك",
      powered_by: "مدعوم بـ",
      contact_label: "اعمل معنا",
      contact_title: "لديك مشروع في ذهنك؟",
      contact_subtitle: "أخبرنا بما تبنيه وسنريك كيف يمكننا المساعدة.",
      contact_cta: "ابدأ مشروعك",
      or: "أو",
      whatsapp_us: "راسلنا على واتساب",
      faq_label: "معلومات مفيدة",
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

  // Each service card deep-links to its dedicated child page where one exists,
  // falling back to the services hub. Keyed by both locale variants of the name.
  const serviceRoutes: Record<string, string> = {
    "Full Game Development": "/services/game-development",
    "Mobile Game Porting": "/services/mobile-game-development",
    "Backend & Network Development": "/services/multiplayer-game-development",
    "تطوير الألعاب بالكامل": "/services/game-development",
    "نقل الألعاب إلى الجوال": "/services/mobile-game-development",
    "تطوير الواجهة الخلفية والشبكات": "/services/multiplayer-game-development",
  };

  // One-line outcome lines for the four featured service cards, keyed by both
  // locale variants of the service name so the same map works in EN and AR.
  const serviceOutcomes: Record<string, string> = {
    "Full Game Development": "End-to-end builds from prototype to live release.",
    "Game Design & Prototyping": "Validate the fun before you commit a budget.",
    "2D & 3D Art/Animation": "Distinctive art that makes your game look shipped.",
    "Backend & Network Development": "Multiplayer, accounts, and live ops that scale.",
    "تطوير الألعاب بالكامل": "بناء متكامل من النموذج الأولي إلى الإطلاق الحي.",
    "تصميم الألعاب والنماذج الأولية": "تحقّق من المتعة قبل أن تلتزم بالميزانية.",
    "فن ورسوم متحركة ثنائية وثلاثية الأبعاد": "فنّ مميّز يجعل لعبتك تبدو جاهزة للنشر.",
    "تطوير الواجهة الخلفية والشبكات": "لعب جماعي وحسابات وعمليات حية قابلة للتوسّع.",
  };

  const processSteps = {
    en: ["Discovery", "Design", "Development", "QA & Polish", "Launch"],
    ar: ["الاكتشاف", "التصميم", "التطوير", "الاختبار", "الإطلاق"],
  }[language];

  const processLines = {
    en: [
      "We map your idea, audience, and scope.",
      "Systems, art direction, and a playable plan.",
      "We build in tight, reviewable milestones.",
      "Tested, balanced, and store-ready.",
      "Ship, measure, and keep improving.",
    ],
    ar: [
      "نرسم فكرتك وجمهورك ونطاق العمل.",
      "الأنظمة والتوجّه الفني وخطة قابلة للّعب.",
      "نبني عبر مراحل قصيرة قابلة للمراجعة.",
      "مختبرة ومتوازنة وجاهزة للمتاجر.",
      "ننشر ونقيس ونواصل التحسين.",
    ],
  }[language];

  // Split services into 4 featured (with a known outcome line) and the rest as
  // a compact text list, so the section reads as a hierarchy not a wall of boxes.
  const featuredServices = t.services.items
    .filter((s) => serviceOutcomes[s.name])
    .slice(0, 4);
  const featuredNames = new Set(featuredServices.map((s) => s.name));
  const otherServices = t.services.items.filter((s) => !featuredNames.has(s.name));

  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 overflow-x-hidden">
      <main className="flex-1">
        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <ZoomParallaxHero />

        {/* ══════════════════════════════════════
            2. STATS STRIP — tucked tightly under the hero
        ══════════════════════════════════════ */}
        <section className="!py-0 border-y border-border bg-card/40">
          <div className="container max-w-screen-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {[
                { value: "4", label: t_ui.stats_games },
                { value: "7+", label: t_ui.stats_years },
                { value: "3", label: t_ui.stats_engines },
                { value: "100%", label: t_ui.stats_remote },
              ].map((stat, i) => (
                <m.div
                  key={i}
                  className="py-6 md:py-7 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-headline font-bold text-3xl md:text-4xl text-primary tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[11px] md:text-xs text-foreground/55 uppercase tracking-[0.2em] mt-1.5">
                    {stat.label}
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. EDITORIAL INTRO — keyword anchor, read as a statement
        ══════════════════════════════════════ */}
        <section>
          <div className="container max-w-3xl">
            <m.div className="space-y-5" {...reveal}>
              <Eyebrow>{t_ui.services_label}</Eyebrow>
              {language === "en" ? (
                <p className="text-lg md:text-xl leading-relaxed text-foreground/80 text-balance">
                  Buried Games is a{" "}
                  <Link
                    href={localePath(language, "/services/game-development")}
                    className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    game development studio
                  </Link>{" "}
                  serving clients across Kuwait and the GCC — Saudi Arabia, the
                  UAE, Qatar, Bahrain, and Oman. We design and ship mobile,
                  multiplayer, and Unity games from concept to launch — explore{" "}
                  <Link
                    href={localePath(language, "/services/game-development")}
                    className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    our services
                  </Link>{" "}
                  or see{" "}
                  <Link
                    href={localePath(language, "/games")}
                    className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    the games we've shipped
                  </Link>
                  .
                </p>
              ) : (
                <p className="text-lg md:text-xl leading-relaxed text-foreground/80 text-balance">
                  بريد جيمز{" "}
                  <Link
                    href={localePath(language, "/services/game-development")}
                    className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    استوديو تطوير ألعاب
                  </Link>{" "}
                  يخدم عملاءه في الكويت ومختلف دول الخليج — السعودية والإمارات
                  وقطر والبحرين وعُمان. نصمم وننشر ألعاب الجوال والألعاب الجماعية
                  وألعاب Unity من الفكرة إلى الإطلاق — استكشف{" "}
                  <Link
                    href={localePath(language, "/services/game-development")}
                    className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    خدماتنا
                  </Link>{" "}
                  أو شاهد{" "}
                  <Link
                    href={localePath(language, "/games")}
                    className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    الألعاب التي أطلقناها
                  </Link>
                  .
                </p>
              )}
            </m.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. GAMES / PORTFOLIO — proof of work
        ══════════════════════════════════════ */}
        <section id="games" className="bg-card/40 border-y border-border">
          <div className="container max-w-screen-xl">
            <m.div className="mb-10 space-y-3" {...reveal}>
              <Eyebrow>{t_ui.portfolio}</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t_ui.latest_releases}
              </h2>
              <p className="text-foreground/65 max-w-2xl leading-relaxed">
                {t_ui.games_subtitle}
              </p>
            </m.div>

            <m.div {...reveal}>
              <GamesShowcaseCarousel projects={projectsForGrid} language={language} />
            </m.div>

            <div className="mt-10 flex justify-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group rounded-full border-foreground/20 bg-transparent hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300"
              >
                <Link
                  href={localePath(language, "/games")}
                  className="flex items-center gap-2"
                  onClick={() => trackHomeCTA("view_all_games")}
                >
                  {t_ui.view_all_games}
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
            4b. DESIGN WORKS — the Creative Director's showcase
        ══════════════════════════════════════ */}
        {designWorks.length > 0 && (
          <section className="border-b border-border">
            <div className="container max-w-screen-xl">
              <m.div className="mb-10 space-y-3" {...reveal}>
                <Eyebrow>{t_ui.design_label}</Eyebrow>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t_ui.design_title}
                </h2>
                <p className="text-foreground/65 max-w-2xl leading-relaxed">
                  {t_ui.design_subtitle}
                </p>
              </m.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {designWorks.slice(0, 3).map((work, index) => (
                  <DesignWorkCard key={work.slug} work={work} language={language} index={index} />
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group rounded-full border-foreground/20 bg-transparent hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300"
                >
                  <Link
                    href={localePath(language, DESIGN_WORKS_PATH)}
                    className="flex items-center gap-2"
                    onClick={() => trackHomeCTA("view_all_design_works")}
                  >
                    {t_ui.view_all_designs}
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
        )}

        {/* ══════════════════════════════════════
            5. SERVICES — featured cards + compact list
        ══════════════════════════════════════ */}
        <section id="services">
          <div className="container max-w-screen-xl">
            <m.div
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-10"
              {...reveal}
            >
              <div className="space-y-3 max-w-2xl">
                <Eyebrow>{t_ui.services_label}</Eyebrow>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t_ui.services_title}
                </h2>
                <p className="text-foreground/65 leading-relaxed">
                  {t_ui.services_subtitle}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-foreground/50 uppercase tracking-[0.2em] hidden md:block">
                  {t_ui.powered_by}
                </span>
                <div className="flex items-center gap-4 px-4 py-2.5 rounded-xl bg-card border border-border">
                  <Image
                    src={assets.unity}
                    alt="Unity"
                    height={32}
                    width={32}
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="w-px h-6 bg-border" />
                  <Image
                    src={assets.unrealEngine}
                    alt="Unreal Engine"
                    height={32}
                    width={32}
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            </m.div>

            {/* Featured services — 4 outcome cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {featuredServices.map((service, index) => {
                const Icon = serviceIcons[service.name] || Gamepad2;
                const route = serviceRoutes[service.name] || "/services";
                return (
                  <m.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={localePath(language, route)}
                      className="group flex h-full flex-col rounded-xl bg-card border border-border p-5 md:p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                      onClick={() => trackServiceCardClick(service.name)}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-foreground leading-snug">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-foreground/60 leading-relaxed flex-1">
                        {serviceOutcomes[service.name]}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 group-hover:text-primary transition-colors">
                        {language === "en" ? "Learn more" : "اعرف المزيد"}
                        <ArrowRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1",
                            isRTL && "rotate-180 group-hover:-translate-x-1"
                          )}
                        />
                      </span>
                    </Link>
                  </m.div>
                );
              })}
            </div>

            {/* Remaining services — compact 2-col arrow-link list */}
            <m.div className="mt-10 pt-8 border-t border-border" {...reveal}>
              <p className="text-xs font-medium tracking-[0.2em] text-foreground/50 uppercase mb-5">
                {t_ui.more_services}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                {otherServices.map((service) => {
                  const route = serviceRoutes[service.name] || "/services";
                  return (
                    <Link
                      key={service.name}
                      href={localePath(language, route)}
                      className="group flex items-center justify-between gap-4 py-2.5 border-b border-border/60 text-foreground/80 hover:text-foreground transition-colors"
                      onClick={() => trackServiceCardClick(service.name)}
                    >
                      <span className="text-sm md:text-base">{service.name}</span>
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 shrink-0 text-foreground/30 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1",
                          isRTL && "rotate-180 group-hover:-translate-x-1"
                        )}
                      />
                    </Link>
                  );
                })}
              </div>
            </m.div>

            <div className="mt-10 flex justify-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group rounded-full border-foreground/20 bg-transparent hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300"
              >
                <Link href={localePath(language, "/services")} className="flex items-center gap-2">
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
            6. PROCESS — ghost-numeral steps
        ══════════════════════════════════════ */}
        <section className="bg-card/40 border-y border-border">
          <div className="container max-w-screen-xl">
            <m.div className="mb-10 space-y-3" {...reveal}>
              <Eyebrow>{t_ui.process_label}</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t_ui.process_title}
              </h2>
            </m.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-4">
              {processSteps.map((step, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div aria-hidden="true" className="font-headline font-bold text-6xl text-foreground/10 leading-none tracking-tight">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground mt-2">
                    {step}
                  </h3>
                  <p className="text-sm text-foreground/60 leading-relaxed mt-1">
                    {processLines[index]}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            7. CREDIBILITY BAND — founder + partner, one tight row
        ══════════════════════════════════════ */}
        <section>
          <div className="container max-w-screen-xl">
            <m.div
              className="flex flex-col gap-8 rounded-xl border border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8"
              {...reveal}
            >
              <div className="space-y-4">
                <Eyebrow>{t_ui.credibility_label}</Eyebrow>
                <Link
                  href={localePath(language, "/about-us")}
                  className="group flex items-center gap-4"
                >
                  <Image
                    src={fahed.photoUrl}
                    alt={fahed.name[language]}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover border border-border grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="text-start">
                    <span className="block text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {fahed.name[language]}
                    </span>
                    <span className="block text-sm text-foreground/55">
                      {fahed.title[language]}
                    </span>
                  </span>
                </Link>
              </div>

              {/* Partner logo(s) — real partners only, sourced from content */}
              <div className="flex flex-wrap items-center gap-5 md:justify-end">
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/40">
                  {t_ui.partners_label}
                </span>
                {t.partners.items.map((partner, index) => (
                  <a
                    key={index}
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-300"
                    aria-label={partner.name}
                  >
                    <Image
                      src={assets.gavan}
                      alt={partner.name}
                      width={120}
                      height={42}
                      className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
            </m.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            8. FAQ — tight accordion
        ══════════════════════════════════════ */}
        <section className="bg-card/40 border-y border-border">
          <div className="container max-w-3xl">
            <m.div className="mb-8 space-y-3" {...reveal}>
              <Eyebrow>{t_ui.faq_label}</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t_ui.faq_title}
              </h2>
            </m.div>

            <m.div {...reveal}>
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-3"
                onValueChange={(value) => {
                  if (value) {
                    const idx = parseInt(value.replace("item-", ""), 10);
                    const faqItems = t.faq.items.slice(0, 5);
                    if (faqItems[idx]) trackFAQOpen(idx, faqItems[idx].q);
                  }
                }}
              >
                {t.faq.items.slice(0, 5).map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border bg-card rounded-xl px-5 data-[state=open]:border-primary/40 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-base font-medium hover:no-underline hover:text-primary text-start py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/65 pb-4 text-sm leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </m.div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            9. FINAL CTA — single centered band
        ══════════════════════════════════════ */}
        <section>
          <div className="container max-w-3xl">
            <m.div className="text-center space-y-6" {...reveal}>
              <Eyebrow centered>{t_ui.contact_label}</Eyebrow>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {t_ui.contact_title}
              </h2>
              <p className="text-foreground/65 max-w-xl mx-auto leading-relaxed">
                {t_ui.contact_subtitle}
              </p>
              <div className="flex flex-col items-center gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300"
                >
                  <Link
                    href={localePath(language, "/contact-us")}
                    onClick={() => trackHomeCTA("start_your_project")}
                    className="flex items-center gap-2"
                  >
                    {t_ui.contact_cta}
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 transition-transform duration-300 group-hover:translate-x-1",
                        isRTL && "rotate-180 group-hover:-translate-x-1"
                      )}
                    />
                  </Link>
                </Button>
                <p className="text-sm text-foreground/55">
                  {t_ui.or}{" "}
                  {/* No aria-label: the visible text is the accessible name —
                      a label that differs from visible text fails WCAG 2.5.3. */}
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("home_cta")}
                    className="inline-flex items-center gap-1.5 text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    {t_ui.whatsapp_us}
                  </a>
                </p>
              </div>
            </m.div>
          </div>
        </section>
      </main>
    </div>
  );
}
