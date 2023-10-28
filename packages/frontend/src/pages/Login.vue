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
  axios.post('http://localhost:3000/user/login', {
    username: username,
    password: password,
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  }).then(() => {
    router.push('/')
  })
}
const isSignUp = ref(false);
const test = () => {
  console.log(confirmedPassword)
    if (password.value == confirmedPassword.value) {
      axios.post(`http://localhost:3000/user/${isSignUp ? 'signup' : 'login'}`, {
        username: 'Nadia',
        password: '1234'
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(response => {
        console.log(response);
        if (isSignUp) {
          signIn();
        } else {
          router.push('/');
        }
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
      <div class="flex flex-col gap-6 items-center">
        <div class="bg-white rounded-2xl bg-white p-6 drop-shadow-md w-full">
          <Form class="flex flex-col">
            <div>
              <v-text-field v-model="username" variant="underlined" placeholder="Username" class="font-poppins"/>
            </div>
            <div>
              <v-text-field v-model="password" variant="underlined" type="password" placeholder="Password" class="font-poppins"/>
            </div>
            <div v-if="isSignUp">
              <v-text-field v-model="confirmedPassword" variant="underlined" :disabled="password === '' || password == null" :rules="rules" type="password" placeholder="Confirm Password" class="font-poppins"/>
            </div>
          </Form>
          <button @click="isSignUp = true"
                  :class="[isSignUp ? 'hidden' : 'text-[14px] text-uppercase font-bold text-center text-red w-full']">
            sign up here
          </button>
        </div>
        <Button @click="test()" variant="outline"
                class="w-fit px-16 py-6 drop-shadow-md rounded-full text-5 bg-white border-none font-poppins">
          Submit
        </Button>
      </div>
    </div>

  </main>
</template>