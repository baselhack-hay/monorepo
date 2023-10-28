<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()

const bgColor = ref()

watch(router.currentRoute, () => {
  bgColor.value =
    router.currentRoute.value.path == '/' ? 'white' : 'scared-light'
})
</script>

<template>
  <div :class="`bg-${bgColor} h-full pb-[72px] pt-[102px]`">
    <slot />
  </div>
</template>
