<script setup lang="ts">
import CommunityCard from '@/components/ui/communityCard/CommunityCard.vue'
import router from '@/router'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const postId = router.currentRoute.value.params.id

const options = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

let content = ref<string>('')

let response = ref<{
  postId: number
  title: string
  description: string
  emotion:
    | 'surprised'
    | 'happy'
    | 'scared'
    | 'sad'
    | 'angry'
    | 'rejecting'
    | undefined
  createdAt: string
  updatedAt: string
  user: string
  comments: any[]
}>()

const getPost = async () => {
  axios
    .get(
      `${import.meta.env.VITE_BACKEND_HOST}/community/post/${postId}`,
      options
    )
    .then((res) => (response.value = res.data))
}

const postComment = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_HOST}/community/comment/${postId}`,
    { content: content.value },
    options
  )
  const input = document.querySelector('#comment') as HTMLInputElement
  input.value = ''
  input.innerHTML = ''
  await getPost()

  window.scrollTo(0, document.body.scrollHeight)
}

onMounted(async () => {
  await getPost()
})
</script>

<template>
  <main class="mb-[80px]">
    <div class="inlay flex flex-col gap-y-4">
      <CommunityCard
        v-if="response"
        :title="response.title"
        :variant="response.emotion"
        :content="response.description"
      />
      <div
        class="w-full rounded-lg py-2 pl-4 shadow-md"
        v-if="response"
        v-for="comment in response.comments"
      >
        <h4 style="font-size: 10px">Anonymous:</h4>
        <p>
          {{ comment.content }}
        </p>
      </div>
    </div>
    <div class="flex h-fit w-full justify-center">
      <div
        class="fixed bottom-0 mx-auto mb-[100px] flex h-fit w-11/12 justify-between rounded-full bg-white p-4 font-poppins shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      >
        <input
          id="comment"
          type="text"
          v-model="content"
          class="sm:text-sm w-4/5 appearance-none leading-5 focus:z-10 focus:outline-none sm:leading-5"
        />
        <button @click="postComment()">
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
  </main>
</template>
