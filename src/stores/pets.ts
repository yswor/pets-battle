import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pet as PetType } from '@/type'
import storage from '@/utils/storage'

export const usePetStore = defineStore('pet', () => {
  const pets = ref<PetType[]>([])
  const maxPetId = ref(0)

  const petById = computed(() => {
    return (id: number) => pets.value.find((pet) => pet.id === id)
  })

  function setPets(newPets: PetType[]) {
    pets.value = newPets
  }

  function setMaxPetId(id: number) {
    maxPetId.value = id
  }

  function getNextPetId() {
    maxPetId.value += 1
    storage.set('maxPetId', maxPetId.value)
    return maxPetId.value
  }

  function addPet(pet: PetType) {
    pets.value.push(pet)
  }

  return { pets, petById, setPets, getNextPetId, setMaxPetId, addPet, maxPetId }
})
