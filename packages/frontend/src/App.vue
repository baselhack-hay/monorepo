<script setup lang="ts">
import { Button } from './components/ui/button'
import Container from './components/Container.vue'

const greet = () => {
  console.log('How are you?')
}
</script>

<template>
  <Container>
    <h1 class="text-4xl">Hay</h1>
    <div class="flex items-center gap-2">
      <Button @click="() => greet()">Hay</Button>
      <Button variant="secondary" @click="() => greet()">Hay</Button>
    </div>
  </Container>
</template>

<style scoped></style>
