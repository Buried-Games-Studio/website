"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Heart, Wand2, ShieldCheck, Handshake, Target, ArrowRight } from "lucide-react";
import { ParallaxProvider } from 'react-scroll-parallax';
import FahedAlahmadImage from '@/components/images/fahed_alahmad.jpeg';
import GavanLogo from '@/components/images/gavan.png';
import dynamic from "next/dynamic";
const ParticlesBackground = dynamic(() => import("@/components/particles-background").then(mod => mod.ParticlesBackground), { ssr: false });
import AboutUsImage from '@/components/images/AboutUsSection.webp';

export function AboutUsContent() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const t_ui = {
    en: {
      page_title: "About Buried Games",
      page_subtitle: "We don't just build games. We craft worlds.",
      contact_title: "Join Our Journey",
      contact_subtitle: "Whether you're a player, partner, or creator, we want to hear from you.",
      contact_cta: "Get In Touch",
      core_values_title: "Our DNA",
      our_story_title: "The Origin Story",
      mission_label: "Our Mission",
      partners_title: "Strategic Partners",
      founder_role: "Founder & Lead Developer"
    },
    ar: {
      page_title: "عن بريد جيمز",
      page_subtitle: "نحن لا نصنع الألعاب فقط. نحن نصنع عوالم.",
      contact_title: "انضم إلى رحلتنا",
      contact_subtitle: "سواء كنت لاعبًا أو شريكًا أو مبدعًا، نود أن نسمع منك.",
      contact_cta: "تواصل معنا",
      core_values_title: "هويتنا",
      our_story_title: "قصة البداية",
      mission_label: "مهمتنا",
      partners_title: "شركاء النجاح",
      founder_role: "المؤسس والمطور الرئيسي"
    },
  }[language];

  const coreValues = {
      en: [
        { icon: Heart, title: 'Passion First', description: 'Driven by an obsession with gameplay excellence.' },
        { icon: Wand2, title: 'Innovation', description: 'Pushing boundaries with new tech and mechanics.' },
        { icon: ShieldCheck, title: 'Quality', description: 'Polished, bug-free, and immersive experiences.' },
      ],
      ar: [
        { icon: Heart, title: 'الشغف أولاً', description: 'مدفوعون بهوس التميز في أسلوب اللعب.' },
        { icon: Wand2, title: 'الابتكار', description: 'دفع الحدود بتقنيات وآليات جديدة.' },
        { icon: ShieldCheck, title: 'الجودة', description: 'تجربة مصقولة، خالية من الأخطاء، وغامرة.' },
      ]
  }[language]

  return (
    <ParallaxProvider>
      <main className="min-h-screen bg-background overflow-x-hidden">

        {/* --- Cinematic Hero --- */}
        <section className="relative h-[60vh] min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
          <ParticlesBackground />

          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full -z-10" />

          <div className="relative z-20 container text-center space-y-6">
            <div className="inline-block animate-fade-up [animation-delay:200ms] opacity-0 fill-mode-forwards">
                <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-bold tracking-widest text-accent uppercase backdrop-blur-md">
                    Studio Profile
                </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-wide text-white animate-fade-up [animation-delay:400ms] opacity-0 fill-mode-forwards">
              {t_ui.page_title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:600ms] opacity-0 fill-mode-forwards">
              {t.about_page.title}
            </p>
          </div>
        </section>

        {/* --- Our Story & Mission (Split Layout) --- */}
        <section className="container py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

                {/* Left: Story */}
                <div className="space-y-8 relative">
                     {/* Vertical Line Decoration */}
                     <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-white/10 to-transparent hidden lg:block" />

                     <div>
                        <h2 className="text-4xl font-headline font-bold mb-6 flex items-center gap-3">
                            <span className="w-12 h-1 bg-accent rounded-full" />
                            {t_ui.our_story_title}
                        </h2>
                        <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed space-y-6">
                            <p>{t.about_page.p1}</p>
                            <p>{t.about_page.p2}</p>
                        </div>
                     </div>

                     {/* Mission Card (Embedded) */}
                     <div className="bg-secondary/20 border-l-4 border-accent p-8 rounded-r-xl backdrop-blur-sm">
                         <div className="flex items-center gap-3 mb-4 text-accent">
                             <Target className="w-6 h-6" />
                             <h3 className="font-bold uppercase tracking-wider">{t_ui.mission_label}</h3>
                         </div>
                         <p className="text-white text-lg font-medium italic">
                             "{t.about_page.mission_text}"
                         </p>
                     </div>
                </div>

                {/* Right: Visual/Image */}
                <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                     <Image
                        src={AboutUsImage}
                        alt="Studio Environment"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                        placeholder="blur"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="text-white/80 text-sm font-mono uppercase tracking-widest mb-2">Est. 2018</div>
                        <div className="text-2xl font-bold text-white">Kuwait City, Kuwait</div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- Core Values (Holographic Grid) --- */}
        <section className="py-24 bg-secondary/10 border-y border-white/5">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                     <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">{t_ui.core_values_title}</h2>
                     <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {coreValues.map((value, index) => (
                      <div key={index} className="group relative p-8 rounded-2xl bg-card/5 border border-white/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_-10px_rgba(var(--accent),0.3)]">
                           {/* Glow Effect */}
                           <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                           <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-accent mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                    <value.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-accent transition-colors">{value.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                           </div>
                      </div>
                  ))}
                </div>
            </div>
        </section>

        {/* --- Founder Section (Spotlight Card) --- */}
        <section className="container py-24">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <Users className="w-8 h-8 text-accent" />
                    <h2 className="text-4xl font-headline font-bold">{t.about_page.team_title}</h2>
                </div>

                {t.about_page.team.map((member, index) => (
                    <Link key={index} href={member.linkedInUrl} target="_blank" rel="noopener noreferrer" className="block group">
                        <div className="relative bg-gradient-to-br from-card to-card/50 border border-white/10 rounded-3xl overflow-hidden hover:border-accent/50 transition-all duration-500">

                             <div className="grid md:grid-cols-12 gap-0">
                                 {/* Image Side */}
                                 <div className="md:col-span-5 relative h-[400px] md:h-auto overflow-hidden">
                                    <Image
                                        src={FahedAlahmadImage}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale md:grayscale-0"
                                        placeholder="blur"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-card" />
                                 </div>

                                 {/* Content Side */}
                                 <div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center relative z-10">
                                     <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-100 transition-opacity">
                                         <ArrowRight className="w-8 h-8 -rotate-45 group-hover:rotate-0 transition-transform duration-300 text-accent" />
                                     </div>

                                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase w-fit mb-4">
                                         Studio Head
                                     </div>
                                     <h3 className="text-4xl md:text-5xl font-headline font-bold mb-2 text-white">{member.name}</h3>
                                     <p className="text-xl text-accent mb-6">{t_ui.founder_role}</p>
                                     <p className="text-muted-foreground leading-relaxed">
                                         "I started Buried Games with a simple belief: games should be immersive, challenging, and respectful of the player's time. We are building the games we always wanted to play."
                                     </p>
                                 </div>
                             </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>


        {/* --- Partners Section --- */}
        <section className="py-16 border-t border-white/5 bg-black/20">
          <div className="container text-center">
            <div className="flex items-center justify-center gap-3 mb-12 opacity-50">
                <Handshake className="w-5 h-5" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase">{t_ui.partners_title}</span>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              {t.partners.items.map((partner, index) => (
                <a
                    key={index}
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                    <div className="absolute -inset-4 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    <Image
                        src={GavanLogo}
                        alt={partner.name}
                        width={180}
                        height={70}
                        className="relative z-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="container py-24">
            <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-white">{t_ui.contact_title}</h2>
                    <p className="text-xl text-muted-foreground mb-8">{t_ui.contact_subtitle}</p>
                    <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 font-bold px-8 py-6 rounded-full text-lg">
                        <Link href="/contact-us">{t_ui.contact_cta}</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
    </ParallaxProvider>
  );
}
