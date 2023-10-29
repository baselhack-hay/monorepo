<script setup lang="ts">

import {Button} from '@/components/ui/button'
import axios from "axios";
import {ref} from "vue";
import router from "@/router";

const username = ref(null);
const password = ref(null);
const confirmedPassword = ref(null);
const rules = ref(
    [
      value => value === password.value || 'Passwords must be equal',])

const signIn = () => {
  axios.post(import.meta.env.VITE_BACKEND_HOST + '/user/login', {
    username: username.value,
    password: password.value,
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then(() => {
    router.push('/')
  }).catch(() => {
    loginFailed.value = true;
  })
}
const isSignUp = ref(false);
const loginFailed = ref(false);
const submit = () => {
  if (!isSignUp.value || confirmedPassword.value) {
    axios.post(import.meta.env.VITE_BACKEND_HOST + `/user/${isSignUp.value ? 'signup' : 'login'}`, {
      username: username.value,
      password: password.value
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(() => {
      if (isSignUp.value) {
        signIn();
      } else {
        router.push('/');
      }
    }).catch(() => {
      loginFailed.value = true;
    })
  }
}
</script>

<template>
  <main class="inlay bg-[url(../../public/login-background-2.svg)] h-screen bg-no-repeat bg-cover flex items-center">
    <div class="w-full">
      <div>
        <h1 class="font-mentra text-[64px] text-center">Hay</h1>
      </div>
      <v-form @submit.prevent="submit" class="flex flex-col items-center gap-6">
        <div class="flex flex-col gap-6 items-center w-full">
          <div class="bg-white rounded-2xl p-6 drop-shadow-md w-full">
            <div>
              <v-text-field v-model="username" variant="underlined" placeholder="Username" class="font-poppins"/>
            </div>
            <div>
              <v-text-field v-model="password" variant="underlined" type="password" placeholder="Password"
                            class="font-poppins"/>
            </div>
            <v-alert
                class="text-4"
                v-if="loginFailed && !isSignUp"
                type="error"
                variant="tonal"
                border="start"
                border-color="error"
            >
              <p><b>Login failed</b></p>
              <p>Username or password is wrong.</p>
            </v-alert>
            <div v-if="isSignUp">
              <v-text-field v-model="confirmedPassword" variant="underlined"
                            :disabled="password === '' || password == null" :rules="rules" type="password"
                            placeholder="Confirm Password" class="font-poppins"/>
            </div>
            <button @click="isSignUp = true"
                    v-if="!isSignUp"
                    class="text-[14px] text-uppercase font-bold text-center text-amber-darken-3 w-full mt-4">
              sign up here
            </button>
          </div>
        </div>
        <Button type="submit" variant="outline"
                class="w-fit px-16 py-6 drop-shadow-md rounded-full text-5 bg-white border-none font-poppins">
          Submit
        </Button>
      </v-form>
    </div>

  </main>
</template>