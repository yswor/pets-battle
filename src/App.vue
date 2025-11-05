<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted } from 'vue'
import Wrapper from './layouts/Wrapper.vue'
import { useStudentStore } from './stores/students'
import storage from './utils/storage'
import { usePetStore } from './stores/pets'

const stuStore = useStudentStore()
const petStore = usePetStore()

const handleBeforeUnload = () => {
  storage.set('students', stuStore.students)
  storage.set('pets', petStore.pets)
}

onMounted(() => {
  const students = storage.get('students')
  if (students) {
    stuStore.setStudents(students)
  }

  const pets = storage.get('pets')
  if (pets) {
    petStore.setPets(pets)
  }

  const maxPetId = storage.get('maxPetId')
  if (maxPetId) {
    petStore.setMaxPetId(maxPetId)
  }

  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<template>
  <Wrapper />
</template>

<style scoped></style>
