"use client";

import { m } from "framer-motion";
import { Mail, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import ContactForm from "@/components/contact-form";
import { socialLinks } from "@/components/layout/social-links";
import { trackSocialClick } from "@/lib/google-analytics";
import { type Locale } from "@/lib/i18n";
import { WhatsAppLink } from "@/components/whatsapp-link";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function ContactUsContent({ locale }: { locale: Locale }) {
  const language = locale;

  const t_ui = {
    en: {
      eyebrow: "Contact",
      contact_title: "Let's build your game",
      contact_subtitle:
        "Have a question or a project in mind? Tell us a little about it and we'll get back to you with next steps.",
      form_title: "Send us a message",
      reach_title: "Reach us directly",
      whatsapp_label: "WhatsApp",
      whatsapp_value: "+965 5552 8686",
      email_label: "Email",
      email_value: "support@buriedgames.com",
      response_title: "Response time",
      response_value: "We usually reply within one business day — often within minutes on WhatsApp.",
      socials_title: "Follow the studio",
    },
    ar: {
      eyebrow: "تواصل",
      contact_title: "لنصنع لعبتك",
      contact_subtitle:
        "هل لديك سؤال أو مشروع في ذهنك؟ أخبرنا قليلاً عنه وسنعود إليك بالخطوات التالية.",
      form_title: "أرسل لنا رسالة",
      reach_title: "تواصل معنا مباشرة",
      whatsapp_label: "واتساب",
      whatsapp_value: "+965 5552 8686",
      email_label: "البريد الإلكتروني",
      email_value: "support@buriedgames.com",
      response_title: "وقت الاستجابة",
      response_value: "عادةً نرد خلال يوم عمل واحد — وغالباً خلال دقائق عبر واتساب.",
      socials_title: "تابع الاستوديو",
    },
  }[language];

  return (
    <main>
      {/* Hero band */}
      <section className="border-b border-border bg-card/40">
        <div className="container max-w-screen-xl py-14 md:py-20">
          <m.div {...reveal} className="max-w-2xl">
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-5">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {t_ui.eyebrow}
            </p>
            <h1 className="font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground">
              {t_ui.contact_title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-foreground/65 max-w-2xl">
              {t_ui.contact_subtitle}
            </p>
          </m.div>
        </div>
      </section>

      <section className="container max-w-screen-xl py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
          {/* Form */}
          <m.div
            {...reveal}
            className="rounded-xl border border-border bg-card p-6 md:p-8"
          >
            <h2 className="font-headline font-bold tracking-tight text-xl md:text-2xl mb-6">
              {t_ui.form_title}
            </h2>
            <ContactForm />
          </m.div>

          {/* Contact rail */}
          <m.aside
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.08 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-headline font-bold tracking-tight text-base md:text-lg mb-5">
                {t_ui.reach_title}
              </h2>
              <div className="space-y-4">
                <WhatsAppLink
                  location="contact_page"
                  className="group flex items-start gap-3 -mx-2 px-2 py-1.5 rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                    <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-foreground/50">
                      {t_ui.whatsapp_label}
                    </span>
                    <span className="block text-sm text-foreground group-hover:text-primary transition-colors">
                      {t_ui.whatsapp_value}
                    </span>
                  </span>
                </WhatsAppLink>

                <a
                  href="mailto:support@buriedgames.com"
                  className="group flex items-start gap-3 -mx-2 px-2 py-1.5 rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                    <Mail className="h-5 w-5 text-primary" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-foreground/50">
                      {t_ui.email_label}
                    </span>
                    <span className="block text-sm text-foreground group-hover:text-primary transition-colors">
                      {t_ui.email_value}
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                  <Clock className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t_ui.response_title}</p>
                  <p className="mt-1 text-sm text-foreground/65 leading-relaxed">
                    {t_ui.response_value}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-4">
                {t_ui.socials_title}
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon as React.ElementType;
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      onClick={() => trackSocialClick(social.label, "contact_page")}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground/70 hover:border-primary/40 hover:text-foreground transition-colors"
                    >
                      {social.icon === "whatsapp" ? (
                        <WhatsAppIcon className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </m.aside>
        </div>
      </section>
    </main>
  );
}
