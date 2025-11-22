import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PetsView from '@/views/PetsView.vue'
import TasksView from '@/views/TasksView.vue'
import PetView from '@/views/PetView.vue'


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
      component: PetsView,
    },
    {
      path: '/pet/:id',
      name: 'pet',
      component: PetView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
    },
  ],
})

export default router
