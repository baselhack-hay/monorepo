import { createRouter, createWebHistory } from 'vue-router'
import Community from '@/pages/Community.vue'
import InnerCircles from '@/pages/InnerCircles.vue'
import Login from '@/pages/Login.vue'
import Post from '@/pages/Post.vue'

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
    }
  ]
})

export default router
