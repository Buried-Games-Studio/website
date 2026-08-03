# Buried Games — buriedgames.com

Next.js 16 App Router · pnpm · **Railway** (project `buriedgames-platform`,
service `web` — moved off Firebase App Hosting 02.08.2026) · Cloudflare
proxies apex + www (zone `d1c5abd26d6abdc3b7a94d4675112ac4`).
Dev server: `pnpm dev-local` on port 9002.

## Studio workspace layout
This repo is the **marketing site** and lives at
`~/Sites/BuriedGames/buriedgames-nextjs-web` — one of several studio projects
under the `~/Sites/BuriedGames/` umbrella (mirroring `~/Sites/mapdaps/`).
Siblings: `buriedgames-nestjs-gateway` (Nx + NestJS microservices backend),
`buriedgames-nextjs-business` (internal HQ) and `buriedgames-nextjs-portal`
(client portal). Each is its **own git repo** — the umbrella folder is not
versioned. This repo's remote stays `Buried-Games-Studio/website`, and Firebase
App Hosting builds from GitHub, so local folder names never affect deploys.

Non-code studio material lives outside the repos: `~/Sites/BuriedGames/business/`
(proposals, contracts, company-profile) and `~/Sites/BuriedGames/.plans/`.

## Deploy ritual (non-negotiable)
Deploy = `railway up` (see Railway hosting below) — **pushing to `main` no
longer deploys anything** (the Firebase auto-deploy is gone). After every
deploy that lands: **`pnpm after-deploy`** — purges the Cloudflare edge (HTML
is edge-cached with s-maxage=1y; skipping this serves the OLD build
indefinitely) and resubmits all URLs to IndexNow. Watch a deploy land by
polling live HTML with a cache-buster (`?v=$RANDOM`), never the bare URL.

## Railway hosting (current — replaced Firebase App Hosting 02.08.2026)
- Project `buriedgames-platform` (54448b81-9005-42a8-94b4-8c75b342ed7c),
  service `web` (376d6f2d-81b5-46b5-8c55-c99430ff9146), env production,
  account tech@buriedgames.com, builder Railpack (auto-detected, plain
  `next build`/`next start`). Direct URL:
  https://web-production-bf83d.up.railway.app — serves `X-Robots-Tag:
  noindex` by design (fail-closed gate; only the canonical host is indexable).
- **Deploy command (never cd):**
  `railway up /Users/fahedalahmad/Sites/BuriedGames/buriedgames-nextjs-web --service web --detach`
  then poll `railway deployment list --service web --json` until the newest
  deployment is SUCCESS, then run the after-deploy ritual. `railway up`
  respects .gitignore (`.env`/`TOKENS.md`/`ga4-service-account.json` are never
  uploaded).
- Env vars on the service: the three `BREVO_*` only. The
  `NEXT_PUBLIC_FIREBASE_*` vars in `.env` are dead scaffold (no firebase SDK
  in deps) and were deliberately not carried over.
- **Apex only on Railway**: buriedgames.com is a proxied CF CNAME →
  `s1i8cqks.up.railway.app` (per-domain target; CF flattens at the root; the
  apex TXT farm — SPF/verifications — coexists fine because of flattening).
- **www never reaches Railway**: a Cloudflare-EDGE 301 folds www → apex
  (path+query preserved). It is NOT in zone rulesets or page rules (token
  can't read account Bulk Redirects — likely lives there) and it predates the
  Railway move (it served www in the Firebase era too). Consequences: www has
  NO Railway custom domain (one was added and deleted — its cert can never
  validate behind the edge 301, ACME HTTP-01 gets redirected to the apex);
  the CF www CNAME (proxied, target `ru7cy9bp.up.railway.app`) exists only so
  the edge accepts www traffic — the target is never contacted.
- Domain ops go through `backboard.railway.com/graphql/v2` with
  `user.accessToken` from `~/.railway/config.json` (the CLI's `railway
  domain` rejects accessToken auth). Gotcha learned during cutover: a CF PUT
  that changes a record's TYPE (A→CNAME) reissues the record ID — a
  follow-up on the old ID errors 81044 "record does not exist" even though
  the change landed.
- `pnpm-workspace.yaml` carries `packages: ['.']` — Railway's pnpm
  hard-errors on a workspace file without it (same fix as hq/portal).
- Cold starts are structurally gone (one always-on replica — the old
  apphosting.yaml minInstances:1 fix; the file is deleted). Never enable
  Railway app-sleep on this service.
- **Firebase decommission (pending, owner action — needs Google login):**
  the old App Hosting backend still exists and bills for an idle always-on
  instance. Owner: `/usr/local/bin/npx -y firebase-tools login` then
  `... apphosting:backends:list --project buried-games-hq` then
  `... apphosting:backends:delete <backend> --project buried-games-hq`.
  ⚠️ Delete ONLY the buriedgames.com website backend —
  `dashboard-koutq8.buriedgames.com` is a SEPARATE App Hosting backend and
  stays. After deletion, remove the two Firebase leftovers in CF DNS: the
  apex `fah-claim` TXT and the `_acme-challenge_cjv4d7expokgt7er` CNAME (the
  www `fah-claim` TXT is already gone — it was blocking Railway's www
  validation, a CNAME+TXT coexistence violation).

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

### Incorporation — REGISTERED 31.07.2026 ✅
**Buried Games OÜ, registry code 17564681**, entered into the e-Business
Register 31.07.2026 (ruling Ä 50317767, Tartu County Court registration
department). `legalEntity.registered` is now true, so every legal surface is
live. Public record: `ariregister.rik.ee/eng/company/17564681`.

- **D-U-N-S: 988019414** (issued 03.08.2026, verified by D&B through the
  national registry). Needed for Apple Developer / Google Play organization
  enrolment. The D&B record is ASCII — "Buried Games OU", "Tornimae tn 5" —
  because Apple's D-U-N-S form silently STRIPS diacritics rather than
  transliterating; that mismatch against the register's "Buried Games OÜ /
  Tornimäe tn 5" is expected and correct, do not try to "fix" it.
- Founded via application 3807459 (foundation number 3381776). The owner logs
  in with his e-Residency card and the portal autofills his identity, so never
  ask him to retype his personal identification code — it is deliberately NOT
  recorded in this repo, nor is his residential address.
- On the register: EMTAK **62101** principal activity · financial year 01.01–31.12 ·
  share capital **€10** (sole shareholder) · **no legal reserve** · board 1–3
  members · no VAT registration · no employees on the TÖR · foundation costs
  €265 borne by the shareholder personally (booking them to a €10-capital
  company would put net assets negative on day one).
- The share-transfer notarial waiver was **impossible** — the register demands
  €10,000 capital to waive it. Don't re-try it at €10.
- Registered address is **Tornimäe tn 5, 10145 Tallinn** — Enty's virtual-office
  address. It is NOT a Buried Games premises and must never surface as a place
  of establishment (see the GCC rule above); it belongs only in
  `legalEntity.registeredAddress`.
- ⚠️ **UNRESOLVED — address entitlement + contact person.** Enty's *Starter*
  plan is FREE and includes NEITHER the virtual office NOR a contact person
  (verified on the plan comparison table — the "Virtual office (legal address &
  contact person)" row is blank for Starter). The cheapest tier that carries
  both is **Lite: €39/mo monthly, or €33/mo billed yearly = €396/yr.** The
  company is therefore registered at Enty's address without an active
  entitlement, and no Estonian contact person is designated even though the
  whole board is abroad. Resolve by upgrading to Lite (keeps the registered
  address exactly as filed) or by buying a different provider (e.g. Dalanta
  €124/yr) and filing a change of registered address — the latter also needs
  `legalEntity.registeredAddress` updated, legal-page lastmods bumped, and a
  redeploy + `pnpm after-deploy`.
- **Enty confirmed on 31.07.2026 (in-app chat, Pablo):** Tornimäe tn 5 IS the
  correct Enty address, so the address as filed needs no amendment — never
  "fix" `legalEntity.registeredAddress` on the assumption it is wrong. And the
  contact-person entry is **filed by US, not by Enty**: once the package is
  purchased, Enty supplies instructions plus their contact-person details, and
  the change is submitted to the e-Business Register ourselves (same portal as
  the foundation application, via a change-of-data entry).
- **How to verify the contact person is actually on record:** the public
  registry card gains two fields, "Address of the contact person" and "Contact
  person's email address" (mapdap OÜ's card has them; 17564681's does not yet).
  Check `ariregister.rik.ee/eng/company/17564681`.

**FOLLOW-UPS:**
1. ~~Fill the INCORPORATION block in `src/lib/legal-entity.ts`~~ — **DONE
   31.07.2026.** `registryCode` and `registeredAddress` are set, which flipped
   the gate and lit up `Organization.legalName` (site-wide, from the locale
   layout), the footer legal line, the indexable `/imprint`, and the
   supervisory-authority + governing-law clauses in Privacy/Terms. Sitemap
   lastmod bumped to 2026-07-31 for those three legal pages only — the
   Organization node is site-wide chrome and does not justify bumping every
   URL. **`pnpm after-deploy` is mandatory after the deploy lands** or the edge
   keeps serving the placeholder Imprint.
2. **Link the company in Enty** (app.enty.io, Starter plan, "I have a company")
   so Enty is formally on record as the Estonian **contact person** — legally
   required while the whole board is outside Estonia. The portal did not block
   on it at filing, but the registrar may still raise it.
3. **Open the business account with Wamo** and actually transfer the €10 in.
   The board already certified the contribution was made, so make that true.
   Onboarding wants: registry code 17564681, registered address, the articles
   PDF, the activity (EMTAK 62101, game-development services) and the beneficial
   owner (Fahed El Ahmad, 100% direct, resident Kuwait).
4. **Estonian phone number via Telia eSIM** (+372). Wanted for the company's
   contact data, for SMS verification during fintech onboarding (providers
   generally prefer a number matching the company's jurisdiction), and as a
   route to Smart-ID / mobile-ID instead of the e-Residency card reader.
   mapdap OÜ already carries both a +372 and a UAE number, so the pattern works.

Items 2–4 all require identity verification or payment, so they are the owner's
to execute — Claude must not create accounts or handle credentials. What Claude
CAN do is verify the outcome afterwards (e.g. the contact-person fields
appearing on the public registry card).

VAT registration stays off until turnover crosses the threshold — registering
voluntarily would add monthly VAT returns for no benefit pre-revenue.

### Post-incorporation dependency chain (and the new positioning traps)
**Telia's +372 number gates two things: the Wamo bank account and Meta Business
verification** (both want a business phone for SMS/call verification). Anything
needing a D-U-N-S number does NOT depend on Telia and should start earlier —
D-U-N-S issuance is the long pole for Apple Developer organization enrolment.

Registration created three surfaces where the GCC/Estonia separation can leak.
The rule is unchanged — **legal details go on verification and commercial
forms; public profile copy stays GCC service-area** — but apply it here too:
- **Meta/Google business verification**: registry code, legal name and the
  Tallinn address go in the verification FORM. The page's public location,
  About text and category stay service-area GCC. A verified badge must not turn
  into "based in Estonia" on the profile.
- **The Estonian phone number**: a contact detail, not a place of establishment.
  Publishing +372 on the site, WhatsApp or directories is fine; describing the
  studio as Estonian because of it is not.
- **Invoices, contracts, proposals**: statutory details (legal name, registry
  code, registered address) are REQUIRED here — this is a legal surface. The
  marketing copy inside the same document still stays GCC-framed.

## SEO invariants
- Canonical: `https://buriedgames.com`, no www, no trailing slash. English
  unprefixed (proxy rewrites to /en internally), Arabic under /ar.
- `src/proxy.ts` derives the public hostname from **X-Forwarded-Host** first,
  falling back to Host (App Hosting put the internal *.hosted.app origin in
  Host — trusting it noindexed production once; on Railway both carry the
  public host, verified live 02.08.2026). Never regress the fail-closed gate:
  any non-canonical host (incl. *.up.railway.app) gets X-Robots-Tag noindex.
- Locale-aware URLs only via `localePath`/`languageAlternates`/
  `stripLocalePrefix` from `src/lib/i18n.ts` (usePathname returns /en-prefixed
  internal paths).
- `src/app/sitemap.ts` derives routes from content modules (service-pages,
  gcc-landing, games, devlog) — new content there is auto-advertised.
- Sitemap `<lastmod>`: all 96 URLs carry one and every date is hand-written —
  static routes as literals in `sitemap.ts`, content routes via the `updatedAt`
  field sitting next to each entry's `slug`. NEVER `new Date()`/mtime/build
  time: a sitemap where every URL moves on each deploy gets discounted, and
  lastmod is our main crawl-scheduling lever. Bump the date by hand when you
  edit a page's copy, title, or schema (site-wide OG/tracking/chrome tweaks
  don't count), and never reuse `publishedAt`/`datePublished` for it — those
  are schema facts about the video/project, not page-edit dates.
- robots.ts explicitly allows AI crawlers (GEO). Never block /_next/ or ?s=.
- New pages follow: generateMetadata with canonical + languageAlternates,
  per-page JSON-LD + BreadcrumbList, one h1, substantial unique copy, both
  locales. No FAQPage schema on two URLs (/faq is the sole carrier).

## Performance invariants (mobile 53 → 97; each was a real incident)
- `PageTransition` must keep `AnimatePresence initial={false}` — wrapping the
  page in SSR opacity:0 shipped invisible HTML (LCP 8s+, desktop NO_LCP).
- Fonts use `display: 'optional'` — with swap, the H1's webfont repaint became
  the LCP entry.
- Images go through `src/lib/cloudflare-image-loader.ts` (cdn-cgi/image) —
  Cloudflare transforms ARE the production image pipeline (edge-resized
  AVIF/WebP, zero origin CPU; originally forced by App Hosting disabling
  /_next/image, kept on Railway deliberately). Never add `unoptimized`, never
  raw asset `<img>`s. Dev passes through (no Cloudflare in front of localhost).
- `experimental.inlineCss` stays on (last render-blocking requests).
- gtag loads `lazyOnload`. Hero H1 paints on first frame (no opacity-gating
  the LCP element); parallax/embers/3D-tilt are gated off touch devices.
- Cold starts (3.6–5s TTFB incidents on App Hosting) are structurally gone on
  Railway: one always-on replica. Never enable app-sleep.

## Design system (post-redesign)
- Headings: Space Grotesk via `font-headline` (Cairo carries Arabic). The
  pixel font (afolkalips) is WORDMARK-ONLY via `font-display`.
- Crimson `--primary` (355 84% 56%) with near-black `--primary-foreground`
  (white on crimson fails AA 4.5:1). Red = CTAs/eyebrow ticks/key numerals
  only; body links are underline with primary decoration, never red text.
- Layered surfaces (bg-background ↔ bg-card/40 + border-border hairlines),
  global section rhythm py-14/20 (never add py-24+), eyebrow pattern with red
  tick, start-aligned section headers, h2 = text-2xl md:text-3xl.
- **WhatsApp number — switched 01.08.2026 (deployed, verified live):** the
  studio WhatsApp is the Estonian Telia line **+372 5917 7751**
  (`WHATSAPP_PHONE` in `src/lib/whatsapp.ts`); **+965 5552 8686 is
  voice-only** (`VOICE_PHONE`, founder's personal mobile). Publishing +372 is
  a contact detail; it never makes the studio "Estonian" in copy or schema.
- WhatsApp: ONLY `WhatsAppIcon` from `@/components/icons/whatsapp` (glyph in
  #25D366) inside neutral buttons — never green-filled buttons, never
  MessageCircle, never remote flaticon images.
- One contact system: header "Start a project" button + ONE CTA band per page
  + footer contact row. No floating rails, no duplicate contact sections.
- Decorative ghost numerals need `aria-hidden`. Touch targets ≥24px.

## Infra & integrations
- Cloudflare API token + Bing Webmaster API key live in `TOKENS.md`
  (gitignored — never commit). Cloudflare token scopes: DNS edit, redirect
  rules, cache rules, cache purge, zone settings, Email Routing Rules (zone),
  AND account-level Email Routing Addresses — destination addresses can be
  listed, added and deleted by API (verified 2026-07-31 by listing addresses
  and deleting one). Note `zones/{zone}/email/routing` returns 200 on plain
  zone read; only `…/email/routing/rules` proves the routing scope.
- Cloudflare config that must stay: email_obfuscation OFF (its injected
  script breaks React hydration → LCP collapse), image_resizing ON, apex +
  www proxied CNAMEs to the Railway per-domain targets (see Railway hosting),
  SSL Full (strict), assets-root→apex redirect rule, cache rules (assets 30d
  edge / 7d browser; HTML respect-origin).
- assets.buriedgames.com = R2 bucket behind Cloudflare.
- Cloudflare Email Routing aliases (catch-all is OFF/drop — an address that
  isn't listed here is silently discarded, so add a rule before publishing any
  new address): admin@, fahed@, tech@, support@, careers@, noreply@ ALL →
  alahmadfahed@gmail.com. Consolidated 2026-07-31; the old
  bg.buriedgames@gmail.com destination was deleted, so never point a rule at
  it. Routing is receive-only — sending *as* an alias needs Gmail "Send mail
  as" over Brevo SMTP.
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
- Weekly GEO report: `scripts/geo-report.mjs` (GSC search analytics + Google
  index coverage via the URL Inspection API + GA4 sessions/channels/conversions
  + Cloudflare AI crawlers + Bing) → reports/geo-weekly/ (gitignored) and emails
  the studio with `--email`. Scheduled via user crontab, Mondays 09:07.
  Everything is week-over-week; Cloudflare (8-day retention) and index coverage
  (no history API) get their deltas from `reports/geo-weekly/history.json`,
  a snapshot appended per run. The coverage sweep is ~96 sequential inspections
  and the API answers in ~6s each, so a full run takes ~10 min — `--fast` skips
  it. Conversions = `contact_form_submitted` **and**
  `whatsapp_click`; AI acquisition is read from `sessionSource` + the custom
  channel group, never from the consent-gated `first_touch` event.
  GSC gotchas: Search Analytics has no `orderBys` (it truncates by clicks desc,
  so pull a deep page and sort client-side) and its data lags ~2 days, so both
  compared windows are shifted back by two days.
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
- `docs/bokhari-works-inventory.md` is the canonical site↔ArtStation map of
  Bokhari's works (profile: artstation.com/bokhary). When asked to check for
  new works, diff his profile against that file — and update it when works
  are added.
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
- **Never `cd` (strict owner rule, umbrella-wide):** absolute paths and
  per-tool dir flags only — `railway up <abs-path>`, `git -C <abs-path>`,
  `pnpm --dir <abs-path>`.
- `node`/`npm`/`npx` are broken nvm lazy-load shell functions under the
  sandbox — use absolute paths (`~/.nvm/versions/node/v20.20.0/bin/node` is
  arm64; v22/v24 are x64 and Lighthouse refuses them under Rosetta).
- Playwright chromium-headless-shell is installed; screenshot/measure scripts
  live in /tmp/bg-shots (recreate as needed). Local Lighthouse numbers are
  noisy on this machine — trust structural audits, verify scores via PSI.
- zsh: never use `path` as a loop variable (it clobbers $PATH).

## Client proposals
Studio business material does **not** live in this repo — it sits one level up at
`~/Sites/BuriedGames/business/` (`proposals/`, `contracts/`, `company-profile/`),
outside any git repo. This repo holds only the web app.

The reusable proposal system — strategy, pricing philosophy, the branded 13-page
A4 HTML template, and the PDF build process (incl. the print gotchas that make
dark/glow designs render cleanly) — lives in `../business/proposals/_template/`.
**When a client brief comes in, read
`~/Sites/BuriedGames/business/proposals/_template/PLAYBOOK.md` first** — it has
the full process, checklist, and the `@media print` rules. Render PDFs with
chrome-headless-shell `--print-to-pdf`; flatten glows for print
(box-shadow/text-shadow rasterise as hard blocks in PDF viewers — see playbook).

`TOKENS.md` and `ga4-service-account.json` deliberately STAY at this repo root:
`scripts/purge-cdn.mjs` and `scripts/geo-report.mjs` read them from the repo root
at runtime, and purge-cdn is part of the `pnpm after-deploy` ritual. Per the
global per-project secrets convention, sibling repos get their own `TOKENS.md`.
