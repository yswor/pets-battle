import type { User } from '@/type'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  function setUser(newUser: User) {
    Object.assign(user, newUser)
  }

  return { user, setUser }
})
