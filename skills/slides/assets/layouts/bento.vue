<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
</script>

<template>
  <div class="slidev-layout stage bento-stage">
    <div v-if="$frontmatter.kicker || $frontmatter.title" class="bento-head">
      <div v-if="$frontmatter.kicker" class="kicker">{{ $frontmatter.kicker }}</div>
      <h2 v-if="$frontmatter.title" class="bento-title">{{ $frontmatter.title }}</h2>
    </div>
    <div class="bento-body"><slot /></div>
  </div>
</template>
