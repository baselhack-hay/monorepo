<script setup lang="ts">
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ref } from 'vue'
import router from '@/router'

const username = ref(null)
const password = ref(null)
const confirmedPassword = ref(null)
const rules = ref([
  (value: string) => value === password.value || 'Passwords must be equal'
])

const signIn = () => {
  axios
    .post(
      import.meta.env.VITE_BACKEND_HOST + '/user/login',
      {
        username: username.value,
        password: password.value
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )
    .then(() => {
      router.push('/')
    })
    .catch(() => {
      loginFailed.value = true
    })
}
const isSignUp = ref(false)
const loginFailed = ref(false)
const submit = () => {
  console.log('backend host:', import.meta.env.VITE_BACKEND_HOST)
  console.log(
    'complete url',
    import.meta.env.VITE_BACKEND_HOST +
      `/user/${isSignUp.value ? 'signup' : 'login'}`
  )
  if (!isSignUp.value || confirmedPassword.value) {
    axios
      .post(
        import.meta.env.VITE_BACKEND_HOST +
          `/user/${isSignUp.value ? 'signup' : 'login'}`,
        {
          username: username.value,
          password: password.value
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )
      .then(() => {
        if (isSignUp.value) {
          signIn()
        } else {
          router.push('/')
        }
      })
      .catch(() => {
        loginFailed.value = true
      })
  }
}
</script>

<template>
  <main
    class="inlay flex h-screen items-center bg-[url(/login-background-2.svg)] bg-cover bg-no-repeat"
  >
    <div class="w-full">
      <div>
        <h1 class="text-center font-mentra text-[64px]">Hay</h1>
      </div>
      <v-form @submit.prevent="submit" class="flex flex-col items-center gap-6">
        <div class="flex w-full flex-col items-center gap-6">
          <div class="w-full rounded-2xl bg-white p-6 drop-shadow-md">
            <div>
              <v-text-field
                v-model="username"
                variant="underlined"
                placeholder="Username"
                class="font-poppins"
              />
            </div>
            <div>
              <v-text-field
                v-model="password"
                variant="underlined"
                type="password"
                placeholder="Password"
                @keydown.enter="submit"
                class="font-poppins"
              />
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
              <v-text-field
                v-model="confirmedPassword"
                variant="underlined"
                :disabled="password === '' || password == null"
                :rules="rules"
                type="password"
                placeholder="Confirm Password"
                class="font-poppins"
              />
            </div>
            <button
              @click="isSignUp = true"
              v-if="!isSignUp"
              class="text-uppercase text-amber-darken-3 mt-4 w-full text-center text-[14px] font-bold"
            >
              sign up here
            </button>
            <button
              @click="isSignUp = false"
              v-if="isSignUp"
              class="text-uppercase text-amber-darken-3 mt-4 w-full text-center text-[14px] font-bold"
            >
              login
            </button>
          </div>
        </div>
        <Button
          type="submit"
          variant="outline"
          class="w-fit rounded-full border-none bg-white px-16 py-6 font-poppins text-5 drop-shadow-md"
        >
          Submit
        </Button>
      </v-form>
    </div>
  </main>
</template>
