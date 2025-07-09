"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const t = {
    en: {
      title: "404 - Page Not Found",
      message: "Oops! The page you are looking for does not exist. It might have been moved or deleted.",
      cta: "Go back to Homepage",
    },
    ar: {
      title: "٤٠٤ - الصفحة غير موجودة",
      message: "عفوًا! الصفحة التي تبحث عنها غير موجودة. ربما تم نقلها أو حذفها.",
      cta: "العودة إلى الصفحة الرئيسية",
    },
  }[language];

  return (
    <main className="flex min-h-[calc(100vh-theme(spacing.14))] flex-col items-center justify-center text-center">
      <div className="container flex flex-col items-center gap-4">
        <AlertTriangle className="h-16 w-16 text-destructive" />
        <h1 className="text-4xl font-bold tracking-wide sm:text-5xl font-headline !leading-tight" style={{ letterSpacing: '0.05em' }}>
          {isClient ? t.title : ""}
        </h1>
        <p className="max-w-md text-muted-foreground">
          {isClient ? t.message : ""}
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            {isClient ? t.cta : ""}
          </Link>
        </Button>
      </div>
    </main>
  );
}
