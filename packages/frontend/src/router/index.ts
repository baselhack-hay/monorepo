import { createRouter, createWebHistory } from 'vue-router'
import Community from '@/pages/Community.vue'
import InnerCircles from '@/pages/InnerCircles.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'community',
      component: Community
    },
    {
      path: '/innercircles',
      name: 'innercircles',
      component: InnerCircles
    }
  ]
})

export default router
