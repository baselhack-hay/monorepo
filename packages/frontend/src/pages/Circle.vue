<script setup lang="ts">
import CommunityCard from '@/components/ui/communityCard/CommunityCard.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main>
    <div class="inlay flex flex-col gap-y-6">
      <CommunityCard
        :id="1"
        title="Samuel's Answer"
        content="Jungstrasse 20"
        variant="happy"
      ></CommunityCard>
    </div>
  </main>
</template>
