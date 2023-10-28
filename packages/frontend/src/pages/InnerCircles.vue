<script setup lang="ts">
import CircleCard from '@/components/ui/circle-card/CircleCard.vue'
</script>

<template>
  <main class="bg-scared-light pt-[102px]">
    <div class="inlay bg-scared-light flex flex-col gap-8">
      <CircleCard v-for="n in 10"></CircleCard>
    </div>
  </main>
</template>
