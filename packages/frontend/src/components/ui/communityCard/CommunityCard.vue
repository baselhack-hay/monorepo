<script setup lang="ts">

  interface Props {
    title: string;
    content: string;
    variant: 'surprised'|'happy'|'scared'|'sad'|'angry'|'rejecting';
    numberOfComment?: number;
  }

  const props = defineProps<Props>()
  const className = `bg-${props.variant}-light`;

</script>
<template>
  <div :class="className">
    <h2>{{props.title}}</h2>
    <p>{{props.content}}</p>
    <p v-if="props.numberOfComment!!">Number of Commits: {{props.numberOfComment}}</p>
  </div>
</template>