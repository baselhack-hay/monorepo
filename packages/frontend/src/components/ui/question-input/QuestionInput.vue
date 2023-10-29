<script setup lang="ts">
import { ref } from 'vue'

const mood = ref('')
const color = ref('')

const items: object[] = [
  {
    title: 'Happy',
    color: 'bg-happy'
  },
  {
    title: 'Surprised',
    color: 'bg-surprised'
  },
  {
    title: 'Angry',
    color: 'bg-angry'
  },
  {
    title: 'Sad',
    color: 'bg-sad'
  },
  {
    title: 'Rejecting',
    color: 'bg-rejecting'
  },
  {
    title: 'Scared',
    color: 'bg-scared'
  }
]

function setMood(selectedMood: string, selectedColor: string) {
  mood.value = selectedMood
  color.value = selectedColor
}
</script>

<template>
  <div class="flex h-fit w-full justify-center">
    <div
      class="fixed bottom-0 mx-auto mb-[100px] flex h-fit w-11/12 justify-between rounded-full p-4 font-poppins shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <v-menu open-on-click location="top" class="h-fit w-fit">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" style="box-shadow: none"
            ><svg
              v-if="mood === '' && color === ''"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            <div v-else :class="color + ' h-6 w-6 rounded-full'"></div>
          </v-btn>
        </template>

        <v-list>
          <v-list-item class="p-0" v-for="(item, i) in items" :key="i"
            ><div
              class="flex min-w-[100px] items-center justify-between p-0"
              @click="setMood(item.title, item.color)"
            >
              <p>{{ item.title }}</p>
              <div
                :class="item.color + ' ml-[30px] h-4 w-4 rounded-full'"
              ></div>
            </div>
          </v-list-item>
        </v-list>
      </v-menu>

      <input
        type="text"
        class="sm:text-sm w-4/5 appearance-none leading-5 focus:z-10 focus:outline-none sm:leading-5"
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
