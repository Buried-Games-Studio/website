
"use client";

import { useLanguage } from "@/contexts/language-context";
import { useState, useEffect } from "react";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  const t = {
    en: {
        title: "Privacy Policy",
        content: "This is a placeholder for the Privacy Policy. Replace this with your actual policy content."
    },
    ar: {
        title: "سياسة الخصوصية",
        content: "هذا محتوى مؤقت لسياسة الخصوصية. يرجى استبداله بمحتوى سياستك الفعلي."
    }
  }[language];

  return (
    <main className="container py-16 md:py-24">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline mb-8">{t.title}</h1>
        <p>{t.content}</p>
        <p>Last updated: {lastUpdated}</p>
      </div>
    </main>
  );
}
