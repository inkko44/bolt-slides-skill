<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

/* Animated number — counts from `from` to `to` when it scrolls into view.
   Drop it anywhere a figure goes, e.g. inside the .figure treatment or a
   StatCard slot:  <span class="figure"><CountUp :to="230" suffix="%" /></span>
   Inherits color, so it picks up the accent gradient from a .figure parent. */
const props = withDefaults(defineProps<{
  to: number
  from?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}>(), { from: 0, duration: 1500, decimals: 0, prefix: '', suffix: '' })

const el = ref<HTMLElement>()
function fmt(n: number) {
  return props.prefix +
    n.toLocaleString('en-US', { minimumFractionDigits: props.decimals, maximumFractionDigits: props.decimals }) +
    props.suffix
}
const display = ref(fmt(props.from))

let raf = 0
let io: IntersectionObserver | null = null
let started = false

function run() {
  if (started) return
  started = true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    display.value = fmt(props.to)
    return
  }
  const t0 = performance.now()
  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / props.duration)
    const eased = 1 - Math.pow(1 - p, 3)
    display.value = fmt(props.from + (props.to - props.from) * eased)
    if (p < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) run() }),
    { threshold: 0.35 },
  )
  if (el.value) io.observe(el.value)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); io?.disconnect() })
</script>

<template>
  <span ref="el" class="countup">{{ display }}</span>
</template>

<style scoped>
.countup { font-feature-settings: "tnum" 1; font-variant-numeric: tabular-nums; }
</style>
