<script setup lang="ts">
import CommunityCard from '@/components/ui/communityCard/CommunityCard.vue'
import {onMounted, onUnmounted, ref} from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";

const router = useRouter()

const groupId = router.currentRoute.value.params.id

type Answer = {
  userId: number
  username: string
  answerId: number
  answer: string
  emotion:
    | 'surprised'
    | 'happy'
    | 'scared'
    | 'sad'
    | 'angry'
    | 'rejecting'
    | undefined
}

const answers = ref<Answer[]>([])
const messages = ref<{username: string, message: string, userId: number}[]>([]);
const currentInputValue = ref('')
const userId = ref<number>(0)
const interval = setInterval(() => {
  getChat()
}, 2000);

const sendMessage = async (message: string) => {
  if(message === '') return
  axios.post(`${import.meta.env.VITE_BACKEND_HOST}/circle/chat/${groupId}`,
      {
        message
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
  )
  currentInputValue.value = '';
}

const getCurrentUser = async () =>{
  const user = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/user/current`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
  )
  userId.value = user.data
}

const getChat = async () => {
  const chat = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/circle/chat/${groupId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
  )
  messages.value = chat.data.map(message => {
    return {
      username: message.user.username,
      message: message.message,
      userId: message.user.userId
    }
  })
}

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
        username: user.username,
        answer: result.data.answer,
        answerId: result.data.answerId,
        emotion: result.data.emotion
      })
    }
  } catch (error) {}
}

onMounted(async () => {
  await getCurrentUser();
})

onUnmounted(() => {
  clearInterval(interval)
})


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
        :title="answer.username + '\'s Answer'"
        :content="answer.answer"
        :variant="answer.emotion"
      ></CommunityCard>
      <div class="flex flex-col-reverse">
        <div v-for="message in messages" class="w-full">
          <div v-if="message.userId === userId" class="flex flex-row">
            <p>{{message.username}}: {{message.message}}</p>
          </div>
          <div v-if="message.userId !== userId" class="flex flex-row-reverse">
            <p>{{message.username}}: {{message.message}}</p>
          </div>
        </div>
      </div>
      <v-text-field v-model="currentInputValue"></v-text-field>
      <paper-airplane-icon @click="sendMessage(currentInputValue)" class="w-6"/>
    </div>
  </main>
</template>
