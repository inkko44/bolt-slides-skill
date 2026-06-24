<script setup lang="ts">
/* A continuously-scrolling strip — logo wall, value props, tech stack, etc.
   A distinctly "web" element. <Marquee :items="['Acme','Globex','Initech']" />
   Pass plain strings, or use it as a kinetic accent row on a section. */
withDefaults(defineProps<{ items: string[]; duration?: number }>(), { duration: 26 })
</script>

<template>
  <div class="marquee">
    <div class="marquee-track" :style="{ animationDuration: duration + 's' }">
      <span v-for="(it, i) in [...items, ...items]" :key="i" class="marquee-item">{{ it }}</span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  width: 100%; overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.marquee-track { display: flex; gap: 56px; width: max-content; animation: marquee linear infinite; }
.marquee-item {
  font-size: 26px; font-weight: 600; letter-spacing: -0.02em; white-space: nowrap;
  color: var(--fg-muted); opacity: 0.78;
}
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }
</style>
