<script setup lang="ts">
import CommunityCard from "@/components/ui/communityCard/CommunityCard.vue";
import {PlusIcon, XMarkIcon, PaperAirplaneIcon} from "@heroicons/vue/24/outline";
import {onMounted, ref} from "vue";
import router from '@/router'
import axios from "axios";
import EmotionSelector from "@/components/ui/emotion-selector/EmotionSelector.vue";

type Post = {
  postId: number;
  title: string;
  description: string;
  emotion: 'surprised' | 'happy' | 'scared' | 'sad' | 'angry' | 'rejecting';
}

const dialog = ref(false);
const textareaValue = ref('');
const titleValue = ref('');
const posts = ref<Post[]>([]);
const pageIndex = ref(1);
const timestamp = ref('');
const end = ref(false);
const loading = ref(false);

const generateTimestamp = () => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 1);
  timestamp.value = currentDate.toISOString();
}

const emotion = ref<string>('');

onMounted(async () => {
  generateTimestamp();
  await getPosts();
});

const createPost = async () => {
  if(titleValue.value.length > 0 && textareaValue.value.length > 0){
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/community/post`, {
        title: titleValue.value,
        description: textareaValue.value,
        emotion: emotion.value.toLowerCase()
      }, {
      headers: {
          'Content-Type': 'application/json'
      },
      withCredentials: true
      })
      posts.value = [];
      end.value = false;
      titleValue.value = '';
      textareaValue.value = '';
      pageIndex.value = 1;
      generateTimestamp();
      await getPosts();
      dialog.value = false;
    }
    catch (error){
      console.log(error)
    }
  }
}

const getPosts = async () => {
  if(!end.value){
    try {
      loading.value = true;
      const result = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/community/post/paginate?page=${pageIndex.value}&timestamp=${timestamp.value}&pageSize=10`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      loading.value = false;
      posts.value = [...posts.value, ...result.data.posts]
      if(result.data.posts.length === 0){
        end.value = true;
      }
    } catch (error){
    }
  }
}

window.onscroll = () => {
  let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

  if (bottomOfWindow) {
    pageIndex.value++;
    getPosts();
  }
};

</script>

<template>
  <main>
    <div class="inlay flex flex-col gap-y-6" id="scrollwindow">
      <CommunityCard v-for="post in posts" @click="router.push(`/posts/${post.postId}`)" :id="post.postId" :title="post.title" :content="post.description" :variant="post.emotion"></CommunityCard>
      <span v-if="loading">Loading...</span>
    </div>
    <div class=" fixed bottom-20 w-full flex flex-row-reverse px-6">
      <div class="rounded-xl bg-black p-3 text-center" v-if="!dialog">
        <plus-icon @click="dialog = true" class="w-8 text-white"></plus-icon>
      </div>
    </div>
    <v-dialog
        v-model="dialog"
    >
      <div class="flex bg-white rounded-lg p-4 flex-column gap-y-4">
        <div class="w-full flex justify-between">
          <x-mark-icon class="w-6" @click="dialog = false"/>
        </div>
        <div class="flex">
          <v-text-field v-model="titleValue" label="Title" class="font-poppins">
            <template v-slot:append-inner>
              <EmotionSelector @select-emotion="(e: any) => emotion = e.title"></EmotionSelector>
            </template>
          </v-text-field>
        </div>
        <div>
          <v-textarea v-model="textareaValue" label="Content"/>
          <div class="w-full flex justify-between flex-row-reverse">
            <paper-airplane-icon class="w-6" @click="createPost"/>
          </div>
        </div>
      </div>
    </v-dialog>
  </main>
</template>
