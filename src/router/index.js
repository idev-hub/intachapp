import {createRouter, createWebHistory} from 'vue-router'
import store from "../store";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/lessons',
        name: 'Lessons',
        component: () => import('../views/Lessons.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/Settings.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/start',
        name: 'Start',
        component: () => import('../views/Start.vue')
    },
    {
        path: '/week/:region/:city/:college/:complex/:group/:week',
        props: true,
        name: 'Week',
        component: () => import('../views/Week.vue'),
        meta: {requiresAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta['requiresAuth'])) {
        if (!store.state.user) {
            next({
                path: '/start'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
