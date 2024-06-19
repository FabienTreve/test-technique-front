import { createRouter, createWebHistory } from 'vue-router'

// Router | Definition des routes
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
    },
    {
        path: '/movie/:id/edit',
        name: 'edit',
        component: () => import('./views/MovieEdit.vue'),
        props: true
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router
