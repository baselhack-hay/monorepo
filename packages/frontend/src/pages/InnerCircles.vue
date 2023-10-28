<script setup lang="ts">
import CircleCard from '@/components/ui/circle-card/CircleCard.vue'
import QuestionCard from '@/components/ui/question-card/QuestionCard.vue'
</script>

<template>
  <main>
    <div class="inlay flex flex-col gap-y-6">
      <CircleCard></CircleCard>
      <CircleCard></CircleCard>
      <CircleCard></CircleCard>
      <QuestionCard></QuestionCard>
    </div>
  </main>
</template>
