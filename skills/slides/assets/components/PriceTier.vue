<script setup lang="ts">
defineProps<{ name: string; blurb: string; price: string; unit: string; features: string[]; featured?: boolean }>()
</script>

<template>
  <div class="tier" :class="{ 'is-featured': featured }">
    <div v-if="featured" class="tier-badge">Most chosen</div>
    <div class="tier-head"><h3>{{ name }}</h3><p class="tier-blurb">{{ blurb }}</p></div>
    <div class="tier-price"><span class="tier-amount">{{ price }}</span><span class="tier-unit">{{ unit }}</span></div>
    <ul class="tier-features"><li v-for="f in features" :key="f"><span class="tier-tick">✦</span>{{ f }}</li></ul>
  </div>
</template>

<style scoped>
/* Sized to fit three tiers within the 1080×607 canvas without overflow. */
.tier { display: flex; flex-direction: column; gap: 16px; padding: 24px 24px 26px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--hair); position: relative; }
.tier.is-featured { background: color-mix(in srgb, var(--primary) 8%, transparent); border-color: color-mix(in srgb, var(--primary) 45%, transparent); box-shadow: var(--glow); padding-top: 30px; }
.tier-badge { position: absolute; top: -11px; left: 50%; transform: translateX(-50%); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; white-space: nowrap; color: var(--accent-ink); padding: 4px 12px; border-radius: 999px; background: var(--accent); }
.tier-head h3 { font-size: 23px; font-weight: 600; letter-spacing: -0.02em; color: var(--fg); }
.tier-blurb { font-size: 14px; color: var(--fg-faint); margin-top: 4px; line-height: 1.3; }
.tier-price { display: flex; flex-direction: column; gap: 3px; padding-bottom: 2px; }
.tier-amount { font-size: 36px; font-weight: 600; letter-spacing: -0.035em; color: var(--fg); font-feature-settings: "tnum" 1; line-height: 1; }
.tier-unit { font-size: 13.5px; color: var(--fg-faint); }
.tier-features { list-style: none; padding: 0; margin: 0; border-top: 1px solid var(--hair-2); padding-top: 16px; display: flex; flex-direction: column; gap: 9px; }
.tier-features li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--fg-muted); line-height: 1.3; }
.tier-tick { font-size: 11px; line-height: 1.5; background: var(--accent); -webkit-background-clip: text; background-clip: text; color: transparent; flex-shrink: 0; }
</style>
