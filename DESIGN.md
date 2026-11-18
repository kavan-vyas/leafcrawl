# Dark Leaf Scrape: Website Design Spec

Web-scraping API product site. Structure studied from a leading competitor (dark technical theme, numbered sections, live status strip, tabbed code demo, mono accents). Name, copy, assets are original. Colours/type below are our own choices (source exposed no CSS).

## 0. Observed patterns to emulate (structure only)
- Promo banner above nav; nav with mega menus + Docs + Pricing + primary CTA.
- Live status strip (uptime, latency, req/s, success rate).
- Hero: 2-line headline, subhead, 2 CTAs, trust line, live request feed beside it.
- Logo wall (marquee), numbered sections (01, 02...), tabbed API demo (HTML/JSON/Markdown outputs).
- Pricing: pay-as-you-go + subscription, volume slider calculator, monthly/yearly toggle, 4 plan cards with "Most popular", credit multiplier table, numbered FAQ (Q.01...).
- Docs: top nav row, left sidebar with badges, Cmd+K search, language code tabs, copy button, Ask-AI.
- Login: single centred card, GitHub button, "or", email continue, magic code/password step.
- Footer: logo + tagline, 4 link columns, language selector, status/privacy/terms.

## 1. Brand
- Name: Dark Leaf Scrape. Short: DLS. Tagline: "Pull the web into clean data."
- Voice: direct, technical, no hype. Sentence case. Numbers over adjectives.
- Logo (placeholder): wordmark in Inter 700 + simple leaf glyph (rotated 45deg rounded square with a vein line). SVG, `currentColor`, 24px glyph min.
- Motifs: numbered section labels (`01 / Infrastructure`), mono micro-labels in `[brackets]`, thin 1px borders, subtle grid background, green glow accents.
- Imagery: no stock photos. Use code, terminal, status tiles, abstract node graphs.

## 2. Design tokens

### 2.1 Colour (dark is default; light supported)
Dark theme (default)
- `--bg-0` #0A0F0C page
- `--bg-1` #0F1612 section alt
- `--bg-2` #151E19 card
- `--bg-3` #1C2822 raised / hover
- `--border` #24322B
- `--border-strong` #34463C
- `--text-0` #EEF4F0 headings
- `--text-1` #B6C4BB body
- `--text-2` #7F9188 muted (4.6:1 on bg-0, keep >= 14px)
- `--brand-500` #3DDC84 primary leaf green
- `--brand-400` #6BE8A2 hover
- `--brand-600` #25B866 pressed
- `--brand-ink` #04130A text on brand fill
- `--accent` #7CF0E0 secondary teal (links in code, charts)
- `--success` #3DDC84, `--warning` #F5B942, `--danger` #FF6B6B, `--info` #6CB6FF
- `--glow` rgba(61,220,132,.18)
- Code: `--code-bg` #0B120E, keyword #7CF0E0, string #F5B942, number #FF9E7A, comment #5F7168, fn #6BB6FF, punct #8FA196

Light theme
- `--bg-0` #FFFFFF, `--bg-1` #F5F8F6, `--bg-2` #FFFFFF, `--bg-3` #EDF2EF
- `--border` #DCE5DF, `--border-strong` #C2D0C7
- `--text-0` #0C1510, `--text-1` #3A4A41, `--text-2` #62746A
- `--brand-500` #16A34A, `--brand-400` #22C55E, `--brand-600` #12823C, `--brand-ink` #FFFFFF
- `--accent` #0E8F83, code-bg #F3F7F4 (token hues darkened for 4.5:1)

Dark mode mechanics
- Tailwind `darkMode: 'class'`; `<html class="dark">` default; honour `prefers-color-scheme` on first visit, persist in cookie (no flash: inline script in `<head>`).
- All colours via CSS variables on `:root` and `.dark`; Tailwind maps `bg-bg-0` etc. to `var(--bg-0)`.
- Toggle in nav (sun/moon icon button, aria-pressed).

### 2.2 Typography
- Sans: Inter (variable), fallback system-ui. Mono: JetBrains Mono, fallback ui-monospace.
- Scale (size / line-height / weight / tracking)
  - display: 64/68/700/-0.03em (clamp 40 to 64)
  - h1: 48/52/700/-0.02em (clamp 34 to 48)
  - h2: 36/42/650/-0.02em (clamp 28 to 36)
  - h3: 24/32/600/-0.01em
  - h4: 18/26/600
  - body-lg: 18/30/400
  - body: 16/26/400
  - small: 14/22/400
  - micro (labels): 12/16/500 mono, uppercase, +0.08em
  - code: 14/22/400 mono
- Max prose width 68ch. Headlines break deliberately in two lines.

### 2.3 Spacing (4px base)
- Scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- Section padding: 96 desktop / 64 tablet / 48 mobile (y).
- Container: max 1200px (docs 1360), side gutter 24 (16 mobile).
- Grid: 12 columns, 24 gap (16 mobile).

### 2.4 Radius
- `--r-xs` 4 (tags, kbd), `--r-sm` 6 (inputs inner), `--r-md` 10 (buttons, inputs), `--r-lg` 14 (cards), `--r-xl` 20 (hero panels, modals), `--r-pill` 999.

### 2.5 Shadows / effects (dark values; light uses lower alpha)
- `--sh-1` 0 1px 2px rgba(0,0,0,.4)
- `--sh-2` 0 8px 24px rgba(0,0,0,.35)
- `--sh-3` 0 24px 64px rgba(0,0,0,.5)
- `--sh-glow` 0 0 0 1px var(--brand-500), 0 0 32px var(--glow)
- Focus ring: 2px `--brand-400` + 2px offset in `--bg-0`. Never remove.
- Background: radial green glow top of hero (600px, 12% alpha) + 1px grid (48px, 4% alpha) masked to fade out.
- Backdrop blur 12px on sticky nav with `--bg-0` at 80% alpha.

### 2.6 Motion
- Durations 120 / 200 / 320ms; easing cubic-bezier(.2,.8,.2,1).
- Used for: hover lift (translateY -2px), accordion height, tab underline slide, feed row fade-in, count-up on stats.
- `prefers-reduced-motion`: disable marquee, count-up, feed animation.

### 2.7 Breakpoints
- sm 480, md 768, lg 1024, xl 1280. Mobile first.

### 2.8 Z-index
- base 0, sticky 20, nav 40, dropdown 50, modal 60, toast 70.

## 3. Component library
Each: variants, states (default/hover/focus/active/disabled), a11y.

### 3.1 Buttons
- Variants: primary (brand-500 fill, brand-ink text), secondary (bg-3 fill, border), ghost (text only), outline (border-strong), danger.
- Sizes: sm 32h/12px pad, md 40h/16px, lg 48h/24px; radius r-md; font 14/600 (lg 16).
- Primary hover: brand-400 + sh-glow; active brand-600; disabled 40% opacity, no pointer.
- Loading: spinner replaces icon, width locked, `aria-busy`.
- Icon button: 36x36 square, aria-label required.
- Social button (GitHub/Google): full-width, secondary, logo left.

### 3.2 Announcement banner
- 40h, bg `--brand-500` at 12% + bottom border; centered text 14px, link underlined, dismiss X (cookie remembers).

### 3.3 Navigation
- Sticky, 64h, blurred bg, bottom border on scroll.
- Left: logo. Centre: Products, Developers, Use cases, Pricing, Docs. Right: theme toggle, Log in (ghost), Start free (primary).
- Products/Developers open mega menu (2-3 columns, icon + title + one-line description, bg-2, r-xl, sh-3, 200ms fade).
- Mobile (<lg): hamburger, full-height drawer, accordion groups, CTAs pinned at bottom.
- Active link: text-0 + 2px brand underline. Keyboard: arrow keys in menus, Esc closes.
- Logged-in state: "Dashboard" button + avatar menu.

### 3.4 Live status strip
- Row of 4-5 tiles under nav: Uptime 99.98%, Latency p50 ms, Requests/s, Success rate, Regions.
- Mono micro-label + value (text-0, 14 mono) + green pulsing dot with "LIVE".
- Data from `/api/status` (real or mocked), poll 30s. Horizontal scroll on mobile.

### 3.5 Hero
- Two columns lg (7/5): left copy, right live feed / code panel; stacked on mobile (copy first).
- Left: micro label, display headline (2 lines, second line in brand colour), body-lg subhead (max 52ch), CTAs (Start free + Read the docs), trust line "Trusted by N developers" with 4 avatars.
- Right: terminal card listing recent requests (status chip, domain, latency ms) with new rows sliding in every 1.2s; fake data seeded client side.
- Background glow + grid.

### 3.6 Code-snippet block
- Container: bg `--code-bg`, 1px border, r-lg, sh-2.
- Header bar (40h): left window dots (optional), centre/left language tabs (curl, Python, Node, Ruby, PHP, Go), right copy button.
- Endpoint line above code: `GET` chip + mono URL.
- Body: 14/22 mono, padding 20, horizontal scroll, optional line numbers (text-2), highlighted line (brand 8% bg + 2px left border).
- Output tabs (below or beside): HTML | JSON | Markdown with response status chip (200 OK, 412 ms).
- Copy: button flips to "Copied" 1.5s, `aria-live="polite"`.
- Highlighting: Shiki (build time) with custom theme from tokens. Language choice persists in localStorage and syncs across all blocks.
- Example payload placeholder: `https://api.darkleaf.example/v1?token=YOUR_TOKEN&url=https%3A%2F%2Fexample.com`.

### 3.7 Logo wall
- Two rows, opposite-direction marquee 40s linear, monochrome grayscale logos at 60% opacity, pause on hover. Placeholders: grey rounded rects with text.

### 3.8 Numbered section header
- Micro label `01 / Interactive API`, h2, optional body (max 60ch), optional right-aligned link. Used on all marketing sections.

### 3.9 Feature grid
- 3 columns lg, 2 md, 1 sm; gap 24.
- Card: bg-2, border, r-lg, padding 24; icon in 40px tile (brand 12% bg), h4, body small, optional mono stat. Hover: border-strong + lift + glow.
- Variant "pipeline": 6 steps numbered 1-6 joined by a dotted connector (Receive, Route, Render, Extract, Store, Deliver).
- Variant "stat": large mono number (40px), label below.

### 3.10 Product cards (5)
- Scraping API, Proxy gateway, Crawler, Screenshot API, Data extractor (placeholders). Card with mini SVG illustration top, title, 2-line body, "Learn more" link.

### 3.11 Pricing card
- bg-2, border, r-xl, padding 28. Parts: plan name (h4), badge slot, price (display 40 mono + "/mo"), yearly saving line, effective rate "$x per 1k requests", CTA full-width, divider, 5-6 check-list items.
- Highlighted ("Most popular"): border brand-500, sh-glow, pill badge top-center brand fill.
- 4 plan cards in one row at lg, 2x2 at md, stacked at sm.
- Billing toggle: segmented control Monthly | Yearly (-20% chip).
- Two-way chooser above: "Pay as you go" vs "Subscription" large cards.

### 3.12 Pricing calculator
- Range slider (log scale, 1K to 1B requests) with mono readout; segmented controls: Site difficulty (Standard, Hard, Extreme), Request type (Plain, JS render, Screenshot); live monthly cost; rate-card table below.
- Slider: 6px track, brand fill, 20px thumb, keyboard step, `aria-valuetext`.

### 3.13 Tables
- Rate card / credit multiplier: mono numbers right-aligned, zebra bg-1, sticky header, horizontal scroll wrapper on mobile.

### 3.14 FAQ accordion
- Numbered `Q.01`, question 18/600, "+" rotates to "x"; answer body, max 68ch; border-bottom rows. 
- Semantics: `button[aria-expanded]` + region, one open at a time optional. Animate height 200ms.

### 3.15 CTA band
- Full-width bg-1, radial glow, centred h2 ("Stop maintaining scrapers. Start shipping data."), two buttons.

### 3.16 Footer
- bg-1, top border. Left: logo + one-line tagline + social icons (GitHub, LinkedIn, YouTube).
- 4 columns: Products, Developers, Company, Legal/Resources.
- Bottom row: language select, (c) year, Status (live dot), Privacy, Terms.
- Mobile: columns collapse to 2-up, then accordion.

### 3.17 Forms
- Label above (14/500), input 44h, r-md, bg-1, 1px border-strong, padding 0 14; placeholder text-2.
- Focus: brand-400 border + focus ring. Error: danger border + message below with icon; success: check icon.
- Helper text 13px text-2. Password field with show/hide toggle. OTP: 6 boxes, auto-advance, paste support.
- Select, checkbox (18px, r-xs), radio, switch (36x20), textarea.
- Bot check: Cloudflare Turnstile widget (invisible mode preferred).
- All inputs `autocomplete` attrs set; errors announced via `aria-describedby` + `role="alert"`.

### 3.18 Other
- Tabs: underline style, sliding 2px brand bar; `role=tablist`, arrow-key nav.
- Badge/chip: 22h, r-pill, mono 12; variants success/warn/danger/neutral/brand.
- Toast: bottom-right, bg-3, sh-3, 4s, `role=status`.
- Modal: r-xl, sh-3, scrim rgba(0,0,0,.6), focus trap, Esc closes.
- Cookie consent: bottom-left card, Decline / Customize / Accept; preferences toggles (analytics, marketing). Choice in cookie 12 months.
- Tooltip: 12px, bg-3, 6px radius, delay 300ms.
- Skeleton: bg-3 shimmer (disabled under reduced motion).
- Empty state: icon, h4, body, CTA.
- Callout (docs): info/warn/danger/tip with 3px left border + tinted bg.
- kbd: mono 12, border, r-xs, bg-3.

## 4. Pages

### 4.1 Home `/`
1. Announcement banner (dismissible).
2. Nav.
3. Status strip.
4. Hero (3.5).
5. Logo wall: "Trusted by N,000+ teams".
6. `01 / Interactive API`: tabbed demo (API, Proxy, Crawler, MCP). Left: tab list with descriptions; right: code block with request, output tabs HTML/JSON/Markdown; "Run example" button calls a rate-limited demo endpoint.
7. `02 / Why Dark Leaf`: 3 numbered problem-solution rows (blocked requests, JS-heavy pages, scaling cost).
8. `03 / Infrastructure`: 6-step pipeline grid.
9. `04 / Products`: 5 product cards.
10. `05 / Build with it`: SDK/integration pills (Python, Node, Ruby, PHP, Go, Zapier, n8n) each with install command on hover.
11. `06 / Ready-made scrapers`: link-list of site-specific scrapers (placeholder names), 2-3 columns.
12. `07 / Proof`: stat grid (requests served, success rate, p50 latency, uptime), review score chips, 3 testimonial cards, spec table.
13. `08 / FAQ`: 6 questions.
14. CTA band.
15. Footer + cookie consent.

### 4.2 Pricing `/pricing`
1. Hero: "One pricing system. Every product." + 3 bullets + small flow diagram (URL -> Dark Leaf -> HTML/JSON/PNG).
2. `01 / Two ways to pay`: Pay-as-you-go ($0 base, pay per request) vs Subscription (from $99/mo); enterprise line "Need more? Talk to sales".
3. `02 / Calculator`: component 3.12 + worked-examples table.
4. `03 / Subscription plans`: billing toggle + 4 cards (Starter, Scale 500K, Scale 1M [popular], Growth 2M). Placeholder prices only; real ones in `config/plans.ts`.
5. `04 / Included everywhere`: 8-tile feature grid (retries, geotargeting, JS rendering, JSON output, webhooks, dashboards, support, SLA).
6. `05 / How credits work`: 4 explainer tiles + difficulty multiplier table (Standard x1 through Extreme x10).
7. `06 / FAQ`: 7 questions (billing, refunds, overage, failed requests free, trials, taxes, cancellation).
8. CTA band, footer.

### 4.3 Docs `/docs/*`
- Layout (lg): top bar (logo, version, search, Ask AI, Log in, Start free) / section row (Home, Get started, API reference, SDKs, Integrations, Playground) / 3 panes: left sidebar 280 / content max 760 / right "On this page" 220.
- Sidebar: grouped headings, active item brand left bar, badges (new, free, legacy); collapses to drawer on mobile via "Menu" button.
- Search: Cmd+K overlay, keyboard nav, results grouped by section (use Pagefind or Fuse index).
- Docs home: hero + terminal sample (HTML/JSON/Markdown tabs), card grids (API products, SDKs with install commands), 3-step quickstart (1 Get token, 2 Send request, 3 Read response) with language tabs, status/errors cards.
- Article template: breadcrumb, h1, last-updated, content (MDX), callouts, code blocks, parameter tables (name, type, required chip, description), response examples, prev/next footer, "Was this helpful?" thumbs, edit-on-GitHub link.
- API reference page: left narrative, right sticky code panel (two-column at xl).
- Error codes page: table (code, meaning, retry advice, charged?).
- Playground `/docs/playground`: URL input, param form, Send, response viewer; uses logged-in token or a demo token.

### 4.4 Login / Signup `/login`, `/signup`
- Centred card 420w, r-xl, bg-2, sh-3, on grid+glow bg. Two-pane at lg: left value-prop panel ("Web data, made effortless.", 3 bullets, logo strip), right form. Mobile: form only.
- Flow:
  1. "Continue with GitHub" and "Continue with Google", divider "or".
  2. Email field + Continue.
  3. Step 2: "Check your email" with 6-digit code input; "Use password instead"; resend (30s cooldown); "Use a different email".
  4. Password mode: password field, Forgot password link.
  5. Signup adds: terms/privacy line (implicit consent), no card required, "100 free requests" note.
- Turnstile bot check; error banner `role=alert`; loading overlay "Signing you in...".
- `/signup` and `/login` share one component with a `mode` prop; header "Start free" goes to `/signup`.
- `/forgot-password`, `/reset-password`, `/verify-email`: same card shell.

### 4.5 Dashboard `/dashboard`
- Shell: left sidebar 240 (Overview, API tokens, Usage, Requests log, Billing, Settings, Docs link), top bar (workspace/plan chip, theme toggle, avatar menu). Mobile: bottom tab bar or drawer.
- Overview, top to bottom:
  1. Welcome row + plan chip + "Upgrade" button.
  2. 4 KPI tiles: Requests this period, Credits left, Success rate, Avg latency; each with delta chip and 7-day sparkline.
  3. **API token card**: label, two tokens (Normal, JS) masked `dls_live_••••••••3f9a`, Reveal / Copy / Regenerate (confirm modal), last-used time, "Test it" curl snippet using the token (code block 3.6, prefilled).
  4. **Usage chart card**: area/line chart, X = day, Y = requests; range switcher 24h / 7d / 30d / Billing period; series toggle (Total, Success, Failed); tooltip with date + values; below it, a thin quota bar "412,030 / 500,000 credits (82%)" turning warning at 80%, danger at 95%.
  5. Recent requests table: time, URL (truncate), status chip, credits, latency; "View all" link.
  6. Onboarding checklist (until done): copy token, first request, add payment method.
- Chart: Recharts (area chart), brand-500 line, 15% fill gradient, accent for secondary, grid lines `--border`, axis 12px text-2, responsive container, aria label + data table fallback via "View as table".
- Empty state (no usage): chart replaced with illustration + sample curl.
- Loading: skeletons. Error: inline retry card.

### 4.6 Account `/account`
- Tabs (sidebar on lg): Profile, Security, Billing, Team (optional), Danger zone.
- Profile: name, email (verify flow), avatar upload, timezone.
- Security: password change, connected providers (GitHub/Google link/unlink), active sessions list with revoke, 2FA (TOTP) toggle.
- Billing: current plan card, usage this period, change plan (opens pricing cards in modal), payment method (Stripe Customer Portal link), invoices table (date, amount, status chip, PDF link), billing email, VAT ID.
- Notifications: toggles for 80% usage alert, failed-payment, product news.
- Danger zone: delete account (type email to confirm modal), export data.
- Save pattern: per-section Save button, toast on success, unsaved-changes guard.

### 4.7 Other pages (small)
- `/contact` (sales form), `/status` (uptime summary), `/blog` (index), `/legal/privacy`, `/legal/terms`, `/404`, `/500`.

## 5. Responsive rules
- Mobile first; breakpoints sm 480 / md 768 / lg 1024 / xl 1280.
- Nav: full bar >= lg; drawer below. CTAs "Start free" stays visible in the bar from md.
- Hero: stack below lg, copy first, feed panel full width below (limit 6 rows). Display type clamps 40-64px.
- Status strip: horizontal scroll with snap below md.
- Feature grid: 3/2/1 columns at lg/md/sm. Product cards: 5 -> 3+2 (md) -> 1 col.
- Pricing cards: 4 across (xl), 2x2 (md-lg), stacked (sm); highlighted card moved first on mobile. Calculator controls stack; sliders full width.
- Tables: wrap in `overflow-x-auto`, sticky first column; or convert to stacked key/value cards below sm for plan comparison.
- Docs: 3 panes at xl, right TOC hidden below xl (becomes dropdown "On this page" above content), sidebar becomes drawer below lg. Code blocks scroll horizontally; never wrap.
- Dashboard: sidebar drawer below lg; KPI tiles 4/2/1; chart height 320 -> 240 on sm; tables become card lists on sm.
- Auth: two-pane -> single card below lg.
- Touch targets >= 44x44px on pointer: coarse. Body text never < 14px. No horizontal page scroll at 320px.
- Images/SVG: responsive, `next/image`, explicit width/height to avoid CLS.
- Section spacing steps 96/64/48; container gutters 24/16.
- Performance budget: LCP < 2.0s, CLS < 0.05, JS < 170KB gzip on marketing pages.

## 6. Accessibility
- WCAG 2.2 AA: contrast 4.5:1 text, 3:1 UI; check brand-on-bg pairs in both themes.
- Visible focus ring everywhere; skip-to-content link; landmarks (header, nav, main, footer).
- Don't rely on colour alone for status (chip text + icon).
- Reduced-motion respected; marquee pausable.
- Forms: labels, errors tied with aria-describedby, no placeholder-only labels.
- Code blocks: focusable scroll region (`tabindex=0`), copy button labelled.
- Charts: text alternative + table view.

## 7. Recommended stack
- Framework: Next.js 15 (App Router, TypeScript, RSC), deployed on Vercel (or any Node host / Docker).
- Styling: Tailwind CSS 4 with token variables, `tailwind-merge` + `class-variance-authority`; shadcn/ui primitives (Radix) restyled to tokens; `lucide-react` icons.
- Fonts: `next/font` (Inter, JetBrains Mono).
- Content: MDX via `next-mdx-remote` or Contentlayer alternative (`velite`); Shiki for highlighting; Pagefind or Fuse.js for docs search.
- Auth: Auth.js (NextAuth v5) with Email magic-link/OTP (Resend), GitHub + Google OAuth, optional credentials (argon2). Alternative: Clerk if speed matters more than control.
- DB: Postgres (Neon or Supabase) + Drizzle ORM. Tables: users, accounts, sessions, verification_tokens, api_tokens (hashed), usage_daily, requests_log, subscriptions, invoices.
- Billing: Stripe Checkout + Customer Portal + webhooks.
- Email: Resend + React Email.
- Charts: Recharts.
- Validation: Zod; forms via react-hook-form.
- Rate limit / cache: Upstash Redis (`@upstash/ratelimit`).
- Bot check: Cloudflare Turnstile.
- Analytics: Plausible; errors: Sentry.
- Testing: Vitest (unit), Playwright (e2e: signup, token copy, pricing toggle), axe for a11y.
- Tooling: pnpm, ESLint, Prettier, Husky + lint-staged, GitHub Actions CI.
- Scrape engine itself is out of scope; the site calls it via `lib/engine.ts` stub (mock data in MVP).

### API token handling
- Format `dls_live_<32 random bytes base62>`; show once at creation (and reveal on demand only via fresh-auth), store SHA-256 hash + last 4 chars.
- Regenerate invalidates old token immediately; audit row written.

## 8. File structure
```
scraper-site/
├─ DESIGN.md
├─ package.json  tsconfig.json  next.config.ts  postcss.config.mjs
├─ drizzle.config.ts  .env.example  middleware.ts
├─ public/        (logo.svg, og.png, favicon, illustrations/)
├─ content/
│  ├─ docs/       (*.mdx grouped: get-started/, api/, sdks/, errors.mdx)
│  └─ blog/
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ layout.tsx            (banner, nav, status strip, footer)
│  │  │  ├─ page.tsx              (Home)
│  │  │  ├─ pricing/page.tsx
│  │  │  ├─ contact/page.tsx
│  │  │  └─ legal/[slug]/page.tsx
│  │  ├─ (docs)/docs/
│  │  │  ├─ layout.tsx            (sidebar, search, TOC)
│  │  │  ├─ page.tsx
│  │  │  ├─ [...slug]/page.tsx
│  │  │  └─ playground/page.tsx
│  │  ├─ (auth)/
│  │  │  ├─ layout.tsx
│  │  │  ├─ login/page.tsx  signup/page.tsx
│  │  │  └─ forgot-password/  reset-password/  verify-email/
│  │  ├─ (app)/
│  │  │  ├─ layout.tsx            (auth guard, dashboard shell)
│  │  │  ├─ dashboard/page.tsx
│  │  │  ├─ dashboard/tokens/page.tsx
│  │  │  ├─ dashboard/usage/page.tsx
│  │  │  ├─ dashboard/requests/page.tsx
│  │  │  └─ account/(profile|security|billing)/page.tsx
│  │  ├─ api/
│  │  │  ├─ auth/[...nextauth]/route.ts
│  │  │  ├─ tokens/route.ts       (list/create/regenerate)
│  │  │  ├─ usage/route.ts
│  │  │  ├─ status/route.ts
│  │  │  ├─ demo/route.ts         (rate-limited sample call)
│  │  │  └─ stripe/webhook/route.ts
│  │  ├─ not-found.tsx  error.tsx  globals.css  layout.tsx
│  ├─ components/
│  │  ├─ ui/        (button, input, select, tabs, accordion, badge, modal, toast, tooltip, table, skeleton, switch, slider)
│  │  ├─ layout/    (nav, mega-menu, footer, banner, status-strip, theme-toggle, container, section-header)
│  │  ├─ marketing/ (hero, live-feed, logo-wall, feature-grid, product-card, pipeline, stat-grid, testimonial, cta-band, faq)
│  │  ├─ pricing/   (plan-card, billing-toggle, calculator, credit-table)
│  │  ├─ code/      (code-block, code-tabs, copy-button, output-tabs)
│  │  ├─ docs/      (sidebar, toc, search-dialog, callout, param-table, pager)
│  │  ├─ auth/      (auth-form, social-buttons, otp-input, turnstile)
│  │  ├─ dashboard/ (shell, kpi-tile, token-card, usage-chart, quota-bar, requests-table, checklist)
│  │  └─ account/   (profile-form, security-panel, billing-panel, danger-zone)
│  ├─ lib/
│  │  ├─ auth.ts  db/(schema.ts, index.ts, queries.ts)  tokens.ts
│  │  ├─ stripe.ts  email.ts  ratelimit.ts  engine.ts  mdx.ts  utils.ts
│  ├─ config/       (site.ts, nav.ts, plans.ts, faq.ts, scrapers.ts)
│  ├─ styles/       (tokens.css)
│  └─ types/
└─ tests/           (unit/, e2e/)
```

## 9. Tailwind token wiring (sketch)
```css
/* tokens.css */
:root{--bg-0:#fff;--bg-1:#F5F8F6;--bg-2:#fff;--bg-3:#EDF2EF;--border:#DCE5DF;
--text-0:#0C1510;--text-1:#3A4A41;--text-2:#62746A;--brand-500:#16A34A;--brand-ink:#fff}
.dark{--bg-0:#0A0F0C;--bg-1:#0F1612;--bg-2:#151E19;--bg-3:#1C2822;--border:#24322B;
--text-0:#EEF4F0;--text-1:#B6C4BB;--text-2:#7F9188;--brand-500:#3DDC84;--brand-ink:#04130A}
```
- Tailwind theme extends colours as `bg-0: 'var(--bg-0)'` etc.; radius, shadow, font families, spacing per section 2.
- Utilities: `.section` (py-24 md:py-16 sm:py-12), `.container-x` (max-w-[1200px] px-6), `.eyebrow` (mono micro label), `.grid-bg`.

## 10. MVP build order
1. **Foundations (day 1):** Next.js + TS + Tailwind scaffold, tokens.css, fonts, dark/light toggle, Button/Input/Badge/Tabs/Accordion, container + section header.
2. **Marketing shell:** banner, nav (+ mobile drawer), footer, cookie consent, status strip (mocked).
3. **Code block:** Shiki block with language tabs, copy, output tabs. Reused everywhere, so build early.
4. **Home:** hero + live feed, logo wall, interactive API demo (static data), feature grid, pipeline, products, FAQ, CTA.
5. **Pricing:** plan config, cards, billing toggle, calculator, credit table, FAQ.
6. **Docs:** MDX pipeline, sidebar, TOC, Cmd+K search, quickstart, API reference, errors; playground later.
7. **Database + auth:** Postgres + Drizzle schema, Auth.js (GitHub + email code), login/signup UI, route guards, Turnstile.
8. **Dashboard:** shell, API token create/hash/reveal/regenerate, KPI tiles, usage chart (seeded or mock usage via `lib/engine.ts`), recent requests table, quota bar.
9. **Account:** profile, security (sessions, providers), then billing.
10. **Billing:** Stripe Checkout, Customer Portal, webhook -> subscriptions table, plan limits, usage alerts email.
11. **Hardening:** a11y pass (axe), Lighting budget, SEO (metadata, sitemap, OG images, JSON-LD), rate limits, Sentry, Playwright smoke tests, 404/500.
12. **Post-MVP:** real engine integration, team seats, request log filters, Ask-AI docs, blog, i18n (EN, DE, FR), status page with real data, webhooks UI.

### Definition of done (MVP)
- A visitor can read Home/Pricing/Docs, sign up with GitHub or email code, see a dashboard with a working token and usage chart, copy a curl call, and manage the plan and account.
- Both themes pass AA contrast; all pages usable at 320px; Lighthouse >= 90 (perf, a11y, SEO) on marketing pages.

## 11. Content placeholders
- Never reuse source site copy. Draft original text in `src/config/*.ts` and MDX; use `example.com` domains and fake logos; mark all numbers (customers, uptime) as placeholders until real.
