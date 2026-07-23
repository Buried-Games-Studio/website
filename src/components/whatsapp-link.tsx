"use client";

import { useEffect, useState, type AnchorHTMLAttributes } from "react";
import { useLanguage } from "@/contexts/language-context";
import { getAttribution } from "@/lib/attribution";
import { trackWhatsAppClick } from "@/lib/google-analytics";
import { WHATSAPP_URL, whatsAppHref } from "@/lib/whatsapp";

type WhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** GA4 whatsapp_click `location` param, e.g. "footer", "hero", "faq". */
  location: string;
};

/**
 * The one way to render a WhatsApp link. Server-renders the bare wa.me URL,
 * then upgrades the href after mount with the locale-aware prefill + first-touch
 * ref (attribution lives in localStorage, so it only exists client-side), and
 * reports whatsapp_click — now a GA4 key event — with the same first_touch
 * params as the contact form.
 */
export function WhatsAppLink({
  location,
  children,
  onClick,
  ...anchorProps
}: WhatsAppLinkProps) {
  const { language } = useLanguage();
  const [href, setHref] = useState(WHATSAPP_URL);

  useEffect(() => {
    setHref(whatsAppHref(language, getAttribution()));
  }, [language]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...anchorProps}
      onClick={(event) => {
        trackWhatsAppClick(location, getAttribution());
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
