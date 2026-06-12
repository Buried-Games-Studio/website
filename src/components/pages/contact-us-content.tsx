"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { trackWhatsAppClick } from "@/lib/google-analytics";
import { type Locale } from "@/lib/i18n";

const WHATSAPP_URL = "https://wa.me/96555528686";

export function ContactUsContent({ locale }: { locale: Locale }) {
  const language = locale;

  const t_ui = {
    en: {
      contact_title: "Get In Touch",
      contact_subtitle: "Have a question or a project in mind? We'd love to hear from you.",
      whatsapp_label: "Chat with us on WhatsApp",
      whatsapp_hint: "The fastest way to start your game project — we usually reply within minutes.",
      whatsapp_cta: "Message us on WhatsApp",
      form_title: "Send us a Message",
    },
    ar: {
      contact_title: "تواصل معنا",
      contact_subtitle: "هل لديك سؤال أو مشروع في ذهنك؟ نود أن نسمع منك.",
      whatsapp_label: "تحدث معنا عبر واتساب",
      whatsapp_hint: "أسرع طريقة لبدء مشروع لعبتك — عادةً نرد خلال دقائق.",
      whatsapp_cta: "راسلنا عبر واتساب",
      form_title: "أرسل لنا رسالة",
    },
  }[language];

  return (
    <main>
      <section id="contact" className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline">{t_ui.contact_title}</h1>
          <p className="mt-4 text-muted-foreground">{t_ui.contact_subtitle}</p>
        </div>

        {/* Primary GCC conversion channel: prominent WhatsApp CTA near the top */}
        <div className="mt-10 max-w-xl mx-auto">
          <Card className="border-[#25D366]/30 bg-[#25D366]/5">
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold font-headline tracking-wide">{t_ui.whatsapp_label}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t_ui.whatsapp_hint}</p>
              </div>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("contact_page_primary_cta")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#25D366]/90 hover:scale-105"
              >
                <MessageCircle className="h-5 w-5" />
                {t_ui.whatsapp_cta}
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 max-w-xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 font-headline text-center tracking-wide" style={{ letterSpacing: '0.05em' }}>{t_ui.form_title}</h2>
                <ContactForm />
              </CardContent>
            </Card>
        </div>
      </section>

      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 end-8 z-50 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-bounce"
        aria-label={t_ui.whatsapp_label}
        onClick={() => trackWhatsAppClick('contact_page_fab')}
      >
        <Image src="https://cdn-icons-png.flaticon.com/512/220/220236.png" alt={t_ui.whatsapp_label} width={64} height={64} />
      </Link>
    </main>
  );
}
