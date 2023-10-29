<script setup lang="ts">
import CommunityCard from '@/components/ui/communityCard/CommunityCard.vue'
import {
  PlusIcon,
  XMarkIcon,
  PaperAirplaneIcon
} from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import EmotionSelector from '@/components/ui/emotion-selector/EmotionSelector.vue'

type Post = {
  postId: number
  title: string
  description: string
  emotion: 'surprised' | 'happy' | 'scared' | 'sad' | 'angry' | 'rejecting'
}

const dialog = ref(false)
const textareaValue = ref('')
const titleValue = ref('')
const posts = ref<Post[]>([])
const pageIndex = ref(1)
const timestamp = ref('')
const end = ref(false)
const loading = ref(false)

const generateTimestamp = () => {
  const currentDate = new Date()
  currentDate.setHours(currentDate.getHours() - 1)
  timestamp.value = currentDate.toISOString()
}

const emotion = ref<string>('')
const error = ref<string>('')

onMounted(async () => {
  generateTimestamp()
  await getPosts()
})

const createPost = async () => {
  if (emotion.value == '') {
    error.value = 'Please choose an emotion'
    return
  }
  if (titleValue.value.length > 0 && textareaValue.value.length > 0) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}/community/post`,
        {
          title: titleValue.value,
          description: textareaValue.value,
          emotion: emotion.value.toLowerCase()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      posts.value = []
      end.value = false
      titleValue.value = ''
      textareaValue.value = ''
      pageIndex.value = 1
      error.value = ''
      generateTimestamp()
      await getPosts()
      dialog.value = false
    } catch (error) {
      console.log(error)
    }
  }
}

const getPosts = async () => {
  if (!end.value) {
    try {
      loading.value = true
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_HOST}/community/post/paginate?page=${
          pageIndex.value
        }&timestamp=${timestamp.value}&pageSize=10`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      loading.value = false
      posts.value = [...posts.value, ...result.data.posts]
      if (result.data.posts.length === 0) {
        end.value = true
      }
    } catch (error) {}
  }
}

window.onscroll = () => {
  let bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight

  console.log(bottomOfWindow, loading.value)
  if (bottomOfWindow && !loading.value) {
    pageIndex.value++
    getPosts()
  }
}
</script>

<template>
  <main>
    <div class="inlay flex flex-col gap-y-6" id="scrollwindow">
      <router-link
        v-for="post in posts"
        :to="`/posts/${post.postId}`"
        class="inline-block"
      >
        <CommunityCard
          :id="post.postId"
          :title="post.title"
          :content="post.description"
          :variant="post.emotion"
        ></CommunityCard>
      </router-link>
      <span v-if="loading">Loading...</span>
    </div>
    <div class="fixed bottom-20 flex w-full flex-row-reverse px-6">
      <div class="rounded-xl bg-black p-3 text-center" v-if="!dialog">
        <plus-icon @click="dialog = true" class="w-8 text-white"></plus-icon>
      </div>
    </div>
    <v-dialog v-model="dialog">
      <div class="flex-column flex gap-y-4 rounded-lg bg-white p-4">
        <div class="flex w-full justify-between">
          <x-mark-icon class="w-6" @click="dialog = false" />
        </div>
        <div class="flex">
          <v-text-field v-model="titleValue" label="Title" class="font-poppins">
            <template v-slot:append-inner>
              <EmotionSelector
                @select-emotion="(e: any) => (emotion = e.title)"
              ></EmotionSelector>
            </template>
          </v-text-field>
        </div>
        <div>
          <v-textarea v-model="textareaValue" label="Content" />
          <div class="flex w-full flex-row-reverse justify-between">
            <paper-airplane-icon class="w-6" @click="createPost" />
          </div>
        </div>
        <div v-if="error" class="bg-sad-light font-poppins w-fit rounded p-2">
          {{ error }}
        </div>
      </div>
    </v-dialog>
  </main>
</template>
