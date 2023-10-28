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

// const { handleSubmit } = useForm({
//   validationSchema: formSchema,
// })

const onSubmit = (values) => {
  axios.post('http://localhost:3000/user/signup', {
    username: values.username,
    password: values.password
  })
}

const test = () => {
  axios.post('http://localhost:3000/user/signup', {
    username: 'test',
    password: '1234'
  })
}
</script>

<template>
  <main class="inlay">
    <form @submit="onSubmit">
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
      <Button @click="test()" variant="outline">
        Submit
      </Button>
    </Form>
  </main>
</template>