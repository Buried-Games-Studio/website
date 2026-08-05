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
import { Loader2, Send, User, Mail, MessageSquare, HelpCircle, Megaphone, Paperclip, Link2, Linkedin } from "lucide-react";
import { trackContactFormSubmit } from "@/lib/google-analytics";
import { getAttribution } from "@/lib/attribution";

export default function ContactForm() {
  const { language } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  // Controlled so the careers-only fields can appear when a job application is
  // what the visitor is actually sending. Radix still renders the hidden input
  // that carries `inquiryType` in the FormData.
  const [inquiryType, setInquiryType] = useState("");
  const isCareers = inquiryType === "careers";

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
            careers: "Careers — Job Application",
        },
        cv: "CV / Résumé (optional)",
        cvHint: "PDF or Word document, up to 5MB.",
        cvTooLarge: "Your CV is larger than 5MB — please attach a smaller file or send a link instead.",
        cvWrongType: "Please attach your CV as a PDF or Word document.",
        portfolio: "Portfolio or website (optional)",
        portfolioPlaceholder: "https://artstation.com/yourname",
        linkedin: "LinkedIn (optional)",
        linkedinPlaceholder: "https://linkedin.com/in/yourname",
        careersMessagePlaceholder: "Tell us about your experience, the role you're after, and what you've shipped...",
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
        errorDescription:
            "We couldn't send your message. Please try again, or email support@buriedgames.com.",
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
            careers: "وظائف — طلب توظيف",
        },
        cv: "السيرة الذاتية (اختياري)",
        cvHint: "ملف PDF أو Word، بحد أقصى ٥ ميغابايت.",
        cvTooLarge: "حجم سيرتك الذاتية يتجاوز ٥ ميغابايت — أرفق ملفاً أصغر أو أرسل رابطاً بدلاً منه.",
        cvWrongType: "يرجى إرفاق سيرتك الذاتية بصيغة PDF أو Word.",
        portfolio: "معرض الأعمال أو الموقع (اختياري)",
        portfolioPlaceholder: "https://artstation.com/yourname",
        linkedin: "لينكدإن (اختياري)",
        linkedinPlaceholder: "https://linkedin.com/in/yourname",
        careersMessagePlaceholder: "حدّثنا عن خبرتك، والدور الذي تسعى إليه، والأعمال التي أنجزتها...",
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
        errorDescription:
            "تعذّر إرسال رسالتك. الرجاء المحاولة مرة أخرى أو مراسلتنا على support@buriedgames.com.",
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

      // The action request itself can fail before it ever returns a state
      // (offline, an edge challenge on the POST, a deploy that invalidated the
      // action id). Unhandled, that rejection stops the spinner and shows the
      // visitor nothing at all.
      let result: Awaited<ReturnType<typeof sendContactEmail>>;
      try {
        result = await sendContactEmail(formData, language as string);
      } catch (error) {
        console.error("Contact form submission failed:", error);
        toast({
          variant: "destructive",
          title: t.errorTitle,
          description: t.errorDescription,
        });
        return;
      }

      if (!result.success) {
        // `errors` is zod's flatten().fieldErrors — a Record<string, string[]>
        // with an extra `_form` key for server-config / Brevo failures, never a
        // plain string. Prefer the form-level failure, then the first field
        // error, then localized copy, so a failed submit always explains itself
        // instead of showing a bare red title.
        const errors = result.errors;
        const description =
          (errors && (errors._form?.[0] ?? Object.values(errors).flat()[0])) ??
          t.errorDescription;

        toast({
          variant: "destructive",
          title: t.errorTitle,
          description,
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
        // form.reset() cannot clear a controlled Radix select, and leaving it
        // on "careers" would keep the CV block open over an empty form.
        setInquiryType("");
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

          <Select name="inquiryType" required value={inquiryType} onValueChange={setInquiryType}>
            <SelectTrigger className="w-full ps-11 bg-background border-border focus:ring-primary/30 focus:border-primary/50 h-12 rounded-lg">
              <SelectValue placeholder={t.inquiryTypePlaceholder} />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="general">{t.inquiryOptions.general}</SelectItem>
              <SelectItem value="collaboration">{t.inquiryOptions.collaboration}</SelectItem>
              <SelectItem value="publishing">{t.inquiryOptions.publishing}</SelectItem>
              <SelectItem value="support">{t.inquiryOptions.support}</SelectItem>
              <SelectItem value="press">{t.inquiryOptions.press}</SelectItem>
              <SelectItem value="careers">{t.inquiryOptions.careers}</SelectItem>
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
            placeholder={isCareers ? t.careersMessagePlaceholder : t.messagePlaceholder}
            required
            // Mirrors the server rule (contactSchema.message min 10) so the
            // browser catches it inline instead of a round-trip that returns
            // an English-only zod string.
            minLength={10}
            className="ps-11 pt-3 bg-background border-border focus-visible:ring-primary/30 focus-visible:border-primary/50 min-h-[140px] resize-none transition-all duration-200 rounded-lg"
          />
        </div>
      </div>

      {/* Careers-only fields. A job application needs a CV and links; every
          other kind of inquiry would just be cluttered by them, so they appear
          only once "Careers" is chosen. All three are optional — a good
          candidate with a portfolio link and no PDF should still get through. */}
      {isCareers && (
        <div className="space-y-5 rounded-lg border border-border bg-card/40 p-4">
          <div className="space-y-2 group">
            <Label htmlFor="cv" className="text-xs font-medium tracking-wide text-foreground/60 group-focus-within:text-foreground transition-colors">
              {t.cv}
            </Label>
            <div className="relative">
              <Paperclip className="absolute start-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40 z-10 pointer-events-none" />
              <Input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  // Fail here rather than after a 6MB upload the action will
                  // reject anyway. The server re-checks both regardless.
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const allowed = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ];
                  const problem = !allowed.includes(file.type)
                    ? t.cvWrongType
                    : file.size > 5 * 1024 * 1024
                      ? t.cvTooLarge
                      : null;
                  if (problem) {
                    e.target.value = "";
                    toast({ variant: "destructive", title: t.errorTitle, description: problem });
                  }
                }}
                className="ps-11 bg-background border-border focus-visible:ring-primary/30 focus-visible:border-primary/50 h-12 pt-2.5 transition-all duration-200 rounded-lg file:text-foreground/70 file:text-sm file:me-3 file:border-0 file:bg-transparent"
              />
            </div>
            <p className="text-xs text-foreground/40">{t.cvHint}</p>
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="portfolio" className="text-xs font-medium tracking-wide text-foreground/60 group-focus-within:text-foreground transition-colors">
              {t.portfolio}
            </Label>
            <div className="relative">
              <Link2 className="absolute start-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <Input
                id="portfolio"
                name="portfolio"
                type="url"
                dir="ltr"
                placeholder={t.portfolioPlaceholder}
                className="ps-11 bg-background border-border focus-visible:ring-primary/30 focus-visible:border-primary/50 h-12 transition-all duration-200 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="linkedin" className="text-xs font-medium tracking-wide text-foreground/60 group-focus-within:text-foreground transition-colors">
              {t.linkedin}
            </Label>
            <div className="relative">
              <Linkedin className="absolute start-3.5 top-3.5 h-4.5 w-4.5 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <Input
                id="linkedin"
                name="linkedin"
                type="url"
                dir="ltr"
                placeholder={t.linkedinPlaceholder}
                className="ps-11 bg-background border-border focus-visible:ring-primary/30 focus-visible:border-primary/50 h-12 transition-all duration-200 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

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