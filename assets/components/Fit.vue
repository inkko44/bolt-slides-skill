<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

/* Safety net against overflow: scales its content DOWN to fit the slide's safe
   area when it would otherwise spill out of the fixed 1080×607 frame. Never
   scales up past 1. Design content to the frame first (see SKILL); use <Fit>
   for dense or hand-composed slides so nothing ever falls out of view.
     <Fit><div class="metrics">…lots of cards…</div></Fit>
     <Fit align="top">…tall text block…</Fit>  */
const props = withDefaults(defineProps<{ align?: 'center' | 'top'; max?: number }>(), { align: 'center', max: 1 })
const outer = ref<HTMLElement>()
const inner = ref<HTMLElement>()
const scale = ref(1)
let ro: ResizeObserver | null = null
let raf = 0

function measure() {
  const o = outer.value, i = inner.value
  if (!o || !i) return
  const cs = getComputedStyle(o)
  const availW = o.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
  const availH = o.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
  const iw = i.offsetWidth, ih = i.offsetHeight   // natural size; CSS transform doesn't affect it
  if (!iw || !ih || availW <= 0 || availH <= 0) return
  scale.value = Math.min(props.max, availW / iw, availH / ih)
}
function schedule() { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure) }

onMounted(async () => {
  await nextTick()
  measure()
  ro = new ResizeObserver(schedule)
  if (outer.value) ro.observe(outer.value)
  if (inner.value) ro.observe(inner.value)
  ;(document as any).fonts?.ready?.then(schedule)
  setTimeout(schedule, 200)
})
onBeforeUnmount(() => { ro?.disconnect(); cancelAnimationFrame(raf) })
</script>

<template>
  <div ref="outer" class="fit" :class="align">
    <div ref="inner" class="fit-inner" :style="{ transform: `scale(${scale})` }"><slot /></div>
  </div>
</template>
