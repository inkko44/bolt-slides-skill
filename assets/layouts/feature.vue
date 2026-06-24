<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="slidev-layout stage feature">
    <div class="feature-text">
      <div v-if="$frontmatter.kicker" class="kicker">{{ $frontmatter.kicker }}</div>
      <slot />
    </div>
    <div class="feature-visual">
      <slot name="visual" />
    </div>
  </div>
</template>
