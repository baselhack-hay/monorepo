<script setup lang="ts">
import CircleCard from '@/components/ui/circle-card/CircleCard.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

onMounted(async () => {
  await getAllCirclesOfUsers()
})

type Circle = {
  groupId: number
  name: string
}

const circles = ref<Circle[]>([])

const getAllCirclesOfUsers = async () => {
  try {
    const userId = await getCurrentUserId()
    console.log(userId)
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/circle/group/user/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    circles.value = result.data.reverse()
  } catch (error) {}
}

const getCurrentUserId = async () => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/user/current`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    return result.data
  } catch (error) {}
}
</script>

<template>
  <main>
    <div class="inlay">
      <div v-if="circles.length > 0" class="flex flex-col gap-y-6">
        <CircleCard
          v-for="circle in circles"
          :id="circle.groupId"
          :group-name="circle.name"
        ></CircleCard>
      </div>
      <div
        v-else
        class="font-yeseva text-5 rounded-2xl bg-white p-4 drop-shadow"
      >
        Trete einem Circle bei oder erstelle einen neuen.
      </div>
    </div>
  </main>
</template>
