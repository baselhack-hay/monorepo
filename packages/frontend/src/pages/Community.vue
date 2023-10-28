<script setup lang="ts">
import CommunityCard from "@/components/ui/communityCard/CommunityCard.vue";
</script>

<template>
  <main>
    <h1>Community View</h1>
    <div class="flex flex-col gap-y-4">
      <CommunityCard :number-of-comment="20" title="Title" variant="surprised" content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."/>
      <CommunityCard title="Title" variant="sad" content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."/>
      <CommunityCard :number-of-comment="25" title="Title" variant="surprised" content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."/>
    </div>
  </main>
</template>
