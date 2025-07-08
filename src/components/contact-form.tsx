"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { submitContactForm } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/language-context";

const initialState = {
  message: "",
  errors: undefined,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { language } = useLanguage();
  const text = language === 'en' ? 'Send Message' : 'إرسال الرسالة';
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} className="w-full">
      {pending ? (language === 'en' ? "Sending..." : "جار الإرسال...") : text}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (state.success) {
      toast({
        title: language === 'en' ? "Success!" : "نجاح!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message && state.errors) {
       const errorMsg = Object.values(state.errors).flat().join(' ')
       toast({
         variant: "destructive",
         title: language === 'en' ? "Error" : "خطأ",
         description: errorMsg,
       });
    }
  }, [state, toast, language]);

  const t = {
    en: { name: "Name", email: "Email", message: "Message", namePlaceholder: "Your Name", emailPlaceholder: "your.email@example.com", messagePlaceholder: "Your message..." },
    ar: { name: "الاسم", email: "البريد الإلكتروني", message: "الرسالة", namePlaceholder: "اسمك", emailPlaceholder: "your.email@example.com", messagePlaceholder: "رسالتك..." }
  }[language];


  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t.name}</Label>
          <Input id="name" name="name" type="text" placeholder={t.namePlaceholder} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t.email}</Label>
          <Input id="email" name="email" type="email" placeholder={t.emailPlaceholder} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t.message}</Label>
        <Textarea id="message" name="message" placeholder={t.messagePlaceholder} className="min-h-[120px]" required />
      </div>
      <SubmitButton />
    </form>
  );
}
