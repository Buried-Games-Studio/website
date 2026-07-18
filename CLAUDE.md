# Buried Games — buriedgames.com

Next.js 16 App Router · pnpm · Firebase App Hosting (auto-deploys on push to
`main`) · Cloudflare proxies apex + www (zone `d1c5abd26d6abdc3b7a94d4675112ac4`).
Dev server: `pnpm dev-local` on port 9002.

## Deploy ritual (non-negotiable)
After every push that deploys: **`pnpm after-deploy`** — purges the Cloudflare
edge (HTML is edge-cached; skipping this serves the OLD build indefinitely)
and resubmits all URLs to IndexNow. Watch a deploy land by polling live HTML
with a cache-buster (`?v=$RANDOM`), never the bare URL.

## Legal positioning rule (owner requirement) — two layers, never mixed
The business has two independent layers; keep them cleanly separated.

**Market / service layer (GCC) — the ONLY thing on marketing & SEO surfaces.**
NEVER assert a GCC/Kuwait *place of establishment*: no "based in Kuwait",
"Kuwait-based", "studio in Kuwait", "مقره الكويت". Always service-area or
cultural framing: "for/serving Kuwait & the GCC", "نخدم العملاء في الكويت
والخليج", `areaServed` arrays, "rooted in the Gulf", and cultural facts about the
games ("KoutQ8, our take on the traditional Kuwaiti card game" is fine). This
layer — `areaServed`, hreflang (en/ar only, never `et`), page copy, the FAQ
"where are you located" answer — must stay 100% GCC and is never touched by the
legal layer below.

**Legal-identity layer (Estonia) — confined to legal surfaces only.**
The registered company is **Buried Games OÜ** (Estonia, via e-Residency). Its
single source of truth is `src/lib/legal-entity.ts`, and every public assertion
is GATED behind `legalEntity.registered` (false until the OÜ is on the e-Business
Register — flip it by filling the INCORPORATION block: registry code, VAT,
registered address). While false, NOTHING about the entity shows publicly (no
`legalName` in schema, no footer line, Imprint is a neutral noindex placeholder
that does not even name Estonia; Privacy/Terms name no supervisory authority or
governing law). The Estonian identity may appear ONLY on the legal-identity
surfaces: `/privacy-policy`, `/terms-of-use`, `/imprint`, the discreet footer
fine-print, and `Organization.legalName`. Still **no PostalAddress /
LocalBusiness in schema** (owner decision — only `legalName`), and never let the
Estonian identity leak into `areaServed`, hreflang, titles, or marketing copy.

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

## GEO & lead attribution (AI assistants drive real leads)
- First-touch attribution: `src/lib/attribution.ts` classifies the first
  referrer (AI assistant / search / social / referral / direct) into
  localStorage `bg_attribution`; `AttributionCapture` in the locale layout
  captures it once per browser. The contact form forwards it, and Brevo
  template 5 renders `{{ params.leadSource }}` — every lead email says where
  the client came from. GA4 gets a one-time `first_touch` event plus
  `first_touch_source`/`first_touch_channel` on `contact_form_submitted`.
- `/llms.txt` (src/app/llms.txt/route.ts) is derived from the same content
  modules as sitemap.ts — new services/landings/games/devlogs auto-appear.
- GA4: property `506151257` (measurement G-5T83FCTGPZ). Service account
  `claude-ga4-admin@buried-games-hq.iam.gserviceaccount.com` is a property
  Editor; key at `ga4-service-account.json` (repo root, gitignored, see
  TOKENS.md). Admin+Data APIs enabled in project buried-games-hq. Registered:
  event-scoped dims first_touch_source/first_touch_channel/landing_page/
  inquiry_type, key event contact_form_submitted, and channel group
  "Acquisition with AI Assistants" (AI rule first, default channels cloned
  after — channel-group rules must be andGroup>orGroup>filter on eachScope*
  fieldNames).
- AI crawler activity: Cloudflare GraphQL `httpRequestsAdaptiveGroups`
  filtered by `userAgent_like` (free plan caps queries at 1-day windows).
  July 2026 baseline per 24h: GPTBot ~56, OAI-SearchBot ~17, ChatGPT-User ~11
  (live in-conversation citations); Claude/Perplexity 0.
- Weekly GEO report: `scripts/geo-report.mjs` (Cloudflare AI crawlers + GA4
  AI sessions/leads + Bing) → reports/geo-weekly/ (gitignored) and emails the
  studio with `--email`. Scheduled via user crontab, Mondays 09:07.
- Case studies live at /case-studies from `src/lib/content/case-studies.ts`
  (auto-fed into sitemap + llms.txt). HARD RULE: only real, verifiable facts —
  no invented budgets/timelines/metrics; client case studies need the
  client's written sign-off before publishing.
- Directory listings copy: `docs/outreach/directory-listings.md` (+ canonical
  brand copy in `docs/outreach/brand-copy.md`). When directory profiles go
  live, add their URLs to Organization schema sameAs.
- `skipTrailingSlashRedirect: true` in next.config: the proxy owns ALL
  trailing-slash handling so /en/, www, junk params fold in ONE 308. The
  proxy's redirect target must stay a plain `new URL(request.url)` — NextURL
  re-appends the original trailing slash on serialization (self-redirect loop).

## Team & design-works showcase
- Team members live in `src/lib/content/team.ts` — the single source feeding
  the about-page cards, homepage credibility band, Organization schema
  (founder + employee Person nodes via `personLd`/`personLdNested`), and the
  design-works creator. Change a title/photo/link THERE only. Bokhari Hamid =
  Creative Director / المدير الإبداعي; portrait `images/bokhari_hamid.jpeg`.
- `/design-works` (module `src/lib/content/design-works.ts`) is Bokhari's
  showcase. HARD attribution rule (owner requirement): every piece is credited
  to Bokhari **with his studio title** — a team member's own work shared under
  the studio umbrella. NEVER present a piece as a Buried Games production, and
  NEVER as outsourced/partner/vendor work. Schema encodes this: `creator` =
  Person + `worksFor` → Organization; `publisher` = Organization.
- Truthfulness (same as case-studies): only real, verifiable pieces. No
  AI-generated frames presented as his craft (two AI derivatives of the Arrab
  Godfather were deliberately excluded — 896px files with ✦ watermarks).
  Third-party client pieces are described by discipline and need his sign-off.
- Adding a work: upload `images/design-works/<slug>/cover.<ext>` +
  `gallery-01…` to R2, then add one `DesignWork` entry (EN + AR for every
  Localized field). Everything flips live automatically via `hasDesignWorks()`:
  routes (404 while empty), sitemap, llms.txt, footer link, homepage band.
  The gate value is passed into client components as props (layout → Footer,
  about page → AboutUsContent) — don't import the module into shared chrome.
- R2 uploads from this Mac: wrangler is OAuth-logged-in but sees TWO accounts —
  always set `CLOUDFLARE_ACCOUNT_ID=15e65a55496c453852c91a0806965603` (bucket
  `assets`). `wrangler r2 object put "assets/images/…" --file … --content-type
  image/jpeg --remote`. After uploading over a URL that previously 404'd, run
  `pnpm after-deploy` (or purge-cdn) — the 404 gets edge-cached by the asset
  cache rules, and browsers may hold it for 7 days (hard refresh to see).

## Machine/tooling gotchas (this Mac)
- `node`/`npm`/`npx` are broken nvm lazy-load shell functions under the
  sandbox — use absolute paths (`~/.nvm/versions/node/v20.20.0/bin/node` is
  arm64; v22/v24 are x64 and Lighthouse refuses them under Rosetta).
- Playwright chromium-headless-shell is installed; screenshot/measure scripts
  live in /tmp/bg-shots (recreate as needed). Local Lighthouse numbers are
  noisy on this machine — trust structural audits, verify scores via PSI.
- zsh: never use `path` as a loop variable (it clobbers $PATH).

## Client proposals
The studio's reusable proposal system — strategy, pricing philosophy, the branded
13-page A4 HTML template, and the PDF build process (incl. the print gotchas that
make dark/glow designs render cleanly) — lives in `proposals/_template/`
(gitignored, like all client material). **When a client brief comes in, read
`proposals/_template/PLAYBOOK.md` first** — it has the full process, checklist,
and the `@media print` rules. Render PDFs with chrome-headless-shell
`--print-to-pdf`; flatten glows for print (box-shadow/text-shadow rasterise as
hard blocks in PDF viewers — see playbook).
