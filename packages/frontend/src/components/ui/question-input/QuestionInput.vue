<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import axios from 'axios'

const mood = ref<{ title: string; color: string; value: string }>({
  title: '',
  value: '',
  color: ''
})
const textareaValue = ref('')

const items: { title: string; color: string; value: string }[] = [
  {
    title: 'Happy',
    color: 'bg-happy',
    value: 'happy'
  },
  {
    title: 'Surprised',
    color: 'bg-surprised',
    value: 'surprised'
  },
  {
    title: 'Angry',
    color: 'bg-angry',
    value: 'angry'
  },
  {
    title: 'Sad',
    color: 'bg-sad',
    value: 'sad'
  },
  {
    title: 'Rejecting',
    color: 'bg-rejecting',
    value: 'rejecting'
  },
  {
    title: 'Scared',
    color: 'bg-scared',
    value: 'scared'
  }
]

function setMood(selectedMood: {
  title: string
  color: string
  value: string
}) {
  mood.value = selectedMood
}

const postAnswer = async () => {
  if (textareaValue.value.length > 0) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}/circle/answer`,
        {
          answer: textareaValue.value,
          userId: await getCurrentUserId(),
          emotion: mood.value.value
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      await router.push('innercircles')
    } catch (error) {
      console.log(error)
    }
  }
}

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
</script>

<template>
  <div class="flex h-fit w-full justify-center">
    <div
      class="font-poppins fixed bottom-0 mx-auto mb-[100px] flex h-fit w-11/12 items-center justify-between gap-x-4 rounded-full bg-white px-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <v-menu open-on-click location="top" class="h-fit w-fit">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            style="box-shadow: none"
            density="compact"
            icon=""
          >
            <template v-slot:default>
              <svg
                v-if="mood.value === ''"
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
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
              <div v-else :class="mood.color + ' h-6 w-6 rounded-full'"></div>
            </template>
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="p-0" v-for="(item, i) in items" :key="i">
            <div
              class="flex min-w-[100px] items-center justify-between p-0"
              @click="setMood(item)"
            >
              <p>{{ item.title }}</p>
              <div
                :class="item.color + ' ml-[30px] h-4 w-4 rounded-full'"
              ></div>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-text-field
        variant="underlined"
        v-model="textareaValue"
        label="Answer"
        class="w-4/5"
      />
      <button @click="postAnswer">
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
</template>
