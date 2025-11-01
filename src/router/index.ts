import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pets',
      name: 'pets',
      component: () => import('../views/PetsView.vue'),
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('../views/TasksView.vue'),
    },
    // {
    //   path: '/gifts',
    //   name: 'gifts',
    //   component: () => import('../views/GiftsView.vue'),
    // },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: () => import('../views/SettingsView.vue'),
    // },
  ],
})

export default router
