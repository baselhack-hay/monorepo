<script setup lang="ts">
import Container from './components/Container.vue'
</script>

<template>
  <Container>
    <router-view></router-view>
  </Container>
  <nav class="p-4">
    <router-link class="bg-primary-community mr-2 p-4" to="/"
      >Go to Community</router-link
    >
    <router-link class="bg-primary-circles p-4" to="/innercircle"
      >Go to Inner Circle</router-link
    >
  </nav>
</template>
