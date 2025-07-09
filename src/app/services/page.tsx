
"use client";

import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lightbulb, Palette, Smartphone, Swords, Bug, Music, DollarSign, Users, Server, Workflow } from "lucide-react";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const serviceIcons: { [key: string]: React.ElementType } = {
    'Full Game Development': Swords,
    'Game Design & Prototyping': Lightbulb,
    '2D & 3D Art/Animation': Palette,
    'Mobile Game Porting': Smartphone,
    'QA & Testing': Bug,
    'Audio Design & Music': Music,
    'Game Monetization Strategy': DollarSign,
    'Live Ops & Community Management': Users,
    'Backend & Network Development': Server,
    'Technical Art & Pipeline Development': Workflow,
  };

  const t_ui = {
    en: {
      page_title: "Our Services",
      page_subtitle: "Comprehensive solutions to bring your game ideas to life, from initial concept to post-launch support.",
      contact_title: "Ready to Start a Project?",
      contact_subtitle: "Let's discuss how we can help you build the next big hit.",
      contact_cta: "Get a Quote",
    },
    ar: {
      page_title: "خدماتنا",
      page_subtitle: "حلول شاملة لتحويل أفكار ألعابك إلى واقع، من الفكرة الأولية إلى دعم ما بعد الإطلاق.",
      contact_title: "هل أنت مستعد لبدء مشروع؟",
      contact_subtitle: "دعنا نناقش كيف يمكننا مساعدتك في بناء لعبتك القادمة.",
      contact_cta: "اطلب عرض سعر",
    },
  }[language];

  return (
    <ParallaxProvider>
      <main>
        {/* Hero Section */}
        <section className="bg-card overflow-hidden text-center">
            <div className="container py-16 md:py-24">
                <Parallax speed={-10}>
                    <h1 className="text-4xl font-bold tracking-wide sm:text-6xl font-headline">{t_ui.page_title}</h1>
                </Parallax>
                <Parallax speed={5}>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">{t_ui.page_subtitle}</p>
                </Parallax>
            </div>
        </section>

        {/* Services List Section */}
        <section className="container overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service, index) => {
                const Icon = serviceIcons[service.name] || Swords;
                return (
                <Parallax y={[30, -30]} key={index}>
                    <Card className="flex flex-col h-full text-center hover:shadow-accent/20 hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                        <CardHeader className="items-center">
                            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4 border-2 border-accent">
                                <Icon className="w-12 h-12 text-accent"/>
                            </div>
                            <CardTitle className="text-2xl font-bold font-headline tracking-wide">{service.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                    </Card>
                </Parallax>
                );
            })}
            </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="bg-card">
            <div className="container">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight">{t_ui.contact_title}</h2>
                <p className="mt-4 text-muted-foreground">{t_ui.contact_subtitle}</p>
                <div className="mt-8">
                <Button asChild size="lg">
                    <Link href="/contact-us">{t_ui.contact_cta}</Link>
                </Button>
                </div>
            </div>
            </div>
        </section>
      </main>
    </ParallaxProvider>
  );
}
