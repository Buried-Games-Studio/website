import type { Locale } from "@/lib/i18n";
import type { Attribution } from "@/lib/attribution";

/**
 * Single source of truth for the studio's WhatsApp contact. Every rendered
 * WhatsApp link goes through WhatsAppLink (components/whatsapp-link.tsx),
 * which appends a locale-aware prefill carrying a discreet first-touch ref —
 * WhatsApp is the studio's dominant conversion path, and without the ref those
 * leads arrive with no attribution at all (the contact form forwards its
 * attribution server-side; a WhatsApp chat can only carry it in the message).
 */

export const WHATSAPP_PHONE = "96555528686";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`;

const MESSAGES: Record<Locale, string> = {
  en: "Hi Buried Games! I'd like to talk about a project.",
  ar: "مرحبًا بريد جيمز! أود التحدث عن مشروع.",
};

/**
 * wa.me href with the prefilled greeting. Non-direct first-touch sources are
 * appended as a short "ref:" line — visible to the sender, deliberately terse,
 * and the only way a WhatsApp lead can tell us it came from ChatGPT vs Google.
 */
export function whatsAppHref(
  locale: Locale,
  attribution: Attribution | null,
): string {
  let text = MESSAGES[locale];
  if (attribution && attribution.channel !== "direct") {
    text += `\n\nref: ${attribution.source}`;
  }
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
