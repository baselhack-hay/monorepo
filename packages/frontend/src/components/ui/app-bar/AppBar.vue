<script setup lang="ts">
import {ChatBubbleLeftRightIcon, UserGroupIcon, PlusIcon} from '@heroicons/vue/24/outline'
import router from '@/router';


</script>

<template>
  <div class="fixed bottom-0 flex justify-between w-full rounded-t-2xl shadow-top">
    <div class="py-4 w-2/5 flex justify-center" @click="router.push('/')">
      <user-group-icon class="w-6"></user-group-icon>
    </div>
    <div class="py-2 w-1/5 flex justify-center bg-black rounded-xl my-2">
      <plus-icon class="w-10 text-white"></plus-icon>
    </div>
    <div class="py-4 w-2/5 flex justify-center" @click="router.push('/innercircle')">
      <chat-bubble-left-right-icon class="w-6"></chat-bubble-left-right-icon>
    </div>
  </div>
</template>
