
"use client";

import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { Smartphone, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ContactUsPage() {
  const { language } = useLanguage();

  const t_ui = {
    en: {
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      form_title: "Send us a Message",
      other_options: "Other ways to connect",
      whatsapp: "Chat on WhatsApp",
      call: "Give us a Call",
    },
    ar: {
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      form_title: "أرسل لنا رسالة",
      other_options: "طرق أخرى للتواصل",
      whatsapp: "تحدث عبر واتساب",
      call: "اتصل بنا",
    }
  }[language];

  return (
    <main>
      <section id="contact" className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.contact_title}</h1>
          <p className="mt-4 text-muted-foreground">{t_ui.contact_subtitle}</p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
                <h2 className="text-2xl font-bold mb-4 font-headline">{t_ui.other_options}</h2>
                <div className="space-y-4">
                    <Link href="https://wa.me/96555528686" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-card transition-colors">
                        <MessageSquare className="w-8 h-8 text-accent" />
                        <div>
                            <h3 className="font-semibold">{t_ui.whatsapp}</h3>
                            <p className="text-muted-foreground text-sm">+965 55528686</p>
                        </div>
                    </Link>
                     <a href="tel:+96555528686" className="flex items-center gap-4 p-4 border rounded-lg hover:bg-card transition-colors">
                        <Smartphone className="w-8 h-8 text-accent" />
                        <div>
                            <h3 className="font-semibold">{t_ui.call}</h3>
                            <p className="text-muted-foreground text-sm">+965 55528686</p>
                        </div>
                    </a>
                </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 font-headline text-center">{t_ui.form_title}</h2>
                <ContactForm />
              </CardContent>
            </Card>
        </div>
      </section>
    </main>
  );
}
