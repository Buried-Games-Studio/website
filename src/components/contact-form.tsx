"use client";

import { useState, useTransition } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendContactEmail } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, User, Mail, MessageSquare, HelpCircle } from "lucide-react";
import { trackContactFormSubmit } from "@/lib/google-analytics";

export default function ContactForm() {
  const { language } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // Your exact localization object
  const t = {
    en: {
        name: "Name",
        email: "Email",
        message: "Message",
        inquiryType: "Reason for Contact",
        inquiryTypePlaceholder: "Select a reason...",
        inquiryOptions: {
            general: "General Inquiry",
            collaboration: "Collaboration & Partnership",
            publishing: "Game Publishing",
            support: "Technical Support",
            press: "Press & Media",
        },
        namePlaceholder: "Your Name",
        emailPlaceholder: "your.email@example.com",
        messagePlaceholder: "Your message...",
        submit: "Send Transmission",
        submitting: "Transmitting...",
        errorTitle: "Transmission Failed",
        successTitle: "Message Received",
        successDescription: "We have received your transmission. Stand by for a response.",
    },
    ar: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        inquiryType: "سبب التواصل",
        inquiryTypePlaceholder: "اختر سبباً...",
        inquiryOptions: {
            general: "استفسار عام",
            collaboration: "تعاون وشراكة",
            publishing: "نشر الألعاب",
            support: "دعم فني",
            press: "صحافة وإعلام",
        },
        namePlaceholder: "اسمك",
        emailPlaceholder: "your.email@example.com",
        messagePlaceholder: "رسالتك...",
        submit: "أرسل الرسالة",
        submitting: "جارٍ الإرسال...",
        errorTitle: "فشل الإرسال",
        successTitle: "تم استلام رسالتك",
        successDescription: "لقد استلمنا رسالتك. سنتواصل معك قريباً.",
    }
  }[language];

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendContactEmail(formData, language as string);

      if (result.errors) {
        toast({
          variant: "destructive",
          title: t.errorTitle,
          description: result.errors.message,
        });
      } else {
        trackContactFormSubmit(formData.get('inquiryType') as string || 'unknown');
        toast({
          title: t.successTitle,
          description: t.successDescription,
          className: "bg-accent text-white border-none"
        });
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      }
    });
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-6 text-start">
      
      {/* Name Input */}
      <div className="space-y-2 group">
        <Label htmlFor="name" className="text-sm font-bold tracking-wider uppercase text-muted-foreground group-focus-within:text-accent transition-colors">
          {t.name}
        </Label>
        <div className="relative">
          <User className="absolute start-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-white transition-colors" />
          <Input
            id="name"
            name="name"
            placeholder={t.namePlaceholder}
            required
            className="ps-12 bg-black/20 border-white/10 focus:border-accent focus:bg-accent/5 h-12 transition-all duration-300 rounded-xl text-white placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-2 group">
        <Label htmlFor="email" className="text-sm font-bold tracking-wider uppercase text-muted-foreground group-focus-within:text-accent transition-colors">
          {t.email}
        </Label>
        <div className="relative">
          <Mail className="absolute start-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-white transition-colors" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t.emailPlaceholder}
            required
            className="ps-12 bg-black/20 border-white/10 focus:border-accent focus:bg-accent/5 h-12 transition-all duration-300 rounded-xl text-white placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Inquiry Type Select */}
      <div className="space-y-2 group">
        <Label htmlFor="inquiryType" className="text-sm font-bold tracking-wider uppercase text-muted-foreground group-focus-within:text-accent transition-colors">
          {t.inquiryType}
        </Label>
        <div className="relative">
          <HelpCircle className="absolute start-4 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-white transition-colors z-10 pointer-events-none" />

          <Select name="inquiryType" required>
            <SelectTrigger className="w-full ps-12 bg-black/20 border-white/10 focus:border-accent focus:ring-accent/20 h-12 rounded-xl text-white">
              <SelectValue placeholder={t.inquiryTypePlaceholder} />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10 text-white">
              <SelectItem value="general">{t.inquiryOptions.general}</SelectItem>
              <SelectItem value="collaboration">{t.inquiryOptions.collaboration}</SelectItem>
              <SelectItem value="publishing">{t.inquiryOptions.publishing}</SelectItem>
              <SelectItem value="support">{t.inquiryOptions.support}</SelectItem>
              <SelectItem value="press">{t.inquiryOptions.press}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message Input */}
      <div className="space-y-2 group">
        <Label htmlFor="message" className="text-sm font-bold tracking-wider uppercase text-muted-foreground group-focus-within:text-accent transition-colors">
          {t.message}
        </Label>
        <div className="relative">
          <MessageSquare className="absolute start-4 top-4 h-5 w-5 text-muted-foreground group-focus-within:text-white transition-colors" />
          <Textarea
            id="message"
            name="message"
            placeholder={t.messagePlaceholder}
            required
            className="ps-12 pt-4 bg-black/20 border-white/10 focus:border-accent focus:bg-accent/5 min-h-[150px] resize-none transition-all duration-300 rounded-xl text-white placeholder:text-white/20"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        size="lg" 
        className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-14 text-lg shadow-[0_0_20px_rgba(var(--accent),0.3)] hover:shadow-[0_0_40px_rgba(var(--accent),0.5)] transition-all duration-300 rounded-xl"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="me-2 h-5 w-5 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            {t.submit}
            <Send className="ms-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}