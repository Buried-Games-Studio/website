# Bokhari Hamid — works inventory (site ↔ ArtStation)

The single reference for what design work by Bokhari is on buriedgames.com and
how it maps to his ArtStation profile. **When checking for new works, diff his
profile against this file** — no need to re-search the app or the website.

- ArtStation profile: https://www.artstation.com/bokhary (username `bokhary`)
- Site section: `/design-works` · content module `src/lib/content/design-works.ts`
- Images: R2 `assets/images/design-works/<slug>/` (cover.jpg + gallery-NN.jpg)
- Machine check: in a browser context, `GET https://www.artstation.com/users/bokhary/projects.json?page=1`
  lists all projects (direct curl is blocked by Cloudflare; use Playwright).

Last sync: **2026-07-23** — profile had 6 projects, all accounted for below.

## Published on /design-works

| Site slug | ArtStation project(s) | Notes |
|---|---|---|
| `arrab-godfather-character-art` | — (not on ArtStation) | Sent directly by Bokhari; six-stage Godfather portrait for Arrab. |
| `unicef-elearning-games` | `G8YA5a` "UNICEF Games full visual development #1" (2022) | Our entry uses images he sent; ArtStation post is the same project. |
| `salamander-board-game` | — (not on ArtStation) | Sent directly by Bokhari; full board-game art production. |
| `no-water-game-art` | `3EyGa2` "No Water Game Art Blast" (2026-05) + `OvLY8b` "Player Hub Concept, Arabian theme UAE" (2026-03) + `NqnQJ5` "Character & Creature Concept art" (2026-05) | Three posts merged into ONE site entry. Work done at **Kashkool Games**, shown with permission — described by discipline, never as a Buried Games or client project. Curated 12 of ~59 images. |
| `baba-yaga-witch-house` | `AZ0W45` "interior witch house concept - Baba Yaga" (2026-04) | Personal piece. 8 of 10 assets used. |
| `west-african-shrine` | `QKzlOr` "West African Shrine" (2024-08) | Personal piece. 7 of 8 assets used (skipped the near-duplicate final view; cover uses it). |

## Deliberately excluded

- Two AI-generated derivatives of the Arrab Godfather (896px files with ✦
  watermarks) — excluded under the no-AI-frames-as-craft rule. Not on
  ArtStation either (he tags his posts `NoAI`).
- `no-water-game-art`: the video asset (Unity UI capture, YouTube thumbnail)
  and reference/inspiration boards — galleries carry his own craft only.

## Image provenance (curated galleries → ArtStation asset index)

For re-syncs or higher-res swaps. Index = `assets[i].i` in the project JSON.

- `no-water-game-art`: cover=OvLY8b#0 · g01=3EyGa2#4 · g02=3EyGa2#8 ·
  g03=OvLY8b#2 · g04=OvLY8b#5 · g05=OvLY8b#8 · g06=3EyGa2#9 · g07=3EyGa2#10 ·
  g08=NqnQJ5#0 · g09=NqnQJ5#5 · g10=NqnQJ5#12 · g11=3EyGa2#19 · g12=3EyGa2#25
- `baba-yaga-witch-house`: cover=#0 · g01=#2 · g02=#3 · g03=#4 · g04=#5 ·
  g05=#6 · g06=#7 · g07=#8 · g08=#9
- `west-african-shrine`: cover=#0 · g01=#1 · g02=#2 · g03=#3 · g04=#4 ·
  g05=#5 · g06=#6 · g07=#7

## Sync procedure (next time)

1. Pull `projects.json` for `bokhary` (Playwright page context — see above).
2. Any project hash not in the tables above = new work to review.
3. For third-party/employer work: confirm posting permission covers our site,
   then describe by discipline (owner rule; see CLAUDE.md design-works section).
4. Add images to R2 + one `DesignWork` entry (EN+AR); update THIS file.
5. `pnpm after-deploy` after images land (edge-cached 404s).
