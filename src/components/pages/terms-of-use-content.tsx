"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { type Locale } from "@/lib/i18n";

export function TermsOfUseContent({ locale }: { locale: Locale }) {
  const language = locale;
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString(language === "ar" ? "ar" : "en"));
  }, [language]);

  const t = {
    en: {
      eyebrow: "Legal",
      title: "Terms of Use",
      content: "This is a placeholder for the Terms of Use. Replace this with your actual terms.",
      lastUpdated: "Last updated:",
    },
    ar: {
      eyebrow: "قانوني",
      title: "شروط الاستخدام",
      content: "هذا محتوى مؤقت لشروط الاستخدام. يرجى استبداله بشروطك الفعلية.",
      lastUpdated: "آخر تحديث:",
    },
  }[language];

  return (
    <main>
      <section className="border-b border-border bg-card/40">
        <div className="container max-w-3xl py-14 md:py-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-3 text-[11px] md:text-xs font-medium tracking-[0.25em] text-foreground/60 uppercase mb-5">
              <span aria-hidden="true" className="inline-block w-6 h-px bg-primary" />
              {t.eyebrow}
            </p>
            <h1 className="font-headline font-bold tracking-tight text-3xl md:text-4xl text-foreground">
              {t.title}
            </h1>
            {lastUpdated && (
              <p className="mt-4 text-sm text-foreground/50">
                {t.lastUpdated} {lastUpdated}
              </p>
            )}
          </m.div>
        </div>
      </section>

      <section className="container max-w-3xl py-14 md:py-20">
        <article className="prose prose-invert max-w-none prose-headings:font-headline prose-headings:tracking-tight prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/50 hover:prose-a:decoration-primary text-foreground/75 leading-relaxed">
          <p>{t.content}</p>
        </article>
      </section>
    </main>
  );
}
