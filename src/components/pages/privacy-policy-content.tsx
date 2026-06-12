"use client";

import { useState, useEffect } from "react";
import { type Locale } from "@/lib/i18n";

export function PrivacyPolicyContent({ locale }: { locale: Locale }) {
  const language = locale;
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString(language === "ar" ? "ar" : "en"));
  }, [language]);

  const t = {
    en: {
        title: "Privacy Policy",
        content: "This is a placeholder for the Privacy Policy. Replace this with your actual policy content.",
        lastUpdated: "Last updated:",
    },
    ar: {
        title: "سياسة الخصوصية",
        content: "هذا محتوى مؤقت لسياسة الخصوصية. يرجى استبداله بمحتوى سياستك الفعلي.",
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
