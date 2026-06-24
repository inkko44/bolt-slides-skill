---
name: slides
description: >-
  Build presentation-grade Slidev decks with a fixed, hand-tuned navigation UI and
  a bespoke theme + structure designed per request. Use this WHENEVER the user asks
  for slides, a presentation, a deck, a pitch, a keynote, a talk, a slideshow, or to
  "present" or "turn this into slides" — including when they paste a brand, website
  URL, document, or product. Scaffolds by COPYING the bundled files in assets/
  verbatim, then AUTHORS an original deck from the user's real topic/brand.
---

# Slides — premium Slidev decks for Bolt

This skill has two halves. Keep them separate in your head:

- **The visual system is pre-built** — `assets/` holds a complete Slidev project
  (navigation chrome, layouts, components, CSS, **and a motion + depth layer**).
  **Copy it verbatim. Never regenerate it.** This is what makes every deck look
  polished — and *feel* alive rather than like a flat slide template. It is a
  **starting kit, not a ceiling**: copy it as-is, then **invent new layouts,
  components, and visuals on top** for the topic (see "Extend the system").
- **The content is authored fresh, every time** — the slides themselves (topic,
  structure, copy, visuals, theme) are designed from scratch for *this* request.

## ⛔ Two hard rules

1. **Copy `assets/global-bottom.vue`, `assets/layouts/*`, and `assets/components/*`
   byte-for-byte.** Do not retype or paraphrase them. (This is why the UI must
   look identical.)
2. **Author the deck from the user's REAL input — do not reskin the starter.**
   The bundled `assets/slides.md` is a throwaway that only proves the project
   runs. **Delete it and write a new deck.** Never reuse its slide order, its copy,
   its placeholders, or its fake names. If the user named a real product or pasted
   a link, the deck is about *that* — never invent a fictional substitute.

> The most common failure is find-replacing the example into a near-identical deck
> (same arc, same fake "Northwind" quote, same analytics product). That is a
> failure even if it looks nice. Each deck must be genuinely its own.

---

## Step 0 — Ground the deck in the user's real input (do this first)

The deck is *about what the user gave you*: their topic, brand, document, or idea.
Use **real** names, positioning, and facts.

- If they pasted content/data → mine it for the real structure, numbers, and story.
- If they named or linked a brand → **Brand handling** below; use the real company.
- **Never fabricate** a placeholder company, customer, logo, or quote for a real
  subject. If you're missing a fact, ask or leave it out — don't make it up.

### Brand & link handling (a STOP gate — do this before any slides exist)

If the request contains a website URL or a brand/product name, the theme is **not
yours to invent** — it comes from that brand. A past run ignored a pasted link and
shipped a generic SaaS in arbitrary colors. Never again. Work this gate in order:

1. **Get the real brand colors — actually try.** In order of preference:
   a. **Fetch the URL** (use your web-fetch/browse capability) and read the page:
      `<meta name="theme-color">`, primary button/link colors, headings, the logo
      SVG fill, CSS custom properties, the `og:image`. Pull 1–2 real hex values and
      the font-family.
   b. If you can't fetch it but the brand is **recognizable**, use its known brand
      colors and typeface from memory (e.g. a famous company's signature color).
   c. If you can do neither, **STOP and ask the user** for the brand's primary +
      secondary hex and the logo before building. Offer to proceed with a tasteful
      neutral theme only if they decline.
   **Do not skip to a generic palette and call it the brand.** That is the failure.
2. **Use the real brand everywhere.** The deck's name, what it does, its voice, and
   its audience are the brand's — never a fictional substitute, never the examples.
3. **Map brand → `:root` tokens.** `--primary` and the `--accent` gradient come from
   the brand's primary hex; pick `--bg`/`--fg` for a light or dark reading of the
   brand's feel; set `--font-head`/`--font-body` to the brand font (or the closest
   Google Font). Save the logo to `public/` and show it on the cover/closing instead
   of the text wordmark.
4. **Keep the discipline.** Brand color on the accent + a few key surfaces over
   otherwise-neutral premium surfaces — flooding everything with it looks cheap.
5. **Report the source.** When done, tell the user which colors/fonts you used and
   where they came from ("pulled `#1A73E8` from the site's buttons" / "used the
   brand's known palette" / "you provided these"). This makes a miss obvious.

---

## Step 1 — Scaffold (copy the bundled project)

Copy these from the skill's `assets/` into the project root, **unchanged**:

```
package.json
global-bottom.vue            ← LOCKED. copy exactly, never edit.
styles/index.css             ← edit ONLY the :root block (Step 2); ships motion, depth + web-section CSS
layouts/  cover feature grid lead quote statement bento split   ← LOCKED, copy exactly
components/  StatCard PillarCard PriceTier VisualDashboard VisualFunnel CountUp TiltCard Marquee Fit   ← copy; add your own
slides.md                    ← THROWAWAY. delete its content; author the real deck (Steps 3–8)
```

Slidev auto-loads `styles/index.css`, auto-imports `components/`, renders
`global-bottom.vue` over every slide, and resolves `layout: <name>`. No extra
config or dependencies. `npm install && npm run dev` serves at `:3030` with the
correct UI. Verify the dock appears, then build the real deck.

---

## Extend the system — invent new layouts, components & visuals

**The bundled kit is a floor, not a ceiling.** The fastest way to a templated,
"every deck looks the same" result is to only ever use the 8 layouts and handful of
components that ship. **You are expected to author brand-new ones** whenever the
topic calls for it — a custom layout for a bento product map, a `<Timeline>` for a
roadmap, a `<Comparison>` table, an animated `<Gauge>`, a hand-built device mock.
Bespoke elements are *the* thing that makes a deck look art-directed rather than
generated. Build as many as the deck needs.

**Locked vs. yours to invent — the one line that matters:**
- 🔒 **Locked (copy verbatim, never rewrite):** `global-bottom.vue` (the nav chrome)
  and the `:root` token *names*. Retyping the chrome has broken it before.
- ✅ **Yours to invent (add freely):** any **new** `layouts/<name>.vue`, any **new**
  `components/<Name>.vue`, any new CSS class **appended** to `index.css`, any visual.
  Adding files never conflicts with the locked parts.

**Add a layout** — create `layouts/<name>.vue`; the root element must carry
`slidev-layout stage <name>`, and its CSS must be scoped as `.slidev-layout.<name>`
(the extra class out-specifies Slidev's default `.slidev-layout{display:grid}` — skip
it and centering/sizing break). Read frontmatter via `useSlideContext()`:
```vue
<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
</script>
<template>
  <div class="slidev-layout stage showcase">
    <div v-if="$frontmatter.kicker" class="kicker">{{ $frontmatter.kicker }}</div>
    <slot /><slot name="aside" />
  </div>
</template>
<!-- then append `.slidev-layout.showcase { … }` to styles/index.css, tokens only -->
```

**Add a component** — drop `components/<Name>.vue`; Slidev auto-imports it (no import
line). For anything that animates on view, gate it with an `IntersectionObserver` and
honor `prefers-reduced-motion` — copy the pattern from `CountUp.vue` /
`VisualDashboard.vue`. Use `<CountUp>` for any figure inside it.

**The contract every new element must honor** (this is what keeps the deck coherent):
1. **Tokens only** — every color/font/radius/shadow is a `var(--…)`. Never a raw hex.
   This is why one `:root` edit re-themes the whole deck, new pieces included.
2. **Web-section composition + the quality bar** (Steps 3, 7) — full-bleed, layered,
   one accent, editorial type, real content. A new element that's a bullet list in a
   box fails the bar.
3. **Motion with restraint + reduced-motion** (Step 6). Tabular nums on figures.
4. **Fit the 1080×607 canvas** — it clips overflow.
5. **No new dependencies** — plain Vue + CSS + SVG. Don't `npm install` chart libs;
   hand-build in SVG/CSS (it looks more bespoke anyway).

Don't fork the token names, don't restyle the chrome, don't pull in UI kits. Within
those rails, invent boldly — the more topic-specific custom elements, the better.

---

## Step 2 — Theme it (edit only the `:root` block)

All color, type, radius, depth, and motion come from the annotated `:root` block at
the top of `styles/index.css`. Re-theming the whole deck — including the dock's
accent — is just editing those values. **Change values, never variable names**
(the chrome and components read them).

Token contract: `--bg --bg-grad-1 --bg-grad-2 --surface --surface-2` · `--fg
--fg-muted --fg-faint` · `--hair --hair-2` · `--primary --accent --accent-ink` ·
`--radius* --shadow --glow` · `--font-head --font-body --font-mono` · `--dur --ease`.

- **One accent.** `--primary` is the solid accent (and the dock's active color);
  `--accent` may be a 2–4 stop gradient within ~80° of hue; `--accent-ink` is the
  readable color *on* the accent. Use it sparingly.
- **Dark vs light.** Dark → near-white `--fg` on near-black `--bg`, card fills at
  4–8% alpha, hairlines 8–10%. Light → near-black ink on warm white; set `html {
  color-scheme: light; }`, drop `--glow`, soften `--shadow`, use `class: text-black`
  in the deck frontmatter.
- **Fonts:** ≤2 families + optional mono, in `--font-head`/`--font-body`, **and** in
  `slides.md` frontmatter `fonts:` so Slidev loads them.
- **Required frontmatter** (the type scale is tuned for this canvas — keep it):
  `aspectRatio: 16/9`, `canvasWidth: 1080`, `mdc: true`, `transition: fade`, plus
  `background:` = `--bg` and `colorSchema:` = dark/light. Omitting `canvasWidth`
  makes Slidev default to 980 and every font renders ~10% too big.
- **Do not remove the `.slidev-layout.<name>` prefixes** in styles/index.css. The
  default Slidev theme sets `.slidev-layout { display:grid }`; those prefixes are
  what keep cover/statement/quote centered and the type sizes correct.

Derive the theme from the **brand** (Step 0) when one is given, otherwise from a
**style direction** in the gallery at the end. Commit fully to one look.

---

## Step 3 — Compose like the web, not like slides (the #1 thing)

> **The biggest reason a deck looks cheap: it's composed like PowerPoint — a
> centered title over a symmetric row of equal cards in a safe inner box.** That's
> slideware, and it's the AI-deck tell. The luxury decks are the *only* ones that
> look designed because they're the only ones composed like a **website hero** —
> full-bleed image, type anchored to an edge, huge negative space. That is not a
> luxury trick. It's just *web design taste*, and **every** direction gets it.

Compose each slide like a **section of a world-class landing page** — Linear,
Vercel, Stripe, Apple, the bento era. Concretely:

- **Full-bleed, not boxed.** Let media, color panels, and even type run to (and off)
  the slide edges. Kill the uniform inner margin that screams "slide."
- **Asymmetric, not centered.** Anchor the headline to a corner/side with big empty
  space opposite. Dead-center is for the *occasional* statement or quote — not the
  workhorse content slides.
- **Layered, not flat.** Stack foreground over background: a giant faint `.ghost`
  numeral/word behind the content, a card floating over a gradient, type over an
  image. Depth comes from overlap + scale contrast.
- **A real grid — especially BENTO.** The fastest way to read as "designed site":
  an asymmetric tile grid (one big hero tile + smaller ones), not four equal cards.
- **Type as composition.** Oversized headlines that *are* the layout, not a label
  above a card. One word in the accent. Let scale carry the slide.

This is a taste upgrade, not a component to staple on — apply it to the dark-SaaS,
fintech, and report decks exactly as the luxury deck applies it. The bundled `bento`
and `split` layouts (below) make it one-line easy; for full-bleed heroes, hand-build
with `layout: default` + absolute positioning + Uno utilities (the luxury pattern).

### Then structure the arc

**Structure follows the content. There is no fixed arc.** Do not start every deck
with cover → problem → stat → four feature+visual slides → pricing → close. That
skeleton is the example's, not a template. Pick an arc that fits the **deck type**,
then adapt it to the material:

- **Investor pitch:** hook → problem → why now → solution → how it works → traction
  → market → business model → team → ask.
- **Product launch:** tease → the shift → introduce → 2–4 capabilities → demo →
  proof → availability/pricing → CTA.
- **Brand / editorial:** statement of identity → philosophy → portfolio/work (full-
  bleed imagery) → numbers → service → invitation. Image-led, sparse text.
- **Teaching / talk:** title → agenda → concept → concept → worked example → recap →
  resources.
- **Report / analysis:** headline finding → context → method → results (charts) →
  implications → recommendations.
- **Internal / strategy:** TL;DR → situation → options → recommendation → plan →
  risks → next steps.

Compose from a **library of slide moves** — vary which you use and how many:
cover, full-bleed hero, **bento tile grid** (`bento`), **full-bleed split section**
(`split`), section divider, big statement, giant-number stat, editorial paragraph
(`lead`), feature+visual, comparison/2-column, timeline or numbered process, quote,
logo wall (`Marquee`), full-bleed image, pricing, agenda, closing CTA. A 10-slide
brand deck and a 16-slide pitch should look nothing alike.

Vary the slide **count** to the material. Don't pad to a template; don't cram.

### ⛔ Anti-slideware (the #1 reason decks look cheap)

A deck where every slide is "centered/left heading + gray paragraph + one card or a
row of equal cards" reads as a template even when each slide is clean. **That is the
failure to avoid.** Enforce variety AND web-section composition:

- **Symmetric equal-card rows are not a default.** Four identical cards in a row is
  the #1 slideware tell. Reach for a **`bento`** (asymmetric tiles) or a **`split`**
  (full-bleed media) instead. A plain `grid` of equal cards is allowed *once* at most.
- **The `feature` layout (floating visual) is ONE tool, not the deck.** Use it at
  most **2–3 times**, never twice in a row; prefer `split` (edge-to-edge media) for a
  more web-section feel.
- **No two consecutive slides share a layout.** Alternate rhythm and density: a quiet
  statement → a dense bento → a full-bleed split → a giant number → a quote. Contrast
  in scale is what makes a deck feel designed.
- **Every deck must include at least:** one **full-bleed moment** (image or
  gradient/section-divider), one **bento or split section**, one **giant-number**
  slide (`figure`/`CountUp`), and one **quote or single bold statement**.
- **Use the accent for drama.** One key headline word in the gradient accent
  (`<span class="accent-text">word</span>`). Let one number be huge. Make one slide
  nearly empty. Premium = contrast, not uniform density.
- **Open and close strong** — a cover and a closing CTA unlike the middle slides.

### Web-section patterns (copy these — they work for any direction)

**BENTO** — asymmetric tiles instead of a card row. One hero tile + smaller ones;
spans via inline `grid-column/grid-row`. Mix a `.glow`/`.accent` tile for emphasis:
```md
---
layout: bento
kicker: Platform
title: One workspace, every workflow.
---
<div class="bento">
  <div class="btile hero glow">
    <div class="btile-k">Throughput</div>
    <div>
      <div class="btile-fig grad"><CountUp :to="9.4" :decimals="1" suffix="M" /></div>
      <div class="btile-cap">events / min at peak · p99 under 40&thinsp;ms.</div>
    </div>
  </div>
  <div class="btile" style="grid-column:span 4"><div class="btile-k">Uptime</div><div class="btile-fig"><CountUp :to="99.99" :decimals="2" suffix="%" /></div></div>
  <div class="btile accent" style="grid-column:span 3"><div class="btile-k">Regions</div><div class="btile-fig"><CountUp :to="28" /></div></div>
  <div class="btile" style="grid-column:span 4"><div class="btile-k">Connectors</div><h3>120+ native</h3><p>Snowflake, Kafka, dbt, Segment…</p></div>
  <div class="btile" style="grid-column:span 3"><div class="btile-k">Compliance</div><h3>SOC 2 · HIPAA</h3></div>
</div>
```
(Spans sum to 12 per row; the `hero` tile is `span 5 / span 2`. Keep it to ~2 rows.)

**SPLIT** — a full-bleed feature section: text on one side, edge-to-edge media on
the other (set `flip: true` to swap sides). The media side bleeds to the slide edge
— that's what makes it read as web, not a floating card:
```md
---
layout: split
kicker: How it works
---
# Connect once. <span class="accent-text">Sync everywhere.</span>
<p>Point it at your warehouse and every downstream tool stays in lockstep — no pipelines to babysit.</p>

::media::
<!-- a colored panel with a product UI floating over it (Stripe/Linear style) -->
<div class="panel" style="background: radial-gradient(120% 100% at 30% 20%, color-mix(in srgb, var(--primary) 22%, transparent), transparent 60%), var(--surface-2)"></div>
<div class="absolute inset-0 flex items-center justify-center p-10">
  <TiltCard><VisualDashboard /></TiltCard>
</div>
```
(For brand/photo decks, the media is simply `<img src="/hero.webp">` — it bleeds full.)

**LAYERED HERO** — full-bleed, edge-anchored type with a giant `.ghost` numeral
behind it. Generalizes the luxury hero to any topic (`layout: default`):
```md
---
layout: default
---
<div class="ghost" style="font-size:460px; right:-30px; bottom:-110px">01</div>
<div class="absolute inset-0 flex flex-col justify-end px-24 pb-24 fade-up">
  <div class="kicker mb-5">The problem</div>
  <h1 class="rise" style="font-size:92px; line-height:.98; letter-spacing:-.04em; max-width:16ch; font-weight:600">
    Teams drown in <span class="accent-text">dashboards</span><br/>nobody reads.
  </h1>
</div>
<style>.slidev-layout{padding:0}</style>
```

### Design to the fixed frame — 1080×607 (this is why things clip)

A slide is **not** a responsive webpage that reflows and scrolls — it's a **fixed
1080×607 artboard that clips whatever overflows.** So don't author loosely and hope
it fits: **compose each slide to those exact dimensions**, the way you'd design a
Figma frame or a poster. Size everything to the known box.

- **The numbers:** canvas is **1080 × 607**. With the safe gutter (100 × 60), the
  **content area is 880 × 487**. Every slide's content lives in — and is sized to
  **fill** — that 880×487 box. The shared gutter is also what makes left edges line
  up slide-to-slide (the alignment fix).
- **Budget the height before you write.** Everything stacked on a slide must sum to
  **≤ 487px tall.** A text line ≈ `font-size × line-height`. E.g. a 54px headline at
  1.05 ≈ 57px/line; two lines ≈ 113px. Add the kicker (~20), gaps, and body, and
  keep the total under 487. If it doesn't fit, it's **two slides** — never shrink the
  whole deck's type to cram one slide.
- **Concrete caps that fit:** headline ≤ 2–3 lines; body ≤ 2–3 short sentences
  (~30 words) at the layout's size; a card row ≤ 4 across; a bento ≤ ~6 tiles in 2
  rows; pricing = 3 tiers (already tuned to fit). Past these, split the slide.
- **Fill the frame — both failure modes are bad.** Overflowing clips; but a tiny
  block floating in a huge empty slide also reads as unfinished. Compose to occupy
  the 880×487 area with deliberate negative space, not accidental emptiness.
- **Hand-composed slides (`layout: default`):** wrap content in **`.safe`**
  (`<div class="safe center">…`) so it sits in the same 880×487 box and aligns with
  every other slide — don't sprinkle arbitrary `px-20`/`px-24` (that's the
  misalignment).
- **Safety net, not a substitute:** for genuinely dense or uncertain slides, wrap the
  content in **`<Fit>`** — it scales content down to the frame so nothing ever falls
  out of view. Design to fit first; let `<Fit>` guarantee it.

> Mental model: you're laying out a **fixed 880×487 canvas**, not writing a document.
> Decide what fills it, size each element to the box, and verify by rendering at
> 1080×607 that nothing clips and edges line up.

---

## Step 4 — Visuals that fit the topic (don't staple dashboards everywhere)

The bundled `VisualDashboard` / `VisualFunnel` are **analytics examples**. Only use
them when the deck is genuinely about data/analytics. For other topics, the visual
must fit the subject — otherwise it looks generic and wrong:

- **Data/SaaS** → dashboard, funnel, cohort heatmap, chart, KPI panel (`.vframe`).
- **Real-world / brand / product / lifestyle** → generated photography (Step 5).
- **Process / system / B2B** → a diagram, flow, timeline, architecture, or
  comparison table built with CSS/SVG in the `.vframe` shell.
- **App / device** → a phone/browser mock with the real UI sketched in.

Build new visuals in the `.vframe` shell using `var(--primary)`/`var(--accent)`,
tabular numbers, and **plausible, on-topic data** (never `123`/`00`, never the
example's numbers). Don't reuse the same visual on multiple slides.

**Banned weak visuals** (these are why decks look basic):
- A **bulleted list inside a card** is still a bulleted list — not a visual. If
  you have 3 points, make them a 3-up `PillarCard` grid, a numbered process, or a
  diagram — not a list in a box on the right.
- The **same card style on every feature slide.** Vary the visual *type* across the
  deck: a chart on one, a diagram on another, a device mock on a third, an image on
  a fourth. Sameness reads as a template.
- A lone gradient blob or an empty rounded rectangle. A visual must carry real,
  specific content (data, a diagram, a UI, a photo).

A great data visual has hierarchy: a clear title, one hero figure, supporting rows,
and a single accent doing the highlighting — like a real product screen, not a
form. When in doubt for a non-data topic, a **full-bleed image** (Step 5) beats any
card.

Often the strongest move is to make the **whole slide the visual** — a `bento`
grid, a `split` section, or a layered full-bleed hero (Step 3) — rather than a
sentence next to one floating card. And don't feel limited to the bundled visuals:
**invent new ones that fit the topic** (see "Extend the system" below).

---

## Step 5 — Imagery (generate images for visual decks — don't skip it)

For **brand, product, editorial, lifestyle, or real-world** topics, **generate
images** with Bolt's image generation. The last output generated none and looked
flat — for these topics that's a miss.

- Generate into `public/` as `.webp`, named by role (`hero.webp`,
  `section-2.webp`). Reference with `<img src="/hero.webp">`.
- **Cohesion:** reuse one verbatim style descriptor across every image (e.g.
  "editorial photograph, natural light, muted palette, shallow depth of field,
  16:9") so they read as one shoot; match it to the theme/brand.
- Compose full-bleed under a gradient scrim for legibility (see the image-slide
  pattern below). Ask for **negative space** where text sits. **No text inside
  images** — add words as HTML on top. 16:9 for full-bleed, ~3:2 in-card.
- For pure data/SaaS decks, SVG mocks (Step 4) are enough — images optional.
- If image generation is genuinely unavailable, tell the user and use richer
  SVG/gradient/texture — never link external stock URLs.

**Full-bleed image slide** (use `layout: default`):
```md
---
layout: default
---
<div class="absolute inset-0">
  <img src="/hero.webp" class="w-full h-full object-cover" />
  <div class="absolute inset-0" style="background: linear-gradient(90deg, rgba(8,9,7,.92), rgba(8,9,7,.5) 45%, rgba(8,9,7,.1))"></div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-20 fade-up">
  <div class="kicker mb-6">Section</div>
  <h1 class="text-7xl font-light leading-none" style="color:var(--fg)">Headline <span class="accent-text">here</span></h1>
</div>
<style>.slidev-layout{padding:0}</style>
```

**Gradient section divider (NO image needed — use this on every data/B2B deck for
a full-bleed breather).** Two corner glows in the accent over `--bg`, one big
left-aligned headline with an accent phrase. Render-tested; looks premium:
```md
---
layout: default
---
<div class="absolute inset-0" style="background: radial-gradient(120% 100% at 12% 8%, rgba(79,229,176,.22), transparent 48%), radial-gradient(130% 130% at 92% 96%, rgba(41,192,240,.20), transparent 52%), var(--bg)"></div>
<div class="absolute inset-0 flex flex-col justify-center px-24 fade-up">
  <div class="kicker" style="margin-bottom:18px">Chapter 02</div>
  <h1 style="font-size:84px;line-height:1.0;letter-spacing:-.035em;max-width:15ch;font-weight:600">The part nobody <span class="accent-text">talks about.</span></h1>
</div>
<style>.slidev-layout{padding:0}</style>
```
(Set the two rgba glows from your `--primary`/accent hue. This single pattern is
the cheapest way to break a wall of feature cards.)

---

## Step 6 — Motion & depth (this is what makes it feel expensive)

A static, perfectly-typeset deck still reads as "nice template / Apple-Keynote
boring." What separates an *expensive* presentation is that it **moves and has
depth** — content arrives in beats, numbers animate, the background breathes,
visuals respond to the cursor. The system ships this; your job is to **use it,
with restraint.** All of it auto-disables under `prefers-reduced-motion`.

### Already automatic — don't fight it
Every `.stage` slide already has a **living depth field**: two accent spotlights
that slowly drift, a film-grain layer, and an edge vignette (all in
`styles/index.css`). This is why slides feel three-dimensional instead of flat.
Keep it. On a light deck, only lower `--grain`/`--vignette` if they read as dirty.

### The #1 lever: build slides in beats (presenter-driven reveals)
A wall of content shown all at once is the boring tell. Reveal it **one idea at a
time** with Slidev's built-ins — this is the single biggest upgrade to "feels
alive while presenting":
- `v-click` on an element → it appears on the next click. `<p v-click>…</p>`
- `<v-clicks>` around a list/group → each child reveals in turn.
- `v-motion` for choreographed entrances with real physics:
  `<h1 v-motion :initial="{ opacity:0, y:40 }" :enter="{ opacity:1, y:0 }">`
  Add `:delay` to stagger lines. Use on hero headlines and key reveals.

**Where to build:** the punchline stat after its setup, each step of a process,
items in a comparison, the answer after the question. **Where not to:** a cover,
a one-line statement, a quote — those land best whole. Rule of thumb: if a slide
has a sequence or a reveal, build it; if it's a single image, don't.

### Entrances & kinetic type (auto-play, no clicks)
Utility classes for the first beat of a slide (defined in `styles/index.css`):
- `.fade-up` (gentle), `.rise` (spring), `.blur-in` (focus-pull) on any element.
- `.kinetic` on a heading whose words/lines are wrapped in `<span>`s → they
  stagger in. Great for a cover wordmark or a big statement.

### Signature interactions (the "this deck is alive" moments)
- **`<CountUp :to="230" suffix="%" />`** — a number that counts up when its slide
  comes into view. Use it for every hero figure and proof stat instead of static
  text. Inside a `.figure` it inherits the accent gradient; it also drops into a
  `StatCard` slot: `<StatCard label="ARR" caption="…"><CountUp :to="4.2" :decimals="1" prefix="$" suffix="M"/></StatCard>`.
- **`<TiltCard>…</TiltCard>`** — wraps a hero visual for a subtle mouse-tracked 3D
  tilt + glare. Use it on the *one* main visual of a feature slide, not everywhere.
- The bundled **`VisualDashboard` draws itself in** on view (line draws, bars grow,
  KPIs count up). Build your own animated visuals the same way: give an SVG
  `<path pathLength="1">` the `.draw` class, give growing bars `.grow`, and put a
  `CountUp` on the figures.

### Hover life & restraint
- `.lift` floats a card toward the viewer with an accent glow on hover; `.sheen`
  sweeps a light highlight across it. `PillarCard`/`StatCard` already lift.
- **Restraint is the whole point.** One or two motion ideas per slide — a build, an
  entrance, one interactive visual. Confetti everywhere reads as cheap, not
  premium. Consistent easing (use the `--ease` tokens), things move *into place*
  and settle; nothing loops distractingly except the quiet ambient background. The
  expensive feel comes from physics and timing, not from the number of effects.

---

## Step 7 — Quality bar (non-negotiable)

1. **One idea per slide**, lots of empty space. Crowding is the #1 tell.
2. **No raw bullet lists as the design** — use cards, a stat grid, a process, a
   diagram, or an image.
3. **A single accent**, for emphasis only.
4. **Editorial type:** big headings (weight 500–600, tracking -0.02 to -0.04em,
   line-height ~1.05); muted body 24–28px, max ~40ch; UPPERCASE kickers; tabular
   figures.
5. **Depth, not decoration:** the living `.stage` atmosphere (drifting spotlights,
   grain, vignette), hairlines, generous radius, one soft shadow. No clip-art, no
   emoji-as-content, no text shadows.
6. **Designed to the fixed frame.** The canvas is a fixed **1080×607 (safe area
   880×487) that CLIPS overflow** — compose to those exact dimensions (Step 3), budget
   the height, fill the box, align to the gutter. No slide may overflow; dense content
   splits across slides or wraps in `<Fit>`. Sanity-check pricing and 3–4 card grids.
7. **Real, specific copy.** Use the user's facts. **Zero lorem, zero placeholder
   names, no fabricated quotes** for a real subject.
8. **Real visuals** that fit the topic (Steps 4–5), never a bare list.
9. **Original structure** (Step 3) — not a reskin of the starter.
10. **It moves, with restraint** (Step 6): key slides build in beats, hero figures
    `CountUp`, the main visual reacts (tilt / draw-in). One or two motion ideas per
    slide — never static, never a circus.
11. **It runs:** `:3030`, no console errors, dock + rail work.

---

## Step 8 — Writing

Short, declarative, specific headlines (sentence case). 1–3 tight benefit-led
sentences of body. 1–3 word kickers. One idea per slide. ~8–16 slides sized to the
material — 12 strong beats 30 weak. Use the user's real numbers; never invent
numbers for a real brand. Add `<!-- speaker notes -->` where useful.

---

## Step 9 — Definition of done (self-check)

- [ ] Chrome / layouts / components are **identical** to the bundled assets. Dock +
      rail appear; default controls hidden.
- [ ] The deck is **authored, not reskinned** — its topic, structure, copy, and
      names are the user's, with no example leftovers (no "Northwind", no Luma/Lumen
      unless that's the real subject).
- [ ] If a brand/URL was given, `--primary`, fonts, and logo come from that brand —
      not a generic palette. (If unobtainable, you asked the user.)
- [ ] Only the `:root` block was edited for the theme. Editing `--primary` recolors
      everything incl. the dock.
- [ ] Visuals fit the topic; brand/product/editorial decks have generated `.webp`
      images in `public/` sharing one style, under legible scrims.
- [ ] **No slide overflows** the fixed 1080×607 canvas, and content is sized to fill
      the 880×487 safe area; left edges **line up** slide-to-slide on the gutter
      (check pricing & card grids; wrap dense/hand-composed slides in `<Fit>`/`.safe`).
- [ ] **The deck moves** (Step 6): the ambient depth layer is intact, key slides
      build in beats, hero numbers `CountUp`, and the main visual reacts — without
      tipping into a circus.
- [ ] `npm install && npm run dev` serves on `:3030` with no console errors.

---

## Premium style gallery (when no brand dictates the look — pick, blend, or invent)

Each is expressed purely through the `:root` tokens. Don't default to #1.

1. **Dark product** (SaaS/analytics/dev) — near-black, one luminous accent, Inter or
   Space Grotesk, soft spotlight; SVG visuals. *(bundled default)*
2. **Editorial luxury** (brand/real-estate/fashion) — warm ink or bone, single
   gold/bronze accent, serif display + sans body, hairlines, full-bleed photography.
3. **Swiss / typographic** (design-forward/agency) — off-white or black, ONE bold
   accent (red/cobalt), tight grotesk, massive left-aligned headlines on a grid.
4. **Dark technical** (infra/API/AI/security) — true black/slate, electric accent,
   mono labels over sans, faint grid, subtle glow; code/schema/pipeline mocks.
5. **Warm minimal / human** (consumer/wellness/community) — cream/sand, earthy
   accent, rounded radius, humanist sans, gentle shadows, soft imagery.
6. **Fintech confident** (finance/enterprise/B2B) — deep navy/ink, restrained accent,
   IBM Plex Sans, hairline tables, minimal motion, big honest numbers.
7. **Aurora glass** (modern launch/AI consumer) — dark base, blurred gradient mesh
   behind frosted cards, vivid controlled accents, big rounded type. One glass layer.
8. **Bold / cinematic** (launch/sports/automotive/film) — warm black or full-bleed
   photography with grain, condensed/extra-bold display, one hot accent, dramatic.
9. **Monochrome / paper editorial** (report/journalism) — off-white ink-on-paper or
   stark B&W, serif body + sans display, hairlines, footnotes, one-hue accent.

Blend two when it fits; derive from brand colors when given. The constant is the
quality bar and the navigation chrome — everything else is yours to art-direct.
**Commit fully** — a half-committed look reads as generic.
