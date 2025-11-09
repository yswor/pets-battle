import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pet as PetType } from '@/type'
import storage from '@/utils/storage'
import petsPool, { getPetName } from '@/utils/petsPool'
import { useStudentStore } from './students'

export const usePetStore = defineStore('pet', () => {
  const pets = ref<PetType[]>([])
  const maxPetId = ref(0)

  const petById = computed(() => {
    const stuStore = useStudentStore()
    return (id: number) => {
      const petInfo = pets.value.find((pet) => pet.id === id)
      if (petInfo) {
        const pet = petsPool.find((p) => p.id === petInfo.petId)

        if (pet) {
          return {
            ...petInfo,
            name: getPetName(petInfo.level, pet.name),
            icon: pet.levelIconMap[petInfo.level],
            ownerName: stuStore.studentById(petInfo.ownerId)?.name,
          }
        }
      }
    }
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

  function updatePet(updatedPet: PetType) {
    const index = pets.value.findIndex((pet) => pet.id === updatedPet.id)
    if (index !== -1) {
      pets.value[index] = updatedPet
    }
  }

  return { pets, petById, setPets, getNextPetId, setMaxPetId, addPet, maxPetId, updatePet }
})
