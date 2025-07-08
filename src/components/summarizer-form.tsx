"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { getSummary } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Wand2 } from 'lucide-react';
import { useLanguage } from "@/contexts/language-context";

const initialState = {
  summary: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { language } = useLanguage();
  const text = language === 'en' ? 'Generate Summary' : 'إنشاء ملخص';
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} className="w-full">
        <Wand2 className="mr-2 h-4 w-4" />
        {pending ? (language === 'en' ? 'Generating...' : 'جاري الإنشاء...') : text}
    </Button>
  );
}

export function SummarizerForm() {
  const [state, formAction] = useFormState(getSummary, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (state.errors) {
       const errorMsg = Object.values(state.errors).flat().join(' ')
       toast({
         variant: "destructive",
         title: language === 'en' ? "Error" : "خطأ",
         description: errorMsg,
       });
    }
  }, [state, toast, language]);
  
  const t = {
    en: {
        gameName: "Game Name",
        gameNamePlaceholder: "e.g., Power of Bombs",
        videoDescription: "YouTube Video Description",
        videoDescriptionPlaceholder: "Paste the full description from your YouTube devlog video here...",
        summaryTitle: "AI Generated Summary",
        summaryDescription: "This summary was generated based on the video description you provided."
    },
    ar: {
        gameName: "اسم اللعبة",
        gameNamePlaceholder: "مثال: Power of Bombs",
        videoDescription: "وصف فيديو يوتيوب",
        videoDescriptionPlaceholder: "الصق الوصف الكامل من فيديو سجل التطوير الخاص بك على يوتيوب هنا...",
        summaryTitle: "ملخص تم إنشاؤه بواسطة الذكاء الاصطناعي",
        summaryDescription: "تم إنشاء هذا الملخص بناءً على وصف الفيديو الذي قدمته."
    }
  }[language];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? 'Summarizer Input' : 'مدخلات الملخص'}</CardTitle>
          <CardDescription>{language === 'en' ? 'Provide the devlog details to generate a summary.' : 'قدم تفاصيل سجل التطوير لإنشاء ملخص.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gameName">{t.gameName}</Label>
              <Input id="gameName" name="gameName" type="text" placeholder={t.gameNamePlaceholder} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="videoDescription">{t.videoDescription}</Label>
              <Textarea id="videoDescription" name="videoDescription" placeholder={t.videoDescriptionPlaceholder} className="min-h-[200px]" required />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {state.summary ? (
             <Card className="bg-primary/5 border-primary/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-6 h-6 text-primary" />
                    {t.summaryTitle}
                  </CardTitle>
                  <CardDescription>{t.summaryDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/90 whitespace-pre-wrap">{state.summary}</p>
                </CardContent>
             </Card>
        ) : (
            <div className="flex flex-col items-center justify-center text-center h-full rounded-lg border-2 border-dashed border-muted-foreground/30 p-8">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-muted-foreground">{language === 'en' ? 'Your summary will appear here' : 'سيظهر ملخصك هنا'}</h3>
                <p className="text-muted-foreground/80 mt-2">{language === 'en' ? 'Fill out the form and click generate.' : 'املأ النموذج وانقر على إنشاء.'}</p>
            </div>
        )}
      </div>
    </div>
  );
}
