
declare global {
  interface Window {
    // Overloaded: gtag carries analytics (config/event/js) and Consent Mode v2
    // (consent default/update) commands. See the consent bootstrap in layout.tsx
    // and ConsentBanner.
    gtag: {
      (command: 'consent', action: 'default' | 'update', params: Record<string, unknown>): void;
      (command: 'config', targetId: string, config?: Record<string, unknown>): void;
      (command: 'event', eventName: string, params?: Record<string, unknown>): void;
      (command: 'js', date: Date): void;
    };
    dataLayer: unknown[];
  }
}

export const logGtagEvent = (
  eventName: string,
  eventParams: Record<string, unknown>
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else {
    // gtag.js loads lazyOnload; events fired before it arrives (e.g. the
    // first-touch attribution event on a visitor's very first pageview) are
    // queued on dataLayer, which gtag.js drains on load. gtag() is literally
    // dataLayer.push(arguments) — an arguments object, not an array, so
    // replicate that shape here.
    (function (...args: unknown[]) {
      window.dataLayer = window.dataLayer || [];
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
      void args;
    })('event', eventName, eventParams);
  }
};

// ── Conversion events (Tier 1) ──────────────────────────────────

export const trackContactFormSubmit = (
  inquiryType: string,
  attribution?: { channel: string; source: string },
  heardAbout?: string
) =>
  logGtagEvent('contact_form_submitted', {
    inquiry_type: inquiryType,
    first_touch_channel: attribution?.channel ?? 'unknown',
    first_touch_source: attribution?.source ?? 'unknown',
    // Self-reported on the form; complements referrer-based first_touch_* —
    // the zero-click "ChatGPT told me about you" leads arrive as Direct.
    heard_about: heardAbout ?? 'not_answered',
  });

// Fired once per browser, on the visit that captured first-touch attribution.
// Lets GA4 answer "how many first visits came from AI assistants" directly.
export const trackFirstTouch = (attribution: {
  channel: string;
  source: string;
  landing: string;
}) =>
  // Param names match contact_form_submitted so the same GA4 custom
  // dimensions (first_touch_source/first_touch_channel) cover both events.
  logGtagEvent('first_touch', {
    first_touch_channel: attribution.channel,
    first_touch_source: attribution.source,
    landing_page: attribution.landing,
  });

export const trackStoreClick = (gameSlug: string, storeType: string, url: string) =>
  logGtagEvent('store_link_click', { game_slug: gameSlug, store_type: storeType, url });

// whatsapp_click is a GA4 key event — WhatsApp is the studio's dominant
// conversion path — so it carries the same first-touch params as the form.
export const trackWhatsAppClick = (
  location: string,
  attribution?: { channel: string; source: string } | null
) =>
  logGtagEvent('whatsapp_click', {
    location,
    first_touch_channel: attribution?.channel ?? 'unknown',
    first_touch_source: attribution?.source ?? 'unknown',
  });

// ── Engagement events (Tier 2) ──────────────────────────────────

export const trackHeroCTA = (ctaLabel: string) =>
  logGtagEvent('hero_cta_click', { cta_label: ctaLabel });

export const trackHomeCTA = (ctaLabel: string) =>
  logGtagEvent('home_cta_click', { cta_label: ctaLabel });

export const trackSocialClick = (platform: string, location: string) =>
  logGtagEvent('social_link_click', { platform, location });

export const trackVideoClick = (videoTitle: string, videoUrl: string) =>
  logGtagEvent('video_click', { video_title: videoTitle, video_url: videoUrl });

export const trackYouTubeSubscribe = () =>
  logGtagEvent('youtube_subscribe_click', {});

// ── Micro-interaction events (Tier 3) ───────────────────────────

export const trackFAQOpen = (questionIndex: number, question: string) =>
  logGtagEvent('faq_opened', { item_index: questionIndex, question });

export const trackLanguageToggle = (newLanguage: string) =>
  logGtagEvent('language_toggle', { new_language: newLanguage });

export const trackServiceCardClick = (serviceName: string) =>
  logGtagEvent('service_card_click', { service_name: serviceName });

export const trackGameGalleryNav = (gameSlug: string, direction: string) =>
  logGtagEvent('game_gallery_nav', { game_slug: gameSlug, direction });
