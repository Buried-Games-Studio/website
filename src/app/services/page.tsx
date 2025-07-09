
"use client";

import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lightbulb, Palette, Smartphone, Swords, Bug, Music } from "lucide-react";

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
  };

  const t_ui = {
    en: {
      page_title: "Our Services",
      page_subtitle: "Comprehensive solutions to bring your game ideas to life.",
      contact_title: "Ready to Start a Project?",
      contact_subtitle: "Let's discuss how we can help you build the next big hit.",
      contact_cta: "Get a Quote",
    },
    ar: {
      page_title: "خدماتنا",
      page_subtitle: "حلول شاملة لتحويل أفكار ألعابك إلى واقع.",
      contact_title: "هل أنت مستعد لبدء مشروع؟",
      contact_subtitle: "دعنا نناقش كيف يمكننا مساعدتك في بناء لعبتك القادمة.",
      contact_cta: "اطلب عرض سعر",
    },
  }[language];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-card text-center">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.page_title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">{t_ui.page_subtitle}</p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="container">
        <div className="grid md:grid-cols-2 gap-8">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[service.name] || Swords;
            return (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-2 border-accent">
                      <Icon className="w-10 h-10 text-accent"/>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold font-headline tracking-wide">{service.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
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
  );
}
