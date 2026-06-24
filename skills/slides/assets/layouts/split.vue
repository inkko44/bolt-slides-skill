<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="slidev-layout stage split" :class="{ flip: $frontmatter.flip }">
    <div class="split-body">
      <div v-if="$frontmatter.kicker" class="kicker">{{ $frontmatter.kicker }}</div>
      <slot />
    </div>
    <div class="split-media"><slot name="media" /></div>
  </div>
</template>
