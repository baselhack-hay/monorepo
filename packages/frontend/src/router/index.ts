import { createRouter, createWebHistory } from 'vue-router'
import Community from '@/pages/Community.vue'
import InnerCircles from '@/pages/InnerCircles.vue'
import Login from '@/pages/Login.vue'
import Post from '@/pages/Post.vue'
import Question from '@/pages/Question.vue'
import Circle from '@/pages/Circle.vue'
import GroupSettings from "@/pages/GroupSettings.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Community',
      component: Community
    },
    {
      path: '/innercircles',
      name: 'Inner Circles',
      component: InnerCircles
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/posts/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/question',
      name: 'Question',
      component: Question
    },
    {
      path: '/circle/:id',
      name: 'Circle',
      component: Circle
    },
    {
      path: '/group/:id',
      name: GroupSettings,
      component: GroupSettings
    }
  ]
})

export default router
