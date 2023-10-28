<script setup lang="ts">
import CircleCard from '@/components/ui/circle-card/CircleCard.vue'
</script>

<template>
  <main class="inlay bg-scared-light flex flex-col gap-8">
    <CircleCard v-for="n in 3"></CircleCard>
  </main>
</template>
