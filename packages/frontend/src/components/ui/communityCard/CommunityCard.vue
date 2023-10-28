<script setup lang="ts">
import { computed } from 'vue'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline'

interface Props {
  title: string
  content: string
  variant: 'surprised' | 'happy' | 'scared' | 'sad' | 'angry' | 'rejecting'
  numberOfComment?: number
}

const props = defineProps<Props>()
const className = computed(() => `bg-${props.variant}-light`)
</script>
<template>
  <div :class="className" class="rounded-lg p-4 drop-shadow">
    <h2 class="text-6 font-yeseva">{{ props.title }}</h2>
    <p class="font-poppins">{{ props.content }}</p>
    <div class="mt-2" v-if="props.numberOfComment!!">
      <chat-bubble-bottom-center-text-icon class="mr-2 inline w-6" />
      <p class="font-poppins inline">{{ props.numberOfComment }}</p>
    </div>
  </div>
</template>
