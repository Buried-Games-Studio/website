
"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";

export default function ContactUsPage() {
  const { language } = useLanguage();

  const t_ui = {
    en: {
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you."
    },
    ar: {
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك."
    }
  }[language];

  return (
    <main>
        <section id="contact" className="container py-16 md:py-24">
           <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.contact_title}</h1>
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
  );
}
