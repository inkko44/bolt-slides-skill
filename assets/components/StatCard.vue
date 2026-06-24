<script setup lang="ts">
/* `value` is the simple case; for an animated number, omit it and pass a
   <CountUp> in the default slot instead:
     <StatCard label="Revenue" caption="vs last year"><CountUp :to="1.24" :decimals="2" prefix="$" suffix="M" /></StatCard> */
defineProps<{ value?: string; label: string; caption: string }>()
</script>

<template>
  <div class="stat-card lift">
    <div class="stat-value"><slot>{{ value }}</slot></div>
    <div class="stat-label">{{ label }}</div>
    <div class="stat-caption">{{ caption }}</div>
  </div>
</template>

<style scoped>
.stat-card { display: flex; flex-direction: column; gap: 8px; padding: 34px 28px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--hair); text-align: left; }
.stat-card:hover { border-color: color-mix(in srgb, var(--primary) 35%, transparent); }
.stat-value { font-size: 56px; font-weight: 600; letter-spacing: -0.04em; line-height: 1; font-feature-settings: "tnum" 1; background: var(--accent); -webkit-background-clip: text; background-clip: text; color: transparent; }
.stat-label { font-size: 19px; font-weight: 600; color: var(--fg); margin-top: 10px; }
.stat-caption { font-size: 15px; color: var(--fg-faint); line-height: 1.4; }
</style>
