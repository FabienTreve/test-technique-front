import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '',
        name: 'home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: () => import('./views/Movie.vue'),
        props: true
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router
