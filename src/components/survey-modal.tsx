
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";
import { localePath, type Locale } from "@/lib/i18n";
import { logGtagEvent } from "@/lib/google-analytics";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { assets } from "@/lib/assets";
import { useToast } from "@/hooks/use-toast";


const SURVEY_KEY = "bg_survey_completed_2024";

export function SurveyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const { language } = useLanguage();
  const pathname = usePathname();
  const { toast } = useToast();

  // The language switch is navigation: same route, alternate locale URL.
  const otherLocale: Locale = language === "en" ? "ar" : "en";
  const basePath = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const switchHref = localePath(otherLocale, basePath);

  useEffect(() => {
    // Check if the user is likely a bot
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    if (isBot) return;

    // Check if the survey has been completed
    const surveyCompleted = localStorage.getItem(SURVEY_KEY);
    if (surveyCompleted) return;

    // Show survey only after 45s on page AND deep scroll — surfacing it early
    // interrupted first-time visitors mid-hero, which kills conversion.
    let timeReady = false;
    let scrollReady = false;
    let shown = false;

    const tryShow = () => {
      if (timeReady && scrollReady && !shown) {
        shown = true;
        setIsOpen(true);
      }
    };

    const timer = setTimeout(() => {
      timeReady = true;
      tryShow();
    }, 45000);

    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.5) {
        scrollReady = true;
        tryShow();
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const t = {
    en: {
        title: "Just one quick question!",
        description: "How did you hear about Buried Games Studio? Your feedback helps us grow.",
        options: {
            social_media: "Social Media (YouTube, Instagram, etc.)",
            search_engine: "Search Engine (Google, etc.)",
            friend: "Friend or Colleague",
            advertisement: "Online Advertisement",
            other: "Other",
        },
        other_placeholder: "Please specify...",
        submit: "Submit",
        language_toggle: "العربية",
        toast_title: "Thank You!",
        toast_description: "We appreciate your feedback.",
    },
    ar: {
        title: "سؤال سريع واحد فقط!",
        description: "كيف سمعت عن استوديو بريد جيمز؟ تساعدنا ملاحظاتك على النمو.",
        options: {
            social_media: "وسائل التواصل الاجتماعي (يوتيوب، انستغرام، إلخ)",
            search_engine: "محرك البحث (جوجل، إلخ)",
            friend: "صديق أو زميل",
            advertisement: "إعلان عبر الإنترنت",
            other: "أخرى",
        },
        other_placeholder: "يرجى التحديد...",
        submit: "إرسال",
        language_toggle: "English",
        toast_title: "شكرًا لك!",
        toast_description: "نحن نقدر ملاحظاتك.",
    },
  }[language];

  const handleSubmit = () => {
    if (!selectedValue) return;

    const surveyResponse = selectedValue === "other" ? `Other: ${otherValue}` : selectedValue;
    
    // Send event to Google Analytics
    logGtagEvent('survey_submission', {
        'source': surveyResponse,
    });

    // Show thank you toast
    toast({
        title: t.toast_title,
        description: t.toast_description,
    });
    
    // Mark as completed and close
    localStorage.setItem(SURVEY_KEY, "true");
    setIsOpen(false);
  };


  if (!isOpen) {
    return null;
  }

  const options = [
    { value: "social_media", label: t.options.social_media },
    { value: "search_engine", label: t.options.search_engine },
    { value: "friend", label: t.options.friend },
    { value: "advertisement", label: t.options.advertisement },
    { value: "other", label: t.options.other },
  ];

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="rounded-xl border-border bg-card">
        <AlertDialogHeader>
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background">
            <Image src={assets.logo} alt="Buried Games Studio Logo" width={48} height={48} className="object-contain" />
          </div>
          <div className="relative">
            <AlertDialogTitle className="font-headline font-bold tracking-tight text-xl text-center">
              {t.title}
            </AlertDialogTitle>
            <Button
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                    "absolute -top-2 end-0 text-foreground/60 hover:text-foreground",
                    language === 'en' ? 'font-arabic' : 'font-body'
                )}
            >
                <Link href={switchHref} hrefLang={otherLocale} aria-label="Switch language">
                    {t.language_toggle}
                </Link>
            </Button>
          </div>
          <AlertDialogDescription className="text-center text-foreground/65">
            {t.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-2">
          <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="gap-2">
            {options.map((opt) => (
              <Label
                key={opt.value}
                htmlFor={opt.value}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm font-normal transition-colors",
                  selectedValue === opt.value
                    ? "border-primary/50 bg-primary/5"
                    : "border-border hover:bg-foreground/5"
                )}
              >
                <RadioGroupItem value={opt.value} id={opt.value} />
                <span>{opt.label}</span>
              </Label>
            ))}
          </RadioGroup>
          {selectedValue === "other" && (
            <Input
                type="text"
                placeholder={t.other_placeholder}
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                className="mt-3 bg-background border-border focus-visible:ring-primary/30 focus-visible:border-primary/50 rounded-lg"
            />
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={!selectedValue || (selectedValue === 'other' && !otherValue)}
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {t.submit}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
