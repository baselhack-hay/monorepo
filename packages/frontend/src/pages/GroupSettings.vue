<script setup lang="ts">
import axios from "axios";
import {
  UserMinusIcon,
  UserPlusIcon,
} from '@heroicons/vue/24/outline'
import router from "@/router";
import {ref} from "vue";

const userName = ref<string>();
let userId = ref<number>();
const groupId = () => {
  return router.currentRoute.value.params.id;
}


const inviteUser = async () => {
  await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/user`,
      {
        headers: {
          'Content-Type':
              'application/json'
        },
        withCredentials: true
      }
  ).then(res => res.data.map((user:any) => {
    if (user.username === userName.value) {
      console.log('setting');
      userId.value = user.userId;
    }
  }))

  try {
    console.log('submitting: ', userName.value, userId.value)
    const result = await axios.patch(
        `${import.meta.env.VITE_BACKEND_HOST}/circle/group/${userId.value}`,
        {userIds: [userName.value, userId.value]},
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
    )
    console.log(result)
    return result.data
  } catch (error) {
  }
}

const users = [
  {
    username: "Meredit Sommer",
    profileImage: "../../public/images/profileImages/ente.png"
  },
  {
    username: "Samuel Lupica",
    profileImage: "../../public/images/profileImages/faultier.png"
  },
  {
    username: "Nadia Kramer",
    profileImage: "../../public/images/profileImages/waschbär.png"
  }

];


</script>

<template>
  <div class="inlay flex flex-col items-center">
    <div class="drop-shadow-lg mb-12 flex flex-col w-full">
      <div class="font-yeseva text-6 text-center rounded-t-2xl bg-scared-light py-2">
        Members
      </div>
      <div class="p-4 bg-white drop-shadow-lg rounded-b-2xl">
        <div class="flex flex-col gap-4">
          <div v-for="user in users" class="flex gap-6 items-center justify-between">
            <img :src="user.profileImage" class="w-12 h-12 rounded-full">
            {{ user.username }}
            <user-minus-icon class="w-8"></user-minus-icon>
          </div>
        </div>
      </div>
    </div>

    <v-dialog
        class="!w-96 !font-poppins"
        transition="dialog-bottom-transition"
        width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            v-bind="props"
            class="!text-center !w-fit !bg-rejecting !px-8 !py-4 !rounded-full font-poppins shadow-none !flex !gap-2 !align-center"
        > Invite User
          <user-plus-icon class="w-4"></user-plus-icon>
        </v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar
              class="!bg-rejecting"
              title="Invite new User"
          ></v-toolbar>
          <v-text-field class="w-96"
                        placeholder="Username"
                        v-model="userName"
          >
          </v-text-field>
          <v-card-actions class="justify-between">
            <v-btn
                variant="text"
                @click="isActive.value = false"
            >Close
            </v-btn>
            <Button @click="inviteUser()" type="submit" variant="outline"
                    class="w-fit px-8 py-2 drop-shadow-md rounded-full text-4 bg-white border-none font-poppins">
              Submit
            </Button>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>