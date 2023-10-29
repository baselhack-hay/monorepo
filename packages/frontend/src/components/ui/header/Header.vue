<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import {
  ArrowSmallLeftIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline'
import axios from 'axios'

const router = useRouter()

const pageName = ref()

watch(router.currentRoute, async () => {
  pageName.value = /^\/circle/.test(router.currentRoute.value.path)
    ? (await getCircle()).name
    : [
        router.currentRoute.value.name,
        router.currentRoute.value.params.id ?? ''
      ].join(' ')
})

const getCircle = async () => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/circle/group/${
        router.currentRoute.value.params.id
      }`,
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

const back = () => router.back()
const logout = () => {
  axios
    .get(import.meta.env.VITE_BACKEND_HOST + '/user/logout')
    .then(() => router.push('/login'))
}
</script>

<template>
  <header
    class="shadow-top fixed z-50 flex w-full rounded-b-2xl border-2 border-white bg-white bg-opacity-70 p-4 text-center backdrop-blur-md"
  >
    <div class="align-center flex w-1/5 justify-center" @click="back">
      <arrow-small-left-icon class="w-6"></arrow-small-left-icon>
    </div>
    <div class="w-3/5">
      <h1 class="text-6 font-mentra">HAY</h1>
      <h2 class="font-yeseva text-5">{{ router.currentRoute.value.fullPath.startsWith('/group')  ? 'Group' : pageName }}</h2>
    </div>
    <div class="align-center flex w-1/5 justify-center" @click="logout">
      <arrow-left-on-rectangle-icon class="w-6"></arrow-left-on-rectangle-icon>
    </div>
  </header>
</template>
