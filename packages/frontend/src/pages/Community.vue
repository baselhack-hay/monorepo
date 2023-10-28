<script setup lang="ts">
import CommunityCard from '@/components/ui/communityCard/CommunityCard.vue'
import router from '@/router'
</script>

<template>
  <main>
    <div class="inlay flex flex-col gap-y-6">
      <CommunityCard
        @click="router.push('/posts/1')"
        :number-of-comment="20"
        title="Title"
        variant="surprised"
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."
      />
      <CommunityCard
        @click="router.push('/posts/2')"
        title="Title"
        variant="sad"
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."
      />
      <CommunityCard
        @click="router.push('/posts/3')"
        :number-of-comment="25"
        title="Title"
        variant="surprised"
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."
      />
    </div>
  </main>
</template>
