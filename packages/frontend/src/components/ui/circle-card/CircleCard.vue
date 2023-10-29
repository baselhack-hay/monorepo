<script setup lang="ts">
import { Cog6ToothIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

interface Props {
  groupName: string
  id: number
}

defineProps<Props>()
</script>

<template>
  <div
    class="font-yeseva text-6 flex justify-between rounded-2xl bg-white p-6 drop-shadow-lg"
  >
    <span class="flex gap-x-4">
      {{ $props.groupName }}
      <cog-6-tooth-icon class="w-6"></cog-6-tooth-icon>
    </span>
    <router-link class="inline-block" :to="`/circle/${id}`">
      <arrow-right-icon class="w-6"></arrow-right-icon>
    </router-link>
  </div>
</template>
