<script setup lang="ts">
import axios from 'axios'
import { UserPlusIcon } from '@heroicons/vue/24/outline'
import router from '@/router'
import { onMounted, ref } from 'vue'

const userName = ref<string>()
let userId = ref<number>()
let dialog = ref<boolean>(false)
const users = ref<{ username: string; userId: number }[]>([])

const groupId = () => {
  return router.currentRoute.value.params.id
}

onMounted(async () => {
  await getUsers()
})

const inviteUser = async () => {
  await axios
    .get(`${import.meta.env.VITE_BACKEND_HOST}/user`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) => {
      res.data.map((user: any) => {
        if (user.username === userName.value) {
          console.log('setting')
          userId.value = user.userId
        }
      })
    })

  try {
    console.log('submitting: ', userName.value, userId.value)
    const result = await axios.patch(
      `${import.meta.env.VITE_BACKEND_HOST}/circle/group/${groupId()}`,
      { userIds: [userName.value, userId.value] },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    dialog.value = false
    userName.value = ''
    await getUsers()
    return result.data
  } catch (error) {}
}

const getUsers = async () => {
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_HOST}/circle/group/${groupId()}`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    users.value = result.data.users
  } catch (error) {}
}
</script>

<template>
  <div class="inlay flex flex-col items-center">
    <div class="mb-12 flex w-full flex-col drop-shadow-lg">
      <div
        class="font-yeseva text-6 bg-scared-light rounded-t-2xl py-2 text-center"
      >
        Members
      </div>
      <div class="rounded-b-2xl bg-white p-4 drop-shadow-lg">
        <div class="flex flex-col gap-4">
          <div
            v-for="user in users"
            class="flex items-center justify-between gap-6"
          >
            {{ user.username }}
          </div>
        </div>
      </div>
    </div>

    <v-dialog
      v-model="dialog"
      class="!font-poppins !w-96"
      transition="dialog-bottom-transition"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          @click="dialog = true"
          v-bind="props"
          class="font-poppins !align-center !flex !w-fit !gap-2 !rounded-full !bg-rejecting !px-8 !py-4 !text-center shadow-none"
        >
          Invite User
          <user-plus-icon class="w-4"></user-plus-icon>
        </v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar class="!bg-rejecting" title="Invite new User"></v-toolbar>
          <v-text-field class="w-96" placeholder="Username" v-model="userName">
          </v-text-field>
          <v-card-actions class="justify-between">
            <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
            <Button
              @click="inviteUser()"
              type="submit"
              variant="outline"
              class="text-4 font-poppins w-fit rounded-full border-none bg-white px-8 py-2 drop-shadow-md"
            >
              Submit
            </Button>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
