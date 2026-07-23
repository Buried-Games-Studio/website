"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { faqContent } from "@/lib/content/faq";
import { WhatsAppIcon } from "@/components/icons/whatsapp";
import { m } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { WhatsAppLink } from "@/components/whatsapp-link";

/**
 * Category grouping is presentation-only and lives here, not in faq.ts (which is
 * imported read-only). Each category lists the indexes of faqContent items it
 * contains, so the source FAQ stays the single source of truth while this page
 * adds an on-page categorised layout. Indexes follow the order in faq.ts.
 */
const categories: { title: Record<Locale, string>; indexes: number[] }[] = [
  { title: { en: "Studio & portfolio", ar: "الاستوديو والأعمال" }, indexes: [0, 1, 4] },
  { title: { en: "Tech & platforms", ar: "التقنيات والمنصات" }, indexes: [2, 3] },
  { title: { en: "Working with us", ar: "العمل معنا" }, indexes: [5, 6, 7, 9, 10] },
  { title: { en: "Community & careers", ar: "المجتمع والوظائف" }, indexes: [8, 11] },
];

const ui = {
  en: { home: "Home", faq: "FAQ", contactCta: "Start your project", whatsapp: "Ask us on WhatsApp", contactHeading: "Still have a question?", contactBody: "If your question is not answered here, get in touch and we'll help — in English or Arabic." },
  ar: { home: "الرئيسية", faq: "الأسئلة الشائعة", contactCta: "ابدأ مشروعك", whatsapp: "اسألنا على واتساب", contactHeading: "ما زال لديك سؤال؟", contactBody: "إن لم تجد إجابة سؤالك هنا، تواصل معنا وسنساعدك — بالإنجليزية أو العربية." },
} as const;

function Eyebrow({ label }: { label: string }) {
  return (
    <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase">
      <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
      {label}
    </p>
  );
}

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

export function FaqContent({ locale }: { locale: Locale }) {
  const isRTL = locale === "ar";
  const t = ui[locale];
  const data = faqContent[locale];
  const [open, setOpen] = useState<string | null>("0-0");

  const Arrow = (
    <ArrowRight className={cn("h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1", isRTL && "rotate-180 rtl:group-hover:-translate-x-1")} aria-hidden />
  );

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-card/40 py-14 md:py-20">
        <div className="absolute top-0 start-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
        <div className="container relative z-10 max-w-screen-xl">
          <nav aria-label={isRTL ? "مسار التنقل" : "Breadcrumb"} className="mb-6 flex flex-wrap items-center gap-2 text-xs text-foreground/55">
            <Link href={localePath(locale, "/")} className="transition-colors hover:text-foreground">{t.home}</Link>
            <span aria-hidden>/</span>
            <span className="text-foreground/80">{t.faq}</span>
          </nav>
          <m.div {...reveal}>
            <Eyebrow label={t.faq} />
            <h1 className="mt-5 max-w-3xl font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground text-start">{data.title}</h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65 text-start">
              {locale === "ar"
                ? "أجوبة على أكثر الأسئلة شيوعًا حول استوديو بريد جيمز وتطوير الألعاب في الكويت والخليج."
                : "Answers to the most common questions about Buried Games Studio and game development across Kuwait and the GCC."}
            </p>
          </m.div>
        </div>
      </section>

      {/* CATEGORISED FAQ */}
      <section className="py-14 md:py-20">
        <div className="container max-w-3xl space-y-10 md:space-y-12">
          {categories.map((cat, ci) => (
            <m.div key={ci} {...reveal}>
              <Eyebrow label={cat.title[locale]} />
              <h2 className="mt-4 font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">{cat.title[locale]}</h2>
              <div className="mt-6 space-y-3">
                {cat.indexes.map((idx) => {
                  const item = data.items[idx];
                  if (!item) return null;
                  const id = `${ci}-${idx}`;
                  const isOpen = open === id;
                  return (
                    <div
                      key={id}
                      className={cn(
                        "overflow-hidden rounded-xl border bg-card transition-colors duration-300",
                        isOpen ? "border-primary/40" : "border-border hover:border-primary/40",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-start transition-colors hover:bg-foreground/[0.03] focus-visible:bg-foreground/[0.03] focus-visible:outline-none"
                      >
                        <span className="text-base font-semibold text-foreground">{item.q}</span>
                        <ChevronDown className={cn("h-5 w-5 shrink-0 text-primary transition-transform duration-300", isOpen && "rotate-180")} aria-hidden />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5">
                          <p className="text-sm leading-relaxed text-foreground/70">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* CONTACT CTA BAND */}
      <section className="border-t border-border bg-card/40 py-14 md:py-20">
        <div className="container max-w-3xl text-center">
          <m.div {...reveal}>
            <h2 className="font-headline font-bold tracking-tight text-2xl md:text-3xl text-foreground">{t.contactHeading}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/65">{t.contactBody}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-full bg-primary px-8 text-sm md:text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                <Link href={localePath(locale, "/contact-us")} className="group flex items-center gap-2">{t.contactCta}{Arrow}</Link>
              </Button>
              <WhatsAppLink
                location="faq"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4 decoration-primary/50 transition-colors hover:decoration-primary"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-[#25D366]" />
                {t.whatsapp}
              </WhatsAppLink>
            </div>
          </m.div>
        </div>
      </section>
    </main>
  );
}
