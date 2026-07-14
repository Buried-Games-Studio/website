/**
 * First-touch visitor attribution, kept client-side in localStorage.
 *
 * The studio's leads increasingly arrive from AI assistants (ChatGPT,
 * Perplexity, Gemini, …) rather than classic search. Those visits are
 * invisible in GSC and lumped under generic "Referral" in GA4, so we classify
 * the first referrer ourselves and carry it through to the contact-form
 * submission — every lead email then says where the client actually came from.
 */

export type AttributionChannel =
  | 'ai'
  | 'search'
  | 'social'
  | 'referral'
  | 'direct';

export type Attribution = {
  channel: AttributionChannel;
  /** Human-readable source, e.g. "ChatGPT", "Google Search", "linkedin.com". */
  source: string;
  /** Full referrer URL of the first visit ('' when direct). */
  referrer: string;
  /** Path (with query) the visitor first landed on. */
  landing: string;
  /** ISO timestamp of the first visit. */
  firstSeen: string;
};

const STORAGE_KEY = 'bg_attribution';

// Hostname → label. Matched against the referrer hostname with a
// suffix match, so subdomains (www., chat., …) are covered.
const AI_ASSISTANTS: Array<[string, string]> = [
  ['chatgpt.com', 'ChatGPT'],
  ['chat.openai.com', 'ChatGPT'],
  ['perplexity.ai', 'Perplexity'],
  ['claude.ai', 'Claude'],
  ['gemini.google.com', 'Gemini'],
  ['bard.google.com', 'Gemini'],
  ['copilot.microsoft.com', 'Microsoft Copilot'],
  ['chat.deepseek.com', 'DeepSeek'],
  ['grok.com', 'Grok'],
  ['x.ai', 'Grok'],
  ['meta.ai', 'Meta AI'],
  ['you.com', 'You.com'],
  ['chat.mistral.ai', 'Mistral Le Chat'],
];

const SEARCH_ENGINES: Array<[string, string]> = [
  ['google.', 'Google Search'],
  ['bing.com', 'Bing'],
  ['duckduckgo.com', 'DuckDuckGo'],
  ['search.yahoo.com', 'Yahoo Search'],
  ['yandex.com', 'Yandex'],
  ['ecosia.org', 'Ecosia'],
];

const SOCIAL_NETWORKS: Array<[string, string]> = [
  ['instagram.com', 'Instagram'],
  ['x.com', 'X (Twitter)'],
  ['twitter.com', 'X (Twitter)'],
  ['t.co', 'X (Twitter)'],
  ['linkedin.com', 'LinkedIn'],
  ['facebook.com', 'Facebook'],
  ['tiktok.com', 'TikTok'],
  ['youtube.com', 'YouTube'],
  ['reddit.com', 'Reddit'],
  ['snapchat.com', 'Snapchat'],
];

function matchHost(
  host: string,
  table: Array<[string, string]>,
): string | null {
  for (const [pattern, label] of table) {
    if (host === pattern || host.endsWith(`.${pattern}`) || host.includes(pattern)) {
      return label;
    }
  }
  return null;
}

export function classifyReferrer(referrer: string): {
  channel: AttributionChannel;
  source: string;
} {
  if (!referrer) return { channel: 'direct', source: 'Direct' };

  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return { channel: 'direct', source: 'Direct' };
  }
  if (!host || host === location.hostname) {
    return { channel: 'direct', source: 'Direct' };
  }

  // AI assistants first: gemini.google.com must win over the google. search rule.
  const ai = matchHost(host, AI_ASSISTANTS);
  if (ai) return { channel: 'ai', source: ai };

  const search = matchHost(host, SEARCH_ENGINES);
  if (search) return { channel: 'search', source: search };

  const social = matchHost(host, SOCIAL_NETWORKS);
  if (social) return { channel: 'social', source: social };

  return { channel: 'referral', source: host };
}

/**
 * Record the visitor's first touch (once per browser, ever). Returns the
 * attribution when this call was the one that captured it, null otherwise —
 * the caller uses that to fire the one-time analytics event.
 */
export function captureFirstTouch(): Attribution | null {
  try {
    if (localStorage.getItem(STORAGE_KEY)) return null;

    const { channel, source } = classifyReferrer(document.referrer);
    const attribution: Attribution = {
      channel,
      source,
      referrer: document.referrer,
      landing: location.pathname + location.search,
      firstSeen: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
    return attribution;
  } catch {
    // Storage unavailable (privacy mode, quota) — attribution is best-effort.
    return null;
  }
}

export function getAttribution(): Attribution | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
