<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="slidev-layout stage lead">
    <div v-if="$frontmatter.kicker" class="kicker">{{ $frontmatter.kicker }}</div>
    <slot />
  </div>
</template>
