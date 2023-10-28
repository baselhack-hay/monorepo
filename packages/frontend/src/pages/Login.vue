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
import { Input } from '@/components/ui/input'
import axios from "axios";

const formSchema = toTypedSchema(z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(4).max(20),
}))


const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  axios.post('https://hay-backend-dev.vercel.app/user/signup', {
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
  axios.post('https://hay-backend-dev.vercel.app/user/login', {
    username: 'Nadia',
    password: '1234'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }}).then(response => {
    console.log(response);
    axios.get('https://hay-backend-dev.vercel.app/post').then(res => {
      console.log(res)
    })
  }).catch(error => {
    console.log(error);
  })
}
</script>

<template>
  <main class="inlay">
    <Form onsubmit="test(); return false">
      <FormField v-slot="{ username }" name="username">
        <FormItem>
          <FormControl>
            <Input type="text" placeholder="Username" v-bind="username" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ password }" name="password">
        <FormItem>
          <FormControl>
            <Input type="password" placeholder="Passwort" v-bind="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
<!--      <Button type="submit">-->
<!--        Submit-->
<!--      </Button>-->
    </Form>

    <Button @click="test()">Test</Button>
  </main>
</template>