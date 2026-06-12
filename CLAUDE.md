# Buried Games — buriedgames.com

Next.js 16 App Router · pnpm · Firebase App Hosting (auto-deploys on push to
`main`) · Cloudflare proxies apex + www (zone `d1c5abd26d6abdc3b7a94d4675112ac4`).
Dev server: `pnpm dev-local` on port 9002.

## Deploy ritual (non-negotiable)
After every push that deploys: **`pnpm after-deploy`** — purges the Cloudflare
edge (HTML is edge-cached; skipping this serves the OLD build indefinitely)
and resubmits all URLs to IndexNow. Watch a deploy land by polling live HTML
with a cache-buster (`?v=$RANDOM`), never the bare URL.

## Legal positioning rule (owner requirement)
NEVER assert a place of establishment: no "based in Kuwait", "Kuwait-based",
"studio in Kuwait", "مقره الكويت", and no PostalAddress/LocalBusiness schema.
Always service-area or cultural framing: "for/serving Kuwait & the GCC",
"نخدم العملاء في الكويت والخليج", `areaServed` arrays, and cultural facts about
the games ("KoutQ8, our take on the traditional Kuwaiti card game" is fine).

## SEO invariants
- Canonical: `https://buriedgames.com`, no www, no trailing slash. English
  unprefixed (proxy rewrites to /en internally), Arabic under /ar.
- `src/proxy.ts` derives the public hostname from **X-Forwarded-Host** (App
  Hosting's Host header is the internal *.hosted.app origin — using it served
  X-Robots-Tag noindex on production once; never regress this).
- Locale-aware URLs only via `localePath`/`languageAlternates`/
  `stripLocalePrefix` from `src/lib/i18n.ts` (usePathname returns /en-prefixed
  internal paths).
- `src/app/sitemap.ts` derives routes from content modules (service-pages,
  gcc-landing, games, devlog) — new content there is auto-advertised.
- robots.ts explicitly allows AI crawlers (GEO). Never block /_next/ or ?s=.
- New pages follow: generateMetadata with canonical + languageAlternates,
  per-page JSON-LD + BreadcrumbList, one h1, substantial unique copy, both
  locales. No FAQPage schema on two URLs (/faq is the sole carrier).

## Performance invariants (mobile 53 → 97; each was a real incident)
- `PageTransition` must keep `AnimatePresence initial={false}` — wrapping the
  page in SSR opacity:0 shipped invisible HTML (LCP 8s+, desktop NO_LCP).
- Fonts use `display: 'optional'` — with swap, the H1's webfont repaint became
  the LCP entry.
- Images go through `src/lib/cloudflare-image-loader.ts` (cdn-cgi/image): the
  App Hosting adapter disables /_next/image at build, so default loading ships
  original multi-MB assets. Never add `unoptimized`, never raw asset `<img>`s.
  Dev passes through (no Cloudflare in front of localhost).
- `experimental.inlineCss` stays on (last render-blocking requests).
- gtag loads `lazyOnload`. Hero H1 paints on first frame (no opacity-gating
  the LCP element); parallax/embers/3D-tilt are gated off touch devices.
- `apphosting.yaml`: minInstances 1 (cold starts were 3.6–5s TTFB).

## Design system (post-redesign)
- Headings: Space Grotesk via `font-headline` (Cairo carries Arabic). The
  pixel font (afolkalips) is WORDMARK-ONLY via `font-display`.
- Crimson `--primary` (355 84% 56%) with near-black `--primary-foreground`
  (white on crimson fails AA 4.5:1). Red = CTAs/eyebrow ticks/key numerals
  only; body links are underline with primary decoration, never red text.
- Layered surfaces (bg-background ↔ bg-card/40 + border-border hairlines),
  global section rhythm py-14/20 (never add py-24+), eyebrow pattern with red
  tick, start-aligned section headers, h2 = text-2xl md:text-3xl.
- WhatsApp: ONLY `WhatsAppIcon` from `@/components/icons/whatsapp` (glyph in
  #25D366) inside neutral buttons — never green-filled buttons, never
  MessageCircle, never remote flaticon images.
- One contact system: header "Start a project" button + ONE CTA band per page
  + footer contact row. No floating rails, no duplicate contact sections.
- Decorative ghost numerals need `aria-hidden`. Touch targets ≥24px.

## Infra & integrations
- Cloudflare API token + Bing Webmaster API key live in `TOKENS.md`
  (gitignored — never commit). Cloudflare token scopes: DNS edit, redirect
  rules, cache rules, cache purge, zone settings.
- Cloudflare config that must stay: email_obfuscation OFF (its injected
  script breaks React hydration → LCP collapse), image_resizing ON, apex A
  record proxied, SSL Full (strict), assets-root→apex redirect rule, cache
  rules (assets 30d edge / 7d browser; HTML respect-origin).
- assets.buriedgames.com = R2 bucket behind Cloudflare.
- Contact emails: Brevo templates 3 (EN confirm), 4 (AR confirm), 5 (studio
  notification); BREVO_API_KEY in `.env`. Template images must use absolute
  assets.buriedgames.com URLs (the old /api/images route is deleted).
- IndexNow key file: `public/6dccf9bd3ad7421c2298bcb2b3736472.txt` (validated,
  returns 200 on submission). Bing site is verified via DNS CNAME.

## Machine/tooling gotchas (this Mac)
- `node`/`npm`/`npx` are broken nvm lazy-load shell functions under the
  sandbox — use absolute paths (`~/.nvm/versions/node/v20.20.0/bin/node` is
  arm64; v22/v24 are x64 and Lighthouse refuses them under Rosetta).
- Playwright chromium-headless-shell is installed; screenshot/measure scripts
  live in /tmp/bg-shots (recreate as needed). Local Lighthouse numbers are
  noisy on this machine — trust structural audits, verify scores via PSI.
- zsh: never use `path` as a loop variable (it clobbers $PATH).
