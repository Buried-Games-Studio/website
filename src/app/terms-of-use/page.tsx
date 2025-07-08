
"use client";

import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect } from "react";

export default function TermsOfUsePage() {
  const { language } = useLanguage();
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  const t = {
    en: {
        title: "Terms of Use",
        content: "This is a placeholder for the Terms of Use. Replace this with your actual terms."
    },
    ar: {
        title: "شروط الاستخدام",
        content: "هذا محتوى مؤقت لشروط الاستخدام. يرجى استبداله بشروطك الفعلية."
    }
  }[language];

  return (
    <main className="container py-16 md:py-24">
       <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-8">{t.title}</h1>
        <p>{t.content}</p>
        <p>Last updated: {lastUpdated}</p>
      </div>
    </main>
  );
}
