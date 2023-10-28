<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const bgColor = ref()

watch(router.currentRoute, () => {
  const isCommunity =
    router.currentRoute.value.path == '/' ||
    /^\/posts/.test(router.currentRoute.value.path)
  bgColor.value = isCommunity ? 'white' : 'scared-light'
})
</script>

<template>
  <div v-if="router.currentRoute.value.path !== '/login'" :class="`bg-${bgColor} h-full pb-[72px] pt-[102px]`">
    <slot />
  </div>
  <div v-else>
    <slot />
  </div>
</template>
