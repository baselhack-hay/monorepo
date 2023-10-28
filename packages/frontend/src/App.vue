<script setup lang="ts">
import Container from './components/Container.vue'
import Header from './components/ui/header/Header.vue'
import AppBar from "@/components/ui/app-bar/AppBar.vue";
</script>

<template>
  <Header></Header>
  <Container>
    <router-view></router-view>
  </Container>
  <AppBar></AppBar>
</template>
