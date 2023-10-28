import { createRouter, createWebHistory } from 'vue-router'
import Community from '@/pages/Community.vue'
import InnerCircles from '@/pages/InnerCircles.vue'
import Login from "@/pages/Login.vue";

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
      name: 'login',
      component: Login
    }
  ]
})

export default router
