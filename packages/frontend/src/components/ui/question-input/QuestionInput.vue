<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import axios from 'axios'
import EmotionSelector from '@/components/ui/emotion-selector/EmotionSelector.vue'

const textareaValue = ref('')
const emotion = ref<string>('')
const error = ref<string>('')

const postAnswer = async () => {
  if (emotion.value == '') {
    error.value = 'Please choose an emotion'
    return
  }
  if (textareaValue.value.length > 0) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}/circle/answer`,
        {
          answer: textareaValue.value,
          userId: await getCurrentUserId(),
          emotion: emotion.value.toLowerCase()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      await router.push('/innercircles')
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
      <EmotionSelector
        @select-emotion="(e: any) => (emotion = e.title)"
      ></EmotionSelector>

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
    <div
      v-if="error"
      class="font-poppins mt-20 w-fit rounded bg-scared p-2 drop-shadow"
    >
      {{ error }}
    </div>
  </div>
</template>
