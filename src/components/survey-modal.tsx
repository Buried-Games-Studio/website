
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
import { logGtagEvent } from "@/lib/google-analytics";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import logoImage from '@/components/images/buriedgames_logo.png';
import { useToast } from "@/hooks/use-toast";


const SURVEY_KEY = "bg_survey_completed_2024";

export function SurveyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const { language, toggleLanguage } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user is likely a bot
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    if (isBot) return;

    // Check if the survey has been completed
    const surveyCompleted = localStorage.getItem(SURVEY_KEY);
    if (!surveyCompleted) {
      // Show the survey after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); 
      return () => clearTimeout(timer);
    }
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

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Image src={logoImage} alt="Buried Games Studio Logo" width={80} height={80} className="mx-auto mb-4" />
          <div className="relative">
            <AlertDialogTitle>{t.title}</AlertDialogTitle>
            <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleLanguage} 
                className={cn(
                    "absolute -top-2 right-0",
                    language === 'en' ? 'font-arabic' : 'font-body'
                )}
                aria-label="Toggle language"
            >
                {t.language_toggle}
            </Button>
          </div>
          <AlertDialogDescription>
            {t.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="social_media" id="social_media" />
                <Label htmlFor="social_media">{t.options.social_media}</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="search_engine" id="search_engine" />
                <Label htmlFor="search_engine">{t.options.search_engine}</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="friend" id="friend" />
                <Label htmlFor="friend">{t.options.friend}</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="advertisement" id="advertisement" />
                <Label htmlFor="advertisement">{t.options.advertisement}</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">{t.options.other}</Label>
            </div>
          </RadioGroup>
          {selectedValue === "other" && (
            <Input 
                type="text"
                placeholder={t.other_placeholder}
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
                className="mt-4"
            />
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleSubmit} disabled={!selectedValue || (selectedValue === 'other' && !otherValue)}>
            {t.submit}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
