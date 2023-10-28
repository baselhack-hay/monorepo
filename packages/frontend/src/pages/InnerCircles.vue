<script setup lang="ts">
import CircleCard from '@/components/ui/circle-card/CircleCard.vue'
</script>

<template>
  <main class="bg-scared-light pt-[102px]">
    <div class="inlay flex flex-col gap-8 bg-scared-light">
      <CircleCard v-for="_n in 10"></CircleCard>
    </div>
  </main>
</template>
