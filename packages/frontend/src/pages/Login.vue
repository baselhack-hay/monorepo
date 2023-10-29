<script setup lang="ts">

import {Button} from '@/components/ui/button'
import axios from "axios";

const test = () => {
  axios.post('http://localhost:3000/user/login', {
    username: 'Nadia',
    password: '1234'
  }, {
    headers: {
      'Content-Type': 'application/json'
    },
  withCredentials: true  }).then(response => {
    console.log(response);
    axios.get('http://localhost:3000/post', {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(res => {
      console.log(res)
    })
  }).catch(error => {
    console.log(error);
  })
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
          <form class="flex flex-col gap-4">
            <div>
              <v-text-field variant="underlined" placeholder="Username"/>
            </div>
            <div>
              <v-text-field variant="underlined" type="password" placeholder="Passwort"/>
            </div>
          </Form>
        </div>
        <Button @click="test()" variant="outline"
                class="w-fit px-16 py-6 drop-shadow-md rounded-full text-5 bg-white border-none">
          Submit
        </Button>
      </div>
    </div>

  </main>
</template>