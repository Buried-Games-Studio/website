"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

export function TermsOfUseContent({ locale }: { locale: Locale }) {
  const language = locale;
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString(language === "ar" ? "ar" : "en"));
  }, [language]);

  const t = {
    en: {
        title: "Terms of Use",
        content: "This is a placeholder for the Terms of Use. Replace this with your actual terms.",
        lastUpdated: "Last updated:",
    },
    ar: {
        title: "شروط الاستخدام",
        content: "هذا محتوى مؤقت لشروط الاستخدام. يرجى استبداله بشروطك الفعلية.",
        lastUpdated: "آخر تحديث:",
    }
  }[language];

  return (
    <main className="container py-16 md:py-24">
       <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline mb-8">{t.title}</h1>
        <p>{t.content}</p>
        <p>{t.lastUpdated} {lastUpdated}</p>
      </div>
    </main>
  );
}
