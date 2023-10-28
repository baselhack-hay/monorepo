<script setup lang="ts">
import Container from './components/Container.vue'
import Header from './components/ui/header/Header.vue'
</script>

<template>
  <Header></Header>
  <Container>
    <router-view></router-view>
  </Container>
  <nav class="p-4">
    <router-link class="mr-2 bg-blue-300 p-4" to="/"
      >Go to Community</router-link
    >
    <router-link class="bg-blue-300 p-4" to="/innercircle"
      >Go to Inner Circle</router-link
    >
  </nav>
</template>
