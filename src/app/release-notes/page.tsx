"use client";

import { SummarizerForm } from "@/components/summarizer-form";
import { useLanguage } from "@/contexts/language-context";

export default function ReleaseNotesPage() {
  const { language } = useLanguage();
  const t = {
    en: {
        title: "YouTube Devlog Summarizer",
        subtitle: "Instantly generate release notes and summaries from your YouTube video descriptions."
    },
    ar: {
        title: "ملخص سجل تطوير يوتيوب",
        subtitle: "أنشئ ملاحظات الإصدار والملخصات على الفور من أوصاف فيديو يوتيوب الخاصة بك."
    }
  }[language];
  
  return (
    <main>
      <section className="container">
        <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
              {t.title}
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
              {t.subtitle}
            </p>
        </div>
        <div className="mt-12">
            <SummarizerForm />
        </div>
      </section>
    </main>
  );
}
