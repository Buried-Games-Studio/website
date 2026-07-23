"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { localePath } from "@/lib/i18n";
import { CONSENT_GRANTED_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

/**
 * Applies the visitor's choice to Google Consent Mode v2 and persists it. The
 * default is 'denied' (set in the head bootstrap in layout.tsx); this only ever
 * grants/keeps-denied analytics_storage. Ad storage stays denied — we run no ads.
 * A grant is announced via CONSENT_GRANTED_EVENT so deferred analytics (the
 * one-shot first_touch event) can fire once it will actually be recorded.
 */
function applyConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* storage unavailable (private mode) — the choice just won't persist */
  }
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: value === "granted" ? "granted" : "denied",
    });
  }
  if (value === "granted") {
    window.dispatchEvent(new Event(CONSENT_GRANTED_EVENT));
  }
}

/**
 * Lightweight cookie-consent banner. Renders nothing on the server and on the
 * first client paint — it only appears after the mount effect confirms no prior
 * choice — so it never participates in LCP (the hero H1 stays the LCP element).
 * The Privacy Policy's "manage cookie preferences" control re-opens it via the
 * `bg:open-consent` window event.
 */
export function ConsentBanner() {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_STORAGE_KEY)) setOpen(true);
    } catch {
      /* if storage can't be read, don't nag */
    }
    const reopen = () => setOpen(true);
    window.addEventListener("bg:open-consent", reopen);
    return () => window.removeEventListener("bg:open-consent", reopen);
  }, []);

  if (!open) return null;

  const t = {
    en: {
      aria: "Cookie consent",
      body: "We use analytics cookies to understand how the site is used. Decline keeps only what's strictly necessary.",
      privacy: "Privacy Policy",
      accept: "Accept",
      decline: "Decline",
    },
    ar: {
      aria: "الموافقة على ملفات تعريف الارتباط",
      body: "نستخدم ملفات تعريف ارتباط للتحليلات لفهم كيفية استخدام الموقع. الرفض يُبقي فقط ما هو ضروري تمامًا.",
      privacy: "سياسة الخصوصية",
      accept: "قبول",
      decline: "رفض",
    },
  }[language];

  const choose = (value: "granted" | "denied") => {
    applyConsent(value);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t.aria}
      className="fixed inset-x-0 bottom-0 z-[80] border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/75">
          {t.body}{" "}
          <Link
            href={localePath(language, "/privacy-policy")}
            className="text-foreground underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
          >
            {t.privacy}
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="h-9 rounded-full border border-border px-4 text-sm font-medium text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            {t.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="h-9 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
