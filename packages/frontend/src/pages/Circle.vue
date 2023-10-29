<script setup lang="ts">
import CommunityCard from '@/components/ui/communityCard/CommunityCard.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const groupId = router.currentRoute.value.params.id

type Answer = {
  userId: number
  username: string
  answerId: number
  answer: string
  emotion: string
}

const answers = ref<Answer[]>([])

onMounted(async () => {
  await getAnswers()
})

const getAnswers = async () => {
  try {
    const circle = await getCircle()

    for (let i = 0; i < circle.users.length; i++) {
      const user = circle.users[i]
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_HOST}/circle/answer/user/${
          user.userId
        }/daily`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      answers.value.push({
        userId: result.data.userId,
        username: result.data.user.username,
        answer: result.data.answer,
        answerId: result.data.answerId,
        emotion: 'angry'
      })
    }
  } catch (error) {}
}

const getCircle = async () => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/circle/group/${groupId}`,
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
</script>

<template>
  <main>
    <div class="inlay flex flex-col gap-y-6">
      <CommunityCard
        v-for="answer in answers"
        :id="answer.answerId"
        :title="answer.username + 's Answer'"
        :content="answer.answer"
        :variant="answer.emotion"
      ></CommunityCard>
    </div>
  </main>
</template>
