<script setup lang="ts">
import {
  ChatBubbleLeftRightIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'
import router from '@/router'
</script>

<template>
  <div
    class="shadow-top fixed bottom-0 z-50 flex w-full justify-evenly rounded-t-2xl border-2 border-white bg-white bg-opacity-70 backdrop-blur-md"
  >
    <router-link to="/" class="inline-block">
      <div class="flex justify-center py-2">
        <div
          class="flex h-12 w-12 items-center justify-center"
          :class="{
            'active-nav-community':
              $router.currentRoute.value.path === '/' ||
              /^\/posts/.test($router.currentRoute.value.path)
          }"
        >
          <user-group-icon class="w-6"></user-group-icon>
        </div>
      </div>
    </router-link>
    <router-link class="inline-block" to="/question">
      <div class="flex justify-center py-2">
        <div
          class="flex h-12 w-12 items-center justify-center"
          :class="{
            'active-nav-circles':
              $router.currentRoute.value.path === '/innercircles' ||
              $router.currentRoute.value.path === '/question' ||
              /^\/circle/.test(router.currentRoute.value.path)
          }"
        >
          <chat-bubble-left-right-icon
            class="w-6"
          ></chat-bubble-left-right-icon>
        </div>
      </div>
    </router-link>
  </div>
</template>
