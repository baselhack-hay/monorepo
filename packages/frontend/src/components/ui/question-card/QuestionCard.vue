<template>
  <div class="font-yeseva rounded-2xl bg-white p-6 drop-shadow-md">
    <p class="text-6 mb-1">{{ $props.title }}</p>
    <p class="font-poppins text-4">
      {{ $props.description }}
    </p>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>
