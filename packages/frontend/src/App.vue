<script setup lang="ts">
import { Button } from './components/ui/button'

const greet = () => {
  console.log('How are you?')
}
</script>

<template>
  <h1 class="text-4xl">Hay</h1>
  <Button @click="() => greet()">Hay</Button>
</template>

<style scoped></style>
