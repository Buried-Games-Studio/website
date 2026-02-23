"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import {
  ArrowRight,
  Gamepad2,
  Lightbulb,
  Palette,
  Smartphone,
  Bug,
  Music,
  DollarSign,
  Users,
  Server,
  Wrench,
  MessageSquare,
  Rocket,
  FileSearch,
  Code2,
  Layers,
} from "lucide-react";
import { ParallaxProvider } from "react-scroll-parallax";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────── Images ─────────────────── */
import UnityImage from "@/components/images/UnityImage.png";
import UnrealEngineImage from "@/components/images/UnrealEngineImage.png";
import HeroBg from "@/components/images/POPOverview.jpg";
// Process step illustrations
import ImgConcept from "@/components/images/howitWorks_Concept.webp";
import ImgDesigning from "@/components/images/howitWorks_designing.webp";
import ImgPrototyping from "@/components/images/howitWorks_prototyping.webp";
import ImgTesting from "@/components/images/howitWorks_testing.webp";
import ImgLaunch from "@/components/images/howitWorks_launch.webp";
// Service detail illustrations
import ImgGDD from "@/components/images/gdd.webp";
import ImgArtAssets from "@/components/images/art-assets.webp";
import ImgPrototypin from "@/components/images/prototypin.webp";
import ImgQATesting from "@/components/images/qatesting.webp";
import ImgPublishing from "@/components/images/publishing.webp";
import ImgArtist from "@/components/images/artist.webp";

const ParticlesBackground = dynamic(
  () =>
    import("@/components/particles-background").then(
      (mod) => mod.ParticlesBackground
    ),
  { ssr: false }
);

/* ─────────────────────────────────────────────
   ICON MAP
───────────────────────────────────────────── */
const serviceIcons: Record<string, React.ElementType> = {
  "Full Game Development": Gamepad2,
  "Game Design & Prototyping": Lightbulb,
  "2D & 3D Art/Animation": Palette,
  "Mobile Game Porting": Smartphone,
  "QA & Testing": Bug,
  "Audio Design & Music": Music,
  "Game Monetization Strategy": DollarSign,
  "Live Ops & Community Management": Users,
  "Backend & Network Development": Server,
  "Technical Art & Pipeline Development": Wrench,
  "تطوير الألعاب بالكامل": Gamepad2,
  "تصميم الألعاب والنماذج الأولية": Lightbulb,
  "فن ورسوم متحركة ثنائية وثلاثية الأبعاد": Palette,
  "نقل الألعاب إلى الجوال": Smartphone,
  "ضمان الجودة والاختبار": Bug,
  "تصميم الصوت والموسيقى": Music,
  "استراتيجية تحقيق الدخل من الألعاب": DollarSign,
  "العمليات الحية وإدارة المجتمع": Users,
  "تطوير الواجهة الخلفية والشبكات": Server,
  "الفن التقني وتطوير خطوط الإنتاج": Wrench,
};

/* Service illustrations — indexed by position (same order EN & AR) */
const serviceImages: StaticImageData[] = [
  ImgPrototypin,   // Full Game Development
  ImgGDD,          // Game Design & Prototyping
  ImgArtAssets,    // 2D & 3D Art/Animation
  ImgPrototypin,   // Mobile Game Porting
  ImgQATesting,    // QA & Testing
  ImgArtist,       // Audio Design & Music
  ImgPublishing,   // Game Monetization Strategy
  ImgPublishing,   // Live Ops & Community Management
  ImgPrototypin,   // Backend & Network Development
  ImgArtist,       // Technical Art & Pipeline Development
];

export function ServicesContent() {
  const { language } = useLanguage();
  const t = getTranslation(language);
  const isRTL = language === "ar";
  const { items: services } = t.services;
  const [activeService, setActiveService] = useState(0);

  const t_ui = {
    en: {
      hero_label: "Services",
      hero_title: "What We Build",
      hero_subtitle:
        "End-to-end game development services from concept to live operations. We bring your vision to life.",
      services_label: "Our Expertise",
      services_title: "Services",
      process_label: "How We Work",
      process_title: "Our Process",
      tech_label: "Technology",
      tech_title: "Powered By",
      tech_subtitle:
        "We work with industry-standard engines and tools to deliver the highest quality experiences.",
      cta_title: "Ready to Build?",
      cta_subtitle:
        "Tell us about your project and let's create something players will love.",
      cta_button: "Start a Conversation",
      discuss: "Discuss This Service",
    },
    ar: {
      hero_label: "الخدمات",
      hero_title: "ما نبنيه",
      hero_subtitle:
        "خدمات تطوير ألعاب شاملة من الفكرة إلى العمليات الحية. نحوّل رؤيتك إلى واقع.",
      services_label: "خبراتنا",
      services_title: "الخدمات",
      process_label: "كيف نعمل",
      process_title: "منهجيتنا",
      tech_label: "التقنية",
      tech_title: "مدعوم بـ",
      tech_subtitle:
        "نعمل مع محركات وأدوات معيارية في الصناعة لتقديم أعلى جودة.",
      cta_title: "جاهز للبناء؟",
      cta_subtitle: "أخبرنا عن مشروعك ولنصنع شيئاً يحبه اللاعبون.",
      cta_button: "ابدأ محادثة",
      discuss: "ناقش هذه الخدمة",
    },
  }[language];

  const processSteps = {
    en: [
      { title: "Discovery", description: "We learn about your vision, goals, audience, and scope to define a clear roadmap.", image: ImgConcept },
      { title: "Design & Prototype", description: "Rapid prototyping and design iteration to nail the core mechanics and look before full production.", image: ImgDesigning },
      { title: "Development", description: "Agile sprints with regular builds, playtests, and milestones so you see progress every step.", image: ImgPrototyping },
      { title: "Polish & QA", description: "Rigorous testing, optimization, and polish to ensure a seamless player experience at launch.", image: ImgTesting },
      { title: "Launch & Live Ops", description: "Store submission, launch support, and ongoing live ops to keep players engaged post-release.", image: ImgLaunch },
    ],
    ar: [
      { title: "الاكتشاف", description: "نتعرف على رؤيتك وأهدافك وجمهورك ونطاق المشروع لرسم خارطة طريق واضحة.", image: ImgConcept },
      { title: "التصميم والنموذج", description: "نماذج أولية سريعة وتكرار في التصميم لإتقان الآليات والشكل قبل الإنتاج الكامل.", image: ImgDesigning },
      { title: "التطوير", description: "سباقات أجايل مع بناءات منتظمة واختبارات لعب ومراحل حتى ترى التقدم في كل خطوة.", image: ImgPrototyping },
      { title: "التلميع والاختبار", description: "اختبارات صارمة وتحسين وتلميع لضمان تجربة سلسة عند الإطلاق.", image: ImgTesting },
      { title: "الإطلاق والعمليات", description: "تقديم للمتاجر ودعم الإطلاق وعمليات حية مستمرة لإبقاء اللاعبين متفاعلين.", image: ImgLaunch },
    ],
  }[language];

  return (
    <ParallaxProvider>
      <main className="min-h-screen bg-background overflow-x-hidden">

        {/* ══════════════════════════════════════
            HERO — with background image
        ══════════════════════════════════════ */}
        <section className="relative h-[55vh] min-h-[450px] flex flex-col items-center justify-center overflow-hidden">
          {/* Background art */}
          <Image
            src={HeroBg}
            alt=""
            fill
            className="object-cover object-center opacity-30"
            placeholder="blur"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 blur-[120px] rounded-full z-[5]" />

          <div className="relative z-20 container text-center space-y-5">
            <div className="animate-fade-up [animation-delay:200ms] opacity-0 fill-mode-forwards">
              <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-[0.3em] text-accent uppercase backdrop-blur-md">
                {t_ui.hero_label}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-wide text-white animate-fade-up [animation-delay:400ms] opacity-0 fill-mode-forwards">
              {t_ui.hero_title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-up [animation-delay:600ms] opacity-0 fill-mode-forwards">
              {t_ui.hero_subtitle}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>

        {/* ══════════════════════════════════════
            SERVICES — INTERACTIVE LIST + DETAIL WITH IMAGE
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28 relative">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="container relative z-10">
            <div className="text-center mb-14">
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs">
                {t_ui.services_label}
              </span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-white mt-3">
                {t_ui.services_title}
              </h2>
              <div className="h-1 w-16 bg-primary rounded-full mx-auto mt-5" />
            </div>

            {/* Desktop: Two-column interactive layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
              {/* Left: Service list */}
              <div className="col-span-5 space-y-1">
                {services.map((service, index) => {
                  const Icon = serviceIcons[service.name] || Gamepad2;
                  const isActive = activeService === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveService(index)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300",
                        isActive
                          ? "bg-primary/10 border border-primary/30"
                          : "border border-transparent hover:bg-white/5"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                          isActive
                            ? "bg-primary text-black"
                            : "bg-white/5 text-muted-foreground"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span
                          className={cn(
                            "text-sm font-bold transition-colors duration-300 block truncate",
                            isActive ? "text-primary" : "text-white"
                          )}
                        >
                          {service.name}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300",
                          isRTL ? "mr-auto" : "ml-auto",
                          isActive ? "bg-primary" : "bg-transparent"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right: Detail card with illustration */}
              <div className="col-span-7">
                <div className="sticky top-32">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                      className="relative rounded-2xl bg-card/40 backdrop-blur-sm border border-white/10 overflow-hidden"
                    >
                      {/* Illustration header */}
                      <div className="relative h-48 bg-gradient-to-br from-primary/10 via-card to-card overflow-hidden">
                        <Image
                          src={serviceImages[activeService]}
                          alt=""
                          width={200}
                          height={200}
                          className="absolute right-6 top-1/2 -translate-y-1/2 w-36 h-36 object-contain opacity-80"
                        />
                        {/* Background number */}
                        <span className="absolute top-4 left-6 text-[7rem] font-headline font-bold text-white/[0.04] leading-none select-none pointer-events-none">
                          {String(activeService + 1).padStart(2, "0")}
                        </span>
                        {/* Gradient fade to content */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/80 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-8 pt-4">
                        {(() => {
                          const Icon =
                            serviceIcons[services[activeService].name] ||
                            Gamepad2;
                          return (
                            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary mb-5">
                              <Icon className="w-6 h-6" />
                            </div>
                          );
                        })()}

                        <h3 className="text-2xl md:text-3xl font-headline font-bold text-white mb-3">
                          {services[activeService].name}
                        </h3>
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {services[activeService].description}
                        </p>

                        <div className="mt-6 pt-5 border-t border-white/5">
                          <Button
                            asChild
                            variant="ghost"
                            className="group/link p-0 hover:bg-transparent text-primary font-bold"
                          >
                            <Link
                              href="/contact-us"
                              className="flex items-center gap-2"
                            >
                              {t_ui.discuss}
                              <ArrowRight
                                className={cn(
                                  "w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1",
                                  isRTL &&
                                    "rotate-180 group-hover/link:-translate-x-1"
                                )}
                              />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Mobile: Grid cards with small illustration */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service, index) => {
                const Icon = serviceIcons[service.name] || Gamepad2;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.35 }}
                    className="group p-5 rounded-xl bg-card/40 border border-white/10 hover:border-primary/40 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Background illustration */}
                    <Image
                      src={serviceImages[index]}
                      alt=""
                      width={80}
                      height={80}
                      className="absolute -right-2 -bottom-2 w-16 h-16 object-contain opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    />
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PROCESS — with illustrations
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-secondary/10 border-y border-white/5 relative">
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="container relative z-10">
            <div className="text-center mb-14">
              <span className="text-accent font-bold tracking-[0.3em] uppercase text-xs block mb-4">
                {t_ui.process_label}
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
                {t_ui.process_title}
              </h2>
              <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center p-5 md:p-6 rounded-2xl bg-card/30 border border-white/5 hover:border-accent/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0 group-hover:border-accent/30 transition-colors duration-300 mx-auto md:mx-0">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] font-bold text-accent/50 uppercase tracking-widest">
                        {language === "en" ? "Step" : "خطوة"} {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-accent transition-colors mb-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                  </div>

                  {/* Step connector arrow (hidden on last) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute -bottom-4 left-12 z-10">
                      <div className="w-px h-4 bg-white/10 mx-auto" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            TECH STACK
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center mb-14">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs block mb-4">
                {t_ui.tech_label}
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
                {t_ui.tech_title}
              </h2>
              <div className="h-1 w-16 bg-primary mx-auto rounded-full" />
              <p className="text-muted-foreground mt-5 max-w-lg mx-auto">
                {t_ui.tech_subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {[
                { src: UnityImage, label: "Unity" },
                { src: UnrealEngineImage, label: "Unreal Engine" },
              ].map((engine) => (
                <motion.div
                  key={engine.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col items-center gap-4"
                >
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-primary/30 transition-all duration-300">
                    <div className="absolute -inset-2 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    <Image
                      src={engine.src}
                      alt={engine.label}
                      height={56}
                      width={56}
                      className="relative z-10 h-14 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">
                    {engine.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA
        ══════════════════════════════════════ */}
        <section className="container pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-10 md:p-14 text-center relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-3 text-white">
                {t_ui.cta_title}
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t_ui.cta_subtitle}
              </p>
              <Button
                asChild
                className="rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 font-bold px-8 h-12 text-base"
              >
                <Link href="/contact-us" className="flex items-center gap-2">
                  {t_ui.cta_button}
                  <ArrowRight
                    className={cn(
                      "w-4 h-4",
                      isRTL && "rotate-180"
                    )}
                  />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

      </main>
    </ParallaxProvider>
  );
}
