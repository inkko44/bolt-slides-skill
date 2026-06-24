<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const bars = [ { k:'Mon',h:44 },{ k:'Tue',h:62 },{ k:'Wed',h:55 },{ k:'Thu',h:78 },{ k:'Fri',h:96 },{ k:'Sat',h:70 },{ k:'Sun',h:58 } ]

// Play the build (line draws, bars grow, KPIs count up) when the slide is viewed.
const root = ref<HTMLElement>()
const shown = ref(false)
let io: IntersectionObserver | null = null
onMounted(() => {
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) shown.value = true }),
    { threshold: 0.3 },
  )
  if (root.value) io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div ref="root" class="vframe" :class="{ shown }" style="width:470px">
    <div style="display:flex;align-items:center">
      <div class="vtitle" style="display:flex;gap:9px;align-items:center"><span class="ddot" />Overview <span class="vmeta">· Last 30 days</span></div>
      <div class="dlive"><span />Live</div>
    </div>
    <div class="dkpis">
      <div class="dkpi"><div class="dkpi-l">Revenue</div><div class="dkpi-v"><CountUp :to="1.24" :decimals="2" prefix="$" suffix="M" /></div><div class="dkpi-d">▲ 18.2%</div></div>
      <div class="dkpi"><div class="dkpi-l">Active users</div><div class="dkpi-v"><CountUp :to="48210" /></div><div class="dkpi-d">▲ 9.4%</div></div>
      <div class="dkpi"><div class="dkpi-l">Churn</div><div class="dkpi-v"><CountUp :to="1.9" :decimals="1" suffix="%" /></div><div class="dkpi-d">▼ 0.6%</div></div>
    </div>
    <svg viewBox="0 0 420 150" preserveAspectRatio="none" style="width:100%;height:112px;display:block">
      <defs>
        <linearGradient id="dfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--primary)" stop-opacity="0.40"/><stop offset="100%" stop-color="var(--primary)" stop-opacity="0"/></linearGradient>
      </defs>
      <path class="dfill-area" d="M0,118 L35,108 L70,114 L105,86 L140,94 L175,66 L210,74 L245,48 L280,56 L315,32 L350,40 L385,18 L420,24 L420,150 L0,150 Z" fill="url(#dfill)"/>
      <path class="dline" pathLength="1" d="M0,118 L35,108 L70,114 L105,86 L140,94 L175,66 L210,74 L245,48 L280,56 L315,32 L350,40 L385,18 L420,24" fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="dbars">
      <div v-for="(b, i) in bars" :key="b.k" class="dbar"><div class="dbar-track"><span :style="{ height: b.h + '%', animationDelay: (i * 0.06) + 's' }" /></div><div class="dbar-k">{{ b.k }}</div></div>
    </div>
  </div>
</template>

<style scoped>
.ddot { width: 9px; height: 9px; border-radius: 3px; background: var(--accent); }
.dlive { margin-left: auto; display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--primary); padding: 5px 11px; border-radius: 999px; background: color-mix(in srgb, var(--primary) 10%, transparent); border: 1px solid color-mix(in srgb, var(--primary) 28%, transparent); }
.dlive span { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); animation: pulse 1.6s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
.dkpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.dkpi { background: var(--surface); border: 1px solid var(--hair-2); border-radius: var(--radius-sm); padding: 14px 15px; }
.dkpi-l { font-size: 12.5px; color: var(--fg-faint); }
.dkpi-v { font-size: 25px; font-weight: 600; letter-spacing: -0.03em; color: var(--fg); margin: 4px 0 5px; font-feature-settings: "tnum" 1; }
.dkpi-d { font-size: 12px; font-weight: 600; color: var(--primary); }
.dbars { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; align-items: end; }
.dbar { display: flex; flex-direction: column; align-items: center; gap: 7px; }
.dbar-track { width: 100%; height: 44px; border-radius: 7px; background: var(--hair-2); display: flex; align-items: flex-end; overflow: hidden; }
.dbar-track span { width: 100%; border-radius: 7px; background: var(--accent); display: block; transform: scaleY(0); transform-origin: bottom; }

/* Build: line draws itself, bars grow, fill fades in — once the slide is in view */
.dline { stroke-dasharray: 1; stroke-dashoffset: 1; }
.dfill-area { opacity: 0; transition: opacity 0.8s var(--ease) 0.5s; }
.shown .dline { animation: dash 1.5s var(--ease) 0.15s forwards; }
.shown .dfill-area { opacity: 1; }
.shown .dbar-track span { animation: bargrow 0.8s var(--ease-spring) both; }
@keyframes dash { to { stroke-dashoffset: 0; } }
@keyframes bargrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }

@media (prefers-reduced-motion: reduce) {
  .dline { stroke-dashoffset: 0; }
  .dfill-area { opacity: 1; }
  .dbar-track span { transform: scaleY(1); }
}
</style>
