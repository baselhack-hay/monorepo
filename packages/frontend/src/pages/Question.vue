<script setup lang="ts">
import QuestionInput from '@/components/ui/question-input/QuestionInput.vue'
import QuestionCard from '@/components/ui/question-card/QuestionCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

type Question = {
  title: string
  description: string
  id: number
}

const question = ref<Question>({ title: '', description: '', id: -1 })

onMounted(async () => {
  await getQuestion()
})

const getQuestion = async () => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/circle/question/daily`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    question.value = result.data
  } catch (error) {}
}
</script>

<template>
  <div class="inlay">
    <QuestionCard
      :title="question.title"
      :description="question.description"
    ></QuestionCard>
    <QuestionInput :question-id="question.id"></QuestionInput>
  </div>
</template>
