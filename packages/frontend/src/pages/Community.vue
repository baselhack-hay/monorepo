<script setup lang="ts">
import CommunityCard from "@/components/ui/communityCard/CommunityCard.vue";
import {PlusIcon, XMarkIcon, PaperAirplaneIcon} from "@heroicons/vue/24/outline";
import {ref} from "vue";
import router from '@/router'

const isTextareaOpen = ref(false);
const textareaValue = ref('');
const setTextareaOpen = () => {
  isTextareaOpen.value = !isTextareaOpen.value;
};

const send = () => {
  console.log(textareaValue.value)
}
</script>

<template>
  <main>
    <div class="inlay flex flex-col gap-y-6">
      <CommunityCard
        @click="router.push('/posts/1')"
        :number-of-comment="20"
        title="Title"
        variant="surprised"
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."
      />
      <CommunityCard
        @click="router.push('/posts/2')"
        title="Title"
        variant="sad"
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."
      />
      <CommunityCard
        @click="router.push('/posts/3')"
        :number-of-comment="25"
        title="Title"
        variant="surprised"
        content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy sed diam nonumy..."
      />
    </div>
    <div class=" fixed bottom-20 w-full flex flex-row-reverse px-6">
      <div class="rounded-xl bg-black p-3 text-center" v-if="!isTextareaOpen">
        <plus-icon @click="setTextareaOpen()" class="w-8 text-white"></plus-icon>
      </div>
      <div class="w-full text-center flex flex-col drop-shadow" v-if="isTextareaOpen">
        <span class="bg-white pt-2 px-2 w-fit rounded-t-xl">
          <x-mark-icon @click="setTextareaOpen()" class="bg-white w-6"></x-mark-icon>
        </span>
        <span class="bg-white pt-3 rounded-tr-xl">
          <textarea rows="3" v-model="textareaValue" class="w-full px-3 py-2 font-poppins"></textarea>
        </span>
        <span class="bg-white p-2 rounded-b-xl flex flex-row-reverse">
          <paper-airplane-icon @click="send()" class="bg-white w-6"></paper-airplane-icon>
        </span>
      </div>
    </div>
  </main>
</template>
