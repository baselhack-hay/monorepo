<script setup lang="ts">
import Container from './components/Container.vue'

</script>

<template>
  <Container>
    <router-view></router-view>
  </Container>
  <nav class="p-4">
    <router-link class="p-4 bg-blue-300 mr-2" to="/">Go to Community</router-link>
    <router-link class="p-4 bg-blue-300" to="/innercircle">Go to Inner Circle</router-link>
  </nav>
</template>
