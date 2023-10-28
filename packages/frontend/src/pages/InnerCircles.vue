<script setup lang="ts">
import CircleCard from '@/components/ui/circle-card/CircleCard.vue'
import QuestionCard from '@/components/ui/question-card/QuestionCard.vue'
</script>

<template>
  <main>
    <div class="inlay flex flex-col gap-8">
      <CircleCard v-for="_n in 10"></CircleCard>
      <QuestionCard></QuestionCard>
    </div>
  </main>
</template>
