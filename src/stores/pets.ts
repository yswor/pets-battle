import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Pet as PetType } from '@/type'
import storage from '@/utils/storage'
import petsPool, { getPetName, petEachLevelExpMap } from '@/utils/petsPool'
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

  const petNextExpProgress = computed(() => {
    return (id: number) => {
      const pet = petById.value(id)

      if (!pet?.level || (!pet.exp && pet.exp !== 0)) {
        return 0
      }

      const expForNextLevel = petEachLevelExpMap[pet.level + 1] || 0

      const reachedLevelsExp = new Array(pet.level).fill(0).reduce((acc, _, idx) => {
        return acc + (petEachLevelExpMap[idx + 1] || 0)
      }, 0)
      const curLevelEarnedExp = pet.exp - reachedLevelsExp

      return (curLevelEarnedExp / expForNextLevel) * 100
    }
  })

  const petNextLevelEarnedExp = computed(() => {
    return (id: number) => {
      const pet = petById.value(id)

      if (!pet?.level || (!pet.exp && pet.exp !== 0)) {
        return 0
      }

      const reachedLevelsExp = new Array(pet.level).fill(0).reduce((acc, _, idx) => {
        return acc + (petEachLevelExpMap[idx + 1] || 0)
      }, 0)

      return computed(() => pet.exp - reachedLevelsExp)
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

  return {
    pets,
    petById,
    setPets,
    getNextPetId,
    setMaxPetId,
    addPet,
    maxPetId,
    updatePet,
    petNextExpProgress,
    petNextLevelEarnedExp,
  }
})
