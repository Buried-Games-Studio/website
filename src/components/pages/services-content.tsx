"use client";

import { getTranslation } from "@/lib/content";
import { featuredServicePages } from "@/lib/content/services";
import { localePath, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/lib/assets";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
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
  Globe,
  Box,
  Cpu,
  Network,
} from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = "https://wa.me/96555528686";

/* ─────────────────────────────────────────────
   ICON MAP for the 10 service blurbs (EN & AR keys)
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

/* Featured child-page icons keyed by slug */
const featuredIcons: Record<string, React.ElementType> = {
  "game-development": Gamepad2,
  "mobile-game-development": Smartphone,
  "unity-game-development": Box,
  "multiplayer-game-development": Network,
  "unreal-engine-development": Cpu,
  "app-development": Smartphone,
  "web-development": Globe,
  "game-art-design": Palette,
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function ServicesContent({ locale }: { locale: Locale }) {
  const language = locale;
  const t = getTranslation(language);
  const isRTL = language === "ar";
  const { items: services } = t.services;

  const t_ui = {
    en: {
      hero_label: "Services",
      hero_title: "What we build",
      hero_subtitle:
        "End-to-end game development from concept to live operations — for studios, publishers, and brands across Kuwait and the GCC, alongside our own original titles.",
      hero_cta: "Start your project",
      hero_whatsapp: "WhatsApp",
      services_label: "Our expertise",
      services_title: "Everything we do",
      services_subtitle:
        "Ten disciplines, one team that owns the whole pipeline — so you brief once instead of stitching vendors together.",
      cta_title: "Ready to build?",
      cta_subtitle:
        "Tell us about your project and let's create something players will love.",
      cta_button: "Start your project",
      cta_whatsapp: "WhatsApp",
      cta_whatsapp_aria: "Chat with Buried Games on WhatsApp",
    },
    ar: {
      hero_label: "الخدمات",
      hero_title: "ما نبنيه",
      hero_subtitle:
        "تطوير ألعاب متكامل من الفكرة إلى العمليات الحية — للاستوديوهات والناشرين والعلامات التجارية في الكويت والخليج، إلى جانب ألعابنا الأصلية.",
      hero_cta: "ابدأ مشروعك",
      hero_whatsapp: "واتساب",
      services_label: "خبراتنا",
      services_title: "كل ما نقوم به",
      services_subtitle:
        "عشرة تخصصات وفريق واحد يملك خط الإنتاج كله — لتشرح مشروعك مرة واحدة بدلًا من التنسيق بين موردين منفصلين.",
      cta_title: "جاهز للبناء؟",
      cta_subtitle: "أخبرنا عن مشروعك ولنصنع شيئًا يحبه اللاعبون.",
      cta_button: "ابدأ مشروعك",
      cta_whatsapp: "واتساب",
      cta_whatsapp_aria: "تواصل مع بريد جيمز عبر واتساب",
    },
  }[language];

  const featured = featuredServicePages[language];

  return (
    <main className="bg-background overflow-x-hidden">
      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden border-b border-border bg-card/40">
        <Image
          src={assets.popOverview}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover object-center opacity-[0.12]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-[1]" />
        <div className="container relative z-10 py-16 md:py-24">
          <m.div {...reveal()} className="max-w-3xl">
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {t_ui.hero_label}
            </p>
            <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground text-balance">
              {t_ui.hero_title}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/65 leading-relaxed">
              {t_ui.hero_subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300"
              >
                <Link
                  href={localePath(language, "/contact-us")}
                  className="group flex items-center gap-2"
                >
                  {t_ui.hero_cta}
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 transition-transform group-hover:translate-x-1",
                      isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                    )}
                  />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-6 rounded-full border-foreground/20 bg-transparent text-foreground/80 hover:bg-foreground/5 hover:border-foreground/40 font-medium transition-all duration-300"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t_ui.cta_whatsapp_aria}
                  className="flex items-center gap-2"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
                  {t_ui.hero_whatsapp}
                </a>
              </Button>
            </div>
          </m.div>
        </div>
      </section>

      {/* ══════════════ FEATURED CHILD PAGES ══════════════ */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div {...reveal()} className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {featured.heading}
            </p>
            <p className="mt-5 text-foreground/65 leading-relaxed">
              {featured.subtitle}
            </p>
          </m.div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.items.map((item, index) => {
              const Icon = featuredIcons[item.slug] || Gamepad2;
              return (
                <m.div key={item.slug} {...reveal(index * 0.05)}>
                  <Link
                    href={localePath(language, `/services/${item.slug}`)}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 focus-visible:border-primary/40 focus-visible:outline-none"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base md:text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {featured.cta}
                      <ArrowRight
                        className={cn(
                          "w-4 h-4 transition-transform group-hover:translate-x-1",
                          isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                        )}
                      />
                    </span>
                  </Link>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ ALL SERVICES (10 blurbs) ══════════════ */}
      <section className="py-14 md:py-20 bg-card/40 border-y border-border">
        <div className="container">
          <m.div {...reveal()} className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {t_ui.services_label}
            </p>
            <h2 className="mt-5 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              {t_ui.services_title}
            </h2>
            <p className="mt-4 text-foreground/65 leading-relaxed">
              {t_ui.services_subtitle}
            </p>
          </m.div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.name] || Gamepad2;
              return (
                <m.div
                  key={index}
                  {...reveal((index % 3) * 0.05)}
                  className="group flex flex-col rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {service.name}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                    {service.description}
                  </p>
                </m.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="py-14 md:py-20">
        <div className="container">
          <m.div
            {...reveal()}
            className="rounded-2xl border border-border bg-card p-10 md:p-14 text-center"
          >
            <div className="mx-auto max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                {t_ui.cta_title}
              </h2>
              <p className="mt-3 text-foreground/65 leading-relaxed">
                {t_ui.cta_subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300"
                >
                  <Link
                    href={localePath(language, "/contact-us")}
                    className="group flex items-center gap-2"
                  >
                    {t_ui.cta_button}
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 transition-transform group-hover:translate-x-1",
                        isRTL && "rotate-180 rtl:group-hover:-translate-x-1"
                      )}
                    />
                  </Link>
                </Button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t_ui.cta_whatsapp_aria}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5 text-[#25D366]" />
                  {t_ui.cta_whatsapp}
                </a>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
