<script setup lang="ts">
defineProps<{ index: string; name: string; desc: string }>()
</script>

<template>
  <div class="pillar-card">
    <div class="pillar-index">{{ index }}</div>
    <div class="pillar-body"><h3>{{ name }}</h3><p>{{ desc }}</p></div>
  </div>
</template>

<style scoped>
.pillar-card { display: flex; flex-direction: column; gap: 26px; padding: 30px 28px 32px; min-height: 260px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--hair); transition: border-color var(--dur) ease, background var(--dur) ease, transform var(--dur) ease; }
.pillar-card:hover { background: var(--surface-2); border-color: color-mix(in srgb, var(--primary) 40%, transparent); transform: translateY(-4px); }
.pillar-index { font-size: 17px; font-weight: 600; letter-spacing: 0.06em; font-feature-settings: "tnum" 1; background: var(--accent); -webkit-background-clip: text; background-clip: text; color: transparent; }
.pillar-body { margin-top: auto; }
.pillar-card h3 { font-size: 27px; font-weight: 600; letter-spacing: -0.02em; color: var(--fg); margin-bottom: 10px; }
.pillar-card p { font-size: 17px; line-height: 1.4; color: var(--fg-muted); }
</style>
