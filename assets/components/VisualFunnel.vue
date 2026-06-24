<script setup lang="ts">
const steps = [
  { label:'Visited site', pct:100, count:'84,200', drop:38 },
  { label:'Started signup', pct:62, count:'52,204', drop:19 },
  { label:'Created project', pct:43, count:'36,206', drop:24 },
  { label:'Invited a teammate', pct:19, count:'16,012', drop:9 },
  { label:'Upgraded to paid', pct:10, count:'8,420', drop:0 },
]
</script>

<template>
  <div class="vframe">
    <div><div class="vtitle">Activation funnel</div><div class="vmeta">Signup → Paid · 7-day window</div></div>
    <div class="fsteps">
      <div v-for="s in steps" :key="s.label" class="fstep">
        <div class="fstep-top"><span class="fstep-label">{{ s.label }}</span><span class="fstep-pct">{{ s.pct }}%</span></div>
        <div class="fstep-bar"><span :style="{ width: s.pct + '%' }" /><em class="fstep-count">{{ s.count }}</em></div>
        <div v-if="s.drop" class="fstep-drop">▼ {{ s.drop }}% drop-off</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fsteps { display: flex; flex-direction: column; gap: 11px; }
.fstep { display: flex; flex-direction: column; gap: 5px; }
.fstep-top { display: flex; align-items: baseline; }
.fstep-label { font-size: 13.5px; color: var(--fg-muted); }
.fstep-pct { margin-left: auto; font-size: 15px; font-weight: 600; font-feature-settings: "tnum" 1; background: var(--accent); -webkit-background-clip: text; background-clip: text; color: transparent; }
.fstep-bar { position: relative; height: 30px; border-radius: 9px; background: var(--hair-2); overflow: hidden; }
.fstep-bar span { display: block; height: 100%; border-radius: 9px; background: var(--accent); opacity: 0.92; }
.fstep-count { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-style: normal; font-size: 12px; font-weight: 600; color: var(--accent-ink); font-feature-settings: "tnum" 1; }
.fstep-drop { font-size: 11px; color: var(--fg-faint); }
</style>
