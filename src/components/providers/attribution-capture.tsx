'use client';

import { useEffect } from 'react';
import { captureFirstTouch, getAttribution } from '@/lib/attribution';
import {
  CONSENT_GRANTED_EVENT,
  isAnalyticsConsentGranted,
} from '@/lib/consent';
import { trackFirstTouch } from '@/lib/google-analytics';

const SENT_KEY = 'bg_first_touch_sent';

/**
 * Records first-touch attribution (referrer → AI/search/social classification)
 * on the visitor's first pageview, and reports it to GA4 once — deferred until
 * analytics consent is granted. Firing on first mount lost the event entirely:
 * a first-time visitor hasn't answered the consent banner yet, so the ping went
 * out under analytics_storage 'denied' (invisible to reports) and the one-shot
 * was already consumed. The send is keyed on its own flag, so visitors whose
 * attribution was captured before this fix still report it on their next
 * consented visit. Renders nothing.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureFirstTouch();

    const sendOnce = () => {
      try {
        if (localStorage.getItem(SENT_KEY)) return;
        const attribution = getAttribution();
        if (!attribution) return;
        trackFirstTouch(attribution);
        localStorage.setItem(SENT_KEY, 'sent');
      } catch {
        /* storage unavailable (privacy mode) — attribution is best-effort */
      }
    };

    if (isAnalyticsConsentGranted()) {
      sendOnce();
      return;
    }
    window.addEventListener(CONSENT_GRANTED_EVENT, sendOnce);
    return () => window.removeEventListener(CONSENT_GRANTED_EVENT, sendOnce);
  }, []);

  return null;
}
