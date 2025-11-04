import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pet as PetType } from '@/type'

export const usePetStore = defineStore('pet', () => {
  const pets = ref<PetType[]>([])

  const petById = computed(() => {
    return (id: number) => pets.value.find((pet) => pet.id === id)
  })

  function setPets(newPets: PetType[]) {
    pets.value = newPets
  }

  return { pets, setPets, petById }
})
