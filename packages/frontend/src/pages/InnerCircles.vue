<script setup lang="ts">
import CircleCard from '@/components/ui/circle-card/CircleCard.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { PlusIcon, XMarkIcon } from '@heroicons/vue/24/outline'

onMounted(async () => {
  await getAllCirclesOfUsers()
})

type Circle = {
  groupId: number
  name: string
}

const dialog = ref(false)
const nameValue = ref('')
const circles = ref<Circle[]>([])

const getAllCirclesOfUsers = async () => {
  try {
    const userId = await getCurrentUserId()
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

const createCircle = async () => {
  if (nameValue.value.length > 0) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}/circle/group`,
        {
          name: nameValue.value,
          description: '',
          userIds: [await getCurrentUserId()]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      await getAllCirclesOfUsers()
      nameValue.value = ''
      dialog.value = false
    } catch (error) {
      console.log(error)
    }
  }
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
        class="font-yeseva text-5 rounded-2xl bg-white p-4 drop-shadow-lg"
      >
        Join a Circle or create a new one.
      </div>
      <div class="fixed bottom-20 right-6 flex flex-row-reverse">
        <div class="rounded-xl bg-black p-3 text-center" v-if="!dialog">
          <plus-icon @click="dialog = true" class="w-8 text-white"></plus-icon>
        </div>
      </div>
      <v-dialog v-model="dialog">
        <div class="flex-column flex gap-y-4 rounded-lg bg-white p-4">
          <div class="flex w-full justify-between">
            <x-mark-icon class="w-6" @click="dialog = false" />
          </div>
          <v-text-field v-model="nameValue" label="Name" class="font-poppins" />
          <div class="font-poppins flex gap-x-4" @click="createCircle">
            <plus-icon class="w-6" />
            create Circle
          </div>
        </div>
      </v-dialog>
    </div>
  </main>
</template>
