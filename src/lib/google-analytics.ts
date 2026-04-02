
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const logGtagEvent = (
  eventName: string,
  eventParams: Record<string, unknown>
) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  }
};

// ── Conversion events (Tier 1) ──────────────────────────────────

export const trackContactFormSubmit = (inquiryType: string) =>
  logGtagEvent('contact_form_submitted', { inquiry_type: inquiryType });

export const trackStoreClick = (gameSlug: string, storeType: string, url: string) =>
  logGtagEvent('store_link_click', { game_slug: gameSlug, store_type: storeType, url });

export const trackWhatsAppClick = (location: string) =>
  logGtagEvent('whatsapp_click', { location });

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
