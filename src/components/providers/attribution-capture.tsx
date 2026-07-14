'use client';

import { useEffect } from 'react';
import { captureFirstTouch } from '@/lib/attribution';
import { trackFirstTouch } from '@/lib/google-analytics';

/**
 * Records first-touch attribution (referrer → AI/search/social classification)
 * on the visitor's first pageview and reports it to GA4 once. Renders nothing.
 */
export function AttributionCapture() {
  useEffect(() => {
    const attribution = captureFirstTouch();
    if (attribution) trackFirstTouch(attribution);
  }, []);

  return null;
}
