# Buried Games — Backlink & Entity Campaign Playbook

Goal: grow from 9 referring links to an authoritative entity graph + steady
editorial links, so the on-site work (78 indexable URLs, PSI 97/100) can rank.
Work top to bottom; Tier 1 unblocks everything else.

**The legal wording rule applies to every submission and pitch**: never
"based in Kuwait" / establishment claims — always "an independent GCC games
studio serving clients across Kuwait & the GCC" and cultural framing for the
games themselves.

---

## 0 · Prerequisites — reconcile the canonical facts FIRST

Knowledge graphs reward consistency. Right now three sources disagree.
Resolve these before creating Wikidata/Crunchbase entries:

| Fact | Site/schema says | Elsewhere | Decide |
|---|---|---|---|
| Founded | 2018-10-01 (Organization schema) | LinkedIn: **2017** | One year, everywhere |
| HQ / location | (none — service-area only) | LinkedIn: **Tallinn, Estonia** + Kuwait office | If Estonia is the legal entity, "HQ Tallinn" is safe & consistent with the no-Kuwait-claim rule — but it must match on every profile |
| KoutQ8 publisher | Buried Games title | App Store seller: **GAVAN GROUP…** (dev id 1774939183) | Either note Gavan as publishing partner in fact sheets, or migrate the app — don't leave it unexplained |
| arrabgames.com | linked as Arrab's home (4 backlinks in GSC came FROM it) | **404 / dead** | Restore it, or 301 the domain to buriedgames.com/games/arrab. Don't cite it anywhere until fixed |

## 1 · Canonical brand facts (copy-paste into every profile)

- **Name**: Buried Games Studio · **Arabic**: استوديو بريد جيمز
- **URL**: https://buriedgames.com · **Press kit**: https://buriedgames.com/press
- **Email**: support@buriedgames.com · **WhatsApp**: +965 5552 8686
- **Founder**: Fahed Alahmad
- **Founded**: ← per §0 decision
- **One-liner (EN)**: Independent GCC games studio building Arabic-first
  multiplayer, mobile, and web games — for our own catalog and for clients
  across Kuwait & the GCC.
- **One-liner (AR)**: استوديو ألعاب خليجي مستقل يصنع ألعابًا جماعية وألعاب
  جوال وويب بالعربية أولًا — لألعابنا الخاصة ولعملاء في الكويت والخليج.
- **Categories**: Video game developer · Game development services · Unity ·
  Unreal Engine · Mobile games · Web games
- **Games**: KoutQ8 (iOS, App Store id6738164175) · Nabsh (nabsh.fun, browser
  trivia) · Power of Bombs (Unreal arcade) · Arrab (Arabic social deduction,
  in development) · Luna Fantasy · Gathered by the Light
- **Profiles (sameAs)**: youtube.com/@buriedgames · twitter.com/buriedgames ·
  instagram.com/buriedgames · linkedin.com/company/buriedgames ·
  github.com/Buried-Games-Studio · tiktok.com/@buriedgames
- **Logos**: on /press (PNG + WebP, brand colors there too)

> After each new profile goes live, add its URL to `sameAs` in
> `src/app/[locale]/layout.tsx` — that's what binds the entity graph together.

## 2 · Tier 1 — Entity graph (do first, ~1 evening)

| Target | URL | Notes |
|---|---|---|
| Fix LinkedIn | linkedin.com/company/buriedgames | Align founded year + location wording with §0; add /press link |
| Crunchbase — EXISTS, claim & reconcile | crunchbase.com/organization/buried-games-studio | Verify founded year/location match §0; add /press link, founder, games as products. Already in site sameAs |
| Wikidata — CREATE | wikidata.org/wiki/Special:NewItem | instance of: video game developer (Q210167); official website; founded; founder; social IDs. Neutral description: "GCC-based independent video game developer" |
| GitHub org | github.com/Buried-Games-Studio | Already good — keep website link + bio aligned |

## 3 · Tier 2 — Games databases (game-first flows)

| Target | URL | Notes |
|---|---|---|
| IGDB | igdb.com → add game first; company surfaces in release-info; verified-publisher control via email from @buriedgames.com to verification@igdb.com | Add KoutQ8 + Nabsh + Power of Bombs |
| MobyGames | mobygames.com/info/contribute/ | Game first, then company; slow approval queue — start early |
| itch.io | itch.io/developers → create `buriedgames.itch.io` | Host Nabsh/Power of Bombs web builds or pages; itch dev pages rank and link well |

## 4 · Tier 3 — Service directories (the client-lead channel)

| Target | URL | Notes |
|---|---|---|
| Clutch | clutch.co/get-listed | Game-development category; needs portfolio + (later) client reviews — strongest B2B signal in GCC searches |
| GoodFirms | goodfirms.co/get-listed | Requires registered business matching site details (§0 matters here) |
| DesignRush | designrush.com/submit/agency | Manual review; portfolio required |
| MAGNiTT | magnitt.com → claim/add company | MENA startup graph; good for regional credibility |

## 5 · Tier 4 — Launches (links + traffic spikes)

1. **Product Hunt**: nabsh.fun — producthunt.com/launch. Tagline ≤60 chars,
   3+ images. Angle: "Arabic-first multiplayer trivia in the browser."
2. **Hacker News Show HN**: nabsh.fun (works best with a maker comment about
   the realtime stack).
3. **Reddit**: r/WebGames (Nabsh), r/incremental + r/gamedev devlog crossposts
   (the six devlog articles are ready-made content).

## 6 · Tier 5 — Arabic/GCC media outreach

| Outlet | Contact | Pitch angle |
|---|---|---|
| Saudi Gamer | info@saudigamer.com | KoutQ8: "لعبة الكوت الكويتية تتحول إلى لعبة جوال" — cultural-heritage-to-mobile story |
| True Gaming | info@true-gaming.net | GCC studio building Arabic-first games; Arrab (Mafia بالعربي) preview |
| IGN Middle East | socials @ign_me (Webedia) | Regional indie spotlight; the studio behind KoutQ8/Nabsh |
| Arab Hardware | arabhardware.net/business/contact | Dev-angle: Unity/Unreal production in the Arab world (devlog material) |
| VGA4A | facebook.com/VGA4A | Community feature + Arrab beta when ready |
| IGDA Saudi | igda.riyadh (IG) / @IGDA_SA (X) — site was unreachable, use socials | Speak/show at a meetup; community links |
| GCON | gconevents.com | Event participation; Arrab demo |
| GamesMEA | gamesmea.com contact | B2B trade angle: GCC games-services market |
| Kuwait local | kuwaitdigitalbox.com · kuwaittimes.com/technology | Founder story: Fahed Alahmad building games for the Gulf |

### Pitch template (EN)
> Subject: A Kuwaiti card-game classic, rebuilt for iPhone — story for [Outlet]?
>
> Hi [Name], I'm Fahed, founder of Buried Games — an independent GCC games
> studio. We just shipped KoutQ8, a faithful mobile version of Kout, the
> Gulf's most-played card game, with an AI partner that actually bids
> properly. We also run Nabsh (nabsh.fun), browser trivia with 50+ Arabic
> categories. Happy to share a build, art, and the dev story — press kit:
> buriedgames.com/press. Would this fit [section]?

### Pitch template (AR)
> الموضوع: لعبة الكوت الخليجية تعود رقمية — قصة لـ[الاسم]؟
>
> مرحبًا [الاسم]، أنا فهد، مؤسس استوديو بريد جيمز — استوديو ألعاب خليجي
> مستقل. أطلقنا KoutQ8، نسخة أمينة من لعبة الكوت على الآيفون بشريك ذكاء
> اصطناعي يفهم المزايدة فعلًا، وعندنا نبش (nabsh.fun) — تريفيا عربية في
> المتصفح بأكثر من ٥٠ فئة. يسعدنا نرسل نسخة تجريبية وصور والقصة كاملة —
> الملف الصحفي: buriedgames.com/press. هل تناسب [القسم]؟

## 7 · Tracker

| Target | Owner | Status | Live URL |
|---|---|---|---|
| LinkedIn facts fix | Fahed | ☐ | |
| Crunchbase | Fahed | ☐ | |
| Wikidata | Fahed | ☐ | |
| IGDB (3 games + company) | Fahed | ☐ | |
| MobyGames | Fahed | ☐ | |
| itch.io | Fahed | ☐ | |
| Clutch | Fahed | ☐ | |
| GoodFirms | Fahed | ☐ | |
| DesignRush | Fahed | ☐ | |
| MAGNiTT | Fahed | ☐ | |
| Product Hunt (Nabsh) | Fahed | ☐ | |
| Show HN (Nabsh) | Fahed | ☐ | |
| Saudi Gamer pitch | Fahed | ☐ | |
| True Gaming pitch | Fahed | ☐ | |
| IGN ME pitch | Fahed | ☐ | |
| Arab Hardware pitch | Fahed | ☐ | |
| IGDA Saudi / GCON | Fahed | ☐ | |
| Kuwait local media ×2 | Fahed | ☐ | |
| arrabgames.com restore/301 | dev | ☐ | |
| sameAs updates after each | dev | ☐ | |

Cadence that works: 2–3 targets per week beats one burst — links acquired
gradually look (and are) organic.
