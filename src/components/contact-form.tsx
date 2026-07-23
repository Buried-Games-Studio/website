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
import { Loader2, Send, User, Mail, MessageSquare, HelpCircle, Megaphone } from "lucide-react";
import { trackContactFormSubmit } from "@/lib/google-analytics";
import { getAttribution } from "@/lib/attribution";

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
        heardAbout: "How did you hear about us? (optional)",
        heardAboutPlaceholder: "Select...",
        heardAboutOptions: {
            chatgpt: "ChatGPT",
            gemini: "Google Gemini",
            other_ai: "Another AI assistant (Claude, Copilot, …)",
            search: "Google / web search",
            social: "Social media (Instagram, TikTok, …)",
            referral: "A friend or colleague",
            other: "Other",
        },
        namePlaceholder: "Your Name",
        emailPlaceholder: "your.email@example.com",
        messagePlaceholder: "Your message...",
        submit: "Send Message",
        submitting: "Sending…",
        errorTitle: "Something went wrong",
        successTitle: "Message sent",
        successDescription: "We received your message — we'll reply within 1 business day.",
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
        heardAbout: "كيف سمعت عنا؟ (اختياري)",
        heardAboutPlaceholder: "اختر...",
        heardAboutOptions: {
            chatgpt: "ChatGPT",
            gemini: "Google Gemini",
            other_ai: "مساعد ذكاء اصطناعي آخر (Claude، Copilot…)",
            search: "بحث Google / الويب",
            social: "وسائل التواصل (إنستغرام، تيك توك…)",
            referral: "صديق أو زميل",
            other: "أخرى",
        },
        namePlaceholder: "اسمك",
        emailPlaceholder: "your.email@example.com",
        messagePlaceholder: "رسالتك...",
        submit: "إرسال الرسالة",
        submitting: "جارٍ الإرسال…",
        errorTitle: "حدث خطأ ما",
        successTitle: "تم إرسال رسالتك",
        successDescription: "تم إرسال رسالتك — سنرد خلال يوم عمل واحد.",
    }
  }[language];

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      // Attach first-touch attribution so the studio notification email says
      // where this lead originally came from (ChatGPT, Google, LinkedIn, …).
      const attribution = getAttribution();
      if (attribution) {
        formData.set("attributionChannel", attribution.channel);
        formData.set("attributionSource", attribution.source);
        formData.set("attributionLanding", attribution.landing);
        formData.set("attributionFirstSeen", attribution.firstSeen);
      }

      const result = await sendContactEmail(formData, language as string);

      if (result.errors) {
        toast({
          variant: "destructive",
          title: t.errorTitle,
          description: result.errors.message,
        });
      } else {
        trackContactFormSubmit(
          formData.get('inquiryType') as string || 'unknown',
          attribution ?? undefined,
          formData.get('heardAbout') as string || undefined
        );
        toast({
          title: t.successTitle,
          description: t.successDescription,
          className: "bg-card border-border text-foreground"
        });
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form?.reset();
      }
    });
  }

  return (
    <form id="contact-form" action={handleSubmit} className="space-y-5 text-start">

      {/* Name Input */}
      <div className="space-y-2 group">
        <Label htmlFor="name" className="text-xs font-medium tracking-wide text-foreground/60 group-focus-within:text-foreground transition-colors">
          {t.name}
        </Label>
        <div className="relative">
          <User className="absolute start-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40 group-focus-within:text-primary transition-colors" />
          <Input
            id="name"
            name="name"
            placeholder={t.namePlaceholder}
            required
            className="ps-11 bg-background border-border focus-visible:ring-primary/30 focus-visible:border-primary/50 h-12 transition-all duration-200 rounded-lg"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-2 group">
        <Label htmlFor="email" className="text-xs font-medium tracking-wide text-foreground/60 group-focus-within:text-foreground transition-colors">
          {t.email}
        </Label>
        <div className="relative">
          <Mail className="absolute start-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40 group-focus-within:text-primary transition-colors" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={t.emailPlaceholder}
            required
            className="ps-11 bg-background border-border focus-visible:ring-primary/30 focus-visible:border-primary/50 h-12 transition-all duration-200 rounded-lg"
          />
        </div>
      </div>

      {/* Inquiry Type Select */}
      <div className="space-y-2 group">
        <Label htmlFor="inquiryType" className="text-xs font-medium tracking-wide text-foreground/60 group-focus-within:text-foreground transition-colors">
          {t.inquiryType}
        </Label>
        <div className="relative">
          <HelpCircle className="absolute start-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40 z-10 pointer-events-none" />

          <Select name="inquiryType" required>
            <SelectTrigger className="w-full ps-11 bg-background border-border focus:ring-primary/30 focus:border-primary/50 h-12 rounded-lg">
              <SelectValue placeholder={t.inquiryTypePlaceholder} />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
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
        <Label htmlFor="message" className="text-xs font-medium tracking-wide text-foreground/60 group-focus-within:text-foreground transition-colors">
          {t.message}
        </Label>
        <div className="relative">
          <MessageSquare className="absolute start-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40 group-focus-within:text-primary transition-colors" />
          <Textarea
            id="message"
            name="message"
            placeholder={t.messagePlaceholder}
            required
            className="ps-11 pt-3 bg-background border-border focus-visible:ring-primary/30 focus-visible:border-primary/50 min-h-[140px] resize-none transition-all duration-200 rounded-lg"
          />
        </div>
      </div>

      {/* How they heard about the studio — optional; closes the loop on the
          zero-click AI recommendations that automated attribution can't see
          (clients who hear the name in ChatGPT/Gemini and arrive as Direct). */}
      <div className="space-y-2 group">
        <Label htmlFor="heardAbout" className="text-xs font-medium tracking-wide text-foreground/60 group-focus-within:text-foreground transition-colors">
          {t.heardAbout}
        </Label>
        <div className="relative">
          <Megaphone className="absolute start-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40 z-10 pointer-events-none" />

          <Select name="heardAbout">
            <SelectTrigger className="w-full ps-11 bg-background border-border focus:ring-primary/30 focus:border-primary/50 h-12 rounded-lg">
              <SelectValue placeholder={t.heardAboutPlaceholder} />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="chatgpt">{t.heardAboutOptions.chatgpt}</SelectItem>
              <SelectItem value="gemini">{t.heardAboutOptions.gemini}</SelectItem>
              <SelectItem value="other_ai">{t.heardAboutOptions.other_ai}</SelectItem>
              <SelectItem value="search">{t.heardAboutOptions.search}</SelectItem>
              <SelectItem value="social">{t.heardAboutOptions.social}</SelectItem>
              <SelectItem value="referral">{t.heardAboutOptions.referral}</SelectItem>
              <SelectItem value="other">{t.heardAboutOptions.other}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 transition-all duration-300"
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
            <Send className="ms-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}