<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
const router = useRouter()

const pageName = ref()

watch(router.currentRoute, () => {
  pageName.value = [
    router.currentRoute.value.name,
    router.currentRoute.value.params.id ?? ''
  ].join(' ')
})
</script>

<template>
  <header
    class="font-yeseva shadow-top fixed z-50 w-full rounded-b-2xl border-2 border-white bg-white bg-opacity-70 p-4 text-center backdrop-blur-md"
  >
    <h1 class="text-6">HAY</h1>
    <h2 class="text-5">{{ pageName }}</h2>
  </header>
</template>
