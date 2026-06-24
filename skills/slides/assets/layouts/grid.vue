<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="slidev-layout stage grid">
    <h2 v-if="$frontmatter.title" class="grid-title">{{ $frontmatter.title }}</h2>
    <slot />
  </div>
</template>
