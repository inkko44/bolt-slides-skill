<script setup lang="ts">
import { ref } from 'vue'

/* Wrap any visual to give it a subtle, mouse-tracked 3D tilt + glare.
   The signature "this deck is alive" micro-interaction. Use it on a hero
   visual (a .vframe mock, an image card), not on everything.
       <TiltCard><VisualDashboard /></TiltCard>
   Falls flat (no tilt) on touch devices and under reduced-motion. */
const el = ref<HTMLElement>()
const style = ref<Record<string, string>>({})

function move(e: MouseEvent) {
  const r = el.value!.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  style.value = {
    transform: `perspective(1200px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg)`,
    '--gx': `${((px + 0.5) * 100).toFixed(1)}%`,
    '--gy': `${((py + 0.5) * 100).toFixed(1)}%`,
  }
}
function leave() { style.value = {} }
</script>

<template>
  <div ref="el" class="tilt" :style="style" @mousemove="move" @mouseleave="leave">
    <slot />
    <span class="tilt-glare" />
  </div>
</template>

<style scoped>
.tilt {
  position: relative; display: inline-block;
  transition: transform 0.5s var(--ease);
  transform-style: preserve-3d; will-change: transform;
}
.tilt-glare {
  position: absolute; inset: 0; pointer-events: none; border-radius: var(--radius-lg);
  background: radial-gradient(60% 60% at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.16), transparent 60%);
  opacity: 0; transition: opacity 0.4s var(--ease);
}
.tilt:hover .tilt-glare { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .tilt { transform: none !important; } }
</style>
