
"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { getTranslation } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users } from "lucide-react";

export default function AboutUsPage() {
  const { language } = useLanguage();
  const t = getTranslation(language);

  const t_ui = {
    en: {
      page_title: "About Buried Games",
      page_subtitle: t.about_page.title,
      contact_cta_title: "Have a project in mind?",
      contact_cta_button: "Let's Talk",
    },
    ar: {
      page_title: "حول استوديو بريد جيمز",
      page_subtitle: t.about_page.title,
      contact_cta_title: "هل لديك مشروع في ذهنك؟",
      contact_cta_button: "لنتحدث",
    },
  }[language];

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-card">
        <div className="container py-16 md:py-24 text-center">
          <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.page_title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">{t_ui.page_subtitle}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="prose dark:prose-invert max-w-none">
            <p className="lead">{t.about_page.p1}</p>
            <p>{t.about_page.p2}</p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="font-headline text-2xl mb-4 tracking-wide">{t.about_page.mission_title}</h3>
              <p className="text-muted-foreground">{t.about_page.mission_text}</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-card">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight flex items-center justify-center gap-4">
              <Users className="w-10 h-10" />
              {t.about_page.team_title}
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
            {t.about_page.team.map((member, index) => (
              <Card key={index} className="text-center max-w-sm mx-auto">
                <CardContent className="p-6">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="rounded-full mx-auto mb-4 border-4 border-accent"
                    data-ai-hint={member.imageHint}
                  />
                  <h3 className="text-xl font-bold font-headline tracking-wide">{member.name}</h3>
                  <p className="text-accent">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container text-center">
         <h2 className="text-3xl font-bold font-headline tracking-wide">{t_ui.contact_cta_title}</h2>
         <div className="mt-6">
            <Button asChild size="lg">
                <Link href="/contact-us">{t_ui.contact_cta_button}</Link>
            </Button>
         </div>
      </section>
    </main>
  );
}
