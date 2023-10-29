<script setup lang="ts">
import QuestionInput from '@/components/ui/question-input/QuestionInput.vue'
import QuestionCard from '@/components/ui/question-card/QuestionCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import router from '@/router'

type Question = {
  title: string
  description: string
  id: number
}

const question = ref<Question>({ title: '', description: '', id: -1 })

onMounted(async () => {
  const userId = await getCurrentUserId()
  axios
    .get(
      `${import.meta.env.VITE_BACKEND_HOST}/circle/answer/user/${userId}/daily`
    )
    .then((response) => {
      if (response.data) {
        router.push('innercircles')
      }
    })
  await getQuestion()
})

const getCurrentUserId = async () => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/user/current`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    return result.data
  } catch (error) {}
}

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
  <div class="inlay bg-cover bg-no-repeat">
    <QuestionCard
      :title="question.title"
      :description="question.description"
    ></QuestionCard>
    <QuestionInput :question-id="question.id"></QuestionInput>
  </div>
</template>
