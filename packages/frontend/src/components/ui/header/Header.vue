<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import {
  ArrowSmallLeftIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/vue/24/outline'
import axios from "axios";

const router = useRouter()

const pageName = ref()

watch(router.currentRoute, () => {
  pageName.value = [
    router.currentRoute.value.name,
    router.currentRoute.value.params.id ?? ''
  ].join(' ')
})

const back = () => router.back();
const logout = () => {
  axios.get(import.meta.env.VITE_BACKEND_HOST + '/user/logout').then(() => router.push('/login'));
}

</script>

<template>
  <header
    class="shadow-top fixed flex z-50 w-full rounded-b-2xl border-2 border-white bg-white bg-opacity-70 p-4 text-center backdrop-blur-md"
  >
    <div class="w-1/5 flex align-center justify-center" @click="back">
      <arrow-small-left-icon class="w-6"></arrow-small-left-icon>
    </div>
    <div class="w-3/5">
      <h1 class="text-6 font-mentra">HAY</h1>
      <h2 class="font-yeseva text-5">{{ pageName }}</h2>
    </div>
    <div class="w-1/5  flex align-center justify-center" @click="logout">
      <arrow-left-on-rectangle-icon class="w-6"></arrow-left-on-rectangle-icon>
    </div>
  </header>
</template>
