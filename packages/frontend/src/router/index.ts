import {createRouter, createWebHistory} from "vue-router";
import Community from "@/pages/Community.vue";
import InnerCircle from "@/pages/InnerCircle.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'community',
            component: Community
        },
        {
            path: '/innercircle',
            name: 'innercircle',
            component: InnerCircle
        }
    ]
});

export default router;