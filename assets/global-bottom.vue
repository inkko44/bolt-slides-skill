<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useNav, useDrawings } from '@slidev/client'
import { createFixedClicks } from '@slidev/client/composables/useClicks.ts'
import { CLICKS_MAX } from '@slidev/client/constants.ts'
import SlideContainer from '@slidev/client/internals/SlideContainer.vue'
import SlideWrapper from '@slidev/client/internals/SlideWrapper.vue'

const {
  slides,
  currentSlideNo,
  total,
  hasNext,
  hasPrev,
  next,
  prev,
  go,
  isPresenter,
  isPrintMode,
  isEmbedded,
  isPresenterAvailable,
  enterPresenter,
} = useNav()

const { drawingEnabled } = useDrawings()
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

// Only dress up the clean audience ("play") view. Presenter keeps its own UI.
const showChrome = computed(() =>
  !isPresenter.value && !isPrintMode.value && !isEmbedded.value)

const railOpen = ref(false)

function gotoSlide(no: number) {
  go(no)
}

// ── Presenter auto-open: entering presenter pops the audience window ──
let audienceWindow: Window | null = null
watch(isPresenter, (now, before) => {
  if (now && !before) {
    const audiencePath = location.pathname.replace(/\/presenter(?=\/|$)/, '') || '/'
    if (!audienceWindow || audienceWindow.closed)
      audienceWindow = window.open(audiencePath + location.search, 'noir-audience')
  }
}, { immediate: true })
</script>

<template>
  <Teleport to="body">
    <template v-if="showChrome">
      <!-- ── Left rail: slide overview ───────────────────────────── -->
      <Transition name="noir-rail">
        <aside v-if="railOpen" class="noir-rail noir-scroll" @click.self="railOpen = false">
          <div class="noir-rail-head">
            <span class="noir-rail-title">Slides</span>
            <button class="noir-icon-btn sm" title="Close" @click="railOpen = false">
              <div class="i-ph-x" />
            </button>
          </div>
          <div class="noir-rail-list">
            <button
              v-for="route in slides"
              :key="route.no"
              class="noir-thumb"
              :class="{ active: route.no === currentSlideNo }"
              @click="gotoSlide(route.no)"
            >
              <span class="noir-thumb-no">{{ route.no }}</span>
              <div class="noir-thumb-frame">
                <SlideContainer
                  :key="route.no"
                  :no="route.no"
                  :width="196"
                  class="pointer-events-none"
                >
                  <SlideWrapper
                    :clicks-context="createFixedClicks(route, CLICKS_MAX)"
                    :route="route"
                    render-context="overview"
                  />
                </SlideContainer>
              </div>
            </button>
          </div>
        </aside>
      </Transition>

      <!-- ── Bottom toolbar ──────────────────────────────────────── -->
      <div class="noir-dock">
        <div class="noir-bar">
          <button class="noir-icon-btn" :class="{ on: railOpen }" title="Overview" @click="railOpen = !railOpen">
            <div class="i-ph-squares-four" />
          </button>

          <span class="noir-sep" />

          <button class="noir-icon-btn" title="Previous" :disabled="!hasPrev" @click="prev">
            <div class="i-ph-caret-left" />
          </button>
          <div class="noir-counter">
            <span class="noir-counter-now">{{ currentSlideNo }}</span>
            <span class="noir-counter-tot">/ {{ total }}</span>
          </div>
          <button class="noir-icon-btn" title="Next" :disabled="!hasNext" @click="next">
            <div class="i-ph-caret-right" />
          </button>

          <span class="noir-sep" />

          <button class="noir-icon-btn" :class="{ on: drawingEnabled }" title="Draw" @click="drawingEnabled = !drawingEnabled">
            <div class="i-ph-pencil-simple" />
          </button>
          <button class="noir-icon-btn" title="Fullscreen" @click="toggleFullscreen">
            <div :class="isFullscreen ? 'i-ph-corners-in' : 'i-ph-corners-out'" />
          </button>
          <button
            v-if="isPresenterAvailable"
            class="noir-icon-btn"
            title="Presenter mode"
            @click="enterPresenter"
          >
            <div class="i-ph-presentation" />
          </button>
        </div>
      </div>
    </template>
  </Teleport>
</template>

<style>
/* ── Bottom dock ──────────────────────────────────────────────── */
.noir-dock {
  position: fixed;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
  opacity: 0.35;
  transition: opacity 0.35s ease;
  font-family: var(--font-body, -apple-system, BlinkMacSystemFont, sans-serif);
}
.noir-dock:hover { opacity: 1; }

.noir-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px 9px;
  border-radius: 999px;
  background: rgba(28, 28, 30, 0.66);
  border: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  box-shadow: 0 18px 50px -20px rgba(0, 0, 0, 0.8);
}

.noir-icon-btn {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #e8e8ea;
  font-size: 19px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}
.noir-icon-btn:hover { background: rgba(255, 255, 255, 0.12); }
.noir-icon-btn:disabled { opacity: 0.28; cursor: default; }
.noir-icon-btn:disabled:hover { background: transparent; }
/* Active state harmonizes with the deck's theme accent (set in styles/index.css) */
.noir-icon-btn.on { color: var(--accent-ink, #04140e); background: var(--accent, linear-gradient(115deg, #c8f56e, #34dcd8)); }
.noir-icon-btn.sm { width: 30px; height: 30px; font-size: 16px; }

.noir-sep { width: 1px; height: 22px; background: rgba(255, 255, 255, 0.12); margin: 0 4px; }

.noir-counter {
  display: flex;
  align-items: baseline;
  gap: 5px;
  padding: 0 12px;
  font-feature-settings: "tnum" 1;
  user-select: none;
}
.noir-counter-now { font-size: 16px; font-weight: 600; color: #f5f5f7; }
.noir-counter-tot { font-size: 13px; color: #8e8e93; }

/* ── Left rail ────────────────────────────────────────────────── */
.noir-rail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 248px;
  z-index: 95;
  padding: 18px 14px 26px;
  overflow-y: auto;
  background: rgba(18, 18, 20, 0.82);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(26px) saturate(180%);
  -webkit-backdrop-filter: blur(26px) saturate(180%);
  font-family: var(--font-body, -apple-system, BlinkMacSystemFont, sans-serif);
}
.noir-rail-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 6px 14px;
}
.noir-rail-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8e8e93;
}
.noir-rail-list { display: flex; flex-direction: column; gap: 12px; }

.noir-thumb {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}
.noir-thumb-no {
  width: 18px;
  font-size: 12px;
  font-feature-settings: "tnum" 1;
  color: #6e6e73;
  flex-shrink: 0;
}
.noir-thumb-frame {
  flex: 1;
  border-radius: 9px;
  overflow: hidden;
  border: 1.5px solid transparent;
  transition: border-color 0.25s ease, transform 0.25s ease;
  line-height: 0;
}
.noir-thumb:hover .noir-thumb-frame { border-color: rgba(255, 255, 255, 0.22); }
.noir-thumb.active .noir-thumb-no { color: var(--primary, #4fe5b0); }
.noir-thumb.active .noir-thumb-frame { border-color: var(--primary, #4fe5b0); }

.noir-rail-enter-active, .noir-rail-leave-active { transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.32s ease; }
.noir-rail-enter-from, .noir-rail-leave-to { transform: translateX(-100%); opacity: 0.4; }
</style>
