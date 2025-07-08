"use client";

import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ContactForm } from "@/components/contact-form";
import { GameCard } from "@/components/game-card";
import { CheckCircle2 } from 'lucide-react';
import Image from "next/image";

export default function Home() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const t_ui = {
    en: {
      hero_subtitle: "Crafting worlds, one game at a time.",
      hero_cta: "Explore Games",
      view_details: "View Details",
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you."
    },
    ar: {
      hero_subtitle: "نصنع العوالم، لعبة تلو الأخرى.",
      hero_cta: "استكشف الألعاب",
      view_details: "عرض التفاصيل",
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك."
    }
  }[language];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center px-4">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              Buried Games Studio
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mt-4">
              {t_ui.hero_subtitle}
            </p>
            <div className="mt-6">
              <a href="#games">
                <Button size="lg">{t_ui.hero_cta}</Button>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container">
           <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">{t.about.title}</h2>
              <p className="mt-4 text-muted-foreground">{t.about.p1}</p>
              <p className="mt-4 text-muted-foreground">{t.about.p2}</p>
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
                <Image src="https://placehold.co/600x600.png" alt="Buried Games Team" fill className="object-cover" data-ai-hint="game development" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-card">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">{t.services.title}</h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {t.services.items.map((service, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <p className="mt-2 text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Games Section */}
        <section id="games" className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
              {language === 'en' ? 'Our Games' : 'ألعابنا'}
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {t.games.map((game) => (
              <GameCard key={game.id} game={game} viewText={t_ui.view_details} />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="bg-card">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">{t.faq.title}</h2>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {t.faq.items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg text-left">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container">
           <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">{t_ui.contact_title}</h2>
             <p className="mt-4 text-muted-foreground">{t_ui.contact_subtitle}</p>
          </div>
          <div className="mt-12 max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
