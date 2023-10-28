<script setup lang="ts">
import Container from './components/Container.vue'
import Header from './components/ui/header/Header.vue'
import AppBar from "@/components/ui/app-bar/AppBar.vue";
import router from "@/router";
</script>

<template>
  <Header v-if="router.currentRoute.value.fullPath !== '/login'"></Header>
  <Container>
    <router-view></router-view>
  </Container>
  <AppBar v-if="router.currentRoute.value.fullPath !== '/login'"></AppBar>
</template>