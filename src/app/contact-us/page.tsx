
"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import Link from "next/link";
import Image from "next/image";

export default function ContactUsPage() {
  const { language } = useLanguage();

  const t_ui = {
    en: {
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      form_title: "Send us a Message",
    },
    ar: {
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      form_title: "أرسل لنا رسالة",
    }
  }[language];

  return (
    <main>
      <section id="contact" className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.contact_title}</h1>
          <p className="mt-4 text-muted-foreground">{t_ui.contact_subtitle}</p>
        </div>

        <div className="mt-16 max-w-xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 font-headline text-center">{t_ui.form_title}</h2>
                <ContactForm />
              </CardContent>
            </Card>
        </div>
      </section>
      
      <Link
        href="https://wa.me/96555528686"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <Image src="https://cdn-icons-png.flaticon.com/512/220/220236.png" alt="Chat on WhatsApp" width={64} height={64} />
      </Link>
    </main>
  );
}
