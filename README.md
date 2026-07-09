# Keri In Windsor 🥭

Premium cinematic website for **Keri In Windsor** — fresh Indian mangoes
(Kesar, Alphonso & more) delivered in limited seasonal batches across
Windsor, Ontario.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** — design tokens in `app/globals.css` (`@theme`)
- **GSAP ScrollTrigger** — pinned scroll film, scrub reveals
- **Lenis** — smooth scroll (exposed as `window.__lenis`; GSAP as `window.__gsap`)
- **Framer Motion** — entrance reveals, cart drawer, menu

## Run

```bash
npm install
npm run dev   # http://localhost:3000
```

## The scroll film (frame-by-frame video scrubbing)

The homepage story section (`components/home/ScrollFilm.tsx`) is a pinned
canvas that scrubs **real slow-motion footage frame-by-frame** as you
scroll — six chapters (orchard → fruit → cut → pour → pack → doorstep),
366 WebP frames total, driven by a single ScrollTrigger.

- Frames live in `public/film/<chapter>/NNN.webp`; the manifest is
  `lib/film.ts` (chapter order, frame counts, captions).
- Chapter 1 gates the reveal (loader shows until ~14 frames decode); the
  rest stream in behind with a nearest-loaded-frame fallback, so slow
  connections scrub without gaps.
- The hero background is a compressed loop of the "cut" clip
  (`public/videos/hero-loop.mp4`, ~530KB).

Regenerate frames from a new clip:

```bash
node_modules/ffmpeg-static/ffmpeg -i clip.mp4 \
  -vf "fps=12,scale=1440:-2" -c:v libwebp -quality 63 \
  public/film/<chapter>/%03d.webp
# then update the chapter's `count` in lib/film.ts
```

## Cart & checkout

Real add-to-cart flow, no payment gateway yet (structured Stripe-ready):

- `components/cart/CartContext.tsx` — cart state, persisted to
  `localStorage` (`kiw-cart-v1`), plus the drawer and notify modal.
- `components/cart/CartDrawer.tsx` — slide-over cart with quantity
  steppers and live subtotal.
- `app/checkout/page.tsx` — contact + delivery + consent form with an
  editable order summary; success screen shows the season-closed
  waitlist confirmation with the request number.
- `app/api/orders/route.ts` — validates (shared rules in
  `lib/orders.ts`), **recomputes all totals server-side from the
  catalog**, and persists via `lib/store.ts`.

Records carry a payment block
(`pay_on_confirmation` / `pending` / `stripe_payment_intent_id: null`) —
integrating Stripe later means creating a PaymentIntent in the route and
storing its id there. Notify-list signups for the Mango Pulp launch land
in the same store as `type: "notify"`.

## Database

`lib/store.ts` picks the backend from the environment:

- **Production (Vercel): Supabase Postgres.** Set `SUPABASE_URL` and
  `SUPABASE_SERVICE_ROLE_KEY` (see `.env.example`). One-time setup: run
  `supabase/schema.sql` in the Supabase SQL Editor — it creates the
  `orders` table, the trigger that assigns `KIW-0001…` / `KIW-N-0001…`
  numbers atomically, and locks the table with RLS (service-role only).
- **Local dev: SQLite** at `data/keri.db` (better-sqlite3, WAL,
  gitignored) — zero setup, kicks in automatically when the Supabase
  vars are absent.

View orders in the Supabase dashboard (Table Editor → orders), or
locally:
`node -e "console.log(new (require('better-sqlite3'))('data/keri.db').prepare('SELECT * FROM orders').all())"`

## Deploying to Vercel

1. Push the repo to GitHub and import it at vercel.com/new (Next.js is
   auto-detected).
2. Create a Supabase project → SQL Editor → run `supabase/schema.sql`.
3. In Vercel → Project Settings → Environment Variables, add
   `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (from Supabase →
   Project Settings → API).
4. Deploy, then add keriinwindsor.com under Project Settings → Domains.

## Structure

- `app/page.tsx` — hero (video loop) → marquee → scroll film → mango
  moment → why us → varieties → pre-order band → final CTA
- `app/products/` — Premium Mango Collection + `/products/[slug]` detail
  pages (gallery zoom, related products)
- `lib/products.ts` — single source of truth for products/pricing

## Media provenance

All photography and footage was generated with Higgsfield
(`cinematic_studio_2_5` stills seeded into `cinematic_studio_video`
clips). Job ids are recorded in the project notes; regenerate or upscale
from those ids rather than re-prompting.

## Placeholders to replace before launch

- `lib/site.ts` — WhatsApp number + email
- Legal copy in `app/terms` and `app/privacy` (reviewed by a human)
