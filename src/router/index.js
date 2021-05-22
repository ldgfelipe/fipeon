import { createWebHistory, createRouter } from 'vue-router'
import home from '@/pages/home.vue'
import dashboard from '@/pages/dashboard.vue'


const routes = [
    {
        path:"/",
        name:"inicio",
        component:home
    },
    {
        path:"/dashboard",
        name:"dashboard",
        component:dashboard
    }
]


const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router