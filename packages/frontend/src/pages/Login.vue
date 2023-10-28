<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import axios from "axios";

const formSchema = toTypedSchema(z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(4).max(20),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  axios.post('http://localhost:3000/user/signup', {
    username: values.username,
    password: values.password
  }).then(() => {
    router.push('/');
  }).catch(() => {
    console.log('uups')
  })
  return false
})

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
    axios.get('http://localhost:3000/post').then(res => {
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
          <form @submit="onSubmit" class="flex flex-col gap-4">
            <FormField v-slot="{ username }" name="username">
              <FormItem>
                <FormControl class="border-none">
                  <v-text-field variant="underlined"  placeholder="Username" v-bind="username"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            </FormField>
            <FormField v-slot="{ password }" name="password">
              <FormItem>
                <FormControl class="border-none">
                  <v-text-field variant="underlined" type="password" placeholder="Passwort" v-bind="password"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            </FormField>
          </Form>
        </div>
        <Button @click="test()" variant="outline" class="w-fit px-16 py-6 drop-shadow-md rounded-full text-5 bg-white border-none">
          Submit
        </Button>
      </div>
    </div>

  </main>
</template>