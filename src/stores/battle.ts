import type { Student } from '@/type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { usePetStore } from './pets'
import petsPool from '@/utils/petsPool'

export const battle = defineStore('battle', () => {
  const playerA = ref<Student | null>(null)
  const playerB = ref<Student | null>(null)

  const palayerAPets = computed(() => {
    if (!playerA.value) {
      return []
    }
    const petStore = usePetStore()
    const pets = playerA.value.pets
      .map((pId) => {
        const petInfo = petStore.pets.find((pet) => pet.id === pId)

        if (petInfo) {
          const pet = petsPool.find((petItem) => petItem.id === petInfo.petId)

          if (pet) {
            return { ...petInfo, name: pet.name, icon: pet.levelIconMap[petInfo.level] }
          }
        }

        return null
      })
      .filter((p) => p)

    return pets
  })

  const palayerBPets = computed(() => {
    if (!playerB.value) {
      return []
    }
    const petStore = usePetStore()
    const pets = playerB.value?.pets
      .map((pId) => {
        const petInfo = petStore.pets.find((pet) => pet.id === pId)

        if (petInfo) {
          const pet = petsPool.find((petItem) => petItem.id === petInfo.petId)

          if (pet) {
            return { ...petInfo, name: pet.name, icon: pet.levelIconMap[petInfo.level] }
          }
        }

        return null
      })
      .filter((p) => p)

    return pets
  })

  function updatePlayerA(player: Student) {
    playerA.value = player
  }

  function updatePlayerB(player: Student) {
    playerA.value = player
  }

  return { playerA, playerB, palayerAPets, palayerBPets, updatePlayerA, updatePlayerB }
})
