# Royal Rajasthani Wedding Invitation

A single-page, cinematic digital wedding invitation built with **Next.js (App Router) + React + TypeScript + GSAP**.
Palace-door intro → couple reveal → groom & bride → story → animated baraat → 6 ceremonies → live countdown →
pre-wedding film → gallery with lightbox → venue with Google Maps → family blessings → finale.

All names, dates, venue details, images, videos, music and button labels come from **one file**:
`src/config/wedding.ts`. To reuse the site for a new client, edit that file and replace the files in `public/assets/`.

> Every detail in the config is **fictional demo data** (names, venue, timings). Confirm the real venue and
> event times with the client before you publish.

---

## 1. Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (also type-checks)
npm start
```

Requires Node 18.18+ (Node 20 or 22 recommended).

## 2. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com → **Add New → Project** → import the repo. The framework is detected automatically; no
   environment variables are needed.
3. After the first deploy, put the real URL into `site.url` in `src/config/wedding.ts` (used for social-sharing
   previews and inside calendar files) and redeploy.

HTTPS comes with Vercel by default. Netlify and any other Next.js host work the same way.

## 3. Project structure

```
src/
  app/
    layout.tsx            SEO + social-sharing metadata, font preloads
    page.tsx              renders <InviteApp />
    globals.css           the whole design system (tokens, components, responsive rules)
  config/wedding.ts       ← the single content/config file
  lib/
    calendar.ts           Google Calendar “add event” link
    maps.ts               Google Maps directions / search / embed URLs
    motion.ts             GSAP + ScrollTrigger setup and the scroll-reveal hook
    utils.ts              asset paths, smooth scroll, reduced-motion check
  components/
    InviteApp.tsx         page order
    InviteContext.tsx     shared state: gate, calendar sheet, event details
    RoyalGateIntro.tsx    3D palace-door opening (GSAP timeline)
    WeddingNavbar.tsx     sticky nav, mobile menu, optional music toggle
    RoyalCoupleHero.tsx   the grand reveal
    GroomBride.tsx        groom & bride introductions (jharokha frames)
    CoupleStory.tsx       couple story collage
    RajasthaniBaraat.tsx  dusk procession scene
    WeddingEvents.tsx     ceremony cards
    WeddingCountdown.tsx  live countdown (IST, hydration-safe)
    PreWeddingFilm.tsx    two-clip film section + video player
    RoyalGallery.tsx      editorial gallery + lightbox (keyboard + swipe)
    WeddingVenue.tsx      venue, address, map, directions
    FamilyFinale.tsx      family blessings, finale, footer
    EventDetailModal.tsx  ceremony details sheet
    art/                  hand-built SVG artwork: doors, baraat, palace, ceremony motifs
    ui/                   RoyalButton, Modal, TempleFrame (kalash-toran photo frame) & ornaments, PetalCanvas, Icon
public/
  assets/couple|portraits|gallery|video|venue|og   ← replaceable media
  fonts/                  self-hosted, subset fonts (SIL Open Font License)
preview/, scripts/        optional single-file static preview build (`npm run preview:static`, needs esbuild)
```

## 4. Replacing the photos and videos

Keep the same file names (or change the paths in `wedding.ts`). Recommended sizes:

| Asset | Path in config | Recommended |
|---|---|---|
| Hero couple portrait | `hero.image` | portrait, ≥ 1000×1600, JPG ~200–300 KB |
| Groom portrait | `groom.portrait` | portrait, ≥ 700×1200, face in the upper third |
| Bride portrait | `bride.portrait` | portrait, ≥ 700×1200 |
| Story photos (3) | `story.images` | portrait or square, ≥ 800 px wide |
| Gallery (8+) | `gallery[]` | any ratio; set `width`/`height` to the real pixel size |
| Film clips (2) | `film.clips[].src` (+ optional `webm`) | MP4 H.264, ≤ 20 MB each, plus a poster JPG |
| Venue photo | `venue.image` | landscape ≥ 1920×1080. While `null`, a painted palace illustration is shown |
| Finale portrait | `finale.image` | portrait ≥ 900×1600 |
| Social preview | `site.ogImage` | exactly 1200×630 |
| Music (optional) | `music.src` | MP3 ~128 kbps. The toggle only appears when set and never autoplays |

Photos are never cropped: each frame takes the photo's own proportions. When you replace a portrait, update its
`width`/`height` (in `GroomBride.tsx`, `CoupleStory.tsx`, `RoyalCoupleHero.tsx`, `FamilyFinale.tsx`, and `gallery[]` in the config).

**Demo media:** the photos and the film clip currently in `public/assets` came from the brief as references
(some carry third-party watermarks). Replace them with the client's own, licensed photography before showing the
site publicly or using it in a commercial portfolio. The film's second chapter is the same file starting at
12 s — set `clip-2.src` to a real second film and `startAt: 0`.

## 5. How the key features work

- **Palace doors** — two carved SVG door leaves, each masked with its half of the arch, rotate inward with
  real CSS 3D perspective. A GSAP timeline animates knockers → light seam → door swing → god-rays → camera
  dolly → flash → hero reveal. Reduced-motion visitors get a simple fade. "महल का द्वार फिर से खोलें" in the footer replays it.
- **Countdown** — counts to `start` of the main event (ISO string with `+05:30`), so it is correct in every
  timezone. It renders placeholders on the server and starts ticking after mount (no hydration mismatch),
  realigns every second, and re-syncs when a backgrounded tab returns. After the date it shows the thank-you message.
- **Calendar** — every “Save the date / कैलेंडर में जोड़ें” button opens Google Calendar directly with the event
  (title, IST time, venue, map link) pre-filled; the guest just taps Save. Times are converted to UTC so they are right in every timezone.
- **Maps** — Google Maps URLs (`/maps/dir/?api=1&destination=…`) hand off to the Google Maps app on Android/iOS
  and open the web map elsewhere. Add the venue's real `placeId` for exact routing. The embedded map uses the
  key-less `output=embed` view and loads lazily.
- **Film** — two films, each playing inside its own kalash-and-toran frame (native play/pause, volume and
  fullscreen controls). Playback starts only from a tap; starting one film pauses the other.
- **Gallery** — keyboard (← → Esc), swipe on touch screens, focus trapping, neighbouring images preloaded.
- **Accessibility** — semantic sections, `lang="hi"` on Hindi text, alt text, visible focus, focus-trapped
  dialogs, `inert` page behind the doors, skip link, reduced-motion support throughout.

## 6. Quality notes

- Fonts are self-hosted and subset (Tiro Devanagari Hindi, Cormorant Garamond, Cinzel, Manrope) so Hindi renders
  identically on Android, iPhone and desktop with no external font request.
- Heavy media is never on the critical path: only the hero photo is eager; videos load metadata only until played;
  petal canvases pause off-screen and in background tabs.
- Styling is a hand-written CSS design system (`globals.css`) rather than Tailwind utility classes: the carved
  frames, masks and ornaments are custom CSS either way. Tailwind can be added alongside without conflicts.
- Search indexing is off by default (`robots` in `layout.tsx`) because it's a private family invitation.
