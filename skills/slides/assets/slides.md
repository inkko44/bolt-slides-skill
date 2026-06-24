---
# ══════════════════════════════════════════════════════════════════════
#  ⚠️  THROWAWAY STARTER. Its only purpose is to prove the project renders.
#  DELETE every slide below and AUTHOR THE USER'S DECK FROM SCRATCH.
#  Do NOT reskin this file — do not reuse its slide order, its copy, or any
#  placeholder. The deck's topic, name, and content come from the user's
#  request/brand, never from here. Keep the frontmatter KEYS; set values to
#  match the topic. The whole look is set in styles/index.css (:root block).
# ══════════════════════════════════════════════════════════════════════
theme: default
layout: cover
title: Starter — replace this entire deck
colorSchema: dark
background: '#05070a'
class: text-white
highlighter: shiki
lineNumbers: false
aspectRatio: 16/9
canvasWidth: 1080
transition: fade
mdc: true
drawings: { enabled: true, persist: false }
fonts:
  sans: Inter
  serif: Inter
  mono: JetBrains Mono
---

<div class="kicker">Replace · everything</div>

<div class="wordmark rise">Title</div>

<div class="subhead blur-in" style="margin:0 auto">This starter renders so you can verify the UI + motion. Delete it and build the real deck.</div>

---
layout: statement
---

<!-- v-clicks reveals these one beat at a time as you present (a "build"). -->
<div v-click class="kicker" style="margin-bottom:20px">The build</div>

# A single big idea, <span class="accent-text">revealed</span> on click.

---
layout: feature
kicker: A capability
---

# A feature headline.

<p>One or two sentences of muted body copy. Replace with the real message. Use a topic-appropriate visual in the slot — not necessarily this dashboard.</p>

::visual::

<!-- TiltCard gives the hero visual a mouse-tracked 3D tilt. -->
<TiltCard><VisualDashboard /></TiltCard>

---
layout: bento
kicker: Compose like the web
title: Bento beats a row of equal cards.
---

<div class="bento">
  <div class="btile hero glow">
    <div class="btile-k">Hero tile</div>
    <div>
      <div class="btile-fig grad"><CountUp :to="9.4" :decimals="1" suffix="M" /></div>
      <div class="btile-cap">One big tile anchors the grid; the rest support it.</div>
    </div>
  </div>
  <div class="btile" style="grid-column:span 4"><div class="btile-k">Uptime</div><div class="btile-fig"><CountUp :to="99.99" :decimals="2" suffix="%" /></div></div>
  <div class="btile accent" style="grid-column:span 3"><div class="btile-k">Regions</div><div class="btile-fig"><CountUp :to="28" /></div></div>
  <div class="btile" style="grid-column:span 4"><div class="btile-k">Connectors</div><h3>120+ native</h3><p>Replace with real, on-topic content.</p></div>
  <div class="btile" style="grid-column:span 3"><div class="btile-k">Compliance</div><h3>SOC 2 · HIPAA</h3></div>
</div>

---
layout: split
kicker: Full-bleed split
---

# Edge-to-edge media. <span class="accent-text">No floating card.</span>

<p>Text on one side, media bleeding to the slide edge on the other — a real web feature section. Set <code>flip: true</code> to swap sides.</p>

::media::

<div class="panel" style="background: radial-gradient(120% 100% at 30% 20%, color-mix(in srgb, var(--primary) 22%, transparent), transparent 60%), var(--surface-2)"></div>
<div class="absolute inset-0 flex items-center justify-center p-10">
  <TiltCard><VisualDashboard /></TiltCard>
</div>

---
layout: grid
title: A grid of proof points.
---

<div class="metrics">
  <StatCard label="Metric" caption="Counts up on view."><CountUp :to="92" suffix="%" /></StatCard>
  <StatCard label="Metric" caption="Counts up on view."><CountUp :to="3.4" :decimals="1" prefix="$" suffix="B" /></StatCard>
  <StatCard value="00" label="Metric" caption="Plain value still works." />
  <StatCard value="00" label="Metric" caption="Replace." />
</div>

---
layout: grid
title: Pricing fits on one slide.
---

<div class="tiers">
  <PriceTier name="Tier A" blurb="Placeholder." price="$0" unit="per unit"
    :features="['Feature one','Feature two','Feature three','Feature four']" />
  <PriceTier featured name="Tier B" blurb="Placeholder." price="$00" unit="per month"
    :features="['Everything in A','Feature two','Feature three','Feature four','Feature five']" />
  <PriceTier name="Tier C" blurb="Placeholder." price="Custom" unit="contact us"
    :features="['Everything in B','Feature two','Feature three','Feature four','Feature five']" />
</div>

---
layout: cover
class: is-closing
---

<div class="wordmark">Title</div>

<div class="subhead" style="margin:0 auto">Closing line and a call to action.</div>
