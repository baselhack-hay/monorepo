<script setup lang="ts">
import CommunityCard from '@/components/ui/communityCard/CommunityCard.vue'
import {onMounted, onUnmounted, ref} from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

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

type Message = {
  username: string;
  message: string;
  userId: number;
}

const answers = ref<Answer[]>([])
const messages = ref<Message[]>([]);
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
  const msgs = chat.data.map((m: { user: {username: string, userId: number}, message: string}) => {
    return {
      username: m.user.username,
      message: m.message,
      userId: m.user.userId
    }
  })
  messages.value = msgs.reverse();
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
  await getChat();
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
    <div class="inlay flex flex-col gap-y-6 mb-10">
      <CommunityCard
        v-for="answer in answers"
        :id="answer.answerId"
        :title="answer.username + '\'s Answer'"
        :content="answer.answer"
        :variant="answer.emotion"
      ></CommunityCard>
      <div>
        <div v-for="message in messages" class="flex flex-column-reverse">
          <div v-if="message.userId === userId">
            <div
                class="w-4/5 rounded-lg py-2 pl-4 font-poppins shadow-md"
            >
              <h4 style="font-size: 10px">{{message.username}}</h4>
              <p>
                {{ message.message }}
              </p>
            </div>
          </div>
          <div v-if="message.userId !== userId" class="flex flex-row">
            <div
                class="w-4/5 rounded-lg py-2 pl-4 font-poppins shadow-md"
            >
              <h4 style="font-size: 10px">{{message.username}}</h4>
              <p>
                {{ message.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex h-fit w-full justify-center">
        <div
            class="fixed bottom-0 mx-auto mb-[100px] flex h-fit w-11/12 justify-between rounded-full bg-white p-4 font-poppins shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        >
          <input
              id="comment"
              type="text"
              v-model="currentInputValue"
              class="sm:text-sm w-4/5 appearance-none leading-5 focus:z-10 focus:outline-none sm:leading-5"
          />
          <button @click="sendMessage(currentInputValue)">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
