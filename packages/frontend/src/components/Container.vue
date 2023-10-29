<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const bgColor = ref()

watch(router.currentRoute, () => {
  const isCircles =
    router.currentRoute.value.path == '/innercircles' ||
    router.currentRoute.value.path == '/question'
  bgColor.value = isCircles ? '' : 'white'
})
</script>

<template>
  <div
    v-if="router.currentRoute.value.path !== '/login'"
    :class="`bg-${bgColor} min-h-screen pb-[72px] pt-[102px]`"
  >
    <slot />
  </div>
  <div v-else>
    <slot />
  </div>
</template>
