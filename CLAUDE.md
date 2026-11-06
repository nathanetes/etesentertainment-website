# etesentertainment.com — project brief

Company site for **Etes Entertainment LLC** and its label **A1 Records**, owned by Nathan Etes
(producer, artist, songwriter, audio engineer). This file carries the context from the session
that designed and built the site (Nov 5, 2026).

## What the company is
- Etes Entertainment LLC is Nathan's own business and label. It does **not** offer services to clients.
- A1 Records is a division of Etes Entertainment LLC. Roster: Nathan Etes. Catalog prefix `A1R-NE`.
- Standard opening sentence (keep this format everywhere): "Etes Entertainment LLC, established in
  Madison, WI, in 2024, is a music company founded by producer, artist, and audio engineer Nathan Etes,
  and the home of independent label A1 Records."
- Credit line: "Nathan Etes, under exclusive license to A1 Records, a division of Etes Entertainment LLC."
- Contact: management@etesentertainment.com (Nathan's mom, who is his manager; Zoho Mail).

## Standing priority
Quietly maximize the chances of a **Google Knowledge Panel** for Nathan Etes, Etes Entertainment LLC
and A1 Records in all work: consistent names and facts, schema.org markup, cross-links between sites
and profiles. Don't announce it each time; just do it.

## Stack and deploy
- Static HTML, no build step. Cloudflare Pages project connected to this GitHub repo
  (`nathanetes/etesentertainment-website`), production branch `main`, output directory `/`.
- Files: `index.html` (page + JSON-LD), `site.js` (wordmark letter split, boot screen, barcode,
  live waveform, clock, copy button), `404.html`, `_headers` (strict CSP: everything self-hosted,
  `script-src 'self'`, no inline scripts), `fonts/` (self-hosted, OFL), `favicon.svg`,
  `robots.txt`, `sitemap.xml`.
- Nathan commits and pushes from Terminal. He likes a mixed workflow: Claude does big batches,
  he pastes small edits himself.

## Design system (current)
- Concept: "Frutiger Aero meets modern brutalism", early-2000s desktop. Every section is an OS
  window with a title bar (file names like `about.txt`, `label_info.lbl`, `contact.vcf`) and the
  page ends in a status bar (blinking "Done" LED, Chicago clock).
- Black card stock (`--paper #070808`), white ink text (`--ink #EEF0EC`), faint scanlines.
  Textures are Nathan's scanned files in `textures/` (the old SVG `--fiber` texture looked awful
  and is gone): `folded-poster.jpg` = fixed desk behind the page, `scratches.jpg` = the page itself,
  `sleeve.jpg` = worn record sleeve behind the hero, `grain.png` = animated film grain over
  everything (`body::after`, off for reduced motion).
- Accents: Aero blue `#1E90E8` (the machine) and signal orange `#FF5A1F` (the hand). Green
  `#78C93C` only inside glass/sky elements. **No rainbow / multi-color sequences** (it read as a
  pride flag). Avoid yellow and magenta.
- Type: Archivo variable (wdth 62 for display), IBM Plex Mono for data, Silkscreen for title bars.
  Display type is "stamped ink": speckle mask + SVG displacement filters `#rough` / `#rough-lg`.
  Nathan wanted the edges cleaned up from the first version; keep displacement subtle.
- Hero: giant ETES / ENTERTAINMENT wordmark (no divider line between the words), a spinning
  silver CD-R (replaced a "cheap-looking" A1 bubble). Opening sentence is set in Schibsted Grotesk
  (`--lede`; Nathan found Archivo there looked like plain Arial). "Est. 2024" is plain text: the
  orange rubber-stamp seal and the "EXCLUSIVE LICENSE" stamp were removed at his request.
- History sonar dial: slow sweep (14s), soft blue glow, pulse rings; floats right on desktop so
  the about text wraps around it and then runs full width; centered under the text on mobile.
- No boot/loading screen and no letter-by-letter wordmark animation (Nathan disliked both); the
  wordmark just fades in.
- Camera roll section (`#media`): photos and a looping muted VHS clip in `media/`, each in its own
  small window. The clip (`village-studios.mp4`, 360x640, ~6 MB, made with macOS `avconvert`)
  plays only while on screen (site.js). Fixed backgrounds use `lvh` units so they don't jump
  on mobile when the browser bars show/hide.
- **"Madison" appears only in company-info spots** (lede, Founded line, label Origin field,
  schema). Elsewhere use Chicago / Central Time or other wording.
- History section ("How it started"): plain, factual, third person. Nathan found the earlier tone
  cheesy; avoid hype.
- OSCILLATIONS (next album) is not publicly announced; keep it off the site until it is.

## Schema (in index.html)
- `#organization` (Etes Entertainment LLC, foundingDate 2024, foundingLocation Madison),
  `#a1-records` (sameAs MusicBrainz + Discogs label pages), and a reference to the Person
  `https://www.nathanetes.com/#nathan-etes`.
- Label pages: https://musicbrainz.org/label/cdd0e025-6a9d-4df0-8827-29512229666f ,
  https://www.discogs.com/label/4744017-A1-Records-13
- Artist pages: MusicBrainz artist 5b15a08e-28ea-492d-95a7-ed05d44ded95,
  Discogs https://www.discogs.com/artist/18398016-Nathan-Etes , ISNI 0000000530664593.

## Catalog shown on the site
THE GANZFELD EFFECT (single, 2026-11-11), pose® boy songz (EP, 2026-11-04, 5), DELOREAN (2026-03),
CERULEAN / SUMMER'S OVER / LIKE WE'RE SUPPOSED TO DO (2025 singles), juniper (album, 2025-05-19, 11),
CTY-S (EP, 2022-12-16, 6). Each links to its page on nathanetes.com/discography/.

## Related systems
- Artist site: nathanetes.com, repo `~/GitHub/nathanetes-website` (Cloudflare Pages from `main`).
  On Nov 5 its `security-headers` branch got: Organization schema, Discogs/ISNI links, the
  Google tag `GTM-PXQX45Q9` on every page, CSP allowances for Google tags, and privacy policy text
  about the tag. Merged to `main` and live (tag confirmed in the page source, Nov 5).
- Email: Zoho Mail free plan for etesentertainment.com. SPF, DKIM and DMARC (`p=none`) are set in
  Cloudflare DNS. After a couple of weeks of clean sending, consider DMARC `p=quarantine`.
- Google Ads: account owned by management@etesentertainment.com (mom, verified advertiser), with
  n.etes@nathanetes.com to be added as admin. Nathan's earlier personal Ads account is suspended,
  so don't build ads on his own login.
- Catalog spreadsheet (Google Sheets "NathanEtes_Catalog"):
  https://docs.google.com/spreadsheets/d/1WbsgLIrk9QWftOpfcMaJaQR6BmJ92sFraQq42k08OmQ/edit

## Open to-dos
1. Confirm the Cloudflare Pages deploy and custom domains (`www.etesentertainment.com` canonical,
   apex redirects to www).
2. Add etesentertainment.com to Google Search Console and submit the sitemap.
3. Update nathanetes.com schema so its Organization / A1 Records entries point to the
   `https://www.etesentertainment.com/#organization` and `#a1-records` IDs (sites reference each other).
4. Add etesentertainment.com as the website on the MusicBrainz and Discogs label pages, LinkedIn,
   LabelRadar, and Too Lost label settings; add it to the catalog sheet's My IDs / Artist Links tabs.
5. Confirm the Google tag test passes on nathanetes.com once deployed.
6. Fill empty artist profile links (YouTube @nathanetes, Amazon Music, Deezer, Audiomack, Facebook,
   Genius, Shazam, Bandsintown) in the sheet and Person schema.
