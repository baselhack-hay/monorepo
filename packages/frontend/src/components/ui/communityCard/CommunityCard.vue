<script setup lang="ts">
  defineProps({
    title: { type: String, required: true},
    content: { type: String, required: true},
    variant: String,
    numberOfComment: { type: Number }
  });
</script>
<template>
  <div class="drop-shadow">
    <h2>{{title}}</h2>
    <p>{{content}}</p>
    <p>Number of Commits: {{numberOfComment}}</p>
  </div>
</template>