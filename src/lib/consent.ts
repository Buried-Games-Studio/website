/**
 * Shared Consent Mode state — one place for the storage key and the
 * granted-notification event, used by the banner (writer) and any code that
 * must defer analytics work until consent exists (e.g. first-touch
 * attribution). The head bootstrap in layout.tsx inlines the same storage key
 * as a string literal (inline scripts can't import).
 */

export const CONSENT_STORAGE_KEY = 'bg_consent';

/** Fired on window when the visitor grants analytics consent. */
export const CONSENT_GRANTED_EVENT = 'bg:consent-granted';

export function isAnalyticsConsentGranted(): boolean {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY) === 'granted';
  } catch {
    return false;
  }
}
