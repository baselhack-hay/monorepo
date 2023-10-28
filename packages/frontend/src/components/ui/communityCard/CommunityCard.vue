<script setup lang="ts">

  import {computed} from "vue";

  interface Props {
    title: string;
    content: string;
    variant: 'surprised'|'happy'|'scared'|'sad'|'angry'|'rejecting';
    numberOfComment?: number;
  }

  const props = defineProps<Props>()
  const className = computed(() => (`bg-${props.variant}-light`));

</script>
<template>
  <div :class="className" class="rounded-lg p-4">
    <h2 class="text-6">{{props.title}}</h2>
    <p>{{props.content}}</p>
    <p v-if="props.numberOfComment!!">Number of Commits: {{props.numberOfComment}}</p>
  </div>
</template>