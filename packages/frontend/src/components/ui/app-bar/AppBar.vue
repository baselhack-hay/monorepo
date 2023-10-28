<script setup lang="ts">
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'
import router from '@/router'
</script>

<template>
  <div
    class="shadow-top fixed bottom-0 z-50 flex w-full justify-between rounded-t-2xl border-2 border-white bg-white bg-opacity-70 backdrop-blur-md"
  >
    <div class="flex w-2/5 justify-center py-4" @click="router.push('/')">
      <user-group-icon class="w-6"></user-group-icon>
    </div>
    <div class="my-2 flex w-1/5 justify-center rounded-xl bg-black py-2">
      <plus-icon class="w-10 text-white"></plus-icon>
    </div>
    <div
      class="flex w-2/5 justify-center py-4"
      @click="router.push('/innercircles')"
    >
      <chat-bubble-left-right-icon class="w-6"></chat-bubble-left-right-icon>
    </div>
  </div>
</template>
